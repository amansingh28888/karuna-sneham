"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-primary text-white lg:min-h-screen">
      <div className="px-6 py-6">
        <p className="font-display text-lg">Karuna Sneham</p>
        <p className="text-xs text-white/60">Admin Panel</p>
      </div>
      <nav className="px-3 space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              pathname === l.href ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-6 mt-6 border-t border-white/10">
        <p className="px-2 text-xs text-white/60 truncate">{user?.email}</p>
        <button
          onClick={async () => {
            await logout();
            router.push("/admin/login");
          }}
          className="mt-2 w-full rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
