import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";

export function PremiumHero() {
  return (
    <AuroraBackground className="pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden h-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full z-10 flex flex-col xl:flex-row items-center justify-between gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-8 max-w-3xl relative z-20 text-center xl:text-left pt-10 xl:pt-0"
        >
          <div className="space-y-6 flex flex-col items-center xl:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              <div className="px-4 py-1.5 rounded-full bg-[#111827]/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-now-accent text-sm font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(20,184,166,0.15)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-now-accent animate-pulse"></span>
                Updated for 2025–2026
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Master ServiceNow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Real Interview Questions</span> & Hands-on Practice
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-medium"
            >
              Join thousands of learners. Fast-track your career with structured roadmaps, 250+ real-world interview questions, and 100+ practice labs.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start"
          >
            <Link 
              to="/learn"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/interview-prep"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111827]/80 backdrop-blur-md text-white font-bold rounded-xl border border-[rgba(255,255,255,0.1)] transition-all hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
            >
              <PlayCircle className="w-5 h-5 text-purple-400" />
              Explore Interview Questions
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center xl:justify-start gap-8 pt-6 text-sm text-[#94A3B8] font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-now-accent" />
              <span>250+ Interview Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-now-accent" />
              <span>100+ Practice Labs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Custom Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
          className="flex-1 w-full max-w-[600px] xl:max-w-none relative z-20"
        >
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#0B1120]/80 backdrop-blur-xl shadow-2xl overflow-hidden transform-gpu hover:rotate-0 transition-transform duration-700" style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}>
            
            {/* Mockup Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[#020617]/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs font-semibold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">nowscripts.com/dashboard</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/20"></div>
            </div>

            {/* Mockup Body */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {/* CSA Progress */}
              <div className="col-span-2 sm:col-span-1 bg-[#111827] rounded-xl p-5 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
                <h3 className="text-sm font-bold text-slate-300 mb-1">CSA Progress</h3>
                <p className="text-3xl font-black text-white mb-4">85%</p>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></motion.div>
                </div>
              </div>

              {/* CAD Progress */}
              <div className="col-span-2 sm:col-span-1 bg-[#111827] rounded-xl p-5 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                <h3 className="text-sm font-bold text-slate-300 mb-1">CAD Progress</h3>
                <p className="text-3xl font-black text-white mb-4">42%</p>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></motion.div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="col-span-2 grid grid-cols-3 gap-4 mt-2">
                <div className="bg-[#111827] rounded-xl p-4 border border-white/5 text-center flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Interview Q's</span>
                  <span className="text-xl font-bold text-emerald-400">253+</span>
                </div>
                <div className="bg-[#111827] rounded-xl p-4 border border-white/5 text-center flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Practice Labs</span>
                  <span className="text-xl font-bold text-blue-400">100+</span>
                </div>
                <div className="bg-[#111827] rounded-xl p-4 border border-white/5 text-center flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Mock Tests</span>
                  <span className="text-xl font-bold text-purple-400">12</span>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="col-span-2 bg-[#111827] rounded-xl p-5 border border-white/5 mt-2">
                <h3 className="text-sm font-bold text-slate-300 mb-4 flex justify-between">
                  <span>Learning Activity</span>
                  <span className="text-emerald-400 text-xs bg-emerald-400/10 px-2 py-0.5 rounded">+15% this week</span>
                </h3>
                <div className="flex items-end gap-2 h-24 pt-2">
                  {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 1 + (i * 0.1) }}
                      className="flex-1 bg-gradient-to-t from-blue-600/50 to-purple-500 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-2xl -z-10 rounded-3xl animate-pulse"></div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
