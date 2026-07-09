import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Target, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
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
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-now-primary"></span>
            Where ServiceNow Developers Connect
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#111928] mb-8 tracking-tight leading-[1.1]">
            Empowering the next generation of <span className="text-now-primary">ServiceNow</span> experts.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto mb-10">
            The premium learning platform built by developers, for developers. Master the ecosystem and accelerate your career.
          </p>
        </div>
      </section>

      {/* 2. SPLIT-SCREEN MISSION SECTION (Amber-like) */}
      <section className="py-24 px-6 lg:px-8 relative z-10 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#111928] tracking-tight">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We help ServiceNow professionals master the platform through structured learning paths, real-world projects, interview preparation, and a thriving developer community.
            </p>
            <ul className="space-y-4">
              {[
                "Prepare for CSA, CAD, or CIS certifications",
                "Level up from Administrator to Developer",
                "Learn enterprise best practices and architecture"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-now-primary/10 rounded-full p-0.5">
                    <CheckCircle2 className="w-5 h-5 text-now-primary" />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-[2rem] bg-white p-12 overflow-hidden shadow-lg border border-gray-100">
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-now-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-now-primary" />
                    </div>
                    <div>
                      <h4 className="text-[#111928] font-bold text-lg">Goal-Oriented</h4>
                      <p className="text-gray-500 text-sm font-medium">Focus on practical outcomes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 ml-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-[#111928]/5 flex items-center justify-center">
                      <Code className="w-6 h-6 text-[#111928]" />
                    </div>
                    <div>
                      <h4 className="text-[#111928] font-bold text-lg">Code-First</h4>
                      <p className="text-gray-500 text-sm font-medium">Learn by building real apps</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-now-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-now-primary" />
                    </div>
                    <div>
                      <h4 className="text-[#111928] font-bold text-lg">Community-Driven</h4>
                      <p className="text-gray-500 text-sm font-medium">Grow together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE OFFER */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#111928] tracking-tight">What We Offer</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">Everything you need to accelerate your ServiceNow journey, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[2rem] hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <BookOpen className="w-8 h-8 text-[#111928]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111928] mb-4">Structured Courses</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Step-by-step lessons from Administration basics to advanced development and architecture.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[2rem] hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Code className="w-8 h-8 text-[#111928]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111928] mb-4">Real-World Projects</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Hands-on projects that mirror real ServiceNow enterprise implementations.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[2rem] hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Target className="w-8 h-8 text-[#111928]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111928] mb-4">Interview Prep</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Curated questions and answers to ace your ServiceNow technical interviews.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[2rem] hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Users className="w-8 h-8 text-[#111928]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111928] mb-4">Developer Community</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Connect, share, and grow with fellow ServiceNow professionals globally.
            </p>
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION (High contrast promotional) */}
      <section className="my-24 mx-6 lg:mx-auto max-w-7xl bg-[#111928] rounded-[3rem] py-20 px-6 lg:px-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">30+</div>
            <div className="text-now-primary font-bold tracking-widest uppercase text-sm">Interactive Lessons</div>
          </div>
          <div className="hidden md:block w-px h-24 bg-white/10"></div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">100<span className="text-now-primary">%</span></div>
            <div className="text-now-primary font-bold tracking-widest uppercase text-sm">Free to Learn</div>
          </div>
          <div className="hidden md:block w-px h-24 bg-white/10"></div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">1</div>
            <div className="text-now-primary font-bold tracking-widest uppercase text-sm">Global Community</div>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA SECTION */}
      <section className="py-24 px-6 lg:px-8 text-center relative z-10 mb-12 bg-white">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111928] mb-8 tracking-tight">
            Ready to level up your career?
          </h2>
          <p className="text-xl text-gray-500 mb-12 font-medium">Join thousands of developers building the future on ServiceNow.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/learn"
              className="w-full sm:w-auto px-8 py-4 bg-now-primary text-white font-bold rounded-full hover:bg-now-accent transition-all shadow-md flex items-center justify-center gap-2 text-lg"
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/community"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#111928] font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 text-lg"
              >
                Go to Community
              </Link>
            ) : (
              <Link 
                to="/sign-in"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#111928] font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 text-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
