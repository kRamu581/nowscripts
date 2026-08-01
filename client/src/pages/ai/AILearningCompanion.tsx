import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AIChatBox from "../../components/ai/AIChatBox";
import { useAIChat } from "../../hooks/useAI";
import { useAuth } from "../../contexts/Auth";
import AISidebar from "../../components/ai/AISidebar";
import { BrandLogo } from "../../components/BrandLogo";
import { X } from "lucide-react";

export default function AILearningCompanion() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("id");
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const { messages, isLoading, sendMessage, loadSession, error } = useAIChat();


  // Load specific session if id present
  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId);
    } else if (query) {
      // If there's a query but no session, we might want to auto-send it
      // But useAIChat might already handle initial prompts if implemented
    }
  }, [sessionId, loadSession, query]);

  return (
    <div className="h-screen flex bg-[#F4F2EE] font-sans overflow-hidden">
      <AISidebar />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#F4F2EE]">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200/50 bg-[#F4F2EE] shrink-0 sticky top-0 z-50">
          <BrandLogo textColor="text-slate-900" hideTextOnMobile={false} className="scale-90 origin-left" />
          <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-200/50 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Header */}
        <header className="hidden md:flex px-8 py-6 items-center justify-between shrink-0">
          <h1 className="text-[20px] font-medium text-gray-800 tracking-tight">
            {query || "ServiceNow Learning Path Overview"}
          </h1>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-900">
            <X size={24} />
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
          {error && (
            <div className="mx-8 mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 shrink-0">
              {error}
            </div>
          )}
          
          <AIChatBox messages={messages} isLoading={isLoading} onSendMessage={sendMessage} initialQuery={query} />
        </div>

      </main>
    </div>
  );
}
