import React, { useEffect, useRef, useState } from "react";
import { Users, Volume2, MoreHorizontal, Loader2, AlertCircle } from "lucide-react";
import { httpRequest } from "../../interceptor/axiosInterceptor";

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
  const [isAnalyzingInterview, setIsAnalyzingInterview] = useState(false);
  const [evaluationError, setEvaluationError] = useState(false);

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

  // Timer (Auto end at 15 minutes = 900 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev >= 900) {
          clearInterval(interval);
          return 900;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer >= 900) {
      handleEndCall();
    }
  }, [timer]);

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

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  const handleEndCall = async () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    window.speechSynthesis.cancel();
    
    setIsAnalyzingInterview(true);
    setEvaluationError(false);
    
    try {
      const res = await httpRequest.post(`/api/ai/interview/evaluate`, {
        transcript: conversation,
        duration: formatTime(timer)
      });
      
      setIsAnalyzingInterview(false);
      onEnd({
        duration: formatTime(timer),
        ...res.data.evaluation
      });
    } catch (error) {
      console.error("Failed to evaluate interview:", error);
      setIsAnalyzingInterview(false);
      setEvaluationError(true);
    }
  };

  if (isAnalyzingInterview) {
    return (
      <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center p-4 relative font-sans">
        <div className="w-full max-w-[340px] bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] flex flex-col items-center justify-center text-center mx-auto space-y-4">
          <Loader2 className="w-10 h-10 text-now-primary animate-spin" />
          <h2 className="text-xl font-bold text-[#191b1f]">Analyzing your interview...</h2>
          <p className="text-sm text-gray-500">Motu is reviewing your responses.</p>
        </div>
      </div>
    );
  }

  if (evaluationError) {
    return (
      <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center p-4 relative font-sans">
        <div className="w-full max-w-[340px] bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] flex flex-col items-center justify-center text-center mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <h2 className="text-xl font-bold text-[#191b1f]">Evaluation Failed</h2>
          <p className="text-sm text-gray-500">There was a problem analyzing your interview. Please try again.</p>
          <button 
            onClick={handleEndCall}
            className="mt-4 w-full bg-now-primary hover:bg-now-accent text-white font-bold py-3 rounded-full transition-all text-[15px]"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center py-4 px-4 sm:p-8 relative font-sans overflow-y-auto">
      <div className="w-full max-w-[340px] bg-white rounded-[24px] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] flex flex-col gap-3 mx-auto">
        
        {/* Top: AI Avatar */}
        <div className="w-full aspect-square max-h-[220px] bg-[#f8f9fe] border-[1.5px] border-[#e0e7ff] rounded-[20px] relative flex items-center justify-center overflow-hidden">
          {/* Generic blob/avatar shape for AI */}
          <div className="w-24 h-24 bg-gray-200 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] transform -rotate-12"></div>
          
          {/* Audio Indicator */}
          <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#6366f1] text-white flex items-center justify-center shadow-md ${isAiSpeaking ? 'animate-pulse' : ''}`}>
             <Volume2 className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom: User Video */}
        <div className="w-full aspect-square max-h-[220px] bg-gray-200 rounded-[20px] overflow-hidden relative shadow-inner">
          <video 
            ref={userVideoRef}
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
          {isListening && (
            <div className="absolute top-4 right-4 bg-now-primary rounded-full w-3 h-3 animate-pulse border-2 border-white shadow-sm" />
          )}
        </div>

        {/* Controls */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-4">
            <button className="w-12 h-12 rounded-full bg-[#191b1f] flex items-center justify-center hover:bg-gray-800 transition-colors shadow-sm">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </button>
            <div className="px-4 py-2 bg-now-primary/10 text-now-primary font-bold text-sm rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-now-primary animate-pulse"></div>
              {formatTime(timer)}
            </div>
          </div>
          
          <button 
            onClick={handleEndCall}
            className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3.5 rounded-full transition-all shadow-[0_4px_14px_0_rgba(239,35,60,0.39)] hover:shadow-[0_6px_20px_rgba(239,35,60,0.23)] text-[16px]"
          >
            End call
          </button>
        </div>

      </div>
    </div>
  );
}
