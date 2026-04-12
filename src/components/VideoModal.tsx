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
    if (!isOpen && videoRef.current) videoRef.current.pause();
    return () => { document.body.style.overflow = "unset"; };
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Video card — click inside stops propagation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✕ Close button — inside card, top-right corner */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full bg-black/80 border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Title bar */}
            {title && (
              <div className="px-5 pr-14 py-4 bg-[#111] border-b border-white/5">
                <h3 className="text-white font-semibold text-base">{title}</h3>
                {description && <p className="text-white/50 text-sm mt-0.5 font-light">{description}</p>}
              </div>
            )}

            {/* Video */}
            {videoUrl?.endsWith(".mp4") ? (
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            ) : (
              // Google Drive or YouTube iframe
              <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
