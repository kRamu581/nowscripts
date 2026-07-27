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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">AI Interview Setup</h1>
        <p className="text-gray-500">
          Configure your mock ServiceNow technical interview. Our AI will dynamically generate a scenario-based interview tailored exactly to your selections.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Interview Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Role */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
              Target Role
            </label>
            <select 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Module */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Settings className="w-4 h-4 mr-2 text-purple-500" />
              Primary Module
            </label>
            <select 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
            >
              {modules.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Experience Level
            </label>
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
            >
              <option value="Beginner">Beginner (0-1 Years)</option>
              <option value="Intermediate">Intermediate (1-3 Years)</option>
              <option value="Advanced">Advanced (3-5 Years)</option>
              <option value="Expert">Expert (5+ Years)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <BarChart className="w-4 h-4 mr-2 text-red-500" />
              Difficulty
            </label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
            >
              <option value="Easy">Easy (Standard Concepts)</option>
              <option value="Medium">Medium (Scenario Based)</option>
              <option value="Hard">Hard (Debugging & Edge Cases)</option>
              <option value="Extreme">Extreme (Architectural Design)</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-yellow-500" />
              Duration
            </label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
            >
              <option value="15 mins">15 mins (Quick Screen)</option>
              <option value="30 mins">30 mins (Standard)</option>
              <option value="45 mins">45 mins (Deep Dive)</option>
              <option value="60 mins">60 mins (Full Round)</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Globe className="w-4 h-4 mr-2 text-cyan-500" />
              Voice Language
            </label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none transition-all"
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
          className="flex items-center gap-2 bg-now-primary hover:bg-now-accent text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-now-primary/25"
        >
          Continue to Tech Check
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
