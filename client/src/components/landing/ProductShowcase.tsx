import { motion } from "framer-motion";

export function ProductShowcase() {
  return (
    <section className="py-24 bg-[#0A0F1C] overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-now-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
          >
            A Platform Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Stop switching between outdated tutorials and scattered docs. Get everything you need in one unified, enterprise-grade learning environment.
          </motion.p>
        </div>

        {/* Large Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-xl border border-gray-800 bg-[#0F172A] shadow-[0_0_100px_rgba(255,90,60,0.15)] overflow-hidden"
        >
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="mx-auto bg-[#0F172A] px-32 py-1 rounded-md text-[11px] text-gray-500 font-mono hidden md:block">
              app.nowscripts.com/dashboard
            </div>
          </div>

          {/* Browser Content - Image Mockup */}
          <div className="relative aspect-[16/9] w-full bg-black/20">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
              alt="Platform Interface" 
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            {/* Overlay features mapping if it was a real mockup, but we'll just show the high quality image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 border-t border-gray-800/50 pt-12">
          {[
            { title: "Interactive Dashboard", desc: "Track progress across all modules in real-time." },
            { title: "Progress Analytics", desc: "Visualize your strengths and areas to improve." },
            { title: "Interview Prep", desc: "Practice with actual questions asked by top firms." },
            { title: "Bookmarked Resources", desc: "Save key lessons and code snippets for later." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="text-center md:text-left"
            >
              <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
