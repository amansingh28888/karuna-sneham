"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-primary/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo-cropped.jpeg"
            alt="Karuna Sneham Foundation logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain rounded-full"
            priority
          />
          <span className="font-display text-lg text-primary leading-tight hidden sm:block">
            Karuna Sneham<br />
            <span className="text-sm font-body font-normal text-ink-soft">Foundation</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[15px] font-medium transition-colors hover:text-secondary ${
                pathname === l.href ? "text-secondary" : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href="/packages" variant="primary" className="!py-2.5 !px-5 text-sm">
            Book Your Order
          </CTAButton>
        </div>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-primary/10 bg-surface px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-base font-medium ${pathname === l.href ? "text-secondary" : "text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
          <CTAButton href="/packages" variant="primary" className="mt-2">
            Book Your Order
          </CTAButton>
        </nav>
      )}
    </header>
  );
}
