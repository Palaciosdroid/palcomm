import { Phone } from "lucide-react";
import { palacios } from "@/lib/palacios-content";

/**
 * Der zweite Weg — auf jedem Schritt erreichbar, nicht erst am Ende.
 *
 * Wer unsicher ist, ist es beim ersten Baustein, nicht beim Absenden. Bis
 * dahin hat sie längst weggeklickt. Deshalb steht der Block unter jedem
 * Schritt und die Summentafel verlinkt ihn.
 */
export default function Beratung() {
  const { beratung, firma } = palacios;

  return (
    <div id="beratung" className="scroll-mt-28 rounded-2xl bg-white p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div>
          <h2 className="font-sans text-lg font-semibold text-text-dark">
            {beratung.title}
          </h2>
          <p className="mt-2 leading-relaxed text-text-medium">{beratung.text}</p>
          <p className="mt-2 text-sm text-text-light">{beratung.hinweis}</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={beratung.terminHref}
            className="rounded-full bg-brand px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {beratung.terminText}
          </a>
          <a
            href={firma.telefonLink}
            className="flex items-center justify-center gap-2 text-sm text-text-medium transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" />
            {firma.telefon}
          </a>
        </div>
      </div>
    </div>
  );
}
