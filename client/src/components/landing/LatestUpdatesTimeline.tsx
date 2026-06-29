import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function LatestUpdatesTimeline() {
  const updates = [
    { date: "June 2026", title: "253 Interview Questions Added", desc: "Massive expansion to our interview prep repository covering CSA, CAD, and ITSM." },
    { date: "May 2026", title: "CSA Roadmap Updated", desc: "Aligned with the latest Vancouver & Washington DC releases." },
    { date: "April 2026", title: "CAD Practice Questions", desc: "Added 50 new scripting scenario-based questions." },
  ];

  return (
    <section className="py-24 bg-[#0B1120] relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Updates</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We continuously improve the platform so you always have the latest ServiceNow knowledge.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {updates.map((update, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0B1120] bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111827] p-6 rounded-2xl border border-white/5 shadow-xl transition-all hover:-translate-y-1 hover:border-blue-500/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">{update.title}</h3>
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">{update.date}</span>
                </div>
                <p className="text-sm text-slate-400">{update.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
