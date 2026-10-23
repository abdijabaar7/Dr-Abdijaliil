import { HeroSection } from "@/components/home/HeroSection";
import { QuickSpecialtyBar } from "@/components/home/QuickSpecialtyBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { QualityFeature } from "@/components/home/QualityFeature";
import { PopularServices } from "@/components/home/PopularServices";
import { ConsultationCtaBanner } from "@/components/home/ConsultationCtaBanner";
import { DoctorShowcase } from "@/components/home/DoctorShowcase";
import { ComprehensiveServicesBanner } from "@/components/home/ComprehensiveServicesBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { MissionBanner } from "@/components/home/MissionBanner";
import { LatestArticles } from "@/components/home/LatestArticles";
import { MobileAppBanner } from "@/components/home/MobileAppBanner";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero Section (Your Health Our Priority + Circular Mint Backdrop & Floating Doctor Badge) */}
      <HeroSection />

      {/* 2. Dark Blue/Teal Quick Search Bar & 6 Specialty Icons */}
      <QuickSpecialtyBar />

      {/* 3. Why Choose Dr. Abdijalii? (4 Feature Cards) */}
      <WhyChooseUs />

      {/* 4. Quality Healthcare for a Healthier Tomorrow (Split Card with 98% Patient Satisfaction Badge) */}
      <QualityFeature />

      {/* 5. Popular Specialties (5-Card Specialty Row) */}
      <PopularServices />

      {/* 6. Need a Doctor Consultation? CTA Banner */}
      <ConsultationCtaBanner />

      {/* 7. Meet Our Top Doctors / Specialist Cards with Star Ratings & Book Now */}
      <DoctorShowcase />

      {/* 8. Comprehensive Healthcare Services for You (Dark Teal Header & 6 Service Cards) */}
      <ComprehensiveServicesBanner />

      {/* 9. What Our Patients Say (Patient Testimonials with Avatars & 5-Star Ratings) */}
      <TestimonialsSection />

      {/* 10. Your Health, Our Mission Split Card */}
      <MissionBanner />

      {/* 11. Latest Health Articles with Photo Thumbnails & Dates */}
      <LatestArticles />

      {/* 12. Direct Mobile & WhatsApp Connectivity Banner with Smartphone Mockup */}
      <MobileAppBanner />
    </div>
  );
}
