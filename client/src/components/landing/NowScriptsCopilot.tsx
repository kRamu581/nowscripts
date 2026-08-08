import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Send, Search, BookOpen, MessageSquare, MoreHorizontal, Plus, Clock } from "lucide-react";
import { BrandLogo } from "../BrandLogo";

export const NowScriptsCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage = {
    role: "bot" as const,
    content: "Hi there! 👋 I'm NowScripts Copilot — your ServiceNow learning assistant. Tell me what you're looking for, and I'll help you get there."
  };

  const [messages, setMessages] = useState<{ role: "bot" | "user", content: string }[]>([initialMessage]);

  const handleNewChat = () => {
    setMessages([initialMessage]);
    setInputValue("");
    setIsMenuOpen(false);
  };

  const suggestions = [
    { icon: <Search className="w-4 h-4 text-blue-500" />, text: "I'm looking for a course" },
    { icon: <BookOpen className="w-4 h-4 text-emerald-500" />, text: "Tell me about practice labs" },
    { icon: <MessageSquare className="w-4 h-4 text-gray-700" />, text: "I need interview prep help" }
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInputValue("");
    
    setTimeout(() => {
      const msg = text.toLowerCase();
      let response = "I'm NowScripts Copilot. How can I help you with ServiceNow today?";
      
      if (msg.includes("course") || msg.includes("learn") || msg.includes("study")) {
        response = "We have several great courses on ServiceNow! Check out our platform to get started and master the ecosystem.";
      } else if (msg.includes("interview") || msg.includes("prep")) {
        response = "For interview preparation, we have mock interviews, common questions, and a Doubt Solver ready for you!";
      } else if (msg.includes("project")) {
        response = "Projects are the best way to learn. You can find real-world ServiceNow scenarios in our Projects section to build your portfolio.";
      } else if (msg.includes("roadmap") || msg.includes("path")) {
        response = "I can help you build a personalized learning path! Just go to the Roadmap Builder and tell me your goals.";
      } else {
        response = "That's an interesting question! While I'm currently in demo mode, our team is integrating my full brain soon to answer all your ServiceNow questions.";
      }
      
      setMessages(prev => [...prev, { role: "bot", content: response }]);
    }, 800);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Reset chat when window closes
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setMessages([initialMessage]);
        setInputValue("");
        setIsMenuOpen(false);
      }, 300); // Wait for exit animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center justify-center p-[2px] z-50 group hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(to right, #FFB800, #FF5A5F, #C92A8D)"
            }}
          >
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Abstract bot icon to mimic the screenshot */}
              <div className="grid grid-cols-2 gap-[2px] w-6 h-6 md:w-7 md:h-7 transform rotate-45 group-hover:rotate-90 transition-transform duration-500">
                <div className="bg-[#FFB800] rounded-tl-full rounded-bl-full" />
                <div className="bg-[#FF5A5F] rounded-tr-full rounded-br-full" />
                <div className="bg-[#FF5A5F] rounded-bl-full rounded-br-full" />
                <div className="bg-[#C92A8D] rounded-tl-full rounded-tr-full" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:bottom-0 sm:w-[400px] w-full bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] flex flex-col z-[100]"
          >
            {/* Header */}
            <div className="relative px-4 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-20">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-1 -ml-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <div className="grid grid-cols-2 gap-[1px] w-[18px] h-[18px] transform rotate-45">
                  <div className="bg-[#FFB800] rounded-tl-full rounded-bl-full" />
                  <div className="bg-[#FF5A5F] rounded-tr-full rounded-br-full" />
                  <div className="bg-[#FF5A5F] rounded-bl-full rounded-br-full" />
                  <div className="bg-[#C92A8D] rounded-tl-full rounded-tr-full" />
                </div>
                <span className="font-extrabold text-[15px] tracking-tight text-gray-900">
                  nowscripts <span className="font-bold text-gray-800 uppercase text-[13px]">COPILOT</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <button onClick={() => setIsOpen(false)} className="hover:bg-gray-100 p-1 rounded transition-colors hidden md:block">
                  <Minus className="w-6 h-6" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-gray-100 p-1 rounded transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  <div className="absolute inset-0 z-40 bg-transparent" onClick={() => setIsMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl w-48 overflow-hidden z-50"
                  >
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors text-left" 
                      onClick={handleNewChat}
                    >
                      <Plus className="w-4 h-4" /> New Chat
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors border-t border-gray-50 text-left" onClick={() => setIsMenuOpen(false)}>
                      <Clock className="w-4 h-4" /> Chat History
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Chat Area */}
            <div 
              className="flex-1 overflow-y-auto flex flex-col relative"
              style={{
                backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 0)',
                backgroundSize: '20px 20px',
                backgroundColor: '#FAFAFA' // Slightly off-white background
              }}
            >
              <div className="p-4 flex flex-col gap-4 relative z-10 min-h-full">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div 
                      className={`max-w-[90%] px-0 py-1 text-[14px] ${
                        msg.role === "user" 
                          ? "bg-[#FF5A3C] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm" 
                          : "bg-transparent text-gray-800"
                      }`}
                    >
                      {msg.role === "bot" && idx === 0 && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="grid grid-cols-2 gap-[1px] w-3.5 h-3.5 transform rotate-45">
                            <div className="bg-[#FFB800] rounded-tl-full rounded-bl-full" />
                            <div className="bg-[#FF5A5F] rounded-tr-full rounded-br-full" />
                            <div className="bg-[#FF5A5F] rounded-bl-full rounded-br-full" />
                            <div className="bg-[#C92A8D] rounded-tl-full rounded-tr-full" />
                          </div>
                          <span className="font-extrabold text-[14px] text-gray-900 tracking-tight">nowscripts <span className="uppercase font-bold">COPILOT</span></span>
                        </div>
                      )}
                      <div className={msg.role === "bot" ? "leading-relaxed text-[14px] text-gray-700" : ""}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {messages.length === 1 && (
                  <div className="mt-6 mb-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-[1px] flex-1 bg-gray-200 border-dashed" />
                      <span className="text-[11px] font-bold text-gray-400 tracking-widest">YOU MAY TRY ASKING</span>
                      <div className="h-[1px] flex-1 bg-gray-200 border-dashed" />
                    </div>
                    
                    <div className="flex flex-col gap-2 px-2 sm:px-6">
                      {suggestions.map((suggestion, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleSend(suggestion.text)}
                          className="flex items-center justify-between w-full bg-white border border-gray-100 rounded-xl py-3 px-4 hover:border-gray-300 hover:shadow-sm transition-all text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center">
                                {suggestion.icon}
                            </div>
                            <span className="text-[14px] font-medium text-gray-700">{suggestion.text}</span>
                          </div>
                          <ArrowRightIcon className="w-4 h-4 text-gray-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#FAFAFA]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative rounded-[20px] border border-[#FF5A5F]/40 overflow-hidden focus-within:border-[#FF5A5F] transition-colors bg-white shadow-sm"
              >
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder="Ask Anything..."
                  className="w-full py-4 pl-4 pr-12 text-[14px] text-gray-800 outline-none placeholder:text-gray-400 bg-transparent resize-none min-h-[90px]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`absolute right-3 bottom-3 w-8 h-8 rounded-[10px] flex items-center justify-center transition-colors
                    ${inputValue.trim() 
                      ? "bg-gray-800 text-white cursor-pointer hover:bg-black" 
                      : "bg-[#CBD5E1] text-white cursor-not-allowed"
                    }
                  `}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper icon component for the suggestion arrow
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
