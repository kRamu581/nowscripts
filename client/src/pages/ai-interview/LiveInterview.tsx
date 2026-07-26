import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from "lucide-react";

interface LiveInterviewProps {
  config: any;
  onEnd: (results: any) => void;
}

export function LiveInterview({ config, onEnd }: LiveInterviewProps) {
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const [timer, setTimer] = useState(0);
  
  // Mock conversation state
  const [aiMessage, setAiMessage] = useState("Hello! Welcome to your ServiceNow interview. I'm Alex, your AI interviewer today. Let's get started.");
  const [userTranscript, setUserTranscript] = useState("");
  const [conversation, setConversation] = useState<{sender: 'ai'|'user', text: string}[]>([]);
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);

  // Setup user camera
  useEffect(() => {
    const setupMedia = async () => {
      try {
        const activeStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(activeStream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = activeStream;
        }
      } catch (err) {
        console.error("Camera access denied in live view");
      }
    };
    setupMedia();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Mock conversation flow
  useEffect(() => {
    const flow = [
      { delay: 4000, type: 'ai_stop' },
      { delay: 6000, type: 'user', text: "Hi Alex, thank you. I'm excited to be here." },
      { delay: 10000, type: 'ai', text: `Great. Since you applied for the ${config.targetRole} role focusing on ${config.module}, let's dive into a scenario.` },
      { delay: 15000, type: 'ai_stop' },
      { delay: 17000, type: 'ai', text: "A customer reports duplicate incidents being created through a REST API integration. How would you debug this problem?" },
      { delay: 24000, type: 'ai_stop' },
      { delay: 26000, type: 'user', text: "First, I would check the System Logs and the API payload. Then I'd look for any Business Rules running on insert that might be triggering a duplicate." },
      { delay: 35000, type: 'ai', text: "Good approach. What if the Business Rule isn't the culprit, and it's happening at the database level?" },
      { delay: 42000, type: 'ai_stop' },
    ];

    const timeouts = flow.map(step => {
      return setTimeout(() => {
        if (step.type === 'ai') {
          setAiMessage(step.text || "");
          setIsAiSpeaking(true);
          setConversation(prev => [...prev, { sender: 'ai', text: step.text || "" }]);
          setUserTranscript("");
        } else if (step.type === 'ai_stop') {
          setIsAiSpeaking(false);
          setAiMessage("");
        } else if (step.type === 'user') {
          setUserTranscript(step.text || "");
          setConversation(prev => [...prev, { sender: 'user', text: step.text || "" }]);
        }
      }, step.delay);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [config]);


  const handleEndCall = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    
    // Pass mock results to the next screen
    onEnd({
      score: 92,
      technical: 95,
      scenario: 91,
      communication: 89,
      duration: formatTime(timer),
      transcript: conversation
    });
  };

  return (
    <div className="w-full h-screen bg-[#0F1014] flex flex-col p-4 md:p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-red-500/30">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            REC
          </div>
          <span className="text-white font-mono text-xl">{formatTime(timer)}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-300 hidden md:block">ServiceNow {config.targetRole} Interview</h2>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* AI Interviewer (Main Screen) */}
        <div className="lg:col-span-2 relative bg-[#1A1C23] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center group">
          {/* Mock AI Avatar - we use an abstract placeholder or a static image */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-blue-900/20"></div>
          
          <div className={`relative z-10 w-48 h-48 rounded-full border-4 ${isAiSpeaking ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] animate-pulse' : 'border-gray-700'} overflow-hidden bg-gray-800 transition-all duration-300`}>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=transparent" alt="AI Avatar" className="w-full h-full object-cover" />
          </div>

          {/* AI Nameplate */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <span className="text-white font-semibold">Alex (AI Interviewer)</span>
          </div>

          {/* Active AI Transcript Overlay */}
          {aiMessage && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-3/4 text-center">
              <div className="inline-block bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-blue-500/30">
                <p className="text-xl text-white font-medium">{aiMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: User Video & Live Transcript */}
        <div className="flex flex-col gap-6">
          
          {/* User Video */}
          <div className="relative bg-[#1A1C23] rounded-3xl overflow-hidden border border-gray-800 shadow-xl aspect-video lg:aspect-auto lg:h-[40%]">
            <video 
              ref={userVideoRef}
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <VideoOff className="w-12 h-12 text-gray-600" />
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
              <span className="text-white text-sm font-medium">You</span>
              {isMuted && <MicOff className="w-4 h-4 text-red-500" />}
            </div>
          </div>

          {/* Live Transcript / Confidence Meter */}
          <div className="flex-1 bg-[#1A1C23] rounded-3xl border border-gray-800 p-6 flex flex-col shadow-xl">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold">Live Analysis</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {userTranscript ? (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-gray-300 text-sm mb-2">Live Transcript:</p>
                  <p className="text-white">"{userTranscript}"</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 italic text-sm">
                  Listening...
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Confidence Meter</span>
                <span className="text-green-400 font-bold">Good</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
        
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
        </button>

        <button 
          onClick={handleEndCall}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center ml-8 transition-transform hover:scale-110 shadow-lg shadow-red-600/20"
        >
          <PhoneOff className="w-7 h-7 text-white" />
        </button>
      </div>

    </div>
  );
}
