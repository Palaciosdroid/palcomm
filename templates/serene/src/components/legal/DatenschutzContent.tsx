import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BusinessInfo } from "@/types/content";

export default function DatenschutzContent({ business }: { business: BusinessInfo }) {

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
        Datenschutzerklärung
      </h1>

      <div className="prose prose-sage max-w-none space-y-8 text-text-medium">
        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">1. Allgemeines</h2>
          <p className="leading-relaxed mb-4">
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche Personendaten beim Besuch dieser Website erhoben werden und wie diese verwendet werden.
          </p>
          <p className="leading-relaxed mb-4">
            Es gilt das Schweizer Datenschutzgesetz (DSG) in der revidierten Fassung (revDSG).
          </p>
          <div className="mt-4">
            <p className="font-medium text-text-dark">Verantwortliche Stelle:</p>
            <p className="leading-relaxed">
              {business.fullName}<br />
              {business.address.city}<br />
              {business.address.country}<br />
              E-Mail: <a href={`mailto:${business.email}`} className="text-brand hover:underline">{business.email}</a><br />
              Telefon: <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-brand hover:underline">{business.phone}</a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">2. Erhebung und Verarbeitung von Personendaten</h2>
          <p className="leading-relaxed mb-4">
            Diese Website kann grundsätzlich ohne Angabe personenbezogener Daten besucht werden. Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig mitteilen, zum Beispiel per E-Mail oder Telefon.
          </p>
          <p className="leading-relaxed mb-2">Erhobene Daten können insbesondere sein:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer</li>
            <li>Inhalte von Anfragen</li>
          </ul>
          <p className="leading-relaxed">
            Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht ohne Ihre Einwilligung weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">3. Server-Logfiles</h2>
          <p className="leading-relaxed mb-2">
            Beim Besuch dieser Website erhebt der Hosting-Provider automatisch technische Daten, sogenannte Server-Logfiles. Diese können beinhalten:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Browsertyp und -version</li>
            <li>Betriebssystem</li>
            <li>Referrer-URL</li>
          </ul>
          <p className="leading-relaxed">
            Diese Daten dienen ausschliesslich der Sicherstellung eines störungsfreien Betriebs der Website und werden nicht zur Identifikation Ihrer Person verwendet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">4. Hosting</h2>
          <p className="leading-relaxed">
            Diese Website wird bei einem externen Hosting-Anbieter betrieben. Personendaten, die auf dieser Website erfasst werden, werden auf den Servern des Hosting-Anbieters gespeichert. Der Hosting-Anbieter verarbeitet diese Daten ausschliesslich im Rahmen einer datenschutzkonformen Auftragsverarbeitung.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">5. Kontaktaufnahme</h2>
          <p className="leading-relaxed">
            Wenn Sie per E-Mail oder Telefon Kontakt aufnehmen, werden Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten zur Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">6. Cookies</h2>
          <p className="leading-relaxed">
            Diese Website verwendet aktuell keine Cookies zu Analyse- oder Marketingzwecken. Es können technisch notwendige Cookies eingesetzt werden, um die grundlegende Funktionalität der Website sicherzustellen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">7. Tracking- und Analyse-Tools</h2>
          <p className="leading-relaxed">
            Auf dieser Website werden derzeit keine Tracking- oder Analyse-Tools (z. B. Google Analytics, Facebook Pixel oder ähnliche Dienste) eingesetzt. Sollte zukünftig Tracking verwendet werden, wird diese Datenschutzerklärung entsprechend angepasst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">8. Weitergabe von Daten</h2>
          <p className="leading-relaxed mb-2">
            Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, ausser:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>wenn dies zur Erfüllung gesetzlicher Pflichten erforderlich ist</li>
            <li>oder Sie ausdrücklich in die Weitergabe eingewilligt haben</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">9. Aufbewahrungsdauer</h2>
          <p className="leading-relaxed">
            Personendaten werden nur so lange gespeichert, wie dies für die Bearbeitung Ihrer Anfrage notwendig ist oder gesetzliche Aufbewahrungspflichten bestehen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">10. Ihre Rechte</h2>
          <p className="leading-relaxed mb-2">
            Sie haben im Rahmen des geltenden Datenschutzrechts insbesondere das Recht auf:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten bestehen</li>
          </ul>
          <p className="leading-relaxed">
            Anfragen dazu richten Sie bitte an die oben genannte Kontaktadresse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">11. Haftungsausschluss</h2>
          <p className="leading-relaxed">
            Die Inhalte dieser Website dienen der allgemeinen Information und ersetzen keine fachliche Beratung im Einzelfall. [Beim Aufsetzen der Seite prüfen, ob für dieses Angebot ein branchenspezifischer Hinweis nötig ist.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">12. Änderungen</h2>
          <p className="leading-relaxed">
            Diese Datenschutzerklärung kann jederzeit angepasst werden. Es gilt jeweils die aktuelle, auf dieser Website veröffentlichte Version.
          </p>
        </section>
      </div>
    </div>
  );
}
