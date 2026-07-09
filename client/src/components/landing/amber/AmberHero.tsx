import { Search, CheckCircle, Shield, Clock } from "lucide-react";

export function AmberHero() {
  return (
    <section className="relative w-full h-[450px] md:h-[520px] flex items-center justify-center overflow-hidden pt-28 md:pt-16">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://prod-static-assets.amberstudent.com/images/bg_amber_sale.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60" /> {/* Dark overlay for text readability */}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 w-full text-center flex flex-col items-center">
        
        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
          Master ServiceNow Like a Pro
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-medium mb-10 max-w-2xl mx-auto drop-shadow-md">
          Learn from real-world scenarios, build enterprise projects, and ace your certifications.
        </p>

        {/* Search Bar */}
        <div className="w-[95%] max-w-3xl bg-white rounded-full p-1.5 flex items-center shadow-2xl mb-12">
          <div className="flex-1 flex items-center pl-4 w-full">
            <input 
              type="text" 
              placeholder="Search by CSA, CAD, or specific modules..." 
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800 placeholder-gray-500 py-3 px-2 text-[15px] md:text-lg font-medium"
            />
          </div>
          <button className="w-12 h-12 md:w-auto md:h-auto md:px-8 md:py-3.5 bg-[#FF5A5F] hover:bg-[#E82C45] text-white rounded-full flex items-center justify-center font-bold transition-colors shadow-md text-lg shrink-0">
            <Search className="w-5 h-5 md:hidden" strokeWidth={2.5} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>

        {/* Trust Badges / Stats (similar to Amber's markers) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-white text-[11px] sm:text-[13px] md:text-base font-medium px-2">
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-md border border-white/20">
            <CheckCircle className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
            <span>Verified Properties</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-md border border-white/20">
            <Shield className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
            <span>24x7 Assistance</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-md border border-white/20">
            <Clock className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
            <span>Lowest Price Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
}
