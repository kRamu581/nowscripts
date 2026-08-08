import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import env from "../src/utils/envalid";
import CopilotDocument from "../src/models/CopilotDocument";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const geminiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(geminiKey);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function embedText(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function ingest() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB");

  const docsDir = path.join(__dirname, "../../client/src/docs"); // Or wherever docs are stored
  
  // Hardcoded sample docs since the repo might not have a /docs folder yet
  const sampleDocs = [
    {
      title: "Enrollment & Progress",
      content: "To enroll in a roadmap, go to the Roadmap Dashboard and click 'Start Learning'. Your progress is saved automatically when you complete a module. If your progress isn't saving, try clearing your browser cache or contact support."
    },
    {
      title: "Certificates",
      content: "You unlock certificates after completing 100% of a module and passing the final assessment. You can download your certificate from the Dashboard or Verify Certificate page."
    },
    {
      title: "Interview Prep",
      content: "Interview experiences are shared by community members. You can find company-specific questions in the Interview Prep Dashboard. To submit an experience, click 'Submit Experience'."
    }
  ];

  console.log("Clearing existing vectors...");
  await CopilotDocument.deleteMany({});

  for (const doc of sampleDocs) {
    console.log(`Embedding: ${doc.title}`);
    const embedding = await embedText(doc.content);
    
    await CopilotDocument.create({
      title: doc.title,
      content: doc.content,
      embedding
    });
  }

  console.log("Ingestion complete!");
  process.exit(0);
}

ingest().catch(console.error);
