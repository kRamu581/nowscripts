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
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Join Our Community & Share Feedback
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            NowScripts is built for developers, by developers. Connect with us and let us know how we can improve!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* Community Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
            
            <a 
              href="https://github.com/kRamu81/nowscripts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-[#FF5A3C] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <GitHubIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5A3C] transition-colors">Contribute on GitHub</h4>
                <p className="text-gray-600 mt-1">Help us build the best ServiceNow learning platform. Check out our open source repository and start contributing today.</p>
              </div>
            </a>

            <a 
              href="https://discord.gg/jXMGus7MF" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-[#5865F2]/5 hover:bg-white hover:border-[#5865F2] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#5865F2] transition-colors">Join Discord Community</h4>
                <p className="text-gray-600 mt-1">Chat with other ServiceNow learners, get help with interview prep, and share your success stories!</p>
              </div>
            </a>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl shadow-gray-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5A3C]/10 rounded-bl-full -z-10" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Rate Your Experience</h3>
            <p className="text-gray-600 mb-6">Your feedback directly goes to our founders' inbox.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="focus:outline-none transition-transform hover:scale-110"
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
                    : "bg-[#FF5A3C] hover:bg-[#e0482e] hover:shadow-lg hover:shadow-[#FF5A3C]/20"
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
