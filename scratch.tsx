import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`fill-gold/40 ${className}`} aria-hidden>
      <path d="M0 6 Q15 0 30 6 Q45 12 60 6 Q75 0 90 6 Q105 12 120 6" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="60" cy="6" r="2.5" />
      <circle cx="0"  cy="6" r="1.5" />
      <circle cx="120" cy="6" r="1.5" />
    </svg>
  );
}

function BannerPlaceholder({ name }: { name: string }) {
  return (
    <div className="relative w-full aspect-[16/7] md:aspect-[21/8] bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial burst */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,169,110,0.12),transparent)]" />
      {/* Center */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 backdrop-blur-sm">
          <Sparkles className="text-gold/70" size={28} />
        </div>
        <p className="text-white/25 text-xs tracking-[0.4em] uppercase">Loading Banner...</p>
        <Ornament className="w-32" />
        <p
          className="text-gold/40 text-2xl md:text-4xl font-light"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {name}
        </p>
      </div>
      {/* Corner marks */}
      {(["top-4 left-4 border-t border-l rounded-tl-sm",
         "top-4 right-4 border-t border-r rounded-tr-sm",
         "bottom-4 left-4 border-b border-l rounded-bl-sm",
         "bottom-4 right-4 border-b border-r rounded-br-sm"] as const).map((cls) => (
        <div key={cls} className={`absolute w-6 h-6 border-gold/30 ${cls}`} />
      ))}
    </div>
  );
}

export function OptimizedBanner({ src, name, priority = false }: { src: string; name: string, priority?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 border border-gold/15 shadow-[0_0_80px_rgba(201,169,110,0.08)] md:max-w-2xl md:mx-auto">
      {/* Placeholder with Skeleton effect */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <BannerPlaceholder name={name} />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.08) 50%, transparent 60%)",
            }}
          />
        </div>
      )}

      {/* Actual Image */}
      <div className={`relative w-full ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        {/* We keep it in flow so it gives height to the container if it's loaded, or use an aspect-ratio container */}
        <Image
          src={src}
          alt={`${name} event banner`}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-auto block"
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      </div>
      
      {/* Hack: if image is not loaded, we still need the container to have height so we put a transparent invisible placeholder in DOM */}
      {!isLoaded && <div className="w-full aspect-[16/7] md:aspect-[21/8] invisible"></div>}
    </div>
  );
}
