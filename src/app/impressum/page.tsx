import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImpressumContent from "@/components/legal/ImpressumContent";

export const metadata: Metadata = {
  title: "Impressum | Hypnose Enza",
  description: "Impressum und rechtliche Angaben von Hypnose Enza",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-6 md:px-8">
        <ImpressumContent />
      </main>
      <Footer />
    </>
  );
}
