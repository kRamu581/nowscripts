import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  carrotIcon,
  mediumLogo,
  NotificationIcon,
  writeBlogIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";
import AvatarMenu from "./AvatarMenu";
import Search from "./Search";
import { BrandLogo } from "./BrandLogo";

export default function Navbar({
  notificationsCount,
}: {
  notificationsCount: number;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <>
      <nav className="w-full h-14 bg-[#0F1014] border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="block">
              <BrandLogo textColor="text-white" hideTextOnMobile={true} />
            </Link>
            <div className="hidden md:block">
              <Search />
            </div>
          </div>
          
          <div className="flex items-center gap-6 h-full">
            <Link to="/learn" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Learn</Link>
            <Link to="/roadmaps" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Roadmaps</Link>
            <Link to="/projects" className="hidden lg:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Projects</Link>
            <Link to="/interview-prep" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Interview Prep</Link>
            <Link to="/ai-interview" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              AI Interview
            </Link>

            <Link to="/newsletter" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Newsletter</Link>
            
            {isAuthenticated ? (
              <Link
                to="/write"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {writeBlogIcon}
                <span className="text-sm font-medium hidden lg:block">Share Content</span>
              </Link>
            ) : (
              <button
                onClick={() => openModal('login', () => window.location.href = '/write', 'Please log in to share content.')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {writeBlogIcon}
                <span className="text-sm font-medium hidden lg:block">Share Content</span>
              </button>
            )}

            <div className="flex items-center">
              <Link
                to="/notifications"
                className="relative text-gray-400 hover:text-white transition-colors flex items-center"
              >
                {NotificationIcon}
                {notificationsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-now-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {notificationsCount}
                  </span>
                )}
              </Link>
            </div>
            <AvatarMenu isScrolled={true} />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black z-[9998] md:hidden cursor-pointer"
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0F1014] border-r border-white/10 z-[9999] flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <BrandLogo textColor="text-white" hideTextOnMobile={false} className="scale-90 origin-left" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col space-y-1 px-4">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Home</Link>
                  <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Learn</Link>
                  <Link to="/roadmaps" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Roadmaps</Link>
                  <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Projects</Link>
                  <Link to="/interview-prep" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Interview Prep</Link>

                  <Link to="/newsletter" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Newsletter</Link>
                </nav>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
