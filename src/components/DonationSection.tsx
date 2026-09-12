"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Copy, Check, QrCode, Building2, Heart, ShieldCheck, Sparkles } from "lucide-react";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface DonationSectionProps {
  upiId?: string | null;
  bankDetails?: string | null;
  whatsappNumber: string;
}

const presets = [
  { amount: 500, label: "Feeds 5 Children", desc: "Provides warm nutritious meals for 5 kids" },
  { amount: 1000, label: "Celebration Snacks & Cake", desc: "Covers cake & sweets for an afternoon party" },
  { amount: 2500, label: "Education & Meal Kit", desc: "Provides meals + notebook kits for 25 kids" },
  { amount: 5000, label: "Full Festival Feast", desc: "Full day festive meals & gifts for 50 kids" },
];

export default function DonationSection({ upiId, bankDetails, whatsappNumber }: DonationSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const effectiveUpi = upiId || "karunasneham@upi";

  const copyText = (text: string, isUpi: boolean) => {
    navigator.clipboard.writeText(text);
    if (isUpi) {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } else {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const waMessage = `Hello, I would like to make a donation of ₹${selectedAmount.toLocaleString(
    "en-IN"
  )} to Karuna Sneham Foundation. Please guide me with payment verification.`;
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
            <ShieldCheck className="h-4 w-4" /> 100% Transparent Impact & Instant WhatsApp Proof
          </div>
          <div onClick={triggerConfetti}>
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Donate ₹{selectedAmount.toLocaleString("en-IN")} via WhatsApp
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Payment Channels Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {/* UPI Payment Card */}
        <div className="rounded-card bg-surface p-7 shadow-warm border border-primary/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-display text-lg font-semibold">
                <QrCode className="h-5 w-5 text-secondary" /> Direct UPI Transfer
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-200">
                Instant Transfer
              </span>
            </div>

            <p className="text-xs text-ink-soft mb-4">
              Copy our official UPI ID to pay using GPay, PhonePe, Paytm, or BHIM.
            </p>

            <div className="flex items-center justify-between rounded-xl bg-background p-3.5 border border-primary/15">
              <code className="font-mono text-sm font-semibold text-primary">{effectiveUpi}</code>
              <button
                onClick={() => copyText(effectiveUpi, true)}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-light"
              >
                {copiedUpi ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy ID
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-primary/5 text-center">
            <span className="text-xs text-ink-soft">Works with Google Pay, PhonePe, Paytm & BHIM</span>
          </div>
        </div>

        {/* Bank Account Details Card */}
        <div className="rounded-card bg-surface p-7 shadow-warm border border-primary/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-display text-lg font-semibold">
                <Building2 className="h-5 w-5 text-secondary" /> Bank Account Transfer
              </div>
              <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold border border-blue-200">
                NEFT / RTGS / IMPS
              </span>
            </div>

            <p className="text-xs text-ink-soft mb-4">
              For direct bank wire transfers from Indian bank accounts.
            </p>

            <div className="rounded-xl bg-background p-4 border border-primary/15 text-xs space-y-1.5 font-mono text-ink">
              {bankDetails ? (
                <div className="whitespace-pre-line leading-relaxed text-ink font-semibold">{bankDetails}</div>
              ) : (
                <>
                  <p><span className="text-ink-soft">Account Name:</span> Karuna Sneham Foundation</p>
                  <p><span className="text-ink-soft">Bank Name:</span> State Bank of India</p>
                  <p><span className="text-ink-soft">A/C Number:</span> 40912839102</p>
                  <p><span className="text-ink-soft">IFSC Code:</span> SBIN0001234</p>
                  <p><span className="text-ink-soft">Branch:</span> Varanasi Main</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-primary/5 flex items-center justify-between">
            <span className="text-xs text-ink-soft">Official Organization Account</span>
            <button
              onClick={() => copyText(bankDetails || "Karuna Sneham Foundation SBI A/C 40912839102 IFSC SBIN0001234", false)}
              className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
            >
              {copiedBank ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedBank ? "Details Copied!" : "Copy Bank Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
