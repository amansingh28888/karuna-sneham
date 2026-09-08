"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

function Guard({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user) {
      router.replace("/admin/login");
    } else if (!isAdmin) {
      // Signed in but not one of the two admin accounts — sign out.
      logout().then(() => router.replace("/admin/login"));
    }
  }, [loading, user, isAdmin, isLoginPage, router, logout]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-soft">
        Checking your session…
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 bg-background min-h-screen p-6 lg:p-10">{children}</div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Guard>{children}</Guard>
    </AuthProvider>
  );
}
