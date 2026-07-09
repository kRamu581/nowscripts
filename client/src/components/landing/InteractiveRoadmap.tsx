import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Database, Layers, Shield } from "lucide-react";
import { useRef } from "react";

export function InteractiveRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const steps = [
    { title: "ServiceNow Admin (CSA)", desc: "The Foundation", icon: <Shield className="w-5 h-5" /> },
    { title: "Application Developer (CAD)", desc: "Scripting & Custom Apps", icon: <Code2 className="w-5 h-5" /> },
    { title: "Implementation Specialist", desc: "ITSM / CSM / HRSD", icon: <Layers className="w-5 h-5" /> },
    { title: "Technical Architect", desc: "Enterprise Architecture", icon: <Database className="w-5 h-5" /> },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Your Path to <span className="text-now-primary">Mastery</span></h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Follow our structured, industry-aligned roadmaps to navigate your career from beginner to expert.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-1 bg-gray-200 rounded-full z-0">
            <motion.div 
              className="h-full bg-now-primary rounded-full origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          
          {/* Mobile Connecting Line */}
          <div className="block md:hidden absolute left-7 top-8 bottom-8 w-1 bg-gray-200 rounded-full z-0">
             <motion.div 
              className="w-full bg-now-primary rounded-full origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex md:flex-col items-center gap-6 md:gap-0 relative group cursor-pointer pl-1 md:pl-0">
                {/* Node */}
                <div className="relative mb-0 md:mb-6 shrink-0 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                  >
                    {/* Outer pulse on hover */}
                    <div className={`absolute -inset-2 bg-now-primary/20 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300`}></div>
                    
                    {/* Node icon */}
                    <div className={`w-14 h-14 rounded-full bg-white text-gray-700 group-hover:text-now-primary flex items-center justify-center shadow-md border border-gray-100 group-hover:border-now-primary transform group-hover:scale-110 transition-all duration-300 relative z-10`}>
                      {step.icon}
                    </div>
                  </motion.div>
                </div>
                
                {/* Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                  className="bg-white border border-gray-100 rounded-xl p-5 text-left md:text-center w-full shadow-card group-hover:shadow-hover group-hover:border-now-primary/30 transition-all duration-300 relative"
                >
                  <div className="text-xs font-bold text-now-primary uppercase tracking-widest mb-1.5">Step {idx + 1}</div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 relative z-10">
          <Link 
            to="/roadmaps" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Explore Detailed Roadmaps <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
