import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function AmberOfferStrip() {
  return (
    <div className="w-full bg-white pt-8 pb-4">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 flex justify-center">
        <Link 
          to="/pricing"
          className="flex items-center justify-between w-full md:w-auto bg-[#FFFBF5] border border-[#F6DEC0] rounded-full px-4 sm:px-8 py-2.5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-6 h-6 rounded-full bg-[#E8B257] text-white flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="text-[13px] sm:text-[15px] text-[#374151] mx-4 text-center">
            <strong className="text-black font-black uppercase tracking-wide mr-2">Exclusive Offer:</strong> 
            100% Free
          </p>
          <div className="w-6 h-6 rounded-full bg-[#E8B257] text-white flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
