import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import { useStudyTime } from "../../contexts/StudyTimeContext";

export default function StudyStatisticsChart() {
  const [view, setView] = useState("Weekly");
  const { weeklyData } = useStudyTime();

  // Convert weeklyData (seconds) to hours (or fractional hours for the chart)
  const data = [
    { name: "Mon", goal: 2, active: Number((weeklyData[0] / 3600).toFixed(2)) },
    { name: "Tue", goal: 3, active: Number((weeklyData[1] / 3600).toFixed(2)) },
    { name: "Wed", goal: 4, active: Number((weeklyData[2] / 3600).toFixed(2)) },
    { name: "Thu", goal: 2, active: Number((weeklyData[3] / 3600).toFixed(2)) },
    { name: "Fri", goal: 5, active: Number((weeklyData[4] / 3600).toFixed(2)) },
    { name: "Sat", goal: 6, active: Number((weeklyData[5] / 3600).toFixed(2)) },
    { name: "Sun", goal: 4, active: Number((weeklyData[6] / 3600).toFixed(2)) },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Find the active payload
      const activePayload = payload.find((p: any) => p.dataKey === 'active');
      const val = activePayload ? activePayload.value : 0;
      
      // Convert fractional hours back to hours/minutes for tooltip
      const totalSeconds = Math.round(val * 3600);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      
      const timeStr = h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`;
      
      return (
        <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-lg font-medium">
          {label}: {timeStr}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[16px] p-5 lg:p-6 border border-gray-100 shadow-sm h-full flex flex-col relative overflow-hidden">
      
      {/* Anime Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-multiply"
        style={{ backgroundImage: "url('/anime_study_bg.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="font-semibold text-gray-900 text-sm">Study Statistics</h3>
        <button 
          className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-50/80 backdrop-blur-sm hover:bg-gray-100 px-2.5 py-1 rounded-full transition-colors border border-gray-200/50"
          onClick={() => setView(view === "Weekly" ? "Monthly" : "Weekly")}
        >
          {view} <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 w-full min-h-[140px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -24, bottom: 0 }} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} 
              tickFormatter={(val) => `${val}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#FF5A5F', strokeWidth: 1 }} />
              </pattern>
            </defs>
            <Bar dataKey="goal" fill="#f3f4f6" radius={[3, 3, 3, 3]} />
            <Bar dataKey="active" fill="url(#diagonalHatch)" radius={[3, 3, 3, 3]} style={{ transform: 'translateX(-12px)' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100/50 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A5F]"></div>
          Active
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
          Goal
        </div>
      </div>
    </div>
  );
}
