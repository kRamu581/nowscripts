import { useState, useEffect, useRef } from "react";
import { Search, CheckCircle, Shield, Clock, BookOpen, Code, MessageSquare, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../../baseUrl";

export function AmberHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{courses: any[], projects: any[], interview: any[]}>({ courses: [], projects: [], interview: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch results when debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2) {
        setSearchResults({ courses: [], projects: [], interview: [] });
        return;
      }
      
      setIsSearching(true);
      try {
        const { data } = await axios.get(`${url}/api/global-search?q=${encodeURIComponent(debouncedQuery)}`);
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      setShowDropdown(false);
      navigate(`/global-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const hasResults = searchResults.courses.length > 0 || searchResults.projects.length > 0 || searchResults.interview.length > 0;

  return (
    <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center justify-center overflow-hidden pt-20 md:pt-16 pb-12 md:pb-0">
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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white/90 mb-3 drop-shadow-sm pb-1">
          ServiceNow Sandbox for Builders
        </h1>
        <p className="text-sm md:text-lg text-white/80 font-medium mb-8 md:mb-10 drop-shadow-md">
          Learn from real-world scenarios, build enterprise projects, and ace your certifications
        </p>

        {/* Trust Badges / Stats */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white text-[12px] md:text-[13px] font-medium mb-8 w-full">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-white opacity-80" />
            <span>Real-world Practice</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 shadow-sm">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-white opacity-80" />
            <span>24x7 Community Help</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 shadow-sm">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-white opacity-80" />
            <span>Interview Preparation</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative" ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for ServiceNow courses, projects, or interview questions..."
              className="w-full h-12 md:h-14 pl-5 pr-14 md:pr-16 rounded-full bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] placeholder-gray-400"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="absolute right-12 md:right-16 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF5A5F] hover:bg-[#E82C45] transition-colors text-white rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shadow-md"
            >
              {isSearching ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Search className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </form>

          {/* Search Dropdown */}
          {showDropdown && searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 max-h-[70vh] flex flex-col text-left">
              <div className="overflow-y-auto p-2 md:p-3 space-y-4 max-h-[400px]">
                {isSearching ? (
                  <div className="flex items-center justify-center p-8 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mr-2 text-[#FF5A5F]" />
                    <span className="text-sm font-medium">Searching...</span>
                  </div>
                ) : !hasResults ? (
                  <div className="text-center p-8 text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-800 mb-1">No results for "{searchQuery}"</p>
                    <p className="text-xs">Try different keywords or browse our categories.</p>
                  </div>
                ) : (
                  <>
                    {/* Courses Section */}
                    {searchResults.courses.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">
                          <BookOpen className="w-3.5 h-3.5" /> Courses
                        </div>
                        <div className="space-y-1">
                          {searchResults.courses.map((course: any) => (
                            <Link 
                              key={course.id} 
                              to={course.url} 
                              onClick={() => setShowDropdown(false)}
                              className="block p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors">{course.title}</h4>
                              </div>
                              {course.snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.snippet}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects Section */}
                    {searchResults.projects.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 border-t border-gray-50 mt-2">
                          <Code className="w-3.5 h-3.5" /> Projects
                        </div>
                        <div className="space-y-1">
                          {searchResults.projects.map((project: any) => (
                            <Link 
                              key={project.id} 
                              to={project.url} 
                              onClick={() => setShowDropdown(false)}
                              className="block p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors">{project.title}</h4>
                              </div>
                              {project.snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{project.snippet}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interview Questions Section */}
                    {searchResults.interview.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 border-t border-gray-50 mt-2">
                          <MessageSquare className="w-3.5 h-3.5" /> Interview Prep
                        </div>
                        <div className="space-y-1">
                          {searchResults.interview.map((item: any) => (
                            <Link 
                              key={item.id} 
                              to={item.url} 
                              onClick={() => setShowDropdown(false)}
                              className="block p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors">{item.title}</h4>
                              </div>
                              {item.snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.snippet}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {hasResults && !isSearching && (
                <div className="p-2 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 text-sm font-bold text-[#FF5A5F] hover:bg-[#FF5A5F]/10 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    See all results for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
