import { motion } from "framer-motion";
import { BookOpen, Code2, Route, FileText, CalendarCheck } from "lucide-react";

export function PlatformStatistics() {
  const stats = [
    { label: "Real Interview Questions", value: "253+", icon: <FileText className="w-6 h-6 text-blue-400" /> },
    { label: "Hands-on Labs", value: "100+", icon: <Code2 className="w-6 h-6 text-purple-400" /> },
    { label: "Study Notes", value: "50+", icon: <BookOpen className="w-6 h-6 text-emerald-400" /> },
    { label: "Learning Roadmaps", value: "15+", icon: <Route className="w-6 h-6 text-pink-400" /> },
    { label: "Updated Content", value: "2025–2026", icon: <CalendarCheck className="w-6 h-6 text-yellow-400" /> },
  ];

  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">succeed</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive ecosystem of resources designed to take you from beginner to Certified ServiceNow Professional.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center group hover:bg-[#111827] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.2)]"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
    </section>
  );
}
