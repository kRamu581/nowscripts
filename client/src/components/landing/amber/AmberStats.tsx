import { Users, BookOpen, Briefcase, Star, Award } from "lucide-react";

export function AmberStats() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />,
      title: "250+ Community Members",
      desc: "Growing ServiceNow learner community."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />,
      title: "150+ Practice Labs",
      desc: "Adding soon."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />,
      title: "95% Success Rate",
      desc: "Our students successfully clear their CSA & CAD certifications."
    }
  ];

  return (
    <section className="bg-white pb-8 md:pb-16 pt-6 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2 md:gap-3">
              <div className="relative mb-2 flex justify-center items-center w-12 h-12">
                <div className="absolute bg-[#FFE9EA] rounded-lg w-10 h-10 bottom-0 right-0 transform translate-x-1 translate-y-1 z-0"></div>
                {stat.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0B2538] text-[15px] md:text-[18px] mb-1">{stat.title}</h3>
                <p className="text-gray-500 text-[13px] md:text-[14px] leading-snug">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Course Ratings Section */}
          <div className="flex flex-col items-center text-center gap-2 md:gap-3 mt-1">
            <div className="flex items-center justify-center mb-1 h-12">
              <span className="font-bold text-[#0B2538] text-[16px] md:text-[18px]">Trusted by Learners</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <Star key={star} className="w-5 h-5 text-[#FF5A5F] fill-[#FF5A5F]" />
                 ))}
               </div>
               <div className="text-[13px] md:text-[14px] text-gray-800 mt-1">
                 <span><b>4.7/5</b></span>
                 <span className="mx-1.5 text-gray-400">•</span>
                 <span><b>100+</b> Reviews</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
