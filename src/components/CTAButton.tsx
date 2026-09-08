import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp";

const styles: Record<Variant, string> = {
  primary:
    "bg-cta text-white hover:bg-cta-hover shadow-soft",
  secondary:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-hover shadow-soft",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-base transition-colors duration-200 ${styles[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
