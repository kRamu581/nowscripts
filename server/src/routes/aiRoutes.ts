import express from "express";
import { 
  chatWithAI, 
  generateRoadmap, 
  getChatHistory, 
  getChatSession, 
  getRoadmaps 
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

export default router;
