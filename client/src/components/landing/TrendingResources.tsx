import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Clock, Star, TrendingUp, ArrowRight, MessageSquare, ThumbsUp, Code, Database, Globe } from "lucide-react";

export function TrendingResources() {
  const resources = [
    { 
      title: "Top 50 CSA Interview Questions", 
      excerpt: "Master the most common System Administrator interview questions with detailed explanations and best practices.",
      tag: "Most Viewed", 
      icon: <Flame className="w-3.5 h-3.5" />, 
      color: "border-orange-200 bg-orange-50 text-orange-700",
      category: "Interview Prep",
      difficulty: "Beginner",
      author: "Nisab Mohd",
      date: "Oct 12",
      readTime: "15 min read",
      likes: 342,
      comments: 28,
      link: "/interview-prep",
      thumbnailBg: "bg-emerald-50 border-emerald-100",
      thumbnailType: "list"
    },
    { 
      title: "ServiceNow GlideRecord Best Practices", 
      excerpt: "Learn how to optimize your server-side queries and avoid common pitfalls when working with GlideRecord.",
      tag: "Recently Updated", 
      icon: <Clock className="w-3.5 h-3.5" />, 
      color: "border-blue-200 bg-blue-50 text-blue-700",
      category: "Scripting",
      difficulty: "Intermediate",
      author: "Jane Doe",
      date: "Oct 15",
      readTime: "8 min read",
      likes: 156,
      comments: 12,
      link: "/learn",
      thumbnailBg: "bg-blue-50 border-blue-100",
      thumbnailType: "code"
    },
    { 
      title: "Mastering Flow Designer 2025", 
      excerpt: "Transition from workflows to Flow Designer. Everything you need to know about the latest automation engine.",
      tag: "New", 
      icon: <Star className="w-3.5 h-3.5" />, 
      color: "border-amber-200 bg-amber-50 text-amber-700",
      category: "Automation",
      difficulty: "Beginner",
      author: "John Smith",
      date: "Oct 18",
      readTime: "12 min read",
      likes: 215,
      comments: 45,
      link: "/learn",
      thumbnailBg: "bg-orange-50 border-orange-100",
      thumbnailType: "flow"
    },
    { 
      title: "Client Scripts vs Business Rules", 
      excerpt: "When to use client-side vs server-side scripting. A comprehensive guide to ServiceNow performance.",
      tag: "Popular", 
      icon: <TrendingUp className="w-3.5 h-3.5" />, 
      color: "border-purple-200 bg-purple-50 text-purple-700",
      category: "Architecture",
      difficulty: "Intermediate",
      author: "Sarah Connor",
      date: "Oct 10",
      readTime: "10 min read",
      likes: 89,
      comments: 7,
      link: "/interview-prep",
      thumbnailBg: "bg-purple-50 border-purple-100",
      thumbnailType: "split"
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Trending Resources</h2>
            <p className="text-gray-600 text-lg max-w-xl font-medium">
              See what other developers are reading, practicing, and preparing with right now.
            </p>
          </div>
          <Link to="/learn" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-now-primary hover:text-now-primary/80 transition-colors group">
            View All Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link to={res.link} className="flex flex-col h-full p-6 md:p-8 bg-white border border-gray-200 rounded-2xl group hover:border-gray-300 hover:shadow-card transition-all duration-300 relative z-10 hover:-translate-y-1">
                
                {/* Simulated UI Thumbnail */}
                <div className={`w-full h-32 md:h-40 rounded-xl border ${res.thumbnailBg} mb-6 overflow-hidden relative flex items-center justify-center p-4`}>
                   {res.thumbnailType === 'list' && (
                     <div className="w-full h-full flex flex-col gap-2">
                       <div className="w-1/3 h-2 bg-emerald-200 rounded mb-1"></div>
                       <div className="w-full flex-1 bg-white rounded border border-emerald-100 p-3 flex items-start gap-3">
                          <div className="w-6 h-6 rounded bg-emerald-50 shrink-0"></div>
                          <div className="flex-1 flex flex-col gap-1.5 mt-1">
                            <div className="w-1/2 h-1.5 bg-emerald-200 rounded"></div>
                            <div className="w-3/4 h-1 bg-emerald-100 rounded"></div>
                          </div>
                       </div>
                       <div className="w-full flex-1 bg-white rounded border border-emerald-100 p-3 flex items-start gap-3 opacity-60">
                          <div className="w-6 h-6 rounded bg-emerald-50 shrink-0"></div>
                          <div className="flex-1 flex flex-col gap-1.5 mt-1">
                            <div className="w-2/3 h-1.5 bg-emerald-200 rounded"></div>
                            <div className="w-1/2 h-1 bg-emerald-100 rounded"></div>
                          </div>
                       </div>
                     </div>
                   )}
                   {res.thumbnailType === 'code' && (
                     <div className="w-full h-full flex flex-col">
                        <div className="w-full h-6 bg-blue-100 border-b border-blue-200 flex items-center px-2 gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                           <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                           <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        </div>
                        <div className="flex-1 bg-white p-3 flex flex-col gap-2">
                           <div className="w-3/4 h-2 bg-blue-100 rounded"></div>
                           <div className="w-1/2 h-2 bg-blue-200 rounded ml-4"></div>
                           <div className="w-2/3 h-2 bg-blue-100 rounded ml-4"></div>
                           <div className="w-1/4 h-2 bg-blue-100 rounded"></div>
                        </div>
                     </div>
                   )}
                   {res.thumbnailType === 'flow' && (
                     <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-3/4 h-8 bg-white border border-orange-200 rounded flex items-center px-3 gap-2">
                           <div className="w-4 h-4 rounded-full bg-orange-100"></div>
                           <div className="w-1/2 h-1.5 bg-orange-200 rounded"></div>
                        </div>
                        <div className="w-0.5 h-4 bg-orange-200"></div>
                        <div className="w-3/4 h-8 bg-white border border-orange-200 rounded flex items-center px-3 gap-2">
                           <div className="w-4 h-4 rounded-sm bg-orange-100"></div>
                           <div className="w-1/3 h-1.5 bg-orange-200 rounded"></div>
                        </div>
                     </div>
                   )}
                   {res.thumbnailType === 'split' && (
                     <div className="w-full h-full flex gap-3">
                        <div className="flex-1 bg-white border border-purple-100 rounded-lg p-3 flex flex-col gap-2">
                           <div className="w-1/2 h-1.5 bg-purple-200 rounded mb-2"></div>
                           <div className="w-full h-1 bg-purple-100 rounded"></div>
                           <div className="w-full h-1 bg-purple-100 rounded"></div>
                           <div className="w-3/4 h-1 bg-purple-100 rounded"></div>
                        </div>
                        <div className="flex-1 bg-white border border-purple-100 rounded-lg p-3 flex flex-col gap-2 opacity-70">
                           <div className="w-1/2 h-1.5 bg-purple-200 rounded mb-2"></div>
                           <div className="w-full h-1 bg-purple-100 rounded"></div>
                           <div className="w-5/6 h-1 bg-purple-100 rounded"></div>
                        </div>
                     </div>
                   )}
                </div>

                <div className="flex items-center gap-3 mb-4 text-xs">
                  <span className="font-bold text-now-primary bg-now-primary/10 px-2 py-1 rounded">{res.category}</span>
                  <span className="font-bold text-gray-500 uppercase tracking-wider">{res.difficulty}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-now-primary transition-colors leading-snug">
                      {res.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2">
                    {res.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    {res.author.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-gray-900">{res.author}</span>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-gray-500">{res.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                      <ThumbsUp className="w-4 h-4" /> {res.likes}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                      <MessageSquare className="w-4 h-4" /> {res.comments}
                    </span>
                    <span className="hidden sm:inline-block text-gray-400">·</span>
                    <span className="hidden sm:inline-block">{res.readTime}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${res.color}`}>
                    {res.icon} {res.tag}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
