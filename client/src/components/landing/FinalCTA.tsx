import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/Auth";
import { useAuthModal } from "../../contexts/AuthModalContext";

export function FinalCTA() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-white relative z-10 border-t border-gray-100 overflow-hidden px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl">
          {/* Decorative Gradients */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-now-primary/40 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-orange-500/30 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">ServiceNow Developer</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 font-medium">
              Join thousands of learners building real projects, passing certifications, and advancing their careers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/roadmaps");
                  } else {
                    openModal('signup');
                  }
                }}
                className="group w-full sm:w-auto px-8 py-4 bg-now-primary text-white font-bold rounded-2xl hover:bg-now-accent transition-all shadow-[0_8px_30px_rgba(255,90,60,0.3)] hover:shadow-[0_8px_30px_rgba(255,90,60,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
              >
                Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
