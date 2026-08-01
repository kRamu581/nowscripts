import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../../hooks/useAI";
import { Send, Loader2, Bot, User as UserIcon } from "lucide-react";
import PromptSuggester from "./PromptSuggester";

interface AIChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  placeholder?: string;
  hideSuggestions?: boolean;
}

export default function AIChatBox({ messages, isLoading, onSendMessage, placeholder = "Ask me anything about ServiceNow...", hideSuggestions = false }: AIChatBoxProps) {
  const [input, setInput] = React.useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Bot size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">How can I help you today?</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                I'm your personalized AI Learning Companion. Ask me a question, or choose a suggestion below to get started.
              </p>
            </div>
            {!hideSuggestions && (
              <div className="w-full max-w-2xl mt-4">
                <PromptSuggester onSelect={onSendMessage} />
              </div>
            )}
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-gray-900 text-white" : "bg-blue-600 text-white"}`}>
                {msg.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${msg.role === "user" ? "bg-gray-100 text-gray-900 rounded-tr-sm" : "bg-blue-50 text-gray-900 rounded-tl-sm border border-blue-100/50"}`}>
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap text-[15px]">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm prose-blue max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-5 py-3.5 border border-blue-100/50 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <div className="relative flex-1 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={placeholder}
              className="w-full max-h-32 bg-transparent border-0 focus:ring-0 resize-none py-3.5 pl-4 pr-12 text-gray-900 text-[15px] placeholder-gray-400"
              rows={input.split("\n").length > 1 ? Math.min(input.split("\n").length, 4) : 1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 bg-gray-900 text-white rounded-xl disabled:bg-gray-300 disabled:text-gray-500 hover:bg-gray-800 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3">
          AI can make mistakes. Consider verifying critical information.
        </p>
      </div>
    </div>
  );
}
