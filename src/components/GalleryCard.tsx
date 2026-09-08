import Image from "next/image";
import { GalleryItem } from "@/lib/types";

export default function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-card shadow-warm aspect-square text-left"
    >
      {item.media_type === "image" ? (
        <Image
          src={item.storage_path}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          <span className="absolute inset-0 flex items-center justify-center bg-primary/20">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary">
              ▶
            </span>
          </span>
        </>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-4 text-white">
        <span className="block text-sm font-medium">{item.title}</span>
      </span>
    </button>
  );
}
