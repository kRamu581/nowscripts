import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-[#020617] text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "filter blur-[80px] invert-0 pointer-events-none absolute -inset-[10px] opacity-40",
              `
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#8b5cf6_20%,#0ea5e9_30%,#6366f1_40%,#ec4899_50%)]
              [background-image:var(--dark-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]
              after:[background-size:200%,_100%] 
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-screen
              `
            )}
          ></div>
          {showRadialGradient && (
            <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)] pointer-events-none" />
          )}
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </main>
  );
};
