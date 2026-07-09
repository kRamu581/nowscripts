import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, FolderGit2, ShieldCheck } from "lucide-react";

export function PopularLearningPaths() {
  const paths = [
    {
      id: "csa",
      title: "Certified System Administrator",
      badge: "CSA",
      color: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      duration: "4 Weeks",
      projects: 12,
      lessons: 48,
    },
    {
      id: "cad",
      title: "Certified Application Developer",
      badge: "CAD",
      color: "from-now-primary to-orange-400",
      bgLight: "bg-orange-50",
      textColor: "text-now-primary",
      duration: "6 Weeks",
      projects: 15,
      lessons: 64,
    },
    {
      id: "itsm",
      title: "IT Service Management",
      badge: "ITSM",
      color: "from-purple-500 to-fuchsia-400",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
      duration: "3 Weeks",
      projects: 8,
      lessons: 32,
    },
    {
      id: "hrsd",
      title: "HR Service Delivery",
      badge: "HRSD",
      color: "from-emerald-500 to-teal-400",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
      duration: "3 Weeks",
      projects: 5,
      lessons: 24,
    },
    {
      id: "cmdb",
      title: "Configuration Management",
      badge: "CMDB",
      color: "from-indigo-500 to-blue-400",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
      duration: "2 Weeks",
      projects: 4,
      lessons: 18,
    },
    {
      id: "ai",
      title: "Now Intelligence & AI",
      badge: "AI",
      color: "from-pink-500 to-rose-400",
      bgLight: "bg-pink-50",
      textColor: "text-pink-600",
      duration: "4 Weeks",
      projects: 10,
      lessons: 42,
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Popular Learning Paths
            </h2>
            <p className="text-lg text-gray-500">
              Structured roadmaps designed to take you from beginner to certified professional. Build real projects at every step.
            </p>
          </div>
          <Link to="/roadmaps" className="flex items-center gap-2 text-now-primary font-bold hover:text-now-accent transition-colors">
            View All Roadmaps <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link 
                to={`/roadmaps/${path.id}`}
                className="group block h-full bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden hover:-translate-y-2 relative"
              >
                {/* Decorative Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${path.color} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-110`} />

                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className={`w-14 h-14 rounded-2xl ${path.bgLight} ${path.textColor} flex items-center justify-center font-black text-xl tracking-tight shadow-sm`}>
                      {path.badge}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-now-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-now-primary transition-colors line-clamp-2">
                      {path.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {path.lessons} Lessons
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <FolderGit2 className="w-4 h-4 text-gray-400" />
                        {path.projects} Projects
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <ShieldCheck className="w-4 h-4 text-gray-400" />
                        Certification
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
