"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ImageOff, ZoomIn } from "lucide-react";

// ─── Image data — each photo appears exactly once, no cross-section duplicates ─
const drive = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const SECTIONS = [
  {
    key: "weddings",
    label: "Weddings",
    images: [
      drive("1XFqgDdIBylhWNrG-3ol0fyM2ONqABBAN"),
      drive("1paXC3mHYAWgHUkKV9zOz5elN0mBVh4tj"),
      drive("1OLxsmonkvsion4-v1qSkPLjSg9d5yjrV"),
      drive("1-6iDdZrFBvg6XsHEMK-vbrtzj1Jtrg8P"),
      drive("1_SHKC7oK8U24To120ZsF7jUD-6AfnAAE"),
      drive("1ORPNIgWI6Uu9RVFp7_ZibwAE5v6O5Vu_"),
      drive("1NpfkJiytU89Zpg0Mup7GBGKSlQYAXV_Z"),
      drive("1HSfEYft9hlpww3m86gOuyz0LBaZKGUpW"),
      drive("1beric7WO1tpv-aq9PHDtdE_THAVsf86i"),
    ],
  },
  {
    key: "events",
    label: "Events",
    images: [
      drive("1cDAwb4ypDwwlxYW5iBbojB8cJYnjGAOX"),
      drive("12NKvMkji2tJgQUsHUD87Aqur0sKieJT-"),
      drive("171y11Os7WcM2dlQFU7qyPwDC9qkAQht9"),
      drive("18jsm_D2OdEuSPFkCJDsjGO9FLP24mlO2"),
      drive("1iv3tRSlHRgW022R-wUptGpN3lxceUyGa"),
      drive("19iqobFvX_tkEONutSWb9pGGv1txobbkU"),
      drive("1pJX1ZZsbjv_OejjlA--xeaiKOyPI4NP1"),
      drive("1Rvnz8KagiIpSEvYtSlEI9ji6nUFf0P8M"),
    ],
  },
  {
    key: "celebrations",
    label: "Celebrations",
    images: [
      drive("1_nKsVI2LUFhGcWxvNBSvmRURo6-aTXtB"),
      drive("10wXdX-FpxZHXe1g8O3V1oo132QVrlZh0"),
      drive("1sTCuhkCWLClUZcQqgZtqQNqfg4PWx1Qf"),
      drive("1bN4wR62DBmCrC1sLuzMq2frrWjJ75foC"),
      drive("1TBNpbTLoDHOreH5WtWsi9BHa215HWTee"),
      "/media/image_12.jpeg",
      "/media/image_13.jpeg",
      "/media/image_14.jpeg",
      "/media/image_16.jpeg",
    ],
  },
  {
    key: "moments",
    label: "Moments",
    images: [
      "/media/image_1.jpeg",
      "/media/image_5.jpeg",
      "/media/image_6.jpeg",
      "/media/image_7.jpeg",
      "/media/image_8.jpeg",
      "/media/image_9.jpeg",
      "/media/image_10.jpeg",
      "/media/image_11.jpeg",
      "/media/image_17.jpeg",
      "/media/image_18.jpeg",
    ],
  },
] as const;

// Flat list of all images in order for lightbox navigation across the full gallery
const ALL_IMAGES = SECTIONS.flatMap((s) => s.images as readonly string[]);

