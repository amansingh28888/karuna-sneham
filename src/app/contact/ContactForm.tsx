"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import { submitContactMessage } from "@/lib/contactForm";
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, MessageSquare, FileText } from "lucide-react";

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
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/30 p-8 sm:p-10 text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-primary">Message Received — Thank You!</h3>
        <p className="text-sm text-ink-soft max-w-md mx-auto">
          We have received your message. Our foundation coordinator will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-semibold text-secondary hover:underline"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-surface p-7 sm:p-9 shadow-card border border-primary/10 space-y-4">
      <h3 className="font-display text-xl font-bold text-primary mb-2">Send Us a Direct Message</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-secondary" /> Full Name *
          </label>
          <input
            required
            placeholder="Aman Singh"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1">
            <Mail className="h-3.5 w-3.5 text-secondary" /> Email Address *
          </label>
          <input
            required
            type="email"
            placeholder="aman@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-secondary" /> Phone (Optional)
          </label>
          <input
            placeholder="+91 9296804691"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-secondary" /> Subject
          </label>
          <input
            placeholder="Celebration Booking Query"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5 text-secondary" /> Your Message *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Tell us about your celebration plans or any questions..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cta py-3.5 font-semibold text-white shadow-soft transition-all hover:bg-cta-hover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? "Sending Message..." : "Send Message"}
      </button>
    </form>
  );
}
