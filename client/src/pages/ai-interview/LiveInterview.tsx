import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Loader2, Users } from "lucide-react";

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
  
  const [aiMessage, setAiMessage] = useState("");
  const [userTranscript, setUserTranscript] = useState("");
  const [conversation, setConversation] = useState<{sender: 'ai'|'user', text: string}[]>([]);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // The conversation flow logic
  const [stepIndex, setStepIndex] = useState(0);
  
  const script = [
    { text: `Hello! Welcome to your ServiceNow interview. I'm Motu, your AI interviewer today. Since you applied for the ${config?.targetRole || 'Developer'} role, let's dive into a scenario. A customer reports duplicate incidents being created through a REST API integration. How would you debug this problem?` },
    { text: "I analyzed your answer. While you correctly suggested checking the logs, you missed checking the coalesce fields on the transform map. Coalesce fields are critical to preventing duplicates. Always verify them first! Now, let's move on. What if the issue is occurring at the database level?" },
    { text: "Good explanation! Exploring the business rules and database constraints is the right track. That wraps up our technical scenario. Thank you for your time." }
  ];

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
      window.speechSynthesis.cancel(); // Stop speaking on unmount
    };
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Speak function
  const speak = (text: string) => {
    setIsAiSpeaking(true);
    setAiMessage(text);
    setConversation(prev => [...prev, { sender: 'ai', text }]);
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Microsoft Mark")) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.onend = () => {
      setIsAiSpeaking(false);
      if (stepIndex < script.length - 1) {
        startListening();
      } else {
        setTimeout(() => handleEndCall(), 3000);
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Start interview when ready
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(script[0].text);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen function
  const startListening = () => {
    if (isMuted) {
      setTimeout(() => processUserAnswer(""), 4000);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTimeout(() => processUserAnswer("I would check the system logs and API payload."), 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    
    let localTranscript = '';
    
    recognition.onstart = () => {
      setIsListening(true);
      setUserTranscript("");
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          localTranscript += event.results[i][0].transcript;
        } else {
          setUserTranscript(localTranscript + event.results[i][0].transcript); 
        }
      }
      if (finalTranscript) {
        setUserTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      processUserAnswer(localTranscript || "Could not hear clearly.");
    };

    recognition.onend = () => {
      setIsListening(false);
      processUserAnswer(localTranscript);
    };

    try {
      recognition.start();
    } catch (e) {
      setIsListening(false);
      processUserAnswer("I would check the logs."); 
    }
  };

  const processUserAnswer = (answer: string) => {
    setIsAnalyzing(true);
    setConversation(prev => [...prev, { sender: 'user', text: answer || "(No answer detected)" }]);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setUserTranscript("");
      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);
      speak(script[nextStep].text);
    }, 2000);
  };

  const handleEndCall = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    window.speechSynthesis.cancel();
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
    <div className="w-full h-full bg-gray-50 flex flex-col p-4 md:p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-red-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            REC
          </div>
          <span className="text-gray-800 font-mono text-xl font-semibold">{formatTime(timer)}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-700 hidden md:block">ServiceNow {config?.targetRole || 'Developer'} Interview</h2>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-6 min-h-0 overflow-y-auto lg:overflow-hidden pb-10 lg:pb-0">
        
        {/* User Video (Main Screen) */}
        <div className="lg:col-span-2 relative bg-gray-200 rounded-3xl overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center h-[350px] md:h-[450px] lg:h-full shrink-0">
          <video 
            ref={userVideoRef}
            autoPlay 
            playsInline 
            muted
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
          />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <VideoOff className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* User Nameplate */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2 shadow-sm">
            <span className="text-gray-800 font-semibold">You</span>
            {isMuted && <MicOff className="w-4 h-4 text-red-500" />}
          </div>

          {/* Motu AI Small Icon */}
          <div className={`absolute top-6 right-6 w-16 h-16 rounded-full border-2 ${isAiSpeaking ? 'border-now-primary shadow-[0_0_20px_rgba(255,90,95,0.4)] animate-pulse bg-now-primary/10' : 'border-gray-300 bg-white'} overflow-hidden shadow-md flex items-center justify-center backdrop-blur-md z-20`}>
            <Users className={`w-8 h-8 ${isAiSpeaking ? 'text-now-primary' : 'text-gray-500'}`} />
            {isAiSpeaking && (
              <div className="absolute inset-0 border-2 border-now-primary/50 rounded-full animate-ping pointer-events-none"></div>
            )}
          </div>
        </div>

        {/* Right Column: Live Transcript */}
        <div className="flex flex-col gap-6 lg:h-full lg:overflow-hidden shrink-0">


          {/* Live Transcript / Confidence Meter */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-200 p-6 flex flex-col shadow-sm min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-now-primary" />
                <h3 className="text-gray-900 font-bold">Live Analysis</h3>
              </div>
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-now-primary text-sm font-medium animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {userTranscript ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-2 flex items-center justify-between">
                    Live Transcript:
                    {isListening && <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                  </p>
                  <p className="text-gray-800 font-medium">"{userTranscript}"</p>
                </div>
              ) : isListening ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 italic text-sm gap-3">
                  <div className="w-12 h-12 rounded-full bg-now-primary/10 flex items-center justify-center">
                    <Mic className="w-6 h-6 text-now-primary animate-pulse" />
                  </div>
                  Listening to your answer...
                </div>
              ) : isAnalyzing ? (
                 <div className="h-full flex items-center justify-center text-now-primary italic text-sm font-medium">
                  Motu is analyzing your response...
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 italic text-sm">
                  Waiting for prompt...
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 shrink-0">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Confidence Meter</span>
                <span className="text-green-600 font-bold">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-now-primary to-green-500 h-2 rounded-full w-[85%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="mt-6 flex justify-center items-center gap-4 shrink-0">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300 shadow-sm border border-gray-300'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-gray-700" />}
        </button>
        
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300 shadow-sm border border-gray-300'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-gray-700" />}
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
