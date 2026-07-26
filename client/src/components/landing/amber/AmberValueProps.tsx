import { BookOpen, Code, Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberValueProps() {
  const props = [
    {
      icon: <BookOpen className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "100% Free Learning",
      description: "Access high-quality ServiceNow courses, notes, and roadmaps at no cost."
    },
    {
      icon: <Code className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "Hands-on Projects",
      description: "Build real-world applications and strengthen your portfolio with practical experience."
    },
    {
      icon: <Briefcase className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "Interview Preparation",
      description: "Practice scenario-based questions, mock interviews, and certification-focused content."
    },
    {
      icon: <Users className="w-[42px] h-[42px] relative z-10 text-[#00B67A]" strokeWidth={1.2} />,
      title: "Developer Community",
      description: "Learn, collaborate, share knowledge, and grow with fellow ServiceNow developers."
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-[#0B2538] mb-3">Why Choose NowScripts</h2>
        <p className="text-gray-500 mb-14 text-[17px]">
          Everything you need to learn ServiceNow for free, build real-world skills, and launch your tech career.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {props.map((prop, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <div className="relative mb-1">
                {/* Pink glow effect similar to the screenshot */}
                <div className="absolute inset-0 bg-pink-300 blur-xl opacity-40 rounded-full w-10 h-10 top-1 left-1"></div>
                {prop.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0B2538] text-[17px] mb-2">{prop.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
