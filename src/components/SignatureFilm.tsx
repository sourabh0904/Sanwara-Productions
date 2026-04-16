"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";

export default function SignatureFilm() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative py-28 bg-[#060606] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-xs font-medium uppercase tracking-[0.45em] text-gold">Our Masterpiece</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h3
            className="text-4xl md:text-6xl font-light text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            A Story Worth <em className="italic font-semibold">Remembering</em>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-video max-w-5xl rounded-2xl overflow-hidden cursor-pointer group border border-white/8 shadow-[0_30px_100px_rgba(0,0,0,0.7),0_0_60px_rgba(201,169,110,0.08)]"
          onClick={() => setIsVideoOpen(true)}
        >
          <Image
            src="/media/banner.png"
            alt="Signature Film"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-500" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold flex items-center justify-center shadow-[0_0_50px_rgba(201,169,110,0.5)] text-black"
            >
              <Play className="ml-1.5" size={28} fill="currentColor" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-gold/40 animate-ping" />
            </motion.div>
            <span className="text-white/80 uppercase tracking-[0.35em] text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
              Watch Film
            </span>
          </div>

          {/* Border overlay */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />
        </motion.div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="/media/video_3.mp4"
        title="Signature Film: A Story Worth Remembering"
      />
    </section>
  );
}
