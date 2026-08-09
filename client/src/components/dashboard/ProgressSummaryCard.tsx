import React, { useState } from "react";
import { Clock, CheckCircle2, BookOpen, ChevronDown } from "lucide-react";
import { useStudyTime } from "../../contexts/StudyTimeContext";

export default function ProgressSummaryCard() {
  const [view, setView] = useState<"Month" | "Week">("Month");
  const { totalSeconds } = useStudyTime();

  // Convert seconds to hours and minutes
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  const timeDisplay = hours > 0 
    ? `${hours} hr ${minutes} min` 
    : `${minutes} min`;

  return (
    <div className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Progress</h3>
        <button 
          className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-full transition-colors"
          onClick={() => setView(view === "Month" ? "Week" : "Month")}
        >
          {view} <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{timeDisplay}</div>
            <div className="text-[11px] text-gray-500 font-medium">Time spent</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">1 course</div>
            <div className="text-[11px] text-gray-500 font-medium">Completed</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#FF5A5F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <BookOpen className="w-3.5 h-3.5 text-[#FF5A5F]" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">02 courses</div>
            <div className="text-[11px] text-gray-500 font-medium">Enrolled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
