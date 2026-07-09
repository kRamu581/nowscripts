import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code2, ShieldCheck, MessageSquare, Briefcase, Trophy } from "lucide-react";

export function LearningJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      title: "Foundations (CSA)",
      desc: "Master the ServiceNow platform basics and pass your first certification.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500",
      lightBg: "bg-blue-50"
    },
    {
      title: "Development (CAD)",
      desc: "Learn scripting, APIs, and scoped application development.",
      icon: <Code2 className="w-6 h-6" />,
      color: "bg-purple-500",
      lightBg: "bg-purple-50"
    },
    {
      title: "Real Projects",
      desc: "Build 5+ enterprise applications for your portfolio.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-now-primary",
      lightBg: "bg-orange-50"
    },
    {
      title: "Interview Prep",
      desc: "Practice with 250+ real questions from top companies.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50"
    },
    {
      title: "Mock Interviews",
      desc: "Refine your communication and technical explanation skills.",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-amber-500",
      lightBg: "bg-amber-50"
    },
    {
      title: "Placement",
      desc: "Land your dream role as a ServiceNow Developer.",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-indigo-500",
      lightBg: "bg-indigo-50"
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-gray-900 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            The Proven Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">Success</span>
          </h2>
          <p className="text-lg text-gray-400">
            A clear, step-by-step journey from absolute beginner to employed professional. No guessing what to learn next.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line Background */}
          <div className="absolute top-[45px] left-0 w-full h-1 bg-gray-800 rounded-full hidden lg:block" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-[45px] left-0 h-1 bg-gradient-to-r from-now-primary via-purple-500 to-indigo-500 rounded-full hidden lg:block origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group"
              >
                {/* Node Icon */}
                <div className={`w-24 h-24 flex-shrink-0 lg:w-full lg:h-auto flex lg:flex-col items-center lg:mb-6 mr-6 lg:mr-0`}>
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-3xl ${step.lightBg} border-4 border-gray-900 flex items-center justify-center ${step.color} text-white shadow-xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 relative z-10`}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
