import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

export function FAQSectionV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is ServiceNow?",
      a: "ServiceNow is a cloud-based workflow automation platform that helps enterprises manage digital workflows for enterprise operations. It is widely used for IT Service Management (ITSM), HR, and Customer Service."
    },
    {
      q: "How do I start learning ServiceNow?",
      a: "The best way to start is by following our 'Fundamentals' roadmap. You'll begin by getting a free Personal Developer Instance (PDI) and learning the platform basics before moving to scripting and advanced administration."
    },
    {
      q: "Do I need coding knowledge?",
      a: "No! ServiceNow is a low-code/no-code platform. You can achieve the CSA (System Administrator) certification with zero coding experience. However, JavaScript is required if you wish to pursue the Developer (CAD) track."
    },
    {
      q: "How long does CSA preparation take?",
      a: "On average, a beginner can prepare for the Certified System Administrator (CSA) exam in 4 to 6 weeks by studying 1-2 hours a day using our structured modules and practice projects."
    },
    {
      q: "How do certifications work?",
      a: "ServiceNow certifications are official credentials validating your expertise. You must complete the required prerequisite courses on NowLearning, obtain a voucher, and pass a proctored Webassessor exam."
    },
    {
      q: "Can beginners use NowScripts?",
      a: "Absolutely. NowScripts is designed specifically to take you from absolute zero to career-ready. We break down complex concepts into bite-sized, practical lessons."
    }
  ];

  return (
    <section className="py-32 bg-gray-50 relative border-b border-gray-100 overflow-hidden">
      {/* SaaS subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-sm font-bold mb-6"
          >
            <MessageCircleQuestion className="w-4 h-4 text-now-primary" /> Support Center
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about starting your ServiceNow journey. Can't find the answer you're looking for? <a href="#" className="text-now-primary hover:underline">Chat with our team</a>.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-now-primary/30 shadow-md ring-4 ring-now-primary/5' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-now-primary"
                >
                  <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-800'}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-now-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-gray-600 leading-relaxed font-medium border-t border-gray-100 pt-6 mt-2 mx-6 md:mx-8">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
