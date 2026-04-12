"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  description?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title, description }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="relative w-full max-w-5xl bg-[#0e0e0e] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(201,169,110,0.15)] border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-gold hover:text-black rounded-full flex items-center justify-center transition-colors duration-300 text-white backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Video Container */}
            <div className="relative w-full h-[80vh] flex items-center justify-center bg-black">
              {videoUrl?.endsWith('.mp4') ? (
                <video src={videoUrl} controls autoPlay playsInline className="max-w-full max-h-full object-contain"></video>
              ) : (
                <iframe
                  src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Content info if provided */}
            {(title || description) && (
              <div className="p-6 md:p-8 bg-gradient-to-b from-[#0e0e0e] to-black">
                {title && <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>}
                {description && <p className="text-white/70 font-light">{description}</p>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
