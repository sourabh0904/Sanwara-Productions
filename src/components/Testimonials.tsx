"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Eleanor & James",
    role: "Wedding Clients",
    text: "Absolutely breathtaking. They captured our wedding exactly how it felt — magical. The cinematic quality is unmatched.",
    image: "/media/image_2.jpeg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Event Director",
    text: "Professional, discreet, and incredibly talented. The corporate highlight reel they produced elevated our brand globally.",
    image: "/media/image_3.jpeg",
  },
  {
    id: 3,
    name: "Sophia Carter",
    role: "Private Event Host",
    text: "Every frame feels like a luxury film. They are not just videographers — they are true storytellers.",
    image: "/media/image_4.jpeg",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#0a0a0a] relative z-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/4 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-18 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-xs font-medium uppercase tracking-[0.45em] text-gold">Words of Praise</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h3
            className="text-4xl md:text-6xl font-light text-white"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Client <em className="not-italic font-semibold italic">Experiences</em>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="relative group bg-[#111111] p-8 md:p-10 rounded-2xl border border-white/6 hover:border-gold/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,169,110,0.06)] overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-500" />

              {/* Large decorative quote */}
              <div
                className="absolute top-4 right-6 text-[80px] leading-none text-white/4 group-hover:text-gold/6 transition-colors duration-500 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="text-white/70 text-lg leading-relaxed mb-8 italic font-light"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-gold/30 mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-gold/25 shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold tracking-wide">{t.name}</h4>
                  <span className="text-gold/70 text-xs tracking-wider">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
