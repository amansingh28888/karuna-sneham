"use client";

import { useState } from "react";
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

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  const handleBook = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-surface p-6 sm:p-8 shadow-card border border-primary/10"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-2 text-ink-soft hover:bg-background hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">
                  Book Your Celebration
                </h3>
                <p className="text-xs text-ink-soft">
                  Personalize your event details & send via WhatsApp
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Sponsor Name */}
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-secondary" /> Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aman Singh"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">
                  Occasion Type
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
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
                <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-secondary" /> Preferred Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm text-ink focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              {/* Package Select */}
              {packages.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Select Package
                  </label>
                  <div className="space-y-2">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`flex items-center justify-between rounded-xl p-3 border cursor-pointer transition-all ${
                          selectedPkgId === pkg.id
                            ? "border-secondary bg-secondary/5 font-medium"
                            : "border-primary/10 bg-surface hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="package"
                            value={pkg.id}
                            checked={selectedPkgId === pkg.id}
                            onChange={() => setSelectedPkgId(pkg.id)}
                            className="accent-secondary"
                          />
                          <div>
                            <p className="text-sm text-primary">{pkg.name}</p>
                            <p className="text-xs text-ink-soft">
                              Supports {pkg.children_supported} children
                            </p>
                          </div>
                        </div>
                        <span className="font-display text-sm font-bold text-secondary">
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <div className="mt-6 pt-4 border-t border-primary/10 flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleBook();
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-whatsapp-hover hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Confirm & Order via WhatsApp
              </a>

              <p className="text-center text-[11px] text-ink-soft flex items-center justify-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-accent" /> No upfront online payment required. Confirmation handled directly.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
