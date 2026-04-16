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

/** Shared card inner — used by both desktop and mobile layouts */
function VideoCard({
  work,
  onClick,
  large = false,
  aspectClass = "",
}: {
  work: Work;
  onClick: () => void;
  large?: boolean;
  aspectClass?: string;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const aspect = aspectClass || (large ? "aspect-[16/9]" : "aspect-[4/3]");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#141414] w-full h-full"
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden bg-[#141414] ${aspect}`}>

        {/* Thumbnail */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={driveImg(work.thumbId)}
            alt={work.title}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
              playing ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#222]" />
        )}

        {/* Preview video */}
        <video
          ref={videoRef}
          src={work.previewSrc}
          muted
          playsInline
          loop
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-transparent z-10" />

        {/* Category */}
        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/55 backdrop-blur-md rounded-full text-[10px] font-medium tracking-[0.18em] uppercase text-gold border border-gold/20">
          {work.category}
        </span>

        {/* Play button */}
        {!playing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className={`relative rounded-full bg-black/40 backdrop-blur-sm border border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:border-gold group-hover:shadow-[0_0_40px_rgba(201,169,110,0.5)] ${
                large ? "w-[72px] h-[72px]" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
            >
              <Play
                className="text-gold group-hover:text-black ml-1 transition-colors duration-300"
                size={large ? 24 : 16}
                fill="currentColor"
              />
              <span className="absolute inset-0 rounded-full border border-gold/25 animate-ping" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`absolute bottom-0 left-0 w-full z-20 ${large ? "p-6 md:p-7" : "p-4 md:p-5"}`}>
        <h4
          className={`font-semibold text-white drop-shadow-md leading-tight ${
            large ? "text-xl md:text-2xl lg:text-3xl" : "text-sm md:text-base"
          }`}
        >
          {work.title}
        </h4>
        {large && (
          <p className="text-white/40 text-xs md:text-sm mt-1.5 font-light max-w-sm leading-relaxed hidden sm:block">
            {work.description}
          </p>
        )}
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-gold/18 transition-all duration-500 pointer-events-none z-30" />
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [activeVideo, setActiveVideo] = useState<Work | null>(null);
  const [featured, ...rest] = works;

  return (
    <section id="portfolio" className="py-24 md:py-28 bg-[#0B0B0B] relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/60" />
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Our Portfolio</p>
            </div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Featured<br />
              <em className="italic font-semibold">Masterpieces</em>
            </h2>
          </div>
          <p className="text-white/35 text-sm font-light max-w-xs md:text-right leading-relaxed hidden md:block">
            Each film is a handcrafted story — told with intention, artistry, and heart.
          </p>
        </motion.div>

        {/* ── DESKTOP LAYOUT (md+) ── */}
        <div className="hidden md:grid grid-cols-3 gap-3 lg:gap-4">
          {/* Featured — 2/3 wide */}
          <div className="col-span-2">
            <VideoCard work={featured} onClick={() => setActiveVideo(featured)} large />
          </div>
          {/* Right column — 2 stacked */}
          <div className="flex flex-col gap-3 lg:gap-4">
            {rest.slice(0, 2).map((w) => (
              <VideoCard key={w.id} work={w} onClick={() => setActiveVideo(w)} />
            ))}
          </div>
          {/* Bottom row — 3 equal */}
          <div className="col-span-3 grid grid-cols-3 gap-3 lg:gap-4">
            {rest.slice(2).map((w) => (
              <VideoCard key={w.id} work={w} onClick={() => setActiveVideo(w)} />
            ))}
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Featured card — full width */}
          <VideoCard
            work={featured}
            onClick={() => setActiveVideo(featured)}
            large
            aspectClass="aspect-video"
          />

          {/* Horizontal scroll strip */}
          <div className="relative">
            {/* Fade hint right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none rounded-r-2xl" />
            <div
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1 -mx-4 px-4"
            >
              {rest.map((w) => (
                <div
                  key={w.id}
                  className="shrink-0 w-[72vw] snap-start"
                >
                  <VideoCard
                    work={w}
                    onClick={() => setActiveVideo(w)}
                    aspectClass="aspect-[4/3]"
                  />
                </div>
              ))}
              {/* Trailing spacer so last card isn't clipped */}
              <div className="shrink-0 w-4" />
            </div>
          </div>

          {/* Scroll hint */}
          <p className="text-center text-white/25 text-[10px] font-light tracking-[0.25em] uppercase mt-1">
            Swipe to explore more
          </p>
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
