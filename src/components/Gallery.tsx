"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

// IMPORTANT: These files must be shared as "Anyone on the internet can view" in Drive
// Image URL: lh3.googleusercontent.com/d/FILE_ID works for truly public files
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

// lh3.googleusercontent.com/d/ID is Google's own CDN for public Drive files
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
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
      onClick={onClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-[#181818]"
    >
      {/* Shimmer while loading */}
      {status === "loading" && (
        <div className="w-full h-40 md:h-48 animate-pulse bg-gradient-to-r from-[#1a1a1a] via-[#252525] to-[#1a1a1a] rounded-xl" />
      )}

      {status === "err" && (
        <div className="w-full h-40 flex items-center justify-center bg-[#1a1a1a] rounded-xl">
          <ImageOff className="text-white/20" size={24} />
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgUrl(id)}
        alt={`Photo ${index + 1}`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("err")}
        className={`w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ${
          status === "ok" ? "opacity-100" : "opacity-0 absolute inset-0 h-0"
        }`}
        loading="lazy"
      />

      {status === "ok" && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded-xl flex items-center justify-center pointer-events-none">
          <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lbError, setLbError] = useState(false);

  const prev = () => { setLbError(false); setLightboxIdx((i) => (i !== null ? (i - 1 + IMAGE_IDS.length) % IMAGE_IDS.length : null)); };
  const next = () => { setLbError(false); setLightboxIdx((i) => (i !== null ? (i + 1) % IMAGE_IDS.length : null)); };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#080808] relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold mb-3">Captured Moments</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Photo <span className="italic font-light text-white/60">Gallery</span>
          </h2>
          <p className="text-white/40 text-sm mt-3">{IMAGE_IDS.length} curated frames</p>
        </motion.div>

        {/* Responsive grid — 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {IMAGE_IDS.map((id, i) => (
            <GalleryPhoto
              key={id}
              id={id}
              index={i}
              onClick={() => { setLbError(false); setLightboxIdx(i); }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/97 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Controls */}
            <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 shadow-2xl">
              <X size={20} strokeWidth={2.5} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 md:left-6 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-200">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 md:right-6 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-200">
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {lbError ? (
                <div className="flex flex-col items-center gap-4 text-white/40 p-12">
                  <ImageOff size={48} />
                  <p className="text-sm text-center">Image unavailable.<br />Check Google Drive sharing settings.</p>
                </div>
              ) : (
                <motion.img
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  src={imgUrl(IMAGE_IDS[lightboxIdx])}
                  alt={`Photo ${lightboxIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  onError={() => setLbError(true)}
                />
              )}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-wider">
              {lightboxIdx + 1} / {IMAGE_IDS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
