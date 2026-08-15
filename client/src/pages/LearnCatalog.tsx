import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allTrackData } from "../utils/markdownParser";
import { Star, PlayCircle, Clock, BookOpen, Activity, Code, Server, Settings, Cpu, Layout, Cloud } from "lucide-react";
import { useAppContext } from "../App";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

export default function LearnCatalog() {
  const { hideNavbar } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");

  // We can categorize tracks for filters.
  // We'll generate some categories based on available tracks.
  const filters = ["All", "CSA", "CAD", "ITOM", "Development", "CS Fundamentals"];

  // Helper to determine visuals for the track
  const getTrackVisuals = (slug: string, index: number) => {
    const visuals = [
      { bg: "bg-blue-50", accent: "text-blue-600", border: "border-blue-200", shadow: "shadow-blue-200", icon: "Code", tags: "Scripts. Logic. Automation." },
      { bg: "bg-emerald-50", accent: "text-emerald-600", border: "border-emerald-200", shadow: "shadow-emerald-200", icon: "Server", tags: "Infrastructure. Mapping. Discovery." },
      { bg: "bg-orange-50", accent: "text-orange-600", border: "border-orange-200", shadow: "shadow-orange-200", icon: "Settings", tags: "Platform. Security. Configuration." },
      { bg: "bg-purple-50", accent: "text-purple-600", border: "border-purple-200", shadow: "shadow-purple-200", icon: "Cpu", tags: "AI. Machine Learning. Intelligence." },
      { bg: "bg-rose-50", accent: "text-rose-600", border: "border-rose-200", shadow: "shadow-rose-200", icon: "Layout", tags: "Experiences. Workspaces. Portals." },
      { bg: "bg-cyan-50", accent: "text-cyan-600", border: "border-cyan-200", shadow: "shadow-cyan-200", icon: "Cloud", tags: "Cloud. Integration. Services." },
    ];
    // Map specific slugs to visuals, fallback to index based
    if (slug.includes('ai') || slug.includes('generative') || slug.includes('va')) return visuals[3];
    if (slug.includes('dev') || slug.includes('sdk') || slug.includes('javascript') || slug.includes('cs-fundamentals')) return visuals[0];
    if (slug.includes('admin') || slug.includes('csa') || slug.includes('itom')) return visuals[2];
    
    return visuals[index % visuals.length];
  };

  const filteredTracks = activeFilter === "All" 
    ? allTrackData 
    : allTrackData.filter(track => {
        const title = track.title.toLowerCase();
        if (activeFilter === "Development" && (title.includes("dev") || title.includes("script") || title.includes("sdk"))) return true;
        if (activeFilter === "CSA" && (title.includes("csa") || title.includes("administrator"))) return true;
        if (activeFilter === "CAD" && (title.includes("cad") || title.includes("application developer"))) return true;
        if (activeFilter === "ITOM" && title.includes("itom")) return true;
        if (activeFilter === "CS Fundamentals" && title.includes("cs fundamentals")) return true;
        return false;
      });

  // Calculate total lessons for a track
  const getTotalLessons = (track: typeof allTrackData[0]) => {
    return track.sections.reduce((total, section) => total + section.lessons.length, 0);
  };

  // Generate Course Schema for SEO
  const courseSchemas = allTrackData.map(track => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": track.title,
    "description": `Master ${track.title} with hands-on practice labs and expert guidance.`,
    "provider": {
      "@type": "Organization",
      "name": "NowScripts",
      "sameAs": "https://www.nowscripts.in/"
    }
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nowscripts.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Learn",
        "item": "https://www.nowscripts.in/learn"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-8 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO 
        title="ServiceNow Courses & Learning Tracks"
        description="Explore comprehensive ServiceNow courses. Master CSA, CAD, ITSM, App Engine and more with hands-on labs and tutorials."
        canonicalUrl="https://www.nowscripts.in/learn"
        schema={[breadcrumbSchema, ...courseSchemas]}
      />
      <div className="max-w-7xl mx-auto">
        
        <Breadcrumbs />

        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in mt-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
            Start Your Learning Today!
          </h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-[#FF5A5F] text-white shadow-lg shadow-[#FF5A5F]/20 border border-[#FF5A5F]" 
                    : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
            <button className="px-5 py-2 border border-gray-300 bg-white rounded-full text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900 shadow-sm">
              View All
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTracks.map((track, index) => {
              const visual = getTrackVisuals(track.slug, index);
              const totalLessons = getTotalLessons(track);
              const rating = (4.5 + (Math.random() * 0.4)).toFixed(1); // Fake realistic rating
              
              // Find the first lesson to link to
              const firstCategory = track.sections[0]?.lessons[0]?.categorySlug || "fundamentals";
              const firstLesson = track.sections[0]?.lessons[0]?.slug || "navigation-user-interface";
              const linkUrl = `/learn/${firstCategory}/${firstLesson}`;

              // Resolve icon component dynamically
              const iconMap = { Code, Server, Settings, Cpu, Layout, Cloud };
              const IconComponent = iconMap[visual.icon as keyof typeof iconMap] || BookOpen;

              return (
                <Link 
                  to={linkUrl} 
                  key={track.trackId}
                  className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60"
                >
                  {/* Card Image Area (Styled like the Book Notes layout) */}
                  <div className={`relative h-60 w-full ${visual.bg} overflow-hidden p-5 flex items-center justify-between`}>
                    
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                    {/* Left Side Content */}
                    <div className="relative z-10 flex flex-col justify-between h-full w-[55%] pr-2">
                      <div>
                        <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${visual.accent}`}>COURSE MODULE</div>
                        <h3 className="text-gray-900 font-black text-xl leading-tight line-clamp-3 mb-2">
                          {track.title}
                        </h3>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                          Master the core concepts and practical skills.
                        </p>
                        <div className={`w-8 h-0.5 ${visual.accent.replace('text-', 'bg-')} mb-3`}></div>
                        <div className="text-sm font-bold text-gray-800">
                          NowScripts
                        </div>
                      </div>
                      
                      {/* Tags Pill */}
                      <div className={`mt-2 flex items-center gap-1.5 bg-white border ${visual.border} px-2 py-1 rounded-md shadow-sm w-fit`}>
                        <IconComponent size={12} className={visual.accent} />
                        <span className="text-[9px] font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                          {visual.tags}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right Side - Book Cover */}
                    <div className="relative z-10 w-[45%] h-full py-2">
                      <div className={`w-full h-full bg-white rounded shadow-lg ${visual.shadow} flex flex-col p-3 border border-gray-100 relative group-hover:scale-105 transition-transform duration-500`}>
                        {/* Book Cover Content */}
                        <h4 className="text-gray-900 font-bold text-sm leading-tight line-clamp-2">
                          {track.title}
                        </h4>
                        <div className="mt-1 text-[8px] text-gray-500 line-clamp-2">
                          Design, Automate & Deliver
                        </div>
                        
                        {/* Illustration Area */}
                        <div className="mt-auto relative w-full aspect-[4/3] flex items-center justify-center">
                          <IconComponent size={32} className={visual.accent} strokeWidth={1.5} />
                          
                          {/* Floating Elements (Decorative) */}
                          <div className={`absolute top-0 left-0 w-4 h-4 rounded-full border ${visual.border} flex items-center justify-center bg-white shadow-sm`}>
                            <Star size={6} className={visual.accent} />
                          </div>
                          <div className={`absolute bottom-2 right-0 w-5 h-5 rounded-full border ${visual.border} flex items-center justify-center bg-white shadow-sm`}>
                            <BookOpen size={8} className={visual.accent} />
                          </div>
                          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${visual.border} flex items-center justify-center bg-white shadow-sm`}>
                            <Clock size={4} className={visual.accent} />
                          </div>
                        </div>
                        
                        {/* Book Binding effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/10 to-transparent rounded-l"></div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area (simplified to remove duplicate title if needed, but keeping for layout consistency) */}
                  <div className="px-5 py-4 flex flex-col flex-grow bg-white border-t border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#FF5A5F] transition-colors">
                      {track.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} />
                        <span>{totalLessons} Chapters</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>Self-paced</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {filteredTracks.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>No courses found for the selected category.</p>
              <button 
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-[#38bdf8] hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
