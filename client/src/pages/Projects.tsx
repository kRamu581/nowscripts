import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Check, SlidersHorizontal, BookOpen, Sparkles, LayoutGrid, FolderOpen, Heart, Eye } from "lucide-react";
import { projectsData, projectTags, ProjectDifficulty } from "../data/projectsData";
import { BrandIconOnly, BrandLogo } from "../components/BrandLogo";
import FloatingAIBotButton from "../components/FloatingAIBotButton";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

const marqueeCategories = [
  { title: "Service Portal", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" },
  { title: "App Engine Studio", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" },
  { title: "CSM", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800" },
  { title: "HR Service Delivery", image: "https://images.unsplash.com/photo-1507238692062-5441cc1b29a3?q=80&w=800" },
  { title: "Security Operations", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800" },
  { title: "IT Service Management", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800" },
  { title: "Flow Designer", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" },
  { title: "UI Builder", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" },
];
const repeatedMarquee = [...marqueeCategories, ...marqueeCategories];

export function Projects() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "All" || project.module === activeTag;
    
    return matchesSearch && matchesTag;
  });

  const getDifficultyBadge = (diff: ProjectDifficulty) => {
    switch (diff) {
      case "Beginner": return <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">BEG</span>;
      case "Intermediate": return <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">INT</span>;
      case "Advanced": return <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">ADV</span>;
      default: return null;
    }
  };

  const projectItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projectsData.slice(0, 10).map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.shortDescription,
        "url": `https://www.nowscripts.in/projects/${project.id}`
      }
    }))
  };

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
        "name": "Projects",
        "item": "https://www.nowscripts.in/projects"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-6 pb-24">
      <SEO 
        title="ServiceNow Projects & Portfolio"
        description="Build real-world ServiceNow projects to add to your portfolio. Explore tutorials and assignments on ITSM, CSM, App Engine, and more."
        canonicalUrl="https://www.nowscripts.in/projects"
        schema={[breadcrumbSchema, projectItemListSchema]}
      />
      {/* Header Block (2-column layout like Dribbble) */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-2">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-8">
          <div className="max-w-xl">
            {/* Pill Tabs in Header (Like "Hire Talent / Get Hired") */}
            <div className="inline-flex items-center bg-gray-50 rounded-full p-1 mb-8 border border-gray-100">
              <button className="px-4 py-2 bg-white rounded-full text-xs font-bold text-gray-900 shadow-sm">Real Projects</button>
              <button className="px-4 py-2 rounded-full text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">Tutorials</button>
            </div>
            
            <h1 className="text-[40px] lg:text-[52px] font-extrabold text-[#0D0C22] tracking-tight leading-[1.05] mb-8 font-serif-like">
              Build real ServiceNow <span className="text-now-primary">projects</span>, not tutorials.
            </h1>
            
            <div className="flex flex-col gap-4 mb-10 text-gray-600 font-medium text-[15px] lg:text-[16px]">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-now-primary stroke-[3]" />
                </div>
                <span>Practice with real enterprise-style scenarios</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-now-primary stroke-[3]" />
                </div>
                <span>Structured, guided project briefs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-now-primary stroke-[3]" />
                </div>
                <span>Build a portfolio you can show in interviews</span>
              </div>
            </div>
            
            <button 
              onClick={() => document.getElementById('project-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#0D0C22] hover:bg-gray-800 text-white px-7 py-4 rounded-full font-bold text-[15px] transition-colors flex items-center gap-2 w-fit"
            >
              <Sparkles className="w-4 h-4" /> Browse Projects
            </button>
          </div>
          
          <div className="hidden lg:flex relative w-full">
            {/* Image Container */}
            <div className="relative w-full flex justify-center lg:justify-end mt-2">
              <img 
                src="/team-star-generated.png" 
                alt="Students collaborating on ServiceNow projects"
                className="w-full max-w-[450px] h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Floating Author Badge - Optional, can keep it if desired or remove it */}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section id="project-grid" className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-2 pb-6 bg-white z-20">
        
        {/* Top Tabs */}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 overflow-x-auto hide-scrollbar pb-1">
          <button 
            onClick={() => setActiveTab("Projects")}
            className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-full font-bold text-[14px] transition-colors ${activeTab === "Projects" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
          >
            <LayoutGrid className="w-4 h-4" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab("By Module")}
            className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-full font-bold text-[14px] transition-colors ${activeTab === "By Module" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
          >
            <FolderOpen className="w-4 h-4" /> By Module
          </button>
        </div>

        {/* Large Search Input */}
        <div className="relative w-full mb-8">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What kind of project are you looking for?"
            className="w-full h-[64px] pl-6 pr-20 bg-gray-50 border-none rounded-full text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all shadow-inner placeholder:text-gray-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-now-primary hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Tags row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1 w-full pr-4">
            <span className="text-gray-900 font-bold text-[14px] mr-2 shrink-0">Popular:</span>
            {projectTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors border ${
                  activeTag === tag 
                    ? "border-gray-900 text-gray-900 bg-gray-50" 
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <button className="hidden md:flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-semibold text-gray-700 hover:border-gray-300 min-w-[110px] shrink-0">
            Popular <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="group flex flex-col gap-3">
                <Link to={`/projects/${project.id}`} className="block relative rounded-[12px] overflow-hidden aspect-[4/3] bg-gray-100">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-white text-[15px] font-medium line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>
                
                {/* Author / Details Row */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img 
                      src={project.author?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} 
                      alt={project.author?.name || "Author"} 
                      className="w-6 h-6 rounded-full shrink-0" 
                    />
                    
                    <span className="font-semibold text-gray-900 hover:text-now-primary cursor-pointer transition-colors text-[13px] truncate">
                      {project.author?.name || "NowScripts"}
                    </span>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ml-1 ${project.author?.badge === 'PRO+' ? 'bg-[#0D0C22] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {project.author?.badge || "PRO"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-400 shrink-0">
                    <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer transition-colors">
                      <Heart className="w-3.5 h-3.5 fill-current" /> 
                      <span className="text-xs font-medium">{project.stats?.likes || 142}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors">
                      <Eye className="w-3.5 h-3.5 fill-current" /> 
                      <span className="text-xs font-medium">{project.stats?.views || "3.5k"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Sign Up & Marquee Section */}
      <section className="mt-24 pt-10 overflow-hidden w-full max-w-[100vw]">
        <div className="flex justify-center mb-16">
          <button className="bg-[#0D0C22] hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors">
            Sign up to continue
          </button>
        </div>
        
        {/* Marquee Wrapper */}
        <div className="relative w-full flex gap-6 animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused] whitespace-nowrap">
          {repeatedMarquee.map((cat, idx) => (
            <div key={idx} className="flex-shrink-0 w-[280px]">
               <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                 <img src={cat.image} alt={cat.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
               </div>
               <p className="font-bold text-[#0D0C22] text-[15px] cursor-pointer hover:text-now-primary transition-colors">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section (Dribbble Style) */}
      <footer className="w-full bg-white mt-12 pb-8 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col xl:flex-row items-center justify-between gap-6 py-12 border-b border-gray-100">
            <div className="flex flex-col xl:flex-row items-center gap-8 lg:gap-12">
              <BrandLogo hideTextOnMobile={false} />
              
              <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-[14px] font-bold text-[#0D0C22]">
                <Link to="#" className="hover:text-now-primary transition-colors">For Developers</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Hire Talent</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Inspiration</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Advertising</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Blog</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">About</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Careers</Link>
                <Link to="#" className="hover:text-now-primary transition-colors">Support</Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-5 text-[#0D0C22]">
              <a href="#" className="hover:text-now-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="hover:text-now-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="hover:text-now-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="hover:text-now-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-[14px] text-gray-500">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span>© 2026 NowScripts</span>
              <Link to="#" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Cookies</Link>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link to="#" className="hover:text-gray-900 transition-colors">Jobs</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Developers</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Freelancers</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Tags</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Places</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Resources</Link>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating AI Bot Button */}
      <FloatingAIBotButton />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
