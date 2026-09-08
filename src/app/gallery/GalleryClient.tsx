"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import GalleryCard from "@/components/GalleryCard";
import Lightbox from "@/components/Lightbox";
import { GalleryItem } from "@/lib/types";

type Filter = "all" | "image" | "video";

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.media_type === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        align="center"
        eyebrow="Gallery"
        title="Moments from our celebrations"
        description="Photos and videos from celebrations hosted with children at Karuna Sneham Foundation."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {(["all", "image", "video"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface text-ink-soft border border-primary/15 hover:border-primary/40"
            }`}
          >
            {f === "all" ? "All" : f === "image" ? "Photos" : "Videos"}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={() => setSelected(item)} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-ink-soft">
          No {filter === "all" ? "" : filter === "image" ? "photos" : "videos"} yet — check back
          soon as we add celebrations here.
        </p>
      )}

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
