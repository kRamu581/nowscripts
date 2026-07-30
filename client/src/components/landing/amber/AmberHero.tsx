import { Search, CheckCircle, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberHero() {
  return (
    <section className="relative w-full min-h-[550px] md:min-h-[520px] flex items-center justify-center overflow-hidden pt-24 md:pt-16 pb-12 md:pb-0">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Adjusted overlay for readability */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col items-start mt-12 md:mt-0">
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 mb-2 md:mb-4 drop-shadow-sm pb-1">
            Master ServiceNow Like a Pro
          </h1>
          <p className="text-base md:text-xl text-gray-100 font-medium mb-8 md:mb-10 drop-shadow-md leading-snug">
            Learn from real-world scenarios, build enterprise projects, and ace your certifications.
          </p>

          {/* Trust Badges / Stats */}
          <div className="flex flex-wrap items-center justify-start gap-2 md:gap-3 text-white text-[13px] md:text-base font-medium mb-8 md:mb-12 w-full">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span>100% Free Learning</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span>Real-world Practice</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm mt-1 sm:mt-0">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span>Interview Preparation</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-4 md:mb-12">
            <Link to="/learn" className="inline-flex px-8 py-4 bg-[#FF5A5F] hover:bg-[#E82C45] text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg items-center gap-2">
              Start Learning Free
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
