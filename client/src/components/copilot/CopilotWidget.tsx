import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { url } from "../../baseUrl";
import { MessageCircle, X, Send, User as UserIcon, Bot, Loader2, Minus, MoreHorizontal, Search, Home, MessageSquare, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { BrandIconOnly } from "../BrandLogo";

export const CopilotWidget = () => {
  const { isAuthenticated, AuthToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenCopilot = () => setIsOpen(true);
    window.addEventListener('open-copilot', handleOpenCopilot);
    return () => window.removeEventListener('open-copilot', handleOpenCopilot);
  }, []);

  useEffect(() => {
    if (isOpen && !conversationId) {
      setConversationId(Math.random().toString(36).substring(7));
      // We'll manage the initial greeting visually in the UI rather than as a chat message
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isAuthenticated) return null;

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim()) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: textToSend }]);
    setIsTyping(true);

    try {
      const response = await fetch(`${url}/api/copilot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AuthToken}`
        },
        body: JSON.stringify({
          message: textToSend,
          conversationId,
          history: messages,
          pageContext: window.location.pathname
        })
      });

      if (response.ok && response.headers.get("content-type")?.includes("text/event-stream")) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        
        let modelMessage = "";
        setMessages(prev => [...prev, { role: "model", content: "" }]);
        
        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.substring(6);
              if (dataStr === "[DONE]") break;
              try {
                const data = JSON.parse(dataStr);
                if (data.text) {
                  modelMessage += data.text;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelMessage;
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Error parsing stream chunk:", e);
              }
            }
          }
        }
      } else {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "model", content: data.response || "Sorry, an error occurred." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", content: "Failed to connect to Copilot. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-now-primary text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-105 transition-transform z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open NowScripts Copilot"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed top-4 bottom-4 right-4 w-[400px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden z-50 flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
          
          {/* Header */}
          <div className="bg-white px-5 py-4 flex items-center justify-between shrink-0">
            <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
              <MoreHorizontal size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5">
                 <BrandIconOnly className="w-full h-full" />
              </div>
              <h3 className="font-bold text-gray-800 tracking-tight"><span className="text-now-primary">nowscripts</span> COPILOT</h3>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-800 focus:outline-none transition-colors">
                <Minus size={20} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-800 focus:outline-none transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white flex flex-col relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
               style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', backgroundPosition: 'center top' }}>
            
            {messages.length === 0 && (
              <div className="relative z-10 pt-2 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5">
                    <BrandIconOnly className="w-full h-full" />
                  </div>
                  <h3 className="font-bold text-[13px] text-gray-800 tracking-tight uppercase"><span className="text-now-primary lowercase">nowscripts</span> COPILOT</h3>
                </div>
                
                <p className="text-gray-800 text-[14px] leading-relaxed">
                  Hi there! 👋 I'm NowScripts Copilot — your ServiceNow learning assistant. Tell me what you're looking for, and I'll help you get there.
                </p>

                <div className="my-8 text-center relative flex justify-center">
                   <span className="px-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                     You May Try Asking
                   </span>
                </div>

                <div className="space-y-3">
                  <button onClick={() => handleSend("I'm looking for a course")} className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all text-left group">
                    <div className="flex items-center gap-3">
                      <Search className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium text-[14px]">I'm looking for a course</span>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-gray-800 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <button onClick={() => handleSend("Tell me about practice labs")} className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all text-left group">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium text-[14px]">Tell me about practice labs</span>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-gray-800 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <button onClick={() => handleSend("I need interview prep help")} className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all text-left group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium text-[14px]">I need interview prep help</span>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-gray-800 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 relative z-10 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-gray-100" : "bg-now-primary/10 text-now-primary"}`}>
                  {msg.role === "user" ? <UserIcon size={16} className="text-gray-600" /> : <Bot size={16} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-[15px] leading-relaxed shadow-sm ${msg.role === "user" ? "bg-now-primary text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"}`}>
                  <ReactMarkdown className="prose prose-sm max-w-none">{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-now-primary/10 text-now-primary flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white shrink-0">
            <div className="relative border border-[#ff6b6b]/60 hover:border-[#ff6b6b] rounded-2xl overflow-hidden transition-all bg-white shadow-sm flex items-end min-h-[100px] p-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Anything..."
                className="w-full resize-none bg-transparent border-none focus:outline-none text-[15px] text-gray-800 placeholder:text-gray-400 p-2"
                rows={2}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#d1d5db] text-white flex items-center justify-center hover:bg-[#9ca3af] disabled:opacity-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
