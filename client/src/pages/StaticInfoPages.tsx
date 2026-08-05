import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, HelpCircle, Search, Mail, BookOpen, AlertCircle, ChevronRight, User, Settings, CreditCard, Rocket, MessageSquare, MapPin, Phone, Send, Zap, Target } from 'lucide-react';
import { AmberFooter } from '../components/landing/amber/AmberFooter';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

function PageLayout({ title, description, icon, lastUpdated, canonicalUrl, schema, children }: { title: string, description: string, icon: React.ReactNode, lastUpdated?: string, canonicalUrl?: string, schema?: any[], children: React.ReactNode }) {
  React.useEffect(() => {
    document.title = `${title} - NowScripts`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans selection:bg-black selection:text-white">
      {canonicalUrl && (
        <SEO 
          title={`${title} | NowScripts`}
          description={description}
          canonicalUrl={canonicalUrl}
          schema={schema}
        />
      )}
      {/* Premium Header Banner */}
      <div className="bg-white border-b border-gray-200/60 pt-6 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto mb-8">
          <Breadcrumbs />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF338D] via-[#C557F8] to-[#4353ED]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#C557F8]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-[#4353ED]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center justify-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-black shadow-sm mb-6">
              {icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-black tracking-tight mb-4 leading-tight">{title}</h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">{description}</p>
          </div>
          {lastUpdated && (
            <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-500">
              Last updated: {lastUpdated}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </div>
      
      <AmberFooter />
    </div>
  );
}

export function HelpCenter() {
  return (
    <PageLayout 
      title="Help Center" 
      description="Everything you need to know about using NowScripts, managing your account, and getting the most out of your learning journey."
      icon={<HelpCircle size={28} strokeWidth={2} />} 
    >
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto -mt-20 mb-16 z-20">
        <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center">
          <Search className="text-gray-400 ml-4 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className="w-full py-4 px-4 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-black placeholder:text-gray-400"
          />
          <button className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-bold text-black mb-8 text-center">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Getting Started", icon: <BookOpen className="w-6 h-6" />, desc: "Learn the basics and set up your workspace." },
          { title: "Account & Profile", icon: <User className="w-6 h-6" />, desc: "Manage your details, password, and settings." },
          { title: "Billing & Plans", icon: <CreditCard className="w-6 h-6" />, desc: "Information about subscriptions and payments." }
        ].map((cat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-gray-50 text-black rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-3">{cat.title}</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">{cat.desc}</p>
            <div className="flex items-center text-sm font-bold text-black">
              View Articles <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-black mb-8">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {[
            { q: "How do I reset my password?", a: "If you've forgotten your password, click on the 'Login' button and select 'Forgot Password'. Follow the instructions sent to your email address to reset it safely." },
            { q: "Are the labs really 100% free?", a: "Yes! We believe in accessible education. Our practice instances and labs are completely free and available to all registered users." },
            { q: "How do I track my roadmap progress?", a: "Once you are logged in, navigate to the 'Roadmaps' section from the top menu. Your progress is automatically saved as you complete each module." }
          ].map((faq, i) => (
            <div key={i} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
              <h4 className="text-lg font-bold text-black mb-3 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-gray-300 flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-gray-600 pl-9 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-black rounded-3xl p-10 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF338D]/20 to-[#C557F8]/20 rounded-full blur-3xl pointer-events-none"></div>
        <Mail className="w-10 h-10 mx-auto mb-6 text-gray-300" />
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg">If you couldn't find what you were looking for, our support team is ready to help you out.</p>
        <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
          Contact Support
        </button>
      </div>
    </PageLayout>
  );
}

const LegalContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col lg:flex-row gap-12 relative">
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hidden lg:block">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Navigation</h4>
        <nav className="space-y-3 text-sm font-medium">
          <a href="#1" className="block text-black hover:text-[#C557F8] transition-colors">1. Introduction</a>
          <a href="#2" className="block text-gray-500 hover:text-[#C557F8] transition-colors">2. User Accounts</a>
          <a href="#3" className="block text-gray-500 hover:text-[#C557F8] transition-colors">3. Use of Service</a>
          <a href="#4" className="block text-gray-500 hover:text-[#C557F8] transition-colors">4. Data & Privacy</a>
          <a href="#5" className="block text-gray-500 hover:text-[#C557F8] transition-colors">5. Contact Us</a>
        </nav>
      </div>
    </div>
    
    <div className="flex-1 bg-white p-10 md:p-14 rounded-3xl border border-gray-100 shadow-sm prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600">
      {children}
    </div>
  </div>
);

export function Terms() {
  return (
    <PageLayout 
      title="Terms & Conditions" 
      description="Please read these terms carefully before using our platform. They establish the rules and guidelines for our community."
      icon={<FileText size={28} strokeWidth={2} />} 
      lastUpdated="July 10, 2026"
    >
      <LegalContent>
        <h2 id="1">1. Acceptance of Terms</h2>
        <p>By accessing and using NowScripts, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform. We reserve the right to modify these terms at any time.</p>
        
        <h2 id="2">2. User Accounts</h2>
        <p>To access certain features, you must create an account. You are responsible for:</p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Notifying us immediately of any unauthorized use.</li>
        </ul>
        
        <h2 id="3">3. Educational Use</h2>
        <p>The content provided on NowScripts, including all ServiceNow training materials, projects, and interview questions, is for educational purposes only. NowScripts is not officially affiliated with ServiceNow, Inc. We do not guarantee employment or specific career outcomes.</p>
        
        <h2 id="4">4. Intellectual Property</h2>
        <p>All original content, features, and functionality are and will remain the exclusive property of NowScripts and its licensors. You may not reproduce, distribute, or create derivative works without explicit permission from our legal team.</p>
        
        <h2 id="5">5. Limitation of Liability</h2>
        <p>NowScripts provides materials "as is". We make no warranties regarding the accuracy, completeness, or reliability of the content. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
      </LegalContent>
    </PageLayout>
  );
}

export function Privacy() {
  return (
    <PageLayout 
      title="Privacy Policy" 
      description="We respect your privacy. Here is a clear explanation of what data we collect, why we collect it, and how we protect it."
      icon={<Shield size={28} strokeWidth={2} />} 
      lastUpdated="July 10, 2026"
    >
      <LegalContent>
        <h2 id="1">1. Introduction</h2>
        <p>At NowScripts, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. We are committed to ensuring that your information is secure.</p>
        
        <h2 id="2">2. Information We Collect</h2>
        <p>We may collect the following types of information when you interact with our application:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and profile details provided during registration.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our platform, including progress tracking and quiz scores.</li>
          <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
        </ul>
        
        <h2 id="3">3. How We Use Your Information</h2>
        <p>Your information is used strictly to enhance your experience:</p>
        <ul>
          <li>Provide, maintain, and improve our services.</li>
          <li>Personalize your learning experience and track your roadmap progress.</li>
          <li>Communicate with you regarding updates, support, and promotional offers.</li>
        </ul>
        
        <h2 id="4">4. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure. We use encrypted databases and secure routing to ensure data integrity.</p>

        <h2 id="5">5. Contact Us</h2>
        <p>If you have any questions or concerns about our privacy practices, please contact our Data Protection Officer at privacy@nowscripts.com.</p>
      </LegalContent>
    </PageLayout>
  );
}

export function HowItWorks() {
  return (
    <PageLayout 
      title="How it Works" 
      description="Your journey to mastering ServiceNow starts here. Discover how our platform accelerates your career."
      icon={<Rocket size={28} strokeWidth={2} />}
    >
      {/* Credibility Line */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-black mb-3">Built for the real world</h2>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              "I built NowScripts because I've gone through the ServiceNow learning curve myself. I know exactly how overwhelming the official documentation can be, which concepts actually come up in technical interviews, and what it takes to succeed on real enterprise projects."
            </p>
            <p className="text-gray-900 font-bold mt-4">— Kanam Ramu, Founder</p>
          </div>
        </div>
      </div>

      {/* Deepened 4 Steps */}
      <div className="space-y-8 mb-16">
        <h2 className="text-3xl font-bold text-black mb-6 px-2">The Learning Blueprint</h2>
        {[
          {
            step: "01",
            title: "Choose Your Path",
            desc: "Select a specialized roadmap tailored to your career goals—Admin, Developer, or Architect. Jumping straight into scripting without understanding the fundamentals first is the most common mistake self-taught learners make; a structured path saves time and builds concepts that actually stick.",
            icon: <Target className="w-8 h-8 text-[#FF338D]" />
          },
          {
            step: "02",
            title: "Learn & Practice",
            desc: "Dive into comprehensive modules that respect your time. We skip the rarely-used filler and focus entirely on the core concepts and real-world configurations that you will actually use on the job.",
            icon: <BookOpen className="w-8 h-8 text-[#C557F8]" />
          },
          {
            step: "03",
            title: "Build Real Projects",
            desc: "Apply your knowledge by building end-to-end ServiceNow applications. Theory alone won't pass a technical interview—hiring managers want to see that you've navigated the platform, built integrations, and solved real business problems.",
            icon: <Zap className="w-8 h-8 text-[#4353ED]" />
          },
          {
            step: "04",
            title: "Ace the Interview",
            desc: "Use our AI-powered interview prep to practice real-world scenarios. Knowing ServiceNow is only half the battle; knowing how to clearly communicate your solutions to an interviewer is what actually gets you the offer.",
            icon: <MessageSquare className="w-8 h-8 text-black" />
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center relative">
              <span className="absolute -top-3 -left-3 text-sm font-black text-white bg-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg">{item.step}</span>
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black mb-3">{item.title}</h3>
              <p className="text-gray-600 text-[17px] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Audience Aware Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-black mb-8 px-2">Whether You're Starting Out or Switching In</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">For IT Students</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              If you're early in your career, the ServiceNow ecosystem can feel like a maze. We focus on building a remarkably strong foundation before your first job. We help you understand what a ServiceNow career actually looks like and prevent the common trap of jumping into advanced scripting before you understand platform administration.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">For Working Professionals</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              If you're pivoting from another IT domain, you don't have time to waste. Our structured learning respects your limited time by cutting through the noise. We focus strictly on what's actually asked in enterprise interviews and used in real production environments, rather than attempting to cover every obscure feature the platform offers.
            </p>
          </div>
        </div>
      </div>

      {/* Honesty & Curation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#FF338D]" />
            <h3 className="text-2xl font-bold">Can you learn this on your own?</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Honestly? Yes, you can. The official docs are free. But self-study is often much slower because it suffers from a lack of structure:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF338D] mt-1 flex-shrink-0" />
              <span>Studying from too many scattered, outdated sources.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF338D] mt-1 flex-shrink-0" />
              <span>Not knowing the correct sequence to learn concepts.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF338D] mt-1 flex-shrink-0" />
              <span>Spending weeks on rarely-used topics instead of core configuration.</span>
            </li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed mt-4">
            NowScripts is the structured, time-saving solution to these exact problems.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#4353ED]" />
            <h3 className="text-2xl font-bold text-black">Learn What Actually Matters</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            ServiceNow has thousands of APIs, GlideRecord methods, and obscure UI configurations. But in reality, only a specific subset of these are commonly used in daily enterprise projects and frequently asked in technical interviews.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Our content curation acts as a filter. We prioritize the high-value, high-frequency topics so that when you sit down for an interview, you're discussing the exact concepts the hiring manager deals with every day.
          </p>
        </div>
      </div>

      <div className="mt-20 bg-gradient-to-r from-[#FF338D] via-[#C557F8] to-[#4353ED] p-1 rounded-3xl">
        <div className="bg-white rounded-[22px] p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to accelerate your career?</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">Join thousands of developers who are building their future with NowScripts.</p>
          <Link to="/learn" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl text-lg">
            Start Learning for Free
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

export function Contact() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nowscripts.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://www.nowscripts.in/contact"
      }
    ]
  };

  return (
    <PageLayout 
      title="Contact Us" 
      description="Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      icon={<Mail size={28} strokeWidth={2} />}
      canonicalUrl="https://www.nowscripts.in/contact"
      schema={[
        breadcrumbSchema,
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact NowScripts",
          "description": "Have a question or want to work together? We'd love to hear from you.",
          "url": "https://www.nowscripts.in/contact"
        }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-12 mt-4">
        
        {/* Contact Form */}
        <div className="flex-1 bg-white p-10 md:p-12 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF338D]/5 to-[#C557F8]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold text-black mb-8 relative z-10">Send a Message</h3>
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C557F8]/50 focus:border-[#C557F8] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C557F8]/50 focus:border-[#C557F8] transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C557F8]/50 focus:border-[#C557F8] transition-all" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subject</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C557F8]/50 focus:border-[#C557F8] transition-all text-gray-700 appearance-none">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message</label>
              <textarea rows={5} placeholder="How can we help you?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C557F8]/50 focus:border-[#C557F8] transition-all resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-black text-white font-bold rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
        
        {/* Contact Info Cards */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gray-50 text-black rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-black text-lg mb-1">Email Us</h4>
            <p className="text-gray-500 text-sm mb-3">Our friendly team is here to help.</p>
            <a href="mailto:hello@nowscripts.com" className="font-bold text-[#C557F8] hover:underline">hello@nowscripts.com</a>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gray-50 text-black rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-black text-lg mb-1">Visit Us</h4>
            <p className="text-gray-500 text-sm mb-3">Come say hello at our HQ.</p>
            <p className="font-bold text-gray-800">100 Tech Hub Blvd.<br />San Francisco, CA 94107</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gray-50 text-black rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-black text-lg mb-1">Call Us</h4>
            <p className="text-gray-500 text-sm mb-3">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+15551234567" className="font-bold text-[#C557F8] hover:underline">+1 (555) 123-4567</a>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
