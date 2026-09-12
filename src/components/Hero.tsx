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
    <section className="relative overflow-hidden bg-background bg-mesh-pattern pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Heading & Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          {/* Organization Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-surface px-4 py-2 shadow-warm border border-primary/10">
            <Image
              src="/logo-cropped.jpeg"
              alt="Karuna Sneham Foundation logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-contain"
            />
            <span className="text-xs font-semibold text-primary">{settings.ngo_name}</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 px-2 py-0.5 border border-emerald-200">
              <ShieldCheck className="h-3 w-3" /> Registered NGO
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-primary">
            Turn your special day into
            <span className="block text-gradient-rose">a child&apos;s happiest memory.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
            Celebrate birthdays, anniversaries, or milestones by sponsoring nutritious food, custom cakes, and gifts for underprivileged children — with our team managing the entire event.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book Your Order on WhatsApp
            </CTAButton>
            <CTAButton href="/packages" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              View Packages
            </CTAButton>
          </div>

          {/* Social Proof / Avatars Stack */}
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
              <span className="font-semibold text-primary">100+ Sponsors</span> have shared their happiness with our kids this year.
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-card border border-primary/10 group">
            <Image
              src="/children.jpeg"
              alt="Children celebrating together"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Soft gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-light">
                Impact in Action
              </p>
              <p className="font-display text-xl font-medium mt-1">
                &ldquo;A celebration becomes meaningful when it brings a smile to someone in need.&rdquo;
              </p>
            </div>
          </div>

          {/* Floating Badge 1: Smiles Created */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 sm:-left-6 glass-card rounded-2xl p-4 shadow-warm flex items-center gap-3 border border-white/80 max-w-[200px]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600">
              <Heart className="h-5 w-5 fill-rose-500" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-primary">480+ Kids</p>
              <p className="text-[11px] text-ink-soft leading-tight">Smiles Created</p>
            </div>
          </motion.div>

          {/* Floating Badge 2: Verified Photos */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -right-4 sm:-right-6 glass-card rounded-2xl p-4 shadow-warm flex items-center gap-3 border border-white/80 max-w-[210px]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-primary">Direct HD Photos</p>
              <p className="text-[11px] text-ink-soft leading-tight">Sent to your WhatsApp</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
