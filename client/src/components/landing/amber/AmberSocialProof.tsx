import { Star, ChevronRight } from "lucide-react";
import { useRef } from "react";
import senyoImg from "../../../assets/senyo.png";

export function AmberSocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    { 
      name: "Prasanna Rao Tammana", 
      role: "TCS — Software Engineer", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prasanna&backgroundColor=ffdfbf", 
      flag: "in",
      text: "It’s a good one, keep it up." 
    },
    { 
      name: "Senyo A", 
      role: "ServiceNow Developer", 
      image: senyoImg, 
      flag: "za",
      text: "I checked your website and GitHub, which is impressive, but you need to focus all your energy on hands-on implementation content." 
    },
    { 
      name: "Sonex Labs", 
      role: "", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonex&backgroundColor=ffdfbf", 
      flag: "in",
      text: "Cool. And I noticed you're giving it to students for free. That's really commendable." 
    },
    { 
      name: "Raghunath Dharani", 
      role: "LinkedIn Assistant Manager", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raghunath&backgroundColor=ffdfbf", 
      flag: "in",
      text: "The platform could be even more useful if it understood a user’s LinkedIn profile, resume, and experience to recommend courses tailored to their career goals." 
    }
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-8 pb-10 md:pt-10 md:pb-12 bg-[#CEEFE0] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#0B2538]">Trusted members</h2>
        </div>

        <div className="relative">
          {/* Scrollable Testimonials Grid */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar relative z-0"
          >
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="shrink-0 w-[280px] sm:w-[300px] h-[160px] bg-white rounded-[12px] p-5 shadow-sm snap-start flex flex-col justify-between"
              >
                <div>
                  <p className="text-[#4B5563] leading-snug text-[15px] line-clamp-3">
                    {test.text}
                  </p>
                  {idx === testimonials.length - 1 && (
                    <span className="text-red-400 text-sm font-medium mt-1 inline-block cursor-pointer hover:underline">More</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={test.image} 
                      alt={test.name}
                      className="w-[42px] h-[42px] rounded-full object-cover bg-amber-100"
                    />
                    <img 
                      src={`https://flagcdn.com/w20/${test.flag || 'in'}.png`} 
                      alt={test.flag === 'za' ? "South Africa" : "India"}
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-white object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#374151] text-[15px] leading-tight">{test.name}</h4>
                    <div className="text-[13px] text-[#6B7280] truncate w-[200px]">
                      {test.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Fade & Navigation Arrow */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#CEEFE0] to-transparent pointer-events-none z-10 hidden md:flex items-center justify-end pr-2">
            <button 
              onClick={scrollRight}
              className="w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 hover:text-gray-900 pointer-events-auto transition-transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
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
