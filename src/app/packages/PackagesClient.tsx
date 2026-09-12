"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import QuickBookingModal from "@/components/QuickBookingModal";
import CTAButton from "@/components/CTAButton";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Package, SiteSettings } from "@/lib/types";
import { Sparkles, MessageCircle } from "lucide-react";

export default function PackagesClient({
  packages,
  settings,
}: {
  packages: Package[];
  settings: SiteSettings;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (pkgId: string) => {
    setSelectedPkgId(pkgId);
    setModalOpen(true);
  };

  const customWaMessage = "Hello Karuna Sneham Foundation, I have a custom celebration idea / budget that is not listed in the packages. Please let me know how we can organize it!";
  const customWaLink = buildWhatsAppLink(settings.whatsapp_number, customWaMessage);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        align="center"
        eyebrow="Celebration Packages"
        title="Sponsor Happiness on Your Terms"
        description="Every package supports a group of underprivileged children with freshly cooked meals, cake, or educational gifts — select the one that suits your milestone."
      />

      {/* Package Grid */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <PackageCard
            key={p.id}
            pkg={p}
            whatsappNumber={settings.whatsapp_number}
            onOpenBooking={handleOpenBooking}
          />
        ))}
      </div>

      {/* Custom Celebration Banner */}
      <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-8 text-white shadow-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-secondary-light backdrop-blur-md mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Have a Specific Budget or Custom Request?
          </span>
          <h3 className="font-display text-2xl font-bold">Custom Celebration Drives</h3>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            We can customize the meal menu, cake weight, stationery kits, or school supply gifts according to your exact budget or occasion preference.
          </p>
        </div>
        <CTAButton href={customWaLink} variant="whatsapp" icon={<WhatsAppIcon className="h-4 w-4" />}>
          Custom Enquiry on WhatsApp
        </CTAButton>
      </div>

      {/* Booking Modal */}
      <QuickBookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappNumber={settings.whatsapp_number}
        packages={packages}
        initialPackageId={selectedPkgId}
      />
    </div>
  );
}
