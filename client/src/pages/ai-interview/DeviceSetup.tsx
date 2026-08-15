import React, { useState, useEffect, useRef } from "react";
import { Settings, CheckCircle } from "lucide-react";

interface DeviceSetupProps {
  onNext: () => void;
  onBack: () => void;
}

export function DeviceSetup({ onNext, onBack }: DeviceSetupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundPassed, setSoundPassed] = useState(false);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let animationFrameId: number;
    
    async function startCamera() {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }

        // Set up Web Audio API to analyze microphone input
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContext = new AudioContextClass();
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          microphone = audioContext.createMediaStreamSource(currentStream);
          microphone.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const checkAudioLevel = () => {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);
            
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;

            if (average > 10) {
              setSoundPassed(prev => {
                if (!prev) return true;
                return prev;
              });
            }
            
            animationFrameId = requestAnimationFrame(checkAudioLevel);
          };
          
          checkAudioLevel();
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }
    
    startCamera();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center py-4 px-3 sm:p-8 relative font-sans overflow-y-auto">
      
      <div className="w-full max-w-[500px] flex flex-col">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="self-start mb-3 text-[#5b5e63] hover:text-[#191b1f] font-semibold text-[13px] bg-white px-3 py-1.5 rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-1.5 transition-all"
        >
          &larr; Back
        </button>

        <div className="w-full bg-white rounded-[16px] p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] relative">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="pr-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Video and audio check</h1>
              <p className="text-xs sm:text-sm text-gray-600">Before you start, make sure your video and audio is set up properly.</p>
            </div>
            <div className="text-[#6366f1] shrink-0">
              <Settings className="w-6 h-6" />
            </div>
          </div>

          {/* Video Settings */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">Video settings</h3>
            
            {/* Camera Preview */}
            <div className="w-[160px] h-[120px] mx-auto bg-[#f8f9fa] rounded-[16px] overflow-hidden mb-6 border border-gray-100 shadow-sm relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover transform scale-x-[-1]" 
              />
            </div>

            {/* Camera Instructions */}
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">Smile you're on camera!</h4>
            <p className="text-[11px] sm:text-xs text-gray-500 mb-1">
              Center yourself in the frame and make sure your interviewer can see you clearly.
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 mb-4">
              Your background will be blurred by default. You can turn it off during the call.
            </p>

            {/* Camera Select Dropdown */}
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-[8px] px-3 py-2 text-xs sm:text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:border-now-primary focus:ring-1 focus:ring-now-primary">
                <option>camera 1, facing front</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Sound Check Status */}
          {soundPassed ? (
            <div className="border border-green-200 bg-green-50/50 rounded-[12px] p-4 flex gap-3 items-start animate-in fade-in duration-300">
              <CheckCircle className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#059669] text-xs sm:text-sm">Sound check passed</h3>
                <p className="text-[11px] sm:text-xs text-[#059669] mt-0.5">
                  Your setup looked good. If something changed, you can <button onClick={() => setSoundPassed(false)} className="underline font-medium hover:text-green-800 focus:outline-none">run it again</button>.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-blue-200 bg-blue-50/50 rounded-[12px] p-4 flex gap-3 items-start animate-in fade-in duration-300">
              <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 text-xs sm:text-sm">Checking audio...</h3>
                <p className="text-[11px] sm:text-xs text-blue-700 mt-0.5">
                  Please say something to test your microphone.
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-8">
            <button
              onClick={onNext}
              className="w-full bg-now-primary hover:bg-now-accent text-white font-bold py-3.5 rounded-full transition-all shadow-[0_4px_14px_0_rgba(255,90,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,95,0.23)] text-[15px] sm:text-[16px]"
            >
              Start interview
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
