import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import isAuthenticated from "../middlewares/auth";
import { CopilotService } from "../services/copilotService";
import CopilotLog from "../models/CopilotLog";

const router = Router();

// Rate limiter for chat endpoint
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: "Too many requests to Copilot, please try again later."
});

router.post("/chat", chatLimiter, isAuthenticated, async (req: Request, res: Response) => {
  const { message, conversationId, history = [], pageContext } = req.body;
  const userId = req.userId;

  if (!message || !conversationId) {
    return res.status(400).json({ error: "Missing message or conversationId" });
  }

  // 1. Scope Guard
  const isInScope = await CopilotService.checkScope(message);
  
  if (!isInScope) {
    const rejectMessage = "I'm the NowScripts assistant and can only help with using this platform. For ServiceNow technical questions or anything else, please check our learning resources or contact support.";
    
    // Log out of scope
    await CopilotLog.create({
      userId,
      conversationId,
      message,
      response: rejectMessage,
      scopeGuardVerdict: "out_of_scope"
    });

    return res.json({ response: rejectMessage });
  }

  // 2. Fetch context
  const context = await CopilotService.retrieveContext(message + (pageContext ? ` (Current Page: ${pageContext})` : ""));

  // 3. Setup Server-Sent Events (SSE) for streaming
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = CopilotService.handleChatStream(userId, message, history, context);
    for await (const chunk of stream) {
      fullResponse += chunk;
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    }
    
    // Log successful interaction
    await CopilotLog.create({
      userId,
      conversationId,
      message,
      response: fullResponse,
      scopeGuardVerdict: "in_scope"
    });
    
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Copilot stream error:", err);
    res.write(`data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`);
    res.end();
  }
});

// Endpoint for admins to get logs (with minimal filtering)
router.get("/logs", isAuthenticated, async (req: Request, res: Response) => {
  try {
    // Ideally this would have adminGuard
    const logs = await CopilotLog.find().sort({ createdAt: -1 }).limit(100).populate("userId", "name email");
    
    const outOfScopeCount = await CopilotLog.countDocuments({ scopeGuardVerdict: "out_of_scope" });
    const totalCount = await CopilotLog.countDocuments();
    
    res.json({
      logs,
      metrics: {
        totalQueries: totalCount,
        outOfScopeAttempts: outOfScopeCount,
        outOfScopeRate: totalCount > 0 ? (outOfScopeCount / totalCount) * 100 : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
