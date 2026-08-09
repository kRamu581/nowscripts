import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ExternalLink } from "lucide-react";

const topCourses = [
  { id: "basis", name: "ServiceNow Basics", title: "Foundation Course", link: "/learn" },
  { id: "csa", name: "ServiceNow System Administrator (CSA)", title: "Certification Prep", link: "/learn" },
  { id: "cad", name: "Certified Application Developer (CAD)", title: "Certification Prep", link: "/learn" },
];

export default function TopCoursesCard() {
  return (
    <div className="bg-white rounded-[16px] p-5 lg:p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Top Courses</h3>
        <button className="text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {topCourses.map((course) => (
          <Link 
            to={course.link}
            key={course.id} 
            className="flex items-center justify-between group bg-gray-50/50 hover:bg-rose-50/50 p-2.5 rounded-xl border border-transparent hover:border-rose-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-[#FF5A5F] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors line-clamp-1">
                  {course.name}
                </div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {course.title}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end flex-shrink-0 ml-2">
               <div className="w-6 h-6 rounded-full bg-white border border-gray-200 group-hover:border-[#FF5A5F] group-hover:text-[#FF5A5F] flex items-center justify-center transition-colors text-gray-400 shadow-sm">
                 <ExternalLink className="w-3 h-3" />
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
