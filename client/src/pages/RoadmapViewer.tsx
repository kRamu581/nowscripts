import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Play, X, Award, ChevronDown, Hammer, Mic, Flag } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { mockRoadmaps } from "../mockRoadmapData";
import { TrackItemType } from "../data/sharedModules";

const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  purple: "#a855f7",
  orange: "#f97316",
  cyan: "#06b6d4",
  pink: "#ec4899",
  indigo: "#6366f1",
  slate: "#64748b"
};

const getThemeClasses = (color: string) => {
  const map: any = {
    'from-blue-500': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hex: '#3b82f6' },
    'from-emerald-500': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hex: '#10b981' },
    'from-purple-500': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hex: '#a855f7' },
    'from-orange-500': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hex: '#f97316' },
    'from-cyan-500': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', hex: '#06b6d4' },
    'from-emerald-600': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hex: '#10b981' },
    'from-cyan-600': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', hex: '#06b6d4' },
    'from-blue-600': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hex: '#3b82f6' },
  };
  return map[color] || { bg: 'bg-now-primary/10', text: 'text-now-primary', border: 'border-now-primary/30', hex: '#3b82f6' };
};

export default function RoadmapViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const roadmap = mockRoadmaps.find(r => r.slug === slug) || mockRoadmaps[0];
  
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nowscripts_completed_lessons');
      if (stored) setCompletedLessons(JSON.parse(stored));
    } catch (e) {}
  }, []);

  if (!roadmap) {
    return <div className="text-gray-900 text-center mt-20 font-bold text-2xl">Roadmap not found.</div>;
  }

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-12 h-12 text-white" /> : <LucideIcons.BookOpen className="w-12 h-12 text-white" />;
  };

  const getItemIcon = (type: TrackItemType) => {
    switch (type) {
      case 'project': return <Hammer className="w-5 h-5 text-amber-500" />;
      case 'mock-interview': return <Mic className="w-5 h-5 text-blue-500" />;
      case 'milestone': return <Flag className="w-5 h-5 text-purple-500" />;
      default: return <LucideIcons.BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  const themeColorKey = roadmap.color.split(' ')[0]; // e.g. from-blue-500
  const theme = getThemeClasses(themeColorKey);
  const strokeColor = theme.hex;

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-now-primary/20 selection:text-now-primary pb-32 pt-24 md:pt-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-now-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
        <Link to="/roadmaps" className="inline-flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Roadmaps
        </Link>
        
        {/* Track Switcher */}
        <div className="flex overflow-x-auto gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-full w-fit">
          {mockRoadmaps.map(r => (
            <button
              key={r.slug}
              onClick={() => navigate(`/roadmaps/${r.slug}`)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                roadmap.slug === r.slug 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
        
        {/* Banner Section */}
        <div className={`w-full rounded-3xl bg-gradient-to-br ${roadmap.color} p-6 md:p-8 mb-8 relative overflow-hidden shadow-lg`}>
          <div className="absolute right-0 bottom-0 opacity-10 transform scale-110 pointer-events-none translate-x-1/4 translate-y-1/4">
            {getIcon(roadmap.iconName || "BookOpen")}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm inline-flex shadow-sm border border-white/20 text-white">
                  {getIcon(roadmap.iconName || "BookOpen")}
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">{roadmap.title}</h1>
              </div>
              <p className="text-base text-white/90 max-w-3xl mb-5 leading-relaxed">{roadmap.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold">
                <div className="bg-white/10 border border-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white flex items-center gap-1.5 shadow-sm">
                  <span className="text-white/70 font-medium">Modules:</span> {roadmap.modules?.length || 0}
                </div>
                <div className="bg-white/10 border border-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white flex items-center gap-1.5 shadow-sm">
                  <span className="text-white/70 font-medium">Duration:</span> {roadmap.estimatedDuration}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Objectives Box */}
        <div className="mb-16 bg-white border border-gray-200 p-6 md:p-8 rounded-3xl text-center shadow-sm max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center justify-center gap-2 text-gray-900">
            <LucideIcons.Target className={`w-5 h-5 ${theme.text}`} /> Learning Objectives
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{roadmap.learningObjectives}</p>
        </div>

        {/* Vertical Roadmap Steps */}
        <div className="relative max-w-5xl mx-auto mt-20">
          {/* Connecting Line */}
          <div className={`absolute top-0 bottom-0 left-6 md:left-12 w-1.5 rounded-full ${theme.bg}`} />
          <div className="absolute top-0 bottom-0 left-6 md:left-12 w-1.5 rounded-full bg-gradient-to-b from-now-primary via-purple-500 to-transparent" style={{ height: '30%' }} />

          <div className="space-y-16">
            {roadmap.modules?.map((mod: any, index: number) => {
              const isCompleted = mod.items && mod.items.length > 0 && mod.items.every((t: any) => completedLessons[t.id]);
              
              return (
                <motion.div 
                  key={mod.id} 
                  className="relative flex items-start gap-6 md:gap-10 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Node Circle */}
                  <div 
                    className={`relative z-10 flex-shrink-0 w-12 h-12 md:w-24 md:h-24 rounded-full border-[4px] md:border-[6px] flex items-center justify-center text-lg md:text-3xl font-black shadow-md bg-white transition-transform duration-300 group-hover:scale-110 cursor-pointer ${isCompleted ? 'border-emerald-500 text-emerald-500' : `${theme.border} ${theme.text}`}`}
                    onClick={() => setSelectedModule(mod)}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6 md:w-12 md:h-12" /> : index + 1}
                  </div>
                  
                  {/* Content Card */}
                  <div 
                    className="flex-1 bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all cursor-pointer group-hover:-translate-y-1"
                    onClick={() => setSelectedModule(mod)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-now-primary transition-colors">{mod.title}</h3>
                      <div className={`inline-flex items-center text-xs md:text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${theme.bg} ${theme.text}`}>
                        ⏱ {mod.estimatedTime}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{mod.description}</p>
                    
                    <div className="flex items-center gap-2 text-now-primary font-bold text-sm">
                      View Details <LucideIcons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certification Milestone */}
        {roadmap.certification && (
          <div className="relative flex justify-center mt-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-[2rem] p-10 md:p-14 text-center w-full shadow-lg relative z-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <Award className="w-20 h-20 text-amber-500 mx-auto mb-6 drop-shadow-md" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Milestone Reached</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">Complete this roadmap to unlock the <strong className="text-gray-900">{roadmap.certification}</strong> track and prove your expertise.</p>
              <Link to="/certifications">
                <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-xl transition-all rounded-full font-bold text-lg inline-flex items-center gap-2">
                  View Certification Details <LucideIcons.ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      {/* Module Details Modal */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModule(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${roadmap.color}`} />
              
              <button onClick={() => setSelectedModule(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-start gap-4 mb-6 pr-12 shrink-0">
                  <div className={`p-4 rounded-2xl ${theme.bg} ${theme.text} shrink-0`}>
                    <Play className="w-8 h-8" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">{selectedModule.title}</h2>
                    <span className={`inline-flex items-center text-sm font-bold px-3 py-1 rounded-full ${theme.bg} ${theme.text}`}>
                      {selectedModule.estimatedTime}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-8 shrink-0">{selectedModule.description}</p>
                
                <h4 className="font-bold text-gray-900 mb-4 shrink-0 uppercase text-sm tracking-wider">Module Contents</h4>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-8 space-y-3">
                  {selectedModule.items?.map((item: any, idx: number) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="mt-0.5">{getItemIcon(item.type)}</div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {item.title}
                          {item.type !== 'topic' && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                              {item.type.replace('-', ' ')}
                            </span>
                          )}
                        </div>
                        {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-auto">
                  <Link to={`/learn/${selectedModule.id}/${selectedModule.items?.[0]?.id || ''}`} className="flex-1">
                    <button className="w-full py-4 rounded-full font-bold text-white bg-gray-900 hover:bg-now-primary transition-colors text-center shadow-md">
                      Start Module
                    </button>
                  </Link>
                  <button 
                    className={`flex-1 py-4 rounded-full font-bold text-center transition-all border-2 ${
                      (selectedModule.items && selectedModule.items.length > 0 && selectedModule.items.every((t: any) => completedLessons[t.id]))
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200 cursor-not-allowed" 
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    {(selectedModule.items && selectedModule.items.length > 0 && selectedModule.items.every((t: any) => completedLessons[t.id])) ? "Completed" : "In Progress"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
