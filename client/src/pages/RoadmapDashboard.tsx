import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { mockRoadmaps } from "../mockRoadmapData";

const getIcon = (iconName: string) => {
  // @ts-ignore
  const Icon = LucideIcons[iconName];
  return Icon ? <Icon className="w-12 h-12" /> : <LucideIcons.BookOpen className="w-12 h-12" />;
};

const RoadmapNode = ({ roadmap, index }: { roadmap: any, index: number }) => {
  return (
    <Link to={roadmap.slug === "certification-path" ? "/certifications" : `/roadmaps/${roadmap.slug}`}>
      <motion.div 
        whileHover={{ y: -4 }}
        className="group relative w-full bg-white border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-3"
      >
        {/* Book Cover Design */}
        <div className={`relative w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${roadmap.color} overflow-hidden shadow-inner flex items-center justify-center p-6`}>
           {/* Decorative elements to make it look like a cover */}
           <div className="absolute top-0 left-0 w-full h-full bg-black/5 mix-blend-overlay"></div>
           <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 skew-x-12 transform origin-top-right"></div>
           <div className="absolute top-4 left-4 text-white/80">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">ROADMAP</span>
           </div>
           
           <div className="text-white text-center z-10 flex flex-col items-center gap-3">
             {getIcon(roadmap.iconName || "BookOpen")}
             <h4 className="font-bold text-lg md:text-xl leading-tight text-balance max-w-[80%]">{roadmap.title}</h4>
           </div>
        </div>

        {/* Card Content */}
        <div className="px-2 pt-4 pb-2">
          <h3 className="text-base font-bold text-gray-900 mb-1 tracking-tight group-hover:text-now-primary transition-colors line-clamp-2">
            {roadmap.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {roadmap.modules?.length || 0} modules
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default function RoadmapDashboard() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-now-primary/20 selection:text-now-primary pb-32 pt-24">
      {/* Header Section matching 2nd image style */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">
            Learning Roadmaps
          </h1>
          <p className="text-sm text-gray-500">
            Choose a learning path to continue with independent notes and modules.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockRoadmaps.map((roadmap, index) => (
            <RoadmapNode key={index} roadmap={roadmap} index={index} />
          ))}
        </motion.div>
      </div>
      {/* Floating AI Bot Button */}
      <Link
        to="/ai"
        className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-lg"
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#4CD964]">
          <path fillRule="evenodd" clipRule="evenodd" d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z M50 68 C59.9411 68 68 59.9411 68 50 C68 40.0589 59.9411 32 50 32 C40.0589 32 32 40.0589 32 50 C32 59.9411 40.0589 68 50 68 Z" fill="currentColor" />
        </svg>
      </Link>
    </div>
  );
}
