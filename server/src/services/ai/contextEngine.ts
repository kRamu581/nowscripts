import User from "../../models/User";
// import LearningProgress from "../../models/LearningProgress"; // Hypothetical depending on the db schema

export class ContextEngine {
  async buildUserContext(userId: string): Promise<string> {
    try {
      const user = await User.findById(userId).lean();
      if (!user) return "User context not found.";

      // In a real application, you would query multiple models here:
      // const progress = await LearningProgress.find({ userId });
      // const bookmarks = await Bookmark.find({ userId });

      // Build a comprehensive profile for the AI to understand the user
      let context = `
User Profile:
- Name: ${user.name || "Unknown"}
- Email: ${user.email}
- Role: ${user.role || "User"}
`;

      if (user.careerProfile) {
        context += `
Career Profile:
- Goal: ${user.careerProfile.careerGoal || "Not specified"}
- Target Certification: ${user.careerProfile.targetCertification || "Not specified"}
- Experience: ${user.careerProfile.yearsOfExperience || "Not specified"}
- Current Role: ${user.careerProfile.currentRole || "Not specified"}
- Weekly Study Time: ${user.careerProfile.weeklyLearningTime || "Not specified"}
`;
      }

      context += `
Platform Context:
- The user is using the NowScripts learning platform, an ecosystem for ServiceNow professionals.
- Provide tailored, highly relevant answers based on ServiceNow best practices.
- The user's goal is to learn and prepare for certifications/interviews.
`;

      return context;
    } catch (error) {
      console.error("Error building context:", error);
      return "Error retrieving user context.";
    }
  }
}

export const contextEngine = new ContextEngine();
