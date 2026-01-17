import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import TherapySection from "@/components/sections/TherapySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Herzlich Willkommen */}
      <WelcomeSection />

      {/* Philosophie der Hypnose */}
      <PhilosophySection />

      {/* Therapieangebot */}
      <TherapySection />

      {/* Kundenstimmen */}
      <TestimonialsSection />

      {/* Diplome & Zertifikate */}
      <CertificatesSection />

      {/* Konditionen/Preise */}
      <PricingSection />

      {/* Kontaktformular */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Sticky CTA für Mobile */}
      <StickyCTA />
    </main>
  );
}
