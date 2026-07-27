import React, { useEffect, useRef, useState } from "react";
import { Camera, Mic, Volume2, Wifi, Activity, CheckCircle2, AlertCircle, Play } from "lucide-react";

interface HardwareCheckProps {
  config: any;
  onNext: () => void;
  onBack: () => void;
}

export function HardwareCheck({ config, onNext, onBack }: HardwareCheckProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<"checking" | "ok" | "error">("checking");
  const [micStatus, setMicStatus] = useState<"checking" | "ok" | "error">("checking");
  const [networkStatus, setNetworkStatus] = useState<"checking" | "ok" | "error">("checking");

  useEffect(() => {
    let activeStream: MediaStream;

    const setupMedia = async () => {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 }, 
          audio: true 
        });
        
        setStream(activeStream);
        if (videoRef.current) {
          videoRef.current.srcObject = activeStream;
        }
        
        setCameraStatus("ok");
        setMicStatus("ok");
      } catch (err) {
        console.error("Error accessing media devices", err);
        setCameraStatus("error");
        setMicStatus("error");
      }
      
      // Simulate network check
      setTimeout(() => setNetworkStatus("ok"), 1000);
    };

    setupMedia();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "checking") return <Activity className="w-5 h-5 text-yellow-500 animate-pulse" />;
    if (status === "ok") return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const allClear = cameraStatus === "ok" && micStatus === "ok" && networkStatus === "ok";

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">System & Tech Check</h1>
        <p className="text-gray-500">Please ensure your camera and microphone are working before we begin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Preview */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative aspect-video flex items-center justify-center">
            {cameraStatus === "error" ? (
              <div className="text-center text-gray-500">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Camera access denied or device not found.</p>
                <p className="text-sm mt-2">Please allow camera access in your browser settings.</p>
              </div>
            ) : (
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm font-medium text-white">HD Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Checklist */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4">Checklist</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Camera className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Camera</span>
                </div>
                <StatusIcon status={cameraStatus} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mic className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Microphone</span>
                </div>
                <StatusIcon status={micStatus} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Volume2 className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Speaker</span>
                </div>
                <StatusIcon status="ok" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Wifi className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Connection</span>
                </div>
                <StatusIcon status={networkStatus} />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-sm text-blue-800">
            <h4 className="font-bold text-blue-900 mb-2">Interview Details</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Role:</strong> {config.targetRole}</li>
              <li><strong>Module:</strong> {config.module}</li>
              <li><strong>Duration:</strong> {config.duration}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-gray-900 px-6 py-3 font-semibold transition-colors"
        >
          Back to Setup
        </button>
        <button 
          onClick={onNext}
          disabled={!allClear}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
            allClear 
              ? "bg-green-600 hover:bg-green-500 text-white hover:shadow-green-500/25 cursor-pointer" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Play className="w-5 h-5" />
          Start Interview Now
        </button>
      </div>
    </div>
  );
}
