import React, { useEffect } from 'react';
import { useAuth } from '../contexts/Auth';
import { useAppContext } from '../App';

export default function AboutUs() {
  const { isAuthenticated } = useAuth();
  const { hideNavbar } = useAppContext();

  useEffect(() => {
    document.title = "About Us - NowScripts";
  }, []);

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-[#111928] font-sans selection:bg-now-primary/20 selection:text-now-primary w-full overflow-hidden">
      
      {/* SECTION 1 - Statement Block */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-[#FAFAFA] rounded-[1.5rem] p-8 md:p-12 lg:p-16 border border-gray-200/60 shadow-sm">
          <h1 className="text-3xl md:text-[44px] font-[800] text-black mb-12 md:mb-16 tracking-tight leading-[1.2] max-w-4xl mx-auto text-center">
            Making ServiceNow learning clear, practical, and actually understandable.
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto text-left">
            <div className="space-y-6">
              <p className="text-[15px] md:text-[16px] text-[#333333] leading-[1.8] font-medium">
                At NowScripts, we believe learning shouldn't be about deciphering dense documentation, but about understanding the core concepts that shape everyday development.
              </p>
              <p className="text-[15px] md:text-[16px] text-[#333333] leading-[1.8] font-medium">
                This belief guides how we build our platform. Through real research and hands-on learning, we distill scattered forum posts and docs into a readable format that focuses on the "why" and not just the "how".
              </p>
            </div>
            <div>
              <p className="text-[15px] md:text-[16px] text-[#333333] leading-[1.8] font-medium">
                Learning at NowScripts is structured and purposeful. By collecting real interview questions and refining practice content from multiple sources, we've engineered a straightforward path for anyone serious about mastering the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - Our Story & Timeline */}
      <section className="py-16 md:py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Our Story */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#111928] tracking-tight">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
              <p>
                I'm Kanam Ramu, founder of NowScripts.
              </p>
              <p>
                I started NowScripts to make ServiceNow learning easier to actually understand — not just to pass an exam. While researching ServiceNow concepts across scattered docs, forums, and courses, I kept running into the same problem: good information existed, but it wasn't organized in a way that was easy to follow or apply.
              </p>
              <p>
                NowScripts is my attempt to fix that — taking what I learn and researching from multiple sources, and turning it into structured roadmaps, real interview questions, and hands-on practice that's genuinely readable and easy to follow for anyone learning ServiceNow.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-[#111928] tracking-tight">Timeline</h2>
            
            <div className="relative ml-4 md:ml-2">
              {/* Vertical connecting line */}
              <div className="absolute left-[9px] top-3 bottom-0 w-[2px] bg-gray-200"></div>

              {/* Timeline Entry: 2026 */}
              <div className="relative pl-10 md:pl-12 pb-12">
                {/* Circle Marker */}
                <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-[5px] border-[#FF5A5F]"></div>
                
                <div className="text-3xl md:text-4xl font-extrabold text-[#111928] mb-5 tracking-tight">2026</div>
                <ul className="space-y-4">
                  <li className="text-lg text-gray-600 leading-relaxed font-medium flex items-start gap-3">
                    <span className="text-[#FF5A5F] mt-2.5 text-[10px]">●</span>
                    <span>NowScripts founded.</span>
                  </li>
                  <li className="text-lg text-gray-600 leading-relaxed font-medium flex items-start gap-3">
                    <span className="text-[#FF5A5F] mt-2.5 text-[10px]">●</span>
                    <span>Launched with CSA and CAD learning tracks and structured interview prep content.</span>
                  </li>
                </ul>
              </div>

              {/* Add more timeline entries here in the future following the same pattern */}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
