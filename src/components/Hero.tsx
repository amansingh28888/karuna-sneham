"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SiteSettings } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const waLink = buildWhatsAppLink(settings.whatsapp_number, settings.whatsapp_order_message);

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Warm ambient blobs — soft, not neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-secondary/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1B3A5C 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          {/* Organization Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-surface px-4 py-2 shadow-warm border border-primary/10">
            <Image
              src="/logo-cropped.jpeg"
              alt="Karuna Sneham Foundation - Best NGO for Children Logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-contain"
            />
            <span className="text-xs font-semibold text-primary">{settings.ngo_name}</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 px-2 py-0.5 border border-emerald-200">
              <ShieldCheck className="h-3 w-3" /> Registered NGO
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.1] text-primary">
            Turn your special day into
            <span className="block text-gradient-rose mt-1">a child&apos;s happiest memory with our NGO.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
            Celebrate birthdays, anniversaries, or milestones by sponsoring nutritious food, custom cakes, and gifts for underprivileged children — with our team managing the entire event.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book on WhatsApp
            </CTAButton>
            <CTAButton href="/packages" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              View Packages
            </CTAButton>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-4 pt-6 border-t border-primary/10">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
              ].map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt="Sponsor"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-surface object-cover shadow-sm"
                />
              ))}
            </div>
            <div className="text-xs text-ink-soft">
              <span className="font-semibold text-primary">100+ Sponsors</span> have shared their
              happiness with our kids this year.
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(27,58,92,0.22)] border border-primary/8 group">
            <Image
              src="/children.jpeg"
              alt="Underprivileged children celebrating with Karuna Sneham Foundation NGO"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-light/90 mb-1">
                Impact in Action
              </p>
              <p className="font-display text-lg font-medium leading-snug">
                &ldquo;A celebration becomes meaningful when it brings a smile to someone in need.&rdquo;
              </p>
            </div>
          </div>

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -left-5 sm:-left-7 glass-card rounded-2xl p-4 shadow-warm border border-white/80 flex items-center gap-3 max-w-[190px]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 shadow-[0_4px_12px_rgba(225,99,138,0.25)]">
              <Heart className="h-5 w-5 fill-rose-400" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-primary leading-none">480+ Kids</p>
              <p className="text-[11px] text-ink-soft mt-0.5">Smiles Created</p>
            </div>
          </motion.div>

          {/* Floating Badge 2 */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute -bottom-5 -right-5 sm:-right-7 glass-card rounded-2xl p-4 shadow-warm border border-white/80 flex items-center gap-3 max-w-[205px]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-primary leading-none">Direct HD Photos</p>
              <p className="text-[11px] text-ink-soft mt-0.5">Sent to your WhatsApp</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
