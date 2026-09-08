import SectionHeading from "@/components/SectionHeading";
import ImpactStats from "@/components/ImpactStats";
import CTAButton from "@/components/CTAButton";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getSiteSettings, getImpactStatistics } from "@/lib/data";

export const metadata = { title: "Donate | Karuna Sneham Foundation" };

export default async function DonatePage() {
  const [settings, impact] = await Promise.all([getSiteSettings(), getImpactStatistics()]);
  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hello, I would like to know more about donating to Karuna Sneham Foundation."
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 space-y-14">
      <SectionHeading
        align="center"
        eyebrow="Donate"
        title="Every contribution becomes a child's smile"
        description="Your support — whether sponsoring a full celebration or contributing directly — helps us bring food, gifts, and joy to children who need it most."
      />

      <ImpactStats stats={impact} />

      <div className="rounded-card bg-surface p-8 shadow-warm sm:p-10">
        <h3 className="font-display text-xl text-primary mb-3">How Your Donation Helps</h3>
        <p className="text-ink-soft leading-relaxed">
          Donations go directly toward meals, celebration essentials, and everyday care for
          the children we work with. Every rupee is an act of shared celebration.
        </p>
      </div>

      {(settings.upi_id || settings.bank_details) && (
        <div className="grid gap-6 sm:grid-cols-2">
          {settings.upi_id && (
            <div className="rounded-card bg-surface p-6 shadow-warm">
              <p className="text-sm text-ink-soft">UPI ID</p>
              <p className="font-semibold text-primary">{settings.upi_id}</p>
            </div>
          )}
          {settings.bank_details && (
            <div className="rounded-card bg-surface p-6 shadow-warm whitespace-pre-line">
              <p className="text-sm text-ink-soft">Bank Details</p>
              <p className="font-semibold text-primary">{settings.bank_details}</p>
            </div>
          )}
        </div>
      )}

      <div className="rounded-card bg-primary p-8 text-center text-white shadow-warm sm:p-12">
        <h2 className="font-display text-2xl sm:text-3xl">Ready to give?</h2>
        <p className="mt-3 text-white/80 max-w-md mx-auto">
          Message us on WhatsApp and we&apos;ll guide you through the simplest way to donate.
        </p>
        <div className="mt-7 flex justify-center">
          <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
            Donate via WhatsApp
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
