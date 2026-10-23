import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Clinic & Surgical Gallery",
  description: "View the medical clinic environment, diagnostic facilities, and orthopedic surgical care of Dr. Abdijalii in Mogadishu.",
};

const GALLERY_ITEMS = [
  {
    title: "Orthopedic Clinical Consultation Desk",
    category: "Clinic Environment",
    caption: "Welcoming, modern clinical evaluation room equipped for patient comfort and detailed diagnostic discussions.",
    image: "/images/doctor/design-reference.jpg",
  },
  {
    title: "Surgical Theatre & Fracture Fixation Setting",
    category: "Surgical Suite",
    caption: "Sterile surgical environment with precision C-arm fluoroscopy and orthopedic fixation instrumentation.",
    image: "/images/doctor/design-reference.jpg",
  },
  {
    title: "Digital Radiography & Imaging Review",
    category: "Diagnostic Care",
    caption: "High-resolution digital X-ray review workstations for assessing bone fractures, joint spaces, and healing alignment.",
    image: "/images/doctor/design-reference.jpg",
  },
  {
    title: "Post-Operative & Casting Facility",
    category: "Orthopedic Rehabilitation",
    caption: "Comfortable casting, splinting, and mobility restoration area assisting patients during their recovery.",
    image: "/images/doctor/design-reference.jpg",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Medical Environment
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Clinic & Surgical Gallery
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            A glimpse into Dr. Abdijalii&apos;s orthopedic clinical facilities and patient care standard
            in Mogadishu, Somalia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

