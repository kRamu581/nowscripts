import React, { useState } from "react";
import { InterviewSetup } from "./InterviewSetup";
import { HardwareCheck } from "./HardwareCheck";
import { LiveInterview } from "./LiveInterview";
import { InterviewReport } from "./InterviewReport";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Menu, X, ChevronRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function AIInterviewWizard() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const navigate = useNavigate();
  const [config, setConfig] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSetupComplete = (setupConfig: any) => {
    setConfig(setupConfig);
    setStep(2);
  };

  const handleHardwareComplete = () => {
    setStep(3);
  };

  const handleInterviewComplete = (interviewResults: any) => {
    setResults(interviewResults);
    setStep(4);
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="flex flex-1 h-full min-h-screen overflow-hidden relative bg-now-background text-now-text">
      
      {/* Back Button */}
      <button 
        onClick={() => step === 0 ? navigate('/interview-prep') : setStep(prev => (prev - 1) as any)}
        className="absolute top-6 left-6 z-50 p-2 rounded-full transition-colors flex items-center justify-center text-gray-600 hover:bg-gray-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto h-screen relative custom-scrollbar flex flex-col">

      {/* Optional Progress Bar for Steps 1-2 */}
      {step > 0 && step < 3 && (
        <div className="w-full max-w-4xl mx-auto px-6 pt-4 pb-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 -z-10"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-now-primary transition-all duration-500 -z-10 ${step === 1 ? 'w-0' : 'w-full'}`}></div>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-now-primary text-white shadow-[0_0_10px_rgba(255,90,95,0.4)]' : 'bg-white text-gray-500 border border-gray-300'}`}>1</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-now-primary text-white shadow-[0_0_10px_rgba(255,90,95,0.4)]' : 'bg-white text-gray-500 border border-gray-300'}`}>2</div>
          </div>
          <div className="flex items-center justify-between mt-2 px-1 text-xs font-semibold text-gray-500">
            <span>Setup</span>
            <span>Tech Check</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" variants={variants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex items-center justify-center p-6 bg-white overflow-hidden relative">
            {/* Background Accents based on user screenshot */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-now-primary/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-4xl text-center space-y-8 relative z-10">
              <p className="text-now-primary text-sm md:text-base font-bold tracking-widest uppercase">
                SAVE TIME AND LET AI SCREEN YOUR PRACTICE
              </p>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111827] tracking-tight leading-tight">
                AI Interviews for Practice
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Upgrade your learning experience with AI interviews. Save time. Find hidden gems. Skip the scheduling back-and-forth.
              </p>
              
              <div className="pt-8">
                <button 
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white bg-now-primary hover:bg-now-accent rounded-2xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,90,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,95,0.23)] hover:-translate-y-0.5"
                >
                  Let's Start
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="w-full">
            <InterviewSetup onNext={handleSetupComplete} />
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="w-full">
            <HardwareCheck config={config} onNext={handleHardwareComplete} onBack={() => setStep(1)} />
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="w-full absolute inset-0 z-50">
            <LiveInterview config={config} onEnd={handleInterviewComplete} />
          </motion.div>
        )}
        
        {step === 4 && (
          <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="w-full">
            <InterviewReport results={results} config={config} />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
