export const BrandLogo = ({ className = "", hideTextOnMobile = true, textColor = "text-black" }: { className?: string, hideTextOnMobile?: boolean, textColor?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img src="/icon-192.png" alt="NowScripts" className="h-[28px] w-[28px] md:h-[32px] md:w-[32px] rounded-[8px] object-cover" />
    <span className={`font-extrabold text-[28px] md:text-[32px] font-sans tracking-tight lowercase ${textColor} ${hideTextOnMobile ? 'hidden md:block' : ''}`}>
      nowscripts
    </span>
  </div>
);

export const BrandIconOnly = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img src="/icon-192.png" alt="nowscripts logo" className="h-[75%] w-auto object-contain rounded-xl shadow-sm" />
  </div>
);
