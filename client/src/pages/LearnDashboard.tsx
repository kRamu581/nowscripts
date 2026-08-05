import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, ChevronRight, PlayCircle, FileText, 
  CheckSquare, Award, Clock, Target, List, Video, BookOpen, ChevronLeft, ChevronRight as IconNext, CheckCircle, X,
  Laptop, Cloud, Settings, Code, Server, Workflow, Shield, Layout, Box, Hammer, Mic, Flag, Bot
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";
import { allTrackData, TrackData, LessonData, Subtopic, generateSlug } from "../utils/markdownParser";
import { TrackItemType } from "../data/sharedModules";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";
import { getModuleTheme } from "../utils/themeUtils";
import { CertificationPath } from "../components/learn/CertificationPath";
import FloatingAIBotButton from "../components/FloatingAIBotButton";

const REDIRECT_MAP: Record<string, { categorySlug: string, lessonSlug: string }> = {
  'administration/user-interface': { categorySlug: 'fundamentals', lessonSlug: 'navigation-user-interface' },
  'administration/tables-and-fields-and-columns': { categorySlug: 'fundamentals', lessonSlug: 'tables-and-records' },
  'administration/service-catalog': { categorySlug: 'fundamentals', lessonSlug: 'service-catalog' },
  'administration/user-administration': { categorySlug: 'fundamentals', lessonSlug: 'users-groups-roles' },
  'itsm/incident-management': { categorySlug: 'itsm-module', lessonSlug: 'incident-management' },
  'itsm/problem-management': { categorySlug: 'itsm-module', lessonSlug: 'problem-management' },
  'itsm/change-management': { categorySlug: 'itsm-module', lessonSlug: 'change-management' },
  'itsm/request-management': { categorySlug: 'itsm-module', lessonSlug: 'request-management' },
  'itsm/cmdb-basics': { categorySlug: 'itsm-module', lessonSlug: 'cmdb-basics' },
  'itsm/asset-management': { categorySlug: 'itsm-module', lessonSlug: 'asset-management' },
  'administration/access-control-list': { categorySlug: 'administration', lessonSlug: 'access-control-rules' },
  'administration/email-notifications': { categorySlug: 'administration', lessonSlug: 'notifications' },
  'administration/ui-policy': { categorySlug: 'development', lessonSlug: 'ui-policies' },
  'development/script-include': { categorySlug: 'development', lessonSlug: 'script-includes' },
  'development/glide-api-s': { categorySlug: 'development', lessonSlug: 'gliderecord' },
  'administration/workflow': { categorySlug: 'workflow-automation', lessonSlug: 'workflow-editor' },
  'administration/configure-mid-server': { categorySlug: 'cmdb-discovery', lessonSlug: 'mid-server-configuration' }
};

