import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import { getActivePackages, getSiteSettings } from "@/lib/data";

export const metadata = { title: "Packages | Karuna Sneham Foundation" };

export default async function PackagesPage() {
  const [packages, settings] = await Promise.all([getActivePackages(), getSiteSettings()]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        align="center"
        eyebrow="Celebration packages"
        title="Choose how you'd like to give"
        description="Every package supports a group of children with food, cake, or gifts — pick the one that fits your celebration."
      />

      {packages.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} whatsappNumber={settings.whatsapp_number} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-ink-soft">
          Packages are being finalised — check back soon, or message us on WhatsApp for current options.
        </p>
      )}
    </div>
  );
}
