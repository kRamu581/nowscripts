import React, { useState, useEffect } from "react";
import { 
  Search, ChevronRight, CheckCircle, Bookmark, Star, ArrowLeft, ArrowRight,
  Target, BarChart3, AlertCircle, PlayCircle, RefreshCw, BookOpen, Menu, X, List, Hash, ExternalLink
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
 id: string;
 title: string;
 author?: string;
 description: string;
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

 const [loading, setLoading] = useState(true);

 // Mobile responsiveness states
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [goToQuestionNumber, setGoToQuestionNumber] = useState("");

 const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

 useEffect(() => {
   if (activeCategory) {
     setExpandedCategories(prev => ({ ...prev, [activeCategory.id]: true }));
   }
 }, [activeCategory]);

 // Load index.json on mount
 useEffect(() => {
   fetch(`/content/interview-prep/index.json?t=${new Date().getTime()}`)
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
   
   fetch(`${activeCategory.dataFile}?t=${new Date().getTime()}`)
   .then(res => res.json())
   .then(data => {
     setQuestionBank(data);
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

 // Scroll Lock & Esc listener for Sidebar
 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === "Escape") {
       setMobileMenuOpen(false);
     }
   };
   if (mobileMenuOpen) {
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
 }, [mobileMenuOpen]);

  const totalQuestions = questionBank?.modules.reduce((acc, m) => acc + m.questions.length, 0) || 0;
  const isQuestionsOnly = activeCategory?.id === "interview-questions";

 const handleGoToQuestion = (e: React.FormEvent) => {
   e.preventDefault();
   if (!goToQuestionNumber) return;
   
   const targetId = `question-${goToQuestionNumber.trim()}`;
   const element = document.getElementById(targetId);
   if (element) {
     const y = element.getBoundingClientRect().top + window.scrollY - 150; // Offset for sticky headers
     window.scrollTo({ top: y, behavior: 'smooth' });
   }
   setGoToQuestionNumber("");
 };

 const updateProgressBackend = async (updates: Partial<Progress>) => {
   try {
     await axios.post(`${API_BASE}/api/progress/interview-prep/${activeCategory?.id}/update`, updates);
   } catch (e) {
     console.error(e);
   }
 };

 const handleToggleBookmark = (qId: string) => {
   const isBookmarked = progress.bookmarkedQuestions.includes(qId);
   const newBookmarked = isBookmarked 
     ? progress.bookmarkedQuestions.filter(id => id !== qId)
     : [...progress.bookmarkedQuestions, qId];
   
   setProgress(prev => ({ ...prev, bookmarkedQuestions: newBookmarked }));
   if (isAuthenticated) updateProgressBackend({ bookmarkedQuestions: newBookmarked });
 };

 const handleToggleImportant = (qId: string) => {
   const isImportant = progress.importantQuestions.includes(qId);
   const newImportant = isImportant 
     ? progress.importantQuestions.filter(id => id !== qId)
     : [...progress.importantQuestions, qId];
   
   setProgress(prev => ({ ...prev, importantQuestions: newImportant }));
   if (isAuthenticated) updateProgressBackend({ importantQuestions: newImportant });
 };

 const handleReset = async () => {
   if (confirm("Are you sure you want to reset all your progress for this category?")) {
     try {
       await axios.post(`${API_BASE}/api/progress/interview-prep/${activeCategory?.id}/reset`);
       setProgress({ ...progress, bookmarkedQuestions: [], importantQuestions: [], completedQuestions: [], lastViewedQuestion: null, progressPercentage: 0 });
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
 <div className="bg-white text-gray-900 font-sans flex flex-1 min-h-[calc(100vh-56px)] relative items-start">
 
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

 {/* Main Categories Sidebar */}
 <div 
   role="dialog"
   aria-modal="true"
   aria-label="Category Sidebar"
   className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:sticky lg:top-0 lg:flex w-80 flex-shrink-0 border-r border-gray-200 bg-white flex-col lg:h-screen h-full overflow-hidden transition-transform duration-300 ease-in-out`}
 >
   <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
     <div className="flex items-center gap-2">
       <Link to="/" className="p-1.5 text-gray-500 hover:text-now-primary hover:bg-now-primary/10 rounded-lg transition-colors" title="Back to Home">
         <ArrowLeft className="w-5 h-5" />
       </Link>
       <h1 className="text-lg font-bold flex items-center gap-2 text-gray-900">
         <BookOpen className="text-now-primary w-5 h-5" /> Interview Prep
       </h1>
     </div>
     <button aria-label="Close menu" className="lg:hidden p-2 text-gray-500 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>
       <X className="w-5 h-5" />
     </button>
   </div>

   <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
     {categories.map((cat) => {
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
         </div>
       );
     })}
   </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 flex flex-col min-w-0 bg-white relative">
   {loading ? (
     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary mb-4"></div>
       <p className="text-gray-500 font-medium">Loading content...</p>
     </div>
   ) : activeCategory?.status === "coming_soon" ? (
     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
       <button 
         onClick={() => setMobileMenuOpen(true)}
         className="lg:hidden absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 text-gray-600 flex items-center gap-2 font-medium"
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
       {/* Top Stats Bar */}
       <div className="sticky top-0 z-40 h-14 px-2 sm:px-4 lg:px-6 border-b border-gray-200 flex items-center justify-between bg-white/95 backdrop-blur-sm overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shrink-0">
         <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-max">
           <button className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(true)}>
             <Menu className="w-4 h-4" />
           </button>
           <div>
             <div className="text-[9px] lg:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total Questions</div>
             <div className="text-sm lg:text-[15px] font-bold text-gray-900">{totalQuestions}</div>
           </div>
           <div className="flex gap-2 sm:gap-4 border-l border-gray-200 pl-2 sm:pl-4 lg:pl-6 ml-1 sm:ml-2">
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
         
         <div className="flex items-center gap-2 sm:gap-4 min-w-max pl-2 sm:pl-4">
            <form onSubmit={handleGoToQuestion} className="flex items-center gap-1 sm:gap-2 relative">
              <input 
                type="number" 
                min="1" 
                max={totalQuestions}
                value={goToQuestionNumber}
                onChange={(e) => setGoToQuestionNumber(e.target.value)}
                placeholder="Q#" 
                className="w-12 sm:w-16 h-7 sm:h-8 px-1.5 sm:px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-now-primary focus:ring-1 focus:ring-now-primary"
              />
              <button type="submit" className="h-7 sm:h-8 px-2 sm:px-3 text-xs font-semibold text-white bg-now-primary hover:bg-now-primary/90 rounded transition-colors">
                Go
              </button>
            </form>
            <div className="w-[1px] h-6 bg-gray-200 hidden sm:block"></div>
            <button onClick={handleReset} title="Reset Bookmarks" className="flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 text-[11px] lg:text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Reset Bookmarks</span>
            </button>
          </div>
       </div>

       {/* Blog Style Content */}
       <div className="flex-1 p-4 lg:p-8 lg:pt-6 xl:px-10 pb-32">
         <div className="max-w-5xl mx-auto space-y-12">
           <div>
             <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
               {questionBank.title}
             </h1>
             {questionBank.author && (
               <div className="text-sm font-medium text-gray-500 mb-6">
                 {questionBank.author}
               </div>
             )}
             <div className="border-b pb-3"></div>
           </div>

            {activeCategory?.id === "references" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-3 lg:p-4 text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-24 md:min-w-32">Website</th>
                      <th className="p-3 lg:p-4 text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-16 md:min-w-64">URL</th>
                      <th className="p-3 lg:p-4 text-sm font-semibold text-gray-900 min-w-24 md:min-w-32">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {questionBank.modules[0]?.questions.map((q, idx) => {
                      if (q.question_text === "Additional Notes") {
                        return (
                          <tr key={idx} className="bg-amber-50/50">
                            <td colSpan={3} className="p-4 text-sm text-gray-700 whitespace-pre-wrap">
                              <span className="font-semibold text-amber-800 mb-2 block">Notes:</span>
                              {q.explanation}
                            </td>
                          </tr>
                        );
                      }
                      
                      const parts = q.explanation.split(/\\n|\n/);
                      const urlPart = parts.find(p => p.includes('URL:'));
                      const datePart = parts.find(p => p.includes('Last Updated:'));
                      
                      const url = urlPart ? urlPart.replace('URL:', '').trim() : '';
                      const date = datePart ? datePart.replace('Last Updated:', '').trim() : '';
                      
                      return (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 lg:p-4 text-sm font-medium text-gray-900 border-r border-gray-200">{q.question_text}</td>
                          <td className="p-3 lg:p-4 text-sm border-r border-gray-200">
                            {url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-now-primary hover:text-blue-700 hover:underline break-words block group" title={url}>
                                <span className="hidden md:inline">{url}</span>
                                <span className="md:hidden flex items-center justify-center sm:justify-start gap-1 p-1 bg-blue-50 text-blue-600 rounded w-fit border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                  <ExternalLink className="w-4 h-4" />
                                </span>
                              </a>
                            ) : '-'}
                          </td>
                          <td className="p-3 lg:p-4 text-sm text-gray-600 whitespace-nowrap">{date || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              questionBank.modules.map((mod, mIdx) => (
                <div key={mIdx} className="scroll-mt-10">
                  
                  <div className={isQuestionsOnly ? "space-y-3" : "space-y-12"}>
                    {mod.questions.map((q, qIdx) => {
                      const globalQIdx = questionBank.modules.slice(0, mIdx).reduce((acc, m) => acc + m.questions.length, 0) + qIdx + 1;
                      const isBookmarked = progress.bookmarkedQuestions.includes(q.id);
                      const isImportant = progress.importantQuestions.includes(q.id);

                      return (
                        <div key={q.id} id={`question-${globalQIdx}`} className="group relative scroll-mt-24">
                          {/* Controls */}
                          <div className="absolute right-0 top-0 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleToggleBookmark(q.id)} 
                              className={`p-1.5 rounded-lg transition-colors ${isBookmarked ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200"}`} 
                              title="Bookmark"
                            >
                              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                            </button>
                            <button 
                              onClick={() => handleToggleImportant(q.id)} 
                              className={`p-1.5 rounded-lg transition-colors ${isImportant ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200"}`} 
                              title="Mark Important"
                            >
                              <Star className="w-4 h-4" fill={isImportant ? "currentColor" : "none"} />
                            </button>
                          </div>

                          {/* Question */}
                          <h3 className={isQuestionsOnly ? "text-[15px] text-gray-800 pr-24 font-normal" : "text-lg lg:text-xl font-bold text-gray-900 mb-4 leading-relaxed pr-24"}>
                            <span className={isQuestionsOnly ? "mr-1.5" : "text-gray-400 font-semibold mr-2"}>{globalQIdx}.</span>
                            {q.question_text}
                          </h3>

                          {/* Answer */}
                          {q.explanation && (
                            <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap text-[15px] lg:text-base border-l-4 border-gray-200 pl-4 lg:pl-6 bg-gray-50/50 p-4 rounded-r-lg">
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
         </div>
       </div>
     </>
   ) : null}

   {/* Floating Action Button for Mobile Menu */}
   <button
     onClick={() => setMobileMenuOpen(true)}
     className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-now-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-now-accent transition-all"
   >
     <Menu className="w-6 h-6" />
   </button>

 </div>
 </div>
 );
}
