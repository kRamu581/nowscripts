import React, { useState, useEffect } from "react";
import { 
 Search, ChevronRight, CheckCircle, Bookmark, Star, ArrowLeft, ArrowRight,
 Target, BarChart3, AlertCircle, PlayCircle, RefreshCw, BookOpen, Menu, X, List
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

// --- Types ---
interface Category {
 id: string;
 title: string;
 status: string;
 dataFile?: string;
 url?: string;
}

interface Question {
 id: string;
 question_text: string;
 question_type: string;
 options: { option_id: string; option_text: string }[];
 correct_options: string[];
 explanation: string;
}

interface Module {
 name: string;
 questions: Question[];
}

interface QuestionBank {
 title: string;
 modules: Module[];
}

interface Progress {
 completedQuestions: string[];
 bookmarkedQuestions: string[];
 importantQuestions: string[];
 lastViewedQuestion: string | null;
 progressPercentage: number;
}

// Ensure axios includes credentials
axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function InterviewPrepDashboard() {
 const { categoryId } = useParams();
 const navigate = useNavigate();
 const { isAuthenticated } = useAuth();
 const { openModal } = useAuthModal();

 const [categories, setCategories] = useState<Category[]>([]);
 const [activeCategory, setActiveCategory] = useState<Category | null>(null);
 const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
 
 const [progress, setProgress] = useState<Progress>({
 completedQuestions: [], bookmarkedQuestions: [], importantQuestions: [], lastViewedQuestion: null, progressPercentage: 0
 });

 const [activeModuleIndex, setActiveModuleIndex] = useState(0);
 const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
 const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 const [showAnswer, setShowAnswer] = useState(false);
 const [loading, setLoading] = useState(true);
 const [showFullExplanation, setShowFullExplanation] = useState(false);

 // Mobile responsiveness states
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [questionPaletteOpen, setQuestionPaletteOpen] = useState(false);

 const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

 useEffect(() => {
 if (activeCategory) {
 setExpandedCategories(prev => ({ ...prev, [activeCategory.id]: true }));
 }
 }, [activeCategory]);

 // Load index.json on mount
 useEffect(() => {
 fetch("/content/interview-prep/index.json")
 .then(res => res.json())
 .then(data => {
 setCategories(data.categories);
 let active = null;
 if (categoryId) {
 active = data.categories.find((c: Category) => c.id === categoryId);
 }
 if (!active && data.categories.length > 0) {
 active = data.categories[0];
 navigate(`/interview-prep/${active.id}`, { replace: true });
 }
 setActiveCategory(active || null);
 })
 .catch(err => {
 console.error("Failed to load categories", err);
 setLoading(false);
 });
 }, [categoryId, navigate]);

 // Load data.json & progress when category changes
 useEffect(() => {
 if (!activeCategory) return;

 if (activeCategory.status !== "active" || !activeCategory.dataFile) {
 setQuestionBank(null);
 setLoading(false);
 return;
 }

 setLoading(true);
 setQuestionBank(null);
 
 // Fetch JSON question bank
 fetch(activeCategory.dataFile)
 .then(res => res.json())
 .then(data => {
 setQuestionBank(data);
 setActiveModuleIndex(0);
 setActiveQuestionIndex(0);
 return axios.get(`${API_BASE}/api/progress/interview-prep/${activeCategory.id}`);
 })
 .then(res => {
 const p = res.data;
 setProgress({
 completedQuestions: p.completedQuestions || [],
 bookmarkedQuestions: p.bookmarkedQuestions || [],
 importantQuestions: p.importantQuestions || [],
 lastViewedQuestion: p.lastViewedQuestion || null,
 progressPercentage: p.progressPercentage || 0
 });
 setLoading(false);
 })
 .catch(err => {
 console.error("Failed to load question bank or progress", err);
 setLoading(false);
 });
 }, [activeCategory]);

 // Jump to last viewed question
 useEffect(() => {
 if (questionBank && progress.lastViewedQuestion) {
 let found = false;
 questionBank.modules.forEach((mod, mIdx) => {
 const qIdx = mod.questions.findIndex(q => q.id === progress.lastViewedQuestion);
 if (qIdx !== -1) {
 setActiveModuleIndex(mIdx);
 setActiveQuestionIndex(qIdx);
 found = true;
 }
 });
 if (!found) {
 setActiveModuleIndex(0);
 setActiveQuestionIndex(0);
 }
 } else if (questionBank) {
 setActiveModuleIndex(0);
 setActiveQuestionIndex(0);
 }
 }, [questionBank]);

 // Reset state on question change
 useEffect(() => {
 setSelectedOptions([]);
 setShowAnswer(false);
 }, [activeQuestionIndex, activeModuleIndex]);

 // Scroll Lock & Esc listener for Sidebar/Palette
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (e.key === "Escape") {
 setMobileMenuOpen(false);
 setQuestionPaletteOpen(false);
 }
 };
 if (mobileMenuOpen || questionPaletteOpen) {
 document.body.style.overflow = "hidden";
 window.addEventListener("keydown", handleKeyDown);
 } else {
 document.body.style.overflow = "unset";
 window.removeEventListener("keydown", handleKeyDown);
 }
 return () => {
 document.body.style.overflow = "unset";
 window.removeEventListener("keydown", handleKeyDown);
 };
 }, [mobileMenuOpen, questionPaletteOpen]);

 const activeModule = questionBank?.modules[activeModuleIndex];
 const activeQuestion = activeModule?.questions[activeQuestionIndex];

 const totalQuestions = questionBank?.modules.reduce((acc, m) => acc + m.questions.length, 0) || 0;
 
 const globalQuestionIndex = (() => {
 let idx = 0;
 if (!questionBank) return 0;
 for (let i = 0; i < activeModuleIndex; i++) {
 idx += questionBank.modules[i].questions.length;
 }
 idx += activeQuestionIndex;
 return idx + 1;
 })();
 
 const updateProgressBackend = async (updates: Partial<Progress>) => {
 try {
 await axios.post(`${API_BASE}/api/progress/interview-prep/${activeCategory?.id}/update`, updates);
 } catch (e) {
 console.error(e);
 }
 };

 const handleOptionToggle = (optId: string) => {
 if (showAnswer) return; // Prevent changing answer after reveal
 if (activeQuestion?.question_type === "single") {
 setSelectedOptions([optId]);
 } else {
 setSelectedOptions(prev => 
 prev.includes(optId) ? prev.filter(id => id !== optId) : [...prev, optId]
 );
 }
 };

 const handleCheckAnswer = () => {
 if (!activeQuestion) return;
 setShowAnswer(true);

 const isCorrect = 
 activeQuestion.correct_options.length === selectedOptions.length &&
 activeQuestion.correct_options.every(opt => selectedOptions.includes(opt));

 handleMarkCompleted(isCorrect);
 };

 const handleMarkCompleted = (isCorrect: boolean) => {
 if (!isAuthenticated) return;
 if (!activeQuestion || !questionBank) return;

 if (isCorrect) {
 const newCompleted = [...new Set([...progress.completedQuestions, activeQuestion.id])];
 const newPercent = Math.round((newCompleted.length / totalQuestions) * 100);
 const newProgress = { 
 ...progress, 
 completedQuestions: newCompleted,
 progressPercentage: newPercent,
 lastViewedQuestion: activeQuestion.id
 };
 setProgress(newProgress);
 updateProgressBackend({ 
 completedQuestions: newCompleted, 
 progressPercentage: newPercent,
 lastViewedQuestion: activeQuestion.id
 });
 } else {
 updateProgressBackend({ lastViewedQuestion: activeQuestion.id });
 }
 };

 const handleToggleBookmark = () => {
 if (!activeQuestion) return;
 const isBookmarked = progress.bookmarkedQuestions.includes(activeQuestion.id);
 const newBookmarked = isBookmarked 
 ? progress.bookmarkedQuestions.filter(id => id !== activeQuestion.id)
 : [...progress.bookmarkedQuestions, activeQuestion.id];
 
 setProgress(prev => ({ ...prev, bookmarkedQuestions: newBookmarked }));
 if (isAuthenticated) updateProgressBackend({ bookmarkedQuestions: newBookmarked });
 };

 const handleToggleImportant = () => {
 if (!activeQuestion) return;
 const isImportant = progress.importantQuestions.includes(activeQuestion.id);
 const newImportant = isImportant 
 ? progress.importantQuestions.filter(id => id !== activeQuestion.id)
 : [...progress.importantQuestions, activeQuestion.id];
 
 setProgress(prev => ({ ...prev, importantQuestions: newImportant }));
 if (isAuthenticated) updateProgressBackend({ importantQuestions: newImportant });
 };

 const goToNext = () => {
 if (!activeModule) return;
 setShowFullExplanation(false);
 if (activeQuestionIndex < activeModule.questions.length - 1) {
 setActiveQuestionIndex(i => i + 1);
 } else if (activeModuleIndex < questionBank!.modules.length - 1) {
 setActiveModuleIndex(i => i + 1);
 setActiveQuestionIndex(0);
 }
 };

 const goToPrev = () => {
 if (!activeModule) return;
 if (activeQuestionIndex > 0) {
 setActiveQuestionIndex(i => i - 1);
 } else if (activeModuleIndex > 0) {
 setActiveModuleIndex(i => i - 1);
 setActiveQuestionIndex(questionBank!.modules[activeModuleIndex - 1].questions.length - 1);
 }
 };

 const handleReset = async () => {
 if (confirm("Are you sure you want to reset all your progress for this category?")) {
 try {
 await axios.post(`${API_BASE}/api/progress/interview-prep/${activeCategory?.id}/reset`);
 setProgress({ ...progress, completedQuestions: [], lastViewedQuestion: null, progressPercentage: 0 });
 setActiveModuleIndex(0);
 setActiveQuestionIndex(0);
 toast.success("Progress reset successfully.");
 } catch (e) {
 toast.error("Failed to reset progress.");
 }
 }
 };

 if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary"></div>
      </div>
    );
  }

 return (
 <div className="bg-white text-gray-900 font-sans flex flex-1 h-full min-h-screen overflow-hidden relative">
 
  <SEO 
    title={activeCategory ? `${activeCategory.title} | Interview Questions & Answers` : "ServiceNow Interview Questions & Preparation"}
    description={activeCategory ? `Practice real-world ${activeCategory.title} interview questions with detailed explanations and answers.` : "Prepare for your ServiceNow interviews with our comprehensive database of real-world questions for CSA, CAD, ITSM, and more."}
    canonicalUrl={`https://www.nowscripts.in/interview-prep${categoryId ? `/${categoryId}` : ''}`}
    schema={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nowscripts.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Interview Prep",
            "item": "https://www.nowscripts.in/interview-prep"
          }
        ]
      },
      questionBank ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questionBank.modules.flatMap(m => m.questions).slice(0, 10).map(q => ({
          "@type": "Question",
          "name": q.question_text,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.explanation || "Answer available on the platform."
          }
        }))
      } : {}
    ]}
  />

 {/* Mobile Overlays */}
 {mobileMenuOpen && (
 <div 
 className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
 onClick={() => setMobileMenuOpen(false)}
 />
 )}
 {questionPaletteOpen && (
 <div 
 className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
 onClick={() => setQuestionPaletteOpen(false)}
 />
 )}

 {/* Main Categories Sidebar */}
 <div 
 role="dialog"
 aria-modal="true"
 aria-label="Category Sidebar"
 className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex w-80 flex-shrink-0 border-r border-gray-200 bg-white flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out`}
 >
 <div className="p-6 border-b border-gray-200 flex items-center justify-between">
 <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
 <BookOpen className="text-now-primary w-5 h-5" /> Interview Prep
 </h1>
 <button aria-label="Close menu" className="lg:hidden p-2 text-gray-500 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
 {categories.map((cat, catIdx) => {
 const isActive = activeCategory?.id === cat.id;
 const isExpanded = expandedCategories[cat.id];
 return (
 <div key={cat.id} className={`border-b border-gray-100 ${isActive ? "bg-now-primary/5" : "bg-white"}`}>
 <Link
 to={cat.url || `/interview-prep/${cat.id}`}
 onClick={(e) => {
 if (isActive) {
 e.preventDefault();
 setExpandedCategories(prev => ({ ...prev, [cat.id]: !prev[cat.id] }));
 }
 }}
 className={`w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors group ${isActive ? "border-l-[3px] border-now-primary" : "border-l-[3px] border-transparent"}`}
 >
 <div className="flex flex-col justify-center text-left">
 <span className={`text-sm transition-colors ${isActive ? "text-now-primary font-bold" : "text-gray-700 font-medium group-hover:text-gray-900"}`}>{cat.title}</span>
 {cat.status === "coming_soon" && cat.id !== "interview-experiences" && (
 <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded mt-1 w-max">
 Coming Soon
 </span>
 )}
 {cat.id === "interview-experiences" && (
 <span className="text-[10px] uppercase tracking-wider bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-bold mt-1 w-max">
 New Platform
 </span>
 )}
 </div>
 <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isExpanded && isActive ? "rotate-90 text-now-primary" : "text-gray-400 group-hover:text-gray-600"}`} />
 </Link>
 
 {/* Modules List for Active Category */}
 <AnimatePresence>
 {isExpanded && isActive && questionBank && (
 <motion.div 
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 className="overflow-hidden bg-white border-t border-gray-100"
 >
 {questionBank.modules.map((mod, mIdx) => (
 <button
 key={mIdx}
 onClick={() => {
 setActiveModuleIndex(mIdx);
 setActiveQuestionIndex(0);
 setMobileMenuOpen(false); // Close on selection (mobile)
 }}
 className={`w-full pr-5 py-2 pl-10 text-[13px] text-left transition-colors flex items-center gap-3 ${
 activeModuleIndex === mIdx
 ? "text-now-primary font-bold bg-now-primary/5 border-l-[3px] border-now-primary"
 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-[3px] border-transparent"
 }`}
 >
 <div className={`w-1.5 h-1.5 rounded-full ${activeModuleIndex === mIdx ? "bg-now-primary" : "bg-gray-300"}`} />
 <span className="truncate flex-1">{mod.name}</span>
 <span className="text-[10px] font-semibold bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{mod.questions.length}</span>
 </button>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )})}
 </div>
 </div>

 {/* Question Palette Sidebar (Right side, primarily for mobile overlay) */}
 <div 
 role="dialog" 
 aria-modal="true" 
 aria-label="Question Palette"
 className={`fixed inset-y-0 right-0 z-50 transform ${questionPaletteOpen ? "translate-x-0" : "translate-x-full"} lg:hidden w-80 flex-shrink-0 border-l border-gray-200 bg-white flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out`}
 >
 <div className="p-4 border-b border-gray-200 flex items-center justify-between">
 <h2 className="text-xl font-bold flex items-center gap-2">
 Question Palette
 </h2>
 <button aria-label="Close palette" className="p-2 text-gray-500 hover:text-gray-900 :text-white" onClick={() => setQuestionPaletteOpen(false)}>
 <X className="w-5 h-5" />
 </button>
 </div>
 <div className="p-4 border-b border-gray-200 bg-gray-50 ">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input 
 type="number" 
 placeholder="Jump to question..." 
 className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-now-primary"
 onChange={(e) => {
 const val = parseInt(e.target.value);
 if (val > 0 && activeModule && val <= activeModule.questions.length) {
 setActiveQuestionIndex(val - 1);
 setQuestionPaletteOpen(false);
 }
 }}
 />
 </div>
 </div>
 <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
 {activeModule?.questions.map((q, idx) => {
 const isCompleted = progress.completedQuestions.includes(q.id);
 const isBookmarked = progress.bookmarkedQuestions.includes(q.id);
 return (
 <button
 key={q.id}
 onClick={() => {
 setActiveQuestionIndex(idx);
 setQuestionPaletteOpen(false);
 }}
 className={`w-full p-3 mb-2 text-left text-sm rounded-lg border transition-colors flex items-center gap-3 ${
 activeQuestionIndex === idx 
 ? "bg-now-primary/10 border-now-primary text-now-primary font-bold"
 : isCompleted
 ? "bg-emerald-50 border-emerald-200 text-emerald-700 "
 : "bg-gray-50 border-gray-200 hover:border-now-primary/50"
 }`}
 >
 <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border ${
 activeQuestionIndex === idx ? "bg-now-primary text-white border-now-primary" :
 isCompleted ? "bg-emerald-500 text-white border-emerald-500" : "border-gray-300 text-gray-500"
 }`}>
 {idx + 1}
 </div>
 <div className="truncate flex-1">
 Question {idx + 1}
 </div>
 {isBookmarked && <Bookmark className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" />}
 </button>
 );
 })}
 </div>
 </div>

 {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white relative">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary mb-4"></div>
            <p className="text-gray-500 font-medium">Loading content...</p>
          </div>
        ) : activeCategory?.status === "coming_soon" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
 <button 
 onClick={() => setMobileMenuOpen(true)}
 className="lg:hidden absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 :bg-gray-800 text-gray-600 flex items-center gap-2 font-medium"
 >
 <Menu className="w-5 h-5" /> Menu
 </button>
 <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
 <BookOpen className="w-10 h-10 text-gray-400" />
 </div>
 <h2 className="text-3xl font-bold mb-4">{activeCategory.title}</h2>
 <p className="text-lg text-gray-500 max-w-md">
 We're working hard to prepare this content. Stay tuned for updates!
 </p>
 </div>
 ) : questionBank ? (
 <>
      <div className="px-4 lg:px-8 pt-4 pb-2 bg-gray-50/50">
        <Breadcrumbs />
      </div>
      {/* Top Stats Bar */}
      <div className="px-4 lg:px-8 py-2.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-4 lg:gap-6 min-w-max">
          <button className="lg:hidden p-1.5 -ml-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[9px] lg:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total</div>
            <div className="text-sm lg:text-[15px] font-bold text-gray-900">{totalQuestions}</div>
          </div>
          <div>
            <div className="text-[9px] lg:text-[10px] text-emerald-500 uppercase tracking-wider font-semibold">Completed</div>
            <div className="text-sm lg:text-[15px] font-bold text-emerald-600">{progress.completedQuestions.length}</div>
          </div>
          <div>
            <div className="text-[9px] lg:text-[10px] text-now-primary uppercase tracking-wider font-semibold">Progress</div>
            <div className="text-sm lg:text-[15px] font-bold text-now-primary">{progress.progressPercentage}%</div>
          </div>
          <div className="flex gap-4 border-l border-gray-200 pl-4 lg:pl-6 ml-2">
            <div className="flex flex-col items-center">
              <Bookmark className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
              <span className="text-[10px] font-medium text-gray-700">{progress.bookmarkedQuestions.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-3.5 h-3.5 text-rose-500 mb-0.5" />
              <span className="text-[10px] font-medium text-gray-700">{progress.importantQuestions.length}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 min-w-max pl-4">
          <button onClick={() => setQuestionPaletteOpen(true)} className="lg:hidden flex items-center gap-1.5 px-2.5 py-1 text-[11px] lg:text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <List className="w-3.5 h-3.5" /> Palette
          </button>
          <button onClick={handleReset} className="flex items-center gap-1.5 px-2.5 py-1 lg:px-3 lg:py-1.5 text-[11px] lg:text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

 <div className="h-1 w-full bg-gray-200 shrink-0">
 <div className="h-full bg-now-primary transition-all duration-300" style={{ width: `${(globalQuestionIndex / totalQuestions) * 100}%` }} />
 </div>

 {/* Question Viewer */}
 {activeQuestion && (
 <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar pb-32 lg:pb-8 relative">
 <div className="max-w-4xl mx-auto">
 
 {/* Category & Module Header */}
 <div className="flex justify-between items-start lg:items-center mb-6 lg:mb-8 flex-col lg:flex-row gap-4">
 <div className="flex flex-wrap items-center gap-2 text-xs lg:text-sm text-gray-500 font-medium">
 <span className="text-now-primary truncate max-w-[120px] lg:max-w-none">{questionBank.title}</span>
 <ChevronRight className="w-4 h-4 flex-shrink-0" />
 <span className="truncate max-w-[120px] lg:max-w-none">{activeModule?.name}</span>
 <ChevronRight className="w-4 h-4 flex-shrink-0" />
 <span className="whitespace-nowrap font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">Question {globalQuestionIndex} of {totalQuestions}</span>
 </div>

 <div className="flex gap-2 self-end lg:self-auto">
 <button onClick={handleToggleBookmark} className={`p-2 rounded-lg transition-colors ${progress.bookmarkedQuestions.includes(activeQuestion.id) ? "bg-amber-100 text-amber-600 " : "hover:bg-gray-100 :bg-gray-800 text-gray-400"}`} title="Bookmark">
 <Bookmark className="w-5 h-5" fill={progress.bookmarkedQuestions.includes(activeQuestion.id) ? "currentColor" : "none"} />
 </button>
 <button onClick={handleToggleImportant} className={`p-2 rounded-lg transition-colors ${progress.importantQuestions.includes(activeQuestion.id) ? "bg-rose-100 text-rose-600 " : "hover:bg-gray-100 :bg-gray-800 text-gray-400"}`} title="Mark Important">
 <Star className="w-5 h-5" fill={progress.importantQuestions.includes(activeQuestion.id) ? "currentColor" : "none"} />
 </button>
 </div>
 </div>

 <AnimatePresence mode="wait">
 <motion.div
 key={activeQuestion.id}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.2 }}
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={(e, { offset }) => {
 if (offset.x < -50) {
 goToNext();
 } else if (offset.x > 50) {
 goToPrev();
 }
 }}
 className="min-h-[300px]"
 >
 {/* Question Text */}
 <div className="text-[17px] lg:text-[18px] font-bold text-gray-900 mb-6 lg:mb-8 leading-relaxed whitespace-pre-wrap">
 {activeQuestion.question_text}
 </div>

 {/* Options or Short Answer */}
 {activeQuestion.question_type === 'short_answer' ? (
 <div className="space-y-4 mb-10">
 {!showAnswer ? (
 <div className="p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-center">
 <p className="text-gray-500 font-medium mb-4">
 This is an open-ended question. Think about your answer before revealing the solution.
 </p>
 <button 
 onClick={() => {
 setShowAnswer(true);
 // Mark as completed since it's a review-based question
 if (!progress.completedQuestions.includes(activeQuestion.id)) {
 const newCompleted = [...progress.completedQuestions, activeQuestion.id];
 const newPercent = Math.round((newCompleted.length / totalQuestions) * 100);
 setProgress(p => ({ ...p, completedQuestions: newCompleted, progressPercentage: newPercent, lastViewedQuestion: activeQuestion.id }));
 updateProgressBackend({ completedQuestions: newCompleted, progressPercentage: newPercent, lastViewedQuestion: activeQuestion.id });
 }
 }}
 className="bg-now-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-now-primary/90 transition-colors inline-flex items-center gap-2"
 >
 <BookOpen className="w-5 h-5" /> Show Answer
 </button>
 </div>
 ) : (
 <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 ">
 <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
 <CheckCircle className="w-5 h-5 text-emerald-500" /> Answer
 </h4>
 <p className="text-blue-800 whitespace-pre-wrap leading-relaxed text-lg">
 {activeQuestion.explanation}
 </p>
 </div>
 )}
 </div>
 ) : (
 <>
 <div className="space-y-3 mb-10">
 {activeQuestion.options.map(opt => {
 const isSelected = selectedOptions.includes(opt.option_id);
 const isCorrect = activeQuestion.correct_options.includes(opt.option_id);
 
 let optionClass = "border-gray-200 bg-white hover:border-now-primary";
 
 if (showAnswer) {
 if (isCorrect) optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900 ";
 else if (isSelected && !isCorrect) optionClass = "border-rose-500 bg-rose-50 text-rose-900 ";
 else optionClass = "border-gray-200 opacity-50";
 } else if (isSelected) {
 optionClass = "border-now-primary bg-now-primary/5 text-now-primary";
 }

 return (
 <button
 key={opt.option_id}
 onClick={() => handleOptionToggle(opt.option_id)}
 className={`w-full min-h-[44px] text-left p-3 lg:p-4 rounded-xl border-2 flex items-start gap-3 lg:gap-4 transition-all ${optionClass}`}
 >
 <div className={`w-5 h-5 lg:w-6 lg:h-6 shrink-0 rounded ${activeQuestion.question_type === 'single' ? 'rounded-full' : 'rounded'} border-2 flex items-center justify-center ${
 showAnswer && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
 showAnswer && isSelected && !isCorrect ? "border-rose-500 bg-rose-500 text-white" :
 isSelected ? "border-now-primary bg-now-primary text-white" : "border-gray-300 "
 }`}>
 {(showAnswer && isCorrect) || isSelected ? <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" /> : null}
 </div>
 <div className="flex-1 mt-0 lg:mt-0.5 text-sm lg:text-base whitespace-pre-wrap font-medium">
 {opt.option_text}
 </div>
 </button>
 );
 })}
 </div>

 {/* Explanation Block */}
 {showAnswer && activeQuestion.explanation && (
 <div className="mb-10 p-4 lg:p-6 rounded-xl bg-blue-50 border border-blue-100 ">
 <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
 <AlertCircle className="w-5 h-5" /> Explanation
 </h4>
 <div className="text-blue-800 leading-relaxed text-sm lg:text-base">
 <p className="whitespace-pre-wrap">
 {showFullExplanation || activeQuestion.explanation.length <= 250
 ? activeQuestion.explanation
 : `${activeQuestion.explanation.substring(0, 250)}...`}
 </p>
 {activeQuestion.explanation.length > 250 && (
 <button
 onClick={() => setShowFullExplanation(!showFullExplanation)}
 className="mt-2 text-now-primary font-bold hover:underline"
 >
 {showFullExplanation ? "Show Less" : "Show More"}
 </button>
 )}
 </div>
 </div>
 )}
 </>
 )}
 </motion.div>
 </AnimatePresence>

 {/* Bottom Controls */}
 <div className="fixed lg:static bottom-0 left-0 right-0 lg:mt-8 p-4 lg:p-0 bg-white lg:bg-transparent border-t border-gray-200 lg:border-none shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:shadow-none z-20">
 <div className="max-w-4xl mx-auto flex flex-row items-center justify-between gap-4">
 <button 
 onClick={goToPrev}
 disabled={activeModuleIndex === 0 && activeQuestionIndex === 0}
 className="min-w-[44px] min-h-[44px] flex-1 lg:flex-none px-4 lg:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-gray-600 bg-gray-100 lg:bg-transparent hover:bg-gray-200 lg: :bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
 >
 <ArrowLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
 </button>
 
 {!showAnswer ? (
 activeQuestion.question_type !== 'short_answer' && (
 <button 
 onClick={handleCheckAnswer}
 disabled={selectedOptions.length === 0}
 className="min-h-[44px] flex-1 lg:flex-none px-6 lg:px-10 py-3 rounded-xl font-bold bg-now-primary text-white hover:bg-now-accent shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
 >
 Check Answer
 </button>
 )
 ) : (
 <button 
 onClick={goToNext}
 className="min-h-[44px] flex-[2] lg:flex-none px-6 lg:px-10 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md transition-all flex items-center justify-center gap-2"
 >
 Next <span className="hidden sm:inline">Question</span> <ArrowRight className="w-5 h-5" />
 </button>
 )}
 </div>
 </div>

 {/* Floating Action Button for Mobile Palette */}
 <button
 onClick={() => setQuestionPaletteOpen(true)}
 className="lg:hidden fixed bottom-24 right-4 z-30 w-14 h-14 bg-now-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-now-accent transition-all"
 >
 <List className="w-6 h-6" />
 </button>

 </div>
 </div>
 )}
 </>
 ) : null}
 </div>

    </div>
  );
}
