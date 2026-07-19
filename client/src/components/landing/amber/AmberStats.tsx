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
    <section className="bg-white pb-8 md:pb-16 pt-6 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 md:gap-3">
              <div className="relative mb-0 md:mb-2 flex justify-center">
                {/* Pink glow effect */}
                <div className="absolute inset-0 bg-pink-300 blur-xl opacity-40 rounded-full w-6 h-6 md:w-8 md:h-8 top-0 left-0 hidden md:block"></div>
                <div className="scale-75 md:scale-100 text-[#333333] md:text-gray-800">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-[#191919] md:text-[#0B2538] text-[13px] sm:text-[15px] md:text-[17px] mb-0 md:mb-1.5">{stat.title.split(' ')[0]}</h3>
                <p className="text-gray-500 text-[11px] sm:text-[13px] md:text-[14px] leading-snug hidden md:block">
                  {stat.desc}
                </p>
                <p className="text-gray-600 text-[11px] sm:text-[12px] leading-tight md:hidden">
                  {stat.title.split(' ').slice(1).join(' ')}
                </p>
              </div>
            </div>
          ))}

          {/* Course Ratings Section replacing Trustpilot */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 md:gap-3 md:pl-6 border-l border-gray-100">
            <div className="flex items-center justify-center gap-1.5 mb-0 md:mb-2">
              <div className="scale-75 md:scale-100">
                <Star className="w-7 h-7 text-[#FFB800] fill-[#FFB800] stroke-[1.5]" />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
               <h3 className="font-bold text-[#191919] md:text-[#0B2538] text-[13px] sm:text-[15px] md:text-[17px] mb-0 md:mb-1.5">4.9/5</h3>
               <div className="text-gray-600 text-[11px] sm:text-[12px] leading-tight md:hidden">
                 Trust Rating
               </div>
               <div className="text-[14px] text-gray-800 hidden md:block">
                 <span>Course Score <b>4.9</b></span>
                 <br />
                 <span className="hover:underline cursor-pointer text-gray-500"><b>2,145</b> reviews</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
