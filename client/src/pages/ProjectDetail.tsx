import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Code, BookOpen, Heart, Bookmark } from "lucide-react";
import { projectsData, ProjectDifficulty } from "../data/projectsData";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const project = projectsData.find(p => p.id === id);
  const relatedProjects = projectsData.filter(p => p.module === project?.module && p.id !== id).slice(0, 4);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="text-now-primary hover:underline font-medium flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (diff: ProjectDifficulty) => {
    switch (diff) {
      case "Beginner": return <span className="bg-green-100 text-green-700 border border-green-200 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md">Beginner</span>;
      case "Intermediate": return <span className="bg-blue-100 text-blue-700 border border-blue-200 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md">Intermediate</span>;
      case "Advanced": return <span className="bg-purple-100 text-purple-700 border border-purple-200 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md">Advanced</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        
        {/* Top Navigation */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#0D0C22] leading-tight mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-now-primary to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[#0D0C22] text-base leading-tight hover:text-now-primary cursor-pointer transition-colors">NowScripts</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#3E8B5E] text-[13px] font-medium hover:underline cursor-pointer">Available for work</span>
                  <span className="text-gray-400 hover:text-gray-600 text-[13px] font-medium cursor-pointer">Follow</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors">
                <Heart className="w-[18px] h-[18px]" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors">
                <Bookmark className="w-[18px] h-[18px]" />
              </button>
              <button className="bg-[#0D0C22] hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-bold text-[14px] transition-colors ml-2">
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-12 bg-gray-100 border border-gray-100">
          <img 
            src={project.heroUrl} 
            alt={project.title}
            className="w-full h-auto object-cover max-h-[600px]"
          />
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Background</h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {project.background}
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Objective</h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {project.objective}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Elements to include in Design</h3>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed text-lg space-y-2 mb-8 marker:text-now-primary">
              {project.elements.map((element, idx) => (
                <li key={idx}>
                  <span dangerouslySetInnerHTML={{ __html: element.replace(/([^\s]+ -)/g, '<strong>$1</strong>').replace(/([^\s]+:)/g, '<strong>$1</strong>') }} />
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-now-primary" /> Industry
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-md">
                {project.industry}
              </span>
            </div>

            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-now-primary" /> Estimated Time
            </h4>
            <p className="text-gray-600 font-medium">{project.estimatedTime}</p>
          </div>
        </div>

        {/* Author Footer (Dribbble Style) */}
        <div className="mt-24 mb-16">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4">
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-now-primary to-orange-500 flex items-center justify-center text-white font-bold text-3xl shadow-sm border-4 border-white">
                  N
                </div>
              </span>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <h3 className="text-xl font-bold text-[#0D0C22] mb-1">NowScripts</h3>
            <p className="text-gray-500 text-[14px] mb-6 font-medium">ServiceNow Development & Training Platform.</p>
            <button className="bg-[#0D0C22] hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-bold text-[14px] transition-colors">
              Get in touch
            </button>
          </div>
        </div>

        {/* More Projects Like This */}
        {relatedProjects.length > 0 && (
          <div className="border-t-0 pt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0D0C22]">More by NowScripts</h3>
              <Link to="/projects" className="text-gray-500 hover:text-gray-900 transition-colors font-medium text-[14px]">
                View profile
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((p) => (
                <div key={p.id} className="group flex flex-col gap-3">
                  <Link to={`/projects/${p.id}`} className="block relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
                    <img 
                      src={p.thumbnailUrl} 
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </Link>
                  <div className="px-1">
                    <Link to={`/projects/${p.id}`} className="font-bold text-[#0F172A] hover:text-now-primary transition-colors text-sm line-clamp-2">
                      {p.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
