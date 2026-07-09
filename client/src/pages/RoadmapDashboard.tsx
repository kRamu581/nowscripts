import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { mockRoadmaps } from "../mockRoadmapData";
import { useState } from "react";

const getIcon = (iconName: string) => {
 // @ts-ignore
 const Icon = LucideIcons[iconName];
 return Icon ? <Icon className="w-6 h-6" /> : <LucideIcons.BookOpen className="w-6 h-6" />;
};

const RoadmapNode = ({ roadmap, index }: { roadmap: any, index: number }) => {
 const progress = index === 0 ? 100 : index === 1 ? 50 : 0;
 
 return (
 <motion.div 
 whileHover={{ y: -4, scale: 1.01 }}
 className="group relative w-full bg-white border border-gray-200 hover:border-gray-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

 <div className="p-8 relative z-10">
 <div className="flex justify-between items-start mb-6">
 <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${roadmap.color} text-white shadow-md`}>
 {getIcon(roadmap.iconName || "BookOpen")}
 </div>
 {progress === 100 && (
 <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
 <LucideIcons.CheckCircle2 className="w-3.5 h-3.5" />
 Completed
 </div>
 )}
 {progress > 0 && progress < 100 && (
 <div className="flex items-center gap-1.5 bg-now-primary/10 text-now-primary px-3 py-1.5 rounded-full text-xs font-bold border border-now-primary/20">
 <LucideIcons.ArrowRightCircle className="w-3.5 h-3.5" />
 In Progress
 </div>
 )}
 {progress === 0 && (
 <div className="flex items-center gap-1.5 bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200">
 <LucideIcons.Lock className="w-3.5 h-3.5" />
 Locked
 </div>
 )}
 </div>

 <h3 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-now-primary transition-colors">{roadmap.title}</h3>
 <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{roadmap.description}</p>
 
 {/* Career Outcome */}
 <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 group-hover:bg-white group-hover:border-gray-200 transition-colors">
 <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Career Outcome</p>
 <div className="flex justify-between items-center">
 <span className="text-sm font-bold text-gray-800">{roadmap.careerOutcome}</span>
 <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-lg">{roadmap.salaryRange}</span>
 </div>
 </div>

 <div className="flex gap-6 text-sm text-gray-600 mb-8 font-medium">
 <span className="flex items-center gap-2">
 <LucideIcons.Clock className="w-4 h-4 text-gray-400" />
 {roadmap.estimatedDuration}
 </span>
 <span className="flex items-center gap-2">
 <LucideIcons.Book className="w-4 h-4 text-gray-400" />
 {roadmap.modules.length} Modules
 </span>
 </div>

 <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
 <div className="w-1/2">
 <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5 overflow-hidden">
 <div 
 className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? "bg-emerald-500" : "bg-now-primary"}`} 
 style={{ width: `${progress}%` }}
 />
 </div>
 <span className="text-xs text-gray-500 font-semibold">{progress}% Completed</span>
 </div>
 
 <Link to={roadmap.slug === "certification-path" ? "/certifications" : `/roadmaps/${roadmap.slug}`} className="text-sm font-bold text-now-primary bg-now-primary/5 hover:bg-now-primary/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
 Explore <LucideIcons.ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </motion.div>
 );
};

export default function RoadmapDashboard() {
 const [filter, setFilter] = useState("all");

 return (
 <div className="bg-gray-50 min-h-screen font-sans selection:bg-now-primary/20 selection:text-now-primary pb-32 pt-24">
 {/* Hero Section */}
 <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-20 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 <span className="inline-block py-1.5 px-4 rounded-full bg-now-primary/10 text-now-primary font-bold text-sm tracking-wide mb-6 border border-now-primary/20">
 Interactive Learning Paths
 </span>
 <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
 Master ServiceNow,<br />Step by Step.
 </h1>
 <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
 Follow our structured, role-based roadmaps designed to take you from beginner to certified expert with zero guesswork.
 </p>
 
 <div className="flex justify-center gap-3 flex-wrap">
 {["all", "beginner", "advanced", "architect"].map((f) => (
 <button
 key={f}
 onClick={() => setFilter(f)}
 className={`px-5 py-2.5 rounded-full text-sm font-bold capitalize transition-all ${
 filter === f 
 ? "bg-gray-900 text-white shadow-md" 
 : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
 }`}
 >
 {f} Roadmaps
 </button>
 ))}
 </div>
 </motion.div>
 </div>

 {/* Grid */}
 <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {mockRoadmaps.map((roadmap, index) => (
 <RoadmapNode key={index} roadmap={roadmap} index={index} />
 ))}
 </div>
 </div>
 </div>
 );
}
