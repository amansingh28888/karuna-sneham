"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { GalleryItem } from "@/lib/types";

export default function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-primary/90 backdrop-blur-md"
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="fixed right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Media Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl bg-surface/10 p-2 border border-white/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {item.media_type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.storage_path}
              alt={item.title}
              className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain mx-auto"
            />
          ) : (
            <video
              src={item.storage_path}
              controls
              autoPlay
              className="max-h-[72vh] w-auto max-w-full rounded-2xl mx-auto"
            />
          )}

          <div className="mt-4 p-4 text-center text-white bg-primary/80 backdrop-blur-md rounded-2xl border border-white/10">
            <h4 className="font-display text-xl font-semibold">{item.title}</h4>
            {item.event_date && (
              <p className="mt-1 text-xs text-secondary-light font-medium flex items-center justify-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Event Date: {item.event_date}
              </p>
            )}
            {item.description && <p className="mt-2 text-sm text-white/80 max-w-xl mx-auto">{item.description}</p>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
