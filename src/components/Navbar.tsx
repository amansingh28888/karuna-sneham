"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Menu, X, Sparkles } from "lucide-react";
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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-primary/10 transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-warm border-2 border-surface group-hover:scale-105 transition-transform">
            <Image
              src="/logo-cropped.jpeg"
              alt="Karuna Sneham Foundation logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
              Karuna Sneham
            </span>
            <span className="block text-xs font-body font-medium text-ink-soft">
              Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[15px] font-semibold transition-colors duration-200 py-1 ${
                  isActive ? "text-secondary" : "text-ink hover:text-secondary"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-secondary shadow-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Status */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            WhatsApp Online
          </div>
          <CTAButton href="/packages" variant="primary" className="!py-2.5 !px-5 text-xs sm:text-sm shadow-warm" icon={<Gift className="h-4 w-4" />}>
            Book Celebration
          </CTAButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden rounded-xl p-2 text-primary hover:bg-background transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-primary/10 bg-surface/98 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 shadow-xl"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-1 flex items-center justify-between border-b border-primary/5 ${
                  pathname === l.href ? "text-secondary font-semibold" : "text-ink"
                }`}
              >
                {l.label}
                {pathname === l.href && <Sparkles className="h-4 w-4 text-secondary" />}
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
