import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Play, BookOpen, Award, TrendingUp, Users, FileText } from "lucide-react";

export function PremiumHero() {
  const floatAnimation = {
    y: ["-5%", "5%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  };

  const slowFloatAnimation = {
    y: ["-3%", "3%"],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      delay: 1,
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-now-primary/20 via-orange-100 to-transparent blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-8">
                Master ServiceNow <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-500">
                  Like a Professional.
                </span>
              </h1>
              
              <div className="space-y-4 mb-10">
                {["Learn through real projects.", "Practice interview questions.", "Build enterprise applications.", "Get job-ready."].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-now-primary flex-shrink-0" />
                    <span className="text-xl text-gray-600 font-medium">{text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/learn" className="group flex items-center justify-center gap-2 px-8 py-4 bg-now-primary hover:bg-now-accent text-white text-lg font-bold rounded-2xl transition-all shadow-[0_8px_30px_rgb(255,90,60,0.3)] hover:shadow-[0_8px_30px_rgb(255,90,60,0.5)] hover:-translate-y-1">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/roadmaps" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 hover:border-gray-200 text-lg font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-sm">
                  <Play className="w-5 h-5 text-gray-400 group-hover:text-now-primary transition-colors" />
                  Explore Roadmaps
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Aligned with official certifications</p>
                <div className="flex flex-wrap gap-4">
                  {['CSA', 'CAD', 'ITSM', 'AI'].map((badge) => (
                    <div key={badge} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 font-bold text-sm shadow-sm">
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Macbook & Cards */}
          <div className="relative hidden lg:block h-[600px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Main MacBook Mockup Placeholder */}
              <motion.div animate={slowFloatAnimation} className="relative z-10 w-[800px] max-w-[120%] right-[-10%] drop-shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto rounded-2xl border border-gray-200/50 object-cover aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div animate={floatAnimation} className="absolute top-[10%] left-[-10%] z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Course Progress</p>
                  <p className="text-lg font-bold text-gray-900">78% Completed</p>
                </div>
              </motion.div>

              <motion.div animate={floatAnimation} style={{ animationDelay: '1s' }} className="absolute bottom-[20%] left-[5%] z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Interview Questions</p>
                  <p className="text-lg font-bold text-gray-900">12 New Saved</p>
                </div>
              </motion.div>

              <motion.div animate={floatAnimation} style={{ animationDelay: '0.5s' }} className="absolute top-[25%] right-[-5%] z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Certificate</p>
                  <p className="text-lg font-bold text-gray-900">CSA Earned</p>
                </div>
              </motion.div>

              <motion.div animate={slowFloatAnimation} style={{ animationDelay: '1.5s' }} className="absolute bottom-[10%] right-[10%] z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Community</p>
                  <p className="text-lg font-bold text-gray-900">Active Now</p>
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
