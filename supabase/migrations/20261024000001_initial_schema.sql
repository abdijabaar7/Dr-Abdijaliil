-- ============================================================================
-- DR. ABDIJALII ABDIWAHAB ADAN - PRODUCTION DATABASE MIGRATION
-- Orthopedic Surgery Portfolio & Clinic Management System
-- ============================================================================

-- 1. Enable pgcrypto extension for UUID generation
create extension if not exists "pgcrypto";

-- 2. Doctor Admins Table (Authorized system administrators)
create table if not exists public.doctor_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- 3. Doctor Profile Table
create table if not exists public.doctor_profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Dr. Abdijalii Abdiwahab Adan',
  title text not null default 'Orthopedic & Trauma Surgeon',
  specialty text not null default 'Orthopedic Surgery',
  experience_years integer not null default 4 check (experience_years >= 0),
  location text not null default 'Mogadishu, Somalia',
  phone text default '+252 61 5000000',
  whatsapp_number text default '252615000000',
  email text default 'info@drabdijalii.so',
  working_hours text default 'Sat - Thu: 8:00 AM - 4:00 PM',
  biography text default 'Dr. Abdijalii Abdiwahab Adan is a dedicated Orthopedic Surgeon based in Mogadishu, Somalia. With over 4 years of focused surgical and clinical experience, he specializes in the diagnosis, non-surgical treatment, and surgical intervention of bone fractures, joint problems, sports injuries, and musculoskeletal conditions.',
  profile_image_path text default '/images/doctor/design-reference.jpg',
  updated_at timestamptz not null default now()
);

-- 4. Orthopedic Services Table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  full_content text,
  category text not null default 'Orthopedics',
  icon_name text default 'Activity',
  image_path text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. Appointments Table (Patient appointment requests)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null check (char_length(patient_name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 30),
  email text,
  appointment_date date not null,
  appointment_time time not null,
  reason text check (reason is null or char_length(reason) <= 500),
  service_id uuid references public.services(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  doctor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for filtering appointments by date and status
create index if not exists idx_appointments_date on public.appointments(appointment_date);
create index if not exists idx_appointments_status on public.appointments(status);

-- 6. Articles / Blog Table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text not null default 'Bone Health',
  read_time text default '4 min read',
  cover_image_path text,
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_articles_status on public.articles(status);
create index if not exists idx_articles_slug on public.articles(slug);

-- 7. Clinic Gallery Table
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text not null default 'Clinic',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 8. Verified Patient Testimonials Table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  location text default 'Mogadishu',
  rating integer not null default 5 check (rating between 1 and 5),
  treatment text not null,
  content text not null,
  is_verified boolean not null default true,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 9. FAQs Table
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'General',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 10. Contact Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 30),
  email text,
  subject text,
  message text not null check (char_length(message) between 5 and 2000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- HELPER FUNCTIONS FOR SECURITY & TIMESTAMP UPDATES
-- ============================================================================

-- Function to check if the current user is an authorized doctor admin
create or replace function public.is_doctor_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.doctor_admins
    where user_id = auth.uid()
  );
$$;

-- Function for automatic updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
drop trigger if exists set_doctor_profile_updated_at on public.doctor_profile;
create trigger set_doctor_profile_updated_at
before update on public.doctor_profile
for each row execute function public.handle_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.handle_updated_at();

drop trigger if exists set_appointments_updated_at on public.appointments;
create trigger set_appointments_updated_at
before update on public.appointments
for each row execute function public.handle_updated_at();

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at
before update on public.articles
for each row execute function public.handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

alter table public.doctor_admins enable row level security;
alter table public.doctor_profile enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.articles enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;

-- A. DOCTOR ADMINS TABLE POLICIES
-- Only existing doctor admins can view or modify doctor_admins
create policy "Doctor admins can view admin list"
  on public.doctor_admins for select
  to authenticated
  using (public.is_doctor_admin());

create policy "Doctor admins can add new admins"
  on public.doctor_admins for insert
  to authenticated
  with check (public.is_doctor_admin());

create policy "Doctor admins can delete admins"
  on public.doctor_admins for delete
  to authenticated
  using (public.is_doctor_admin());

-- B. DOCTOR PROFILE POLICIES
-- Public can read profile
create policy "Public can view doctor profile"
  on public.doctor_profile for select
  to anon, authenticated
  using (true);

-- Only doctor admin can update profile
create policy "Doctor admin can update doctor profile"
  on public.doctor_profile for update
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

create policy "Doctor admin can insert doctor profile"
  on public.doctor_profile for insert
  to authenticated
  with check (public.is_doctor_admin());

-- C. SERVICES POLICIES
-- Public can read published services
create policy "Public can view published services"
  on public.services for select
  to anon, authenticated
  using (is_published = true or public.is_doctor_admin());

create policy "Doctor admin can insert services"
  on public.services for insert
  to authenticated
  with check (public.is_doctor_admin());

create policy "Doctor admin can update services"
  on public.services for update
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

create policy "Doctor admin can delete services"
  on public.services for delete
  to authenticated
  using (public.is_doctor_admin());

-- D. APPOINTMENTS POLICIES (CRITICAL PRIVACY LAYER)
-- Public can only insert pending appointments for today or future dates
create policy "Public can submit appointment requests"
  on public.appointments for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and appointment_date >= current_date
  );

-- ONLY doctor admins can read patient appointments (protects patient identity)
create policy "Doctor admin can read appointments"
  on public.appointments for select
  to authenticated
  using (public.is_doctor_admin());

-- ONLY doctor admins can update appointment status or notes
create policy "Doctor admin can update appointments"
  on public.appointments for update
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

create policy "Doctor admin can delete appointments"
  on public.appointments for delete
  to authenticated
  using (public.is_doctor_admin());

-- E. ARTICLES POLICIES
create policy "Public can view published articles"
  on public.articles for select
  to anon, authenticated
  using (status = 'published' or public.is_doctor_admin());

create policy "Doctor admin can insert articles"
  on public.articles for insert
  to authenticated
  with check (public.is_doctor_admin());

create policy "Doctor admin can update articles"
  on public.articles for update
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

create policy "Doctor admin can delete articles"
  on public.articles for delete
  to authenticated
  using (public.is_doctor_admin());

-- F. GALLERY POLICIES
create policy "Public can view published gallery"
  on public.gallery for select
  to anon, authenticated
  using (is_published = true or public.is_doctor_admin());

create policy "Doctor admin can manage gallery"
  on public.gallery for all
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

-- G. TESTIMONIALS POLICIES
create policy "Public can view published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (is_published = true or public.is_doctor_admin());

create policy "Doctor admin can manage testimonials"
  on public.testimonials for all
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

-- H. FAQS POLICIES
create policy "Public can view published faqs"
  on public.faqs for select
  to anon, authenticated
  using (is_published = true or public.is_doctor_admin());

create policy "Doctor admin can manage faqs"
  on public.faqs for all
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

-- I. CONTACT MESSAGES POLICIES
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (is_read = false);

create policy "Doctor admin can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (public.is_doctor_admin());

create policy "Doctor admin can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (public.is_doctor_admin())
  with check (public.is_doctor_admin());

create policy "Doctor admin can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (public.is_doctor_admin());

