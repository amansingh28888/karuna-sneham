"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/lib/types";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col justify-between rounded-3xl bg-surface p-8 shadow-card border border-primary/10 transition-all duration-300 hover:shadow-card-hover"
    >
      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 text-amber-400 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400" />
          ))}
        </div>

        <Quote className="h-8 w-8 text-secondary/20 mb-2" />

        <p className="text-sm sm:text-base text-ink-soft leading-relaxed italic">
          &ldquo;{t.message}&rdquo;
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-primary/10 flex items-center justify-between">
        <div>
          <p className="font-display text-base font-bold text-primary flex items-center gap-1.5">
            {t.name}
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </p>
          {t.occasion && (
            <span className="inline-block mt-0.5 rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
              {t.occasion}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
