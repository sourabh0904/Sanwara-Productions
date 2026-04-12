"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const stats = [
    { label: "Events Captured", value: "100+" },
    { label: "Years Experience", value: "5+" },
    { label: "Awards Won", value: "12" },
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0B0B] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(201,169,110,0.1)]">
              <Image
                src="/media/image_15.jpeg"
                alt="About Cinematic Studio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border-2 border-gold/20 rounded-2xl m-4 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold mb-4">About Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              We craft timeless cinematic experiences
            </h3>
            <div className="w-16 h-1 bg-gold mb-8"></div>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-12 max-w-lg">
              Every detail, every emotion, masterfully captured. We specialize in producing luxury event films that tell your unique story. With an artistic eye and a passion for perfection, we transform your most important moments into unforgettable cinematic journeys.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 w-full max-w-lg">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</span>
                  <span className="text-xs uppercase tracking-wider text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
