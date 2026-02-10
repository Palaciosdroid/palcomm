import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Impressum | Hypnose Enza",
  description: "Impressum und rechtliche Angaben von Hypnose Enza",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1
          className="text-4xl md:text-5xl mb-10"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Impressum
        </h1>

        <div className="prose prose-sage max-w-none space-y-8 text-text-medium">
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">
              Angaben gemäss Art. 3 Abs. 1 lit. s UWG
            </h2>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Anbieterin:</h3>
            <p className="leading-relaxed">
              Enza Gasser-Fiorini<br />
              Hypnosetherapie
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Adresse:</h3>
            <p className="leading-relaxed">
              3072 Ostermundigen<br />
              Schweiz
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Telefon:</h3>
            <p>
              <a href="tel:+41794162223" className="text-brand hover:underline">
                +41 79 416 22 23
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">E-Mail:</h3>
            <p>
              <a href="mailto:enzagasser@gmail.com" className="text-brand hover:underline">
                enzagasser@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Verantwortlich für den Inhalt:</h3>
            <p className="leading-relaxed">
              Enza Gasser-Fiorini<br />
              3072 Ostermundigen<br />
              Schweiz
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Haftungsausschluss:</h3>
            <p className="leading-relaxed">
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">Urheberrechte:</h3>
            <p className="leading-relaxed">
              Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der Anbieterin.
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
