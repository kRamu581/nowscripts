import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export default function LearningProgressGauge() {
  const completion = 74;
  const data = [
    { name: 'Completed', value: completion },
    { name: 'Remaining', value: 100 - completion },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 lg:p-8 border border-gray-100 shadow-sm h-full flex flex-col justify-between">
      <h3 className="font-semibold text-gray-900 mb-6">Learning Progress</h3>

      <div className="relative w-full h-[140px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              <Cell key="cell-0" fill="#F97316" />
              <Cell key="cell-1" fill="#f3f4f6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Gauge Value Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-3xl font-extrabold text-gray-900">{completion}%</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit mb-1.5">
          <span className="text-xs font-bold">11.2%</span>
          <TrendingUp className="w-3 h-3" />
        </div>
        <div className="text-xs text-gray-400 font-medium">Compared to last month</div>
      </div>
    </div>
  );
}
