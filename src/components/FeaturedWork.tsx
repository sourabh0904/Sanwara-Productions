"use client";

import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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

type Work = typeof works[0];

function WorkCard({ work, onClick }: { work: Work; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play when card scrolls into view using IntersectionObserver
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const stopPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#111]"
      onClick={onClick}
    >
      {/* Thumbnail — fades out when video plays */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={`object-cover transition-opacity duration-700 z-10 relative ${isPlaying ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Muted looping preview video */}
        <video
          ref={videoRef}
          src={work.videoUrl}
          muted
          playsInline
          loop
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 z-20" />

        {/* Play button — shown when NOT playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(201,169,110,0.4)]">
              <Play className="text-gold ml-1" size={22} fill="currentColor" />
            </div>
          </div>
        )}

        {/* Dismiss (✕) button — shown on mobile when video IS playing */}
        {isPlaying && (
          <button
            onClick={stopPreview}
            className="absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-gold hover:text-black transition-all duration-200 shadow-lg"
            aria-label="Stop preview"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Card info */}
      <div className="absolute bottom-0 left-0 w-full p-5 z-30">
        <span className="inline-block px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-medium tracking-wider text-gold mb-2 border border-gold/20">
          {work.category}
        </span>
        <h4 className="text-lg md:text-xl font-semibold text-white drop-shadow-md">
          {work.title}
        </h4>
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [activeVideo, setActiveVideo] = useState<typeof works[0] | null>(null);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
          <div className="w-24 h-1 bg-gold mt-8 rounded-full hidden md:block" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setActiveVideo(work)}
            />
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
