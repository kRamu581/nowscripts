import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsV2() {
  const testimonials = [
    {
      name: "Alex",
      role: "ServiceNow Developer",
      company: "Enterprise Inc",
      initials: "AL",
      color: "bg-blue-100 text-blue-700",
      text: "[EXAMPLE FORMAT ONLY] NowScripts helped me understand ServiceNow before I even graduated. The projects I built gave me a massive advantage."
    },
    {
      name: "Sarah",
      role: "System Administrator",
      company: "Tech Corp",
      initials: "SA",
      color: "bg-emerald-100 text-emerald-700",
      text: "[EXAMPLE FORMAT ONLY] The CAD roadmap on NowScripts gave me the exact scripting knowledge I needed to transition into a full-time ServiceNow Developer."
    },
    {
      name: "Michael",
      role: "Implementation Specialist",
      company: "Consulting LLC",
      initials: "MI",
      color: "bg-purple-100 text-purple-700",
      text: "[EXAMPLE FORMAT ONLY] The interview prep section is gold. I faced the exact same GlideRecord scenario questions in my interview."
    },
    {
      name: "David",
      role: "Technical Architect",
      company: "Global Solutions",
      initials: "DA",
      color: "bg-now-primary/20 text-now-primary",
      text: "[EXAMPLE FORMAT ONLY] Even as an experienced developer, I use NowScripts to review advanced integrations and Service Portal widget design."
    },
    {
      name: "Emily",
      role: "ITSM Consultant",
      company: "Advisory Partners",
      initials: "EM",
      color: "bg-pink-100 text-pink-700",
      text: "[EXAMPLE FORMAT ONLY] Highly recommend the practice labs. Setting up a dev instance and following the structured tasks was a game-changer."
    }
  ];

  // Duplicate for infinite marquee effect
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white relative z-10 border-t border-gray-100 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">Professionals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-6"
          >
            Join developers from top enterprise companies advancing their careers on NowScripts.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="inline-block px-4 py-2 bg-amber-50 text-amber-600 text-sm font-bold rounded-full border border-amber-100 shadow-sm"
          >
            Testimonials Coming Soon — Previewing Layout
          </motion.div>
        </div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative flex overflow-x-hidden w-full group py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex flex-nowrap gap-6 py-4 px-3 w-max"
        >
          {marqueeItems.map((test, idx) => (
            <div 
              key={idx}
              className="w-[350px] md:w-[420px] flex-shrink-0 bg-white border border-gray-100 rounded-3xl p-8 relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-50 fill-gray-50" />
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg relative z-10 min-h-[120px]">
                "{test.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6 relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${test.color} shadow-sm`}>
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{test.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-1">
                    <span className="text-now-primary font-bold">{test.role}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-semibold">{test.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
