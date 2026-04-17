"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Instagram embed constants
// Render iframe at this width; scale it down to fill the card.
const EMBED_W = 328;
// Instagram embed header height (username/avatar row) — we hide this.
const EMBED_HEADER = 58;
// Total iframe height = header + pure 9:16 media — footer is auto-clipped by overflow:hidden.
const EMBED_H = EMBED_HEADER + Math.round(EMBED_W * (16 / 9));

// ─── Icons ────────────────────────────────────────────────────────────────────

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

type Reel = { code: string; href: string; account: "sanwara" | "malwana" };

const SANWARA: Reel[] = [
  { code: "DVqoRb2iqk0", href: "https://www.instagram.com/sanwara_production/p/DVqoRb2iqk0/",      account: "sanwara" },
  { code: "DSPwvV_E7ZN",  href: "https://www.instagram.com/sanwara_production/p/DSPwvV_E7ZN/",       account: "sanwara" },
  { code: "DRz9kljE0qs",  href: "https://www.instagram.com/sanwara_production/p/DRz9kljE0qs/",       account: "sanwara" },
  { code: "DOy3RcoCqKE",  href: "https://www.instagram.com/sanwara_production/reel/DOy3RcoCqKE/",    account: "sanwara" },
  { code: "DOYbDNDj8Ic",  href: "https://www.instagram.com/sanwara_production/reel/DOYbDNDj8Ic/",    account: "sanwara" },
  { code: "DNyEEkyQnZJ",  href: "https://www.instagram.com/sanwara_production/reel/DNyEEkyQnZJ/",    account: "sanwara" },
  { code: "DNuoGf_ZqNg",  href: "https://www.instagram.com/sanwara_production/reel/DNuoGf_ZqNg/",    account: "sanwara" },
  { code: "DNuklxE2rhw",  href: "https://www.instagram.com/sanwara_production/reel/DNuklxE2rhw/",    account: "sanwara" },
  { code: "DNuQgXl1C2S",  href: "https://www.instagram.com/sanwara_production/reel/DNuQgXl1C2S/",    account: "sanwara" },
  { code: "DNoGoTvzEIf",  href: "https://www.instagram.com/sanwara_production/reel/DNoGoTvzEIf/",    account: "sanwara" },
  { code: "DNkzn8SqFsG",  href: "https://www.instagram.com/sanwara_production/reel/DNkzn8SqFsG/",    account: "sanwara" },
  { code: "DMCJExbKFeU",  href: "https://www.instagram.com/sanwara_production/reel/DMCJExbKFeU/",    account: "sanwara" },
  { code: "DLshE-dqZC3",  href: "https://www.instagram.com/sanwara_production/reel/DLshE-dqZC3/",    account: "sanwara" },
  { code: "DJUsiifzy1G",  href: "https://www.instagram.com/sanwara_production/reel/DJUsiifzy1G/",    account: "sanwara" },
  { code: "DJL40b3pAeo",  href: "https://www.instagram.com/wave_entertainments/p/DJL40b3pAeo/",     account: "sanwara" },
  { code: "DGqww_nKZx1",  href: "https://www.instagram.com/sanwara_production/reel/DGqww_nKZx1/",    account: "sanwara" },
  { code: "DGaT1SFz6wq",  href: "https://www.instagram.com/sanwara_production/reel/DGaT1SFz6wq/",    account: "sanwara" },
  { code: "DEwwfjCzVLo",  href: "https://www.instagram.com/sanwara_production/p/DEwwfjCzVLo/",       account: "sanwara" },
  { code: "C-Nv2JuSEwN",  href: "https://www.instagram.com/sanwara_production/p/C-Nv2JuSEwN/",       account: "sanwara" },
  { code: "C-ILn6To2gr",  href: "https://www.instagram.com/sanwara_production/p/C-ILn6To2gr/",       account: "sanwara" },
  { code: "C-GMRaAoYIo",  href: "https://www.instagram.com/sanwara_production/reel/C-GMRaAoYIo/",    account: "sanwara" },
  { code: "C98B1phSQpL",  href: "https://www.instagram.com/sanwara_production/reel/C98B1phSQpL/",    account: "sanwara" },
  { code: "C97g2fgy_dA",  href: "https://www.instagram.com/sanwara_production/reel/C97g2fgy_dA/",    account: "sanwara" },
  { code: "C960OL9pkw3",  href: "https://www.instagram.com/sanwara_production/reel/C960OL9pkw3/",    account: "sanwara" },
  { code: "C9wOMXTpDup",  href: "https://www.instagram.com/sanwara_production/reel/C9wOMXTpDup/",    account: "sanwara" },
  { code: "C9myXSrSoOf",  href: "https://www.instagram.com/sanwara_production/reel/C9myXSrSoOf/",    account: "sanwara" },
  { code: "C9cnY__tUHB",  href: "https://www.instagram.com/sanwara_production/p/C9cnY__tUHB/",       account: "sanwara" },
];

