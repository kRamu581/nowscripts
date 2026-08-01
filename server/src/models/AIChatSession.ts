import { Schema, model, InferSchemaType } from "mongoose";

const aiChatSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    sessionType: {
      type: String,
      enum: ["Companion", "DoubtSolver"],
      default: "Companion",
    },
    contextContext: {
      lessonId: { type: String },
      lessonTitle: { type: String },
      codeSnippet: { type: String },
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "model", "system"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isSavedNote: {
          type: Boolean,
          default: false,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

export type AIChatSessionType = InferSchemaType<typeof aiChatSessionSchema>;

export default model("AIChatSession", aiChatSessionSchema);
