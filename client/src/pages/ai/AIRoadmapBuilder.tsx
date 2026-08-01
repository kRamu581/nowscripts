import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoadmapGeneratorForm from "../../components/ai/RoadmapGeneratorForm";
import { ArrowLeft, Map, CheckCircle2, ChevronRight, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AIRoadmapBuilder() {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);
  const navigate = useNavigate();

  const handleSuccess = (roadmapData: any) => {
    setGeneratedRoadmap(roadmapData);
    toast.success("Roadmap generated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/ai" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
          <Map size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Roadmap Builder</h1>
          <p className="text-sm text-gray-500">Generate a personalized learning path</p>
        </div>
      </div>

      {!generatedRoadmap ? (
        <RoadmapGeneratorForm onSuccess={handleSuccess} />
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Map size={120} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                <CheckCircle2 size={16} /> Ready for you
              </div>
              <h2 className="text-3xl font-bold mb-2">{generatedRoadmap.title}</h2>
              <p className="text-purple-200">Estimated Duration: {generatedRoadmap.roadmapData?.estimatedDuration || "Unknown"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Weekly Breakdown</h3>
              {generatedRoadmap.roadmapData?.weeks?.map((week: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-1">Week {week.weekNumber}</p>
                      <h4 className="text-lg font-bold text-gray-900">{week.focus}</h4>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Goals:</p>
                      <ul className="space-y-2">
                        {week.goals?.map((g: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <ChevronRight size={16} className="text-purple-500 shrink-0 mt-0.5" />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Recommended Certs</h3>
                <ul className="space-y-3">
                  {generatedRoadmap.roadmapData?.recommendedCertifications?.map((c: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Projects</h3>
                <ul className="space-y-4">
                  {generatedRoadmap.roadmapData?.projects?.map((p: any, idx: number) => (
                    <li key={idx} className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{p.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{p.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => {
                  toast.success("Roadmap saved to your dashboard!");
                  navigate("/ai");
                }}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={18} /> Save & Start Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
