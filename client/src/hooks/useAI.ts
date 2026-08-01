import { useState, useCallback } from "react";
import { aiService } from "../services/ai.service";

export interface Message {
  role: "user" | "model" | "system";
  content: string;
}

export function useAIChat(initialSessionId?: string, context?: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(initialSessionId);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Optimistically add user message
    const newMessage: Message = { role: "user", content };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const data: any = await aiService.chat(content, sessionId, context);
      if (data.success) {
        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
        }
        setMessages(prev => [...prev, { role: "model", content: data.response }]);
      } else {
        throw new Error(data.message || "Failed to get AI response");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
      // Remove optimistic message if failed
      setMessages(prev => prev.filter(m => m !== newMessage));
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, context]);

  const loadSession = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const data: any = await aiService.getChatSession(id);
      if (data.success) {
        setSessionId(id);
        setMessages(data.session.messages.filter((m: any) => m.role !== "system"));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sessionId,
    error,
    sendMessage,
    loadSession,
    setMessages
  };
}

export function useAIRoadmap() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async (params: any) => {
    setIsGenerating(true);
    setError(null);
    try {
      const data: any = await aiService.generateRoadmap(params);
      if (data.success) {
        return data.roadmap;
      }
      throw new Error(data.message || "Failed to generate roadmap");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateRoadmap, isGenerating, error };
}
