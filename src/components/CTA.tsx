"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32 bg-[#0B0B0B] relative z-20 flex justify-center items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/7 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative bg-[#0e0e0e] border border-white/8 backdrop-blur-xl p-12 md:p-20 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/25 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/25 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/25 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/25 rounded-br-sm" />

          {/* Overline */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-10 h-px bg-gold/50" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold/80 font-medium">Begin Your Story</span>
            <div className="w-10 h-px bg-gold/50" />
          </div>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Ready to <em className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e8c97a] via-gold to-[#b8892e]">capture</em>
            <br />your event?
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Let&apos;s create a cinematic masterpiece that will be treasured forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="group flex items-center gap-2.5 px-9 py-4 bg-gold text-black font-semibold rounded-full hover:bg-[#e8c97a] hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(201,169,110,0.25)] w-full sm:w-auto justify-center text-sm tracking-[0.1em]"
            >
              Book Your Event
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="https://wa.me/918818888899"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-9 py-4 bg-[#25D366]/8 text-[#25D366] border border-[#25D366]/25 font-medium rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-[1.03] transition-all duration-300 w-full sm:w-auto text-sm tracking-[0.1em]"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
