import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

export function AmberResources() {
  const [activeFilter, setActiveFilter] = useState("CSA");

  const filters = ["CSA", "CAD", "CIS-ITSM", "Scripting", "Integration"];

  const resourcesData: Record<string, any[]> = {
    "CSA": [
      { badge: "Trending", title: "CSA Mock Exam 1", module: "Fundamentals", meta: "60 Questions", image: "/images/amber_card_2.png", rating: "4.9" },
      { badge: "New", title: "Vancouver Delta Questions", module: "Fundamentals", meta: "25 Questions", image: "/images/amber_card_1.png", rating: "5.0" },
      { badge: "", title: "Top 50 CSA Interview Questions", module: "Fundamentals", meta: "50 Questions", image: "/images/amber_card_4.png", rating: "4.8" },
      { badge: "Updated", title: "Administration Mini-Lab", module: "User Admin", meta: "1 Lab Project", image: "/images/amber_card_3.png", rating: "4.7" },
    ],
    // For brevity, we'll map all other filters to the same array or slightly varied.
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Thousands of Resources Globally</h2>
        <p className="text-gray-500 font-medium mb-8 text-lg">
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

        {/* Scrollable Property-Style Grid */}
        <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar">
          {currentResources.map((res, idx) => (
            <Link 
              key={idx}
              to="/interview-prep"
              className="group relative shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden snap-start flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={res.image} 
                  alt={res.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10 shadow-sm">
                  <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" />
                </button>
                {res.badge && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {res.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-4 bg-[#FF5A3C] text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                  {res.module}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
                    {res.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-500 mb-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-gray-700">{res.rating}</span>
                  <span className="mx-1">•</span>
                  <span>Free Access</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-gray-900 font-black">
                    {res.meta}
                  </div>
                  <div className="text-[#FF5A3C] font-bold text-sm bg-[#FFF0ED] px-4 py-2 rounded-lg group-hover:bg-[#FF5A3C] group-hover:text-white transition-colors">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
