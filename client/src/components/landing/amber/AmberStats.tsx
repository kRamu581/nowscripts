import { Users, BookOpen, Briefcase, Star } from "lucide-react";

export function AmberStats() {
  return (
    <section className="bg-white pb-6 pt-6 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-4 gap-2 md:gap-8 justify-items-center md:justify-items-start">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-2 flex justify-center items-center w-8 h-8 md:w-12 md:h-12">
              <div className="absolute bg-[#FFE9EA] rounded-md md:rounded-lg w-6 h-6 md:w-10 md:h-10 bottom-0 right-0 transform translate-x-1 translate-y-1 z-0 md:opacity-100 opacity-60"></div>
              <Users className="w-5 h-5 md:w-8 md:h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-[#0B2538] text-[13px] md:text-[18px] leading-tight md:mb-1">250+ <span className="hidden md:inline">Community Members</span></h3>
            <p className="text-gray-500 text-[10px] md:hidden leading-none mt-0.5">Members</p>
            <p className="text-gray-500 text-[14px] hidden md:block">Growing ServiceNow learner<br className="hidden md:block" />community.</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-2 flex justify-center items-center w-8 h-8 md:w-12 md:h-12">
              <div className="absolute bg-[#FFE9EA] rounded-md md:rounded-lg w-6 h-6 md:w-10 md:h-10 bottom-0 right-0 transform translate-x-1 translate-y-1 z-0 md:opacity-100 opacity-60"></div>
              <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-[#0B2538] text-[13px] md:text-[18px] leading-tight md:mb-1">150+ <span className="hidden md:inline">Practice Labs</span></h3>
            <p className="text-gray-500 text-[10px] md:hidden leading-none mt-0.5">Labs</p>
            <p className="text-gray-500 text-[14px] hidden md:block">Adding soon.</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-2 flex justify-center items-center w-8 h-8 md:w-12 md:h-12">
              <div className="absolute bg-[#FFE9EA] rounded-md md:rounded-lg w-6 h-6 md:w-10 md:h-10 bottom-0 right-0 transform translate-x-1 translate-y-1 z-0 md:opacity-100 opacity-60"></div>
              <Briefcase className="w-5 h-5 md:w-8 md:h-8 text-[#0B2538] relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-[#0B2538] text-[13px] md:text-[18px] leading-tight md:mb-1">95% <span className="hidden md:inline">Success Rate</span></h3>
            <p className="text-gray-500 text-[10px] md:hidden leading-none mt-0.5">Success Rate</p>
            <p className="text-gray-500 text-[14px] hidden md:block">Our students successfully clear their<br className="hidden md:block" />CSA & CAD certifications.</p>
          </div>

          {/* Stat 4 - Rating */}
          <div className="flex flex-col items-center text-center flex-1 w-full">
            {/* Mobile Icon */}
            <div className="relative mb-2 flex justify-center items-center w-8 h-8 md:hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-3 h-3 bg-pink-100 rounded-full blur-[2px] opacity-70"></div>
              </div>
              <Star className="w-5 h-5 text-[#0B2538] relative z-10" strokeWidth={1.5} />
            </div>
            {/* Mobile Title */}
            <h3 className="font-bold text-[#0B2538] text-[13px] md:hidden leading-tight">4.7/5</h3>
            <p className="text-gray-500 text-[10px] md:hidden leading-none mt-0.5 whitespace-nowrap">Trust Rating</p>
            
            {/* Desktop Rating Block */}
            <div className="hidden md:flex flex-col items-center justify-center w-full h-full -mt-2">
               <span className="font-bold text-[15px] text-[#0B2538] leading-tight mb-1.5 max-w-[80px]">Trusted by Learners</span>
               <div className="flex items-center gap-1 mb-1.5">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <Star key={star} className="w-4 h-4 fill-[#FF5A5F] text-[#FF5A5F]" />
                 ))}
               </div>
               <div className="text-[13px] text-[#0B2538] whitespace-nowrap">
                 <span className="font-bold">4.7/5</span>
                 <span className="mx-1 text-gray-400">•</span>
                 <span className="font-bold">100+</span> Reviews
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
