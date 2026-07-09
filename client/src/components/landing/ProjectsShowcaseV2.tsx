import { motion } from "framer-motion";
import { Clock, Rocket, ArrowRight, Settings, Users, Database, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectsShowcaseV2() {
  const projects = [
    {
      title: "Enterprise Incident Management",
      desc: "Build a custom scoped application for handling IT incidents with SLA workflows, automated assignment rules, and a custom Service Portal widget.",
      diff: "Advanced",
      diffColor: "bg-red-50 text-red-700 border-red-200",
      time: "8 Hours",
      tags: ["Scoped Apps", "Flow Designer", "Service Portal"],
      featured: true,
      icon: <Rocket className="w-6 h-6 text-white" />,
      imageBg: "bg-gradient-to-br from-gray-900 to-gray-800",
      thumbnailType: "dashboard"
    },
    {
      title: "Employee Onboarding Workflow",
      desc: "Automate the new hire process with Order Guides and Workflows.",
      diff: "Intermediate",
      diffColor: "bg-amber-50 text-amber-700 border-amber-200",
      time: "4 Hours",
      tags: ["Flow Designer", "Catalog"],
      featured: false,
      icon: <Users className="w-6 h-6 text-white" />,
      imageBg: "bg-gradient-to-br from-emerald-600 to-teal-700",
      thumbnailType: "workflow"
    },
    {
      title: "Asset Lifecycle Tracker",
      desc: "Track hardware lifecycle stages and assignments.",
      diff: "Intermediate",
      diffColor: "bg-amber-50 text-amber-700 border-amber-200",
      time: "3 Hours",
      tags: ["CMDB", "Business Rules"],
      featured: false,
      icon: <Database className="w-6 h-6 text-white" />,
      imageBg: "bg-gradient-to-br from-blue-600 to-indigo-700",
      thumbnailType: "list"
    },
    {
      title: "Custom HR Portal",
      desc: "Create a stunning portal for HR requests.",
      diff: "Advanced",
      diffColor: "bg-red-50 text-red-700 border-red-200",
      time: "6 Hours",
      tags: ["Service Portal", "AngularJS"],
      featured: false,
      icon: <Code2 className="w-6 h-6 text-white" />,
      imageBg: "bg-gradient-to-br from-purple-600 to-fuchsia-700",
      thumbnailType: "portal"
    },
    {
      title: "CMDB Implementation",
      desc: "Setup Discovery schedules and map application services.",
      diff: "Expert",
      diffColor: "bg-purple-50 text-purple-700 border-purple-200",
      time: "8 Hours",
      tags: ["Discovery", "Service Mapping"],
      featured: false,
      icon: <Settings className="w-6 h-6 text-white" />,
      imageBg: "bg-gradient-to-br from-rose-600 to-red-700",
      thumbnailType: "map"
    }
  ];

  return (
    <section className="py-24 bg-white relative z-10 border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
            >
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">Real Projects</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-500 leading-relaxed"
            >
              Stop watching tutorials. Start building enterprise-grade applications to add to your developer portfolio and impress interviewers.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 font-bold hover:border-now-primary hover:text-now-primary transition-all whitespace-nowrap shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              View Project Library <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group flex flex-col bg-white border border-gray-100 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden ${proj.featured ? 'md:col-span-2 lg:col-span-2 flex-col md:flex-row' : ''}`}
            >
              {/* Mockup/Thumbnail Section */}
              <div className={`${proj.featured ? 'md:w-[45%] h-64 md:h-auto' : 'h-56'} w-full relative overflow-hidden ${proj.imageBg} p-8 flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Abstract UI representation */}
                <div className="w-full h-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl transform group-hover:scale-[1.03] group-hover:-rotate-2 transition-transform duration-500 relative flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    {proj.icon}
                  </div>
                  
                  {proj.thumbnailType === 'dashboard' && (
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex gap-3">
                        <div className="w-1/3 h-16 rounded-xl bg-white/20"></div>
                        <div className="w-1/3 h-16 rounded-xl bg-white/20"></div>
                        <div className="w-1/3 h-16 rounded-xl bg-white/20"></div>
                      </div>
                      <div className="w-full flex-1 rounded-xl bg-white/10 mt-1"></div>
                    </div>
                  )}
                  {proj.thumbnailType === 'workflow' && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                      <div className="w-1/2 h-10 rounded-lg bg-white/30"></div>
                      <div className="w-1 h-6 bg-white/20"></div>
                      <div className="flex gap-4">
                        <div className="w-20 h-10 rounded-lg bg-white/20"></div>
                        <div className="w-20 h-10 rounded-lg bg-white/20"></div>
                      </div>
                    </div>
                  )}
                  {proj.thumbnailType === 'list' && (
                    <div className="flex-1 flex flex-col gap-3 mt-2">
                      <div className="w-full h-10 rounded-lg bg-white/30"></div>
                      <div className="w-full h-8 rounded-lg bg-white/20"></div>
                      <div className="w-full h-8 rounded-lg bg-white/10"></div>
                    </div>
                  )}
                  {proj.thumbnailType === 'portal' && (
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="w-full h-20 rounded-xl bg-white/20 flex flex-col justify-center items-center gap-3">
                        <div className="w-1/3 h-3 rounded-full bg-white/30"></div>
                        <div className="w-3/4 h-8 rounded-lg bg-white/20"></div>
                      </div>
                      <div className="flex gap-3 flex-1 mt-1">
                        <div className="w-1/2 h-full rounded-xl bg-white/10"></div>
                        <div className="w-1/2 h-full rounded-xl bg-white/10"></div>
                      </div>
                    </div>
                  )}
                  {proj.thumbnailType === 'map' && (
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="w-12 h-12 rounded-full bg-white/30 absolute z-10"></div>
                      <div className="w-full h-0.5 bg-white/20 absolute"></div>
                      <div className="h-full w-0.5 bg-white/20 absolute"></div>
                      <div className="w-8 h-8 rounded-full bg-white/20 absolute top-2 left-4"></div>
                      <div className="w-8 h-8 rounded-full bg-white/20 absolute bottom-2 right-4"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className={`${proj.featured ? 'md:w-[55%]' : 'w-full'} p-8 md:p-10 flex flex-col h-full bg-white`}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${proj.diffColor}`}>
                    {proj.diff}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                    <Clock className="w-4 h-4" /> {proj.time}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-now-primary transition-colors leading-tight">
                  {proj.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-8 flex-1">
                  {proj.desc}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to="/projects" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gray-900 hover:bg-now-primary text-white font-bold rounded-xl transition-colors">
                    Start Project
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
