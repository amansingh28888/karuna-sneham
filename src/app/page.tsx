import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ImpactStats from "@/components/ImpactStats";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTAButton from "@/components/CTAButton";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
import ImpactCalculator from "@/components/ImpactCalculator";
import FAQSection from "@/components/FAQSection";
import ContactCards from "@/components/ContactCards";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ArrowRight } from "lucide-react";
import {
  getSiteSettings,
  getActivePackages,
  getPublishedTestimonials,
  getImpactStatistics,
} from "@/lib/data";

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
      {/* Hero */}
      <Hero settings={settings} />

      {/* About Preview + Live Impact Counters */}
      <section className="mx-auto max-w-6xl px-5 py-20 grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 space-y-4">
          <SectionHeading
            eyebrow="Who We Are"
            title="A Home for Smiles — Trusted NGO for Children's Welfare"
            description={`${settings.ngo_name} invites you to turn your special occasion — a birthday, an anniversary, or any personal milestone — into a day of sheer happiness for underprivileged children.`}
          />
          <p className="text-sm text-ink-soft leading-relaxed">
            We handle everything: from ordering fresh multi-tier cakes and nutritious warm meal packs to conducting interactive games and delivering video proof directly to your phone.
          </p>
          <div className="pt-2">
            <CTAButton href="/about" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              Read Our Founder&apos;s Story
            </CTAButton>
          </div>
        </div>
        <div className="lg:col-span-6">
          <ImpactStats stats={impact} />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksTimeline />

      {/* Impact Calculator */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <ImpactCalculator whatsappNumber={settings.whatsapp_number} />
      </section>

      {/* Packages */}
      {featuredPackages.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Celebration Packages"
              title="Donation Packages for Children — Choose How You'd Like to Give"
              description="Sponsor a party menu, cake, or educational kit bag tailored for underprivileged children through our NGO packages."
            />
            <CTAButton href="/packages" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              Explore All Packages
            </CTAButton>
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
        <section className="bg-surface py-20 border-y border-primary/5">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              align="center"
              eyebrow="Heartfelt Memories"
              title="In the Words of Our Sponsors"
              description="Read how families turn personal occasions into unforgettable days for children."
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection />

      {/* CTA Banner */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-slate-950 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-white/10 border border-white/15 px-4 py-1 text-xs font-semibold text-secondary-light backdrop-blur-md mb-5">
              Ready to Share Happiness?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl leading-tight">
              Turn Your Milestone into a Child&apos;s Smile
            </h2>
            <p className="mt-4 text-white/75 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Message us on WhatsApp with your date and preferred package — our team will manage every detail with complete transparency.
            </p>
            <div className="mt-9 flex justify-center">
              <CTAButton href={waLink} variant="whatsapp" icon={<WhatsAppIcon className="h-5 w-5" />}>
                Book Your Order on WhatsApp
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <SectionHeading align="center" eyebrow="Visit & Connect" title="Contact Our NGO in Varanasi — We'd Love to Hear From You" />
        <ContactCards
          phone={settings.phone}
          email={settings.email}
          address={settings.address}
        />
        <div className="mt-8 flex justify-center">
          <CTAButton href="/contact" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            Get in Touch
          </CTAButton>
        </div>
      </section>
    </>
  );
}
