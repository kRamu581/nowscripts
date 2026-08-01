import { Search, CheckCircle, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberHero() {
  return (
    <section className="relative w-full min-h-[550px] md:min-h-[520px] flex items-center justify-center overflow-hidden pt-24 md:pt-16 pb-12 md:pb-0">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[70%_center] md:bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 w-full flex flex-col items-center mt-12 md:mt-0 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 drop-shadow-sm pb-1">
          Master ServiceNow
        </h1>
        <p className="text-base md:text-xl text-white font-medium mb-8 md:mb-10 drop-shadow-md">
          Learn from real-world scenarios, build enterprise projects, and ace your certifications
        </p>

        {/* Trust Badges / Stats */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white text-[13px] md:text-sm font-medium mb-8 w-full">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-sm">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white opacity-80" />
            <span>Real-world Practice</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-sm">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-white opacity-80" />
            <span>24x7 Community Help</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-sm">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-white opacity-80" />
            <span>Interview Preparation</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl relative">
          <input
            type="text"
            placeholder="Search for ServiceNow courses, projects, or interview questions..."
            className="w-full h-14 md:h-16 pl-6 pr-16 md:pr-20 rounded-full bg-white text-gray-800 text-sm md:text-base focus:outline-none shadow-2xl placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF5A5F] hover:bg-[#E82C45] transition-colors text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
