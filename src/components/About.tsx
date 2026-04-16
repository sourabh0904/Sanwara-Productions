"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1800;
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(target);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { label: "Events Captured", target: 100, suffix: "+" },
    { label: "Years Experience", target: 5, suffix: "+" },
    { label: "Awards Won", target: 12, suffix: "" },
  ];

  return (
    <section id="about" className="py-28 bg-[#0B0B0B] relative z-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(201,169,110,0.08)]">
              <Image
                src="/media/image_15.jpeg"
                alt="About Sanwara Productions"
                fill
                className="object-cover"
              />
              {/* Inner border frame */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />
              <div className="absolute inset-4 rounded-xl border border-gold/15 pointer-events-none" />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Overline */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold/60" />
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">About Us</span>
            </div>

            <h3
              className="text-4xl md:text-5xl lg:text-[56px] font-light text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              We craft timeless<br />
              <em className="not-italic font-semibold">cinematic</em> experiences
            </h3>

            <div className="w-10 h-px bg-gradient-to-r from-gold to-transparent mb-8" />

            <p className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-lg">
              Every detail, every emotion, masterfully captured. We specialise in producing luxury event films that tell your unique story. With an artistic eye and a passion for perfection, we transform your most important moments into unforgettable cinematic journeys.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg border-t border-white/8 pt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span
                    className="text-4xl md:text-5xl font-bold text-gold mb-2 tabular-nums"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
