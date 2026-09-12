"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  // Calculations per child ~ ₹100 meal + celebration share
  const estimatedCost = childrenCount * 100;
  const cakeWeightKg = Math.max(1, Math.min(5, Math.ceil(childrenCount / 15)));

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
    });
  };

  const bookingMessage = `Hello Karuna Sneham Foundation, I want to sponsor a ${occasion} celebration for ${childrenCount} children (approx ₹${estimatedCost.toLocaleString("en-IN")}). Please let me know how we can organize this!`;
  const waLink = buildWhatsAppLink(whatsappNumber, bookingMessage);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 sm:p-12 text-white shadow-2xl">
      {/* Decorative ambient background blur lights */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-secondary-light backdrop-blur-md border border-white/10">
            <Sparkles className="h-4 w-4" /> Interactive Impact Simulator
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
            Design Your Custom Celebration
          </h2>
          <p className="mt-3 text-white/80 text-base leading-relaxed">
            Move the slider to see how many children you can bring smiles to on your special occasion.
          </p>
        </div>

        {/* Occasion chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {["Birthday", "Anniversary", "In Memory Of", "Milestone", "Festival Joy"].map((occ) => (
            <button
              key={occ}
              onClick={() => setOccasion(occ)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                occasion === occ
                  ? "bg-secondary text-white shadow-glow scale-105"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Slider & Stats Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Slider input */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-card p-6 sm:p-8 border border-white/15">
            <div className="flex items-center justify-between">
              <label htmlFor="children-slider" className="text-sm font-semibold text-white/90">Children Supported:</label>
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
              className="mt-6 w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
            />

            <div className="mt-2 flex justify-between text-xs text-white/60">
              <span>10 Kids</span>
              <span>75 Kids</span>
              <span>150+ Kids</span>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/70 block">Estimated Sponsorship</span>
                <span className="font-display text-2xl text-white font-semibold">
                  ₹{estimatedCost.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs bg-accent/20 text-accent-light px-3 py-1 rounded-full border border-accent/30 font-medium">
                Transparent Pricing
              </span>
            </div>
          </div>

          {/* Dynamic Impact Summary */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <motion.div
              key={`meals-${childrenCount}`}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{childrenCount}</div>
                <div className="text-xs text-white/70 font-medium mt-1">Nutritious Hot Meals</div>
              </div>
            </motion.div>

            <motion.div
              key={`cake-${childrenCount}`}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Cake className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{cakeWeightKg} kg</div>
                <div className="text-xs text-white/70 font-medium mt-1">Custom Fresh Cake</div>
              </div>
            </motion.div>

            <motion.div
              key={`kits-${childrenCount}`}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{Math.floor(childrenCount / 2)}</div>
                <div className="text-xs text-white/70 font-medium mt-1">Stationery Gift Kits</div>
              </div>
            </motion.div>

            <motion.div
              key={`cert-${childrenCount}`}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-3">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-white">Full HD</div>
                <div className="text-xs text-white/70 font-medium mt-1">Photo & Video Memory Album</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div onClick={triggerConfetti}>
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book {occasion} Celebration for {childrenCount} Children
            </CTAButton>
          </div>
          <span className="text-xs text-white/60 italic">
            Directly sends pre-filled WhatsApp message to our organization coordinator.
          </span>
        </div>
      </div>
    </section>
  );
}