const MALWANA: Reel[] = [
  { code: "DPLOlDPjGFI",  href: "https://www.instagram.com/malwanagarbaindore/p/DPLOlDPjGFI/",      account: "malwana" },
  { code: "DPJOPYjDzGn",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJOPYjDzGn/",   account: "malwana" },
  { code: "DPJNpx0j1Sa",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNpx0j1Sa/",   account: "malwana" },
  { code: "DPJNjP9D9Cs",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNjP9D9Cs/",   account: "malwana" },
  { code: "DPJNGceDx6J",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPJNGceDx6J/",   account: "malwana" },
  { code: "DPIwkTZj1Dn",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPIwkTZj1Dn/",   account: "malwana" },
  { code: "DPIDk88jw0q",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPIDk88jw0q/",   account: "malwana" },
  { code: "DPGKZ7qj3i0",  href: "https://www.instagram.com/malwanagarbaindore/p/DPGKZ7qj3i0/",      account: "malwana" },
  { code: "DPFZMe8k52y",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFZMe8k52y/",   account: "malwana" },
  { code: "DPFYOw_DRVe",  href: "https://www.instagram.com/malwanagarbaindore/p/DPFYOw_DRVe/",      account: "malwana" },
  { code: "DPFV9B-kykx",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFV9B-kykx/",   account: "malwana" },
  { code: "DPFTGriEySq",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFTGriEySq/",   account: "malwana" },
  { code: "DPFQmgxk18S",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPFQmgxk18S/",   account: "malwana" },
  { code: "DPBmAx6DwJH",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBmAx6DwJH/",      account: "malwana" },
  { code: "DPBlKMYj-w4",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBlKMYj-w4/",   account: "malwana" },
  { code: "DPBfGNzjxhl",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBfGNzjxhl/",      account: "malwana" },
  { code: "DPBdSf9D9gv",  href: "https://www.instagram.com/malwanagarbaindore/p/DPBdSf9D9gv/",      account: "malwana" },
  { code: "DPBT5s4EvSj",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBT5s4EvSj/",   account: "malwana" },
  { code: "DPBNQdrDfMg",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPBNQdrDfMg/",   account: "malwana" },
  { code: "DPABaCbDusV",  href: "https://www.instagram.com/malwanagarbaindore/reel/DPABaCbDusV/",   account: "malwana" },
  { code: "DO9CH4aElEh",  href: "https://www.instagram.com/malwanagarbaindore/reel/DO9CH4aElEh/",   account: "malwana" },
  { code: "DO8yBumjyIF",  href: "https://www.instagram.com/malwanagarbaindore/reel/DO8yBumjyIF/",   account: "malwana" },
  { code: "DOpXvvQjT7E",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOpXvvQjT7E/",   account: "malwana" },
  { code: "DOala4UEmbZ",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOala4UEmbZ/",   account: "malwana" },
  { code: "DOYbDNDj8Ic",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOYbDNDj8Ic/",   account: "malwana" },
  { code: "DOVg5UgAnCQ",  href: "https://www.instagram.com/malwanagarbaindore/reel/DOVg5UgAnCQ/",   account: "malwana" },
  { code: "DOOYy98D7-S",  href: "https://www.instagram.com/malwanagarbaindore/p/DOOYy98D7-S/",      account: "malwana" },
  { code: "DOOYuqsD1-N",  href: "https://www.instagram.com/malwanagarbaindore/p/DOOYuqsD1-N/",      account: "malwana" },
];

// Interleave both accounts for visual variety in columns
function interleave(a: Reel[], b: Reel[]): Reel[] {
  const out: Reel[] = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}
const ALL = interleave(SANWARA, MALWANA); // 55 reels, alternating accounts

// ─── Wall column config ────────────────────────────────────────────────────────
const WALL_COLS = [
  { reels: ALL.filter((_, i) => i % 6 === 0), dir: "up",   dur: "170s", delay: "0s"    },
  { reels: ALL.filter((_, i) => i % 6 === 1), dir: "down", dur: "140s", delay: "-22s"  },
  { reels: ALL.filter((_, i) => i % 6 === 2), dir: "up",   dur: "190s", delay: "-55s"  },
  { reels: ALL.filter((_, i) => i % 6 === 3), dir: "down", dur: "155s", delay: "-10s"  },
  { reels: ALL.filter((_, i) => i % 6 === 4), dir: "up",   dur: "180s", delay: "-38s"  },
  { reels: ALL.filter((_, i) => i % 6 === 5), dir: "down", dur: "145s", delay: "-70s"  },
] as const;

// ─── Mobile Card ─────────────────────────────────────────────────────────────

function MobileCard({ reel, idx, accent, onOpen }: { reel: Reel; idx: number; accent: string; onOpen: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale,  setScale]  = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / EMBED_W));
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="group relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden select-none"
      style={{ width: "42vw", maxWidth: 200, aspectRatio: "9/16", background: "#0a0a0a" }}
      onClick={onOpen}
    >
      {/* iframe preview */}
      <div className="absolute inset-0 overflow-hidden">
        {inView && scale > 0 ? (
          <iframe
            src={`https://www.instagram.com/p/${reel.code}/embed/`}
            scrolling="no"
            title={`mob-${reel.code}`}
            style={{
              width:           EMBED_W,
              height:          EMBED_H,
              border:          "none",
              display:         "block",
              transformOrigin: "top left",
              transform:       `scale(${scale}) translateY(-${EMBED_HEADER}px)`,
              pointerEvents:   "none",
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-b ${CARD_BG[idx % CARD_BG.length]} animate-pulse`} />
        )}
      </div>

      {/* Dark veil */}
      <div className="absolute inset-0 bg-black/25 group-active:bg-black/10 transition-opacity duration-200 pointer-events-none z-10" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {/* Top-left glow bar */}
      <div className="absolute top-0 left-0 w-full h-px pointer-events-none z-20" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />

      {/* Play button */}
      <div className="absolute inset-0 flex items-end justify-between px-3 pb-3 z-20">
        <div
          className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-active:scale-90"
          style={{ border: `1px solid ${accent}50` }}
        >
          <Play size={10} className="ml-0.5" style={{ color: accent }} fill={accent} />
        </div>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, opacity: 0.7 }} />
      </div>
    </div>
  );
}

// ─── Wall Card ────────────────────────────────────────────────────────────────

// Subtle dark gradient variants so no two adjacent cards look identical
const CARD_BG = [
  "from-[#1c1408] to-[#0a0803]",   // warm gold
  "from-[#080808] to-[#050505]",   // pure black
  "from-[#12080b] to-[#080406]",   // burgundy
  "from-[#080c14] to-[#05080e]",   // midnight
  "from-[#0d1208] to-[#080b05]",   // forest
  "from-[#100818] to-[#07050e]",   // deep violet
];

function WallCard({ reel, idx, onOpen }: { reel: Reel; idx: number; onOpen: () => void }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [scale,  setScale]  = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Measure column width → calc scale to fill card
    const ro = new ResizeObserver(() => setScale(el.clientWidth / EMBED_W));
    ro.observe(el);
    // Lazy-load: only inject iframe once card is near viewport
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const dotClr = reel.account === "sanwara" ? "#C9A96E" : "#e879f9";

  return (
    <div
      ref={wrapRef}
      className="group relative w-full cursor-pointer rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: "9/16", background: "#0a0a0a" }}
      onClick={onOpen}
    >
      {/* ── Scaled + clipped iframe preview ──
          • Rendered at EMBED_W px, scaled to fit card width
          • translateY(-EMBED_HEADER) hides the username/avatar header row
          • overflow:hidden on parent clips the likes/comments footer automatically
          • pointerEvents:none lets our overlay handle clicks                    */}
      <div className="absolute inset-0 overflow-hidden">
        {inView && scale > 0 ? (
          <iframe
            src={`https://www.instagram.com/p/${reel.code}/embed/`}
            scrolling="no"
            title={`reel-${reel.code}`}
            style={{
              width:           EMBED_W,
              height:          EMBED_H,
              border:          "none",
              display:         "block",
              transformOrigin: "top left",
              // translateY moves BEFORE scale (right-to-left CSS order),
              // so -EMBED_HEADER px is in iframe-space → header shifts above card
              transform:       `scale(${scale}) translateY(-${EMBED_HEADER}px)`,
              pointerEvents:   "none",
            }}
          />
        ) : (
          /* skeleton while loading */
          <div className={`w-full h-full bg-gradient-to-b ${CARD_BG[idx % CARD_BG.length]} animate-pulse`} />
        )}
      </div>

      {/* Thin dark veil — keeps card cohesive with dark site, dims white IG bg */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10 pointer-events-none z-10" />

      {/* Bottom gradient for play button legibility */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

      {/* Account dot */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotClr }} />
        <span className="text-[7px] font-medium tracking-widest uppercase" style={{ color: `${dotClr}85` }}>
          {reel.account === "sanwara" ? "Sanwara" : "Malwana"}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="relative w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-125"
          style={{ border: `1px solid ${dotClr}50` }}
        >
          <Play size={11} className="ml-px" style={{ color: dotClr }} fill={dotClr} />
          <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ border: `1px solid ${dotClr}` }} />
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 0 1px ${dotClr}50` }}
      />
    </div>
  );
}

// ─── Wall Column ──────────────────────────────────────────────────────────────

function WallColumn({
  reels, dir, dur, delay, colIdx, onOpenReel,
}: {
  reels: Reel[]; dir: "up" | "down"; dur: string; delay: string;
  colIdx: number; onOpenReel: (idx: number) => void;
}) {
  const doubled = [...reels, ...reels];
  const cls     = dir === "up" ? "wall-up" : "wall-down";

  return (
    <div className="flex-1 overflow-hidden min-w-0">
      <div
        className={cls}
        style={{
          "--wall-dur":       dur,
          animationDelay:     delay,
          display:            "flex",
          flexDirection:      "column",
          gap:                "8px",
        } as React.CSSProperties}
      >
        {doubled.map((reel, i) => {
          const originalIdx = i % reels.length;
          // Find this reel's global ALL index for modal navigation
          const globalIdx = ALL.findIndex((r) => r.code === reel.code && r.account === reel.account);
          return (
            <WallCard
              key={`${reel.code}-${colIdx}-${i}`}
              reel={reel}
              idx={originalIdx}
              onOpen={() => onOpenReel(globalIdx)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ReelModal({
  index, onClose, onPrev, onNext,
}: {
  index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const reel = ALL[index];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useState(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    if (typeof window !== "undefined") window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const isGold = reel.account === "sanwara";
  const accentClr = isGold ? "#C9A96E" : "#e879f9";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] bg-black/94 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5 pb-6 bg-gradient-to-b from-black/90 to-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentClr }} />
          <span
            className="text-xs font-light tracking-[0.35em] uppercase"
            style={{ color: `${accentClr}80` }}
          >
            {reel.account === "sanwara" ? "@sanwara_production" : "@malwanagarbaindore"}
          </span>
          <span className="text-white/15 text-xs">·</span>
          <span className="text-white/30 text-xs font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            {String(index + 1).padStart(2, "0")} / {String(ALL.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={reel.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-xs transition-all duration-200"
          >
            <ExternalLink size={10} /> Open
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide shadow-xl active:scale-95 transition-all duration-150"
            style={{ background: accentClr, color: "#000" }}
          >
            <X size={12} strokeWidth={2.5} /> Close
          </button>
        </div>
      </div>

      {/* Iframe */}
      <motion.div
        key={reel.code}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-[340px] rounded-2xl overflow-hidden border border-white/8"
        style={{
          aspectRatio: "9/16",
          maxHeight: "82vh",
          boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 60px ${accentClr}15`,
        }}
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

      {/* Prev / Next */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/6 border border-white/10 text-white/50 flex items-center justify-center hover:bg-white/12 hover:text-white active:scale-90 transition-all duration-200" aria-label="Previous"><ChevronLeft size={18} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/6 border border-white/10 text-white/50 flex items-center justify-center hover:bg-white/12 hover:text-white active:scale-90 transition-all duration-200" aria-label="Next"><ChevronRight size={18} /></button>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function InstagramReels() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openReel  = (idx: number) => { setActiveIdx(idx); document.documentElement.setAttribute("data-modal-open", "true"); };
  const closeReel = () => { setActiveIdx(null); document.documentElement.removeAttribute("data-modal-open"); };
  const prevReel  = () => setActiveIdx((i) => i !== null ? (i - 1 + ALL.length) % ALL.length : null);
  const nextReel  = () => setActiveIdx((i) => i !== null ? (i + 1) % ALL.length : null);

  return (
    <section id="reels" className="bg-[#060606] relative z-20 overflow-hidden">

      {/* ── Editorial heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pt-24 pb-10 md:pb-14"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

          {/* Left: label + heading */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold/60" />
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Live on Instagram</p>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400/60 text-[9px] tracking-widest uppercase font-light">Live</span>
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Behind the<br />
              <em className="italic font-semibold">Lens</em>
            </h2>
          </div>

          {/* Right: counter + accounts */}
          <div className="flex flex-col items-start md:items-end gap-4">
            {/* Big reel counter */}
            <div className="flex items-end gap-2">
              <span
                className="text-7xl md:text-8xl font-light leading-none text-white/8"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {ALL.length}
              </span>
              <div className="pb-2">
                <p className="text-white/25 text-xs font-light tracking-[0.3em] uppercase leading-relaxed">Reels &amp;<br />Posts</p>
              </div>
            </div>

            {/* Account badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <a href="https://www.instagram.com/sanwara_production" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-light transition-all duration-200"
                style={{ borderColor: "#C9A96E30", color: "#C9A96E80" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C9A96E60"; (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C9A96E30"; (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E80"; }}
              >
                <InstagramIcon size={10} /> @sanwara_production
              </a>
              <a href="https://www.instagram.com/malwanagarbaindore" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-light transition-all duration-200"
                style={{ borderColor: "#e879f930", color: "#e879f980" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e879f960"; (e.currentTarget as HTMLAnchorElement).style.color = "#e879f9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e879f930"; (e.currentTarget as HTMLAnchorElement).style.color = "#e879f980"; }}
              >
                <InstagramIcon size={10} /> @malwanagarbaindore
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      </motion.div>

      {/* ── DESKTOP: 6-column infinite scroll wall ── */}
      <div
        className="hidden md:block relative"
        style={{ height: "min(88vh, 960px)" }}
      >
        {/* Top fade mask */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#060606] to-transparent z-10 pointer-events-none" />
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#060606] to-transparent z-10 pointer-events-none" />

        {/* Columns */}
        <div className="flex gap-2 h-full px-4 md:px-6 lg:px-8">
          {WALL_COLS.map((col, ci) => (
            <WallColumn
              key={ci}
              reels={col.reels as Reel[]}
              dir={col.dir}
              dur={col.dur}
              delay={col.delay}
              colIdx={ci}
              onOpenReel={openReel}
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE: 3-row marquee with live iframe previews ── */}
      <div className="md:hidden">
        {/* Subtle section label */}
        <div className="flex items-center gap-3 px-5 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <span className="text-[9px] font-light tracking-[0.4em] uppercase text-white/20">Scroll to explore</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {[
          { reels: SANWARA,                                    dir: "left",  dur: "80s",  accent: "#C9A96E",  label: "@sanwara_production" },
          { reels: ALL.filter((_, i) => i % 2 === 0),         dir: "right", dur: "95s",  accent: "#ffffff",  label: "Featured"            },
          { reels: MALWANA,                                    dir: "left",  dur: "88s",  accent: "#e879f9",  label: "@malwanagarbaindore" },
        ].map(({ reels, dir, dur, accent, label }, rowIdx) => (
          <div key={rowIdx} className="mb-3 relative">
            {/* Row label */}
            <div className="flex items-center gap-2 px-5 mb-2">
              <span className="w-4 h-px" style={{ background: accent, opacity: 0.5 }} />
              <span className="text-[9px] font-light tracking-[0.35em] uppercase" style={{ color: `${accent}60` }}>
                {label}
              </span>
            </div>

            {/* Left & right fade masks */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #060606, transparent)" }} />

              <div
                className={dir === "left" ? "marquee-left" : "marquee-right"}
                style={{ "--marquee-dur": dur, display: "flex", gap: "10px", width: "max-content", padding: "0 8px" } as React.CSSProperties}
              >
                {[...reels, ...reels].map((reel, i) => {
                  const globalIdx = ALL.findIndex((r) => r.code === reel.code && r.account === reel.account);
                  return (
                    <MobileCard
                      key={`mob-${rowIdx}-${reel.code}-${i}`}
                      reel={reel}
                      idx={i}
                      accent={accent}
                      onOpen={() => openReel(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Footer hint */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-2 px-5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          <p className="text-[9px] tracking-[0.35em] uppercase text-white/15 font-light">
            Tap any reel to watch
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e879f9]/40" />
        </div>
      </div>

      {/* ── Bottom padding ── */}
      <div className="pb-16 md:pb-20" />

      {/* ── Modal ── */}
      <AnimatePresence>
        {activeIdx !== null && (
          <ReelModal
            index={activeIdx}
            onClose={closeReel}
            onPrev={prevReel}
            onNext={nextReel}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
