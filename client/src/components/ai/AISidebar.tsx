import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, Home, Calendar, Shield, Edit, Search, Grid, Inbox, Network, Bell, MoreVertical } from "lucide-react";
import { aiService } from "../../services/ai.service";
import { useAuth } from "../../contexts/Auth";
import { BrandLogo } from "../BrandLogo";

export default function AISidebar() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("id");
  const query = searchParams.get("q") || "";

  const [recentChats, setRecentChats] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    aiService.getChatHistory().then((data) => {
      if (data.success) {
        setRecentChats(data.sessions.slice(0, 5));
      }
    });
  }, []);

  return (
    <aside className="w-[280px] bg-[#F4F2EE] border-r border-gray-200/50 flex flex-col hidden md:flex shrink-0 z-10">
      <div className="p-5 flex items-center gap-2">
        <Menu className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black shrink-0" />
        <Link to="/" className="flex items-center gap-0.5 ml-1">
          <BrandLogo textColor="text-gray-800" className="scale-[0.6] origin-left" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-8">
        {/* Main Links */}
        <div className="space-y-0.5">
          <Link to="/ai" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
            <Home className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-medium">Dashboard</span>
          </Link>
          <Link to="/ai/companion" className="flex items-center gap-3 px-3 py-2 bg-gray-200/60 rounded-xl cursor-pointer">
            <Calendar className="w-[18px] h-[18px] text-gray-800" />
            <span className="text-[13px] font-medium text-gray-900">Learning Companion</span>
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
            <Shield className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-medium">Projects</span>
          </Link>
          <Link to="/roadmaps" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
            <Grid className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-medium">Roadmaps</span>
          </Link>
        </div>

        {/* Recent */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</span>
            <Edit className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
          </div>
          <ul className="space-y-0.5">
            {query && (
              <li className="px-3 py-1.5 rounded-xl bg-transparent hover:bg-gray-200/40 cursor-pointer transition-colors text-[13px] text-gray-800 font-medium truncate">
                {query}
              </li>
            )}
            {recentChats.map((chat) => (
              <li key={chat._id}>
                <Link
                  to={`/ai/companion?id=${chat._id}`}
                  className={`block px-3 py-1.5 rounded-xl text-[13px] truncate transition-colors ${chat._id === sessionId ? "font-medium text-gray-800" : "text-gray-600 hover:bg-gray-200/40 hover:text-gray-900"}`}
                >
                  {chat.title || "Untitled Chat"}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-3 mt-2">
            <button className="px-3 py-1.5 bg-gray-200/50 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors">
              See all
            </button>
          </div>
        </div>

        {/* My Apps */}
        <div>
          <div className="px-3 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">My Apps</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
              <Search className="w-[18px] h-[18px]" />
              <span className="text-[13px] font-medium">Enterprise search</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
              <Grid className="w-[18px] h-[18px]" />
              <span className="text-[13px] font-medium">Canvas</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
              <Inbox className="w-[18px] h-[18px]" />
              <span className="text-[13px] font-medium">Inbox</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
              <Network className="w-[18px] h-[18px]" />
              <span className="text-[13px] font-medium">Org chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom items */}
      <div className="p-3 border-t border-gray-200/50 space-y-0.5">
        <div className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors text-gray-600 hover:text-gray-900">
          <div className="flex items-center gap-3">
            <Bell className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-medium">Notifications</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-200/40 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
            )}
            <span className="text-[13px] font-medium text-gray-800">{user?.name || "Demo User"}</span>
          </div>
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
