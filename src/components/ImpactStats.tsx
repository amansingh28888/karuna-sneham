"use client";

import { motion } from "framer-motion";
import { ImpactStatistics } from "@/lib/types";
import { Heart, Calendar, Utensils, Users } from "lucide-react";

export default function ImpactStats({ stats }: { stats: ImpactStatistics }) {
  const items = [
    {
      label: "Children Supported",
      value: stats.children_supported || 480,
      icon: Heart,
      color: "bg-rose-500/10 text-rose-600",
    },
    {
      label: "Events Organized",
      value: stats.events_organized || 74,
      icon: Calendar,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      label: "Meals Distributed",
      value: stats.meals_distributed || 2850,
      icon: Utensils,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Active Volunteers",
      value: stats.volunteers || 45,
      icon: Users,
      color: "bg-sky-500/10 text-sky-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {items.map((i, idx) => {
        const Icon = i.icon;
        return (
          <motion.div
            key={i.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-surface p-6 text-center shadow-card border border-primary/10 transition-all duration-300 hover:shadow-card-hover hover:border-primary/25"
          >
            <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${i.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary">
              {i.value.toLocaleString("en-IN")}+
            </p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-ink-soft">{i.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
