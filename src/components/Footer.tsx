"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteSettings } from "@/lib/types";
import { Heart, Instagram, Facebook, Youtube, MapPin, Phone, Mail, ShieldCheck, Lock } from "lucide-react";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative bg-gradient-to-b from-primary to-slate-950 text-white/90 pt-16 overflow-hidden">
      {/* Soft ambient orb */}
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 pb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 relative z-10">
        {/* Brand */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white p-0.5 shadow-warm">
              <Image src="/logo-cropped.jpeg" alt="Karuna Sneham Foundation logo" fill className="object-contain rounded-full" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-white block">Karuna Sneham</span>
              <span className="text-xs text-white/60">Foundation</span>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {settings.tagline || "Saving a smile, building a better tomorrow."}
          </p>
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/8 px-3.5 py-1.5 text-xs text-white/80 border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Registered Non-Profit NGO
            </div>
            {settings.cin && (
              <p className="mt-2 font-mono text-[11px] text-white/40">CIN: {settings.cin}</p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/packages", label: "Packages" },
              { href: "/gallery", label: "Gallery" },
              { href: "/donate", label: "Donate" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-secondary transition-colors duration-150">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3 text-sm text-white/60">
            {settings.phone && (
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary/70 shrink-0" />
                <span>{settings.phone}</span>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-secondary/70 shrink-0" />
                <span>{settings.email}</span>
              </li>
            )}
            {settings.address && (
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-secondary/70 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Social */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-display text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Connect With Us</h3>
          <div className="flex items-center gap-3">
            {settings.instagram_link && (
              <a href={settings.instagram_link} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 border border-white/10 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {settings.facebook_link && (
              <a href={settings.facebook_link} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 border border-white/10 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {settings.youtube_link && (
              <a href={settings.youtube_link} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 border border-white/10 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            )}
          </div>
          <div className="pt-2">
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors">
              <Lock className="h-3.5 w-3.5" /> Admin Panel Login
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-6 text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-5 gap-2">
        <p>© {new Date().getFullYear()} {settings.ngo_name}. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-white/60">
          Built with <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" /> for children&apos;s happiness
        </p>
      </div>
    </footer>
  );
}
