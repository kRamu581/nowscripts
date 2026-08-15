import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function FloatingAIBotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically shrink after 3 seconds
    const timer = setTimeout(() => {
      setExpanded(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModelClick = (model: string) => {
    const currentUrl = window.location.href;
    const prompt = `Summarize this guide and analyze the key insights from\n${currentUrl}`;
    const encodedPrompt = encodeURIComponent(prompt);

    let targetUrl = "";
    switch (model) {
      case "chatgpt":
        targetUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`;
        break;
      case "perplexity":
        targetUrl = `https://www.perplexity.ai/?q=${encodedPrompt}`;
        break;
      case "claude":
        targetUrl = `https://claude.ai/new?q=${encodedPrompt}`;
        break;
      case "google":
        targetUrl = `https://gemini.google.com/app`;
        // Gemini often drops the query, so copy to clipboard as a fallback
        navigator.clipboard.writeText(prompt).catch(() => {});
        alert("Prompt copied to clipboard! You can paste it directly into Google AI.");
        break;
      case "grok":
        targetUrl = `https://x.com/i/grok?text=${encodedPrompt}`;
        break;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank');
    }
    setIsOpen(false);
  };

  const isPill = expanded && !isOpen;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={menuRef}>
      {/* Popover Menu */}
      <div 
        className={`mb-4 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-5 transition-all duration-300 origin-bottom-right border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-[13px] font-bold text-gray-800 mb-4 text-center">Summarize with...</div>
        <div className="flex flex-col sm:flex-row gap-4">
          <ModelButton name="ChatGPT" icon={<ChatGptIcon />} onClick={() => handleModelClick('chatgpt')} />
          <ModelButton name="Perplexity" icon={<PerplexityIcon />} onClick={() => handleModelClick('perplexity')} />
          <ModelButton name="Claude" icon={<ClaudeIcon />} onClick={() => handleModelClick('claude')} />
          <ModelButton name="Google AI" icon={<GoogleAiIcon />} onClick={() => handleModelClick('google')} />
          <ModelButton name="Grok" icon={<GrokIcon />} onClick={() => handleModelClick('grok')} />
        </div>
      </div>

      {/* Main Button */}
      <button
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 flex items-center overflow-hidden h-[46px] ${
          isPill ? 'px-5' : 'w-[46px] justify-center px-0'
        }`}
        style={{
          background: 'linear-gradient(45deg, #FFB75E, #FF4B2B, #FF416C)',
        }}
      >
        <div className="shrink-0 flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M10 2.5C10 7.2 13.8 11 18.5 11C13.8 11 10 14.8 10 19.5C10 14.8 6.2 11 1.5 11C6.2 11 10 7.2 10 2.5Z" />
              <circle cx="4" cy="18" r="2.5" />
              <path d="M19 4C19 5.7 20.3 7 22 7C20.3 7 19 8.3 19 10C19 8.3 17.7 7 16 7C17.7 7 19 5.7 19 4Z" />
            </svg>
          )}
        </div>
        <div 
          className={`font-bold text-white text-[16px] tracking-wide whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center overflow-hidden ${
            isPill ? 'max-w-[200px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'
          }`}
        >
          Summarize
        </div>
      </button>
    </div>
  );
}

const ModelButton = ({ name, icon, onClick }: { name: string, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 hover:scale-110 transition-transform group focus:outline-none w-full sm:w-auto"
  >
    {icon}
    <span className="text-[12px] sm:text-[10px] font-bold text-gray-800 whitespace-nowrap">{name}</span>
  </button>
);

// Accurate SVG representations of the logos
const ChatGptIcon = () => (
  <div className="w-[34px] h-[34px] bg-[#10a37f] rounded-[10px] flex items-center justify-center shadow-sm">
    <svg role="img" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="white">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0343-1.178a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6713zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0642a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.454a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  </div>
);

const PerplexityIcon = () => (
  <div className="w-[34px] h-[34px] bg-[#222222] rounded-[10px] flex items-center justify-center shadow-sm">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M4 7l16 10M4 17L20 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2 L4 7 L4 17 L12 22 L20 17 L20 7 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
    </svg>
  </div>
);

const ClaudeIcon = () => (
  <div className="w-[34px] h-[34px] bg-[#D97757] rounded-[10px] flex items-center justify-center shadow-sm">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="#FFF3E0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 4l8 16M16 4L8 20M4 8l16 8M4 16l16-8" stroke="#FFF3E0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

const GoogleAiIcon = () => (
  <div className="w-[34px] h-[34px] bg-white rounded-[10px] flex items-center justify-center border border-gray-100 shadow-sm relative">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="1.5" fill="#FBBC05" />
      <circle cx="15.5" cy="7" r="1.5" fill="#34A853" />
      <circle cx="19" cy="9" r="1.5" fill="#4285F4" />
      <circle cx="19" cy="15" r="1.5" fill="#4285F4" />
      <circle cx="15.5" cy="17" r="1.5" fill="#34A853" />
      <circle cx="12" cy="19" r="1.5" fill="#FBBC05" />
      <circle cx="8.5" cy="17" r="1.5" fill="#EA4335" />
      <circle cx="5" cy="15" r="1.5" fill="#4285F4" />
      <circle cx="5" cy="9" r="1.5" fill="#4285F4" />
      <circle cx="8.5" cy="7" r="1.5" fill="#EA4335" />
      
      <circle cx="12" cy="10" r="1.5" fill="#EA4335" />
      <circle cx="15" cy="12" r="1.5" fill="#FBBC05" />
      <circle cx="12" cy="14" r="1.5" fill="#34A853" />
      <circle cx="9" cy="12" r="1.5" fill="#EA4335" />
    </svg>
  </div>
);

const GrokIcon = () => (
  <div className="w-[34px] h-[34px] bg-white rounded-[10px] flex items-center justify-center border border-gray-100 shadow-sm">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2.5" />
      <path d="M20 4L4 20" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  </div>
);
