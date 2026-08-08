import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, Users, Activity, BarChart2, BookOpen, Target, 
  Mail, MessageSquare, Award, Briefcase, DollarSign, Settings,
  Menu, X, Server, Shield, Bot
} from "lucide-react";
import { BrandIconOnly } from "../BrandLogo";
import Navbar from "../Navbar";

import { Bell, Search as SearchIcon } from "lucide-react";

const ADMIN_NAVIGATION = [
  {
    category: "Main",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "User Management", href: "/admin/users", icon: Users },
      { name: "Live Users", href: "/admin/live", icon: Activity },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
      { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
    ]
  },
  {
    category: "Content",
    items: [
      { name: "Learning", href: "/admin/learning", icon: BookOpen },
      { name: "Interview Prep", href: "/admin/interviews", icon: Target },
      { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
      { name: "Certificates", href: "/admin/certificates", icon: Award },
    ]
  },
  {
    category: "🛠️ 9. System",
    items: [
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
      { name: "Search", href: "/admin/search", icon: SearchIcon },
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Copilot", href: "/admin/copilot", icon: Bot },
      { name: "Logs", href: "/admin/activity", icon: Shield },
    ]
  }
];

export default function AdminLayout({ notificationsCount = 0 }: { notificationsCount?: number }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change in mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Top Global Navbar */}
      <div className="shrink-0">
        <Navbar notificationsCount={notificationsCount} />
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute lg:static inset-y-0 left-0 z-50 w-72 bg-white backdrop-blur-xl border-r border-gray-200 
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}>
          <div className="h-full flex flex-col pt-4">
            {/* Header (Hidden on Desktop since global nav is above) */}
            <div className="flex lg:hidden items-center px-6 mb-4 shrink-0">
              <span className="font-bold text-lg text-slate-900">Admin Console</span>
              <button 
                className="ml-auto text-gray-500 hover:text-slate-900"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-4 custom-scrollbar">
              {ADMIN_NAVIGATION.map((group) => (
                <div key={group.category}>
                  <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {group.category}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm
                            ${isActive 
                              ? "bg-now-primary/10 text-now-primary border border-now-primary/20 shadow-[0_0_15px_rgba(217,56,30,0.1)]" 
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? "text-now-primary" : "text-gray-500"}`} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
          {/* Mobile Admin Sidebar Toggle */}
          <div className="lg:hidden flex items-center px-4 py-2 bg-white border-b border-gray-200 shrink-0">
            <button 
              className="text-gray-600 hover:text-slate-900 focus:outline-none flex items-center gap-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium">Admin Menu</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
