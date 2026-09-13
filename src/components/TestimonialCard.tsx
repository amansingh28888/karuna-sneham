"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/lib/types";
import { Star, CheckCircle2, Quote } from "lucide-react";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-surface p-8 shadow-card border border-primary/8 transition-all duration-300 hover:shadow-card-hover hover:border-secondary/20"
    >
      {/* Soft top accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gradient-to-r from-secondary/0 via-secondary/40 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <Quote className="h-7 w-7 text-secondary/20 mb-3" />

        <p className="text-sm sm:text-base text-ink-soft leading-relaxed italic">
          &ldquo;{t.message}&rdquo;
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-primary/8 flex items-center justify-between">
        <div>
          <p className="font-display text-base font-bold text-primary flex items-center gap-1.5">
            {t.name}
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </p>
          {t.occasion && (
            <span className="inline-block mt-1 rounded-full bg-secondary/10 text-secondary px-2.5 py-0.5 text-[11px] font-semibold border border-secondary/15">
              {t.occasion}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
