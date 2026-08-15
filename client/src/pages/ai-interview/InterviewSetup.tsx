import React, { useState } from "react";
import { 
  Briefcase, 
  Settings, 
  BarChart, 
  Clock, 
  Globe, 
  ChevronRight,
  Shield,
} from "lucide-react";

interface InterviewSetupProps {
  onNext: (config: any) => void;
}

export function InterviewSetup({ onNext }: InterviewSetupProps) {
  const [targetRole, setTargetRole] = useState("Developer");
  const [experience, setExperience] = useState("Intermediate");
  const [module, setModule] = useState("ITSM");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("30 mins");
  const [language, setLanguage] = useState("English");

  const roles = ["Administrator", "Developer", "Architect", "Business Analyst"];
  const modules = ["ITSM", "HRSD", "CSM", "ITOM", "SecOps", "App Engine", "CMDB"];

  const handleStart = () => {
    onNext({
      targetRole,
      experience,
      module,
      difficulty,
      duration,
      language
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-white flex flex-col items-center justify-start pt-12 px-6 font-sans">
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-[32px] font-bold mb-4 text-[#191b1f]">AI Interview Setup</h1>
        <p className="text-[#5b5e63] text-[16px] leading-relaxed">
          Configure your mock ServiceNow technical interview. Our AI will dynamically generate a scenario-based interview tailored exactly to your selections.
        </p>
      </div>

      <div className="w-full max-w-[500px] bg-white border border-[#f0f0f0] rounded-[16px] p-8 md:p-10 mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <h2 className="text-[20px] font-bold text-[#191b1f] mb-8 pb-4">Interview Configuration</h2>
        
        <div className="grid grid-cols-1 gap-y-6">
          {/* Target Role */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <Briefcase className="w-4 h-4 mr-2 text-now-primary" />
              Target Role
            </label>
            <select 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Module */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <Settings className="w-4 h-4 mr-2 text-now-primary" />
              Primary Module
            </label>
            <select 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              {modules.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Experience Level
            </label>
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="Beginner">Beginner (0-1 Years)</option>
              <option value="Intermediate">Intermediate (1-3 Years)</option>
              <option value="Advanced">Advanced (3-5 Years)</option>
              <option value="Expert">Expert (5+ Years)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <BarChart className="w-4 h-4 mr-2 text-red-500" />
              Difficulty
            </label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="Easy">Easy (Standard Concepts)</option>
              <option value="Medium">Medium (Scenario Based)</option>
              <option value="Hard">Hard (Debugging & Edge Cases)</option>
              <option value="Extreme">Extreme (Architectural Design)</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <Clock className="w-4 h-4 mr-2 text-yellow-500" />
              Duration
            </label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="15 mins">15 mins (Quick Screen)</option>
              <option value="30 mins">30 mins (Standard)</option>
              <option value="45 mins">45 mins (Deep Dive)</option>
              <option value="60 mins">60 mins (Full Round)</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="flex items-center text-[14px] font-semibold text-[#5b5e63]">
              <Globe className="w-4 h-4 mr-2 text-cyan-500" />
              Voice Language
            </label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-3.5 text-[#191b1f] font-medium text-[15px] hover:border-gray-400 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b5e63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button 
            onClick={handleStart}
            className="flex items-center justify-center gap-2 bg-now-primary hover:bg-now-accent text-white px-8 h-[48px] rounded-[100px] font-bold text-[16px] transition-all w-full md:w-auto"
          >
            Continue to Tech Check
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
