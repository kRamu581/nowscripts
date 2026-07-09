import { motion } from "framer-motion";

export function LatestUpdatesTimeline() {
  const updates = [
    { date: "June 2026", title: "253 Interview Questions Added", desc: "Massive expansion to our interview prep repository covering CSA, CAD, and ITSM. Includes detailed answers and scenario-based examples." },
    { date: "May 2026", title: "CSA Roadmap Updated", desc: "Aligned with the latest Vancouver & Washington DC releases. Added new labs for Flow Designer and Integration Hub." },
    { date: "April 2026", title: "CAD Practice Questions", desc: "Added 50 new scripting scenario-based questions designed to test your knowledge of business rules, script includes, and GlideRecord." },
  ];

  return (
    <section className="py-24 bg-white relative border-b border-gray-100 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 w-[600px] h-[600px] bg-now-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Platform Updates</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            We continuously improve the platform so you always have the latest ServiceNow knowledge.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-100 before:via-gray-200 before:to-gray-100">
          {updates.map((update, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Glowing Node */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-now-primary ring-4 ring-now-primary/20"></div>
              </div>
              
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-3rem)] bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="font-bold text-gray-900 text-xl">{update.title}</h3>
                  <span className="text-xs font-bold text-now-primary bg-now-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap self-start sm:self-auto border border-now-primary/10">
                    {update.date}
                  </span>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">{update.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
