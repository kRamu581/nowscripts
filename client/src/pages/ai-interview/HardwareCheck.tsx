import React from "react";
import { Clock, Activity, Volume2, MessageSquare, PhoneCall, HelpCircle } from "lucide-react";

interface HardwareCheckProps {
  config: any;
  onNext: () => void;
  onBack: () => void;
}

export function HardwareCheck({ config, onNext, onBack }: HardwareCheckProps) {
  return (
    <div className="w-full min-h-screen bg-now-background flex flex-col items-center justify-center py-4 px-3 sm:p-8 relative font-sans overflow-y-auto">
      
      <div className="w-full max-w-[500px] flex flex-col">
        {/* Back button positioned in normal flow above the card */}
        <button 
          onClick={onBack}
          className="self-start mb-3 text-[#5b5e63] hover:text-[#191b1f] font-semibold text-[13px] bg-white px-3 py-1.5 rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-1.5 transition-all"
        >
          &larr; Back
        </button>

        <div className="w-full bg-white rounded-[16px] p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#f0f0f0] relative">
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">Start your interview</h1>
              <p className="text-sm text-gray-600">This interview requires you to be on video.</p>
            </div>
          <div className="text-now-primary">
            <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Info Cards */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Card 1 (Full width) */}
          <div className="border border-gray-200 rounded-2xl p-3.5 flex gap-3 items-start">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">This won't take long</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Your AI interviewer will lead you through the process.</p>
            </div>
          </div>

          {/* Grid for Cards 2 and 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 2 */}
            <div className="border border-gray-200 rounded-2xl p-3.5 flex gap-3 items-start">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Be natural</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Speak as you normally would, the AI interviewer will understand.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-200 rounded-2xl p-3.5 flex gap-3 items-start">
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Quiet spot and strong wifi</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Make sure your audio is crisp and clear upon review.</p>
              </div>
            </div>
          </div>

          {/* Card 4 (Full width) */}
          <div className="border border-gray-200 rounded-2xl p-3.5 flex gap-3 items-start">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Reviewed by a human</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Each call is reviewed by someone on our team.</p>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            onClick={onNext}
            className="w-full bg-now-primary hover:bg-now-accent text-white font-bold py-3 rounded-full transition-all shadow-[0_4px_14px_0_rgba(255,90,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,95,0.23)] text-[15px]"
          >
            Join interview
          </button>
          <div className="text-[11px] text-[#5b5e63] font-medium whitespace-nowrap mt-1">
            Privacy Policy &nbsp;&middot;&nbsp; Terms
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
