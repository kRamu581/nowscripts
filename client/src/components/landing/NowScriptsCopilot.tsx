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
    { icon: <Search className="w-4 h-4 text-[#0B2538]" />, text: "I'm looking for a course" },
    { icon: <BookOpen className="w-4 h-4 text-[#FF5A3C]" />, text: "Tell me about practice labs" },
    { icon: <MessageSquare className="w-4 h-4 text-[#0B2538]" />, text: "I need interview prep help" }
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInputValue("");
    
    // Simulate bot response since API keys will be provided later
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "I'm currently in demo mode. The team is integrating my API to assist you with ServiceNow learning very soon!" 
      }]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center justify-center p-[2px] z-50 group hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(to right, #FFB800, #FF5A5F, #C92A8D)"
            }}
          >
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Abstract bot icon to mimic the screenshot */}
              <div className="grid grid-cols-2 gap-[2px] w-8 h-8 transform rotate-45 group-hover:rotate-90 transition-transform duration-500">
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-120px)] w-full max-w-[100vw] sm:max-w-[calc(100vw-32px)] bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <div className="grid grid-cols-2 gap-[1px] w-4 h-4 transform rotate-45">
                  <div className="bg-[#FFB800] rounded-tl-full rounded-bl-full" />
                  <div className="bg-[#FF5A5F] rounded-tr-full rounded-br-full" />
                  <div className="bg-[#FF5A5F] rounded-bl-full rounded-br-full" />
                  <div className="bg-[#C92A8D] rounded-tl-full rounded-tr-full" />
                </div>
                <span className="font-extrabold text-[15px] tracking-tight text-gray-900">
                  nowscripts <span className="font-bold text-gray-800 uppercase text-[13px]">Copilot</span>
                </span>
              </div>

              <div className="flex items-center gap-0.5 text-gray-500">
                <button onClick={() => setIsOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-md transition-colors hidden md:block">
                  <Minus className="w-5 h-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-md transition-colors">
                  <X className="w-5 h-5" />
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
                    className="absolute top-14 left-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl w-48 overflow-hidden z-50"
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
                backgroundColor: 'white'
              }}
            >
              <div className="p-4 flex flex-col gap-4 relative z-10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div 
                      className={`max-w-[85%] px-0 py-1 text-[14px] ${
                        msg.role === "user" 
                          ? "bg-[#FF5A3C] text-white rounded-2xl rounded-tr-sm px-4 py-2.5" 
                          : "bg-transparent text-gray-800"
                      }`}
                    >
                      {msg.role === "bot" && idx === 0 && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="grid grid-cols-2 gap-[1px] w-3 h-3 transform rotate-45">
                            <div className="bg-[#FFB800] rounded-tl-full rounded-bl-full" />
                            <div className="bg-[#FF5A5F] rounded-tr-full rounded-br-full" />
                            <div className="bg-[#FF5A5F] rounded-bl-full rounded-br-full" />
                            <div className="bg-[#C92A8D] rounded-tl-full rounded-tr-full" />
                          </div>
                          <span className="font-extrabold text-[13px] text-gray-900 tracking-tight">nowscripts <span className="uppercase font-bold">COPILOT</span></span>
                        </div>
                      )}
                      <div className={msg.role === "bot" ? "leading-relaxed text-[14.5px]" : ""}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {messages.length === 1 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-[1px] flex-1 bg-gray-200 border-dashed" />
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider">YOU MAY TRY ASKING</span>
                      <div className="h-[1px] flex-1 bg-gray-200 border-dashed" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {suggestions.map((suggestion, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleSend(suggestion.text)}
                          className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-[14px] p-3.5 hover:border-gray-300 hover:shadow-sm transition-all text-left group shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        >
                          <div className="flex items-center gap-3">
                            {suggestion.icon}
                            <span className="text-[14px] font-medium text-gray-700">{suggestion.text}</span>
                          </div>
                          <ArrowRightIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-800 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white">
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
                  className="w-full py-4 pl-4 pr-12 text-[14px] text-gray-800 outline-none placeholder:text-gray-400 bg-transparent resize-none min-h-[80px]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`absolute right-3 bottom-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                    ${inputValue.trim() 
                      ? "bg-[#FF5A3C] text-white cursor-pointer hover:bg-[#E04B2F]" 
                      : "bg-[#D1D5DB] text-white cursor-not-allowed"
                    }
                  `}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
