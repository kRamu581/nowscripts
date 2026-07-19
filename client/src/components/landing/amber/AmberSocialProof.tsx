import { Star, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function AmberSocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    { 
      name: "Rahul Sharma", 
      role: "Pune Institute of Computer Technology", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=ffdfbf", 
      text: "Guided through NowScripts. They are really amazing. Helped me and my friend finds rooms so quickly and efficiently." 
    },
    { 
      name: "Sneha Desai", 
      role: "BMS College of Engineering, Bangalore", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=ffdfbf", 
      text: "NowScripts has been really sweet and supportive really liked the service." 
    },
    { 
      name: "Ananya Singh", 
      role: "KJ Somaiya College, Mumbai", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&backgroundColor=ffdfbf", 
      text: "The process was easy and the people involved were responsive and helpful." 
    },
    { 
      name: "Rohan Patel", 
      role: "Amity University", 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan&backgroundColor=ffdfbf", 
      text: "Man literally they did every perfect accommodation. Very friendly, would highly recommend." 
    }
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#CEEFE0] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-[#0B2538]">Trust of 2k+ members</h2>
          
          <div className="hidden sm:flex items-center text-sm shadow-sm rounded overflow-hidden">
            <div className="bg-[#0A66C2] text-white flex items-center px-2.5 py-1.5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg> 
              LinkedIn
            </div>
            <div className="bg-white text-gray-500 px-3 py-1.5 font-medium border border-gray-100 border-l-0">
              2k reviews
            </div>
          </div>
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
                className="shrink-0 w-[300px] sm:w-[320px] h-[180px] bg-white rounded-[12px] p-5 shadow-sm snap-start flex flex-col justify-between"
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
                      src="https://flagcdn.com/w20/in.png" 
                      alt="India"
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
