import React, { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeCourseCard() {
  const [courseTitle, setCourseTitle] = useState("ServiceNow System Administrator (CSA)");
  const [courseUrl, setCourseUrl] = useState("/learn");

  useEffect(() => {
    const savedTitle = localStorage.getItem("nowscripts_last_course_title");
    const savedUrl = localStorage.getItem("nowscripts_last_course_url");
    
    if (savedTitle) setCourseTitle(savedTitle);
    if (savedUrl) setCourseUrl(savedUrl);
  }, []);

  return (
    <div className="bg-rose-50/50 rounded-[16px] p-5 lg:p-6 flex flex-col justify-between h-full border border-rose-100 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-gray-900 font-bold text-lg mb-6 tracking-tight line-clamp-2">{courseTitle}</h3>

        <div className="mb-5">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className="text-gray-500">Course complete</span>
            <span className="text-gray-900">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-gray-800 h-1 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        <Link to={courseUrl} className="flex items-center justify-between w-full max-w-[200px] px-5 py-2.5 bg-white border border-[#FF5A5F]/30 text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white hover:border-[#FF5A5F] transition-all rounded-full font-semibold text-xs group shadow-sm">
          <span>Continue learning</span>
          <PlayCircle className="w-3.5 h-3.5 fill-current group-hover:bg-white group-hover:text-[#FF5A5F] rounded-full transition-colors" />
        </Link>
      </div>
      
      {/* Decorative gradient blur in background */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
