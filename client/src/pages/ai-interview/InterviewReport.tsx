import React from "react";
import { Download, CheckCircle, AlertTriangle, ArrowRight, Share2, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface InterviewReportProps {
  results: any;
  config: any;
}

export function InterviewReport({ results, config }: InterviewReportProps) {
  
  return (
    <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[340px] bg-white rounded-[16px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] flex flex-col mx-auto">
        
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-[#191b1f] leading-tight max-w-[85%]">
            Your interview has ended at {results?.duration || "00:00"}
          </h2>
          <div className="mt-1 text-[#6366f1]">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-8">
          Your interview is done processing.
        </p>

        <Link 
          to="/interview-prep"
          className="w-full bg-now-primary hover:bg-now-accent text-white font-bold py-3 rounded-full transition-all text-center shadow-[0_4px_14px_0_rgba(255,90,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,95,0.23)] text-[15px]"
        >
          Done
        </Link>

      </div>
    </div>
  );
}
