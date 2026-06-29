import { motion } from "framer-motion";
import { Moon, BookOpen, Bookmark, Share2, Copy, ArrowUp, MousePointer2 } from "lucide-react";

export function FeaturesBento() {
  const features = [
    { title: "Dark/Light Mode", desc: "Eye-friendly themes for coding sessions", icon: <Moon className="w-5 h-5" />, colSpan: "md:col-span-1" },
    { title: "Reading Progress", desc: "Track how far you've read", icon: <BookOpen className="w-5 h-5" />, colSpan: "md:col-span-2" },
    { title: "Bookmark Resources", desc: "Save notes for later", icon: <Bookmark className="w-5 h-5" />, colSpan: "md:col-span-1" },
    { title: "Share Instantly", desc: "Share roadmaps and questions", icon: <Share2 className="w-5 h-5" />, colSpan: "md:col-span-1" },
    { title: "Copy Code Snippets", desc: "One-click copy for scripts", icon: <Copy className="w-5 h-5" />, colSpan: "md:col-span-1" },
    { title: "Back-to-top Button", desc: "Quick navigation on long pages", icon: <ArrowUp className="w-5 h-5" />, colSpan: "md:col-span-2" },
  ];

  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Features</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need for a seamless, distraction-free learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${feature.colSpan} bg-[#0B1120] border border-white/10 rounded-2xl p-6 group hover:bg-[#111827] transition-all hover:border-white/20`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 mb-4 group-hover:text-emerald-400 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
