"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "Studio",
    lines: ["Sanwara Productions", "Indore, Madhya Pradesh"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 88188 88899"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@sanwaraproductions.com"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#0B0B0B] relative z-20 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-20">

        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full lg:w-5/12"
        >
          {/* Overline */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Get In Touch</span>
          </div>

          <h3
            className="text-4xl md:text-5xl lg:text-[56px] font-light text-white mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Let&apos;s create something<br />
            <em className="italic font-semibold">beautiful</em> together.
          </h3>

          <p className="text-white/50 font-light mb-12 max-w-sm leading-relaxed">
            Reach out to discuss your upcoming event, or request our premium pricing guide.
          </p>

          <div className="space-y-7">
            {contactItems.map(({ icon: Icon, label, lines }) => (
              <div key={label} className="flex items-start gap-5 group">
                <div className="w-11 h-11 rounded-full border border-white/10 group-hover:border-gold/40 flex items-center justify-center text-gold/70 group-hover:text-gold group-hover:bg-gold/5 transition-all duration-300 shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-white/90 text-sm font-medium mb-1 tracking-wide">{label}</h4>
                  {lines.map((line) => (
                    <p key={line} className="text-white/45 text-sm font-light">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full lg:w-7/12"
        >
          <div className="bg-[#0e0e0e] p-8 md:p-12 rounded-2xl border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-white/40 text-xs font-medium mb-2.5 tracking-wider uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/60 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-black/80 transition-all duration-200 font-light"
                    placeholder="Your full name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-white/40 text-xs font-medium mb-2.5 tracking-wider uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/60 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-black/80 transition-all duration-200 font-light"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-white/40 text-xs font-medium mb-2.5 tracking-wider uppercase">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-black/60 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-black/80 transition-all duration-200 font-light"
                  placeholder="+91 00000 00000"
                />
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-white/40 text-xs font-medium mb-2.5 tracking-wider uppercase">
                  Event Date <span className="normal-case tracking-normal text-white/25">(optional)</span>
                </label>
                <input
                  type="text"
                  id="eventDate"
                  className="w-full bg-black/60 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-black/80 transition-all duration-200 font-light"
                  placeholder="DD / MM / YYYY"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/40 text-xs font-medium mb-2.5 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-black/60 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-black/80 transition-all duration-200 font-light resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 px-10 py-4 bg-gold text-black font-semibold rounded-full overflow-hidden hover:scale-[1.02] transition-all duration-300 w-full md:w-auto self-start text-sm tracking-[0.1em] shadow-[0_0_30px_rgba(201,169,110,0.2)]"
              >
                <span className="relative z-10">Send Inquiry</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
