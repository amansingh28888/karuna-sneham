"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Menu, X } from "lucide-react";
import CTAButton from "./CTAButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-primary/10 shadow-[0_2px_20px_rgba(27,58,92,0.08)]"
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative h-11 w-11 rounded-full overflow-hidden shadow-warm border-2 border-surface group-hover:scale-105 transition-transform duration-200">
            <Image src="/logo-cropped.jpeg" alt="Karuna Sneham Foundation logo" fill className="object-contain" priority />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-base font-bold text-primary leading-tight block group-hover:text-secondary transition-colors">
              Karuna Sneham
            </span>
            <span className="text-xs font-body text-ink-soft">Foundation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-semibold py-1 transition-colors duration-200 ${
                  isActive ? "text-secondary" : "text-ink hover:text-secondary"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            WhatsApp Online
          </span>
          <CTAButton href="/packages" variant="primary" className="!py-2.5 !px-5 !text-sm" icon={<Gift className="h-4 w-4" />}>
            Book Celebration
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden rounded-xl p-2 text-primary hover:bg-primary/5 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden border-t border-primary/8 bg-surface/98 backdrop-blur-xl px-6 py-5 flex flex-col gap-3 shadow-xl"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-1.5 border-b border-primary/5 transition-colors ${
                  pathname === l.href ? "text-secondary font-semibold" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <CTAButton href="/packages" variant="primary" className="w-full justify-center" icon={<Gift className="h-4 w-4" />}>
                Book Celebration
              </CTAButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
