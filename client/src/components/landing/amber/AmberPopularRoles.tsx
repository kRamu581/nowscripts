import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export function AmberPopularRoles() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const modulesData = [
    { 
      title: "ServiceNow Fundamentals", 
      desc: "Master the basics. Build your foundation and get ready for the CSA certification.",
      btnText: "Start Learning",
      bgClass: "bg-gradient-to-r from-[#FFF4ED] to-[#FFDFC7]",
      image: "/images/amber_card_1.png"
    },
    { 
      title: "IT Service Management", 
      desc: "Learn Incident, Problem, and Change Management. Real enterprise scenarios.",
      btnText: "Explore ITSM",
      bgClass: "bg-gradient-to-r from-[#FFF0F9] to-[#FFCEF3]",
      image: "/images/amber_card_2.png"
    },
    { 
      title: "Service Portal & UI", 
      desc: "Build engaging user experiences. Master widgets, pages, and portals.",
      btnText: "Build Portals",
      bgClass: "bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FF]",
      image: "/images/amber_card_3.png"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-[28px] font-black text-[#111928] mb-1.5 tracking-tight">Popular Modules Across ServiceNow</h2>
        <p className="text-gray-500 font-medium mb-10 text-[15px]">
          Several learning tracks, modules and special roadmaps crafted just for you.
        </p>

        {/* Scrollable Grid Wrapper */}
        <div className="relative group">
          {/* Nav Buttons (shown on hover/desktop) */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Cards */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory hide-scrollbar relative z-10"
          >
            {modulesData.map((module, idx) => (
              <div 
                key={idx} 
                className={`relative shrink-0 w-[85vw] sm:w-[480px] h-[220px] rounded-xl overflow-hidden snap-start block ${module.bgClass} flex`}
              >
                {/* Wavy background pattern overlay (simulated with CSS stripes or just left plain to rely on gradient) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)' }}></div>

                {/* Left Text Content */}
                <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 w-[65%]">
                  <h3 className="text-[#111928] font-bold text-[19px] sm:text-[21px] leading-tight mb-2 pr-2">{module.title}</h3>
                  <p className="text-[#4B5563] text-[13px] sm:text-[14px] leading-snug mb-6 pr-4 font-medium">
                    {module.desc}
                  </p>
                  <Link to="/roadmaps">
                    <button className="bg-[#EF4466] hover:bg-[#D93856] text-white text-[13px] font-bold py-2 px-5 rounded-[4px] shadow-sm transition-colors w-max">
                      {module.btnText}
                    </button>
                  </Link>
                </div>

                {/* Right Image */}
                <div className="absolute right-0 bottom-0 w-[45%] h-[90%] sm:h-[100%] flex items-end justify-end pointer-events-none">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover object-left-bottom"
                    style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
