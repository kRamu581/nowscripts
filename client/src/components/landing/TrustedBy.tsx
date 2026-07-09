import { motion } from "framer-motion";

export function TrustedBy() {
  const logos = [
    <div key="1" className="text-xl md:text-2xl font-black tracking-tighter text-[#D9381E] cursor-default whitespace-nowrap">ServiceNow</div>,
    <div key="2" className="text-xl md:text-2xl font-bold font-sans text-blue-600 cursor-default whitespace-nowrap">Microsoft</div>,
    <div key="3" className="text-xl md:text-2xl font-mono font-bold text-gray-900 cursor-default whitespace-nowrap">GitHub</div>,
    <div key="4" className="text-xl md:text-2xl font-black font-sans text-orange-500 cursor-default whitespace-nowrap">AWS</div>,
    <div key="5" className="text-xl md:text-2xl font-bold italic text-blue-500 cursor-default whitespace-nowrap">Salesforce</div>,
    <div key="6" className="text-xl md:text-2xl font-bold font-serif text-red-500 cursor-default whitespace-nowrap">Oracle</div>,
    <div key="7" className="text-xl md:text-2xl font-black tracking-widest text-blue-800 cursor-default whitespace-nowrap">IBM</div>,
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Master technologies trusted by industry leaders
        </p>
        
        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-hidden group">
          {/* Fading Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex group-hover:[animation-play-state:paused]">
            {/* First Set */}
            <div className="flex animate-marquee whitespace-nowrap">
              {logos.map((logo, index) => (
                <div key={`set1-${index}`} className="mx-8 md:mx-16 flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
            {/* Second Set (Seamless Loop) */}
            <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
              {logos.map((logo, index) => (
                <div key={`set2-${index}`} className="mx-8 md:mx-16 flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
            {/* Third Set (Seamless Loop for extra wide screens) */}
            <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
              {logos.map((logo, index) => (
                <div key={`set3-${index}`} className="mx-8 md:mx-16 flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-gray-400 mt-10 max-w-2xl mx-auto">
          *Note: NowScripts is an independent educational platform. These logos represent the technologies our community works with and are not official partnerships.
        </p>
      </div>
    </section>
  );
}
