import { Schema, model, InferSchemaType } from "mongoose";

const aiGeneratedRoadmapSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    parameters: {
      careerGoal: String,
      experience: String,
      timeAvailable: String,
      targetCertification: String,
    },
    roadmapData: {
      type: Schema.Types.Mixed, // Storing unstructured or dynamic JSON from LLM
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

export type AIGeneratedRoadmapType = InferSchemaType<typeof aiGeneratedRoadmapSchema>;

export default model("AIGeneratedRoadmap", aiGeneratedRoadmapSchema);
