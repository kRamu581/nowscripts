import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const msg = message.toLowerCase();
    let response = "I'm NowScripts Copilot. How can I help you with ServiceNow today?";
    
    // Phase 1: Basic Intent Detection
    if (msg.includes("course") || msg.includes("find") || msg.includes("search")) {
      response = "You can find all courses in the 'Courses' tab at the top. I can also help you filter them if you need specific topics!";
    } else if (msg.includes("resume") || msg.includes("progress")) {
      response = "Your progress is saved automatically! Click 'Dashboard' to resume exactly where you left off.";
    } else if (msg.includes("project")) {
      response = "Your active projects are located in the 'Projects' section of your workspace. Should I take you there?";
    } else if (msg.includes("profile") || msg.includes("settings") || msg.includes("manage")) {
      response = "You can manage your profile, billing, and account settings by clicking your avatar in the top right corner.";
    } else if (msg.includes("servicenow") || msg.includes("code") || msg.includes("script")) {
      response = "I am specifically designed to help you navigate the NowScripts platform. For ServiceNow technical questions, please check out the Doubt Solver or community forums!";
    } else {
      response = "I'm your platform assistant. You can ask me how to navigate NowScripts, track your learning progress, or manage your profile!";
    }

    // Simulate API processing delay for realistic typing effect
    setTimeout(() => {
      res.json({ response });
    }, 600);
    
  } catch (error) {
    console.error("Copilot Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
