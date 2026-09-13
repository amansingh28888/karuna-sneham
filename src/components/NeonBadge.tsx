import { ReactNode } from "react";

type NeonVariant = "cyan" | "violet" | "rose" | "green";

const variantStyles: Record<NeonVariant, string> = {
  cyan:   "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 shadow-[0_0_12px_rgba(0,245,255,0.3)]",
  violet: "bg-neon-violet/10 text-neon-violet border-neon-violet/30 shadow-[0_0_12px_rgba(191,95,255,0.3)]",
  rose:   "bg-neon-rose/10 text-neon-rose border-neon-rose/30 shadow-[0_0_12px_rgba(255,45,120,0.3)]",
  green:  "bg-neon-green/10 text-neon-green border-neon-green/30 shadow-[0_0_12px_rgba(57,255,20,0.3)]",
};

export default function NeonBadge({
  children,
  variant = "cyan",
  className = "",
  pulse = false,
}: {
  children: ReactNode;
  variant?: NeonVariant;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm
        ${variantStyles[variant]}
        ${pulse ? "animate-neon-pulse" : ""}
        ${className}`}
    >
      {children}
    </span>
  );
}
