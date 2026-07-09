import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCircle, 
  LayoutDashboard, 
  Bookmark, 
  LogOut, 
  Users, 
  MessageSquarePlus, 
  User, 
  Award,
  Menu,
  GraduationCap,
  Map,
  FileText,
  Briefcase,
  Heart,
  Download
} from "lucide-react";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";
import { DEFAULT_IMG } from "../App";

export default function AvatarMenu({ isScrolled = false }: { isScrolled?: boolean }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { openModal } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isAdmin = user?.role === "Admin" || user?.role === "Super Admin" || user?.email === "nowadmin@gmail.com" || user?._id === "demo_admin_123";

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button 
        onClick={toggleMenu}
        className={`flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-now-primary focus:ring-offset-2 ${
          !isAuthenticated ? (isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white') : ''
        }`}
      >
        {isAuthenticated ? (
          <img
            src={user?.avatar || DEFAULT_IMG}
            alt="Profile"
            className="w-9 h-9 object-cover rounded-full border-2 border-white shadow-sm hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className={`flex items-center gap-2 border ${isScrolled ? 'border-gray-200 bg-white' : 'border-white/30 bg-transparent'} rounded-full px-3 py-1.5 transition-colors hover:shadow-sm`}>
            <div className="w-[22px] h-[22px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden text-gray-500">
               <User size={14} strokeWidth={2.5} />
            </div>
            <Menu size={18} strokeWidth={2.5} className={isScrolled ? 'text-gray-700' : 'text-white'} />
          </div>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-gray-900 z-[110] md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed md:absolute bottom-0 md:bottom-auto md:top-full left-0 md:left-auto md:right-0 w-full md:w-72 md:mt-4 bg-white rounded-t-3xl md:rounded-2xl shadow-modal z-[120] border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] md:max-h-none"
            >
              {/* Drag handle for mobile */}
              <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-col py-2 overflow-y-auto custom-scrollbar">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Login to Continue</span>
                    <button 
                      onClick={() => { closeMenu(); openModal('login'); }}
                      className="text-[13px] font-bold text-[#FF5A5F] hover:text-[#E82C45] transition-colors"
                    >
                      Login
                    </button>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/learn"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <GraduationCap className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Learn</span>
                    </Link>
                    <Link
                      to="/roadmaps"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Map className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Roadmaps</span>
                    </Link>
                    <Link
                      to="/interview-prep"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Interview Prep</span>
                    </Link>
                    <Link
                      to="/projects"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Projects</span>
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 mx-5 my-1" />

                  <div className="py-2">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Heart className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Shortlist</span>
                    </Link>
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">Download App</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col py-2 overflow-y-auto custom-scrollbar">
                  {/* User Header */}
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                    <img
                      src={user?.avatar || DEFAULT_IMG}
                      alt="Profile"
                      className="w-10 h-10 object-cover rounded-full border border-gray-200"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-gray-900 truncate">
                        {user?.name || "ServiceNow Dev"}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Section 1: Account */}
                  <div className="py-2">
                    <div className="px-5 py-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</span>
                    </div>
                    <Link
                      to={`/user/${user?._id}`}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <User className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Profile</span>
                    </Link>
                    <Link
                      to="/roadmaps"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dashboard</span>
                    </Link>
                    <Link
                      to="/learn"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Bookmarked Resources</span>
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 mx-5 my-1" />

                  {/* Section 2: Community & Growth */}
                  <div className="py-2">
                    <div className="px-5 py-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Community & Growth</span>
                    </div>
                    <Link
                      to="/interviews/submit"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <MessageSquarePlus className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Submit an Interview</span>
                    </Link>
                    <Link
                      to="/community"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      <Users className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Join Community</span>
                    </Link>
                  </div>

                  {isAdmin && (
                    <>
                      <div className="h-px bg-gray-100 mx-5 my-1" />
                      <div className="py-2">
                        <div className="px-5 py-1.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</span>
                        </div>
                        <Link
                          to="/admin/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <Award className="w-5 h-5 text-gray-400 group-hover:text-now-primary" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Admin Dashboard</span>
                        </Link>
                      </div>
                    </>
                  )}

                  <div className="h-px bg-gray-100 mx-5 mt-1 mb-2" />

                  {/* Logout */}
                  <div className="px-2 pb-2">
                    <button
                      onClick={() => { logout(); closeMenu(); }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-bold"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
