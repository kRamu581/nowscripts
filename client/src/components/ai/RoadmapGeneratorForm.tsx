import React, { useState } from "react";
import { useAIRoadmap } from "../../hooks/useAI";
import { Loader2, Route, Target, Clock, Award, Briefcase } from "lucide-react";

interface RoadmapGeneratorFormProps {
  onSuccess: (roadmapData: any) => void;
}

export default function RoadmapGeneratorForm({ onSuccess }: RoadmapGeneratorFormProps) {
  const { generateRoadmap, isGenerating, error } = useAIRoadmap();
  
  const [formData, setFormData] = useState({
    careerGoal: "",
    experience: "Beginner",
    timeAvailable: "5-10 hours/week",
    targetCertification: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.careerGoal) return;
    
    const data = await generateRoadmap(formData);
    if (data) {
      onSuccess(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto">

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Target size={16} className="text-gray-400" />
            Career Goal
          </label>
          <input
            type="text"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            placeholder="e.g., Become ServiceNow Developer, React Full Stack"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase size={16} className="text-gray-400" />
              Current Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none appearance-none"
            >
              <option value="Beginner">Beginner (0-1 yrs)</option>
              <option value="Intermediate">Intermediate (2-4 yrs)</option>
              <option value="Advanced">Advanced (5+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Clock size={16} className="text-gray-400" />
              Time Available
            </label>
            <select
              name="timeAvailable"
              value={formData.timeAvailable}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none appearance-none"
            >
              <option value="< 5 hours/week">Less than 5 hours/week</option>
              <option value="5-10 hours/week">5-10 hours/week</option>
              <option value="10-20 hours/week">10-20 hours/week</option>
              <option value="20+ hours/week">20+ hours/week</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Award size={16} className="text-gray-400" />
            Target Certification (Optional)
          </label>
          <input
            type="text"
            name="targetCertification"
            value={formData.targetCertification}
            onChange={handleChange}
            placeholder="e.g., CSA, CAD, AWS Solutions Architect"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !formData.careerGoal}
          className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating Roadmap...
            </>
          ) : (
            "Generate Personalized Roadmap"
          )}
        </button>
      </form>
    </div>
  );
}
