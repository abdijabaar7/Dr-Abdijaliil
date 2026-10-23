import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Activity, Bone, ShieldPlus, Zap, HeartHandshake, Sparkles, Calendar, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Orthopedic Services & Procedures",
  description: "Explore the comprehensive orthopedic services offered by Dr. Abdijalii Abdiwahab Adan in Mogadishu, Somalia.",
};

export default function ServicesPage() {
  const serviceList = [
    {
      id: "fracture-management-trauma",
      title: "Fracture Management & Bone Trauma",
      category: "Trauma Surgery",
      icon: Bone,
      summary: "Accurate fracture diagnosis, precision casting, closed reduction, and surgical internal fixation.",
      details: [
        "Digital X-ray assessment for acute limb trauma and pediatric fractures",
        "Modern lightweight casting and functional splinting",
        "Open reduction and internal fixation (ORIF) with locking plates and screws",
        "Intramedullary nailing for femur and tibia fractures",
        "Treatment of nonunion (unhealed bone fractures) and malunion correction",
      ],
    },
    {
      id: "knee-joint-preservation-care",
      title: "Knee & Joint Preservation Care",
      category: "Joint Health",
      icon: Activity,
      summary: "Targeted clinical protocols for knee osteoarthritis, meniscus injuries, and joint degeneration.",
      details: [
        "Clinical grading and comprehensive evaluation of knee cartilage wear",
        "Intra-articular therapeutic injections to reduce inflammation and friction",
        "Minimally invasive arthroscopic assessment for meniscus and synovial disorders",
        "Cruciate ligament (ACL / PCL) tear evaluation and surgical consultation",
        "Structured joint unloader protocols and quadriceps rehabilitation",
      ],
    },
    {
      id: "shoulder-hip-conditions",
      title: "Shoulder & Hip Conditions",
      category: "Joint Reconstruction",
      icon: ShieldPlus,
      summary: "Specialized care for chronic shoulder impingement, rotator cuff injuries, and hip arthropathy.",
      details: [
        "Rotator cuff tear diagnosis, non-operative therapies, and repair options",
        "Management of frozen shoulder (adhesive capsulitis) and calcific tendonitis",
        "Shoulder instability and recurrent dislocation stabilization",
        "Hip joint impingement and osteoarthritis mobility assessments",
        "Bursitis and periarticular soft tissue inflammation protocols",
      ],
    },
    {
      id: "sports-injuries-rehabilitation",
      title: "Sports Injuries & Rehabilitation",
      category: "Sports Medicine",
      icon: Zap,
      summary: "Fast-track recovery programs for footballers, athletes, and physically active individuals.",
      details: [
        "High-grade ankle sprains and syndesmosis ligament assessment",
        "Hamstring, quadriceps, and calf muscle strain recovery pathways",
        "Achilles tendonitis management and rupture repair",
        "Pre-season joint conditioning and return-to-play clearance protocols",
      ],
    },
    {
      id: "pediatric-orthopedic-assessments",
      title: "Pediatric Orthopedic Assessments",
      category: "Pediatric Orthopedics",
      icon: HeartHandshake,
      summary: "Gentle evaluations for limb alignment, congenital conditions, and children's bone growth.",
      details: [
        "Evaluation of genu varum (bow legs) and genu valgum (knock knees)",
        "Clubfoot (talipes equinovarus) serial casting consultation",
        "Flat feet (pes planus) assessment and pediatric shoe insoles",
        "Pediatric bone growth plate injury surveillance and safe healing",
      ],
    },
    {
      id: "spine-back-pain-evaluation",
      title: "Spine & Chronic Back Pain Evaluation",
      category: "Spine Care",
      icon: Sparkles,
      summary: "Differential evaluation for lumbar spine disc discomfort, posture strains, and sciatica.",
      details: [
        "Diagnostic clinical differentiation between discogenic, nerve, and muscular back pain",
        "Non-surgical nerve decompression regimens and posture correction",
        "Cervical spine strain and ergonomic workplace guidance",
        "Coordination of specialized physiotherapy and Core stability regimens",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Clinical Procedures
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Orthopedic Services
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Evidence-based surgical procedures, fracture interventions, and joint preservation treatments
            delivered with meticulous precision in Mogadishu.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {serviceList.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                id={svc.id}
                key={svc.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 hover:border-teal-200 shadow-sm hover:shadow-lg transition-all scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                      {svc.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {svc.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {svc.summary}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/appointments?service=${svc.id}`}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-md transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        Book for this Service
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Clinical Scope & Procedures Included:
                    </h3>
                    <div className="space-y-2.5">
                      {svc.details.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

