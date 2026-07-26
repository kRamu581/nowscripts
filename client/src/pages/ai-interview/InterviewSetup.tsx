import React, { useState } from "react";
import { 
  Briefcase, 
  Settings, 
  BarChart, 
  Clock, 
  Globe, 
  ChevronRight,
  Shield,
  MonitorPlay
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
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-6 border border-blue-500/30">
          <MonitorPlay className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">AI Interview Setup</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Configure your mock ServiceNow technical interview. Our AI will dynamically generate a scenario-based interview tailored exactly to your selections.
        </p>
      </div>

      <div className="bg-[#1A1C23] border border-gray-800 rounded-2xl p-8 mb-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Interview Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Role */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
              Target Role
            </label>
            <select 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Module */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <Settings className="w-4 h-4 mr-2 text-purple-400" />
              Primary Module
            </label>
            <select 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {modules.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              Experience Level
            </label>
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Beginner">Beginner (0-1 Years)</option>
              <option value="Intermediate">Intermediate (1-3 Years)</option>
              <option value="Advanced">Advanced (3-5 Years)</option>
              <option value="Expert">Expert (5+ Years)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <BarChart className="w-4 h-4 mr-2 text-red-400" />
              Difficulty
            </label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Easy">Easy (Standard Concepts)</option>
              <option value="Medium">Medium (Scenario Based)</option>
              <option value="Hard">Hard (Debugging & Edge Cases)</option>
              <option value="Extreme">Extreme (Architectural Design)</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <Clock className="w-4 h-4 mr-2 text-yellow-400" />
              Duration
            </label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="15 mins">15 mins (Quick Screen)</option>
              <option value="30 mins">30 mins (Standard)</option>
              <option value="45 mins">45 mins (Deep Dive)</option>
              <option value="60 mins">60 mins (Full Round)</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-300">
              <Globe className="w-4 h-4 mr-2 text-cyan-400" />
              Voice Language
            </label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[#0F1014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleStart}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25"
        >
          Continue to Tech Check
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
