import { Schema, model, InferSchemaType } from "mongoose";

const interviewQuestionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: String,
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
}, { timestamps: true });

interviewQuestionSchema.index(
  { question: 'text', answer: 'text', category: 'text' },
  { weights: { question: 5, category: 3, answer: 1 } }
);

type interviewQuestionInferType = InferSchemaType<typeof interviewQuestionSchema>;
export default model<interviewQuestionInferType>("interviewquestions", interviewQuestionSchema);
