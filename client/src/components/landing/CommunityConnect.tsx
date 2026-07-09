import { motion } from "framer-motion";
import { MessageSquare, Users, Trophy, Mail, Globe, Network, ArrowRight } from "lucide-react";

export function CommunityConnect() {
  const cards = [
    {
      title: "Discord Community",
      desc: "Join 10,000+ developers for real-time help and networking.",
      icon: <MessageSquare className="w-8 h-8 text-[#5865F2]" />,
      link: "Join Discord",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-[#5865F2]"
    },
    {
      title: "Open Source GitHub",
      desc: "Contribute to community projects and build your portfolio.",
      icon: <Globe className="w-8 h-8 text-gray-900" />,
      link: "View Repositories",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-gray-900"
    },
    {
      title: "LinkedIn Network",
      desc: "Connect with recruiters, mentors, and peers.",
      icon: <Network className="w-8 h-8 text-[#0A66C2]" />,
      link: "Follow Us",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-[#0A66C2]"
    },
    {
      title: "Weekly Newsletter",
      desc: "Get the latest ServiceNow news, tips, and tutorials in your inbox.",
      icon: <Mail className="w-8 h-8 text-orange-500" />,
      link: "Subscribe Now",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-orange-500"
    },
    {
      title: "Global Leaderboard",
      desc: "Compete with peers, earn points, and showcase your expertise.",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      link: "View Rankings",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-yellow-500"
    },
    {
      title: "Community Stats",
      desc: "Over 50,000 questions answered and 100,000 projects completed.",
      icon: <Users className="w-8 h-8 text-emerald-500" />,
      link: "See Impact",
      bg: "bg-white",
      border: "border-gray-100",
      hover: "hover:border-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
            >
              Never code alone.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500"
            >
              Join the fastest-growing community of ServiceNow professionals. Get help, share knowledge, and grow your career together.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              href="#"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`group flex flex-col p-8 rounded-3xl ${card.bg} border ${card.border} ${card.hover} transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1`}
            >
              <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-500 mb-8 flex-1">{card.desc}</p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-now-primary transition-colors mt-auto">
                {card.link} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
