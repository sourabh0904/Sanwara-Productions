"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SANWARA = [
  { code: "DVqoRb2iqk0", href: "https://www.instagram.com/sanwara_production/p/DVqoRb2iqk0/" },
  { code: "DSPwvV_E7ZN",  href: "https://www.instagram.com/sanwara_production/p/DSPwvV_E7ZN/" },
  { code: "DRz9kljE0qs",  href: "https://www.instagram.com/sanwara_production/p/DRz9kljE0qs/" },
  { code: "DOy3RcoCqKE",  href: "https://www.instagram.com/sanwara_production/reel/DOy3RcoCqKE/" },
  { code: "DOYbDNDj8Ic",  href: "https://www.instagram.com/sanwara_production/reel/DOYbDNDj8Ic/" },
  { code: "DNyEEkyQnZJ",  href: "https://www.instagram.com/sanwara_production/reel/DNyEEkyQnZJ/" },
  { code: "DNuoGf_ZqNg",  href: "https://www.instagram.com/sanwara_production/reel/DNuoGf_ZqNg/" },
  { code: "DNuklxE2rhw",  href: "https://www.instagram.com/sanwara_production/reel/DNuklxE2rhw/" },
  { code: "DNuQgXl1C2S",  href: "https://www.instagram.com/sanwara_production/reel/DNuQgXl1C2S/" },
  { code: "DNoGoTvzEIf",  href: "https://www.instagram.com/sanwara_production/reel/DNoGoTvzEIf/" },
  { code: "DNkzn8SqFsG",  href: "https://www.instagram.com/sanwara_production/reel/DNkzn8SqFsG/" },
  { code: "DMCJExbKFeU",  href: "https://www.instagram.com/sanwara_production/reel/DMCJExbKFeU/" },
  { code: "DLshE-dqZC3",  href: "https://www.instagram.com/sanwara_production/reel/DLshE-dqZC3/" },
  { code: "DJUsiifzy1G",  href: "https://www.instagram.com/sanwara_production/reel/DJUsiifzy1G/" },
  { code: "DJL40b3pAeo",  href: "https://www.instagram.com/wave_entertainments/p/DJL40b3pAeo/" },
  { code: "DGqww_nKZx1",  href: "https://www.instagram.com/sanwara_production/reel/DGqww_nKZx1/" },
  { code: "DGaT1SFz6wq",  href: "https://www.instagram.com/sanwara_production/reel/DGaT1SFz6wq/" },
  { code: "DEwwfjCzVLo",  href: "https://www.instagram.com/sanwara_production/p/DEwwfjCzVLo/" },
  { code: "C-Nv2JuSEwN",  href: "https://www.instagram.com/sanwara_production/p/C-Nv2JuSEwN/" },
  { code: "C-ILn6To2gr",  href: "https://www.instagram.com/sanwara_production/p/C-ILn6To2gr/" },
  { code: "C-GMRaAoYIo",  href: "https://www.instagram.com/sanwara_production/reel/C-GMRaAoYIo/" },
  { code: "C98B1phSQpL",  href: "https://www.instagram.com/sanwara_production/reel/C98B1phSQpL/" },
  { code: "C97g2fgy_dA",  href: "https://www.instagram.com/sanwara_production/reel/C97g2fgy_dA/" },
  { code: "C960OL9pkw3",  href: "https://www.instagram.com/sanwara_production/reel/C960OL9pkw3/" },
  { code: "C9wOMXTpDup",  href: "https://www.instagram.com/sanwara_production/reel/C9wOMXTpDup/" },
  { code: "C9myXSrSoOf",  href: "https://www.instagram.com/sanwara_production/reel/C9myXSrSoOf/" },
  { code: "C9cnY__tUHB",  href: "https://www.instagram.com/sanwara_production/p/C9cnY__tUHB/" },
] as const;

