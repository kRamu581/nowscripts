import { Route, Laptop, Trophy } from "lucide-react";

export function AmberLearningSteps() {
  const steps = [
    {
      icon: <Route className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
      title: "Choose Your Track",
      description: "Select the career path that aligns with your goals (Admin, Developer, etc.)."
    },
    {
      icon: <Laptop className="w-8 h-8 text-purple-500" strokeWidth={1.5} />,
      title: "Follow the Roadmap & Practice",
      description: "Complete modules and build real projects in your personal dev instance."
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" strokeWidth={1.5} />,
      title: "Ace Your Interview",
      description: "Use our 250+ real-world interview questions to land your dream job."
    }
  ];

  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-16">Start Learning in 3 Easy Steps</h2>
        
        <div className="relative flex flex-col md:flex-row justify-between max-w-5xl mx-auto gap-12 md:gap-4">
          
          {/* Desktop Dashed Connector Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-200 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center mb-6 shadow-sm relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 text-white font-black flex items-center justify-center border-4 border-white shadow-sm">
                  {idx + 1}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 font-medium text-center px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
