"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UpcomingEventProps {
  /** Short overline label shown above the event name. Default: "Upcoming Event" */
  label?: string;
  /** Main event name — displayed large */
  name: string;
  /** Subtitle / tagline shown below the name */
  tagline: string;
  /** Target date for the live countdown */
  date: Date;
  /** Human-readable date string shown in the info row e.g. "December 15, 2025" */
  dateLabel: string;
  /** Venue string shown in the info row. Pass null to hide. */
  venue: string | null;
  /**
   * Legacy single banner image URL.
   */
  bannerSrc?: string | null;
  /**
   * Array of banner image URLs.
   */
  banners?: string[];
  /** WhatsApp number WITH country code, no '+' or spaces e.g. "918818888899" */
  whatsappNumber: string;
  /** Optional pre-filled message for the WhatsApp link */
  whatsappMessage?: string;
  /** HTML id for the section — used for anchor links in the navbar */
  sectionId?: string;
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 md:w-14 h-16 md:h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl border border-gold/30 bg-white/3 backdrop-blur-sm" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold/8 to-transparent" />
        <span
          className="relative text-2xl md:text-xl font-light text-gold tabular-nums leading-none"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-medium">{label}</span>
    </div>
  );
}

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
        <p className="text-white/25 text-xs tracking-[0.4em] uppercase">Official Banner Coming Soon</p>
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

function OptimizedBanner({ src, name, priority = false, bgY }: { src: string; name: string, priority?: boolean, bgY?: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gold/15 shadow-[0_0_80px_rgba(201,169,110,0.08)] md:max-w-2xl md:mx-auto">
      {/* Placeholder with Skeleton effect */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <BannerPlaceholder name={name} />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.06) 50%, transparent 60%)",
          }}
        />
      </div>

      {/* Actual Image */}
      <motion.div style={{ y: bgY }} className={`relative w-full ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
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
      </motion.div>

      {/* Maintain aspect ratio while loading */}
      {!isLoaded && <div className="w-full aspect-[16/7] md:aspect-[21/8] invisible" />}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function UpcomingEvent({
  label = "Upcoming Event",
  name,
  tagline,
  date,
  dateLabel,
  venue,
  bannerSrc,
  banners,
  whatsappNumber,
  whatsappMessage,
  sectionId,
}: UpcomingEventProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const countdown = useCountdown(date);

  const waHref = whatsappMessage
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : `https://wa.me/${whatsappNumber}`;

  const infoItems = [
    { icon: Calendar, text: dateLabel },
    ...(venue ? [{ icon: MapPin, text: venue }] : []),
  ];

  const displayBanners = banners || (bannerSrc ? [bannerSrc] : []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative py-28 md:py-14 bg-[#070707] overflow-hidden"
    >
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gold/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4  w-[400px] h-[300px] bg-[#7c5c20]/12 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#7c5c20]/12 rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Floating particles ── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold/50"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Overline label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8 md:mb-4"
        >
          <div className="w-10 h-px bg-gold/50" />
          <div className="flex items-center gap-2">
            <Sparkles size={11} className="text-gold/70" />
            <span className="text-[10px] uppercase tracking-[0.55em] text-gold/70 font-medium">{label}</span>
            <Sparkles size={11} className="text-gold/70" />
          </div>
          <div className="w-10 h-px bg-gold/50" />
        </motion.div>

        {/* ── Event name ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-center mb-4"
        >
          <h2
            className="text-[64px] sm:text-[88px] md:text-[80px] lg:text-[95px] font-light leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e8c97a] to-gold/60 select-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {name}
          </h2>
          <Ornament className="w-40 mx-auto mt-3" />
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-center text-white/40 text-sm md:text-base tracking-[0.25em] uppercase mb-16 md:mb-6"
        >
          {tagline}
        </motion.p>

        {/* ── Banners ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full flex flex-col gap-6 md:gap-8 mb-16 md:mb-6"
        >
          {displayBanners.length > 0 ? (
            displayBanners.map((src, index) => (
              <OptimizedBanner key={src} src={src} name={name} bgY={bgY} priority={index === 0} />
            ))
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-gold/15 shadow-[0_0_80px_rgba(201,169,110,0.08)] md:max-w-2xl md:mx-auto">
              <BannerPlaceholder name={name} />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.06) 50%, transparent 60%)",
                }}
              />
            </div>
          )}
        </motion.div>

        {/* ── Info row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-16 md:mb-6"
        >
          {infoItems.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-white/45 text-sm tracking-wide">
              <Icon size={14} className="text-gold/60 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col items-center gap-6 mb-16 md:mb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/25">Event Begins In</span>
          <div className="flex items-end gap-3 md:gap-5">
            <CountUnit value={countdown.days}    label="Days"    />
            <span className="text-gold/40 text-2xl mb-5 leading-none">:</span>
            <CountUnit value={countdown.hours}   label="Hours"   />
            <span className="text-gold/40 text-2xl mb-5 leading-none">:</span>
            <CountUnit value={countdown.minutes} label="Minutes" />
            <span className="text-gold/40 text-2xl mb-5 leading-none">:</span>
            <CountUnit value={countdown.seconds} label="Seconds" />
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-9 py-4 bg-gold text-black font-semibold rounded-full hover:bg-[#e8c97a] hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(201,169,110,0.3)] text-sm tracking-[0.1em]"
          >
            Enquiry on WhatsApp
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
