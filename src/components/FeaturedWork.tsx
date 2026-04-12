"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";

const works = [
  {
    id: 1,
    title: "Ethereal Romance",
    category: "Wedding",
    thumbnail: "/media/image_16.jpeg",
    videoUrl: "/media/video_1.mp4",
    description: "A beautiful destination wedding captured with a cinematic narrative."
  },
  {
    id: 2,
    title: "Global Summit 2025",
    category: "Corporate",
    thumbnail: "/media/image_12.jpeg",
    videoUrl: "/media/video_2.mp4",
    description: "High-energy corporate overview blending interviews with dynamic b-roll."
  },
  {
    id: 3,
    title: "Neon Nights",
    category: "Party",
    thumbnail: "/media/image_13.jpeg",
    videoUrl: "/media/video_4.mp4",
    description: "A vibrant luxury private event covered with state-of-the-art low-light technology."
  },
  {
    id: 4,
    title: "A Timeless Vow",
    category: "Wedding",
    thumbnail: "/media/image_14.jpeg",
    videoUrl: "/media/video_5.mp4",
    description: "Intimate vows set against a majestic mountain backdrop."
  },
  {
    id: 5,
    title: "Brand Anthem",
    category: "Commercial",
    thumbnail: "/media/image_18.jpeg",
    videoUrl: "/media/video_2.mp4",
    description: "A fast-paced commercial piece driving brand energy."
  },
  {
    id: 6,
    title: "Golden Hour Engagement",
    category: "Wedding",
    thumbnail: "/media/image_17.jpeg",
    videoUrl: "/media/video_1.mp4",
    description: "Soft, golden hour aesthetics for a perfect couple's memory."
  }
];

export default function FeaturedWork() {
  const [activeVideo, setActiveVideo] = useState<typeof works[0] | null>(null);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0B0B0B] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold mb-4">Our Portfolio</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">Featured Masterpieces</h3>
          <div className="w-24 h-1 bg-gold mt-8 rounded-full hidden md:block"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {works.map((work) => (
            <motion.div 
              key={work.id} 
              variants={itemVariants}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#111]"
              onClick={() => setActiveVideo(work)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 will-change-transform shadow-[0_0_20px_rgba(201,169,110,0.5)]">
                    <Play className="text-gold ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium tracking-wider text-gold mb-3 border border-gold/20">
                  {work.category}
                </span>
                <h4 className="text-xl md:text-2xl font-semibold text-white drop-shadow-md">
                  {work.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.videoUrl || ""}
        title={activeVideo?.title}
        description={activeVideo?.description}
      />
    </section>
  );
}
