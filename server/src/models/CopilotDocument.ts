import mongoose, { Document, Schema } from "mongoose";

export interface ICopilotDocument extends Document {
  title: string;
  content: string;
  metadata?: any;
  embedding?: number[];
  createdAt: Date;
}

const CopilotDocumentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    embedding: { type: [Number] },
  },
  { timestamps: true }
);

export default mongoose.model<ICopilotDocument>("CopilotDocument", CopilotDocumentSchema);
