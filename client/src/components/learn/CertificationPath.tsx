import React from 'react';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CertificationPath = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 mb-8 shadow-xl text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-now-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
          <Award className="w-8 h-8 text-now-primary" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">Your Certification Path</h3>
          <p className="text-slate-300 text-sm">Master ServiceNow by following the recommended sequence.</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-now-primary/20 text-now-primary px-3 py-1.5 rounded-lg border border-now-primary/30 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" /> CSA
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <div className="flex items-center gap-2 bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 font-semibold text-sm">
            CAD
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <div className="flex items-center gap-2 bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 font-semibold text-sm">
            CIS
          </div>
        </div>
      </div>
    </div>
  );
};
