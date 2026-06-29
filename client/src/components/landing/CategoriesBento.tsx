import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Globe, Heart, Shield, Settings, Zap, BookOpen, Layers } from "lucide-react";

export function CategoriesBento() {
  const categories = [
    { name: "CSA", desc: "System Administrator", icon: <Shield />, colSpan: "col-span-2 md:col-span-1", color: "from-emerald-500 to-teal-500", link: "/learn" },
    { name: "CAD", desc: "Application Developer", icon: <Code />, colSpan: "col-span-2 md:col-span-1", color: "from-blue-500 to-indigo-500", link: "/learn" },
    { name: "Scripting", desc: "Server & Client APIs", icon: <Database />, colSpan: "col-span-2 md:col-span-2", color: "from-purple-500 to-pink-500", link: "/learn" },
    
    { name: "Flow Designer", desc: "Process Automation", icon: <Zap />, colSpan: "col-span-2 md:col-span-2", color: "from-orange-500 to-red-500", link: "/learn" },
    { name: "Integration", desc: "REST & SOAP", icon: <Globe />, colSpan: "col-span-2 md:col-span-1", color: "from-cyan-500 to-blue-500", link: "/learn" },
    { name: "ATF", desc: "Test Framework", icon: <Settings />, colSpan: "col-span-2 md:col-span-1", color: "from-slate-500 to-slate-700", link: "/learn" },
    
    { name: "CSM", desc: "Customer Service", icon: <Heart />, colSpan: "col-span-2 md:col-span-1", color: "from-rose-500 to-pink-500", link: "/learn" },
    { name: "ITSM", desc: "IT Service Mgmt", icon: <Layers />, colSpan: "col-span-2 md:col-span-1", color: "from-blue-600 to-indigo-600", link: "/learn" },
    { name: "HRSD", desc: "HR Delivery", icon: <BookOpen />, colSpan: "col-span-2 md:col-span-2", color: "from-fuchsia-500 to-purple-500", link: "/learn" },
  ];

  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Categories</span></h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Dive deep into specific ServiceNow modules and master the platform piece by piece.
            </p>
          </div>
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-colors border border-white/10">
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
              <Link to={cat.link} className="block w-full h-full bg-[#0B1120] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-white/20">
                {/* Background Gradient Blob */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${cat.color} rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{cat.name}</h3>
                    <p className="text-slate-400 text-sm font-medium">{cat.desc}</p>
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
