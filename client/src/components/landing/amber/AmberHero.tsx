import { Search, CheckCircle, Shield, Clock } from "lucide-react";

export function AmberHero() {
  return (
    <section className="relative w-full min-h-[550px] md:min-h-[520px] flex items-center justify-center overflow-hidden pt-24 md:pt-16 pb-12 md:pb-0">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://prod-static-assets.amberstudent.com/images/bg_amber_sale.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60" /> {/* Dark overlay for text readability */}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 w-full text-center flex flex-col items-center mt-12 md:mt-0">
        
        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2 md:mb-4 drop-shadow-lg">
          Master ServiceNow Like a Pro
        </h1>
        <p className="text-base md:text-xl text-gray-100 font-medium mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md leading-snug">
          Learn from real-world scenarios, build enterprise projects, and ace your certifications.
        </p>

        {/* Trust Badges / Stats (similar to Amber's markers) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-white text-[13px] md:text-base font-medium px-2 mb-8 md:mb-12 max-w-[360px] md:max-w-none mx-auto">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span>Verified Properties</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span>24x7 Assistance</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 shadow-sm w-full sm:w-auto justify-center mt-1 sm:mt-0">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span>Lowest Price Guarantee</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-[100%] sm:w-[95%] max-w-3xl bg-white rounded-full p-1.5 flex items-center shadow-2xl mb-4 md:mb-12 relative">
          <div className="flex-1 flex items-center pl-4 pr-14 md:pr-0 w-full">
            <input 
              type="text" 
              placeholder="Search by CSA, CAD, or specific modules..." 
              className="w-full bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-gray-800 placeholder-gray-500 py-3 px-1 md:px-2 text-[14px] md:text-lg font-medium"
            />
          </div>
          <button className="absolute right-1.5 md:relative md:right-0 w-[42px] h-[42px] md:w-auto md:h-auto md:px-8 md:py-3.5 bg-[#FF5A5F] hover:bg-[#E82C45] text-white rounded-full flex items-center justify-center font-bold transition-colors shadow-md text-lg shrink-0">
            <Search className="w-5 h-5 md:hidden" strokeWidth={2.5} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>

      </div>
    </section>
  );
}
