-- ============================================================================
-- SEED DATA FOR DR. ABDIJALII ABDIWAHAB ADAN PORTFOLIO
-- ============================================================================

-- 1. Insert Initial Doctor Profile
insert into public.doctor_profile (
  id,
  full_name,
  title,
  specialty,
  experience_years,
  location,
  phone,
  whatsapp_number,
  email,
  working_hours,
  biography,
  profile_image_path
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
  'Dr. Abdijalii Abdiwahab Adan is a dedicated Orthopedic and Trauma Specialist with over 4 years of clinical and surgical expertise in Mogadishu, Somalia. Focused on evidence-based orthopedic care, his practice covers comprehensive fracture fixation, joint arthritis management, sports injuries, and musculoskeletal rehabilitation.',
  '/images/doctor/design-reference.jpg'
) on conflict (id) do update set
  full_name = excluded.full_name,
  specialty = excluded.specialty,
  biography = excluded.biography;

-- 2. Insert Core Orthopedic Services
insert into public.services (title, slug, description, full_content, category, icon_name, sort_order, is_published)
values
(
  'Fracture Management & Bone Trauma',
  'fracture-management-trauma',
  'Comprehensive diagnosis, casting, reduction, and surgical internal fixation for all types of bone fractures and acute injuries.',
  'Bone fractures require precise anatomical reduction and stability to prevent malunion and nonunion. Our practice utilizes modern surgical plating, intramedullary nailing, and minimally invasive techniques alongside traditional conservative casting to restore full functionality and mobility as quickly as possible.',
  'Trauma Surgery',
  'Bone',
  1,
  true
),
(
  'Knee & Joint Preservation Care',
  'knee-joint-preservation-care',
  'Specialized evaluation and management for knee osteoarthritis, meniscus tears, ACL/PCL ligament injuries, and joint pain.',
  'Joint discomfort can significantly affect your daily mobility. We offer holistic joint assessments, intra-articular therapies, regenerative management, arthroscopic interventions, and surgical planning for advanced joint degeneration.',
  'Joint Health',
  'Activity',
  2,
  true
),
(
  'Shoulder & Hip Conditions',
  'shoulder-hip-conditions',
  'Expert care for rotator cuff injuries, frozen shoulder, recurrent dislocations, hip impingement, and chronic arthritis.',
  'The shoulder and hip are critical ball-and-socket joints requiring careful biomechanical assessment. We provide specialized clinical diagnostics, targeted therapeutic regimens, and reconstructive surgical choices tailored to every patient.',
  'Joint Health',
  'ShieldPlus',
  3,
  true
),
(
  'Sports Injuries & Musculoskeletal Rehabilitation',
  'sports-injuries-rehabilitation',
  'Targeted clinical intervention for sprains, muscle strains, tendonitis, and fast-track athletic rehabilitation programs.',
  'Athletes and active individuals need tailored recovery pathways to return to play safely without recurrent injuries. We coordinate diagnosis, physical therapy regimens, and strengthening protocols.',
  'Sports Medicine',
  'Zap',
  4,
  true
),
(
  'Pediatric Orthopedic Assessments',
  'pediatric-orthopedic-assessments',
  'Evaluation of congenital limb conditions, bow legs, knock knees, developmental dysplasia, and growing pains in children.',
  'Childrens bones have unique growth plates and rapid remodeling capacity. We provide gentle, compassionate consultations for parents seeking expert clarity on pediatric limb alignment and developmental concerns.',
  'Pediatrics',
  'HeartHandshake',
  5,
  true
),
(
  'Spine & Back Pain Evaluation',
  'spine-back-pain-evaluation',
  'Diagnostic assessments for lumbar spondylosis, sciatica, postural spine strain, and non-surgical nerve decompression regimens.',
  'Back and neck pain are among the most common ailments. We emphasize clear diagnostics, ergonomic lifestyle modifications, physical therapy, and selective pain interventions.',
  'Spine Care',
  'Sparkles',
  6,
  true
)
on conflict (slug) do nothing;

