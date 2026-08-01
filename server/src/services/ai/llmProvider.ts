import { GoogleGenerativeAI } from "@google/generative-ai";

export type LLMProviderType = "gemini" | "openai" | "claude" | "ollama";

export interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

export interface ChatMessage {
  role: "user" | "model" | "system";
  content: string;
}

export class LLMProviderService {
  private geminiAI: GoogleGenerativeAI;
  
  constructor() {
    // Initialize providers (only Gemini in Phase 1)
    const geminiKey = process.env.GEMINI_API_KEY || "";
    this.geminiAI = new GoogleGenerativeAI(geminiKey);
  }

  async generateChatCompletion(
    messages: ChatMessage[],
    provider: LLMProviderType = "gemini",
    temperature: number = 0.7
  ): Promise<AIResponse> {
    try {
      if (provider === "gemini") {
        return await this.callGemini(messages, temperature);
      } else if (provider === "openai") {
        throw new Error("OpenAI provider not yet implemented.");
      } else if (provider === "claude") {
        throw new Error("Claude provider not yet implemented.");
      } else if (provider === "ollama") {
        throw new Error("Ollama provider not yet implemented.");
      }
      throw new Error(`Unsupported provider: ${provider}`);
    } catch (error: any) {
      console.error(`Error in LLMProviderService (${provider}):`, error);
      return { content: "", success: false, error: error.message };
    }
  }

  private async callGemini(messages: ChatMessage[], temperature: number): Promise<AIResponse> {
    try {
      const model = this.geminiAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature } });
      
      // Separate system prompt if it exists (Gemini handles system instructions differently, 
      // but for simplicity in flash, we can prepend it to the first user message or use systemInstruction in beta)
      let systemPrompt = "";
      const history = messages.filter(m => {
        if (m.role === "system") {
          systemPrompt += m.content + "\n";
          return false;
        }
        return true;
      }).map(m => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      // Inject system prompt into the first message if it exists
      if (systemPrompt && history.length > 0) {
        history[0].parts[0].text = `System Instructions:\n${systemPrompt}\n\nUser Message:\n${history[0].parts[0].text}`;
      } else if (systemPrompt) {
         // If there is only a system prompt (edge case), just return
         return { content: "", success: false, error: "No user message provided." };
      }

      // We use generateContent with the history
      const lastMessage = history.pop();
      if (!lastMessage) return { content: "", success: false, error: "No messages to send." };

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage.parts[0].text);
      const response = await result.response;
      
      return {
        content: response.text(),
        success: true
      };
    } catch (error: any) {
      throw error;
    }
  }
}

export const llmProvider = new LLMProviderService();
