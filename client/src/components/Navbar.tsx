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
  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHome);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  const bgColor = isScrolled ? "bg-white border-b border-gray-200" : "bg-transparent border-b border-transparent";
  const textColor = isScrolled ? "text-gray-600" : "text-white/90";
  const hoverColor = isScrolled ? "hover:text-gray-900" : "hover:text-white";
  const positionClass = isHome ? "fixed top-0" : "relative";
  const logoColor = isScrolled ? "text-slate-900" : "text-white";
  const dotColor = isScrolled ? "bg-[#FF5A5F]" : "bg-white";

  return (
    <>
      <nav id="main-navbar" className={`w-full h-14 ${positionClass} z-50 transition-all duration-300 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden flex items-center justify-center p-1 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'} transition-colors`}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="block">
              <BrandLogo textColor={logoColor} dotColor={dotColor} hideTextOnMobile={true} />
            </Link>
            <div className="hidden md:block">
              <Search />
            </div>
          </div>
          
          <div className="flex items-center gap-6 h-full">
            <Link to="/learn" className={`hidden md:block text-sm font-medium ${textColor} ${hoverColor} transition-colors`}>Learn</Link>
            <Link to="/projects" className={`hidden lg:block text-sm font-medium ${textColor} ${hoverColor} transition-colors`}>Projects</Link>
            <Link to="/interview-prep" className={`hidden md:block text-sm font-medium ${textColor} ${hoverColor} transition-colors`}>Interview Prep</Link>

            <div className="flex items-center">
              <Link
                to="/notifications"
                className={`relative ${textColor} ${hoverColor} transition-colors flex items-center`}
              >
                {NotificationIcon}
                {notificationsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-now-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {notificationsCount}
                  </span>
                )}
              </Link>
            </div>
            <AvatarMenu isScrolled={isScrolled} />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchStart={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden cursor-pointer"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[250px] bg-white border-r border-gray-200 z-[9999] flex flex-col shadow-2xl md:hidden"
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <BrandLogo textColor="text-slate-900" hideTextOnMobile={false} className="scale-75 origin-left" />
              <button 
                type="button" 
                onClick={() => setIsMobileMenuOpen(false)} 
                onTouchStart={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-1 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors z-[10000]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <nav className="flex flex-col space-y-1 px-3">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Home</Link>
                <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Learn</Link>
                <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Projects</Link>
                <Link to="/interview-prep" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Interview Prep</Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
