"use client";

import { FormEvent, useState } from "react";
import { submitContactMessage } from "@/lib/contactForm";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitContactMessage(form);
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card bg-accent/10 border border-accent/30 p-8 text-center">
        <p className="font-display text-lg text-primary">Message sent — thank you!</p>
        <p className="mt-2 text-sm text-ink-soft">We&apos;ll get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-secondary hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-card bg-surface p-7 shadow-warm space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-primary/20 px-4 py-2.5 outline-none focus:border-primary"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-primary/20 px-4 py-2.5 outline-none focus:border-primary"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-lg border border-primary/20 px-4 py-2.5 outline-none focus:border-primary"
        />
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="rounded-lg border border-primary/20 px-4 py-2.5 outline-none focus:border-primary"
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-primary/20 px-4 py-2.5 outline-none focus:border-primary"
      />

      {status === "error" && (
        <p className="text-sm text-secondary-dark bg-secondary/10 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-cta py-3 font-semibold text-white hover:bg-cta-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
