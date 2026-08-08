import { GoogleGenerativeAI, FunctionDeclaration, SchemaType } from "@google/generative-ai";
import CopilotDocument from "../models/CopilotDocument";

// Simple cosine similarity for local testing when Atlas Vector Search isn't enabled
function cosineSimilarity(A: number[], B: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < A.length; i++) {
    dotProduct += A[i] * B[i];
    normA += A[i] * A[i];
    normB += B[i] * B[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const geminiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(geminiKey);
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export class CopilotService {
  /**
   * Retrieves top-K documents using exact cosine similarity in memory
   * (Fallback for when Atlas Vector Search is not configured)
   */
  static async retrieveContext(query: string, k: number = 3): Promise<string> {
    try {
      // 1. Embed query
      const result = await embeddingModel.embedContent(query);
      const queryEmbedding = result.embedding.values;

      // 2. Fetch all documents (in a real app with Atlas, this is a $vectorSearch pipeline)
      const allDocs = await CopilotDocument.find({ embedding: { $exists: true, $ne: [] } }).lean();

      if (allDocs.length === 0) return "";

      // 3. Compute similarities
      const scoredDocs = allDocs.map(doc => {
        const score = cosineSimilarity(queryEmbedding, doc.embedding as number[]);
        return { doc, score };
      });

      // 4. Sort and take top K
      scoredDocs.sort((a, b) => b.score - a.score);
      const topK = scoredDocs.slice(0, k);

      // 5. Format as context string
      return topK.map(item => `[Context from Knowledge Base - Title: ${item.doc.title}]\n${item.doc.content}`).join("\n\n");
    } catch (err) {
      console.error("Error retrieving context:", err);
      return "";
    }
  }

  /**
   * Stage 1 Scope Guard
   * Classifies if the query is in scope of the NowScripts ServiceNow Learning Platform.
   */
  static async checkScope(query: string): Promise<boolean> {
    const prompt = `You are a scope guard for the NowScripts ServiceNow Learning Platform Copilot. 
Your job is to determine if the user's query is in-scope.
In-scope queries include: navigating roadmaps and modules, tracking course/certification progress, finding relevant learning content, interview-prep resources, troubleshooting platform issues (enrollment, progress not saving, certificate access, etc.), or questions about the NowScripts platform itself.
Out-of-scope queries include: general ServiceNow technical/development questions (e.g. how to write a business rule), unrelated chit-chat, programming help, or anything else.

Respond with exactly "IN_SCOPE" or "OUT_OF_SCOPE". Do not add any other text.
User Query: "${query}"`;
    try {
      const response = await chatModel.generateContent(prompt);
      const text = response.response.text().trim();
      return text.includes("IN_SCOPE");
    } catch (err) {
      console.error("Scope check failed, defaulting to in-scope:", err);
      return true; // fail open
    }
  }

  static async *handleChatStream(
    userId: string,
    message: string,
    history: any[],
    context: string
  ) {
    const systemPrompt = `You are the NowScripts Copilot. You exist only to help users use the NowScripts ServiceNow Learning Platform: navigating roadmaps and modules, tracking course/certification progress, finding relevant learning content, interview-prep resources, and troubleshooting platform issues (enrollment, progress not saving, certificate access, etc.). You do not answer general ServiceNow technical/development questions, unrelated chit-chat, or anything not about using this platform. If asked something out of scope, reply briefly: "I'm the NowScripts assistant and can only help with using this platform. For ServiceNow technical questions or anything else, please check our learning resources or contact support." Only reference progress, modules, or certifications the current user actually has access to. Do not perform write actions (like creating a support ticket) without explicit user confirmation first.
    
    Here is context retrieved from our knowledge base that may help answer the query:
    ${context}`;

    const tools = [{
      functionDeclarations: [
        {
          name: "get_user_progress",
          description: "Fetches the current user's progress for modules and courses.",
          parameters: { type: SchemaType.OBJECT, properties: {} }
        },
        {
          name: "search_courses",
          description: "Searches the course catalog.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: { query: { type: SchemaType.STRING, description: "Search query" } },
            required: ["query"]
          }
        },
        {
          name: "get_roadmap_status",
          description: "Fetches the user's roadmap progress and assigned roadmap details.",
          parameters: { type: SchemaType.OBJECT, properties: {} }
        },
        {
          name: "get_certification_status",
          description: "Fetches the user's certification status and unlocked certificates.",
          parameters: { type: SchemaType.OBJECT, properties: {} }
        },
        {
          name: "create_support_ticket",
          description: "Creates a support ticket for the user. MUST require explicit user confirmation before calling.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: { issue_description: { type: SchemaType.STRING, description: "Description of the issue" } },
            required: ["issue_description"]
          }
        }
      ]
    }];

    const chat = chatModel.startChat({
      systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts || [{ text: h.content }]
      })),
      tools
    });

    if (!geminiKey) {
      console.error("Copilot configuration error: GEMINI_API_KEY is missing in environment variables.");
      yield "I'm sorry, my AI features are currently disabled because the API key is missing. Please contact an administrator.";
      return;
    }

    try {
      const result = await chat.sendMessageStream(message);
      let functionCallResult = null;
      
      for await (const chunk of result.stream) {
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
          const call = chunk.functionCalls[0];
          let functionResponse: any = {};
          
          if (call.name === "get_user_progress") {
             functionResponse = { status: "success", progress: "You have completed 40% of the Developer Roadmap." };
          } else if (call.name === "search_courses") {
             functionResponse = { status: "success", results: ["ServiceNow Fundamentals", "Scripting in ServiceNow"] };
          } else if (call.name === "get_roadmap_status") {
             functionResponse = { status: "success", roadmap: "Developer Roadmap", currentWeek: 3 };
          } else if (call.name === "get_certification_status") {
             functionResponse = { status: "success", certificates: ["CSA Certified"] };
          } else if (call.name === "create_support_ticket") {
             functionResponse = { status: "success", ticketId: "TKT-12345", message: "Ticket created successfully." };
          } else {
             functionResponse = { status: "error", message: "Unknown function" };
          }
          
          const fnResult = await chat.sendMessageStream([{
            functionResponse: {
              name: call.name,
              response: functionResponse
            }
          }]);
          
          for await (const fnChunk of fnResult.stream) {
            try {
              if (fnChunk.text()) {
                yield fnChunk.text();
              }
            } catch (e) {
              // Ignore chunks without text
            }
          }
        } else {
          try {
            if (chunk.text()) {
              yield chunk.text();
            }
          } catch (e) {
            // Ignore chunks without text
          }
        }
      }
    } catch (err) {
      console.error("Error in chat stream:", err);
      yield "I'm sorry, I encountered an error while processing your request.";
    }
  }
}
