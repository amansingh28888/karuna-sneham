-- ============================================================================
-- Karuna Sneham Foundation — Supabase schema, RLS policies, storage buckets
-- Run this in Supabase Dashboard → SQL Editor (or `supabase db push`)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PROFILES  (extends auth.users; only the 2 admins will ever have a row)
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Admins can read their own profile row (used by the app to confirm admin status)
create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid() = id);

-- Helper function: is the current user an admin? (security definer avoids
-- recursive-RLS issues when other policies check this)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ----------------------------------------------------------------------------
-- 2. PACKAGES  (celebration packages — populated from your catalog)
-- ----------------------------------------------------------------------------
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  description text not null,
  features text[] not null default '{}',
  children_supported int not null default 0,
  image_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.packages enable row level security;

create policy "packages: public read active"
  on public.packages for select
  using (active = true or public.is_admin());

create policy "packages: admin write"
  on public.packages for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 3. GALLERY  (photos + videos — starts empty, admin uploads via portal)
-- ----------------------------------------------------------------------------
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,       -- path inside the `gallery` storage bucket
  event_date date,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.gallery enable row level security;

create policy "gallery: public read published"
  on public.gallery for select
  using (published = true or public.is_admin());

create policy "gallery: admin write"
  on public.gallery for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 4. TESTIMONIALS  (added so these are admin-manageable, not hardcoded)
-- ----------------------------------------------------------------------------
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  occasion text,
  message text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "testimonials: public read published"
  on public.testimonials for select
  using (published = true or public.is_admin());

create policy "testimonials: admin write"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 5. IMPACT STATISTICS  (single row, editable from admin dashboard)
-- ----------------------------------------------------------------------------
create table public.impact_statistics (
  id int primary key default 1 check (id = 1),  -- enforces a single row
  children_supported int not null default 0,
  events_organized int not null default 0,
  meals_distributed int not null default 0,
  volunteers int not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.impact_statistics (id) values (1);

alter table public.impact_statistics enable row level security;

create policy "impact_statistics: public read"
  on public.impact_statistics for select
  using (true);

create policy "impact_statistics: admin write"
  on public.impact_statistics for update
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6. CONTACT MESSAGES  (public can submit, only admins can read)
-- ----------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "contact_messages: public insert"
  on public.contact_messages for insert
  with check (true);

create policy "contact_messages: admin read"
  on public.contact_messages for select
  using (public.is_admin());

create policy "contact_messages: admin update"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "contact_messages: admin delete"
  on public.contact_messages for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- 7. SITE SETTINGS  (single row — WhatsApp number, contact info, founder bio,
--    social links — all editable from the admin panel, nothing hardcoded)
-- ----------------------------------------------------------------------------
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  ngo_name text not null default 'Karuna Sneham Foundation',
  tagline text not null default 'Saving a smile, building a better tomorrow',
  cin text,
  founded_date date,
  phone text,
  email text,
  address text,
  map_link text,
  whatsapp_number text not null,          -- E.164, no leading +
  whatsapp_order_message text not null default 'Hello, I would like to book a celebration package for children through Karuna Sneham Foundation. Please share the available packages and details.',
  instagram_link text,
  facebook_link text,
  youtube_link text,
  founder_name text,
  founder_role text,
  founder_bio text,
  founder_image_url text,
  upi_id text,               -- fill in later from admin > Settings if you want it shown
  bank_details text,         -- fill in later from admin > Settings if you want it shown
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "site_settings: public read"
  on public.site_settings for select
  using (true);

create policy "site_settings: admin write"
  on public.site_settings for update
  using (public.is_admin())
  with check (public.is_admin());

-- Seed with the details already provided. Edit the WhatsApp number if
-- 9296804691 is not the right one to receive orders on.
insert into public.site_settings (
  id, ngo_name, tagline, cin, founded_date, phone, email, address, map_link,
  whatsapp_number, instagram_link, upi_id, bank_details,
  founder_name, founder_role, founder_bio
) values (
  1,
  'Karuna Sneham Foundation',
  'Saving a smile, building a better tomorrow',
  'U88900UP2026NPL250077',
  '2026-07-14',
  '+91 9296804691',
  'karunasneham.ngo@gmail.com',
  'B25, Badri Nagar Colony, Varanasi, Nathupur, Bhulanpur Pac, Varanasi, Varanasi, Uttar Pradesh, India, 221108',
  'https://share.google/Y1c8ioOVTg6BjOcnW',
  '919296804691',
  'https://www.instagram.com/karunasneham.ngo',
  'UJJ83981816501@Ujjivan',
  null,
  'Aman Singh',
  'Founder, Karuna Sneham Foundation',
  'Aman Singh is the founder of Karuna Sneham Foundation, driven by a passion for creating meaningful social impact and bringing happiness to underprivileged children and communities. Alongside his work with the foundation, Aman is pursuing an MBA in Business Analytics at Chandigarh University, where he is developing his expertise in data analytics, business strategy, technology, and problem-solving. He believes that meaningful change happens when compassion is combined with action. Through Karuna Sneham Foundation, he aims to create opportunities for individuals to turn their special moments — such as birthdays and anniversaries — into moments of happiness for children in need. "A celebration becomes more meaningful when it brings a smile to someone who needs it."'
);

-- ----------------------------------------------------------------------------
-- 8. STORAGE BUCKETS
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('gallery', 'gallery', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- gallery bucket: folders gallery/images/... and gallery/videos/...
-- site-assets bucket: folders logo/, packages/, team/  (founder photo, package images)

create policy "gallery bucket: public read"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "gallery bucket: admin write"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery bucket: admin update"
  on storage.objects for update
  using (bucket_id = 'gallery' and public.is_admin());

create policy "gallery bucket: admin delete"
  on storage.objects for delete
  using (bucket_id = 'gallery' and public.is_admin());

create policy "site-assets bucket: public read"
  on storage.objects for select
  using (bucket_id = 'site-assets');

create policy "site-assets bucket: admin write"
  on storage.objects for insert
  with check (bucket_id = 'site-assets' and public.is_admin());

create policy "site-assets bucket: admin update"
  on storage.objects for update
  using (bucket_id = 'site-assets' and public.is_admin());

create policy "site-assets bucket: admin delete"
  on storage.objects for delete
  using (bucket_id = 'site-assets' and public.is_admin());

-- ----------------------------------------------------------------------------
-- 9. AFTER RUNNING THIS FILE — create the 2 admin accounts:
--    Supabase Dashboard → Authentication → Users → Add user, for:
--      amansingh28888@gmail.com
--      poonamsmaurya1@gmail.com
--    Then run, once per admin, replacing the UUID with their auth.users id:
--
--    insert into public.profiles (id, full_name, role) values
--      ('<aman-auth-uid>', 'Aman Singh', 'admin');
-- ============================================================================
