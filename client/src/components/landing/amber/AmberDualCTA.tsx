import { FileEdit, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberDualCTA() {
  // Panel 2 was omitted to ensure zero fabricated data points.
  return (
    <section className="bg-white pt-8 pb-10 md:pt-10 md:pb-12 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-[#FFF0ED] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#FFE4DE] shadow-sm">
          
          <div className="flex-1">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-[#FF5A3C]">
              <FileEdit className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Submit Your Experience
            </h2>
            <p className="text-gray-600 font-medium mb-8 max-w-lg leading-relaxed text-lg">
              Help the community by sharing your recent ServiceNow interview questions. Your contribution helps others land their dream roles.
            </p>
            <Link 
              to="/submit-experience"
              className="inline-flex items-center gap-2 bg-[#FF5A3C] hover:bg-[#E04B2F] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
            >
              Share Questions <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="hidden md:block w-64 shrink-0">
            {/* Minimal abstract illustration or icon representing community sharing */}
            <div className="w-full aspect-square rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" 
                alt="Community sharing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#FF5A3C]/20 mix-blend-multiply" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
