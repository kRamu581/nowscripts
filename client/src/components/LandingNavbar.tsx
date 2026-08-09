import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, HeadphonesIcon, Heart, Search, Globe, ChevronDown, MessageCircle, MessageSquare, Phone, Mail, HelpCircle, Info } from "lucide-react";
import { NotificationIcon } from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import AvatarMenu from "./AvatarMenu";
import { BrandLogo, BrandIconOnly } from "./BrandLogo";
import { useAuthModal } from "../contexts/AuthModalContext";

export default function LandingNavbar({ notificationsCount = 0 }: { notificationsCount?: number }) {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/stories/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
    <nav id="landing-navbar" className={`w-full ${positionClass} top-0 z-[100] transition-all duration-300 ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[56px]">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Hamburger on Left */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden flex items-center justify-center p-1 ${textColor} transition-colors mr-1`}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          
          <Link to="/" className={`${textColor} ${hoverColor} transition-colors flex items-center`}>
            <BrandLogo textColor={`text-current`} dotColor={isScrolled ? 'bg-[#FF5A5F]' : 'bg-white'} hideTextOnMobile={false} />
          </Link>
        </div>

        {/* Middle: Desktop Navigation & Search */}
        <div className="hidden lg:flex flex-1 items-center justify-center mx-6 gap-6">
          <nav className="flex items-center gap-5">
            <Link to="/learn" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>Learn</Link>
            <Link to="/roadmaps" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>Roadmaps</Link>
            <Link to="/projects" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>Projects</Link>
            <Link to="/interview-prep" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>Interview</Link>
            <Link to="/community" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>Community</Link>
            <Link to="/about" className={`text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors`}>About</Link>
          </nav>

          {isScrolled && (
            <form onSubmit={handleSearch} className="relative w-full max-w-[250px] ml-4 flex items-center h-[36px] bg-[#F8F9FA] border border-gray-200 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="w-full h-full bg-transparent pl-4 pr-10 text-[13px] text-gray-900 font-medium focus:outline-none focus-visible:outline-none placeholder:text-gray-400"
              />
              <button type="submit" className="absolute right-1 w-[28px] h-[28px] bg-[#FF5A5F] hover:bg-[#E82C45] text-white rounded-full flex items-center justify-center transition-colors">
                <Search size={14} strokeWidth={2.5} />
              </button>
            </form>
          )}
        </div>

        {/* Right Side: CTA / Icons */}
        <div className="flex items-center gap-5">

          {/* Support Dropdown */}
          <div 
            className="relative hidden lg:block"
            onMouseEnter={() => setIsSupportOpen(true)}
            onMouseLeave={() => setIsSupportOpen(false)}
          >
            <button className={`flex items-center gap-1.5 text-[14px] font-semibold ${textColor} ${hoverColor} transition-colors py-2 focus:outline-none`}>
              <HeadphonesIcon size={18} strokeWidth={2} /> Support <ChevronDown size={14} className={`transition-transform duration-200 ${isSupportOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSupportOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[100%] right-[-60px] w-[420px] bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-gray-100 flex overflow-hidden z-[100] cursor-auto"
                >
                  {/* Left Side: Platform support */}
                  <div className="flex-[6] p-5 border-r border-gray-100 bg-white">
                    <h4 className="text-gray-500 text-[13px] font-medium mb-3">Platform support</h4>
                    <div className="space-y-1">
                      <button onClick={() => { window.dispatchEvent(new CustomEvent('open-copilot')); setIsSupportOpen(false); }} className="w-full flex items-center justify-between group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-[16px] h-[16px]"><BrandIconOnly className="w-full h-full" /></div>
                          <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">Quick Chat</span>
                        </div>
                        <span className="bg-[#ff4f4f] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Instant Reply</span>
                      </button>

                      <a href="https://wa.me/919392832943" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageCircle className="w-[16px] h-[16px] text-[#25D366]" fill="#25D366" fillOpacity={0.2} />
                        <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">Whatsapp</span>
                      </a>

                      <div className="w-full h-[1px] bg-gray-100 my-1"></div>

                      <a href="tel:+919392832943" className="flex items-center gap-2.5 group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Phone className="w-[16px] h-[16px] text-[#4285F4]" fill="#4285F4" fillOpacity={0.2} />
                        <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">+91 9392832943</span>
                      </a>

                      <div className="w-full h-[1px] bg-gray-100 my-1"></div>

                      <a href="mailto:support@nowscripts.com" className="flex items-center gap-2.5 group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Mail className="w-[16px] h-[16px] text-[#FBBC05]" fill="#FBBC05" fillOpacity={0.2} />
                        <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">support@nowscripts.com</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Quick Links */}
                  <div className="flex-[4] p-5 bg-white">
                    <h4 className="text-gray-500 text-[13px] font-medium mb-3">Quick Links</h4>
                    <div className="space-y-1">
                      <Link to="/help" onClick={() => setIsSupportOpen(false)} className="flex items-center gap-2.5 group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <HelpCircle className="w-[16px] h-[16px] text-gray-500 group-hover:text-gray-800 transition-colors" />
                        <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">Help Center</span>
                      </Link>
                      <Link to="/how-it-works" onClick={() => setIsSupportOpen(false)} className="flex items-center gap-2.5 group py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Info className="w-[16px] h-[16px] text-gray-500 group-hover:text-gray-800 transition-colors" />
                        <span className="text-gray-700 font-semibold text-[14px] group-hover:text-gray-900 transition-colors">How It Works</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            {isAuthenticated ? (
              <AvatarMenu isScrolled={isScrolled} />
            ) : (
              <button 
                onClick={() => openModal('login')}
                className={`flex items-center justify-center text-[13px] font-bold ${textColor} ${hoverColor} border ${borderColor} rounded-md px-2.5 py-1 transition-colors`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>

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
                <Link to="/roadmaps" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Roadmaps</Link>
                <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Projects</Link>
                <Link to="/interview-prep" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Interview Prep</Link>
                <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Community</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">About Us</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium transition-colors">Contact</Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
