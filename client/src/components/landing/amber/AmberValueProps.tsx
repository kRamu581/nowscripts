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
    <section className="bg-white pt-10 pb-12 md:pt-12 md:pb-16 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-[28px] font-black text-[#0B2538] mb-2 tracking-tight">Why Choose NowScripts</h2>
        <p className="text-gray-500 font-medium mb-10 text-[14px] md:text-[15px]">
          Everything you need to learn ServiceNow for free, build real-world skills, and launch your tech career.
        </p>
        
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar gap-6 md:gap-x-10 md:gap-y-12 pb-6 md:pb-0 -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full px-6 md:px-0 pt-2">
          {props.map((prop, idx) => (
            <div key={idx} className="flex flex-col items-start gap-3 md:gap-4 shrink-0 w-[82vw] sm:w-[350px] md:w-auto snap-center md:snap-none">
              <div className="relative mb-1">
                {/* Pink glow effect similar to the screenshot */}
                <div className="absolute inset-0 bg-pink-300 blur-xl opacity-40 rounded-full w-10 h-10 top-1 left-1"></div>
                {prop.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0B2538] text-[16px] md:text-[17px] mb-1.5 md:mb-2">{prop.title}</h3>
                <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed whitespace-normal">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
