import SectionHeading from "@/components/SectionHeading";
import ContactForm from "./ContactForm";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Contact | Karuna Sneham Foundation" };

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapSrc = settings.map_link
    ? `https://www.google.com/maps?q=${encodeURIComponent(settings.address ?? "")}&output=embed`
    : undefined;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        align="center"
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        description="Questions about a celebration, a donation, or anything else — reach out any way that's convenient."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-card bg-surface p-6 shadow-warm">
            <p className="text-sm text-ink-soft">Organisation</p>
            <p className="font-semibold text-primary">{settings.ngo_name}</p>
          </div>
          {settings.phone && (
            <div className="rounded-card bg-surface p-6 shadow-warm">
              <p className="text-sm text-ink-soft">Phone</p>
              <p className="font-semibold text-primary">{settings.phone}</p>
            </div>
          )}
          {settings.email && (
            <div className="rounded-card bg-surface p-6 shadow-warm">
              <p className="text-sm text-ink-soft">Email</p>
              <p className="font-semibold text-primary">{settings.email}</p>
            </div>
          )}
          {settings.address && (
            <div className="rounded-card bg-surface p-6 shadow-warm">
              <p className="text-sm text-ink-soft">Address</p>
              <p className="font-semibold text-primary">{settings.address}</p>
            </div>
          )}
          {settings.map_link && (
            <a
              href={settings.map_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-card bg-surface p-6 shadow-warm text-primary font-semibold hover:underline"
            >
              Open in Google Maps →
            </a>
          )}
        </div>

        <ContactForm />
      </div>

      {mapSrc && (
        <div className="mt-10 overflow-hidden rounded-card shadow-warm">
          <iframe src={mapSrc} title="Location" className="h-80 w-full" loading="lazy" />
        </div>
      )}
    </div>
  );
}
