import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingAIBotButton() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // Automatically shrink after 3 seconds
    const timer = setTimeout(() => {
      setExpanded(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/ai"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed bottom-6 right-6 z-50 rounded-full p-[2px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(45deg, #FFB75E, #FF4B2B, #FF416C)',
      }}
    >
      <div className="bg-white rounded-full flex items-center p-0.5 overflow-hidden h-[46px]">
        <div className="flex items-center justify-center w-[42px] h-[42px] shrink-0">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px] drop-shadow-sm">
            <path fillRule="evenodd" clipRule="evenodd" d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z M50 68 C59.9411 68 68 59.9411 68 50 C68 40.0589 59.9411 32 50 32 C40.0589 32 32 40.0589 32 50 C32 59.9411 40.0589 68 50 68 Z" fill="url(#nowAssistGradient)" />
            <defs>
              <linearGradient id="nowAssistGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="0.3" stopColor="#EF4444" />
                <stop offset="0.7" stopColor="#EC4899" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div 
          className={`font-black text-[#0F172A] text-[15px] tracking-wide whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center overflow-hidden ${
            expanded ? 'max-w-[200px] opacity-100 ml-1 pr-5' : 'max-w-0 opacity-0 ml-0 pr-0'
          }`}
        >
          Ask AI Anything !
        </div>
      </div>
    </Link>
  );
}
