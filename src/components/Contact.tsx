"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0B0B0B] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold mb-4">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Let's create something beautiful together.
          </h3>
          <p className="text-white/60 font-light mb-12 max-w-sm">
            Reach out to discuss your upcoming event, or request our premium pricing guide.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Studio</h4>
                <p className="text-white/60 font-light">123 Cinematic Ave<br />Beverly Hills, CA 90210</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Phone</h4>
                <p className="text-white/60 font-light">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Email</h4>
                <p className="text-white/60 font-light">hello@cinematicstudio.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-7/12 bg-[#111111] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl"
        >
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full flex-1">
                <label htmlFor="name" className="block text-white/50 text-sm font-medium mb-2 w-full">Name</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light"
                  placeholder="John Doe"
                />
              </div>
              <div className="w-full flex-1">
                <label htmlFor="email" className="block text-white/50 text-sm font-medium mb-2 w-full">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="eventDate" className="block text-white/50 text-sm font-medium mb-2 w-full">Event Date (Optional)</label>
              <input 
                type="text" 
                id="eventDate"
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light"
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div className="w-full">
              <label htmlFor="message" className="block text-white/50 text-sm font-medium mb-2 w-full">Message Details</label>
              <textarea 
                id="message"
                rows={5}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light resize-none"
                placeholder="Tell us about your event..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="mt-4 px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto self-start"
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
