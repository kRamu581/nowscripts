import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search, Filter, Calendar, ExternalLink, Sparkles, BookOpen, Settings, Users, Flame, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { useAppContext } from "../App";
import { url } from "../baseUrl";

interface Article {
  _id: string;
  title: string;
  source: string;
  author?: string;
  publishedAt: string;
  summary: string;
  articleUrl: string;
  category: string;
  imageUrl?: string;
}

interface NewsletterResponse {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

const CATEGORIES = ["All", "Releases", "Certifications", "AI", "ITSM", "Development", "Community", "Careers"];

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case "releases": return <Settings className="w-4 h-4" />;
    case "ai": return <Sparkles className="w-4 h-4 text-[#FF5A3C]" />;
    case "certifications": return <BookOpen className="w-4 h-4" />;
    case "community": return <Users className="w-4 h-4" />;
    case "development": return <Flame className="w-4 h-4" />;
    case "careers": return <Briefcase className="w-4 h-4" />;
    default: return null;
  }
};

const getCategoryColor = (category: string) => {
  // We use unified minimalist style rather than 10 different colors to match Amber
  return "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300";
};

export default function Newsletter() {
  const { hideNavbar } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // articles per page

  useEffect(() => {
    hideNavbar(true);
    document.title = "ServiceNow Pulse | NowScripts";
    return () => hideNavbar(false);
  }, []);

  // Debounce search query to avoid spamming the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchArticles = async (page: number, category: string, search: string): Promise<NewsletterResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (category !== "All") params.append("category", category);
    if (search) params.append("search", search);

    try {
      const response = await axios.get(`${url}/newsletter?${params.toString()}`);
      if (response.data && Array.isArray(response.data.articles)) {
        return response.data;
      }
      if (Array.isArray(response.data)) {
        return { articles: response.data, pagination: { total: response.data.length, page: 1, pages: 1 } };
      }
      return { articles: [], pagination: { total: 0, page: 1, pages: 1 } };
    } catch (err) {
      console.error(err);
      return { articles: [], pagination: { total: 0, page: 1, pages: 1 } };
    }
  };

  const { data, isLoading } = useQuery<NewsletterResponse>({
    queryKey: ["newsletterArticles", currentPage, activeCategory, debouncedSearch],
    queryFn: () => fetchArticles(currentPage, activeCategory, debouncedSearch),
    keepPreviousData: true,
  });

  const articles = data?.articles || [];
  const pagination = data?.pagination;

  const isDefaultView = currentPage === 1 && activeCategory === "All" && !debouncedSearch;
  const featuredArticle = isDefaultView && articles.length > 0 ? articles[0] : null;
  const gridArticles = isDefaultView ? articles.slice(1) : articles;

  return (
    <div className="min-h-screen bg-white text-[#111928] pt-24 pb-20 relative overflow-hidden font-sans">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold tracking-wide uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-now-primary"></span>
            Live Updates
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#111928] mb-6 leading-[1.1]"
          >
            ServiceNow Pulse
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl leading-relaxed font-medium"
          >
            Your daily digest of ecosystem updates, technical deep dives, certifications, and community highlights.
          </motion.p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === category
                    ? "bg-[#111928] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#111928]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 rounded-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-[#111928] placeholder:text-gray-400 focus:outline-none focus:border-now-primary focus:ring-1 focus:ring-now-primary transition-all font-medium"
            />
          </div>
        </div>

        {/* Featured Article Section */}
        {featuredArticle && !isLoading && (
          <div className="mb-12">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-[2rem] flex flex-col md:flex-row overflow-hidden transition-all duration-500 hover:shadow-lg"
            >
              {featuredArticle.imageUrl && (
                <div className="md:w-2/5 relative min-h-[250px] overflow-hidden bg-gray-100">
                  <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white hidden md:block z-10"></div>
                </div>
              )}
              
              <div className={`p-8 md:p-12 flex flex-col justify-center relative z-20 ${featuredArticle.imageUrl ? 'md:w-3/5' : 'w-full'}`}>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getCategoryColor(featuredArticle.category)}`}>
                    {getCategoryIcon(featuredArticle.category)}
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111928] mb-6 leading-tight group-hover:text-now-primary transition-colors">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-3xl font-medium">
                  {featuredArticle.summary}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111928]">{featuredArticle.source}</span>
                    {featuredArticle.author && <span className="text-xs text-gray-500 font-medium">by {featuredArticle.author}</span>}
                  </div>
                  <a 
                    href={featuredArticle.articleUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-[#111928] border border-gray-200 font-bold hover:bg-gray-100 hover:border-gray-300 transition-all w-full sm:w-auto"
                  >
                    Read Full Story <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        )}

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-50 rounded-[2rem] animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : gridArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {gridArticles.map((article, idx) => (
                <motion.article 
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-[2rem] flex flex-col overflow-hidden transition-all duration-500 hover:shadow-lg"
                >
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-colors ${getCategoryColor(article.category)}`}>
                        {getCategoryIcon(article.category)}
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold text-[#111928] mb-4 leading-tight group-hover:text-now-primary transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed flex-1 font-medium">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#111928] uppercase tracking-wider">
                          {article.source}
                        </span>
                        {article.author && <span className="text-[10px] font-medium text-gray-500">{article.author}</span>}
                      </div>
                      <a 
                        href={article.articleUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-bold text-now-primary hover:text-now-accent transition-colors"
                      >
                        Read <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-white border border-gray-200 text-[#111928] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold text-gray-500">
                  Page <span className="text-[#111928]">{pagination.page}</span> of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={currentPage === pagination.pages}
                  className="p-3 rounded-full bg-white border border-gray-200 text-[#111928] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-[2rem] border border-gray-100">
            <Filter className="w-16 h-16 text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-[#111928] mb-2">No articles found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-6 px-6 py-2.5 rounded-full font-bold bg-[#111928] text-white hover:bg-gray-900 transition-colors shadow-md"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
