import { Code, MessageSquare } from "lucide-react";

export function AmberSupportCards() {
  const supports = [
    {
      title: "Join Discord Community",
      description: "Connect with thousands of ServiceNow learners and experts.",
      icon: <MessageSquare className="w-8 h-8 text-[#5865F2]" />,
      actionText: "Join Discord",
      url: "https://discord.gg/nowscripts"
    },
    {
      title: "Contribute on GitHub",
      description: "Help build the ultimate open-source ServiceNow resource.",
      icon: <Code className="w-8 h-8 text-gray-900" />,
      actionText: "View GitHub",
      url: "https://github.com/nowscripts"
    }
  ];

  return (
    <section className="bg-white pt-8 pb-10 md:pt-10 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Need Help? Let's Connect</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {supports.map((support, idx) => (
            <a 
              key={idx} 
              href={support.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:border-[#FF5A3C]/20 transition-all group"
            >
              <div className="shrink-0 bg-gray-50 p-3 rounded-xl group-hover:bg-[#FFF0ED] transition-colors">
                {support.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{support.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-3">{support.description}</p>
                <span className="text-sm font-bold text-[#FF5A3C] group-hover:underline">
                  {support.actionText} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
