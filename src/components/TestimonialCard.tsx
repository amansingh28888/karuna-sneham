import { Testimonial } from "@/lib/types";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-card bg-surface p-7 shadow-warm">
      <p className="text-4xl text-secondary/30 font-display leading-none">&ldquo;</p>
      <p className="mt-2 text-ink-soft leading-relaxed">{t.message}</p>
      <p className="mt-5 font-semibold text-primary">{t.name}</p>
      {t.occasion && <p className="text-xs text-ink-soft">{t.occasion}</p>}
    </div>
  );
}
