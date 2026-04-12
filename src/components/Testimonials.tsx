"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Eleanor & James",
    role: "Wedding Clients",
    text: "Absolutely breathtaking. They captured our wedding exactly how it felt—magical. The cinematic quality is unmatched.",
    image: "/media/image_2.jpeg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Event Director",
    text: "Professional, discrete, and incredibly talented. The corporate highlight reel they produced elevated our brand globally.",
    image: "/media/image_3.jpeg"
  },
  {
    id: 3,
    name: "Sophia Carter",
    role: "Private Event Host",
    text: "Every frame feels like a luxury movie. They are not just videographers, they are true storytellers.",
    image: "/media/image_4.jpeg"
  }
];

export default function Testimonials() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-[#0e0e0e] relative z-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold mb-4">Words of Praise</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">Client Experiences</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-[#151515] p-8 md:p-10 rounded-2xl border border-white/5 relative group hover:border-gold/30 transition-colors duration-500"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif pointer-events-none group-hover:text-gold/5 transition-colors duration-500">"</div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 font-light leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{t.name}</h4>
                  <span className="text-gold/80 text-sm">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
