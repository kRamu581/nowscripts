import React, { useState } from "react";
import { Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AIChatBox from "./AIChatBox";
import { useAIChat } from "../../hooks/useAI";

interface AskAIContextButtonProps {
  lessonId: string;
  lessonTitle: string;
  contextSnippet?: string;
}

export default function AskAIContextButton({ lessonId, lessonTitle, contextSnippet }: AskAIContextButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // We pass context object which will tell the backend this is a DoubtSolver session
  const { messages, isLoading, sendMessage } = useAIChat(undefined, {
    lessonId,
    lessonTitle,
    codeSnippet: contextSnippet
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-40 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <Bot size={20} />
        <span className="font-semibold text-sm">Ask AI</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 z-[60] w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">AI Doubt Solver</h3>
                    <p className="text-[10px] text-gray-400 opacity-80 truncate max-w-[200px]">Context: {lessonTitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 bg-gray-50 p-2 overflow-hidden">
                <AIChatBox
                  messages={messages}
                  isLoading={isLoading}
                  onSendMessage={sendMessage}
                  placeholder={`Ask about ${lessonTitle}...`}
                  hideSuggestions={true}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
