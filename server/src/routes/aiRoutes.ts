import express from "express";
import { 
  chatWithAI, 
  generateRoadmap, 
  getChatHistory, 
  getChatSession, 
  getRoadmaps,
  evaluateInterview,
  summarizeUrl
} from "../controllers/aiController";
// Assuming authMiddleware exists and is exported from middleware/auth or similar.
import isAuthenticated from "../middlewares/auth"; 

const router = express.Router();

router.use(isAuthenticated); // AI features require authentication

// Chat endpoints
router.post("/chat", chatWithAI);
router.get("/chat/history", getChatHistory);
router.get("/chat/session/:id", getChatSession);

// Roadmap endpoints
router.post("/roadmap/generate", generateRoadmap);
router.get("/roadmap", getRoadmaps);

// Interview endpoints
router.post("/interview/evaluate", evaluateInterview);

// Summarization endpoints
router.post("/summarize-url", summarizeUrl);

export default router;
