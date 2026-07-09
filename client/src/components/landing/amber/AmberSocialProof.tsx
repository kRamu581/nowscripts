import { Star } from "lucide-react";

export function AmberSocialProof() {
  // Mock data as a placeholder state until real testimonials exist.
  const testimonials = [
    { name: "[Example] Sarah", role: "ServiceNow Developer", company: "Tech Corp", initials: "SA", text: "[EXAMPLE FORMAT ONLY] NowScripts helped me pass my CSA exam in just 3 weeks. The practice labs were exactly what I needed!" },
    { name: "[Example] David", role: "System Admin", company: "Enterprise LLC", initials: "DA", text: "[EXAMPLE FORMAT ONLY] The interview questions provided here were identical to the ones I faced. Landed the job!" },
    { name: "[Example] Alex", role: "Technical Architect", company: "Global Solutions", initials: "AL", text: "[EXAMPLE FORMAT ONLY] A great resource for refreshing advanced concepts before big client implementations." },
    { name: "[Example] Emily", role: "ITSM Consultant", company: "Advisory Partners", initials: "EM", text: "[EXAMPLE FORMAT ONLY] Highly recommend the practice labs. Setting up a dev instance and following the structured tasks was a game-changer." }
  ];

  return (
    <section className="py-16 bg-[#e6f7ec]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900">Trust of Our Students</h2>
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold border border-gray-100">
            <Star className="w-4 h-4 fill-green-500 text-green-500" />
            <span className="text-gray-900">Real Reviews Coming Soon</span>
          </div>
        </div>

        {/* Scrollable Testimonials Grid */}
        <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((test, idx) => (
            <div 
              key={idx}
              className="shrink-0 w-[300px] sm:w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-green-50 snap-start flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium line-clamp-4">
                  "{test.text}"
                </p>
                <button className="text-green-600 font-bold text-sm mt-2 hover:underline">Read More</button>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{test.name}</h4>
                  <div className="text-xs text-gray-500 font-medium">
                    {test.role} • {test.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
