import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CircleDot } from "lucide-react";

export function InteractiveRoadmap() {
  const steps = [
    { title: "CSA", desc: "Certified System Administrator", color: "text-emerald-400", bg: "bg-emerald-400/20" },
    { title: "CAD", desc: "Certified Application Developer", color: "text-blue-400", bg: "bg-blue-400/20" },
    { title: "Developer", desc: "Advanced Scripting & Integrations", color: "text-purple-400", bg: "bg-purple-400/20" },
    { title: "Certified Professional", desc: "Master Architect", color: "text-amber-400", bg: "bg-amber-400/20" },
  ];

  return (
    <section className="py-24 bg-[#0B1120] relative border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Mastery</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A clear, step-by-step roadmap to become a highly paid ServiceNow expert.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-20">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.2) }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-[#0B1120]`}>
                  <CircleDot className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 max-w-[200px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <Link to="/roadmaps" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
            Explore Detailed Roadmaps <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
