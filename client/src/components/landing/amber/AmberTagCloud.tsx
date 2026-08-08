import { useState } from "react";
import { Link } from "react-router-dom";

export function AmberTagCloud() {
  const [activeTab, setActiveTab] = useState("Certifications");

  const tags = {
    "Certifications": [
      "CSA", "CAD", "CIS-ITSM", "CIS-CSM", "CIS-HR", "CIS-SecOps", "CAS-PA", "CTA", "CMA"
    ],
    "Modules": [
      "ServiceNow Fundamentals", "Scripting in ServiceNow", "Application Development",
      "Flow Designer", "Integration Hub", "Service Portal", "Virtual Agent", "CMDB"
    ]
  };

  return (
    <section className="bg-gray-50 pt-6 pb-8 md:pt-8 md:pb-10 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Topics</h2>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {Object.keys(tags).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab 
                  ? "border-[#D91B42] text-[#D91B42]" 
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cloud */}
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {tags[activeTab as keyof typeof tags].map(tag => (
            <Link 
              key={tag}
              to="/roadmaps"
              className="text-sm font-medium text-gray-600 hover:text-[#D91B42] hover:underline"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
