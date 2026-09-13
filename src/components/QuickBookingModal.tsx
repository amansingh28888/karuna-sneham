"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { X, Calendar, User, Gift, CheckCircle } from "lucide-react";
import { Package } from "@/lib/types";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  packages: Package[];
  initialPackageId?: string;
}

export default function QuickBookingModal({
  isOpen,
  onClose,
  whatsappNumber,
  packages,
  initialPackageId,
}: QuickBookingModalProps) {
  const [sponsorName, setSponsorName] = useState("");
  const [occasion, setOccasion] = useState("Birthday");
  const [eventDate, setEventDate] = useState("");
  const [selectedPkgId, setSelectedPkgId] = useState(
    initialPackageId || (packages[0]?.id ?? "")
  );

  // Sync selected package when modal opens with a specific package
  useEffect(() => {
    if (initialPackageId) setSelectedPkgId(initialPackageId);
  }, [initialPackageId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  const handleBook = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#E1638A", "#1B3A5C", "#6E8B3D"] });
  };

  const message = `Hello Karuna Sneham Foundation! ${
    sponsorName ? `My name is ${sponsorName}. ` : ""
  }I would like to book the "${selectedPkg?.name || "Celebration"}" package for a ${occasion}${
    eventDate ? ` on ${eventDate}` : ""
  }. Please share available slots and confirmation details.`;

  const waLink = buildWhatsAppLink(whatsappNumber, message);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/55 backdrop-blur-sm"
          />

          {/* Modal — bottom sheet on mobile, centred card on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 w-full sm:max-w-lg bg-surface shadow-2xl
                       rounded-t-3xl sm:rounded-3xl
                       flex flex-col
                       max-h-[90dvh] sm:max-h-[88vh]
                       border border-primary/10"
          >
            {/* ── Sticky Header ── */}
            <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-primary/8 shrink-0">
              {/* Drag handle (mobile) */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-primary/15 sm:hidden" />

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/12 text-secondary shrink-0">
                <Gift className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-primary leading-tight">
                  Book Your Celebration
                </h3>
                <p className="text-xs text-ink-soft truncate">
                  Fill details &amp; send via WhatsApp
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-ink-soft hover:bg-background hover:text-primary transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-4">

              {/* Sponsor Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft mb-1.5">
                  <User className="h-3.5 w-3.5 text-secondary" /> Your Name
                  <span className="font-normal text-ink-soft/60">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aman Singh"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/40"
                />
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">
                  Occasion Type
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/40"
                >
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Wedding Anniversary">Wedding Anniversary</option>
                  <option value="In Loving Memory">In Loving Memory</option>
                  <option value="Career Milestone / Promotion">Career Milestone</option>
                  <option value="Festival Feast">Festival Feast</option>
                  <option value="General Gratitude Drive">General Gratitude Drive</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft mb-1.5">
                  <Calendar className="h-3.5 w-3.5 text-secondary" /> Preferred Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/40"
                />
              </div>

              {/* Package Selection */}
              {packages.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2">
                    Select Package
                  </label>
                  <div className="space-y-2">
                    {packages.map((pkg) => {
                      const isSelected = selectedPkgId === pkg.id;
                      return (
                        <label
                          key={pkg.id}
                          className={`flex items-center justify-between rounded-xl p-3 border cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "border-secondary bg-secondary/6 shadow-soft"
                              : "border-primary/10 bg-surface hover:border-secondary/30 hover:bg-secondary/3"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="radio"
                              name="package"
                              value={pkg.id}
                              checked={isSelected}
                              onChange={() => setSelectedPkgId(pkg.id)}
                              className="accent-secondary shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-primary truncate">{pkg.name}</p>
                              <p className="text-xs text-ink-soft">
                                Supports {pkg.children_supported} children
                              </p>
                            </div>
                          </div>
                          <span className="font-display text-sm font-bold text-secondary shrink-0 ml-3">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sticky Footer CTA ── */}
            <div className="px-6 pb-6 pt-4 border-t border-primary/8 shrink-0 space-y-2.5 bg-surface rounded-b-3xl">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleBook(); onClose(); }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-whatsapp-hover hover:shadow-[0_8px_24px_-4px_rgba(37,211,102,0.4)] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Confirm &amp; Order via WhatsApp
              </a>
              <p className="text-center text-[11px] text-ink-soft flex items-center justify-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                No upfront online payment required. Confirmation handled directly.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
