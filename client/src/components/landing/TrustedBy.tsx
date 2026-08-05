import { Star } from "lucide-react";

export function TrustedBy() {
  const logos = [
    <div key="servicenow" className="flex items-center gap-1 mx-8 md:mx-12">
      <svg viewBox="0 0 24 24" className="h-6 text-[#81B5A1] fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
      <span className="text-gray-800 font-bold text-xl tracking-tight">servicenow</span>
    </div>,
    <div key="linkedin" className="flex items-center gap-1.5 mx-8 md:mx-12">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#0A66C2]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      <span className="text-[#0A66C2] font-bold text-xl tracking-tight">LinkedIn</span>
    </div>,
    <div key="kpmg" className="mx-8 md:mx-12">
      <span className="text-[#00338D] font-black text-2xl tracking-tighter">KPMG</span>
    </div>,
    <div key="accenture" className="mx-8 md:mx-12">
      <span className="text-black font-black text-2xl tracking-tight">accenture <span className="text-[#A100FF] font-bold">&gt;</span></span>
    </div>,
    <div key="techm" className="mx-8 md:mx-12">
      <span className="text-[#E31837] font-bold text-2xl">Tech<span className="text-gray-600">Mahindra</span></span>
    </div>,
    <div key="lti" className="mx-8 md:mx-12">
      <span className="text-[#002855] font-bold text-2xl">LTIMindtree</span>
    </div>,
    <div key="deloitte" className="mx-8 md:mx-12">
      <span className="text-black font-bold text-2xl">Deloitte<span className="text-[#86BC25]">.</span></span>
    </div>,
    <div key="tcs" className="mx-8 md:mx-12">
      <span className="text-[#1374BB] font-bold text-2xl">TCS</span>
    </div>
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 relative z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-semibold text-xs tracking-wider mb-6">
            <Star className="w-3 h-3 fill-current" />
            TRUSTED BY LEADERS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master technologies with industry leaders
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            We collaborate with the world's leading technology companies to bring you the best learning experience
          </p>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-hidden group mb-10">
          {/* Fading Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex group-hover:[animation-play-state:paused]">
            {/* First Set */}
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {logos.map((logo, index) => (
                <div key={`set1-${index}`} className="flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
            {/* Second Set (Seamless Loop) */}
            <div className="flex animate-marquee whitespace-nowrap items-center" aria-hidden="true">
              {logos.map((logo, index) => (
                <div key={`set2-${index}`} className="flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
            {/* Third Set (Seamless Loop for extra wide screens) */}
            <div className="flex animate-marquee whitespace-nowrap items-center" aria-hidden="true">
              {logos.map((logo, index) => (
                <div key={`set3-${index}`} className="flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed relative z-20">
          *Note: NowScripts is an independent educational platform.<br />
          These logos represent the technologies our community works with and are not official partnerships.
        </p>

        {/* Sarvam Banner */}
        <div className="max-w-3xl mx-auto relative z-20">
          <div className="bg-gradient-to-r from-purple-50/50 to-white border border-purple-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 shadow-[0_4px_20px_rgba(147,51,234,0.05)]">
            
            {/* Sarvam Logo */}
            <div className="flex items-center gap-4">
              <img 
                src="/sarvam-logo.png" 
                alt="Sarvam Logo" 
                className="h-16 w-auto mix-blend-multiply object-contain"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-purple-600 tracking-[0.2em] uppercase mt-1">Startup Program</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-purple-200"></div>

            {/* Text */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Proud to be part of the <br />
                <span className="text-purple-700 font-bold">SARVAM Startup Program</span> <br />
                Empowering builders. Backed by innovation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
