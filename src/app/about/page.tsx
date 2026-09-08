import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "About Us | Karuna Sneham Foundation" };

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 space-y-16">
      <SectionHeading
        eyebrow="About us"
        title="Every child deserves a reason to smile"
        description={`${settings.ngo_name} was founded on a simple belief: that joy shouldn't be a privilege. We work directly with underprivileged children, turning personal milestones — like your birthday or anniversary — into shared moments of celebration and care.`}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card shadow-warm">
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop"
          alt="Children at a Karuna Sneham Foundation gathering"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="rounded-card bg-surface p-8 shadow-warm">
          <h3 className="font-display text-xl text-secondary mb-3">Our Mission</h3>
          <p className="text-ink-soft leading-relaxed">
            To bring warmth, celebration, and everyday joy into the lives of underprivileged
            children, by turning personal milestones into shared moments of happiness.
          </p>
        </div>
        <div className="rounded-card bg-surface p-8 shadow-warm">
          <h3 className="font-display text-xl text-secondary mb-3">Our Vision</h3>
          <p className="text-ink-soft leading-relaxed">
            A world where no child's birthday, festival, or milestone passes unmarked —
            where celebration is a right, not a luxury.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl text-primary mb-4">Our Objectives</h3>
        <ul className="space-y-3 text-ink-soft leading-relaxed list-disc pl-5">
          <li>Host birthday, anniversary, and festival celebrations sponsored by families like yours.</li>
          <li>Distribute meals, cakes, and gifts to underprivileged children.</li>
          <li>Build lasting relationships between sponsors and the communities we serve.</li>
          <li>Document and share every celebration, so its joy reaches beyond the day itself.</li>
        </ul>
      </div>

      {settings.founder_name && (
        <div className="rounded-card bg-primary p-8 text-white shadow-warm sm:p-10">
          <h3 className="font-display text-2xl mb-4">Meet Our Founder</h3>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {settings.founder_image_url && (
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full">
                <Image src={settings.founder_image_url} alt={settings.founder_name} fill className="object-cover" />
              </div>
            )}
            <div>
              <p className="font-display text-lg">{settings.founder_name}</p>
              {settings.founder_role && <p className="text-sm text-white/70 mb-3">{settings.founder_role}</p>}
              <p className="text-white/85 leading-relaxed whitespace-pre-line">{settings.founder_bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
