import { motion } from "framer-motion";

export function TrustSection() {
  const stats = [
    { value: "50,000+", label: "Learners" },
    { value: "250+", label: "Interview Questions" },
    { value: "100+", label: "Projects" },
    { value: "20+", label: "Roadmaps" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Trusted by Professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-gray-900 tracking-tight">ServiceNow</span>
            <span className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
               GitHub
            </span>
            <span className="text-2xl font-bold text-blue-700 tracking-tight">LinkedIn</span>
            <span className="text-2xl font-bold text-gray-600 tracking-tight">Microsoft</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
