import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AmberResources() {
  const [activeFilter, setActiveFilter] = useState("CSA");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filters = ["CSA", "CAD", "CIS-ITSM", "Scripting", "Integration"];

  const bgClasses = [
    "bg-gradient-to-r from-[#FFF4ED] to-[#FFDFC7]",
    "bg-gradient-to-r from-[#FFF0F9] to-[#FFCEF3]",
    "bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FF]",
    "bg-gradient-to-r from-[#F0FFF4] to-[#C7FFD4]"
  ];

  const resourcesData: Record<string, any[]> = {
    "CSA": [
      { badge: "Trending", title: "CSA Mock Exam 1", module: "Fundamentals", meta: "60 Questions", image: "/images/amber_card_2.png", rating: "4.9" },
      { badge: "New", title: "Vancouver Delta Questions", module: "Fundamentals", meta: "25 Questions", image: "/images/amber_card_1.png", rating: "5.0" },
      { badge: "", title: "Top 50 CSA Interview", module: "Fundamentals", meta: "50 Questions", image: "/images/amber_card_4.png", rating: "4.8" },
      { badge: "Updated", title: "Admin Mini-Lab", module: "User Admin", meta: "1 Lab Project", image: "/images/amber_card_3.png", rating: "4.7" },
    ],
    "CAD": [
      { badge: "Trending", title: "CAD Scripting Prep", module: "Scripting", meta: "45 Questions", image: "/images/amber_card_3.png", rating: "4.9" },
      { badge: "New", title: "REST API Integration Lab", module: "Integrations", meta: "1 Lab Project", image: "/images/amber_card_1.png", rating: "5.0" },
    ],
    "CIS-ITSM": [],
    "Scripting": [],
    "Integration": [],
  };

  const currentResources = resourcesData[activeFilter] || resourcesData["CSA"];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-[28px] font-black text-[#111928] mb-1.5 tracking-tight">Thousands of Resources Globally</h2>
        <p className="text-gray-500 font-medium mb-8 text-[15px]">
          Practice with real-world scenarios and past interview questions.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
                activeFilter === filter 
                  ? "bg-[#FFF0ED] text-[#FF5A3C] border-[#FF5A3C]" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {activeFilter === filter && <div className="w-2 h-2 rounded-full bg-[#FF5A3C]" />}
              {filter}
            </button>
          ))}
        </div>

        {/* Scrollable Grid Wrapper */}
        <div className="relative group">
          {/* Nav Buttons */}
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
            {currentResources.map((res, idx) => (
              <div 
                key={idx} 
                className={`relative shrink-0 w-[85vw] sm:w-[480px] h-[220px] rounded-xl overflow-hidden snap-start block ${bgClasses[idx % bgClasses.length]} flex`}
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)' }}></div>

                <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 w-[65%]">
                  {res.badge && (
                    <span className="text-[#EF4466] text-[11px] font-bold uppercase tracking-wider mb-1">{res.badge}</span>
                  )}
                  <h3 className="text-[#111928] font-bold text-[19px] sm:text-[21px] leading-tight mb-2 pr-2">{res.title}</h3>
                  <p className="text-[#4B5563] text-[13px] sm:text-[14px] leading-snug mb-6 pr-4 font-medium">
                    {res.meta} • {res.module} • ⭐ {res.rating}
                  </p>
                  <Link to="/interview-prep">
                    <button className="bg-[#EF4466] hover:bg-[#D93856] text-white text-[13px] font-bold py-2 px-5 rounded-[4px] shadow-sm transition-colors w-max">
                      View Resource
                    </button>
                  </Link>
                </div>

                <div className="absolute right-0 bottom-0 w-[45%] h-[90%] sm:h-[100%] flex items-end justify-end pointer-events-none">
                  <img 
                    src={res.image} 
                    alt={res.title}
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
