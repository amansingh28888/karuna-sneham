"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import GalleryCard from "@/components/GalleryCard";
import Lightbox from "@/components/Lightbox";
import { GalleryItem } from "@/lib/types";
import { Camera, Film, Sparkles } from "lucide-react";

type Filter = "all" | "image" | "video";

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.media_type === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        align="center"
        eyebrow="Celebration Gallery"
        title="Real Moments of Joy & Happiness"
        description="Browse authentic photos and video highlights captured during birthday, anniversary, and festival celebrations hosted with our children."
      />

      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {[
          { id: "all", label: "All Memories", icon: Sparkles },
          { id: "image", label: "Photos", icon: Camera },
          { id: "video", label: "Videos", icon: Film },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as Filter)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-warm scale-105"
                  : "bg-surface text-ink-soft border border-primary/10 hover:border-primary/30"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeGalleryTab"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={() => setSelected(item)} />
          ))}
        </motion.div>
      </AnimatePresence>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
