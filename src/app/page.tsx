import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import TherapySection from "@/components/sections/TherapySection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

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

      {/* Diplome & Zertifikate */}
      <CertificatesSection />

      {/* Kontaktformular */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
