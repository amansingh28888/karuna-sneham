"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm rounded-card bg-surface p-8 shadow-warm">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src="/logo-cropped.jpeg"
            alt="Karuna Sneham Foundation logo"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-contain mb-3"
          />
          <h1 className="font-display text-xl text-primary">Admin Login</h1>
          <p className="text-sm text-ink-soft mt-1">Karuna Sneham Foundation</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mb-4 rounded-lg bg-secondary/10 border border-secondary/30 p-3 text-xs text-secondary-dark">
            Supabase isn&apos;t configured yet. Add your project keys to <code>.env.local</code>
            (see README.md) before logging in.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-primary/20 px-4 py-2.5 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-primary/20 px-4 py-2.5 focus:border-primary outline-none"
            />
          </div>

          {error && <p className="text-sm text-secondary-dark bg-secondary/10 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:bg-primary-light disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
