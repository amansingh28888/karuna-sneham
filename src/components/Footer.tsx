import Image from "next/image";
import Link from "next/link";
import { SiteSettings } from "@/lib/types";
import { Heart, Instagram, Facebook, Youtube, MapPin, Phone, Mail, ShieldCheck, Lock } from "lucide-react";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative bg-gradient-to-b from-primary to-slate-950 text-white/90 pt-16">
      <div className="mx-auto max-w-6xl px-5 pb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        {/* Col 1: Brand info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white p-0.5 shadow-warm">
              <Image
                src="/logo-cropped.jpeg"
                alt="Karuna Sneham Foundation logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-white block">Karuna Sneham</span>
              <span className="text-xs text-white/70">Foundation</span>
            </div>
          </div>

          <p className="text-sm text-white/75 leading-relaxed">
            {settings.tagline || "Saving a smile, building a better tomorrow."}
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-1.5 text-xs text-white/85 backdrop-blur-md border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Registered Non-Profit NGO</span>
            </div>
            {settings.cin && (
              <p className="mt-2 font-mono text-[11px] text-white/50">CIN: {settings.cin}</p>
            )}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
            <li><Link href="/packages" className="hover:text-secondary transition-colors">Celebration Packages</Link></li>
            <li><Link href="/gallery" className="hover:text-secondary transition-colors">Photo & Video Gallery</Link></li>
            <li><Link href="/donate" className="hover:text-secondary transition-colors">Donate & Contribute</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-white/75">
            {settings.phone && (
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <span>{settings.phone}</span>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span>{settings.email}</span>
              </li>
            )}
            {settings.address && (
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Col 4: Social Links & Admin Login */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-display text-base font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex items-center gap-3">
            {settings.instagram_link && (
              <a
                href={settings.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-secondary hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {settings.facebook_link && (
              <a
                href={settings.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-secondary hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {settings.youtube_link && (
              <a
                href={settings.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-secondary hover:text-white transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            )}
          </div>

          <div className="pt-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Lock className="h-3.5 w-3.5" /> Admin Panel Login
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-5 gap-2">
        <p>© {new Date().getFullYear()} {settings.ngo_name}. All rights reserved.</p>
        <p className="flex items-center justify-center gap-1 text-white/70">
          Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for children&apos;s happiness
        </p>
      </div>
    </footer>
  );
}
