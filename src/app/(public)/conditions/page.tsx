import Link from "next/link";
import { Activity, Bone, ShieldCheck, HeartPulse, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Conditions & Treatments",
  description: "Learn about the orthopedic conditions evaluated and treated by Dr. Abdijalii Abdiwahab Adan in Mogadishu, Somalia.",
};

export default function ConditionsPage() {
  const conditions = [
    {
      id: "fractures",
      title: "Bone Fractures & Acute Skeletal Injuries",
      icon: Bone,
      overview:
        "Fractures happen when external traumatic impact or rotational force exceeds bone tensile strength. Common causes include road traffic collisions, sports trauma, and domestic falls.",
      symptoms: [
        "Sudden, intense pain immediately following impact",
        "Visible deformity, unnatural bone bending, or limb shortening",
        "Severe swelling and subcutaneous hematoma (bruising)",
        "Inability to bear weight or move the affected limb",
      ],
      treatments:
        "Immediate emergency immobilization, anatomical alignment reduction, lightweight casting, or surgical osteosynthesis with specialized locking plates and intramedullary rods.",
    },
    {
      id: "knee-joint",
      title: "Knee Osteoarthritis & Ligament Injuries",
      icon: Activity,
      overview:
        "The knee is a high-load joint subject to cartilage wear over time (osteoarthritis) as well as sports-related ligament and meniscus tears.",
      symptoms: [
        "Deep joint ache aggravated by walking, stairs, or prayer movements",
        "Morning stiffness lasting up to 30 minutes",
        "Audible clicking, grinding (crepitus), or sudden sensation of knee giving way",
        "Joint effusion (fluid buildup) and warmth around the kneecap",
      ],
      treatments:
        "Conservative joint lubrication therapies, weight-offloading advice, quadriceps strengthening regimens, and surgical reconstruction or joint arthroscopy when indicated.",
    },
    {
      id: "shoulder-hip",
      title: "Shoulder Impingement & Hip Pain",
      icon: ShieldCheck,
      overview:
        "Ball-and-socket joints possess broad ranges of motion, making them vulnerable to tendon inflammation, labral tears, and bursitis.",
      symptoms: [
        "Sharp pain when lifting the arm overhead or sleeping on the affected side",
        "Reduced shoulder mobility (frozen shoulder / adhesive capsulitis)",
        "Deep groin or lateral hip pain when standing or walking",
        "Weakness in arm elevation or carrying objects",
      ],
      treatments:
        "Targeted anti-inflammatory regimens, guided physical rehabilitation, subacromial injections, and surgical rotator cuff or labral repair.",
    },
    {
      id: "pediatric",
      title: "Pediatric Bone Alignment & Growth Concerns",
      icon: HeartPulse,
      overview:
        "Children's bones are dynamic, growing structures. Parents often seek consultation for unusual gait, bow legs, or growing pains.",
      symptoms: [
        "Noticeable inward or outward curving of the legs beyond expected age ranges",
        "Frequent tripping, limping, or complaints of leg fatigue after play",
        "Uneven shoulder or pelvis height",
        "Pain localized to the shin or heel in active adolescents",
      ],
      treatments:
        "Reassurance and developmental monitoring, customized corrective orthotics, gentle serial casting, or surgical growth modulation if persistent.",
    },
    {
      id: "assessment",
      title: "Spine Strain & Musculoskeletal Assessment",
      icon: Sparkles,
      overview:
        "Sedentary desk work, heavy manual lifting, and poor sleeping posture frequently cause severe lumbar and cervical muscle spasms.",
      symptoms: [
        "Persistent lower back tightness or stabbing pain when bending forward",
        "Sciatic nerve discomfort radiating down into the buttock, thigh, or calf",
        "Numbness or tingling in the toes",
        "Stiff neck muscles accompanied by tension headaches",
      ],
      treatments:
        "Differential clinical diagnosis to rule out severe disc herniation, postural ergonomic corrections, core stabilizer physiotherapy, and targeted pain management.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Patient Education & Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Conditions & Treatments
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Understand your symptoms, explore proven clinical approaches, and learn how Dr. Abdijalii
            diagnoses and manages orthopedic disorders.
          </p>
        </div>
      </div>

      {/* Conditions Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {conditions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                id={item.id}
                key={item.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 hover:border-teal-200 shadow-sm transition-all scroll-mt-24 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
                    <span className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                      Orthopedic Evaluation & Care
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Common Symptoms to Watch For:
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {item.symptoms.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Typical Treatment Approaches:
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.treatments}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/appointments?service=${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
                      >
                        Schedule an Evaluation for this Condition
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
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

