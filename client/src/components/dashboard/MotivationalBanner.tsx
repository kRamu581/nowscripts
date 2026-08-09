import React from "react";
import { Plus } from "lucide-react";

export default function MotivationalBanner() {
  return (
    <div className="bg-rose-50/50 border border-rose-100 rounded-[16px] p-5 lg:p-6 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight max-w-[200px]">
          Keep Learning New Things Everyday
        </h2>
        <p className="text-gray-600 text-[13px] font-medium mb-6 max-w-[220px] md:max-w-[200px] lg:max-w-[220px] leading-relaxed relative z-10">
          Get ready for an exciting journey into new knowledge! This exploration promises to be enlightening and enriching.
        </p>
        
        <a 
          href="https://discord.gg/jXMGus7MF" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#FF5A5F] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#E82C45] transition-colors w-fit shadow-sm relative z-10"
        >
          Join community
          <Plus className="w-4 h-4" />
        </a>
      </div>
      
      <div className="absolute right-0 bottom-0 w-[130px] md:w-[140px] lg:w-[160px] h-[180px] md:h-[200px] pointer-events-none opacity-30 md:opacity-100 mix-blend-multiply">
        <img 
          src="/cartoon_student.jpg" 
          alt="Cartoon Student" 
          className="w-full h-full object-cover object-top [mask-image:linear-gradient(to_top,black_50%,transparent_100%)]"
        />
      </div>
    </div>
  );
}
