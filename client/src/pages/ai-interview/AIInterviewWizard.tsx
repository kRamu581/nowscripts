import React, { useState } from "react";
import { InterviewSetup } from "./InterviewSetup";
import { HardwareCheck } from "./HardwareCheck";
import { LiveInterview } from "./LiveInterview";
import { InterviewReport } from "./InterviewReport";
import { motion, AnimatePresence } from "framer-motion";

export function AIInterviewWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [config, setConfig] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

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
    <div className="min-h-screen bg-[#0F1014] text-white overflow-x-hidden pt-16">
      
      {/* Optional Progress Bar for Steps 1-2 */}
      {step < 3 && (
        <div className="w-full max-w-4xl mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 -z-10"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500 -z-10 ${step === 1 ? 'w-0' : 'w-full'}`}></div>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}`}>1</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}`}>2</div>
          </div>
          <div className="flex items-center justify-between mt-2 px-1 text-xs font-semibold text-gray-400">
            <span>Setup</span>
            <span>Tech Check</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
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
  );
}
