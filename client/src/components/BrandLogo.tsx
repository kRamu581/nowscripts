export const BrandLogo = ({ className = "", textColor = "text-slate-900", dotColor = "bg-[#FF5A5F]" }: { className?: string, hideTextOnMobile?: boolean, textColor?: string, dotColor?: string }) => (
  <div className={`flex items-baseline gap-0.5 ${className}`}>
    <span className={`font-extrabold text-[22px] md:text-[26px] font-sans tracking-tight lowercase ${textColor}`}>
      nowscripts
    </span>
    <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${dotColor}`}></span>
  </div>
);

export const BrandIconOnly = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img src="/icon-192.png" alt="nowscripts logo" className="h-[75%] w-auto object-contain rounded-xl shadow-sm" />
  </div>
);
