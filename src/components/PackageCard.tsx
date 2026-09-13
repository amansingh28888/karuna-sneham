"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Users } from "lucide-react";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Package } from "@/lib/types";

export default function PackageCard({
  pkg,
  whatsappNumber,
  onOpenBooking,
}: {
  pkg: Package;
  whatsappNumber: string;
  onOpenBooking?: (pkgId: string) => void;
}) {
  const message = `Hello Karuna Sneham Foundation, I would like to book the "${pkg.name}" celebration package (₹${pkg.price.toLocaleString("en-IN")}). Please share details.`;
  const waLink = buildWhatsAppLink(whatsappNumber, message);

  const isPopular = pkg.name.toLowerCase().includes("smile") || pkg.sort_order === 2;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-surface border transition-all duration-300 ${
        isPopular
          ? "border-secondary/30 shadow-[0_12px_40px_-10px_rgba(225,99,138,0.25)]"
          : "border-primary/8 shadow-warm hover:shadow-card-hover hover:border-primary/20"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-secondary px-3.5 py-1 text-[11px] font-bold text-white shadow-soft">
          <Sparkles className="h-3 w-3" /> Most Popular
        </div>
      )}

      {/* Image or colour bar */}
      {pkg.image_url ? (
        <div className="relative h-48 w-full overflow-hidden bg-primary/5">
          <Image
            src={pkg.image_url}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
        </div>
      ) : (
        <div
          className={`h-1.5 ${isPopular ? "bg-gradient-to-r from-secondary to-secondary-light" : "bg-gradient-to-r from-primary to-secondary"}`}
        />
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-1.5 text-xs font-bold text-accent mb-1.5">
          <Users className="h-3.5 w-3.5" /> Supports {pkg.children_supported} Children
        </div>

        <h3 className="font-display text-2xl font-bold text-primary">{pkg.name}</h3>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-extrabold text-secondary">
            ₹{pkg.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-ink-soft">/ celebration</span>
        </div>

        <p className="mt-3 text-sm text-ink-soft leading-relaxed min-h-[44px]">{pkg.description}</p>

        {pkg.features.length > 0 && (
          <ul className="mt-5 space-y-2 text-xs sm:text-sm text-ink border-t border-primary/5 pt-4">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 pt-4 border-t border-primary/5">
          {onOpenBooking ? (
            <button
              onClick={() => onOpenBooking(pkg.id)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-whatsapp-hover hover:shadow-[0_8px_24px_-4px_rgba(37,211,102,0.4)]"
            >
              <WhatsAppIcon className="h-4 w-4" /> Choose Package
            </button>
          ) : (
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-4 w-4" />} className="w-full justify-center">
              Choose Package
            </CTAButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}
