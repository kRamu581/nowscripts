import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Globe, Shield, Settings, Zap } from "lucide-react";

export function CategoriesBento() {
  const categories = [
    { name: "CSA", desc: "System Administrator", stat: "120+ Q's", difficulty: "Beginner", icon: <Shield className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-1", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", link: "/learn" },
    { name: "CAD", desc: "Application Developer", stat: "85+ Q's", difficulty: "Intermediate", icon: <Code className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-1", color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", link: "/learn" },
    { name: "Scripting", desc: "Server & Client APIs", stat: "45+ Labs", difficulty: "Advanced", icon: <Database className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-2", color: "from-purple-500 to-pink-500", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100", link: "/learn", isWide: true },
    { name: "Flow Designer", desc: "Process Automation", stat: "30+ Labs", difficulty: "Intermediate", icon: <Zap className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-2", color: "from-orange-500 to-red-500", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100", link: "/learn", isWide: true },
    { name: "Integration", desc: "REST & SOAP", stat: "50+ Q's", difficulty: "Advanced", icon: <Globe className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-1", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-100", link: "/learn" },
    { name: "ATF", desc: "Test Framework", stat: "20+ Labs", difficulty: "Intermediate", icon: <Settings className="w-6 h-6"/>, colSpan: "col-span-2 md:col-span-1", color: "from-slate-500 to-slate-700", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", link: "/learn" },
  ];

  return (
    <section className="py-24 bg-gray-50 relative border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Explore Categories</h2>
            <p className="text-gray-600 text-lg max-w-xl font-medium">
              Dive deep into specific ServiceNow modules and master the platform piece by piece.
            </p>
          </div>
          <Link to="/learn" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 px-6 py-3 rounded-xl transition-all border border-gray-200 shadow-sm hover:shadow-hover">
            View All Modules <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`${cat.colSpan} relative group`}
            >
              <Link to={cat.link} className="block w-full h-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-card hover:-translate-y-1 relative z-10">
                {/* Background Gradient Blob */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${cat.color} rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.color} text-white shadow-sm shrink-0`}>
                      {cat.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {cat.stat}
                      </div>
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${cat.bg} ${cat.text} ${cat.border} border uppercase tracking-wider`}>
                        {cat.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  {/* Fake UI Preview Thumbnail */}
                  <div className={`w-full ${cat.isWide ? 'h-24 mt-2' : 'h-16 mt-4'} rounded-lg ${cat.bg} border ${cat.border} p-3 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity flex flex-col gap-2 relative`}>
                     {cat.name === "CSA" && (
                       <div className="w-full h-full flex items-end gap-1">
                         <div className="w-1/4 h-[40%] bg-emerald-200/50 rounded-t"></div>
                         <div className="w-1/4 h-[70%] bg-emerald-300/50 rounded-t"></div>
                         <div className="w-1/4 h-[100%] bg-emerald-400/50 rounded-t"></div>
                         <div className="w-1/4 h-[60%] bg-emerald-300/50 rounded-t"></div>
                       </div>
                     )}
                     {cat.name === "CAD" && (
                       <div className="flex flex-col gap-1.5 w-full">
                          <div className="w-3/4 h-2 bg-blue-200/50 rounded"></div>
                          <div className="w-full h-2 bg-blue-200/50 rounded"></div>
                          <div className="w-5/6 h-2 bg-blue-300/50 rounded"></div>
                       </div>
                     )}
                     {cat.name === "Integration" && (
                       <div className="flex items-center justify-between h-full px-2">
                          <div className="w-6 h-6 rounded-full bg-cyan-200/50"></div>
                          <div className="flex-1 h-[2px] bg-cyan-200/50 mx-2"></div>
                          <div className="w-6 h-6 rounded bg-cyan-300/50"></div>
                       </div>
                     )}
                     {cat.name === "ATF" && (
                       <div className="flex flex-col gap-2 w-full h-full justify-center">
                          <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                             <div className="w-full h-2 bg-slate-200 rounded"></div>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                             <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                          </div>
                       </div>
                     )}
                     {cat.isWide && cat.name === "Scripting" && (
                        <>
                          <div className="w-1/3 h-3 bg-purple-200 rounded-full"></div>
                          <div className="w-full h-2 bg-purple-100 rounded-full mt-1"></div>
                          <div className="w-5/6 h-2 bg-purple-100 rounded-full"></div>
                          <div className="flex gap-2 mt-auto">
                            <div className="w-8 h-8 rounded bg-purple-200/50"></div>
                            <div className="w-8 h-8 rounded bg-purple-200/50"></div>
                            <div className="w-8 h-8 rounded bg-purple-200/50"></div>
                          </div>
                        </>
                     )}
                     {cat.isWide && cat.name === "Flow Designer" && (
                       <div className="flex items-center justify-center h-full gap-2">
                         <div className="w-16 h-8 rounded border-2 border-orange-200 border-dashed bg-orange-100/50 flex items-center justify-center">
                           <div className="w-4 h-1 bg-orange-200 rounded-full"></div>
                         </div>
                         <ArrowRight className="w-4 h-4 text-orange-300" />
                         <div className="w-16 h-8 rounded border-2 border-orange-200 border-dashed bg-orange-100/50 flex items-center justify-center">
                           <div className="w-4 h-1 bg-orange-200 rounded-full"></div>
                         </div>
                         <ArrowRight className="w-4 h-4 text-orange-300" />
                         <div className="w-16 h-8 rounded border-2 border-orange-300 border-solid bg-orange-200 flex items-center justify-center">
                           <div className="w-4 h-1 bg-white rounded-full"></div>
                         </div>
                       </div>
                     )}
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-now-primary transition-colors">{cat.name}</h3>
                      <p className="text-gray-500 text-sm font-medium">{cat.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-now-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
