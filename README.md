# Karuna Sneham Foundation — Website (Next.js + Supabase)

Public site (Home, About, Packages, Gallery, Donate, Contact) plus a secure
admin CMS, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and
Supabase (Auth, Postgres, Storage).

## 1. Quick start

```bash
npm install
npm run dev
```

The public site runs immediately at http://localhost:3000, using the real
organisation details you provided (name, address, WhatsApp number, founder
bio) as a fallback until Supabase is connected — packages, gallery, and
testimonials will show empty states until then, since none of that content
should be faked.

## 2. Connect Supabase

1. Create a project at https://supabase.com/dashboard.
2. In the SQL Editor, run **`schema.sql`** from this repo — it creates every
   table, RLS policy, and storage bucket, and seeds `site_settings` with the
   details you already gave me (address, phone, email, WhatsApp number,
   founder bio, CIN).
3. In Project Settings → API, copy the Project URL and `anon` public key
   into `.env.local` (copy `.env.local.example` first). Leave
   `SUPABASE_SERVICE_ROLE_KEY` blank unless you later add server-side admin
   scripts — it's never used by the app itself and must never reach the
   browser.
4. In Authentication → Users, add your two admins:
   - `amansingh28888@gmail.com`
   - `poonamsmaurya1@gmail.com`
   (Set a temporary password for each — they can change it after first login.)
5. For each admin, copy their generated user UUID (Authentication → Users →
   click the user) and run in the SQL Editor:
   ```sql
   insert into public.profiles (id, full_name, role) values
     ('<their-auth-uid>', 'Aman Singh', 'admin');
   ```
   Repeat for Poonam. Only rows in `profiles` with `role = 'admin'` can
   access `/admin` — creating an auth user alone is not enough.
6. Restart `npm run dev`. Log in at `/admin/login`.

## 3. Add your packages

Your catalog wasn't attached yet — once you share it, go to
**Admin → Packages → Add Package** and enter each one (name, price,
description, features, children supported, photo). Nothing is hardcoded, so
you can add, edit, deactivate, or reorder packages any time without a
redeploy.

## 4. Add your gallery content

As requested, no placeholder photos or videos are seeded — the Gallery page
starts empty. Upload real photos/videos from **Admin → Gallery**.

## 5. Database schema (see `schema.sql` for full detail)

```
profiles              — id (auth.users), full_name, role ('admin')
packages              — name, price, description, features[], children_supported,
                         image_url, sort_order, active
gallery               — title, description, media_type ('image'|'video'),
                         storage_path, event_date, published
testimonials          — name, occasion, message, published
impact_statistics     — single row: children_supported, events_organized,
                         meals_distributed, volunteers
contact_messages      — name, email, phone, subject, message, is_read
site_settings         — single row: all contact info, WhatsApp number/message,
                         social links, founder bio, optional UPI/bank details
```

## 6. Security

- Row Level Security is enabled on every table. Public visitors can only
  `SELECT` published/active rows (and `INSERT` into `contact_messages`).
  Every write requires `public.is_admin()` to return true, which checks the
  signed-in user against the `profiles` table.
- Storage buckets `gallery` and `site-assets` are public-read, admin-write
  only, with upload policies restricted to admins and (for gallery) a file
  size/type check.
- `SUPABASE_SERVICE_ROLE_KEY` is never imported anywhere in `src/` — only
  the public anon key is used, protected by RLS.

## 7. Booking flow (as requested)

There is **no online request form or payment gateway**. "Choose Package"
and "Book Your Order" buttons open WhatsApp with a pre-filled message —
configurable from **Admin → Settings** (number and default message), so
nothing is hardcoded in the UI. The Donate page follows the same pattern;
if you later decide on a UPI ID or bank details, add them in
**Admin → Settings → Donation Details** and they'll appear on the Donate
page automatically.

## 8. Deployment

Standard Next.js app — deploy to Vercel or any Node host. Set the same
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars in your
hosting provider's dashboard.

## 9. Color system & fonts

Same as the earlier Firebase version — derived from your logo: navy
`#1B3A5C` (primary), rose `#E1638A` (secondary/CTA), leaf green `#6E8B3D`
(accent), warm cream `#FDF8F4` background. Fraunces (headings) + Karla
(body). `public/logo-cropped.jpeg` is your logo with the phone-screenshot
chrome removed — swap in an official transparent PNG when you have one.
