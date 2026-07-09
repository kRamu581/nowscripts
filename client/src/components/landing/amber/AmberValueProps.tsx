import { Route, MonitorPlay, Users, CheckCircle } from "lucide-react";

export function AmberValueProps() {
  const props = [
    {
      icon: <Route className="w-10 h-10 text-pink-500" strokeWidth={1.5} />,
      title: "Structured Learning Paths",
      description: "Follow step-by-step roadmaps from beginner to expert."
    },
    {
      icon: <MonitorPlay className="w-10 h-10 text-purple-500" strokeWidth={1.5} />,
      title: "100% Free Practice Labs",
      description: "Build real enterprise projects on your own instance."
    },
    {
      icon: <Users className="w-10 h-10 text-orange-500" strokeWidth={1.5} />,
      title: "Community Support",
      description: "Join thousands of learners in our Discord community."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={1.5} />,
      title: "Verified, Up-to-Date Content",
      description: "Aligned with the latest ServiceNow release (Washington DC)."
    }
  ];

  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-10">Why Choose NowScripts</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {props.map((prop, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <div className="bg-gray-50 p-4 rounded-full border border-gray-100">
                {prop.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{prop.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
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
