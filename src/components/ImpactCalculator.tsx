"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Heart, Gift, Cake, Sparkles, Award } from "lucide-react";

interface ImpactCalculatorProps {
  whatsappNumber: string;
}

export default function ImpactCalculator({ whatsappNumber }: ImpactCalculatorProps) {
  const [childrenCount, setChildrenCount] = useState<number>(30);
  const [occasion, setOccasion] = useState<string>("Birthday");

  const estimatedCost = childrenCount * 100;
  const cakeWeightKg = Math.max(1, Math.min(5, Math.ceil(childrenCount / 15)));

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#E1638A", "#1B3A5C", "#6E8B3D", "#F0A0BB"],
    });
  };

  const bookingMessage = `Hello Karuna Sneham Foundation, I want to sponsor a ${occasion} celebration for ${childrenCount} children (approx ₹${estimatedCost.toLocaleString("en-IN")}). Please let me know how we can organize this!`;
  const waLink = buildWhatsAppLink(whatsappNumber, bookingMessage);

  const statCards = [
    { icon: Heart,  label: "Nutritious Hot Meals",     value: String(childrenCount),              bg: "bg-rose-50",   text: "text-rose-600",   border: "border-rose-100" },
    { icon: Cake,   label: "Custom Fresh Cake",         value: `${cakeWeightKg} kg`,               bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-100" },
    { icon: Gift,   label: "Stationery Gift Kits",      value: String(Math.floor(childrenCount/2)), bg: "bg-emerald-50",text: "text-emerald-600",border: "border-emerald-100" },
    { icon: Award,  label: "Photo & Video Album",       value: "Full HD",                          bg: "bg-sky-50",    text: "text-sky-600",    border: "border-sky-100" },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 sm:p-12 text-white shadow-2xl">
      {/* Soft ambient orbs — warm, not neon */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/8" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-secondary-light backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Impact Simulator
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
            Design Your Custom Celebration
          </h2>
          <p className="mt-3 text-white/75 leading-relaxed">
            Move the slider to see how many children you can bring smiles to on your special occasion.
          </p>
        </div>

        {/* Occasion chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["Birthday", "Anniversary", "In Memory Of", "Milestone", "Festival Joy"].map((occ) => (
            <button
              key={occ}
              onClick={() => setOccasion(occ)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border ${
                occasion === occ
                  ? "bg-secondary text-white border-secondary shadow-soft scale-105"
                  : "bg-white/10 text-white/80 border-white/15 hover:bg-white/18"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Slider */}
          <div className="lg:col-span-6 bg-white/8 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/12">
            <div className="flex items-center justify-between">
              <label htmlFor="children-slider" className="text-sm font-semibold text-white/90">
                Children Supported:
              </label>
              <span className="font-display text-3xl font-bold text-secondary-light">
                {childrenCount} Kids
              </span>
            </div>

            <input
              id="children-slider"
              type="range"
              min="10"
              max="150"
              step="5"
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              className="mt-6 w-full"
            />

            <div className="mt-2 flex justify-between text-xs text-white/50">
              <span>10 Kids</span>
              <span>75 Kids</span>
              <span>150+ Kids</span>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/60 block mb-0.5">Estimated Sponsorship</span>
                <span className="font-display text-2xl font-bold text-white">
                  ₹{estimatedCost.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs bg-accent/20 text-accent-light px-3 py-1 rounded-full border border-accent/25 font-medium">
                Transparent Pricing
              </span>
            </div>
          </div>

          {/* Impact summary grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="rounded-2xl bg-white/8 backdrop-blur-md p-5 border border-white/10 flex flex-col gap-3"
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${card.bg} ${card.text} ${card.border}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">{card.value}</div>
                    <div className="text-xs text-white/60 font-medium mt-0.5">{card.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div onClick={triggerConfetti}>
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book {occasion} for {childrenCount} Children
            </CTAButton>
          </div>
          <span className="text-xs text-white/50 italic">
            Sends a pre-filled message directly to our coordinator.
          </span>
        </div>
      </div>
    </section>
  );
}
