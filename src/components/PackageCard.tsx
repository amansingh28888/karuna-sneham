import Image from "next/image";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Package } from "@/lib/types";

export default function PackageCard({
  pkg,
  whatsappNumber,
}: {
  pkg: Package;
  whatsappNumber: string;
}) {
  const message = `Hello, I would like to book the "${pkg.name}" celebration package. Please share the next steps.`;
  const waLink = buildWhatsAppLink(whatsappNumber, message);

  return (
    <div className="flex flex-col overflow-hidden rounded-card bg-surface shadow-warm">
      {pkg.image_url && (
        <div className="relative h-44 w-full">
          <Image src={pkg.image_url} alt={pkg.name} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl text-primary">{pkg.name}</h3>
        <p className="mt-1 font-display text-2xl text-secondary">
          ₹{pkg.price.toLocaleString("en-IN")}
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">{pkg.description}</p>

        {pkg.features.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs font-semibold text-accent">
          Supports {pkg.children_supported} children
        </p>

        <div className="mt-6">
          <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-4 w-4" />} className="w-full">
            Choose Package
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
