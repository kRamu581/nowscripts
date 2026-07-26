import React from "react";
import { Download, CheckCircle, AlertTriangle, ArrowRight, Share2, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface InterviewReportProps {
  results: any;
  config: any;
}

export function InterviewReport({ results, config }: InterviewReportProps) {
  
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6 border border-green-500/30">
          <Award className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">Interview Complete!</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Here is the AI evaluation for your {config.targetRole} ({config.module}) interview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Main Scorecard */}
        <div className="lg:col-span-1 bg-[#1A1C23] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
          
          <h2 className="text-gray-400 font-bold mb-6 text-lg uppercase tracking-wider">Overall Score</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-gray-800" strokeWidth="12" fill="none" />
              <circle 
                cx="96" cy="96" r="88" 
                className="stroke-green-500 transition-all duration-1000 ease-out" 
                strokeWidth="12" fill="none" 
                strokeDasharray="553" 
                strokeDashoffset={553 - (553 * results.score) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl font-bold text-white">{results.score}</span>
              <span className="text-gray-400 text-sm">/ 100</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <MetricRow label="Technical Knowledge" value={results.technical} />
            <MetricRow label="Scenario Handling" value={results.scenario} />
            <MetricRow label="Communication" value={results.communication} />
          </div>
        </div>

        {/* Feedback Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1C23] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="flex items-center text-lg font-bold text-green-400 mb-4 border-b border-gray-800 pb-3">
                <CheckCircle className="w-5 h-5 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-3">
                <ListItem>Excellent debugging process</ListItem>
                <ListItem>Strong GlideRecord knowledge</ListItem>
                <ListItem>Good understanding of REST APIs</ListItem>
              </ul>
            </div>

            <div className="bg-[#1A1C23] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="flex items-center text-lg font-bold text-yellow-500 mb-4 border-b border-gray-800 pb-3">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Areas to Improve
              </h3>
              <ul className="space-y-3">
                <ListItem warning>Missed ACL evaluation steps</ListItem>
                <ListItem warning>Forgot to mention Background Scripts</ListItem>
                <ListItem warning>Didn't specify async vs sync rules</ListItem>
              </ul>
            </div>
          </div>

          {/* Transcript Summary */}
          <div className="bg-[#1A1C23] border border-gray-800 rounded-2xl p-6 shadow-xl">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">Interview Summary</h3>
             <p className="text-gray-300 leading-relaxed text-sm mb-4">
               The candidate demonstrated a solid grasp of core ServiceNow concepts, accurately identifying System Logs and Business Rules as the primary investigation points for the REST API duplicate incident scenario. Communication was clear and concise.
             </p>
             <div className="bg-gray-900/50 rounded-lg p-4 text-xs font-mono text-gray-400">
               <p className="text-blue-400 mb-1">AI: "A customer reports duplicate incidents being created through a REST API integration..."</p>
               <p className="text-white">You: "First, I would check the System Logs and the API payload..."</p>
             </div>
          </div>

        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 border-t border-gray-800 pt-8">
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          <Download className="w-5 h-5" />
          Download PDF Report
        </button>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          <Share2 className="w-5 h-5" />
          Share Results
        </button>
        <Link to="/learn" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20">
          Review Topics
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}

function MetricRow({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

function ListItem({ children, warning = false }: { children: React.ReactNode, warning?: boolean }) {
  return (
    <li className="flex items-start text-sm">
      <span className={`mr-2 mt-1 ${warning ? 'text-yellow-500' : 'text-green-500'}`}>•</span>
      <span className="text-gray-300">{children}</span>
    </li>
  )
}
