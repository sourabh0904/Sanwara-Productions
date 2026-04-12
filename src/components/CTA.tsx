"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32 bg-[#0B0B0B] relative z-20 flex justify-center items-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-white/10 bg-black/40 backdrop-blur-xl p-12 md:p-20 rounded-3xl shadow-[0_0_50px_rgba(201,169,110,0.05)] w-full relative overflow-hidden"
        >
          {/* Inner Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-gold italic font-light">capture</span> your event?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto font-light">
            Let's discuss how we can turn your upcoming special day into a cinematic masterpiece that will last forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#contact"
              className="px-8 py-4 bg-gold text-black font-semibold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(201,169,110,0.3)] w-full sm:w-auto text-center tracking-wide"
            >
              Book Your Event
            </Link>

            <Link
              href="https://wa.me/1234567890" // Dummy WhatsApp Link
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-medium rounded-full flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto tracking-wide group"
            >
              <MessageCircle size={20} className="group-hover:animate-pulse" />
              Chat on WhatsApp
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
