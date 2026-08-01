import express from "express";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { rating, feedback } = req.body;

    if (!rating) {
      res.status(400).json({ success: false, message: "Rating is required" });
      return;
    }

    try {
      // Configure nodemailer transporter using SMTP settings from .env
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER || "", // Your Gmail address
          pass: process.env.SMTP_PASS || "", // Your Gmail App Password
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@nowscripts.in",
        to: "kramu.cloud@gmail.com",
        subject: `New Platform Feedback - ${rating}/5 Stars`,
        text: `You have received new feedback for NowScripts.\n\nRating: ${rating}/5\nFeedback: ${feedback || "No additional comments"}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #FF5A3C;">New Platform Feedback</h2>
            <p><strong>Rating:</strong> <span style="font-size: 20px; color: #f59e0b;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span> (${rating}/5)</p>
            <p><strong>Feedback:</strong></p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; font-style: italic;">
              ${feedback || "No additional comments"}
            </div>
          </div>
        `,
      };

      // Only attempt to send if SMTP_USER and SMTP_PASS are configured
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.warn("SMTP_USER or SMTP_PASS not set in .env, skipping email sending. Feedback:", { rating, feedback });
      }

      res.status(200).json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
      console.error("Error sending feedback email:", error);
      res.status(500).json({ success: false, message: "Failed to submit feedback" });
    }
  })
);

export default router;
