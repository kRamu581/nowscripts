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
    const res = await api.post("/chat", { message, sessionId, context });
    return res.data;
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
