import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search, BookOpen, Code, MessageSquare, ArrowLeft } from "lucide-react";
import axios from "axios";
import { url } from "../baseUrl";

export default function GlobalSearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{courses: any[], projects: any[], interview: any[]}>({ courses: [], projects: [], interview: [] });
  const [activeTab, setActiveTab] = useState<"all" | "courses" | "projects" | "interview">("all");

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const { data } = await axios.get(`${url}/api/global-search?q=${encodeURIComponent(query)}`);
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [query]);

  const hasResults = results.courses.length > 0 || results.projects.length > 0 || results.interview.length > 0;

  const renderSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20">
      <div className="max-w-7xl px-4 md:px-8 mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8 text-left">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Search Results
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Showing results for <span className="font-semibold text-gray-900">"{query}"</span>
          </p>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "all" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            All Results
          </button>
          <button 
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "courses" ? "bg-[#FF5A5F] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            <BookOpen className="w-4 h-4" /> Courses ({results.courses.length})
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "projects" ? "bg-[#FF5A5F] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            <Code className="w-4 h-4" /> Projects ({results.projects.length})
          </button>
          <button 
            onClick={() => setActiveTab("interview")}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "interview" ? "bg-[#FF5A5F] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            <MessageSquare className="w-4 h-4" /> Interview Prep ({results.interview.length})
          </button>
        </div>

        {/* Results */}
        <div className="space-y-10">
          {isSearching ? renderSkeleton() : (
            !hasResults ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">We couldn't find anything matching "{query}".</p>
                <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors">
                  Return Home
                </Link>
              </div>
            ) : (
              <>
                {/* Courses */}
                {(activeTab === "all" || activeTab === "courses") && results.courses.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Courses</h2>
                    </div>
                    <div className="grid gap-4">
                      {results.courses.map(course => (
                        <Link key={course.id} to={course.url} className="group bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF5A5F]/30 transition-all block">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors mb-2">{course.title}</h3>
                          {course.snippet && <p className="text-gray-600 text-sm leading-relaxed">{course.snippet}</p>}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects */}
                {(activeTab === "all" || activeTab === "projects") && results.projects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <Code className="w-4 h-4" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                    </div>
                    <div className="grid gap-4">
                      {results.projects.map(project => (
                        <Link key={project.id} to={project.url} className="group bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF5A5F]/30 transition-all block">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors mb-2">{project.title}</h3>
                          {project.snippet && <p className="text-gray-600 text-sm leading-relaxed">{project.snippet}</p>}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Interview Prep */}
                {(activeTab === "all" || activeTab === "interview") && results.interview.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Interview Prep</h2>
                    </div>
                    <div className="grid gap-4">
                      {results.interview.map(item => (
                        <Link key={item.id} to={item.url} className="group bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF5A5F]/30 transition-all block">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5A5F] transition-colors mb-2">{item.title}</h3>
                          {item.snippet && <p className="text-gray-600 text-sm leading-relaxed">{item.snippet}</p>}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
