"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, PlaySquare, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        
        {/* Brand */}
        <div className="max-w-sm">
          <Link href="#" className="flex items-center gap-2 group mb-6 inline-block">
            <div className="relative w-80 h-24 md:w-[500px] md:h-[130px] shrink-0 hover:scale-105 transition-transform duration-300">
              <Image 
                src="/media/logo.png" 
                alt="Sanwara Productions" 
                fill 
                className="object-contain object-left md:object-center" 
              />
            </div>
          </Link>
          <p className="text-white/50 font-light leading-relaxed">
            Crafting premium luxury event films globally. Transforming fleeting moments into everlasting art.
          </p>
        </div>

        {/* Links Map */}
        <div className="flex gap-16 lg:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">Explore</h4>
            <Link href="#portfolio" className="text-white/50 hover:text-gold transition-colors text-sm">Portfolio</Link>
            <Link href="#about" className="text-white/50 hover:text-gold transition-colors text-sm">About Us</Link>
            <Link href="#" className="text-white/50 hover:text-gold transition-colors text-sm">Pricing</Link>
            <Link href="#" className="text-white/50 hover:text-gold transition-colors text-sm">FAQ</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">Socials</h4>
            <Link href="https://www.instagram.com/sanwara_production" target="_blank" className="text-white/50 hover:text-gold transition-colors text-sm flex items-center gap-2">
              <Globe size={16} /> @sanwara_production
            </Link>
            <Link href="https://www.instagram.com/malwanagarbaindore" target="_blank" className="text-white/50 hover:text-gold transition-colors text-sm flex items-center gap-2">
              <Globe size={16} /> @malwanagarbaindore
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm font-light">
          &copy; {new Date().getFullYear()} Cinematic Studio. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-white/40 font-light">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
