"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, PackageCheck, MessageCircle, PartyPopper, Camera } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: Calendar,
    title: "Choose Your Occasion",
    body: "Pick a birthday, anniversary, memorial, festival, or milestone worth honoring.",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: PackageCheck,
    title: "Select a Package",
    body: "Pick a package for 15, 35, or 75+ children — sized to your budget and occasion.",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: MessageCircle,
    title: "Connect via WhatsApp",
    body: "Tell us your date & message. We confirm all arrangements within minutes.",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: PartyPopper,
    title: "We Host the Feast",
    body: "Our team conducts cake cutting, games, and meal service with the children.",
    accent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    icon: Camera,
    title: "Receive Memories",
    body: "High-definition photos and video wishes delivered straight to your WhatsApp.",
    accent: "bg-violet-50 text-violet-600 border-violet-100",
  },
];

export default function HowItWorksTimeline() {
  return (
    <section className="bg-gradient-to-b from-surface via-background to-surface py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          align="center"
          eyebrow="Simple & Transparent"
          title="From Your Special Day to a Child's Smile"
          description="How our 5-step celebration process works — from booking to memory sharing."
        />

        <div className="mt-16 relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-[2.6rem] left-[calc(10%+1.5rem)] right-[calc(10%+1.5rem)] h-px bg-primary/10" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.09 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col rounded-2xl bg-surface p-6 shadow-card border border-primary/8 transition-all duration-300 hover:shadow-card-hover hover:border-primary/20"
                >
                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display text-2xl font-extrabold text-primary/20 group-hover:text-secondary/40 transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className={`rounded-xl p-2.5 border ${s.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-base text-primary group-hover:text-secondary transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft leading-relaxed">{s.body}</p>

                  <div className="mt-5 pt-4 border-t border-primary/5 flex items-center gap-1.5 text-[11px] font-semibold text-accent">
                    <Sparkles className="h-3 w-3" /> Step {idx + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
