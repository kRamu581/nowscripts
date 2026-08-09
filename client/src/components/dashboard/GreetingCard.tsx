import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";

export default function GreetingCard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good Morning");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else if (hour < 20) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const userName = user?.name?.split(" ")[0] || "Student";

  return (
    <div className="bg-gradient-to-br from-[#FF5A5F] to-[#E82C45] rounded-[16px] p-6 h-full flex flex-col justify-center shadow-sm relative overflow-hidden">
      {/* Anime Sky Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/greeting_bg.jpg')" }}
      />
      
      {/* Decorative lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="text-4xl animate-wave origin-bottom-right">
          👋
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">
            {greeting} {userName}
          </h2>
          <p className="text-sm text-white/90 font-medium leading-relaxed max-w-[220px]">
            Welcome back to NowScripts, continue your learning journey today!
          </p>
        </div>
      </div>
    </div>
  );
}
