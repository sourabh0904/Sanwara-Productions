"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";

export default function SignatureFilm() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold mb-4">Our Masterpiece</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">A Story Worth Remembering</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-video max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(201,169,110,0.15)] group cursor-pointer border border-white/10"
          onClick={() => setIsVideoOpen(true)}
        >
          <Image
            src="/media/banner.png"
            alt="Signature Film"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.6)] text-black"
            >
              <Play className="ml-2" size={32} fill="currentColor" />
            </motion.div>
            <span className="mt-6 text-white/90 uppercase tracking-[0.3em] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              Watch Film
            </span>
          </div>
        </motion.div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="/media/video_3.mp4"
        title="Signature Film: A Story Worth Remembering"
      />
    </section>
  );
}