// ─── GalleryPhoto ─────────────────────────────────────────────────────────────
function GalleryPhoto({
  src,
  globalIndex,
  localIndex,
  onClick,
}: {
  src: string;
  globalIndex: number;
  localIndex: number;
  onClick: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");
  const isLocal = src.startsWith("/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(localIndex * 0.05, 0.4) }}
      onClick={onClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-[#141414] block"
    >
      {status === "loading" && (
        <div className="w-full aspect-square animate-pulse bg-gradient-to-br from-[#161616] via-[#1e1e1e] to-[#161616] rounded-xl" />
      )}
      {status === "err" && (
        <div className="w-full aspect-square flex items-center justify-center bg-[#141414] rounded-xl">
          <ImageOff className="text-white/12" size={20} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Frame ${globalIndex + 1}`}
        {...(!isLocal && { referrerPolicy: "no-referrer", crossOrigin: "anonymous" as const })}
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("err")}
        className={`w-full h-auto block object-cover rounded-xl transition-transform duration-600 group-hover:scale-[1.05] ${
          status === "ok" ? "opacity-100" : "sr-only"
        }`}
        loading="lazy"
      />
      {status === "ok" && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-350 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-xl" />
          <div className="absolute inset-0 rounded-xl ring-1 ring-gold/30" />
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn size={14} className="text-white/80" />
            <span className="text-white/75 text-[10px] font-medium tracking-[0.25em] uppercase">View</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lbError, setLbError] = useState(false);
  const touchStartX = useRef(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const open  = (globalIdx: number) => { setLbError(false); setLightboxIdx(globalIdx); document.documentElement.setAttribute("data-modal-open", "true"); };
  const close = () => { setLightboxIdx(null); document.documentElement.removeAttribute("data-modal-open"); };

  const prev = useCallback(() => {
    setLbError(false);
    setLightboxIdx((i) => (i !== null ? (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length : null));
  }, []);

  const next = useCallback(() => {
    setLbError(false);
    setLightboxIdx((i) => (i !== null ? (i + 1) % ALL_IMAGES.length : null));
  }, []);

  const scrollToSection = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) diff > 0 ? next() : prev();
  };

  // Which section does the current lightbox image belong to?
  const activeSectionLabel =
    lightboxIdx !== null
      ? (() => {
          let count = 0;
          for (const s of SECTIONS) {
            if (lightboxIdx < count + s.images.length) return s.label;
            count += s.images.length;
          }
          return "";
        })()
      : "";

  return (
    <section id="gallery" className="py-24 md:py-28 bg-[#080808] relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/60" />
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Captured Moments</p>
            </div>
            <h2
              className="text-4xl md:text-6xl font-light text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Photo <em className="italic font-semibold">Gallery</em>
            </h2>
          </div>
          <p className="text-white/30 text-sm font-light tracking-widest self-end pb-1 hidden md:block">
            {ALL_IMAGES.length} curated frames
          </p>
        </motion.div>

        {/* ── Section Jump Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-2 mb-14 flex-wrap"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => scrollToSection(s.key)}
              className="px-5 py-2 rounded-full text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 bg-white/5 text-white/50 hover:bg-gold hover:text-black border border-white/8 hover:border-gold"
            >
              {s.label}
              <span className="ml-2 text-[10px] text-white/25">{s.images.length}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Sections ── */}
        {(() => {
          let globalOffset = 0;
          return SECTIONS.map((section) => {
            const offset = globalOffset;
            globalOffset += section.images.length;
            return (
              <div
                key={section.key}
                ref={(el) => { sectionRefs.current[section.key] = el; }}
                className="mb-20 last:mb-0 scroll-mt-28"
              >
                {/* Section heading */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 mb-7"
                >
                  <div className="w-6 h-px bg-gold/50" />
                  <h3
                    className="text-2xl md:text-3xl font-light text-white"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {section.label}
                  </h3>
                  <span className="text-white/20 text-xs font-light tracking-widest">
                    {section.images.length} frames
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </motion.div>

                {/* Masonry grid */}
                <div
                  className="columns-2 sm:columns-3 lg:columns-4"
                  style={{ columnGap: "8px" }}
                >
                  {(section.images as readonly string[]).map((src, localIdx) => (
                    <div key={src} className="break-inside-avoid mb-2">
                      <GalleryPhoto
                        src={src}
                        globalIndex={offset + localIdx}
                        localIndex={localIdx}
                        onClick={() => open(offset + localIdx)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          });
        })()}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col select-none"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-4 pt-14 pb-3 shrink-0 bg-gradient-to-b from-black/90 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-gold/70 text-[10px] font-medium tracking-[0.3em] uppercase">
                  {activeSectionLabel}
                </span>
                <span className="text-white/15 text-xs">·</span>
                <span className="text-gold text-sm font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {String(lightboxIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-white/35 text-xs">{ALL_IMAGES.length}</span>
              </div>
              <button
                onClick={close}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-black font-semibold text-xs tracking-[0.12em] uppercase shadow-xl active:scale-95 transition-transform duration-150"
                aria-label="Close"
              >
                <X size={14} strokeWidth={2.5} />
                Close
              </button>
            </div>

            {/* Image */}
            <div
              className="flex-1 flex items-center justify-center px-10 sm:px-16 min-h-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lbError ? (
                <div className="flex flex-col items-center gap-4 text-white/25">
                  <ImageOff size={36} />
                  <p className="text-sm font-light text-center">Image unavailable.</p>
                </div>
              ) : (
                <motion.img
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  src={ALL_IMAGES[lightboxIdx]}
                  alt={`Frame ${lightboxIdx + 1}`}
                  {...(!ALL_IMAGES[lightboxIdx].startsWith("/") && { referrerPolicy: "no-referrer" as const })}
                  className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
                  onError={() => setLbError(true)}
                  draggable={false}
                />
              )}
            </div>

            {/* Bottom bar */}
            <div className="shrink-0 flex items-center justify-center gap-8 py-5 bg-gradient-to-t from-black/80 to-transparent">
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/70 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1 overflow-hidden max-w-[140px]">
                {ALL_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); open(i); }}
                    className={`rounded-full transition-all duration-200 shrink-0 ${
                      i === lightboxIdx
                        ? "w-4 h-1.5 bg-gold"
                        : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                    aria-label={`Go to frame ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/70 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="text-center text-white/18 text-[10px] pb-4 shrink-0 sm:hidden font-light tracking-[0.2em] uppercase">
              Swipe to navigate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
