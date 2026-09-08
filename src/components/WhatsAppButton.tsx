"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton({
  number,
  message,
}: {
  number: string;
  message: string;
}) {
  return (
    <a
      href={buildWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a celebration on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-warm transition-transform hover:scale-105 md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.24.62 4.42 1.8 6.32L4 29l7.83-1.75a12.9 12.9 0 0 0 4.19.7h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.9c-1.35 0-2.68-.34-3.85-.99l-.28-.16-4.65 1.04 1.06-4.53-.18-.29a9.86 9.86 0 0 1-1.53-5.35c0-5.47 4.45-9.92 9.94-9.92 2.65 0 5.14 1.04 7.02 2.92a9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.27-9.93 9.27zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}
