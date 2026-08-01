import { Request, Response } from "express";
import { llmProvider } from "../services/ai/llmProvider";
import { contextEngine } from "../services/ai/contextEngine";
import { PROMPT_TEMPLATES } from "../services/ai/promptTemplates";
import AIChatSession from "../models/AIChatSession";
import AIGeneratedRoadmap from "../models/AIGeneratedRoadmap";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { sessionId, message, context: requestContext } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    let session;
    if (sessionId) {
      session = await AIChatSession.findById(sessionId);
      if (!session) {
        return res.status(404).json({ success: false, message: "Session not found." });
      }
    } else {
      session = new AIChatSession({
        userId,
        sessionType: requestContext?.lessonId ? "DoubtSolver" : "Companion",
        contextContext: requestContext
      });
    }

    // Append user message
    session.messages.push({ role: "user", content: message, timestamp: new Date(), isSavedNote: false });

    // Build LLM input
    const userProfileContext = await contextEngine.buildUserContext(userId);
    
    let systemPrompt = PROMPT_TEMPLATES.COMPANION_SYSTEM_PROMPT;
    systemPrompt += `\n\n--- User Context ---\n${userProfileContext}\n--------------------\n`;

    if (session.sessionType === "DoubtSolver" && session.contextContext?.lessonTitle) {
      systemPrompt += PROMPT_TEMPLATES.DOUBT_SOLVER_PROMPT
        .replace("{{LESSON_TITLE}}", session.contextContext.lessonTitle)
        .replace("{{CODE_CONTEXT}}", session.contextContext.codeSnippet || "None");
    }

    // Prepare messages for LLM
    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...session.messages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    // Call Provider
    // Type cast to any since we know the structure fits our internal interface
    const aiResponse = await llmProvider.generateChatCompletion(llmMessages as any);

    if (!aiResponse.success) {
      return res.status(500).json({ success: false, message: aiResponse.error });
    }

    // Append AI response
    session.messages.push({ role: "model", content: aiResponse.content, timestamp: new Date(), isSavedNote: false });
    
    // Auto-generate title for new sessions
    if (!sessionId && session.messages.length <= 2) {
      const titlePrompt = [{ role: "user", content: `Generate a short (max 4 words) title for this chat based on the first message: "${message}". Reply ONLY with the title, no quotes.` }];
      const titleRes = await llmProvider.generateChatCompletion(titlePrompt as any, "gemini", 0.3);
      if (titleRes.success) {
        session.title = titleRes.content.trim();
      }
    }

    await session.save();

    res.status(200).json({
      success: true,
      sessionId: session._id,
      title: session.title,
      response: aiResponse.content
    });
  } catch (error: any) {
    console.error("Error in chatWithAI:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { careerGoal, experience, timeAvailable, targetCertification } = req.body;

    const prompt = `
User Profile for Roadmap Generation:
- Goal: ${careerGoal}
- Experience: ${experience}
- Time Available: ${timeAvailable}
- Target Certification: ${targetCertification || "None"}

Please generate the structured JSON roadmap.
`;

    const llmMessages = [
      { role: "system", content: PROMPT_TEMPLATES.ROADMAP_GENERATOR_PROMPT },
      { role: "user", content: prompt }
    ];

    const aiResponse = await llmProvider.generateChatCompletion(llmMessages as any, "gemini", 0.5);

    if (!aiResponse.success) {
      return res.status(500).json({ success: false, message: aiResponse.error });
    }

    let parsedData;
    try {
      // Remove any potential markdown blocks like ```json ... ``` that LLM might sneak in
      let rawJson = aiResponse.content.trim();
      if (rawJson.startsWith("\`\`\`json")) {
        rawJson = rawJson.substring(7, rawJson.length - 3).trim();
      } else if (rawJson.startsWith("\`\`\`")) {
        rawJson = rawJson.substring(3, rawJson.length - 3).trim();
      }
      parsedData = JSON.parse(rawJson);
    } catch (parseError) {
      console.error("Error parsing JSON from LLM:", aiResponse.content);
      return res.status(500).json({ success: false, message: "Failed to parse roadmap data." });
    }

    const roadmap = new AIGeneratedRoadmap({
      userId,
      title: parsedData.title || `${careerGoal} Roadmap`,
      parameters: req.body,
      roadmapData: parsedData,
    });

    await roadmap.save();

    res.status(200).json({
      success: true,
      roadmap
    });
  } catch (error: any) {
    console.error("Error in generateRoadmap:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false });

    const sessions = await AIChatSession.find({ userId })
      .select('title sessionType updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, sessions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatSession = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ success: false });

    const session = await AIChatSession.findOne({ _id: id, userId });
    if (!session) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, session });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoadmaps = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false });

    const roadmaps = await AIGeneratedRoadmap.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, roadmaps });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
