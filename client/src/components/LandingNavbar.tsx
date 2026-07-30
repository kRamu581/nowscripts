import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, HeadphonesIcon, Heart, Search, Globe } from "lucide-react";
import { NotificationIcon } from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import AvatarMenu from "./AvatarMenu";
import { BrandLogo } from "./BrandLogo";
import { useAuthModal } from "../contexts/AuthModalContext";

export default function LandingNavbar({ notificationsCount = 0 }: { notificationsCount?: number }) {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const [isScrolled, setIsScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const textColor = isScrolled ? "text-[#333333]" : "text-white";
  const hoverColor = isScrolled ? "hover:text-[#FF5A5F]" : "hover:text-gray-200";
  const borderColor = isScrolled ? "border-gray-200" : "border-white/20";
  const bgColor = isScrolled ? "bg-white shadow-sm border-b border-gray-200" : "bg-transparent";
  const positionClass = isHome ? "fixed" : "relative";

  return (
    <>
    <nav className={`w-full ${positionClass} top-0 z-[100] transition-all duration-300 ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Hamburger on Left */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden flex items-center justify-center p-1 ${textColor} transition-colors mr-1`}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
          
          <Link to="/" className={`${textColor} ${hoverColor} transition-colors flex items-center gap-1`}>
            <BrandLogo textColor={`text-current`} hideTextOnMobile={false} />
            <span className={`w-2 h-2 rounded-full mb-1 ${isScrolled ? 'bg-[#FF5A5F]' : 'bg-white'}`}></span>
          </Link>
        </div>

        {/* Middle: Search Bar (Visible when scrolled) */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8 transition-opacity duration-300">
          {isScrolled && (
            <div className="relative w-full max-w-[500px] flex items-center h-[46px] bg-[#F8F9FA] border border-gray-200 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <input 
                type="text" 
                placeholder="What kind of projects are you looking for?" 
                className="w-full h-full bg-transparent pl-5 pr-14 text-[14px] text-gray-900 font-medium focus:outline-none focus-visible:outline-none placeholder:text-gray-400"
              />
              <button className="absolute right-1 w-[38px] h-[38px] bg-[#FF5A5F] hover:bg-[#E82C45] text-white rounded-full flex items-center justify-center transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: CTA / Icons */}
        <div className="flex items-center gap-5">

          <Link to="/about" className={`hidden lg:flex items-center gap-1.5 text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>
            <HeadphonesIcon size={18} strokeWidth={2} /> Support
          </Link>
          <button className={`hidden md:flex items-center gap-1.5 text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>
            <Globe size={18} strokeWidth={2} /> En
          </button>
          
          {/* Desktop Auth/Avatar Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/notifications"
                  className={`relative ${textColor} ${hoverColor} transition-colors ml-2`}
                >
                  <div className="w-[18px] h-[18px]">{NotificationIcon}</div>
                  {notificationsCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 bg-[#FF5A5F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    >
                      {notificationsCount}
                    </span>
                  )}
                </Link>
                <div className="ml-2">
                  <AvatarMenu isScrolled={isScrolled} />
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => openModal('login')}
                  className={`flex items-center justify-center gap-1.5 text-[14px] font-bold ${textColor} ${hoverColor} border ${borderColor} rounded-md px-3 py-1.5 transition-colors`}
                >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                  Login
                </button>
                <div className="ml-2">
                  <AvatarMenu isScrolled={isScrolled} />
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Right Side: Search and Notifications */}
          <div className="md:hidden flex items-center gap-3">
          </div>
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
                  <Link to="/interview-prep" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Interview Prep</Link>
                  <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">Projects</Link>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-md font-medium transition-colors">About Us</Link>
                </nav>
              </div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
