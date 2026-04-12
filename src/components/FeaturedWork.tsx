"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";

const driveImg     = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

const works = [
  {
    id: 1,
    title: "Ram Ji Reel",
    category: "Sacred Wedding",
    thumbId: "1P05rn6AgZCJ6ZHqMNq8vjvJ6RX73Idbt",
    videoId: "1zk2mYPtKpSOZ-Rnw60zzL1OfAO3tayQ9",
    // local preview — muted autoplay works on all devices
    previewSrc: "/media/video_1.mp4",
    description: "Emotionally rich wedding reel capturing sacred vows and golden moments.",
    featured: true,
  },
  {
    id: 2,
    title: "Paradox Final Reel",
    category: "Event",
    thumbId: "1cfPgteq3LAtzvf-L3O1O6Ik08uv3H69H",
    videoId: "1RaunMYr1zJcJzditskDH_xPbdgIyItJT",
    previewSrc: "/media/hero_video.mp4",
    description: "High-energy final reel showcasing the iconic Paradox event.",
  },
  {
    id: 3,
    title: "Event Highlights",
    category: "Celebration",
    thumbId: "1rTIbERPxMH1Gz42Pdz_IwmcG6PPYvZul",
    videoId: "1KKLsxJmfcbNM6GA8zQxku9i9VQ217-Jp",
    previewSrc: "/media/video_4.mp4",
    description: "Vibrant highlights from a grand private celebration.",
  },
  {
    id: 4,
    title: "Timeless Celebration",
    category: "Wedding",
    thumbId: "1-y0CGBA2l0R5koU2_m9CZvIlc3_gC3LZ",
    videoId: "1La6s-J0YYnAl4JZqn7CIfvcaptQ5Ctiv",
    previewSrc: "/media/video_5.mp4",
    description: "Timeless moments from a beautiful wedding celebration.",
  },
  {
    id: 5,
    title: "Festive Nights",
    category: "Party",
    thumbId: "19PnMC0L5MGE1tPTXxfz3vZsD9zgJ2CBw",
    videoId: "1opDCgYRZQ4xvIWorXjB5fEdkhpglDZnZ",
    previewSrc: "/media/video_2.mp4",
    description: "Festive energy captured with cinematic precision.",
  },
  {
    id: 6,
    title: "Golden Hour",
    category: "Wedding",
    thumbId: "1b01LnuEnU-4l5Vmnxplqrdo2gQ1oYBzc",
    videoId: "1tvcYX_jVGnfZh9vx4SaGurbs6KD-rd7Z",
    previewSrc: "/media/video_3.mp4",
    description: "Golden hour wedding memories made eternal.",
  },
];

type Work = typeof works[0];

function VideoCard({ work, onClick, large = false }: { work: Work; onClick: () => void; large?: boolean }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [imgError, setImgError] = useState(false);

  // IntersectionObserver — plays preview when card is ≥40% in view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const vid = videoRef.current;
        if (!vid) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          vid.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#181818]"
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden bg-[#181818] ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}>

        {/* Thumbnail — fades out when video preview starts */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={driveImg(work.thumbId)}
            alt={work.title}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />
        )}

        {/* Local muted preview video — autoplays when card scrolls into view */}
        <video
          ref={videoRef}
          src={work.previewSrc}
          muted
          playsInline
          loop
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />

        {/* Category tag */}
        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-medium tracking-wider text-gold border border-gold/20">
          {work.category}
        </span>

        {/* Play button — always shown on mobile, hover on desktop */}
        {!playing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className={`relative rounded-full bg-black/50 backdrop-blur-md border-2 border-gold flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.5)] transition-transform duration-300 group-hover:scale-110 ${large ? "w-20 h-20" : "w-14 h-14"}`}>
              <Play className="text-gold ml-1" size={large ? 28 : 20} fill="currentColor" />
              <span className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`absolute bottom-0 left-0 w-full z-20 ${large ? "p-7" : "p-5"}`}>
        <h4 className={`font-semibold text-white drop-shadow-md ${large ? "text-2xl md:text-3xl" : "text-base md:text-lg"}`}>
          {work.title}
        </h4>
        {large && (
          <p className="text-white/55 text-sm mt-2 font-light max-w-lg">{work.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [activeVideo, setActiveVideo] = useState<Work | null>(null);
  const [featured, ...rest] = works;

  return (
    <section id="portfolio" className="py-28 bg-[#0B0B0B] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold mb-3">Our Portfolio</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Featured<br />
              <span className="italic font-light text-white/60">Masterpieces</span>
            </h2>
          </div>
          <p className="text-white/50 text-base font-light max-w-xs md:text-right">
            Each film is a handcrafted story — told with intention, artistry, and heart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          <div className="md:col-span-2">
            <VideoCard work={featured} onClick={() => setActiveVideo(featured)} large />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5">
            {rest.slice(0, 2).map((w) => (
              <VideoCard key={w.id} work={w} onClick={() => setActiveVideo(w)} />
            ))}
          </div>
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {rest.slice(2).map((w) => (
              <VideoCard key={w.id} work={w} onClick={() => setActiveVideo(w)} />
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo ? drivePreview(activeVideo.videoId) : ""}
        title={activeVideo?.title}
        description={activeVideo?.description}
      />
    </section>
  );
}
