import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LandingEnhancements() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowBackToTop(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-now-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.5 }}
        onClick={scrollToTop}
        className="fixed bottom-24 md:bottom-8 right-6 w-12 h-12 bg-white border border-gray-200 text-gray-900 rounded-full flex items-center justify-center shadow-md z-40 hover:bg-gray-50 transition-colors pointer-events-auto"
        style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Mobile Sticky CTA */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: showBackToTop ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-40 md:hidden flex justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
      >
        <Link 
          to="/roadmaps"
          className="w-full max-w-sm py-3 rounded-xl bg-now-primary text-white font-bold text-center shadow-sm"
        >
          Start Learning Free
        </Link>
      </motion.div>
    </>
  );
}
