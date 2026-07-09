import { Users, BookOpen, Briefcase, Star, Award } from "lucide-react";

export function AmberStats() {
  const stats = [
    {
      icon: <Users className="w-7 h-7 text-gray-800 relative z-10" strokeWidth={1.5} />,
      title: "10,000+ Students",
      desc: "Join a growing community of aspiring ServiceNow professionals."
    },
    {
      icon: <BookOpen className="w-7 h-7 text-gray-800 relative z-10" strokeWidth={1.5} />,
      title: "150+ Practice Labs",
      desc: "Get hands-on experience with real-world enterprise scenarios."
    },
    {
      icon: <Briefcase className="w-7 h-7 text-gray-800 relative z-10" strokeWidth={1.5} />,
      title: "95% Success Rate",
      desc: "Our students successfully clear their CSA & CAD certifications."
    }
  ];

  return (
    <section className="bg-white pb-16 pt-6 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start gap-3">
              <div className="relative mb-2">
                {/* Pink glow effect */}
                <div className="absolute inset-0 bg-pink-300 blur-xl opacity-40 rounded-full w-8 h-8 top-0 left-0"></div>
                {stat.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0B2538] text-[17px] mb-1.5">{stat.title}</h3>
                <p className="text-gray-500 text-[14px] leading-snug">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Course Ratings Section replacing Trustpilot */}
          <div className="flex flex-col items-start gap-3 md:pl-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Award className="w-8 h-8 text-[#FF5A3C]" />
              <span className="font-black text-xl text-[#191919] tracking-tight">Top Rated</span>
            </div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-[#FFB800] flex items-center justify-center rounded-[2px]">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
              ))}
            </div>
            <div className="text-[14px] text-gray-800">
              <span>Course Score <b>4.9</b></span>
              <span className="mx-1">|</span>
              <span className="hover:underline cursor-pointer"><b>2,145</b> reviews</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
