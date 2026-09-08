import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ImpactStats from "@/components/ImpactStats";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTAButton from "@/components/CTAButton";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  getSiteSettings,
  getActivePackages,
  getPublishedTestimonials,
  getImpactStatistics,
} from "@/lib/data";

const steps = [
  { title: "Choose your occasion", body: "Birthday, anniversary, wedding, or any special day worth celebrating." },
  { title: "Select a package", body: "Pick a celebration package that fits your budget and the impact you want to make." },
  { title: "Message us on WhatsApp", body: "Tell us your date and package — we'll confirm every detail with you directly." },
  { title: "We organise the celebration", body: "Our team hosts the celebration with children at our centre." },
  { title: "Receive photos & videos", body: "We share memories from the day, and add them to our gallery with your permission." },
];

export default async function HomePage() {
  const [settings, packages, testimonials, impact] = await Promise.all([
    getSiteSettings(),
    getActivePackages(),
    getPublishedTestimonials(),
    getImpactStatistics(),
  ]);
  const waLink = buildWhatsAppLink(settings.whatsapp_number, settings.whatsapp_order_message);
  const featuredPackages = packages.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <Hero settings={settings} />

      {/* About preview + impact */}
      <section className="mx-auto max-w-6xl px-5 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Who we are"
          title="A home for smiles, built one celebration at a time"
          description={`${settings.ngo_name} invites you to turn your special occasion — a birthday, an anniversary, any milestone — into a day of happiness for underprivileged children.`}
        />
        <ImpactStats stats={impact} />
      </section>

      {/* How it works */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading align="center" eyebrow="How it works" title="From your idea to a child's smile" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-card bg-background p-6 shadow-warm">
                <span className="font-display text-2xl text-secondary/60">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages preview */}
      {featuredPackages.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <SectionHeading eyebrow="Celebration packages" title="Choose how you'd like to give" />
            <CTAButton href="/packages" variant="secondary">View all packages</CTAButton>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map((p) => (
              <PackageCard key={p.id} pkg={p} whatsappNumber={settings.whatsapp_number} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading align="center" eyebrow="In their words" title="Families who've celebrated with us" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="rounded-card bg-primary px-8 py-14 text-center text-white shadow-warm sm:px-16">
          <h2 className="font-display text-3xl sm:text-4xl">
            Turn your special day into a child&apos;s smile
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Message us on WhatsApp with your occasion and preferred package — we&apos;ll take care of the rest.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
              Book Your Order on WhatsApp
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Contact preview */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <SectionHeading align="center" eyebrow="Visit or reach us" title="We'd love to hear from you" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3 text-center">
          <div className="rounded-card bg-surface p-6 shadow-warm">
            <p className="text-sm text-ink-soft">Phone</p>
            <p className="font-semibold text-primary">{settings.phone}</p>
          </div>
          <div className="rounded-card bg-surface p-6 shadow-warm">
            <p className="text-sm text-ink-soft">Email</p>
            <p className="font-semibold text-primary">{settings.email}</p>
          </div>
          <div className="rounded-card bg-surface p-6 shadow-warm">
            <p className="text-sm text-ink-soft">Address</p>
            <p className="font-semibold text-primary">{settings.address}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/contact" variant="secondary">Get in touch</CTAButton>
        </div>
      </section>
    </>
  );
}
