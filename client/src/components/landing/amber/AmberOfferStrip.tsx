import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberOfferStrip() {
  return (
    <div className="w-full bg-[#FFF0ED] border-y border-[#FFE4DE] py-3 px-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 text-center">
        <Sparkles className="w-4 h-4 text-[#FF5A3C] shrink-0" />
        <p className="text-sm md:text-base font-semibold text-gray-800">
          <span className="text-[#FF5A3C] font-bold mr-2">New:</span> 
          50+ Fresh CSA Interview Questions Added This Month
        </p>
        <Link to="/interview-prep" className="hidden sm:flex items-center gap-1 text-[#FF5A3C] text-sm font-bold hover:underline ml-2">
          View Questions <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
