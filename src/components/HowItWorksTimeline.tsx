"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, PackageCheck, MessageCircle, PartyPopper, Camera } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: Calendar,
    title: "Choose Your Occasion",
    body: "Pick a birthday, anniversary, memorial, festival, or milestone worth honoring.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: PackageCheck,
    title: "Select Celebration Package",
    body: "Select a package tailored for 15, 35, or 75+ children based on your budget.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: MessageCircle,
    title: "Connect via WhatsApp",
    body: "Tell us your date & custom message. We confirm all arrangements instantly.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: PartyPopper,
    title: "We Host The Feast & Party",
    body: "Our team conducts cake cutting, games, and meal service with the kids at our centre.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Camera,
    title: "Receive Photos & Videos",
    body: "High-definition memory photos and video wishes are delivered right to your phone.",
    color: "bg-purple-500/10 text-purple-600",
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
          description="How our 5-step celebration process works from initial booking to memory sharing."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-card bg-surface p-6 shadow-warm border border-primary/10 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary/30 group-hover:text-secondary transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className={`rounded-xl p-3 ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-lg text-primary group-hover:text-secondary transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {s.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/5 flex items-center gap-1.5 text-[11px] font-semibold text-accent">
                  <Sparkles className="h-3.5 w-3.5" /> Step {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
