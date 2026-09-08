import Image from "next/image";
import Link from "next/link";
import { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-primary text-white/90 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo-cropped.jpeg"
              alt="Karuna Sneham Foundation logo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain rounded-full bg-white"
            />
            <span className="font-display text-lg text-white">Karuna Sneham</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{settings.tagline}</p>
          {settings.cin && <p className="mt-3 text-xs text-white/50">CIN: {settings.cin}</p>}
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-white/75">
            {settings.phone && <li>{settings.phone}</li>}
            {settings.email && <li>{settings.email}</li>}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Follow Along</h3>
          <ul className="space-y-2 text-sm text-white/75">
            {settings.instagram_link && (
              <li><a href={settings.instagram_link} className="hover:text-white" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            )}
            {settings.facebook_link && (
              <li><a href={settings.facebook_link} className="hover:text-white" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            )}
            {settings.youtube_link && (
              <li><a href={settings.youtube_link} className="hover:text-white" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {settings.ngo_name}. All rights reserved.
      </div>
    </footer>
  );
}
