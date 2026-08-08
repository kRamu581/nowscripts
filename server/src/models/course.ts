import { Schema, model, InferSchemaType } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  modules: [{ type: Schema.Types.ObjectId, ref: "modules" }],
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

courseSchema.index(
  { title: 'text', description: 'text' },
  { weights: { title: 5, description: 1 } }
);

type courseSchemaInferType = InferSchemaType<typeof courseSchema>;
export default model<courseSchemaInferType>("courses", courseSchema);
