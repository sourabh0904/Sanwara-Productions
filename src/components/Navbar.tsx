"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home",      href: "#"         },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Gallery",   href: "#gallery"  },
  { name: "About",     href: "#about"    },
  { name: "Contact",   href: "#contact"  },
];

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection,    setActiveSection]    = useState("#");

  useEffect(() => {
    // Scroll-based background
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active-section via IntersectionObserver
    const sectionIds = ["portfolio", "gallery", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(`#${id}`); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const isActive = (href: string) =>
    href === "#" ? activeSection === "#" : activeSection === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y:  0   }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md py-3 shadow-lg shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" onClick={() => setActiveSection("#")} className="flex items-center group">
          <div className="relative w-40 h-10 md:w-[200px] md:h-[52px] shrink-0 hover:scale-105 transition-transform duration-300">
            <Image
              src="/media/logo.png"
              alt="Sanwara Productions"
              fill
              className="object-contain object-left md:object-center"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActiveSection(link.href)}
              className={`relative py-1 transition-colors duration-300 ${
                isActive(link.href) ? "text-gold" : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
              {/* Active underline */}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gold rounded-full"
                />
              )}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setActiveSection("#contact")}
            className="px-5 py-2.5 rounded-full border border-gold text-gold text-xs tracking-wider hover:bg-gold hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(201,169,110,0.1)] hover:shadow-[0_0_20px_rgba(201,169,110,0.4)]"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen
              ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X    size={26} /></motion.div>
              : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={26} /></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/97 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => { setIsMobileMenuOpen(false); setActiveSection(link.href); }}
                  className={`text-lg transition-colors duration-300 ${
                    isActive(link.href) ? "text-gold font-semibold" : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => { setIsMobileMenuOpen(false); setActiveSection("#contact"); }}
                className="mt-2 px-8 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm tracking-wider"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
