export const BrandLogo = ({ className = "", hideTextOnMobile = true, textColor = "text-black" }: { className?: string, hideTextOnMobile?: boolean, textColor?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className={`font-extrabold text-[28px] md:text-[32px] font-sans tracking-tight lowercase ${textColor} ${hideTextOnMobile ? 'hidden md:block' : ''}`}>
      nowscripts
    </span>
  </div>
);

export const BrandIconOnly = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <span className="font-extrabold text-[28px] md:text-[32px] font-sans tracking-tight lowercase text-black">
      n
    </span>
  </div>
);
