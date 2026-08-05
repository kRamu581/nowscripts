import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Bookmark, MessageSquare, Code2, PlayCircle, Plus } from "lucide-react";
import { Project } from "../data/projectsData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col gap-3">
      {/* Cover Image & Overlays */}
      <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:-translate-y-1">
        
        {/* Image */}
        <img 
          src={project.thumbnailUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Title & Actions - Bottom Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 translate-y-2 group-hover:translate-y-0">
          
          <h3 className="text-white font-bold text-[16px] leading-snug mb-3 line-clamp-2 drop-shadow-md">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-2">
            <Link 
              to={`/projects/${project.id}`}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold text-[13px] transition-colors shadow-sm"
            >
              <PlayCircle className="w-4 h-4" /> View Details
            </Link>
            
            <button 
              className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg flex items-center justify-center text-white transition-colors"
              title="Save Project"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button 
              className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg flex items-center justify-center text-white transition-colors"
              title="View Source"
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Author & Stats Row */}
      <div className="flex items-center justify-between px-1 mt-1">
        
        {/* Author Info */}
        <div className="flex items-center gap-2 overflow-hidden group/author">
          <div className="relative shrink-0">
            <img 
              src={project.author?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} 
              alt={project.author?.name || "Author"} 
              className="w-6 h-6 rounded-full object-cover border border-gray-100" 
            />
            {/* Follow Hover Button (Mini) */}
            <button className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#EA4C89] rounded-full text-white flex items-center justify-center opacity-0 group-hover/author:opacity-100 transition-opacity transform scale-75 group-hover/author:scale-100 hover:bg-pink-600">
              <Plus className="w-2.5 h-2.5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-gray-900 hover:text-[#EA4C89] cursor-pointer transition-colors text-[14px] truncate leading-tight">
              {project.author?.name || "NowScripts Dev"}
            </span>
            <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1.5 py-[2px] rounded uppercase tracking-wide shrink-0">
              {project.author?.badge || "PRO"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3.5 text-gray-400 shrink-0">
          <div className="flex items-center gap-1.5 hover:text-pink-500 cursor-pointer transition-colors group/stat">
            <Heart className="w-4 h-4 group-hover/stat:fill-current transition-colors" /> 
            <span className="text-[12px] font-semibold text-gray-600">{project.stats?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer transition-colors">
            <Eye className="w-4 h-4" /> 
            <span className="text-[12px] font-semibold text-gray-600">{project.stats?.views || "0"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