const MALWANA = [
  { code: "DPLOlDPjGFI",  href: "https://www.instagram.com/malwanagarbaindore/p/DPLOlDPjGFI/" },
  { code: "DPJOPYjDzGn",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJOPYjDzGn/" },
  { code: "DPJNpx0j1Sa",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNpx0j1Sa/" },
  { code: "DPJNjP9D9Cs",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNjP9D9Cs/" },
  { code: "DPJNGceDx6J",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNGceDx6J/" },
  { code: "DPIwkTZj1Dn",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPIwkTZj1Dn/" },
  { code: "DPIDk88jw0q",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPIDk88jw0q/" },
  { code: "DPGKZ7qj3i0",  href: "https://www.instagram.com/malwanagarbaindore/p/DPGKZ7qj3i0/" },
  { code: "DPFZMe8k52y",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFZMe8k52y/" },
  { code: "DPFYOw_DRVe",  href: "https://www.instagram.com/malwanagarbaindore/p/DPFYOw_DRVe/" },
  { code: "DPFV9B-kykx",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFV9B-kykx/" },
  { code: "DPFTGriEySq",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFTGriEySq/" },
  { code: "DPFQmgxk18S",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFQmgxk18S/" },
  { code: "DPBmAx6DwJH",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBmAx6DwJH/" },
  { code: "DPBlKMYj-w4",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBlKMYj-w4/" },
  { code: "DPBfGNzjxhl",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBfGNzjxhl/" },
  { code: "DPBdSf9D9gv",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBdSf9D9gv/" },
  { code: "DPBT5s4EvSj",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBT5s4EvSj/" },
  { code: "DPBNQdrDfMg",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBNQdrDfMg/" },
  { code: "DPABaCbDusV",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPABaCbDusV/" },
  { code: "DO9CH4aElEh",  href: "https://www.instagram.com/malwanagarbaindore/reel/DO9CH4aElEh/" },
  { code: "DO8yBumjyIF",  href: "https://www.instagram.com/malwanagarbaindore/reel/DO8yBumjyIF/" },
  { code: "DOpXvvQjT7E",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOpXvvQjT7E/" },
  { code: "DOala4UEmbZ",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOala4UEmbZ/" },
  { code: "DOYbDNDj8Ic",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOYbDNDj8Ic/" },
  { code: "DOVg5UgAnCQ",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOVg5UgAnCQ/" },
  { code: "DOOYy98D7-S",  href: "https://www.instagram.com/malwanagarbaindore/p/DOOYy98D7-S/" },
  { code: "DOOYuqsD1-N",  href: "https://www.instagram.com/malwanagarbaindore/p/DOOYuqsD1-N/" },
] as const;

type Reel = { code: string; href: string };

// ─── Card ─────────────────────────────────────────────────────────────────────

const EMBED_BASE_W  = 328;
const EMBED_HEADER_H = 54;
const CARD_W        = 180; // fixed card width in the marquee (px)

function ReelCard({
  reel, index, account, onOpen,
}: {
  reel: Reel; index: number;
  account: "sanwara" | "malwana";
  onOpen: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const scale = CARD_W / EMBED_BASE_W;
  const iframeH = Math.round(EMBED_BASE_W * (16 / 9) + EMBED_HEADER_H);
  const cardH   = Math.round(CARD_W * (16 / 9));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLoaded(true); io.disconnect(); } },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accentColor = account === "sanwara" ? "#C9A96E" : "#e879f9";
  const label       = account === "sanwara" ? "@sanwara_production" : "@malwanagarbaindore";

  return (
    <div
      ref={containerRef}
      className="group relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden bg-[#111]"
      style={{ width: CARD_W, height: cardH }}
      onClick={onOpen}
    >
      {/* Iframe preview */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {loaded ? (
          <iframe
            src={`https://www.instagram.com/p/${reel.code}/embed/`}
            scrolling="no"
            title={`Reel ${index + 1}`}
            style={{
              width:  EMBED_BASE_W,
              height: iframeH,
              border: "none",
              display: "block",
              transformOrigin: "top left",
              transform: `scale(${scale}) translateY(-${EMBED_HEADER_H}px)`,
              pointerEvents: "none",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1208] via-[#111] to-[#0a0a0a] animate-pulse" />
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/35 z-10 transition-opacity duration-300 group-hover:from-black/60" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="relative w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ border: `1px solid ${accentColor}55`, boxShadow: `0 0 0 0 ${accentColor}00` }}
        >
          <Play size={13} className="ml-0.5 transition-colors duration-300" style={{ color: accentColor }} fill={accentColor} />
          <span className="absolute inset-0 rounded-full animate-ping" style={{ border: `1px solid ${accentColor}30` }} />
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-2 py-2">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accentColor }} />
          <span className="text-white/40 text-[8px] font-light tracking-wide truncate">{label}</span>
        </div>
      </div>

      {/* Accent border */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 0 1px ${accentColor}35` }}
      />
    </div>
  );
}

// ─── Marquee Row ─────────────────────────────────────────────────────────────

function MarqueeRow({
  reels, direction, account, label, accentColor, onOpenReel,
}: {
  reels: readonly Reel[];
  direction: "left" | "right";
  account: "sanwara" | "malwana";
  label: string;
  accentColor: string;
  onOpenReel: (reels: readonly Reel[], index: number) => void;
}) {
  // Duplicate for seamless looping
  const doubled = [...reels, ...reels];
  const dur     = `${reels.length * 4}s`;

  return (
    <div className="mb-6 last:mb-0">
      {/* Row label */}
      <div className="flex items-center gap-3 mb-3 px-4 md:px-0">
        <div className="w-1 h-3 rounded-full" style={{ background: accentColor }} />
        <a
          href={`https://www.instagram.com/${account === "sanwara" ? "sanwara_production" : "malwanagarbaindore"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-light tracking-widest transition-colors duration-200"
          style={{ color: `${accentColor}99` }}
          onClick={(e) => e.stopPropagation()}
        >
          <InstagramIcon size={10} />
          {label}
          <ExternalLink size={9} className="opacity-50" />
        </a>
        <div className="flex-1 h-px" style={{ background: `${accentColor}15` }} />
        <span className="text-white/15 text-[10px] font-light">{reels.length} reels</span>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden">
        <div
          className={direction === "left" ? "marquee-left" : "marquee-right"}
          style={{ "--marquee-dur": dur, display: "flex", gap: "10px", width: "max-content" } as React.CSSProperties}
        >
          {doubled.map((reel, i) => (
            <ReelCard
              key={`${reel.code}-${i}`}
              reel={reel}
              index={i % reels.length}
              account={account}
              onOpen={() => onOpenReel(reels, i % reels.length)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ReelModal({
  reels, index, onClose, onPrev, onNext,
}: {
  reels: readonly Reel[];
  index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  const reel  = reels[index];
  const total = reels.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5 pb-4 bg-gradient-to-b from-black/80 to-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <InstagramIcon size={13} />
          <span className="text-white/40 text-xs font-light tracking-[0.3em] uppercase">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={reel.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/55 hover:text-gold hover:border-gold/40 text-xs transition-all duration-200"
          >
            <ExternalLink size={10} /> Open
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold text-black font-semibold text-xs tracking-wide shadow-xl active:scale-95 transition-transform"
          >
            <X size={12} strokeWidth={2.5} /> Close
          </button>
        </div>
      </div>

      {/* Iframe */}
      <motion.div
        key={reel.code}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/8"
        style={{ aspectRatio: "9/16", maxHeight: "82vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          key={reel.code}
          src={`https://www.instagram.com/p/${reel.code}/embed/`}
          width="100%" height="100%"
          style={{ border: "none", display: "block" }}
          scrolling="no"
          title={`Reel ${reel.code}`}
        />
      </motion.div>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/60 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200" aria-label="Previous"><ChevronLeft size={18} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/60 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200" aria-label="Next"><ChevronRight size={18} /></button>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function InstagramReels() {
  const [modal, setModal] = useState<{ reels: readonly Reel[]; index: number } | null>(null);

  const openReel  = (reels: readonly Reel[], index: number) => { setModal({ reels, index }); document.documentElement.setAttribute("data-modal-open", "true"); };
  const closeReel = () => { setModal(null); document.documentElement.removeAttribute("data-modal-open"); };
  const prevReel  = () => setModal((m) => m ? { ...m, index: (m.index - 1 + m.reels.length) % m.reels.length } : null);
  const nextReel  = () => setModal((m) => m ? { ...m, index: (m.index + 1) % m.reels.length } : null);

  const total = SANWARA.length + MALWANA.length;

  return (
    <section id="reels" className="py-24 md:py-28 bg-[#080808] relative z-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-12 px-4 md:px-6 lg:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/60" />
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Instagram</p>
            </div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Behind the<br />
              <em className="italic font-semibold">Lens</em>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/3 border border-white/6">
              <span className="text-white/30 text-xs font-light">Total</span>
              <span
                className="text-2xl font-light"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#C9A96E" }}
              >
                {total}
              </span>
              <span className="text-white/25 text-xs font-light">reels</span>
            </div>
            <p className="text-white/20 text-[10px] font-light tracking-[0.3em] uppercase hidden md:block">
              Hover to pause · click to watch
            </p>
          </div>
        </motion.div>

        {/* ── Marquee rows ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <MarqueeRow
            reels={SANWARA}
            direction="left"
            account="sanwara"
            label="@sanwara_production"
            accentColor="#C9A96E"
            onOpenReel={openReel}
          />
          <MarqueeRow
            reels={MALWANA}
            direction="right"
            account="malwana"
            label="@malwanagarbaindore"
            accentColor="#e879f9"
            onOpenReel={openReel}
          />
        </motion.div>

        {/* Mobile hint */}
        <p className="text-center text-white/15 text-[10px] font-light tracking-[0.3em] uppercase mt-6 px-4">
          Tap any reel to watch
        </p>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal !== null && (
          <ReelModal
            reels={modal.reels}
            index={modal.index}
            onClose={closeReel}
            onPrev={prevReel}
            onNext={nextReel}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
