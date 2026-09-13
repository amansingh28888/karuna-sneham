"use client";

import { motion } from "framer-motion";
import { ImpactStatistics } from "@/lib/types";
import { Heart, Calendar, Utensils, Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function ImpactStats({ stats }: { stats: ImpactStatistics }) {
  const items = [
    {
      label: "Children Supported",
      value: stats.children_supported || 480,
      icon: Heart,
      bg: "bg-rose-50",
      text: "text-rose-500",
      border: "border-rose-100",
      accent: "#E1638A",
    },
    {
      label: "Events Organized",
      value: stats.events_organized || 74,
      icon: Calendar,
      bg: "bg-amber-50",
      text: "text-amber-500",
      border: "border-amber-100",
      accent: "#F59E0B",
    },
    {
      label: "Meals Distributed",
      value: stats.meals_distributed || 2850,
      icon: Utensils,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      accent: "#10B981",
    },
    {
      label: "Active Volunteers",
      value: stats.volunteers || 45,
      icon: Users,
      bg: "bg-sky-50",
      text: "text-sky-500",
      border: "border-sky-100",
      accent: "#0EA5E9",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="group rounded-3xl bg-surface p-6 text-center shadow-card border border-primary/8 transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 cursor-default"
          >
            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border ${item.bg} ${item.text} ${item.border} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary">
              <AnimatedCounter target={item.value} suffix="+" />
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-medium text-ink-soft">{item.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
