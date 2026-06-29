import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Clock, Star, TrendingUp, ArrowRight } from "lucide-react";

export function TrendingResources() {
  const resources = [
    { title: "Top 50 CSA Interview Questions", tag: "Most Viewed", icon: <Flame className="w-4 h-4 text-orange-500" />, color: "border-orange-500/30 bg-orange-500/10 text-orange-400", link: "/interview-prep" },
    { title: "ServiceNow GlideRecord Best Practices", tag: "Recently Updated", icon: <Clock className="w-4 h-4 text-blue-500" />, color: "border-blue-500/30 bg-blue-500/10 text-blue-400", link: "/learn" },
    { title: "Mastering Flow Designer 2025", tag: "New", icon: <Star className="w-4 h-4 text-yellow-500" />, color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400", link: "/learn" },
    { title: "Client Scripts vs Business Rules", tag: "Popular", icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400", link: "/interview-prep" },
  ];

  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Resources</span></h2>
            <p className="text-slate-400 text-lg max-w-xl">
              See what other developers are reading, practicing, and preparing with right now.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link to={res.link} className="flex items-center justify-between p-6 bg-[#0B1120] border border-white/10 rounded-2xl group hover:border-white/20 hover:bg-[#111827] transition-all">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${res.color}`}>
                    {res.icon} {res.tag}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{res.title}</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
