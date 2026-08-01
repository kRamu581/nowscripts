import axios from "axios";
import { url } from "../baseUrl";

const api = axios.create({
  baseURL: `${url}/api/ai`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const aiService = {
  chat: async (message: string, sessionId?: string, context?: any) => {
    // Smart mock for the demo since public free APIs require Turnstile/Captchas
    return new Promise((resolve) => {
      setTimeout(() => {
        const msg = message.toLowerCase();
        let response = "I'm your NowScripts AI assistant. How can I help you with ServiceNow today?";
        
        if (msg.includes("course") || msg.includes("learn") || msg.includes("study")) {
          response = "We have several great courses on ServiceNow! Check out our Learning Companion or the Modules section to get started.";
        } else if (msg.includes("interview") || msg.includes("prep")) {
          response = "For interview preparation, head over to the Interview Prep Dashboard. We have mock interviews, common questions, and a Doubt Solver ready for you!";
        } else if (msg.includes("project")) {
          response = "Projects are the best way to learn. You can find real-world ServiceNow scenarios in our Projects section to build your portfolio.";
        } else if (msg.includes("roadmap") || msg.includes("path")) {
          response = "I can help you build a personalized learning path! Just go to the Roadmap Builder and tell me your goals.";
        } else {
          response = "That's an interesting question about ServiceNow. While I'm currently in demo mode, our team is integrating my full brain soon to answer this in detail!";
        }
        
        resolve({ success: true, response, sessionId: sessionId || "temp-session" });
      }, 800);
    });
  },
  
  getChatHistory: async () => {
    const res = await api.get("/chat/history");
    return res.data;
  },
  
  getChatSession: async (id: string) => {
    const res = await api.get(`/chat/session/${id}`);
    return res.data;
  },
  
  generateRoadmap: async (params: any) => {
    const res = await api.post("/roadmap/generate", params);
    return res.data;
  },
  
  getRoadmaps: async () => {
    const res = await api.get("/roadmap");
    return res.data;
  }
};