export default function LearnDashboard() {
 const { categorySlug, lessonSlug } = useParams();
 const navigate = useNavigate();
 const { isAuthenticated } = useAuth();
 const { openModal } = useAuthModal();

  // Find initial lesson based on URL params, or default to the very first one
  const getInitialLesson = () => {
    if (categorySlug && lessonSlug) {
      for (const track of allTrackData) {
        const found = track.sections.flatMap(c => c.lessons).find(l => l.categorySlug === categorySlug && l.slug === lessonSlug);
        if (found) return { lesson: found, track };
      }

      const oldPath = `${categorySlug}/${lessonSlug}`;
      if (REDIRECT_MAP[oldPath]) {
        const { categorySlug: newCat, lessonSlug: newLes } = REDIRECT_MAP[oldPath];
        for (const track of allTrackData) {
          const redirected = track.sections.flatMap(c => c.lessons).find(l => l.categorySlug === newCat && l.slug === newLes);
          if (redirected) return { lesson: redirected, track };
        }
      }
    }
    return { lesson: allTrackData[0].sections[0].lessons[0], track: allTrackData[0] };
  };

  const initial = getInitialLesson();
  const [activeTrack, setActiveTrack] = useState<TrackData>(initial.track);
  const [activeLesson, setActiveLesson] = useState<LessonData>(initial.lesson);
  const [searchQuery, setSearchQuery] = useState("");
 
 // By default, expand the section of the active lesson
 const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
 [activeLesson?.category || activeTrack.sections[0]?.sectionTitle]: true
 });
 
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [tocMenuOpen, setTocMenuOpen] = useState(false);
 const [activeTab, setActiveTab] = useState("tutorial");
 
 const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({
 [activeLesson?.id]: true
 });
 
 const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
   try {
     const stored = localStorage.getItem('nowscripts_completed_lessons');
     return stored ? JSON.parse(stored) : {};
   } catch (e) {
     return {};
   }
 });

 useEffect(() => {
   localStorage.setItem('nowscripts_completed_lessons', JSON.stringify(completedLessons));
 }, [completedLessons]);

 const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, boolean>>({});
 const [activeSubtopicId, setActiveSubtopicId] = useState<string>("");
 const [readingProgress, setReadingProgress] = useState(0);

 const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Flatten lessons for next/prev navigation
  const allLessons = activeTrack.sections.flatMap(section => section.lessons);
  const currentIndex = activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) : -1;

 // Sync URL when activeLesson changes
 useEffect(() => {
 if (activeLesson) {
 const newUrl = `/learn/${activeLesson.categorySlug}/${activeLesson.slug}`;
 if (window.location.pathname !== newUrl) {
 navigate(newUrl, { replace: true });
 }
 }
 }, [activeLesson, navigate]);

  const filteredData = activeTrack.sections.map(section => {
  const filteredLessons = section.lessons.filter(l => 
  l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return { ...section, lessons: filteredLessons };
  }).filter(section => section.lessons.length > 0);

 useEffect(() => {
 document.body.style.backgroundColor = '#FFFFFF';
 return () => { document.body.style.backgroundColor = ''; };
 }, []);

 useEffect(() => {
 if (!activeLesson) return;
 setExpandedLessons(prev => ({ ...prev, [activeLesson.id]: true }));
 setExpandedSections(prev => ({ ...prev, [activeLesson.category]: true }));
 
 if (activeLesson.subtopics && activeLesson.subtopics.length > 0) {
 if (!window.location.hash) {
 setActiveSubtopicId(activeLesson.subtopics[0].id);
 }
 }
 
 window.scrollTo({ top: 0, behavior: 'smooth' });
 setReadingProgress(0);
 }, [activeLesson]);

 // Jump to hash on mount or when activeLesson changes
 useEffect(() => {
 if (!activeLesson) return;
 const hash = window.location.hash.replace('#', '');
 if (hash && activeLesson.subtopics && activeLesson.subtopics.some(s => s.id === hash)) {
  setTimeout(() => {
  const el = document.getElementById(hash);
  if (el) {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  }, 100);
 }
 }, [activeLesson]);

 // Intersection Observer
 useEffect(() => {
 if (!activeLesson) return;

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    if (totalScroll > 0) {
      setReadingProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
    } else {
      setReadingProgress(100);
    }
  };

  window.addEventListener('scroll', handleScroll);

 const observer = new IntersectionObserver((entries) => {
 const visibleEntries = entries.filter(e => e.isIntersecting);
 if (visibleEntries.length > 0) {
 visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
 const topMost = visibleEntries[0].target.id;
 
 setActiveSubtopicId(topMost);
 
 window.history.replaceState(null, "", `#${topMost}`);

 setCompletedSubtopics(prev => ({ ...prev, [topMost]: true }));
 }
 }, { 
 root: null, 
 rootMargin: '0px 0px -80% 0px' 
 });

 if (activeLesson.subtopics) {
 setTimeout(() => {
   activeLesson.subtopics.forEach(sub => {
     const el = document.getElementById(sub.id);
     if (el) observer.observe(el);
   });
 }, 300); // Wait for markdown to parse and render
 }

 return () => {
  window.removeEventListener('scroll', handleScroll);
  observer.disconnect();
 };
 }, [activeLesson]);

 const toggleSection = (sectionTitle: string) => {
 setExpandedSections(prev => ({
 ...prev,
 [sectionTitle]: !prev[sectionTitle]
 }));
 };

 const toggleLesson = (lessonId: string, e: React.MouseEvent) => {
 e.stopPropagation();
 setExpandedLessons(prev => ({
 ...prev,
 [lessonId]: !prev[lessonId]
 }));
 };

 const goToNextLesson = () => {
 if (currentIndex < allLessons.length - 1) {
 setActiveLesson(allLessons[currentIndex + 1]);
 }
 };

 const goToPrevLesson = () => {
 if (currentIndex > 0) {
 setActiveLesson(allLessons[currentIndex - 1]);
 }
 };

 const scrollToSubtopic = (id: string) => {
 const el = document.getElementById(id);
 if (el) {
 el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 };

 if (!activeLesson) {
 return (
 <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-8 text-center">
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
 <div className="w-16 h-16 bg-now-primary/10 text-now-primary rounded-full flex items-center justify-center mx-auto mb-6">
 <BookOpen className="w-8 h-8" />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 mb-3">Content Coming Soon</h2>
 <p className="text-gray-500 mb-8 leading-relaxed">
 The lesson you're looking for doesn't exist yet or is currently being updated. Please select another module from the sidebar.
 </p>
 <button 
 onClick={() => navigate('/learn')}
 className="px-6 py-3 bg-now-primary hover:bg-now-accent text-white font-semibold rounded-full shadow-lg transition-all"
 >
 Return to Dashboard
 </button>
 </div>
 </div>
 );
 }

 // We slice the rawMarkdown to remove the frontmatter block at the top before rendering
 const contentToRender = activeLesson.rawMarkdown ? activeLesson.rawMarkdown.replace(/^---[\s\S]+?---/, '').trim() : "";

 return (
 <div className="bg-white text-gray-900 font-sans flex flex-col w-full min-h-screen selection:bg-now-primary selection:text-black relative">

 
 <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[70]">
 <div 
 className="h-full bg-now-primary transition-all duration-300 ease-out" 
 style={{ width: `${readingProgress}%` }}
 />
 </div>
 
  <div className="sticky top-0 z-[60] border-b border-gray-200 bg-white flex-shrink-0 shadow-sm overflow-x-auto">
    <div className="flex px-4 sm:px-6 lg:px-8 w-full min-w-max pt-3 h-12 items-end relative justify-center">
      
      {/* Back Button positioned absolutely on the left */}
      <button 
        onClick={() => navigate('/learn')}
        className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 mt-1.5 flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
        title="Back to Catalog"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline text-sm font-medium">Back</span>
      </button>

      {/* Centered Tabs */}
      <div className="flex gap-2">
        {[
          ...(activeLesson.videoUrl ? [{ id: "video", label: "Video" }] : []),
          { id: "tutorial", label: "Tutorial" },
          { id: "exercises", label: "Exercises" },
          { id: "projects", label: "Projects" },
          { id: "quizzes", label: "Quizzes" },
          { id: "interview", label: "Interview Questions" }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[15px] pb-2.5 px-4 whitespace-nowrap transition-colors border-b-2 font-medium ${
              activeTab === tab.id 
                ? 'border-now-primary text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </div>

  <div className="flex flex-1 relative max-w-full">
 
  {activeTab === "tutorial" || activeTab === "video" ? (
    <>
  {mobileMenuOpen && (
  <div 
  className="fixed inset-0 bg-gray-900/20 z-[70] lg:hidden"
  onClick={() => setMobileMenuOpen(false)}
  />
  )}

  <div className={`fixed lg:sticky lg:top-[48px] w-72 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col z-[80] lg:z-[50] h-[100dvh] lg:h-[calc(100vh-48px)] transition-transform duration-300 ${
  mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  }`}>
  <div className="lg:hidden p-4 border-b border-gray-200 flex justify-end">
  <button className="p-2 text-gray-500 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>
  <X className="w-5 h-5" />
  </button>
  </div>

 <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-24">
 {filteredData.map((section, sIdx) => {
 const theme = getModuleTheme(section.sectionTitle);
 const isExpanded = expandedSections[section.sectionTitle];
 const completedInModule = section.lessons.filter(l => completedLessons[l.id]).length;
 const totalInModule = section.lessons.length;
 const progressPercent = totalInModule > 0 ? (completedInModule / totalInModule) * 100 : 0;

 return (
 <div key={sIdx} className={`border-b border-gray-100 ${isExpanded ? theme.lightBg : "bg-white"}`}>
 <button 
 onClick={() => toggleSection(section.sectionTitle)}
 className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
 >
 <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-left">{section.sectionTitle}</span>
 {isExpanded ? (
 <ChevronDown className="w-4 h-4 text-gray-500" />
 ) : (
 <ChevronRight className="w-4 h-4 text-gray-500" />
 )}
 </button>

 <AnimatePresence>
 {isExpanded && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 className="overflow-hidden bg-white"
 >
 {section.lessons.map((lesson, index) => {
 const isLessonActive = activeLesson.id === lesson.id;
 const isLessonExpanded = expandedLessons[lesson.id];
 const isCompleted = completedLessons[lesson.id];

 return (
 <div key={lesson.id} className="border-l-[3px] border-transparent transition-colors" style={isLessonActive ? { borderColor: 'var(--primary)' } : {}}>
 <div className="flex items-stretch border-b border-gray-50 last:border-b-0">
 <button
 onClick={() => setActiveLesson(lesson)}
 className={`flex-1 pl-8 pr-4 py-2 flex items-center gap-3 text-left transition-all ${
 isLessonActive 
 ? `${theme.lightBg} ${theme.text}` 
 : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
 }`}
 >
 <div className="shrink-0">
 {isCompleted ? (
 <CheckCircle className={`w-3.5 h-3.5 ${theme.text}`} />
 ) : (
 <div className={`w-3.5 h-3.5 rounded-full border-2 ${isLessonActive ? theme.border : "border-gray-300"}`} />
 )}
 </div>
 <span className={`text-[13px] leading-snug whitespace-normal ${isLessonActive ? "font-bold" : "font-medium"}`}>
 {lesson.title.replace(/\*\*/g, '')}
 </span>
 </button>
 </div>

 </div>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 })}
 </div>
 </div>

  <div 
  ref={scrollContainerRef}
  className="flex-1 bg-white relative w-full min-w-0"
  >
 <div className="w-full max-w-[960px] px-4 lg:px-8 xl:px-12 py-8 xl:py-12 pb-48 overflow-x-hidden">
 <AnimatePresence mode="wait">
 <motion.div 
 key={activeLesson.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3 }}
 >

  <div id={activeLesson.id} className="mb-8">
    {activeLesson.type === 'topic' ? (
      <>
        {activeTab === 'video' && (
          activeLesson.videoUrl ? (
            <div className="w-full max-w-[1280px] mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video relative">
              <iframe 
                src={activeLesson.videoUrl} 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="w-full py-24 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Video className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Video Available</h3>
              <p>There is no video content for this lesson yet.</p>
            </div>
          )
        )}
        
        {activeTab === 'tutorial' && (
          <MarkdownRenderer content={contentToRender} lessonData={activeLesson} />
        )}
      </>
    ) : activeLesson.type === 'project' ? (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
          <Hammer className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeLesson.title}</h2>
        <div className="prose prose-lg max-w-none text-gray-600 mb-8">
          <p>{activeLesson.description}</p>
          <p>Project instructions and lab environments will be provided here.</p>
        </div>
        <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">
          Start Project
        </button>
      </div>
    ) : activeLesson.type === 'mock-interview' ? (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <Mic className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeLesson.title}</h2>
        <div className="prose prose-lg max-w-none text-gray-600 mb-8">
          <p>{activeLesson.description}</p>
          <p>Test your knowledge with our interactive practice mode.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
          Enter Practice Mode
        </button>
      </div>
    ) : (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Flag className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeLesson.title}</h2>
        <div className="prose prose-lg max-w-none text-gray-600 mx-auto mb-8">
          <p>{activeLesson.description}</p>
          <p className="font-bold text-purple-600 uppercase tracking-widest text-sm">Coming Soon</p>
        </div>
      </div>
    )}
  </div>

  {/* View Counter Badge */}
  <div className="mt-8 flex justify-end">
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-md px-3 py-1.5 shadow-sm">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Page Views</span>
      <img 
        src={`https://api.visitorbadge.io/api/visitors?path=nowscripts.learn.${activeLesson.id}&countColor=%23FF5A5F`} 
        alt="Views" 
        className="h-[20px]" 
      />
    </div>
  </div>

  {/* Bottom Navigation Cards */}
  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
 {currentIndex > 0 ? (
 <button 
 onClick={goToPrevLesson}
 className="group flex flex-col items-start p-4 bg-white border border-gray-200 rounded-xl hover:border-now-primary :border-now-primary transition-all text-left"
 >
 <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
 <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Previous Lesson
 </span>
 <span className="text-sm font-bold text-gray-900 group-hover:text-now-primary transition-colors line-clamp-2">
 {allLessons[currentIndex - 1].title.replace(/\*\*/g, '')}
 </span>
 </button>
 ) : <div />}
 
 {currentIndex < allLessons.length - 1 ? (
 <button 
 onClick={(e) => {
 if (isAuthenticated && !completedLessons[activeLesson.id]) {
 setCompletedLessons(prev => ({ ...prev, [activeLesson.id]: true }));
 }
 goToNextLesson();
 }}
 className="group flex flex-col items-end p-4 bg-white border border-gray-200 rounded-xl hover:border-now-primary :border-now-primary transition-all text-right shadow-sm hover:shadow-md"
 >
 <span className="text-xs font-bold text-now-primary flex items-center gap-1.5 mb-1">
 Complete & Continue <IconNext className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
 </span>
 <span className="text-sm font-bold text-gray-900 group-hover:text-now-primary transition-colors line-clamp-2">
 {allLessons[currentIndex + 1].title.replace(/\*\*/g, '')}
 </span>
 </button>
 ) : <div />}
 </div>

 </motion.div>
 </AnimatePresence>
 </div>
 </div>

 {/* Mobile TOC Overlay */}
 {tocMenuOpen && (
 <div 
 className="fixed inset-0 bg-gray-900/20 z-[70] xl:hidden"
 onClick={() => setTocMenuOpen(false)}
 />
 )}
 {!activeLesson.videoUrl && (
   <div className={`fixed right-0 top-0 xl:sticky xl:top-[48px] w-60 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col z-[80] xl:z-[50] h-[100dvh] xl:h-[calc(100vh-48px)] overflow-hidden transition-transform duration-300 ${
   tocMenuOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"
   }`}>
   <div className="p-4 pb-2 flex items-center justify-between border-b border-gray-100">
   <h3 className="font-bold text-gray-900 uppercase tracking-widest text-[11px]">On This Page</h3>
   <button onClick={() => setTocMenuOpen(false)} className="xl:hidden p-1 text-gray-500 hover:text-gray-900 "><X size={16} /></button>
   </div>
   <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-1 custom-scrollbar">
   {activeLesson.subtopics && activeLesson.subtopics.map(sub => (
   <button 
   key={sub.id}
   onClick={() => { scrollToSubtopic(sub.id); setTocMenuOpen(false); }}
   className={`block text-left text-[13px] font-semibold transition-all w-full border-l-2 pl-3 py-1.5 ${
   activeSubtopicId === sub.id 
   ? "border-now-primary text-now-primary font-bold bg-now-primary/5" 
   : "border-gray-200 text-gray-600 hover:text-gray-900 hover:border-[#64748B]"
   }`}
   >
   {sub.title}
   </button>
   ))}
   </div>
   </div>
 )}
    </>
  ) : (
    <div className="w-full flex flex-col items-center justify-center py-32 text-gray-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
      <p>This section is currently under development.</p>
    </div>
  )}
  </div>

  {/* Bottom Floating Pill Navigation (Mobile) */}
 <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden flex bg-white/95 backdrop-blur-md text-gray-700 border border-gray-200/80 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden font-medium text-[12px]">
 <button 
 onClick={() => { setMobileMenuOpen(true); setTocMenuOpen(false); }}
 className="px-4 py-2 hover:bg-gray-50 transition-colors border-r border-gray-200 flex items-center gap-1.5"
 >
 <List size={13} /> Contents
 </button>
 <button 
 onClick={() => { setTocMenuOpen(true); setMobileMenuOpen(false); }}
 className="px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
 >
 <List size={13} /> TOC
 </button>
 </div>

 {/* Scroll to Top Button */}
 <button
 onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
 className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-now-primary transition-all duration-300 transform ${
 readingProgress > 10 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
 }`}
 >
 <ChevronLeft className="w-5 h-5 rotate-90" />
 </button>

  {/* Floating AI Bot Button */}
  <FloatingAIBotButton />

  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
 }
 .custom-scrollbar::-webkit-scrollbar-track {
 background: transparent;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb {
 background-color: #CBD5E1;
 border-radius: 20px;
 }
 .custom-scrollbar:hover::-webkit-scrollbar-thumb {
 background-color: #94A3B8;
 }
 
 html {
 scroll-behavior: smooth;
 }
 `}</style>
 </div>
 );
}
