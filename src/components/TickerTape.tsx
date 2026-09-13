"use client";

const items = [
  "🎉 480+ Children Supported",
  "✦ 74 Events Organized",
  "🍱 2,850+ Meals Distributed",
  "💚 WhatsApp Replies in < 5 mins",
  "📸 HD Photos Delivered Same Day",
  "🌟 100+ Happy Sponsors",
  "🎂 Custom Cakes Ordered Fresh",
  "🎁 Stationery Gift Kits Included",
  "🛡️ Registered Non-Profit NGO",
  "🎈 Birthdays · Anniversaries · Memorials",
];

export default function TickerTape() {
  // Duplicate for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-neon-cyan/20 bg-primary/95 py-3 select-none"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

      {/* Scrolling strip */}
      <div
        className="flex whitespace-nowrap animate-ticker"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-sm font-medium text-white/80"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-neon-cyan/60 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