-- 3. Insert Published Health Articles
insert into public.articles (title, slug, excerpt, content, category, read_time, status)
values
(
  'How to Recognize and Provide First Aid for Bone Fractures',
  'bone-fracture-first-aid-guide',
  'Crucial early steps when dealing with suspected bone fractures, immobilization tips, and when to seek urgent hospital care in Mogadishu.',
  'A bone fracture occurs when physical force exerted on the bone is stronger than the bone itself. Recognizing the telltale signs—severe localized swelling, intense pain with movement, inability to bear weight, and visible deformity—is the first step. Immediate first aid includes immobilizing the limb above and below the suspected injury, applying a cold pack wrapped in cloth to reduce swelling, avoiding direct pressure, and transporting the patient immediately to an orthopedic specialist.',
  'Trauma & First Aid',
  '4 min read',
  'published'
),
(
  'Living Well with Knee Osteoarthritis: Evidence-Based Steps',
  'knee-osteoarthritis-management',
  'Exploring non-invasive therapies, weight management, low-impact joint exercises, and modern options to alleviate joint stiffness.',
  'Knee osteoarthritis is a progressive condition affecting millions worldwide. While cartilage degeneration can cause morning stiffness and walking discomfort, proactive lifestyle modifications can make a transformative difference. Low-impact aerobic exercises like swimming and cycling strengthen the quadriceps and hamstrings, offloading stress from the articular cartilage.',
  'Joint Health',
  '5 min read',
  'published'
),
(
  'Preventing Common Sports Injuries: A Guide for Young Athletes',
  'preventing-sports-injuries-somalia',
  'Warm-up dynamics, hydration in warm climates, and progressive training strategies to prevent ACL and ankle tears.',
  'Participation in football and track sports across Somalia continues to grow rapidly. However, improper pitch surfaces and rapid bursts without adequate warm-ups lead to a high frequency of anterior cruciate ligament (ACL) tears and ankle syndesmosis injuries. Dynamic stretching prior to matches and post-activity cooling routines are vital defense mechanisms.',
  'Sports Medicine',
  '3 min read',
  'published'
)
on conflict (slug) do nothing;

-- 4. Insert Verified FAQs
insert into public.faqs (question, answer, category, sort_order, is_published)
values
(
  'How do I schedule an appointment with Dr. Abdijalii?',
  'You can submit an appointment request through our online booking form on this website, or connect directly with our clinic coordination desk via WhatsApp (+252 61 5000000). Our staff confirms your preferred time slot promptly.',
  'Appointments',
  1,
  true
),
(
  'What should I bring to my first orthopedic consultation?',
  'Please bring any prior X-rays, MRI or CT scans, previous medical reports, a list of current medications, and your primary identification or contact details.',
  'Consultation',
  2,
  true
),
(
  'Where is the clinic located in Mogadishu and what are the clinic hours?',
  'The clinic is situated centrally in Mogadishu, Somalia. In-person clinical consultations take place from Saturday to Thursday, 8:00 AM to 4:00 PM.',
  'General',
  3,
  true
),
(
  'Do you provide urgent fracture evaluations and casting?',
  'Yes. Acute trauma and suspected bone fractures are prioritized for rapid diagnostic radiography, immobilization casting, or emergency surgical assessment.',
  'Services',
  4,
  true
)
on conflict do nothing;

-- 5. Insert Verified Testimonials
insert into public.testimonials (patient_name, location, rating, treatment, content, is_verified, is_published)
values
(
  'Ahmed M. Warsame',
  'Mogadishu, Hodan',
  5,
  'Knee Injury & Rehabilitation',
  'Dr. Abdijalii diagnosed my meniscus injury with incredible accuracy. After 6 weeks of dedicated therapy and expert guidance, I am back walking without any pain.',
  true,
  true
),
(
  'Fadumo K. Nur',
  'Mogadishu, Waberi',
  5,
  'Arm Fracture Fixation',
  'When my son broke his arm, we rushed to Dr. Abdijalii. His gentle bedside manner and skilled fracture reduction made all the difference. Highly recommend his orthopedic expertise.',
  true,
  true
),
(
  'Mustafa H. Ali',
  'Mogadishu, Wadajir',
  5,
  'Chronic Shoulder Discomfort',
  'Professional, thorough, and highly knowledgeable. Dr. Abdijalii took the time to explain my shoulder X-rays and designed a targeted recovery plan that solved my chronic discomfort.',
  true,
  true
)
on conflict do nothing;

