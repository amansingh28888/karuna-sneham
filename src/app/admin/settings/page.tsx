"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSiteSettingsAdmin, updateSiteSettings, uploadFile } from "@/lib/adminData";
import { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getSiteSettingsAdmin().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  }

  async function handleFounderPhoto(file: File) {
    setUploading(true);
    try {
      const url = await uploadFile(file, "site-assets", "team");
      set("founder_image_url", url);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    await updateSiteSettings(settings);
    setSaving(false);
    setSaved(true);
  }

  if (loading || !settings) {
    return <p className="text-sm text-ink-soft">Loading…</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <Section title="Contact & Organisation">
          <Row label="NGO Name"><input className="input" value={settings.ngo_name} onChange={(e) => set("ngo_name", e.target.value)} /></Row>
          <Row label="Tagline"><input className="input" value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} /></Row>
          <Row label="CIN"><input className="input" value={settings.cin ?? ""} onChange={(e) => set("cin", e.target.value)} /></Row>
          <Row label="Phone"><input className="input" value={settings.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></Row>
          <Row label="Email"><input className="input" value={settings.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Row>
          <Row label="Address"><textarea rows={2} className="input" value={settings.address ?? ""} onChange={(e) => set("address", e.target.value)} /></Row>
          <Row label="Google Maps Link"><input className="input" value={settings.map_link ?? ""} onChange={(e) => set("map_link", e.target.value)} /></Row>
        </Section>

        <Section title="WhatsApp Booking">
          <Row label="WhatsApp Number (with country code, digits only)">
            <input className="input" value={settings.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} />
          </Row>
          <Row label="Default Order Message">
            <textarea rows={2} className="input" value={settings.whatsapp_order_message} onChange={(e) => set("whatsapp_order_message", e.target.value)} />
          </Row>
        </Section>

        <Section title="Social Links">
          <Row label="Instagram"><input className="input" value={settings.instagram_link ?? ""} onChange={(e) => set("instagram_link", e.target.value)} /></Row>
          <Row label="Facebook"><input className="input" value={settings.facebook_link ?? ""} onChange={(e) => set("facebook_link", e.target.value)} /></Row>
          <Row label="YouTube"><input className="input" value={settings.youtube_link ?? ""} onChange={(e) => set("youtube_link", e.target.value)} /></Row>
        </Section>

        <Section title="Founder / Team">
          <Row label="Founder Name"><input className="input" value={settings.founder_name ?? ""} onChange={(e) => set("founder_name", e.target.value)} /></Row>
          <Row label="Founder Role"><input className="input" value={settings.founder_role ?? ""} onChange={(e) => set("founder_role", e.target.value)} /></Row>
          <Row label="Founder Bio"><textarea rows={5} className="input" value={settings.founder_bio ?? ""} onChange={(e) => set("founder_bio", e.target.value)} /></Row>
          <Row label="Founder Photo">
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFounderPhoto(e.target.files[0])} className="text-sm" />
            {uploading && <p className="text-xs text-ink-soft mt-1">Uploading…</p>}
          </Row>

          <hr className="my-6 border-primary/10" />

          <Row label="Co-founder Name"><input className="input" value={settings.co_founder_name ?? ""} onChange={(e) => set("co_founder_name", e.target.value)} /></Row>
          <Row label="Co-founder Role"><input className="input" value={settings.co_founder_role ?? ""} onChange={(e) => set("co_founder_role", e.target.value)} /></Row>
          <Row label="Co-founder Bio"><textarea rows={5} className="input" value={settings.co_founder_bio ?? ""} onChange={(e) => set("co_founder_bio", e.target.value)} /></Row>
          <Row label="Co-founder Photo">
            <input type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files?.[0]) {
                setUploading(true);
                try {
                  const url = await uploadFile(e.target.files[0], "site-assets", "team");
                  set("co_founder_image_url", url);
                } finally { setUploading(false); }
              }
            }} className="text-sm" />
          </Row>

          <hr className="my-6 border-primary/10" />

          <Row label="Director Name"><input className="input" value={settings.director_name ?? ""} onChange={(e) => set("director_name", e.target.value)} /></Row>
          <Row label="Director Role"><input className="input" value={settings.director_role ?? ""} onChange={(e) => set("director_role", e.target.value)} /></Row>
          <Row label="Director Bio"><textarea rows={5} className="input" value={settings.director_bio ?? ""} onChange={(e) => set("director_bio", e.target.value)} /></Row>
          <Row label="Director Photo">
            <input type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files?.[0]) {
                setUploading(true);
                try {
                  const url = await uploadFile(e.target.files[0], "site-assets", "team");
                  set("director_image_url", url);
                } finally { setUploading(false); }
              }
            }} className="text-sm" />
          </Row>

          <hr className="my-6 border-primary/10" />

          <Row label="Member Name"><input className="input" value={settings.member_name ?? ""} onChange={(e) => set("member_name", e.target.value)} /></Row>
          <Row label="Member Role"><input className="input" value={settings.member_role ?? ""} onChange={(e) => set("member_role", e.target.value)} /></Row>
          <Row label="Member Bio"><textarea rows={5} className="input" value={settings.member_bio ?? ""} onChange={(e) => set("member_bio", e.target.value)} /></Row>
          <Row label="Member Photo">
            <input type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files?.[0]) {
                setUploading(true);
                try {
                  const url = await uploadFile(e.target.files[0], "site-assets", "team");
                  set("member_image_url", url);
                } finally { setUploading(false); }
              }
            }} className="text-sm" />
          </Row>
        </Section>

        <Section title="Donation Details (optional — shown on the Donate page only if filled in)">
          <Row label="UPI ID"><input className="input" value={settings.upi_id ?? ""} onChange={(e) => set("upi_id", e.target.value)} /></Row>
          <Row label="Bank Details"><textarea rows={3} className="input" value={settings.bank_details ?? ""} onChange={(e) => set("bank_details", e.target.value)} /></Row>
        </Section>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-accent">Saved.</span>}
        </div>
      </form>

      <style jsx global>{`
        .input { width: 100%; border-radius: 0.5rem; border: 1px solid rgba(27,58,92,0.2); padding: 0.5rem 0.9rem; outline: none; }
        .input:focus { border-color: #1b3a5c; }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-surface p-6 shadow-warm">
      <h2 className="font-display text-lg text-primary mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      {children}
    </div>
  );
}
