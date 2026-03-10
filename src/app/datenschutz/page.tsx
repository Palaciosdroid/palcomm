import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DatenschutzContent from "@/components/legal/DatenschutzContent";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Hypnose Enza",
  description: "Datenschutzerklärung von Hypnose Enza",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-6 md:px-8">
        <DatenschutzContent />
      </main>
      <Footer />
    </>
  );
}
