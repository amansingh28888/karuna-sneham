"use client";

import { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Copy, Check, QrCode, Heart, ShieldCheck, Sparkles, Smartphone } from "lucide-react";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface DonationSectionProps {
  upiId?: string | null;
  whatsappNumber: string;
}

const presets = [
  { amount: 500, label: "Feeds 5 Children", desc: "Provides warm nutritious meals for 5 kids" },
  { amount: 1000, label: "Celebration Snacks & Cake", desc: "Covers cake & sweets for an afternoon party" },
  { amount: 2500, label: "Education & Meal Kit", desc: "Provides meals + notebook kits for 25 kids" },
  { amount: 5000, label: "Full Festival Feast", desc: "Full day festive meals & gifts for 50 kids" },
];

export default function DonationSection({ upiId, whatsappNumber }: DonationSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const effectiveUpi = upiId || "UJJ83981816501@Ujjivan";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const waMessage = `Hello Karuna Sneham Foundation, I would like to make a contribution of ₹${selectedAmount.toLocaleString(
    "en-IN"
  )} via UPI (${effectiveUpi}). Please share payment confirmation details.`;
  const waLink = buildWhatsAppLink(whatsappNumber, waMessage);

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Donation Tiers / Amount Selector */}
      <div className="rounded-3xl bg-surface p-6 sm:p-10 shadow-card border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
            <Heart className="h-5 w-5 fill-secondary" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-primary">
              Select Donation Contribution
            </h3>
            <p className="text-xs text-ink-soft">Every rupee goes directly toward food, cake, and essential care</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {presets.map((p) => {
            const isSelected = selectedAmount === p.amount;
            return (
              <button
                key={p.amount}
                onClick={() => setSelectedAmount(p.amount)}
                className={`relative flex flex-col justify-between rounded-2xl p-5 text-left transition-all ${
                  isSelected
                    ? "bg-primary text-white shadow-soft scale-105"
                    : "bg-background text-ink border border-primary/10 hover:border-primary/30"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 rounded-full bg-secondary p-1 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                <div>
                  <div className={`font-display text-2xl font-bold ${isSelected ? "text-secondary-light" : "text-primary"}`}>
                    ₹{p.amount.toLocaleString("en-IN")}
                  </div>
                  <div className={`mt-1 text-xs font-semibold ${isSelected ? "text-white/90" : "text-secondary"}`}>
                    {p.label}
                  </div>
                </div>
                <div className={`mt-3 text-xs leading-snug ${isSelected ? "text-white/70" : "text-ink-soft"}`}>
                  {p.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-primary/10">
          <div className="flex items-center gap-2 text-xs text-accent font-medium">
            <ShieldCheck className="h-4 w-4" /> 100% Direct Impact & Instant WhatsApp Proof
          </div>
          <div onClick={triggerConfetti}>
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Donate ₹{selectedAmount.toLocaleString("en-IN")} via WhatsApp
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Payment Options: QR Code & Copy UPI ID */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Column: Official Scan & Pay QR Poster */}
        <div className="lg:col-span-6 rounded-3xl bg-surface p-7 shadow-card border border-primary/10 flex flex-col items-center text-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1 text-xs font-bold text-secondary mb-3">
              <QrCode className="h-4 w-4" /> Official Scan & Pay QR
            </div>
            <h4 className="font-display text-xl font-bold text-primary">Scan QR with Any Payment App</h4>
            <p className="text-xs text-ink-soft mt-1">
              Supports Google Pay, PhonePe, Paytm, BHIM, Amazon Pay & WhatsApp Pay.
            </p>

            <div className="relative mt-6 mx-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 border-primary/10 bg-white p-2 shadow-warm">
              <Image
                src="/qr-code.jpeg"
                alt="Karuna Sneham Foundation Official Scan & Pay QR Code"
                width={400}
                height={580}
                className="w-full h-auto rounded-xl object-contain"
                priority
              />
            </div>
          </div>

          <p className="mt-4 text-xs font-semibold text-primary">
            Official Organization QR Code — Karuna Sneham Foundation
          </p>
        </div>

        {/* Right Column: Copy UPI ID & Mobile Apps Card */}
        <div className="lg:col-span-6 rounded-3xl bg-surface p-7 shadow-card border border-primary/10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-display text-lg font-bold">
                <Smartphone className="h-5 w-5 text-secondary" /> Direct UPI ID Payment
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold border border-emerald-200">
                Instant Transfer
              </span>
            </div>

            <p className="text-xs text-ink-soft leading-relaxed">
              If you prefer paying by entering the UPI ID directly in your payment app, copy our official UPI VPA below:
            </p>

            <div className="mt-5 rounded-2xl bg-background p-5 border border-primary/15 space-y-3">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider block">Official UPI VPA</span>
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-sm sm:text-base font-bold text-primary break-all">
                  {effectiveUpi}
                </code>
                <button
                  onClick={() => copyText(effectiveUpi)}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-light active:scale-95 shadow-soft"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy ID
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Supported payment icons badge */}
            <div className="mt-6 pt-5 border-t border-primary/10">
              <span className="text-xs font-semibold text-primary block mb-3">Compatible Payment Apps:</span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
                {["BHIM UPI", "Google Pay", "PhonePe", "Paytm", "Amazon Pay", "TimePay", "WhatsApp"].map((app) => (
                  <span key={app} className="rounded-lg bg-background px-3 py-1.5 border border-primary/10">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-secondary/10 p-4 border border-secondary/20 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-secondary shrink-0" />
            <p className="text-xs text-ink-soft leading-snug">
              After making your payment, send a quick screenshot on WhatsApp to receive your official digital acknowledgement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
