import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function AmberPopularRoles() {
  const [activeTab, setActiveTab] = useState("Developer Track");

  const tabs = ["Admin Track", "Developer Track", "Architect Track"];

  const modulesData: Record<string, { title: string, image: string }[]> = {
    "Admin Track": [
      { title: "ServiceNow Fundamentals", image: "/images/amber_card_1.png" },
      { title: "IT Service Management", image: "/images/amber_card_2.png" },
      { title: "Platform UI/UX", image: "/images/amber_card_3.png" },
      { title: "User Administration", image: "/images/amber_card_4.png" },
    ],
    "Developer Track": [
      { title: "Client-Side Scripting", image: "/images/amber_card_4.png" },
      { title: "Server-Side Scripting", image: "/images/amber_card_1.png" },
      { title: "REST Integrations", image: "/images/amber_card_2.png" },
      { title: "Service Portal", image: "/images/amber_card_3.png" },
    ],
    "Architect Track": [
      { title: "Instance Architecture", image: "/images/amber_card_3.png" },
      { title: "Data Modeling", image: "/images/amber_card_4.png" },
      { title: "Security Operations", image: "/images/amber_card_1.png" },
      { title: "Performance Tuning", image: "/images/amber_card_2.png" },
    ]
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Popular Modules Across ServiceNow</h2>
        <p className="text-gray-500 font-medium mb-8 text-lg">
          Find the best modules to master for your specific career path.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all ${
                activeTab === tab 
                  ? "bg-[#FFF0ED] text-[#FF5A3C] border-[#FF5A3C]" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Grid */}
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
          {modulesData[activeTab].map((module, idx) => (
            <Link 
              key={idx} 
              to="/roadmaps"
              className="relative shrink-0 w-[280px] h-[340px] rounded-2xl overflow-hidden group snap-start block"
            >
              <img 
                src={module.image} 
                alt={module.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full flex items-center justify-between">
                <h3 className="text-white font-bold text-xl drop-shadow-md pr-4">{module.title}</h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-[#FF5A3C] transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
          
          <Link 
            to="/roadmaps"
            className="relative shrink-0 w-[280px] h-[340px] rounded-2xl overflow-hidden group snap-start flex flex-col items-center justify-center bg-gray-50 border border-gray-200 hover:border-[#FF5A3C] hover:bg-[#FFF0ED] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-3 group-hover:border-[#FF5A3C]">
              <ChevronRight className="w-6 h-6 text-[#FF5A3C]" />
            </div>
            <span className="text-gray-800 font-bold text-lg group-hover:text-[#FF5A3C]">View All Modules</span>
          </Link>
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
