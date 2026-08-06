import Navbar from "./components/Navbar";
import LandingNavbar from "./components/LandingNavbar";
import CareerProfileWizard from "./components/CareerProfileWizard";
import {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
  lazy,
  Suspense,
} from "react";

// Admin System Pages
const SystemSettings = lazy(() => import("./pages/admin/system/SystemSettings"));
const SystemNotifications = lazy(() => import("./pages/admin/system/SystemNotifications"));
const GlobalSearch = lazy(() => import("./pages/admin/system/GlobalSearch"));
const ActivityLogs = lazy(() => import("./pages/admin/system/ActivityLogs"));

import { Toaster, toast, Toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
import { url } from "./baseUrl";
import { BrandIconOnly } from "./components/BrandLogo";

const UnAuthHome = lazy(() => import("./pages/UnAuthHome"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CommunityFeed = lazy(() => import("./pages/Home"));
const AuthRedirect = lazy(() => import("./pages/AuthRedirect"));
const Post = lazy(() => import("./pages/Post"));
const Notifications = lazy(() => import("./pages/Notifications"));
const User = lazy(() => import("./pages/User"));
const Profile = lazy(() => import("./pages/Profile"));
const Write = lazy(() => import("./pages/Write"));
const SignIn = lazy(() => import("./pages/SignIn"));
const LearnCatalog = lazy(() => import("./pages/LearnCatalog"));
const LearnDashboard = lazy(() => import("./pages/LearnDashboard"));
const InterviewPrepDashboard = lazy(() => import("./pages/InterviewPrepDashboard"));
const RoadmapDashboard = lazy(() => import("./pages/RoadmapDashboard"));
const RoadmapViewer = lazy(() => import("./pages/RoadmapViewer"));
const CertificationCenter = lazy(() => import("./pages/CertificationCenter"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Suggestions = lazy(() => import("./pages/Suggestions"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate"));
const AdminCertificates = lazy(() => import("./pages/admin/AdminCertificates"));
const CertificateStudio = lazy(() => import("./pages/admin/CertificateStudio"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
import AdminLayout from "./components/admin/AdminLayout";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
const InterviewExperiences = lazy(() => import("./pages/InterviewExperiences"));
const InterviewExperienceDetail = lazy(() => import("./pages/InterviewExperienceDetail"));
const SubmitInterviewExperience = lazy(() => import("./pages/SubmitInterviewExperience"));
const Projects = lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then(m => ({ default: m.ProjectDetail })));
const AIInterviewWizard = lazy(() => import("./pages/ai-interview/AIInterviewWizard").then(m => ({ default: m.AIInterviewWizard })));
const NotFound = lazy(() => import("./pages/NotFound"));

// AI Module Pages
const AIDashboard = lazy(() => import("./pages/ai/AIDashboard"));
const AILearningCompanion = lazy(() => import("./pages/ai/AILearningCompanion"));
const AIRoadmapBuilder = lazy(() => import("./pages/ai/AIRoadmapBuilder"));

// Static Info Pages
const HelpCenter = lazy(() => import("./pages/StaticInfoPages").then(m => ({ default: m.HelpCenter })));
const Terms = lazy(() => import("./pages/StaticInfoPages").then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import("./pages/StaticInfoPages").then(m => ({ default: m.Privacy })));
const HowItWorks = lazy(() => import("./pages/StaticInfoPages").then(m => ({ default: m.HowItWorks })));
const Contact = lazy(() => import("./pages/StaticInfoPages").then(m => ({ default: m.Contact })));
const Careers = lazy(() => import("./pages/Careers"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const ApplyJob = lazy(() => import("./pages/ApplyJob"));
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/Auth";
import ProtectedRoute from "./router/Authentication";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { AuthModal } from "./components/AuthModal";
import AdminGuard from "./router/AdminGuard";
export const DEFAULT_IMG =
  "https://api.dicebear.com/7.x/adventurer/svg?seed=NowScripts";

type AppContextType = {
  hideNavbar(val: boolean): void;
  handleToast(message: string): void;
  socket: any;
};

const Context = createContext<AppContextType>({
  hideNavbar: () => {},
  handleToast: () => {},
  socket: null,
});

export function useAppContext() {
  return useContext(Context);
}

function PublicLayout({ notificationsCount }: { notificationsCount: number }) {
  const { isAuthenticated } = useAuth();
  return (
    <div className={`flex flex-col min-h-screen ${isAuthenticated ? "bg-slate-50 text-slate-900" : "bg-slate-50 text-slate-900"} font-sans relative`}>
      {isAuthenticated ? (
        <Navbar notificationsCount={notificationsCount} />
      ) : (
        <LandingNavbar notificationsCount={notificationsCount} />
      )}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

function AppLayout({ notificationsCount }: { notificationsCount: number }) {
  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans selection:bg-now-primary selection:text-white">
      <Navbar notificationsCount={notificationsCount} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const socket = useMemo(() => io(url), []);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error("Socket connection failed", err);
    });

    if (!user) return;
    socket.emit("start", { userId: user?._id });
    socket.emit("checkNotifications", { userId: user?._id });
    socket.on("notificationsCount", ({ count }) => {
      setNotificationsCount(count);
    });
    socket.on("haveNotifications", (have) => {
      if (have) {
        setNotificationsCount((prev) => prev + 1);
        handleToast("You have a new notification!");
      }
    });
  }, [socket, user]);

  function hideNavbar(val: boolean) {
    // Deprecated. We use layouts now. Kept for backwards compatibility if needed by deep components.
  }
  
  function handleToast(message: string) {
    toast((t) => <ToastComponent message={message} t={t} />, {
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        padding: "15px 18px",
      },
    });
  }
  
  function NullifyNotificationsCount() {
    setNotificationsCount(0);
  }

  const contextValue: AppContextType = {
    hideNavbar,
    handleToast,
    socket,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <BrandIconOnly className="h-16 w-auto animate-pulse" />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary"></div>
      </div>
    );
  }

  return (
    <Context.Provider value={contextValue}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="App selection:bg-now-primary selection:text-white min-h-screen bg-slate-50">
        <AuthModalProvider>
          <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <BrandIconOnly className="h-12 w-auto animate-pulse" />
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary"></div>
          </div>
        }>
          <Routes>
            {/* Public Layout Routes (Accessible to all, but shows AvatarMenu if logged in) */}
            <Route element={<PublicLayout notificationsCount={notificationsCount} />}>
              <Route path="/" element={<UnAuthHome />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/roadmaps" element={<RoadmapDashboard />} />
              <Route path="/roadmaps/:slug" element={<RoadmapViewer />} />
              <Route path="/certifications" element={<CertificationCenter />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="certification-center" element={<CertificationCenter />} />
              <Route path="verify-certificate/:certificateId" element={<VerifyCertificate />} />
              
              {/* AI Module Routes moved to standalone */}
              <Route path="/interviews" element={<InterviewExperiences />} />
              <Route path="/interviews/:id" element={<InterviewExperienceDetail />} />
              <Route path="/learn" element={<LearnCatalog />} />
              <Route path="/learn/:categorySlug/:lessonSlug" element={<LearnDashboard />} />
              <Route path="/interview-prep" element={<InterviewPrepDashboard />} />
              <Route path="/interview-prep/:categoryId" element={<InterviewPrepDashboard />} />
              <Route path="/community" element={<CommunityFeed />} />
              <Route path="/tag/:tag" element={<CommunityFeed />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/ai-interview" element={<AIInterviewWizard />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/search/:tab/:query" element={<SearchResults />} />
              <Route path="/blog/:id" element={<Post />} />
              
              {/* Static Info Pages */}
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<CareerDetail />} />
              <Route path="/careers/:id/apply" element={<ApplyJob />} />
            </Route>

            {/* Protected App Layout Routes (Requires Login) */}
            <Route element={<ProtectedRoute><AppLayout notificationsCount={notificationsCount} /></ProtectedRoute>}>
              <Route path="/interviews/submit" element={<SubmitInterviewExperience />} />
              <Route path="/profile/:username/:tab?" element={<Profile />} />
              <Route path="/user/:username/:tab?" element={<Profile />} />
              <Route path="/notifications" element={<Notifications emptyNotifications={NullifyNotificationsCount} />} />
              <Route path="/write/:postId?" element={
                <div className="write_page mx-auto w-full md:w-3/4 lg:w-1/2 h-full">
                  <Write />
                </div>
              } />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminGuard><AdminLayout notificationsCount={notificationsCount} /></AdminGuard>}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
              <Route path="/admin/certificates/studio" element={<CertificateStudio />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/live" element={<AdminPlaceholder title="Live Users" />} />
              <Route path="/admin/analytics" element={<AdminPlaceholder title="Analytics" />} />
              <Route path="/admin/revenue" element={<AdminPlaceholder title="Revenue" />} />
              <Route path="/admin/learning" element={<AdminPlaceholder title="Learning Paths" />} />
              <Route path="/admin/interviews" element={<AdminPlaceholder title="Interview Prep" />} />
              <Route path="/admin/newsletter" element={<AdminPlaceholder title="Newsletter" />} />
              <Route path="/admin/notifications" element={<SystemNotifications />} />
              <Route path="/admin/search" element={<GlobalSearch />} />
              <Route path="/admin/settings" element={<SystemSettings />} />
              <Route path="/admin/activity" element={<ActivityLogs />} />
            </Route>

            {/* Auth Pages (No layout) */}
            <Route path="/signin/:tab" element={<SignIn />} />
            <Route path="/login" element={<Navigate to="/signin/signin" replace />} />
            <Route path="ai" element={<AIDashboard />} />
            <Route path="ai/companion" element={<AILearningCompanion />} />
            <Route path="ai/roadmap" element={<AIRoadmapBuilder />} />
            {/* Other standalone protected routes */}
            <Route path="/authredirect" element={<AuthRedirect />} />
            <Route path="/setup-profile" element={<CareerProfileWizard isOpen={true} onClose={() => {}} onSuccess={() => { window.location.href = '/' }} />} />
            
            {/* Catch all 404 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </Suspense>
        <AuthModal />
        </AuthModalProvider>
      </div>
    </Context.Provider>
  );
}

function ToastComponent({ message, t }: { message: string; t: Toast }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <span style={{ color: "white", fontFamily: "Roboto Slab", fontSize: "14px", marginRight: "30px" }}>
        {message}
      </span>
      <button
        style={{ color: "white", backgroundColor: "transparent", border: "none", outline: "none", marginLeft: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => toast.dismiss(t.id)}
      >
        <CloseIcon sx={{ fontSize: "17px" }} />
      </button>
    </div>
  );
}
