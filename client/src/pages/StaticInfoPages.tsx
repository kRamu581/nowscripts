import React from 'react';
import { Shield, FileText, HelpCircle, Briefcase } from 'lucide-react';

function PageLayout({ title, icon, lastUpdated, children }: { title: string, icon: React.ReactNode, lastUpdated: string, children: React.ReactNode }) {
  React.useEffect(() => {
    document.title = `${title} - NowScripts`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-24 pb-20 font-sans selection:bg-[#FF5A5F] selection:text-white">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-16 px-4 mb-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#FF5A5F]/10 text-[#FF5A5F] rounded-2xl flex items-center justify-center mb-6">
            {icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#333333] tracking-tight mb-4">{title}</h1>
          <p className="text-gray-500 font-medium">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm prose prose-gray max-w-none prose-headings:text-[#333333] prose-headings:font-bold prose-a:text-[#FF5A5F] prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </div>
    </div>
  );
}

export function HelpCenter() {
  return (
    <PageLayout title="Help Center" icon={<HelpCircle size={32} strokeWidth={2.5} />} lastUpdated="July 15, 2026">
      <h2>How can we help you?</h2>
      <p>Welcome to the NowScripts Help Center. Whether you're looking for answers about your account, billing, or how to get the most out of our ServiceNow learning tracks, you're in the right place.</p>
      
      <h3>Frequently Asked Questions</h3>
      <h4>How do I reset my password?</h4>
      <p>If you've forgotten your password, click on the "Login" button and select "Forgot Password". Follow the instructions sent to your email address to reset it safely.</p>
      
      <h4>Are the labs really 100% free?</h4>
      <p>Yes! We believe in accessible education. Our practice instances and labs are completely free and available to all registered users.</p>
      
      <h4>How do I track my roadmap progress?</h4>
      <p>Once you are logged in, navigate to the "Roadmaps" section from the top menu. Your progress is automatically saved as you complete each module.</p>
      
      <h3>Still need help?</h3>
      <p>If you couldn't find what you were looking for, please don't hesitate to contact our support team at <a href="mailto:support@nowscripts.com">support@nowscripts.com</a>.</p>
    </PageLayout>
  );
}

export function Terms() {
  return (
    <PageLayout title="Terms & Conditions" icon={<FileText size={32} strokeWidth={2.5} />} lastUpdated="July 10, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using NowScripts, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.</p>
      
      <h2>2. User Accounts</h2>
      <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      
      <h2>3. Educational Use</h2>
      <p>The content provided on NowScripts, including all ServiceNow training materials, projects, and interview questions, is for educational purposes only. NowScripts is not officially affiliated with ServiceNow, Inc.</p>
      
      <h2>4. Intellectual Property</h2>
      <p>All original content, features, and functionality are and will remain the exclusive property of NowScripts and its licensors. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
      
      <h2>5. Limitation of Liability</h2>
      <p>NowScripts provides materials "as is". We make no warranties regarding the accuracy, completeness, or reliability of the content. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
    </PageLayout>
  );
}

export function Privacy() {
  return (
    <PageLayout title="Privacy Policy" icon={<Shield size={32} strokeWidth={2.5} />} lastUpdated="July 10, 2026">
      <h2>Introduction</h2>
      <p>At NowScripts, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.</p>
      
      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, and profile details provided during registration.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including progress tracking and quiz scores.</li>
        <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>Your information is used to:</p>
      <ul>
        <li>Provide, maintain, and improve our services.</li>
        <li>Personalize your learning experience and track your roadmap progress.</li>
        <li>Communicate with you regarding updates, support, and promotional offers.</li>
      </ul>
      
      <h2>Data Security</h2>
      <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
    </PageLayout>
  );
}

export function Careers() {
  return (
    <PageLayout title="Careers" icon={<Briefcase size={32} strokeWidth={2.5} />} lastUpdated="July 1, 2026">
      <h2>Join the NowScripts Team</h2>
      <p>We're on a mission to democratize ServiceNow education and help thousands of professionals advance their careers. If you're passionate about tech education and building amazing products, we'd love to hear from you!</p>
      
      <h3>Open Positions</h3>
      
      <div className="border border-gray-200 rounded-xl p-6 my-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="m-0 text-xl text-[#333333]">Senior Frontend Engineer</h4>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Remote</span>
        </div>
        <p className="text-gray-500 m-0 mb-4 text-sm">React, TypeScript, TailwindCSS</p>
        <p className="text-sm">Help us build the next generation of our interactive learning platform and certification simulators.</p>
        <button className="mt-4 text-[#FF5A5F] font-bold text-sm hover:underline">Apply Now &rarr;</button>
      </div>
      
      <div className="border border-gray-200 rounded-xl p-6 my-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="m-0 text-xl text-[#333333]">ServiceNow Content Creator</h4>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Hybrid</span>
        </div>
        <p className="text-gray-500 m-0 mb-4 text-sm">ITSM, CMDB, Technical Writing</p>
        <p className="text-sm">Design engaging curriculum, realistic lab scenarios, and up-to-date interview questions for our students.</p>
        <button className="mt-4 text-[#FF5A5F] font-bold text-sm hover:underline">Apply Now &rarr;</button>
      </div>
      
      <h3>Why NowScripts?</h3>
      <ul>
        <li>Competitive salary and equity options</li>
        <li>Flexible remote work policy</li>
        <li>Comprehensive health, dental, and vision insurance</li>
        <li>Continuous learning budget and free access to all platform resources</li>
      </ul>
    </PageLayout>
  );
}
