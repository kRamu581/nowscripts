import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Map, Sparkles, History, MessageSquare, Plus, Mic, ArrowRight, BookOpen, PenTool } from "lucide-react";
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
        setRecentChats(data.sessions.slice(0, 5));
      }
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Pass the prompt as a query parameter or state
      navigate(`/ai/companion?q=${encodeURIComponent(prompt)}`);
    }
  };

  const suggestions = [
    "Draft a study plan",
    "Explain Client Scripts",
    "Generate mock interview"
  ];

  return (
    <div className="min-h-screen bg-[#F4F2EE] px-4 py-12 md:py-24 font-sans flex flex-col items-center">
      <div className="w-full max-w-[900px] space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-[32px] md:text-[42px] font-medium text-gray-900 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-gray-900" />
            Hi {user?.name?.split(' ')[0] || 'there'}, what do you want to learn today?
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-[760px] mx-auto relative group mt-8">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Plus className="w-6 h-6 text-gray-400 group-focus-within:text-gray-600 transition-colors cursor-pointer" />
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI, 'Explain client scripts...'"
              className="w-full h-[72px] pl-14 pr-16 text-[17px] bg-white border border-gray-100 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all placeholder:text-gray-400"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button type="button" className="p-3 rounded-full bg-[#4CD964] hover:bg-[#43C65A] text-white shadow-sm transition-transform hover:scale-105">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="px-5 py-2.5 bg-[#EAE8E3] hover:bg-[#E0DED9] text-gray-700 rounded-full text-[14px] font-medium transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {/* Action Card 1: Companion */}
          <Link to="/ai/companion" className="group bg-[#0B2538] rounded-3xl p-6 text-white hover:-translate-y-1 transition-transform relative overflow-hidden flex flex-col min-h-[280px]">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold mb-4">Learning<br/>Companion</h3>
            <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
              Ask questions, troubleshoot your code, and get personalized study plans instantly.
            </p>
            
            <div className="mt-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Start Chat</span>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
          </Link>

          {/* Action Card 2: Roadmap */}
          <Link to="/ai/roadmap" className="group bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-200 transition-all flex flex-col min-h-[280px]">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Roadmap<br/>Generator</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Generate a customized learning path based on your exact career goals and timeline.
            </p>
            <div className="mt-auto">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Team" className="w-full h-32 object-cover rounded-2xl" />
            </div>
          </Link>

          {/* Popular Content / History */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col min-h-[280px]">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {recentChats.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No recent chats.</p>
                </div>
              ) : (
                recentChats.map(chat => (
                  <Link 
                    key={chat._id} 
                    to={`/ai/companion?id=${chat._id}`} 
                    className="flex p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{chat.title || "New Chat"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{new Date(chat.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
