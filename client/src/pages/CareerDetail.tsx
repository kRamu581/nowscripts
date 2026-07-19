import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AmberFooter } from '../components/landing/amber/AmberFooter';
import { ChevronLeft } from 'lucide-react';

export default function CareerDetail() {
  const { id } = useParams();

  useEffect(() => {
    document.title = "Career Details - NowScripts";
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#333333]">
      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-12 md:pb-16 text-center border-b border-gray-100">
        <div className="flex justify-center mb-6">
          <Link to="/careers" className="inline-flex items-center text-[#FF5A5F] hover:text-[#E82C45] font-medium text-sm transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Careers
          </Link>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-[#0B2538] capitalize tracking-tight">
          {id ? id.replace(/-/g, ' ') : "Software Engineer, Intern"}
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Join us in building the ultimate platform to master ServiceNow, build real projects, and prepare for interviews.
        </p>
      </div>

      {/* 2-Column Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left Sidebar (Quick Facts) */}
        <div className="w-full md:w-1/3 flex flex-col gap-10">
          <div>
            <h3 className="font-bold text-lg mb-3 text-[#0B2538]">Team</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Engineering
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-[#0B2538]">Job Type</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Intern
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-[#0B2538]">Location</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Remote
            </p>
          </div>
          <Link 
            to={`/careers/${id}/apply`}
            className="bg-[#FF5A5F] hover:bg-[#E82C45] text-white text-center font-bold py-3 px-8 rounded shadow-sm transition-colors text-sm w-full block"
          >
            Apply Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3">
          <div className="text-[#333333] text-sm space-y-8 leading-relaxed mb-10">
            
            <section>
              <h2 className="text-xl font-bold mb-3 text-[#0B2538]">Who we are</h2>
              <h3 className="text-md font-bold mb-2">About NowScripts</h3>
              <p className="text-gray-600 mb-4">
                NowScripts is an interactive educational platform for ServiceNow professionals. Thousands of developers, administrators, and architects use NowScripts to practice on real-world simulators, build enterprise projects, and ace their certifications. Our mission is to democratize ServiceNow education and put high-quality, hands-on learning within everyone's reach.
              </p>
            </section>

            <section>
              <h3 className="text-md font-bold mb-2">About the team</h3>
              <p className="text-gray-600 mb-4">
                Our internship program will provide an opportunity to work on meaningful products that will grow the ServiceNow learning ecosystem. Through the internship, you will work with modern web technologies, gain experience in full-stack systems design, and have opportunities to present your work. Every project is part of the team's core roadmap and directly helps the NowScripts mission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-[#0B2538]">What you'll do</h2>
              <p className="text-gray-600 mb-4">
                Every internship at NowScripts centers around a real, legitimate project that our students urgently need, touching many parts of our operations and stack. We will support you in shipping it. Yes, you will actually ship it to production. As a NowScripts intern, you'll tackle important projects to increase educational access, while working alongside exceptional people who insist on doing their best work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-[#0B2538]">Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 marker:text-[#FF5A5F]">
                <li>Write software that will be used in production, with meaningful impact to NowScripts users.</li>
                <li>Give and receive technical feedback through code reviews or design discussions.</li>
                <li>Collaborate with other engineers and cross-functional stakeholders to proactively seek and incorporate feedback.</li>
                <li>Learn quickly by asking great questions, communicating effectively, and reporting the status of your work clearly.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-[#0B2538]">Who you are</h2>
              <p className="text-gray-600 mb-4">
                We're looking for someone who meets the minimum requirements to be considered for the role. If you meet these requirements, you are encouraged to apply.
              </p>
              
              <h3 className="text-md font-bold mb-2 mt-4">Minimum requirements</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 marker:text-[#FF5A5F]">
                <li>A strong fundamental understanding of computer science through pursuit of a Bachelor's, Master's, or related degree.</li>
                <li>Some experience and familiarity with programming (side projects or classwork). We work mostly in React, TypeScript, Node.js, and TailwindCSS.</li>
                <li>Experience from previous internships or multi-person projects, including open source contributions.</li>
                <li>Ability to learn unfamiliar systems independently and form an understanding of complex architectures.</li>
              </ul>

              <h3 className="text-md font-bold mb-2 mt-6">Preferred qualifications</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 marker:text-[#FF5A5F]">
                <li>At least 2 years of university education, or equivalent work experience.</li>
                <li>Knowing modern frontend technologies (React, Next.js) and how a service handles HTTP requests.</li>
                <li>Understanding of high-quality pull requests, good test coverage, and minimizing defects.</li>
                <li>Familiarity with navigating and managing work in new code bases.</li>
              </ul>
            </section>

          </div>
          
          <Link 
            to={`/careers/${id}/apply`}
            className="bg-[#FF5A5F] hover:bg-[#E82C45] text-white text-center font-bold py-3 px-8 rounded shadow-sm transition-colors text-sm w-full md:w-auto inline-block mt-4"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Similar Openings */}
      <div className="bg-[#FAFAFA] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12 text-[#0B2538] tracking-tight">Similar Openings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="font-bold text-[#0B2538] text-[17px] mb-1">ServiceNow Content Creator</h4>
                  <p className="text-gray-500 text-xs font-medium">Remote</p>
                </div>
                <span className="bg-[#4f46e5] text-white text-[9px] font-black px-2 py-1 rounded tracking-wider">REMOTE</span>
              </div>
              <Link to="/careers/servicenow-content-creator" className="text-[#4f46e5] hover:text-[#3730a3] font-bold text-[13px] transition-colors">
                View & Apply
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="font-bold text-[#0B2538] text-[17px] mb-1">Senior Frontend Engineer</h4>
                  <p className="text-gray-500 text-xs font-medium">Remote</p>
                </div>
                <span className="bg-[#4f46e5] text-white text-[9px] font-black px-2 py-1 rounded tracking-wider">REMOTE</span>
              </div>
              <Link to="/careers/senior-frontend-engineer" className="text-[#4f46e5] hover:text-[#3730a3] font-bold text-[13px] transition-colors">
                View & Apply
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <AmberFooter />
    </div>
  );
}
