import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import AIChatBox from "../../components/ai/AIChatBox";
import { useAIChat } from "../../hooks/useAI";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { aiService } from "../../services/ai.service";

export default function AILearningCompanion() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("id");

  const { messages, isLoading, sendMessage, loadSession, error } = useAIChat();
  const [recentChats, setRecentChats] = useState<any[]>([]);

  // Load recent chat sessions for sidebar
  useEffect(() => {
    aiService.getChatHistory().then((data) => {
      if (data.success) {
        setRecentChats(data.sessions.slice(0, 20)); // limit to 20 recent chats
      }
    });
  }, []);

  // Load specific session if id present
  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId);
    }
  }, [sessionId, loadSession]);

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#F4F2EE]">
      {/* Sidebar with recent chats */}
      <aside className="w-64 border-r border-gray-200 bg-white overflow-y-auto hidden md:block">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-now-primary" /> Recent Chats
          </h2>
          <ul className="space-y-1">
            {recentChats.length === 0 ? (
              <li className="text-sm text-gray-500">No recent chats.</li>
            ) : (
              recentChats.map((chat) => (
                <li key={chat._id}>
                  <Link
                    to={`/ai/companion?id=${chat._id}`}
                    className={`block px-3 py-2 rounded-md text-sm ${chat._id === sessionId ? "bg-now-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    {chat.title || "Untitled Chat"}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto px-4 md:px-6 py-6 overflow-hidden">
        <div className="flex items-center gap-4 mb-6 shrink-0">
          <Link to="/ai" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Learning Companion</h1>
            <p className="text-sm text-gray-500">Your intelligent guide to ServiceNow</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 shrink-0">
            {error}
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto">
          <AIChatBox messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
