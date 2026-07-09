import { motion } from "framer-motion";
import { Code2, Bot, Map, MessageSquare, Users, BarChart3 } from "lucide-react";

export function WhyNowScripts() {
  const features = [
    {
      title: "Real Projects",
      description: "Build actual ServiceNow applications. Move beyond theory with hands-on labs and real-world scenarios.",
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "AI Mentor",
      description: "Get stuck? Our AI mentor provides instant, context-aware guidance on your scripts and configurations.",
      icon: <Bot className="w-8 h-8 text-now-primary" />,
      bg: "bg-orange-50",
    },
    {
      title: "Interactive Roadmaps",
      description: "Never wonder what to learn next. Follow structured, visual paths designed for every certification.",
      icon: <Map className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      title: "Interview Preparation",
      description: "Practice with 250+ real interview questions. Validate your answers and build confidence.",
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Community Learning",
      description: "Join thousands of developers. Share code, discuss solutions, and grow your professional network.",
      icon: <Users className="w-8 h-8 text-pink-500" />,
      bg: "bg-pink-50",
    },
    {
      title: "Progress Analytics",
      description: "Track your learning journey. Identify knowledge gaps and measure your readiness for exams.",
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Why Choose NowScripts
          </h2>
          <p className="text-lg text-gray-500">
            We've reimagined ServiceNow education. A complete ecosystem designed specifically to help you build, practice, and land your dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
