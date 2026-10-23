# Dr. Abdijalii Abdiwahab Adan — Orthopedic Surgery Website & Doctor Dashboard

A production-ready medical portfolio and clinic management platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL + Auth + Storage)**. Designed specifically for **Dr. Abdijalii Abdiwahab Adan**, Orthopedic and Trauma Surgeon in Mogadishu, Somalia.

---

## 🌟 Key Features

### 🏥 Public Patient Portal
- **Modern Healthcare Aesthetic:** Custom teal & emerald UI matching modern orthopedic standards with floating doctor badges, verified trust metrics, and responsive navigation.
- **Hero & Specialty Search:** Quick filter by orthopedic condition (Fractures, Knee & Joint, Shoulder & Hip, Sports Injuries, Pediatric, Spine).
- **Service Catalog:** Full overview of surgical and non-surgical procedures with procedural scopes and direct booking triggers.
- **Conditions & Patient Education:** Clear, medically accurate explanations of symptoms, first-aid, and treatments without misleading claims.
- **Appointment Booking Wizard:** Interactive form with Zod validation, preferred time slots, rate-limiting, honeypot anti-spam, and instant WhatsApp booking link generation.
- **Online Consultation Inquiry:** Pre-screening request desk with direct WhatsApp triage.
- **Health Library (Blog):** Informative patient guides with read times and categories.
- **Verified Reviews & Gallery:** Genuine patient testimonials and clean clinic environment showcase.
- **Direct WhatsApp Desk:** Persistent floating button with status indicator.

### 🔐 Doctor Admin Dashboard (`/admin`)
- **Doctor-Only Security:** Row Level Security (RLS) enforcement ensures non-admin users cannot access administrative tables or view other patients' bookings.
- **Overview Metrics:** Instant view of total inquiries, pending reviews, confirmed visits, active services, and published articles.
- **Appointment Management:** Real-time triage with status transitions (`pending` → `confirmed` → `completed` → `cancelled`) and 1-click WhatsApp messaging to patients.
- **Services Manager:** Publish, edit, and archive clinical procedures.
- **Blog Manager:** Write, draft, and publish orthopedic health guides.
- **Gallery Manager:** Add and manage clinic photographs.
- **Profile & Clinic Settings:** Live updates to doctor credentials, phone numbers, WhatsApp, and clinic hours.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router with Server Components & Server Actions) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS (Brand Teal `#087F8C`, Dark Navy `#123B46`, Mint `#F3F8F8`) |
| **Database** | Supabase (PostgreSQL with Row Level Security & Triggers) |
| **Authentication** | Supabase Auth with server-side cookie sessions (`@supabase/ssr`) |
| **Validation** | Zod v3 |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/dr-abdijalii-portfolio.git
cd dr-abdijalii-portfolio
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=252615000000
```

### 3. Run Database Migrations in Supabase

1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Run the SQL script located at:
   `supabase/migrations/20261024000001_initial_schema.sql`
3. Populate initial services, articles, and profile data by executing:
   `supabase/seed.sql`

### 4. Create the First Doctor Administrator Safely

To ensure high security, admin users are registered via Supabase Auth and then verified in the `doctor_admins` table:

1. In Supabase Dashboard -> **Authentication** -> **Users**, click **Add user** -> **Create user**.
2. Enter the doctor's email and password.
3. In the **SQL Editor**, grant admin permissions to that user:
   ```sql
   insert into public.doctor_admins (user_id, email)
   values ('<USER-UUID-FROM-AUTH-TABLE>', 'doctor@example.com');
   ```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public portal, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Doctor Dashboard.

---

## 🔒 Security & Privacy Implementation

- **Patient Record Confidentiality:** Public visitors can only submit `pending` appointment requests. PostgreSQL RLS policies explicitly reject any `SELECT` queries from unauthorized users on `appointments` and `contact_messages`.
- **Honeypot Anti-Spam:** Both appointment and contact forms include hidden trap fields (`website_field_hp`) to catch automated bots silently.
- **Server-Side Rate Limiting:** Form submissions are rate-limited per IP address to prevent brute-force attacks and request flooding.
- **Security Headers:** Enforced via `next.config.ts` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, strict permissions policy).

---

## 📦 Vercel Deployment Guide

1. Push your repository to GitHub.
2. In the **Vercel Dashboard**, click **New Project** and import the repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your custom domain, e.g. `https://drabdijalii.so`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Click **Deploy**.
5. Under **Project Settings** -> **Domains**, attach your custom domain and configure your DNS A and CNAME records.

---

## 👨‍⚕️ Clinical Practice Information

- **Practitioner:** Dr. Abdijalii Abdiwahab Adan
- **Specialty:** Orthopedic & Trauma Surgery
- **Clinical Base:** Mogadishu, Somalia
- **Working Hours:** Saturday - Thursday: 8:00 AM - 4:00 PM
- **Direct Emergency Contact:** +252 61 5000000

