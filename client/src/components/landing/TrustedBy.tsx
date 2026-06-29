import { motion } from "framer-motion";

export function TrustedBy() {
  const logos = [
    { name: "ServiceNow", svg: <svg className="h-8 md:h-10 text-white/50" viewBox="0 0 100 100" fill="currentColor"><text x="10" y="60" fontSize="40" fontWeight="bold">ServiceNow</text></svg> },
    { name: "Microsoft", svg: <svg className="h-8 md:h-10 text-white/50" viewBox="0 0 100 100" fill="currentColor"><text x="10" y="60" fontSize="40" fontWeight="bold">Microsoft</text></svg> },
    { name: "GitHub", svg: <svg className="h-8 md:h-10 text-white/50" viewBox="0 0 100 100" fill="currentColor"><text x="10" y="60" fontSize="40" fontWeight="bold">GitHub</text></svg> },
    { name: "AWS", svg: <svg className="h-8 md:h-10 text-white/50" viewBox="0 0 100 100" fill="currentColor"><text x="10" y="60" fontSize="40" fontWeight="bold">AWS</text></svg> },
    { name: "Salesforce", svg: <svg className="h-8 md:h-10 text-white/50" viewBox="0 0 100 100" fill="currentColor"><text x="10" y="60" fontSize="40" fontWeight="bold">Salesforce</text></svg> }
  ];

  return (
    <section className="py-12 bg-[#020617] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Master technologies trusted by industry leaders
        </p>
        
        {/* Simple text-based logos for mockup purposes */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl md:text-2xl font-black tracking-tighter">ServiceNow</div>
          <div className="text-xl md:text-2xl font-bold font-sans">Microsoft</div>
          <div className="text-xl md:text-2xl font-mono font-bold">GitHub</div>
          <div className="text-xl md:text-2xl font-black font-sans">AWS</div>
          <div className="text-xl md:text-2xl font-bold italic">Salesforce</div>
        </div>
        
        <p className="text-center text-xs text-slate-600 mt-8 max-w-2xl mx-auto">
          *Note: NowScripts is an independent educational platform. These logos represent the technologies our community works with and are not official partnerships.
        </p>
      </div>
    </section>
  );
}
