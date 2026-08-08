import { Route, Laptop, Trophy } from "lucide-react";

export function AmberLearningSteps() {
  const steps = [
    {
      icon: <Route className="w-5 h-5 md:w-6 md:h-6 text-[#FF5A5F]" strokeWidth={1.5} />,
      title: "Choose Your Track",
      description: "Select the career path that aligns with your goals (Admin, Developer, etc.)."
    },
    {
      icon: <Laptop className="w-5 h-5 md:w-6 md:h-6 text-[#FF5A5F]" strokeWidth={1.5} />,
      title: "Follow the Roadmap & Practice",
      description: "Complete modules and build real projects in your personal dev instance."
    },
    {
      icon: <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#FF5A5F]" strokeWidth={1.5} />,
      title: "Ace Your Interview",
      description: "Use our 250+ real-world interview questions to land your dream job."
    }
  ];

  return (
    <section className="bg-white pt-10 pb-12 md:pt-12 md:pb-16 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-[28px] font-black text-[#0B2538] mb-2 tracking-tight">
            Start Learning In 3 Easy Steps
          </h2>
          <p className="text-gray-500 font-medium text-[14px] md:text-[15px]">
            Follow our structured path to master ServiceNow and land your dream role
          </p>
        </div>
        
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar items-stretch w-full gap-4 md:gap-3 lg:gap-5 pb-6 pt-2 px-6 md:px-2 -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full">
          {/* Invisible spacer for mobile scroll start */}
          <div className="shrink-0 w-2 md:hidden"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center shrink-0 w-[82vw] sm:w-[350px] md:flex-1 md:w-auto snap-center md:snap-none">
              {/* Card */}
              <div className="relative flex-1 bg-white border border-gray-200 rounded-xl p-5 md:p-6 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-center">
                {/* Number Bubble */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700 shadow-sm z-10 text-[15px]">
                  {idx + 1}
                </div>
                
                {/* Icon Container */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center mb-4 md:mb-5">
                  {step.icon}
                </div>
                
                <h3 className="font-bold text-[#0B2538] text-[15px] md:text-[17px] mb-1.5 md:mb-2 whitespace-normal">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-medium text-[13px] md:text-[14px] leading-snug whitespace-normal">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (Hide on last item) */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center w-8 md:w-6 lg:w-10 shrink-0 mx-1 md:mx-0">
                  <div className="w-full relative flex items-center">
                    <div className="w-full border-t border-dashed border-gray-400"></div>
                    <div className="absolute right-[-2px] w-2 h-2 border-t border-r border-gray-400 transform rotate-45"></div>
                  </div>
                </div>
              )}
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
