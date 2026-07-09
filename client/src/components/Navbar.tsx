import { useState } from "react";
import { Link } from "react-router-dom";
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
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <>
      <nav className="w-full h-14 bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-1 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="block">
              <BrandLogo textColor="text-gray-900" hideTextOnMobile={true} />
            </Link>
            <div className="hidden md:block">
              <Search />
            </div>
          </div>
          
          <div className="flex items-center gap-6 h-full">
            <Link to="/learn" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Learn</Link>
            <Link to="/roadmaps" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Roadmaps</Link>
            <Link to="/projects" className="hidden lg:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Projects</Link>
            <Link to="/interview-prep" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Interview Prep</Link>
            <Link to="/community" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Community</Link>
            <Link to="/newsletter" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Newsletter</Link>
            
            {isAuthenticated ? (
              <Link
                to="/write"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                {writeBlogIcon}
                <span className="text-sm font-medium hidden lg:block">Share Content</span>
              </Link>
            ) : (
              <button
                onClick={() => openModal('login', () => window.location.href = '/write', 'Please log in to share content.')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                {writeBlogIcon}
                <span className="text-sm font-medium hidden lg:block">Share Content</span>
              </button>
            )}

            <div className="flex items-center">
              <Link
                to="/notifications"
                className="relative text-gray-500 hover:text-gray-900 transition-colors flex items-center"
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
            className="fixed inset-0 bg-gray-900 z-[100] md:hidden"
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white border-r border-gray-200 z-[110] flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <BrandLogo textColor="text-gray-900" hideTextOnMobile={false} className="scale-90 origin-left" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col space-y-1 px-4">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Home</Link>
                  <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Learn</Link>
                  <Link to="/roadmaps" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Roadmaps</Link>
                  <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Projects</Link>
                  <Link to="/interview-prep" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Interview Prep</Link>
                  <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Community</Link>
                  <Link to="/newsletter" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md font-medium">Newsletter</Link>
                </nav>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
