import SectionHeading from "@/components/SectionHeading";
import ImpactStats from "@/components/ImpactStats";
import DonationSection from "@/components/DonationSection";
import CTAButton from "@/components/CTAButton";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getSiteSettings, getImpactStatistics } from "@/lib/data";
import { ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Donate & Support | Donate to NGO for Children",
  description: "Make an online NGO donation to Karuna Sneham Foundation. Support child education, sponsor meals, and help underprivileged children have a brighter future.",
};

export default async function DonatePage() {
  const [settings, impact] = await Promise.all([getSiteSettings(), getImpactStatistics()]);
  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hello Karuna Sneham Foundation, I would like to make a contribution / donation. Please guide me."
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 space-y-16">
      <SectionHeading
        align="center"
        eyebrow="Donate & Support"
        title="Every Contribution Becomes a Child's Smile"
        description="Your support — whether sponsoring a full celebration package or contributing any amount — directly funds nutritious food, celebration cakes, and educational gifts for children."
      />

      <ImpactStats stats={impact} />

      {/* Interactive Donation Section */}
      <DonationSection
        upiId={settings.upi_id}
        whatsappNumber={settings.whatsapp_number}
      />

      {/* Transparency & Impact Breakdown */}
      <div className="rounded-3xl bg-surface p-8 sm:p-10 shadow-card border border-primary/10 grid gap-8 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 mb-3">
            <Heart className="h-5 w-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-primary">100% Direct Impact</h4>
          <p className="text-xs text-ink-soft leading-relaxed">
            Every rupee contributed goes straight to meal preparation, celebration cakes, and child welfare items.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-3">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-primary">Verified Media Proof</h4>
          <p className="text-xs text-ink-soft leading-relaxed">
            Receive full HD photo and video clips on your WhatsApp after every celebration drive hosted.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 mb-3">
            <Sparkles className="h-5 w-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-primary">Registered Non-Profit</h4>
          <p className="text-xs text-ink-soft leading-relaxed">
            Official incorporation under CIN U88900UP2026NPL250077 ensuring complete auditability and governance.
          </p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-8 sm:p-12 text-center text-white shadow-2xl border border-white/10">
        <h2 className="font-display text-2xl sm:text-4xl">Have Questions About Donating?</h2>
        <p className="mt-3 text-white/80 max-w-md mx-auto text-sm sm:text-base">
          Connect directly with our organization coordinator on WhatsApp for custom sponsorships, offline donations, or queries.
        </p>
        <div className="mt-7 flex justify-center">
          <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
            Connect on WhatsApp
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
