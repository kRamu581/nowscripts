import React, { useState, useEffect } from "react";
import { 
 Search, ChevronRight, CheckCircle, Bookmark, Star, ArrowLeft, ArrowRight,
 Target, BarChart3, AlertCircle, PlayCircle, RefreshCw, BookOpen, Menu, X, List
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/Auth";
import { useAuthModal } from "../../contexts/AuthModalContext";
import { motion, AnimatePresence } from "framer-motion";

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

export function PracticeViewer({ dataUrl, categoryId }: { dataUrl: string, categoryId: string }) {
  const navigate = useNavigate();
 const { isAuthenticated } = useAuth();
 const { openModal } = useAuthModal();

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

 
   // Load data.json & progress
  useEffect(() => {
    if (!dataUrl) return;

    setLoading(true);
    setQuestionBank(null);
    
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        setQuestionBank(data);
        setActiveModuleIndex(0);
        setActiveQuestionIndex(0);
        return axios.get(`${API_BASE}/api/progress/interview-prep/${categoryId}`);
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
  }, [dataUrl, categoryId]);

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

 const handleJumpToQuestion = (globalIndex: number) => {
    if (!questionBank) return;
    if (globalIndex < 1 || globalIndex > totalQuestions) return;
    
    let count = 0;
    for (let mIdx = 0; mIdx < questionBank.modules.length; mIdx++) {
      const mod = questionBank.modules[mIdx];
      if (globalIndex <= count + mod.questions.length) {
        setActiveModuleIndex(mIdx);
        setActiveQuestionIndex(globalIndex - count - 1);
        break;
      }
      count += mod.questions.length;
    }
    setQuestionPaletteOpen(false);
  };
 
 const updateProgressBackend = async (updates: Partial<Progress>) => {
 try {
 await axios.post(`${API_BASE}/api/progress/interview-prep/${categoryId}/update`, updates);
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
 await axios.post(`${API_BASE}/api/progress/interview-prep/${categoryId}/reset`);
 setProgress({ ...progress, completedQuestions: [], lastViewedQuestion: null, progressPercentage: 0 });
 setActiveModuleIndex(0);
 setActiveQuestionIndex(0);
 toast.success("Progress reset successfully.");
 } catch (e) {
 toast.error("Failed to reset progress.");
 }
 }
 };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary"></div>
      </div>
    );
  }

 return (
 <div className="bg-white text-gray-900 font-sans flex flex-1 h-full w-full overflow-hidden relative">
 
  
 {/* Mobile Overlays */}
 {mobileMenuOpen && (
 <div 
 className="fixed inset-0 bg-gray-900/20 z-40 lg:hidden"
 onClick={() => setMobileMenuOpen(false)}
 />
 )}
 {questionPaletteOpen && (
 <div 
 className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
 onClick={() => setQuestionPaletteOpen(false)}
 />
 )}

  {/* Practice Modules Sidebar (Left side) */}
  {questionBank && (
  <div 
  role="dialog"
  aria-modal="true"
  aria-label="Practice Modules Sidebar"
  className={`fixed inset-y-0 left-0 z-50 lg:z-auto transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex w-[200px] sm:w-60 lg:w-64 flex-shrink-0 border-r border-gray-200 bg-white flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out`}
  >
  <div className="h-14 px-3 lg:px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
  <h1 className="text-[14px] lg:text-base font-bold flex items-center gap-1.5 text-now-primary truncate">
  <BookOpen className="w-4 h-4 shrink-0" /> <span className="truncate">{questionBank.title}</span>
  </h1>
  <button className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
  <X className="w-4 h-4" />
  </button>
  </div>
  <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
  {questionBank.modules.map((mod, mIdx) => (
  <button
  key={mIdx}
  onClick={() => {
  setActiveModuleIndex(mIdx);
  setActiveQuestionIndex(0);
  setMobileMenuOpen(false);
  }}
  className={`w-full !min-h-0 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-[13px] text-left transition-colors flex items-center gap-2 border-b border-gray-50 ${
  activeModuleIndex === mIdx
  ? "text-now-primary font-bold bg-now-primary/5 border-l-[3px] border-now-primary"
  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-[3px] border-transparent"
  }`}
  >
  <div className={`w-1 h-1 shrink-0 rounded-full ${activeModuleIndex === mIdx ? "bg-now-primary" : "bg-gray-300"}`} />
  <span className="truncate flex-1">{mod.name}</span>
  <span className="text-[9px] font-semibold bg-gray-100 px-1 py-0.5 min-w-[20px] text-center rounded-md text-gray-500 shrink-0">{mod.questions.length}</span>
  </button>
  ))}
  </div>
  </div>
  )}

 {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white relative">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary mb-4"></div>
            <p className="text-gray-500 font-medium">Loading content...</p>
          </div>
        ) : questionBank ? (
 <>
      
      {/* Top Stats Bar */}
      <div className="h-14 px-4 lg:px-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 overflow-x-auto custom-scrollbar shrink-0">
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
        </div>
        
        <div className="flex items-center gap-2 min-w-max pl-4">
          <div className="flex items-center gap-1 lg:hidden">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Go</span>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-10 h-6 px-1 text-[11px] font-bold border border-gray-300 rounded text-center focus:outline-none focus:border-now-primary bg-white text-gray-900"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt(e.currentTarget.value);
                  if (!isNaN(val)) handleJumpToQuestion(val);
                  e.currentTarget.value = '';
                  e.currentTarget.blur();
                }
              }}
            />
          </div>
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
 <div className="flex-1 overflow-y-auto p-4 lg:p-6 lg:pl-8 custom-scrollbar pb-32 lg:pb-8 relative">
 <div className="max-w-3xl">

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
 className="min-h-[250px]"
 >
  {/* Question Text */}
  <div className="text-base lg:text-[17px] font-bold text-gray-900 mb-5 lg:mb-6 leading-relaxed whitespace-pre-wrap">
  {globalQuestionIndex}. {activeQuestion.question_text}
  </div>

 {/* Options or Short Answer */}
 {activeQuestion.question_type === 'short_answer' ? (
 <div className="space-y-4 mb-8">
 {!showAnswer ? (
 <div className="p-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-center">
 <p className="text-gray-500 text-sm font-medium mb-3">
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
 className="bg-now-primary text-white text-sm font-bold py-2.5 px-5 rounded-lg hover:bg-now-primary/90 transition-colors inline-flex items-center gap-2"
 >
 <BookOpen className="w-4 h-4" /> Show Answer
 </button>
 </div>
 ) : (
 <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 ">
 <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm">
 <CheckCircle className="w-4 h-4 text-emerald-500" /> Answer
 </h4>
 <p className="text-blue-800 whitespace-pre-wrap leading-relaxed text-sm">
 {activeQuestion.explanation}
 </p>
 </div>
 )}
 </div>
 ) : (
 <>
 <div className="space-y-2.5 mb-8">
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
 className={`w-full min-h-[40px] text-left p-2.5 lg:p-3 rounded-lg border-2 flex items-start gap-2.5 lg:gap-3 transition-all ${optionClass}`}
 >
 <div className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 rounded ${activeQuestion.question_type === 'single' ? 'rounded-full' : 'rounded'} border-2 flex items-center justify-center ${
 showAnswer && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
 showAnswer && isSelected && !isCorrect ? "border-rose-500 bg-rose-500 text-white" :
 isSelected ? "border-now-primary bg-now-primary text-white" : "border-gray-300 "
 }`}>
 {(showAnswer && isCorrect) || isSelected ? <CheckCircle className="w-2.5 h-2.5 lg:w-3 lg:h-3" /> : null}
 </div>
 <div className="flex-1 mt-0 lg:mt-0 text-[13px] lg:text-sm whitespace-pre-wrap font-medium">
 {opt.option_text}
 </div>
 </button>
 );
 })}
 </div>

 {/* Explanation Block */}
 {showAnswer && activeQuestion.explanation && (
 <div className="mb-8 p-4 lg:p-5 rounded-xl bg-blue-50 border border-blue-100 ">
 <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
 <AlertCircle className="w-4 h-4" /> Explanation
 </h4>
 <div className="text-blue-800 leading-relaxed text-[13px] lg:text-sm">
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
  <div className="fixed lg:static bottom-0 left-0 right-0 lg:mt-8 p-3 lg:p-0 bg-white lg:bg-transparent border-t border-gray-200 lg:border-none shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:shadow-none z-20">
  <div className="max-w-4xl mx-auto flex flex-row items-center justify-between gap-4">
  <button 
  onClick={goToPrev}
  disabled={activeModuleIndex === 0 && activeQuestionIndex === 0}
  className="flex-none w-11 h-11 lg:w-auto lg:h-auto lg:px-5 lg:py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 text-gray-600 bg-gray-100 lg:bg-transparent hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
  >
  <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4" /> <span className="hidden lg:inline text-sm">Previous</span>
  </button>
  
  {!showAnswer ? (
  activeQuestion.question_type !== 'short_answer' && (
  <button 
  onClick={handleCheckAnswer}
  disabled={selectedOptions.length === 0}
  className="flex-none px-6 py-2.5 lg:px-8 lg:py-2.5 text-[15px] lg:text-sm rounded-lg font-bold bg-now-primary text-white hover:bg-now-accent shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  >
  Check Answer
  </button>
  )
  ) : (
  <button 
  onClick={goToNext}
  className="flex-none px-6 py-2.5 lg:px-8 lg:py-2.5 text-[15px] lg:text-sm rounded-lg font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-all flex items-center justify-center gap-2"
  >
  Next Question <ArrowRight className="w-4 h-4 lg:w-4 lg:h-4" />
  </button>
  )}
 </div>
 </div>

 </div>
 </div>
 )}
 </>
 ) : null}
 </div>

    </div>
  );
}
