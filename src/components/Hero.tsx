import Image from "next/image";
import CTAButton from "./CTAButton";
import { WhatsAppIcon } from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SiteSettings } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const waLink = buildWhatsAppLink(settings.whatsapp_number, settings.whatsapp_order_message);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:pt-20 lg:pb-24">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Image
              src="/logo-cropped.jpeg"
              alt="Karuna Sneham Foundation logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-contain shadow-warm"
            />
            <span className="text-sm font-semibold text-accent">{settings.ngo_name}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-primary">
            Your special day can be
            <span className="text-secondary"> a child&apos;s best day.</span>
          </h1>

          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-lg">
            Celebrate a birthday, anniversary, or any occasion by sponsoring food, cake,
            or gifts for underprivileged children — with us handling the celebration itself.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book Your Order on WhatsApp
            </CTAButton>
            <CTAButton href="/packages" variant="secondary">
              View Packages
            </CTAButton>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-warm">
            <Image
              src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1200&auto=format&fit=crop"
              alt="Children celebrating together"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
