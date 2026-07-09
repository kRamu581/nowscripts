import { motion, AnimatePresence } from "framer-motion";
import { Moon, BookOpen, Bookmark, Share2, Copy, ArrowUp, Code2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function FeaturesBento() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { title: "Dark & Light Mode", desc: "Eye-friendly themes for long coding sessions and late-night studying.", icon: <Moon className="w-5 h-5" />, color: "bg-indigo-500" },
    { title: "Reading Progress", desc: "Track how far you've read in long documentation and roadmaps.", icon: <BookOpen className="w-5 h-5" />, color: "bg-emerald-500" },
    { title: "Bookmark Resources", desc: "Save important notes, scripts, and labs for quick access later.", icon: <Bookmark className="w-5 h-5" />, color: "bg-amber-500" },
    { title: "One-Click Copy", desc: "Instantly copy ServiceNow scripts and code snippets to your clipboard.", icon: <Copy className="w-5 h-5" />, color: "bg-blue-500" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-now-primary/5 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Platform Features</h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Everything you need for a seamless, distraction-free learning experience tailored for ServiceNow professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Interactive Feature List */}
          <div className="flex flex-col gap-4">
            {features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`group p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${isActive ? 'bg-white border-now-primary/20 shadow-hover shadow-now-primary/5' : 'bg-transparent border-transparent hover:bg-gray-50'}`}
                >
                  <div className="flex gap-6 items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-now-primary text-white shadow-md' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-now-primary' : 'text-gray-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`font-medium leading-relaxed transition-colors ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl bg-gray-50 border border-gray-200 p-4 md:p-8 overflow-hidden shadow-inner group perspective-1000">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: -5 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full rounded-2xl shadow-modal overflow-hidden bg-white flex flex-col border border-gray-100"
              >
                {/* Mockup Top Bar */}
                <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/80 backdrop-blur shrink-0">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  
                  {/* Dynamic Top Bar Content based on feature */}
                  <div className="ml-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <Code2 className="w-4 h-4" />
                    scripts/{activeFeature === 0 ? 'theme.css' : activeFeature === 1 ? 'progress.js' : activeFeature === 2 ? 'bookmarks.json' : 'snippet.js'}
                  </div>
                </div>

                {/* Mockup Body Content Dynamic */}
                <div className="flex-1 p-6 relative overflow-hidden bg-white">
                  {/* Feature 0: Dark Mode Preview */}
                  {activeFeature === 0 && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 h-full bg-white p-6 flex flex-col gap-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Light Mode</div>
                        <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
                        <div className="w-full h-32 bg-gray-50 rounded-xl border border-gray-100 mt-4"></div>
                      </div>
                      <div className="w-1/2 h-full bg-gray-900 p-6 flex flex-col gap-4 border-l border-gray-800">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dark Mode</div>
                        <div className="w-3/4 h-4 bg-gray-800 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-800 rounded"></div>
                        <div className="w-full h-32 bg-gray-800 rounded-xl border border-gray-700 mt-4"></div>
                      </div>
                    </div>
                  )}

                  {/* Feature 1: Progress */}
                  {activeFeature === 1 && (
                    <div className="h-full flex flex-col gap-6">
                      <div className="w-1/3 h-6 bg-gray-200 rounded-lg"></div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-500"></motion.div>
                      </div>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 items-start opacity-60">
                          <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${i < 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                            {i < 2 ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
                          </div>
                          <div className="flex-1 flex flex-col gap-2 pt-1">
                            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feature 2: Bookmarks */}
                  {activeFeature === 2 && (
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex flex-col gap-3 relative">
                          <Bookmark className="absolute top-4 right-4 w-5 h-5 text-amber-500 fill-amber-500" />
                          <div className="w-1/2 h-4 bg-amber-200/50 rounded"></div>
                          <div className="w-3/4 h-3 bg-amber-100/50 rounded"></div>
                          <div className="mt-auto w-1/4 h-3 bg-amber-200/50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feature 3: Copy Code */}
                  {activeFeature === 3 && (
                    <div className="h-full bg-slate-900 rounded-xl p-6 font-mono text-sm relative group/code overflow-hidden">
                      <div className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-2 text-white/90 cursor-pointer backdrop-blur transition-colors">
                        <Copy className="w-4 h-4" /> Copy
                      </div>
                      <div className="text-blue-400">var <span className="text-white">gr</span> = new <span className="text-amber-300">GlideRecord</span>(<span className="text-green-300">'incident'</span>);</div>
                      <div className="text-white mt-2">gr.<span className="text-blue-300">addQuery</span>(<span className="text-green-300">'active'</span>, <span className="text-orange-300">true</span>);</div>
                      <div className="text-white mt-2">gr.<span className="text-blue-300">query</span>();</div>
                      <div className="text-white mt-4"><span className="text-purple-400">while</span> (gr.<span className="text-blue-300">next</span>()) {'{'}</div>
                      <div className="text-gray-400 mt-2 ml-4">// Process record</div>
                      <div className="text-white mt-2 ml-4">gs.<span className="text-blue-300">info</span>(gr.<span className="text-white">number</span>);</div>
                      <div className="text-white mt-2">{'}'}</div>
                      
                      {/* Animated Copy Tooltip */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                        transition={{ duration: 2, times: [0, 0.1, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
                        className="absolute top-16 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg"
                      >
                        Copied!
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
