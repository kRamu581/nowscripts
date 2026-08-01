import React, { useState } from "react";
import { Search, User, FileText, Bookmark, ExternalLink } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");

  const mockResults = [
    { type: "User", title: "John Doe", subtitle: "john@example.com", icon: <User size={18} className="text-blue-500" /> },
    { type: "Lesson", title: "ServiceNow Fundamentals", subtitle: "Course Module", icon: <FileText size={18} className="text-emerald-500" /> },
    { type: "Post", title: "How to use GlideRecord", subtitle: "Community Post", icon: <Bookmark size={18} className="text-purple-500" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
          <Search size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Global Search</h1>
          <p className="text-sm text-gray-500">Search across users, courses, posts, and more</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none text-lg" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">Recent Results</h3>
        {mockResults.map((result, index) => (
          <div key={index} className="bg-white border border-gray-100 hover:border-blue-200 p-4 rounded-xl flex items-center gap-4 transition-all cursor-pointer group hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              {result.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{result.title}</h4>
              <p className="text-xs text-gray-500">{result.type} • {result.subtitle}</p>
            </div>
            <ExternalLink size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
