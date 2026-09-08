"use client";

import { GalleryItem } from "@/lib/types";

export default function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/95 p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        ✕
      </button>
      <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {item.media_type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.storage_path}
            alt={item.title}
            className="max-h-[75vh] w-auto rounded-card object-contain"
          />
        ) : (
          <video
            src={item.storage_path}
            controls
            autoPlay={false}
            className="max-h-[75vh] w-auto rounded-card"
          />
        )}
        <div className="mt-4 text-center text-white">
          <p className="font-medium">{item.title}</p>
          {item.description && <p className="text-sm text-white/70 mt-1">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}
