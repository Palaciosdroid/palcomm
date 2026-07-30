import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BusinessInfo } from "@/types/content";

export default function ImpressumContent({ business }: { business: BusinessInfo }) {
  const legal: [string, string][] = (
    [
      ["UID", business.legal?.uid],
      ["Handelsregister", business.legal?.commercialRegister],
      ["MWST-Nummer", business.legal?.vatNumber],
      ["Berufsbezeichnung", business.legal?.professionalTitle],
      ["Aufsichtsbehörde", business.legal?.supervisoryAuthority],
      ["Berufsverband", business.legal?.professionalAssociation],
      ["Registernummer", business.legal?.registrationNumber],
    ] as [string, string | undefined][]
  ).filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()));


  return (
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
            {business.fullName}<br />
            {business.tagline}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Adresse:</h3>
          <p className="leading-relaxed">
            {business.address.street && <>{business.address.street}<br /></>}
            {business.address.city}<br />
            {business.address.country}
          </p>
        </section>

        {/*
          Pflichtangaben nach UWG Art. 3 Abs. 1 lit. s sowie berufsrechtliche
          Angaben. Jede Zeile erscheint nur, wenn sie gesetzt ist.
        */}
        {legal.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-text-dark mb-2">
              Rechtliche Angaben:
            </h3>
            <dl className="leading-relaxed">
              {legal.map(([label, value]) => (
                <div key={label} className="flex flex-wrap gap-x-2">
                  <dt className="text-text-light">{label}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Telefon:</h3>
          <p>
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-brand hover:underline">
              {business.phone}
            </a>
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">E-Mail:</h3>
          <p>
            <a href={`mailto:${business.email}`} className="text-brand hover:underline">
              {business.email}
            </a>
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Verantwortlich für den Inhalt:</h3>
          <p className="leading-relaxed">
            {business.fullName}<br />
            {business.address.city}<br />
            {business.address.country}
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
  );
}
