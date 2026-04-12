"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const VIDEO_ID = "1KKLsxJmfcbNM6GA8zQxku9i9VQ217-Jp";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Local video — downloaded from Drive, always loads reliably */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/media/hero_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-16" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-gold mb-8 border border-gold/30 px-5 py-1.5 rounded-full backdrop-blur-sm bg-gold/5"
        >
          Celebrations
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]"
        >
          Crafting Stories
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c97a] via-gold to-[#b8892e] italic font-light">
            Through Every Frame
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl font-light tracking-wide"
        >
          Luxury Event Films · Weddings · Corporate · Live Events
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#portfolio"
            className="group relative px-9 py-4 bg-gold text-black font-semibold rounded-full overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(201,169,110,0.35)] text-sm tracking-wider w-full sm:w-auto text-center transition-transform duration-300"
          >
            <span className="relative z-10">View Our Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
          <Link
            href="#contact"
            className="px-9 py-4 border border-white/40 text-white font-medium rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm text-sm tracking-wider w-full sm:w-auto text-center"
          >
            Book Your Event
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
