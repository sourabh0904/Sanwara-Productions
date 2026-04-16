"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* Fallback image — shows while video is buffering */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Image
          src="/media/banner.png"
          alt=""
          fill
          priority
          className="object-cover scale-105"
        />
      </div>

      {/* Background video — overlays the image once playing */}
      {/* blur(2px) softens compression artefacts; scale-110 compensates for blur edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110"
          style={{ filter: "blur(2px)" }}
        >
          <source src="/media/hero_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic overlay — slightly darker to further mask quality */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        {/* Radial vignette — pulls focus to centre, hides edges */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />
      </div>

      {/* Film grain — masks pixelation and gives a premium cinematic texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-16" style={{ zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-9"
        >
          <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-gold/70" />
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.5em] text-gold/90">
            Luxury Event Films
          </span>
          <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[88px] font-bold text-white tracking-[-0.02em] leading-[1.05]"
        >
          Crafting Stories
          <br />
          <span
            className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e8c97a] via-[#C9A96E] to-[#b8892e]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.08em", lineHeight: 1.2 }}
          >
            Through Every Frame
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-7 text-sm md:text-base text-white/50 max-w-lg font-light tracking-[0.08em]"
        >
          Weddings &nbsp;·&nbsp; Corporate &nbsp;·&nbsp; Live Events &nbsp;·&nbsp; Celebrations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#portfolio"
            className="group relative px-10 py-4 bg-gold text-black font-semibold rounded-full overflow-hidden hover:scale-[1.03] shadow-[0_0_40px_rgba(201,169,110,0.3)] text-sm tracking-[0.12em] w-full sm:w-auto text-center transition-all duration-300"
          >
            <span className="relative z-10">View Our Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
          <Link
            href="#contact"
            className="px-10 py-4 border border-white/20 text-white/75 font-light rounded-full hover:border-white/45 hover:text-white transition-all duration-300 backdrop-blur-sm text-sm tracking-[0.12em] w-full sm:w-auto text-center"
          >
            Book Your Event
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
