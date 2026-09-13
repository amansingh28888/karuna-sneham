"use client";

import { Phone, Mail, MapPin } from "lucide-react";

const contactItems = [
  { icon: Phone,  label: "Direct Phone",   key: "phone",   iconBg: "bg-rose-50 text-rose-500 border-rose-100" },
  { icon: Mail,   label: "Email Support",  key: "email",   iconBg: "bg-sky-50 text-sky-500 border-sky-100" },
  { icon: MapPin, label: "Centre Address", key: "address", iconBg: "bg-violet-50 text-violet-500 border-violet-100", small: true },
] as const;

export default function ContactCards({
  phone,
  email,
  address,
}: {
  phone: string;
  email: string;
  address: string;
}) {
  const values: Record<string, string> = { phone, email, address };

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3 text-center">
      {contactItems.map(({ icon: Icon, label, key, iconBg, small }) => (
        <div
          key={key}
          className="group rounded-2xl bg-surface p-7 border border-primary/8 flex flex-col items-center transition-all duration-300 shadow-warm hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20"
        >
          <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold text-ink-soft">{label}</p>
          <p className={`font-display font-bold text-primary mt-1 ${small ? "text-xs" : "text-base"} line-clamp-2`}>
            {values[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
