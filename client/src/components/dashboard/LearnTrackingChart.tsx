import React, { useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { MoreVertical } from "lucide-react";

export default function LearnTrackingChart() {
  const [view, setView] = useState("Month");
  
  // Data for three concentric rings
  const data = [
    { name: "Day", value: 80, fill: "#ec4899" }, // Pink
    { name: "Week", value: 45, fill: "#f59e0b" }, // Amber
    { name: "Month", value: 16, fill: "#F97316" } // Orange
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm h-full flex flex-col items-center relative">
      <div className="flex justify-between items-center w-full mb-4">
        <h3 className="font-semibold text-gray-900">Learn tracking</h3>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="relative w-[180px] h-[180px] flex items-center justify-center mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="50%" 
            outerRadius="100%" 
            barSize={8} 
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            {/* @ts-ignore */}
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#f3f4f6' }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Center Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-white shadow-sm border border-gray-100 rounded-lg px-3 py-1.5 flex flex-col items-center">
             <span className="font-bold text-gray-900 text-sm">16%</span>
             <span className="text-[9px] text-gray-500 font-medium whitespace-nowrap">Goal Distance</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 w-full">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></div>
          Month
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          Week
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
          Day
        </div>
      </div>
    </div>
  );
}
