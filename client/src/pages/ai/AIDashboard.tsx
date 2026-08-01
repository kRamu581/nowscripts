import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bot, Sparkles, History, MessageSquare, Plus, Mic, ArrowRight, 
  Menu, Home, Calendar, Shield, Search, Grid as GridIcon, User as UserIcon, BookOpen, Brain, Map, Lightbulb, X
} from "lucide-react";
import { aiService } from "../../services/ai.service";
import { useAuth } from "../../contexts/Auth";

export default function AIDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    aiService.getChatHistory().then(data => {
      if (data.success) {
        setRecentChats(data.sessions.slice(0, 3)); // Fetch top 3 for Recommendations card
      }
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate(`/ai/companion?q=${encodeURIComponent(prompt)}`);
    }
  };

  const suggestions = [
    "Draft a study plan",
    "Explain Client Scripts",
    "Generate mock interview",
    "Review my code"
  ];

  return (
    <div className="flex h-screen bg-[#F4F2EE] overflow-hidden font-sans selection:bg-purple-200 selection:text-black">
      
      {/* Left Sidebar (Otto Style) */}
      <aside className="hidden md:flex w-[80px] bg-transparent flex-col items-center py-6 justify-between flex-shrink-0 z-20">
        <div className="flex flex-col items-center gap-1 w-full">
          {/* Green Star Logo */}
          <Link to="/" className="text-green-500 hover:opacity-80 transition-opacity mb-2">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#4CD964]">
              <path fillRule="evenodd" clipRule="evenodd" d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z M50 68 C59.9411 68 68 59.9411 68 50 C68 40.0589 59.9411 32 50 32 C40.0589 32 32 40.0589 32 50 C32 59.9411 40.0589 68 50 68 Z" fill="currentColor" />
            </svg>
          </Link>
          
          {/* Sidebar Nav Items */}
          <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black cursor-pointer transition-colors">
            <Home className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors">
            <History className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors">
            <GridIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Profile */}
        <div className="w-10 h-10 hover:bg-black/5 rounded-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer transition-colors mt-auto">
          {user?.avatar ? (
             <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-300" />
          ) : (
            <UserIcon className="w-5 h-5" />
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200/50 bg-[#F4F2EE] shrink-0 sticky top-0 z-50">
          <Link to="/" className="text-green-500 hover:opacity-80 transition-opacity">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#4CD964]">
              <path fillRule="evenodd" clipRule="evenodd" d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z M50 68 C59.9411 68 68 59.9411 68 50 C68 40.0589 59.9411 32 50 32 C40.0589 32 32 40.0589 32 50 C32 59.9411 40.0589 68 50 68 Z" fill="currentColor" />
            </svg>
          </Link>
          <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-200/50 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="max-w-[1100px] w-full mx-auto flex-1 flex flex-col p-6 md:p-10">
          
          {/* Top Badge Removed */}
          <div className="hidden md:flex justify-end mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-900 shrink-0">
              <X size={24} />
            </button>
          </div>

          {/* Greeting */}
          <div className="text-center mb-8">
            <h1 className="text-[32px] md:text-[44px] font-semibold text-[#1A1A1A] tracking-tight">
              ✦ Morning, {user?.name?.split(' ')[0] || 'there'}. Let's get to work.
            </h1>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-[800px] mx-auto mb-6">
            <form onSubmit={handleSearch} className="relative group flex items-center">
              <div className="absolute left-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-focus-within:bg-gray-100 transition-colors z-10 cursor-pointer">
                <Plus className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask AI, 'How can I update my skills?'"
                className="w-full h-[76px] pl-[72px] pr-20 text-[18px] bg-white rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus:outline-none focus:ring-4 focus:ring-[#E3F2E6] border border-transparent focus:border-[#4CD964]/40 transition-all placeholder:text-gray-400 font-medium text-gray-800"
              />
              <div className="absolute right-4 z-10">
                <button type="button" onClick={() => setPrompt(prompt + " (voice init)")} className="w-12 h-12 rounded-full bg-[#4CD964] hover:bg-[#43C65A] flex items-center justify-center text-white shadow-sm transition-transform hover:scale-105">
                  <Mic className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="px-5 py-2.5 bg-[#EAE8E3] hover:bg-white text-[#4A4A4A] rounded-full text-[14.5px] font-medium transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-200"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 pb-10">
            
            {/* 1. Learning Companion (Col span 4, tall) */}
            <Link to="/ai/companion" className="md:col-span-4 bg-[#0F293E] rounded-[32px] p-6 text-white hover:shadow-2xl transition-all relative overflow-hidden group flex flex-col min-h-[380px]">
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-[18px] font-bold text-gray-200 tracking-wide">Learning Companion</h3>
                 <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-[26px] font-semibold leading-snug mb-6 pr-4">
                 <span className="text-[#6EE7B7] font-bold">2 to-dos</span> need attention. 1 is overdue and 1 is due soon.
              </h2>
              
              <div className="flex flex-col gap-3 mt-auto">
                 <div className="bg-[#1C3B53] rounded-3xl p-4 px-5 flex items-center justify-between shadow-inner">
                    <div className="flex-1 pr-4">
                       <span className="bg-red-500/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2.5 inline-block">Overdue 3 days</span>
                       <p className="text-[14px] font-medium leading-snug text-gray-100">Code review: Approval required for AI integration module</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-green-500 shrink-0 overflow-hidden relative">
                       {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-500"></div>}
                       <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1C3B53]"></div>
                    </div>
                 </div>
                 <div className="bg-[#1C3B53] rounded-3xl p-4 px-5 flex items-center justify-between shadow-inner">
                    <div className="flex-1 pr-4">
                       <span className="bg-orange-400/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2.5 inline-block">Due in 3 days</span>
                       <p className="text-[14px] font-medium leading-snug text-gray-100">Complete ServiceNow learning path module 4</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-gray-400 shrink-0 overflow-hidden relative">
                       {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-500"></div>}
                    </div>
                 </div>
              </div>
            </Link>

            {/* Right Column Group (Col span 8) */}
            <div className="md:col-span-8 flex flex-col gap-5">
              
              {/* Top Row inside Right Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 2. Roadmap Generator */}
                <Link to="/ai/roadmap" className="bg-white rounded-[32px] hover:shadow-xl transition-all relative overflow-hidden group flex flex-col h-[280px] shadow-sm">
                  <div className="h-[150px] w-full overflow-hidden shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Roadmap cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">Roadmap Generator</h3>
                    <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-2">
                      Map out your ServiceNow career journey. Generate a customized learning path based on your exact goals.
                    </p>
                  </div>
                </Link>

                {/* 3. Doubt Solver (Grid style) */}
                <div className="bg-white rounded-[32px] p-5 hover:shadow-xl transition-all shadow-sm flex flex-col h-[280px]">
                   <h3 className="text-[18px] font-bold text-gray-900 mb-4 px-1">Doubt Solver</h3>
                   <div className="grid grid-cols-2 gap-3 flex-1">
                      <Link to="/ai/companion?mode=doubt" className="flex items-center gap-3 p-3 bg-gray-50 rounded-[20px] hover:bg-gray-100 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"><Lightbulb className="w-4 h-4 text-green-600" /></div>
                         <span className="text-[13px] font-medium text-gray-800 leading-tight">Resolve bug</span>
                      </Link>
                      <Link to="/ai/companion?mode=explain" className="flex items-center gap-3 p-3 bg-gray-50 rounded-[20px] hover:bg-gray-100 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"><MessageSquare className="w-4 h-4 text-blue-600" /></div>
                         <span className="text-[13px] font-medium text-gray-800 leading-tight">Explain concept</span>
                      </Link>
                      <Link to="/ai/companion?mode=review" className="flex items-center gap-3 p-3 bg-gray-50 rounded-[20px] hover:bg-gray-100 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"><Shield className="w-4 h-4 text-purple-600" /></div>
                         <span className="text-[13px] font-medium text-gray-800 leading-tight">Review code</span>
                      </Link>
                      <Link to="/ai/companion?mode=interview" className="flex items-center gap-3 p-3 bg-gray-50 rounded-[20px] hover:bg-gray-100 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"><UserIcon className="w-4 h-4 text-orange-600" /></div>
                         <span className="text-[13px] font-medium text-gray-800 leading-tight">Mock interview</span>
                      </Link>
                   </div>
                </div>
              </div>

              {/* 4. Recommended Topic (Dark/Orange-Pink split card) */}
              <div className="bg-[#0F293E] rounded-[32px] flex overflow-hidden hover:shadow-xl transition-all group cursor-pointer shadow-sm h-[140px]">
                {/* Left orange-pink area */}
                <div className="w-[35%] sm:w-[25%] bg-gradient-to-br from-orange-400 to-pink-500 p-5 flex flex-col justify-between relative overflow-hidden">
                  <h3 className="text-white/90 font-bold text-[14px] relative z-10">Topic</h3>
                  <h2 className="text-white text-[32px] font-bold leading-none mt-2 relative z-10">AI</h2>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-lg"></div>
                </div>
                {/* Right dark area */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <span className="text-gray-300 text-[12px] font-medium mb-1 tracking-wide">Recommended for you</span>
                  <h3 className="text-white text-[20px] font-bold leading-tight mb-1">ServiceNow AI</h3>
                  <span className="text-gray-400 text-[13px]">Master Generative AI concepts in ServiceNow</span>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
