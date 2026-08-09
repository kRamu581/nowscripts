import React from "react";
import { useStudyTime } from "../../contexts/StudyTimeContext";

export default function ActivityStreakCard() {
  const { totalSeconds } = useStudyTime();
  const streakDays = 1; // Real streak tracking would go here
  
  // Get days in current month
  const date = new Date();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const dotCalendar = Array.from({ length: daysInMonth }).map((_, i) => ({
    active: i < streakDays,
  }));

  return (
    <div className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Your Activity</h3>
      </div>

      <div className="mb-5 flex-1 flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-gray-900">{streakDays}</span>
          <span className="text-sm font-medium text-gray-600">Days Streak</span>
        </div>
      </div>

      {/* Dot Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 mt-auto">
        {dotCalendar.map((dot, idx) => (
          <div 
            key={idx} 
            className={`w-full aspect-square rounded-full ${dot.active ? 'bg-[#FF5A5F]' : 'bg-gray-100'}`}
          />
        ))}
      </div>
    </div>
  );
}
