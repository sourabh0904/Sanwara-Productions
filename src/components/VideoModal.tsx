"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  description?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title, description }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (isOpen) document.documentElement.setAttribute("data-modal-open", "true");
    else document.documentElement.removeAttribute("data-modal-open");
    if (!isOpen && videoRef.current) videoRef.current.pause();
    return () => { document.body.style.overflow = "unset"; document.documentElement.removeAttribute("data-modal-open"); };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          // Mobile: solid full-screen black. Desktop: dimmed backdrop with padding.
          className="fixed inset-0 z-[9000] bg-black sm:bg-black/92 sm:backdrop-blur-md flex flex-col sm:items-center sm:justify-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            // Mobile: fills entire screen. Desktop: centered card with max-width.
            className="relative w-full h-full sm:h-auto sm:max-w-4xl flex flex-col sm:rounded-2xl overflow-hidden sm:bg-[#0d0d0d] sm:shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:border sm:border-white/8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold accent — desktop only */}
            <div className="hidden sm:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />

            {/* ── Header ── */}
            <div className="flex items-center justify-between shrink-0 bg-black sm:bg-black/40 sm:border-b sm:border-white/5 px-4 sm:px-5 sm:pr-14 pt-12 sm:pt-0 pb-3 sm:py-4">
              <div className="flex-1 min-w-0 pr-3">
                {title && (
                  <h3 className="text-white font-medium text-sm tracking-wide truncate">{title}</h3>
                )}
                {description && (
                  <p className="text-white/40 text-xs mt-0.5 font-light truncate">{description}</p>
                )}
              </div>

              {/* Close button — bigger on mobile for easy tap */}
              <button
                onClick={onClose}
                className="shrink-0 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/10 sm:bg-black/80 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black active:scale-90 transition-all duration-200 shadow-lg"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* ── Video area ── fills remaining height on mobile, auto height on desktop ── */}
            <div className="flex-1 sm:flex-none flex items-center justify-center bg-black min-h-0 w-full">
              {videoUrl?.endsWith(".mp4") ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  // Mobile: fill the flex container. Desktop: cap at 70vh.
                  className="w-full h-full sm:h-auto sm:max-h-[70vh] object-contain bg-black"
                />
              ) : (
                // iframe embed (Google Drive / YouTube) — always 16:9
                <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={videoUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                </div>
              )}
            </div>

            {/* Mobile bottom safe-area spacer */}
            <div className="shrink-0 h-4 sm:hidden bg-black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
