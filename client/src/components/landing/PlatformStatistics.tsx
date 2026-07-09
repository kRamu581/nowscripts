import { motion, useInView, animate } from "framer-motion";
import { BookOpen, Code2, Route, FileText, TrendingUp, PlayCircle } from "lucide-react";
import { useEffect, useRef } from "react";

function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, to, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export function PlatformStatistics() {
  const stats = [
    { label: "Interview Questions", value: 253, suffix: "+", icon: <FileText className="w-5 h-5 text-now-primary" />, trend: "+12" },
    { label: "Practice Labs", value: 100, suffix: "+", icon: <Code2 className="w-5 h-5 text-gray-700" />, trend: "+5" },
    { label: "Study Notes", value: 50, suffix: "+", icon: <BookOpen className="w-5 h-5 text-gray-700" />, trend: "+2" },
    { label: "Learning Roadmaps", value: 15, suffix: "+", icon: <Route className="w-5 h-5 text-gray-700" />, trend: "Updated" },
  ];

  return (
    <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Stats and Intro */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center xl:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Everything you need to succeed</h2>
              <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto xl:mx-0">
                A comprehensive ecosystem of resources designed to take you from beginner to Certified ServiceNow Professional. Track your progress, resume where you left off, and see your growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col group shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-now-primary/5 transition-colors">
                      {stat.icon}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded">
                      {stat.trend.includes('+') && <TrendingUp className="w-3 h-3" />}
                      {stat.trend}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    <CountUp to={stat.value as number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-semibold text-gray-500">{stat.label}</div>
                  
                  {/* Sparkline Mockup */}
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-end gap-1 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex-1 bg-gray-200 rounded-t-sm" style={{ height: `${30 + Math.random() * 70}%` }}></div>
                    ))}
                    <div className="flex-1 bg-now-primary rounded-t-sm" style={{ height: '100%' }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="w-full relative z-20 mx-auto max-w-[600px] xl:max-w-none"
          >
            <div className="relative rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-modal overflow-hidden transform-gpu hover:rotate-0 transition-all duration-700 hover:shadow-2xl" style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}>
              
              {/* Mockup Header - Browser Chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 backdrop-blur">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  nowscripts.com/dashboard
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-bold">NS</span>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-6 grid grid-cols-2 gap-4 bg-gray-50/30">
                {/* CSA Progress */}
                <div className="col-span-2 sm:col-span-1 bg-white rounded-xl p-5 border border-gray-100 shadow-card hover:shadow-hover transition-shadow relative overflow-hidden group">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">CSA Progress</h3>
                  <p className="text-3xl font-black text-gray-900 mb-4">85%</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} className="h-full bg-now-primary rounded-full"></motion.div>
                  </div>
                </div>

                {/* CAD Progress */}
                <div className="col-span-2 sm:col-span-1 bg-white rounded-xl p-5 border border-gray-100 shadow-card hover:shadow-hover transition-shadow relative overflow-hidden group">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">CAD Progress</h3>
                  <p className="text-3xl font-black text-gray-900 mb-4">42%</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "42%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} className="h-full bg-gray-900 rounded-full"></motion.div>
                  </div>
                </div>

                {/* Study Activity Chart */}
                <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-card mt-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-gray-600">Weekly Activity</h3>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+12%</span>
                  </div>
                  <div className="flex items-end justify-between h-24 gap-2">
                    {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                      <div key={i} className="w-full relative group flex flex-col justify-end h-full">
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 1 + (i * 0.1), ease: "easeOut" }}
                          className={`w-full rounded-t-sm ${i === 5 ? 'bg-now-primary' : 'bg-gray-200 group-hover:bg-gray-300'} transition-colors`}
                        ></motion.div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                {/* Practice Alert */}
                <div className="col-span-2 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mt-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <PlayCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">Resume Practice</h4>
                    <p className="text-xs text-blue-700 font-medium mt-1">Client Scripts vs UI Policies - Lab #42</p>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-now-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
