import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { url } from "../../../baseUrl";

export const AmberCommunityFeedback = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setSubmitStatus("error");
      setErrorMessage("Please select a rating before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await axios.post(`${url}/api/feedback`, { rating, feedback });
      setSubmitStatus("success");
      setRating(0);
      setFeedback("");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Failed to submit feedback", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-6 pb-8 md:pt-8 md:pb-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Join Our Community & Share Feedback
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NowScripts is built for developers, by developers. Connect with us and let us know how we can improve!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* Community Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
            
            <a 
              href="https://github.com/kRamu81/nowscripts" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Contribute on GitHub (opens in a new window)"
              className="group flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-[#FF5A3C] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 group-hover:text-[#FF5A3C] transition-colors">Contribute on GitHub</h4>
                <p className="text-sm text-gray-600 mt-1">Help us build the best ServiceNow learning platform. Check out our open source repository and start contributing today.</p>
              </div>
            </a>

            <a 
              href="https://discord.gg/jXMGus7MF" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Join Discord Community (opens in a new window)"
              className="group flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-[#5865F2]/5 hover:bg-white hover:border-[#5865F2] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current -mt-0.5">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 group-hover:text-[#5865F2] transition-colors">Join Discord Community</h4>
                <p className="text-sm text-gray-600 mt-1">Chat with other ServiceNow learners, get help with interview prep, and share your success stories!</p>
              </div>
            </a>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl shadow-gray-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5A3C]/10 rounded-bl-full -z-10" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rate Your Experience</h3>
            <p className="text-sm text-gray-600 mb-5">Your feedback directly goes to our founders' inbox.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate NowScripts?</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none focus:ring-2 focus:ring-[#D91B42] focus:ring-offset-2 rounded-full transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-[#f59e0b] text-[#f59e0b]"
                            : "fill-transparent text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500 font-medium">
                    {rating > 0 ? `${rating} / 5` : ""}
                  </span>
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">Any additional feedback? (Optional)</label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What do you love? What can we improve?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A3C] focus:border-transparent transition-colors outline-none resize-none"
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {submitStatus === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {errorMessage}
                  </motion.div>
                )}
                
                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-lg text-sm font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    Thank you! Your feedback has been sent.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-bold text-lg transition-all
                  ${isSubmitting || submitStatus === "success" 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#D91B42] hover:bg-[#BE123C] hover:shadow-lg hover:shadow-[#D91B42]/20"
                  }
                `}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                ) : submitStatus === "success" ? (
                  <><CheckCircle2 className="w-5 h-5" /> Sent Successfully</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Feedback</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
