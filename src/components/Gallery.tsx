"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ImageOff, ZoomIn } from "lucide-react";

const IMAGE_IDS = [
  "1P05rn6AgZCJ6ZHqMNq8vjvJ6RX73Idbt",
  "1cfPgteq3LAtzvf-L3O1O6Ik08uv3H69H",
  "1rTIbERPxMH1Gz42Pdz_IwmcG6PPYvZul",
  "1-y0CGBA2l0R5koU2_m9CZvIlc3_gC3LZ",
  "19PnMC0L5MGE1tPTXxfz3vZsD9zgJ2CBw",
  "1b01LnuEnU-4l5Vmnxplqrdo2gQ1oYBzc",
  "1XFqgDdIBylhWNrG-3ol0fyM2ONqABBAN",
  "1wWBsHQ00ZopG5BJ45RgV3Cqo61Nd7szm",
  "1xQigb0Hm8LCOAHPd9f7R2yJk_P9ptNsg",
  "1paXC3mHYAWgHUkKV9zOz5elN0mBVh4tj",
  "1rHBN7yMWnMLAdLqErkA7BltKJh8c0W4t",
  "1yeOWKDUahz1lBRLMDrz9lY6ljbRrwBJ3",
  "1OLxsmonkvsion4-v1qSkPLjSg9d5yjrV",
  "1tG_7ok3_p76-uwddrgw40acxoyET4fw5",
  "1-6iDdZrFBvg6XsHEMK-vbrtzj1Jtrg8P",
  "1N2cNESE3F1fXmmquIQ0Vds18kvDgaKnb",
  "1_SHKC7oK8U24To120ZsF7jUD-6AfnAAE",
  "1ORPNIgWI6Uu9RVFp7_ZibwAE5v6O5Vu_",
  "1NpfkJiytU89Zpg0Mup7GBGKSlQYAXV_Z",
  "1HSfEYft9hlpww3m86gOuyz0LBaZKGUpW",
  "1beric7WO1tpv-aq9PHDtdE_THAVsf86i",
  "1cDAwb4ypDwwlxYW5iBbojB8cJYnjGAOX",
  "12NKvMkji2tJgQUsHUD87Aqur0sKieJT-",
  "171y11Os7WcM2dlQFU7qyPwDC9qkAQht9",
  "18jsm_D2OdEuSPFkCJDsjGO9FLP24mlO2",
  "1iv3tRSlHRgW022R-wUptGpN3lxceUyGa",
  "19iqobFvX_tkEONutSWb9pGGv1txobbkU",
  "1pJX1ZZsbjv_OejjlA--xeaiKOyPI4NP1",
  "1Rvnz8KagiIpSEvYtSlEI9ji6nUFf0P8M",
  "1_nKsVI2LUFhGcWxvNBSvmRURo6-aTXtB",
  "10wXdX-FpxZHXe1g8O3V1oo132QVrlZh0",
  "1sTCuhkCWLClUZcQqgZtqQNqfg4PWx1Qf",
  "1bN4wR62DBmCrC1sLuzMq2frrWjJ75foC",
  "1TBNpbTLoDHOreH5WtWsi9BHa215HWTee",
];

const imgUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

function GalleryPhoto({
  id,
  index,
  onClick,
}: {
  id: string;
  index: number;
  onClick: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.02, 0.35) }}
      onClick={onClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-[#141414] block"
    >
      {/* Shimmer while loading — square placeholder */}
      {status === "loading" && (
        <div className="w-full aspect-square animate-pulse bg-gradient-to-br from-[#161616] via-[#1e1e1e] to-[#161616] rounded-xl" />
      )}

      {status === "err" && (
        <div className="w-full aspect-square flex items-center justify-center bg-[#141414] rounded-xl">
          <ImageOff className="text-white/12" size={20} />
        </div>
      )}

      {/* Image — natural height for masonry effect */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgUrl(id)}
        alt={`Frame ${index + 1}`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("err")}
        className={`w-full h-auto block object-cover rounded-xl transition-transform duration-600 group-hover:scale-[1.05] ${
          status === "ok" ? "opacity-100" : "sr-only"
        }`}
        loading="lazy"
      />

      {/* Hover overlay */}
      {status === "ok" && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-350 pointer-events-none">
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-xl" />
          {/* Gold border reveal */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-gold/30" />
          {/* Icon + label */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn size={14} className="text-white/80" />
            <span className="text-white/75 text-[10px] font-medium tracking-[0.25em] uppercase">View</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lbError, setLbError]         = useState(false);
  const touchStartX                   = useRef(0);

  const open  = (i: number) => { setLbError(false); setLightboxIdx(i); };
  const close = () => setLightboxIdx(null);

  const prev = useCallback(() => {
    setLbError(false);
    setLightboxIdx((i) => (i !== null ? (i - 1 + IMAGE_IDS.length) % IMAGE_IDS.length : null));
  }, []);

  const next = useCallback(() => {
    setLbError(false);
    setLightboxIdx((i) => (i !== null ? (i + 1) % IMAGE_IDS.length : null));
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) diff > 0 ? next() : prev();
  };

  return (
    <section id="gallery" className="py-24 md:py-28 bg-[#080808] relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Heading */}
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
            {IMAGE_IDS.length} curated frames
          </p>
        </motion.div>

        {/* ── Masonry grid via CSS columns ── */}
        {/* Items flow top-to-bottom per column, giving natural varying heights */}
        <div
          className="columns-2 sm:columns-3 lg:columns-4"
          style={{ columnGap: "8px" }}
        >
          {IMAGE_IDS.map((id, i) => (
            <div key={id} className="break-inside-avoid mb-2">
              <GalleryPhoto id={id} index={i} onClick={() => open(i)} />
            </div>
          ))}
        </div>
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
              {/* Counter */}
              <div className="flex items-center gap-2">
                <span className="text-gold text-sm font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {String(lightboxIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-white/35 text-xs">{IMAGE_IDS.length}</span>
              </div>

              {/* Close */}
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
                  src={imgUrl(IMAGE_IDS[lightboxIdx])}
                  alt={`Frame ${lightboxIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
                  onError={() => setLbError(true)}
                  draggable={false}
                />
              )}
            </div>

            {/* Bottom bar */}
            <div className="shrink-0 flex items-center justify-center gap-8 py-5 bg-gradient-to-t from-black/80 to-transparent">
              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/70 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dot strip */}
              <div className="flex items-center gap-1 overflow-hidden max-w-[140px]">
                {IMAGE_IDS.map((_, i) => (
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

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white/70 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold active:scale-90 transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Swipe hint — mobile only */}
            <p className="text-center text-white/18 text-[10px] pb-4 shrink-0 sm:hidden font-light tracking-[0.2em] uppercase">
              Swipe to navigate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
