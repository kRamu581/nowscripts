import mongoose, { Document, Schema } from "mongoose";

export interface ICopilotLog extends Document {
  userId?: mongoose.Types.ObjectId;
  conversationId: string;
  message: string;
  response: string;
  scopeGuardVerdict: "in_scope" | "out_of_scope";
  feedback?: "up" | "down";
  createdAt: Date;
}

const CopilotLogSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    conversationId: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String, required: true },
    scopeGuardVerdict: { type: String, enum: ["in_scope", "out_of_scope"], required: true },
    feedback: { type: String, enum: ["up", "down"], required: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICopilotLog>("CopilotLog", CopilotLogSchema);
