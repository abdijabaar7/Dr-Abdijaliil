-- ============================================================================
-- DR. ABDIJALII ABDIWAHAB ADAN - SUPABASE COMPLETE DATABASE SETUP
-- RUN THIS ENTIRE SCRIPT IN SUPABASE SQL EDITOR
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

-- Helper function for doctor admin authentication
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

-- Enable Row Level Security (RLS) on all tables
alter table public.doctor_admins enable row level security;
alter table public.doctor_profile enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.articles enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;

-- Policies
create policy "Doctor admins can view admin list" on public.doctor_admins for select to authenticated using (public.is_doctor_admin());
create policy "Doctor admins can add new admins" on public.doctor_admins for insert to authenticated with check (public.is_doctor_admin());

create policy "Public can view doctor profile" on public.doctor_profile for select to anon, authenticated using (true);
create policy "Doctor admin can update doctor profile" on public.doctor_profile for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can view published services" on public.services for select to anon, authenticated using (is_published = true or public.is_doctor_admin());
create policy "Doctor admin can manage services" on public.services for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can submit appointment requests" on public.appointments for insert to anon, authenticated with check (status = 'pending' and appointment_date >= current_date);
create policy "Doctor admin can manage appointments" on public.appointments for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can view published articles" on public.articles for select to anon, authenticated using (status = 'published' or public.is_doctor_admin());
create policy "Doctor admin can manage articles" on public.articles for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can view published gallery" on public.gallery for select to anon, authenticated using (is_published = true or public.is_doctor_admin());
create policy "Doctor admin can manage gallery" on public.gallery for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can view published testimonials" on public.testimonials for select to anon, authenticated using (is_published = true or public.is_doctor_admin());
create policy "Doctor admin can manage testimonials" on public.testimonials for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can view published faqs" on public.faqs for select to anon, authenticated using (is_published = true or public.is_doctor_admin());
create policy "Doctor admin can manage faqs" on public.faqs for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

create policy "Public can submit contact messages" on public.contact_messages for insert to anon, authenticated with check (is_read = false);
create policy "Doctor admin can manage contact messages" on public.contact_messages for all to authenticated using (public.is_doctor_admin()) with check (public.is_doctor_admin());

-- ============================================================================
-- INITIAL SEED DATA FOR DR. ABDIJALII
-- ============================================================================

insert into public.doctor_profile (
  id, full_name, title, specialty, experience_years, location, phone, whatsapp_number, email, working_hours, biography
) values (
  'a0000000-0000-0000-0000-000000000001',
  'Dr. Abdijalii Abdiwahab Adan',
  'Orthopedic & Trauma Specialist',
  'Orthopedic Surgery',
  4,
  'Mogadishu, Somalia',
  '+252 61 5000000',
  '252615000000',
  'dr.abdijalii@gmail.com',
  'Saturday - Thursday: 8:00 AM - 4:00 PM',
  'Dr. Abdijalii Abdiwahab Adan is a dedicated Orthopedic and Trauma Specialist with over 4 years of clinical and surgical expertise in Mogadishu, Somalia.'
) on conflict (id) do nothing;

insert into public.services (title, slug, description, category, sort_order, is_published)
values
  ('Fracture Management & Bone Trauma', 'fracture-management-trauma', 'Comprehensive diagnosis, casting, reduction, and surgical internal fixation for all bone fractures.', 'Trauma Surgery', 1, true),
  ('Knee & Joint Preservation Care', 'knee-joint-preservation-care', 'Specialized evaluation and management for knee osteoarthritis, meniscus tears, and ligament injuries.', 'Joint Health', 2, true),
  ('Shoulder & Hip Conditions', 'shoulder-hip-conditions', 'Expert care for rotator cuff injuries, frozen shoulder, recurrent dislocations, and chronic hip pain.', 'Joint Health', 3, true),
  ('Sports Injuries & Rehabilitation', 'sports-injuries-rehabilitation', 'Targeted clinical intervention for athletic sprains, muscle strains, tendonitis, and fast-track recovery.', 'Sports Medicine', 4, true),
  ('Pediatric Orthopedic Assessments', 'pediatric-orthopedic-assessments', 'Gentle evaluation of limb alignment, bow legs, knock knees, clubfoot, and pediatric bone growth.', 'Pediatrics', 5, true),
  ('Spine & Back Pain Evaluation', 'spine-back-pain-evaluation', 'Differential diagnostic assessments for lumbar spondylosis, sciatica, postural strain, and therapy.', 'Spine Care', 6, true)
on conflict (slug) do nothing;

insert into public.articles (title, slug, excerpt, content, category, read_time, status)
values
  ('How to Recognize and Provide First Aid for Bone Fractures', 'bone-fracture-first-aid-guide', 'Crucial early steps when dealing with suspected bone fractures, immobilization tips, and when to seek urgent hospital care.', 'A bone fracture occurs when physical force exerted on the bone is stronger than the bone itself...', 'Trauma & First Aid', '4 min read', 'published'),
  ('Living Well with Knee Osteoarthritis: Evidence-Based Steps', 'knee-osteoarthritis-management', 'Exploring non-invasive therapies, weight management, low-impact joint exercises, and modern options.', 'Knee osteoarthritis is a progressive condition affecting millions worldwide...', 'Joint Health', '5 min read', 'published'),
  ('Preventing Common Sports Injuries: A Guide for Young Athletes', 'preventing-sports-injuries-somalia', 'Warm-up dynamics, hydration in warm climates, and progressive training strategies to prevent ACL tears.', 'Participation in football and track sports across Somalia continues to grow rapidly...', 'Sports Medicine', '3 min read', 'published')
on conflict (slug) do nothing;
