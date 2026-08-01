import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../../hooks/useAI";
import { Loader2, Square, Sparkles } from "lucide-react";
import { useAuth } from "../../contexts/Auth";

interface AIChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

export default function AIChatBox({ messages, isLoading, onSendMessage, placeholder = "Ask me anything...", initialQuery }: AIChatBoxProps) {
  const [input, setInput] = React.useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    // Auto send initial query if there are no messages
    if (initialQuery && messages.length === 0 && !isLoading) {
      onSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto relative pb-8">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-10 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex gap-5">
            {/* Avatar Column */}
            <div className="flex-shrink-0 mt-1">
              {msg.role === "user" ? (
                user?.avatar ? (
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                )
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-xl">✦</span>
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex-1 max-w-[85%]">
              <div className="text-[14px] font-semibold text-gray-800 mb-1.5">
                {msg.role === "user" ? (user?.name || "Amy Lokey") : "Otto"}
              </div>
              
              <div className="text-[15px] text-gray-700 leading-relaxed">
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:rounded-xl prose-a:text-blue-600">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex gap-5">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-xl animate-pulse">✦</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-gray-800 mb-1.5">Otto</div>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center gap-3 text-gray-800">
                  <div className="w-4 h-4 rounded-full border-[3px] border-black animate-spin border-t-transparent"></div>
                  <span className="text-[14px] font-medium">Reviewing information...</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 pl-[3px]">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-dashed border-gray-400"></div>
                  <span className="text-[14px]">Generating response...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} className="h-20" />
      </div>

      {/* Floating Pill Input */}
      <div className="absolute bottom-6 left-0 right-0 px-8 flex flex-col items-center pointer-events-none">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl relative pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full">
          <div className="relative flex items-center bg-white rounded-full overflow-hidden transition-all">
            <div className="pl-6 text-gray-400">
              <span className="text-xl leading-none">+</span>
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Processing..." : placeholder}
              disabled={isLoading}
              className="w-full bg-transparent border-0 focus:ring-0 py-4 pl-4 pr-16 text-gray-800 text-[15px] placeholder-gray-400 font-medium disabled:opacity-70 disabled:bg-white"
            />
            {isLoading ? (
              <button
                type="button"
                className="absolute right-3 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                onClick={() => {/* Cancel action if supported */}}
              >
                <Square className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-3 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg leading-none transform -translate-y-[1px]">↑</span>
              </button>
            )}
          </div>
        </form>
        <p className="text-[10px] text-gray-400 mt-2">
          Be sure to check AI-generated content for accuracy
        </p>
      </div>

    </div>
  );
}
