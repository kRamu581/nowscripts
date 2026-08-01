import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Recommendation {
  id: string;
  type: "lesson" | "practice" | "project" | "community" | "cert";
  title: string;
  description: string;
  link: string;
  reason: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getGradient = (type: string) => {
    switch (type) {
      case "lesson": return "from-blue-500 to-cyan-500";
      case "practice": return "from-purple-500 to-indigo-500";
      case "project": return "from-emerald-500 to-teal-500";
      case "community": return "from-orange-500 to-red-500";
      case "cert": return "from-amber-500 to-yellow-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  return (
    <Link 
      to={recommendation.link}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getGradient(recommendation.type)} opacity-80`} />
      
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-amber-500" />
          <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
            {recommendation.reason}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {recommendation.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {recommendation.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end text-sm font-semibold text-blue-600">
        Start Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
