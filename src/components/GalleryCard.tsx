"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ZoomIn, Calendar } from "lucide-react";
import { GalleryItem } from "@/lib/types";

export default function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-3xl shadow-card border border-primary/10 aspect-square text-left focus:outline-none focus:ring-2 focus:ring-secondary"
    >
      {item.media_type === "image" ? (
        <Image
          src={item.storage_path}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <>
          <video
            src={item.storage_path}
            className="h-full w-full object-cover"
            preload="metadata"
            muted
            playsInline
          />
          <span className="absolute inset-0 flex items-center justify-center bg-primary/30 backdrop-blur-[2px]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-glow transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-primary ml-1" />
            </span>
          </span>
        </>
      )}

      {/* Hover Zoom Icon Overlay */}
      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
          <ZoomIn className="h-5 w-5" />
        </span>
      </div>

      {/* Title & Date Caption Gradient */}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-5 text-white">
        <span className="block font-display text-base font-semibold leading-snug drop-shadow-sm">
          {item.title}
        </span>
        {item.event_date && (
          <span className="mt-1 flex items-center gap-1 text-[11px] text-white/80 font-medium">
            <Calendar className="h-3 w-3 text-secondary-light" /> {item.event_date}
          </span>
        )}
      </span>
    </motion.button>
  );
}
