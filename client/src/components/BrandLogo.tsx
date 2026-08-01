export const BrandLogo = ({ className = "", textColor = "text-slate-900", dotColor = "bg-[#FF5A5F]" }: { className?: string, hideTextOnMobile?: boolean, textColor?: string, dotColor?: string }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <span className={`font-extrabold text-[28px] md:text-[32px] font-sans tracking-tight lowercase ${textColor}`}>
      nowscripts
    </span>
    <span className={`w-2 h-2 rounded-full mt-2.5 ${dotColor}`}></span>
  </div>
);

export const BrandIconOnly = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img src="/icon-192.png" alt="nowscripts logo" className="h-[75%] w-auto object-contain rounded-xl shadow-sm" />
  </div>
);
