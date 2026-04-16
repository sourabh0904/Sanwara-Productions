"use client";

import Link from "next/link";
import Image from "next/image";
// Instagram SVG inline (lucide-react v1.x doesn't ship Instagram)
function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const exploreLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "@sanwara_production", href: "https://www.instagram.com/sanwara_production" },
  { label: "@malwanagarbaindore", href: "https://www.instagram.com/malwanagarbaindore" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] pt-20 pb-10 border-t border-white/6 relative z-20">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="#" className="inline-block mb-6 group">
              <div className="relative w-48 h-12 md:w-[220px] md:h-[54px] shrink-0 group-hover:opacity-85 transition-opacity duration-300">
                <Image
                  src="/media/logo.png"
                  alt="Sanwara Productions"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-white/40 font-light leading-relaxed text-sm">
              Crafting premium luxury event films. Transforming fleeting moments into everlasting art.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-white/80 font-medium mb-1 uppercase tracking-[0.2em] text-xs">Explore</h4>
              {exploreLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-white/40 hover:text-gold transition-colors duration-200 text-sm font-light"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white/80 font-medium mb-1 uppercase tracking-[0.2em] text-xs">Follow Us</h4>
              {socialLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-gold transition-colors duration-200 text-sm font-light flex items-center gap-2"
                >
                  <InstagramIcon size={14} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm font-light">
            &copy; {new Date().getFullYear()} Sanwara Productions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/30 font-light">
            <Link href="#" className="hover:text-white/60 transition-colors duration-200">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/60 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
