import { Lock } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Ein angedeutetes Browserfenster um ein Bildschirmfoto.
 *
 * Ein nacktes Rechteck mit einem Website-Ausschnitt liest sich als
 * beliebiges Bild. Erst die Browserleiste mit Adresszeile macht daraus
 * unmissverständlich: Das ist eine fertige Website. Die Adresse zeigt
 * dabei, worum es geht — «deine-praxis.ch» sagt der Leserin, dass hier
 * ihre eigene Seite gemeint ist.
 *
 * Das Schloss in der Adresszeile ist dasselbe Schloss, von dem der
 * Abo-Text spricht («Das Schloss im Browser: deine Seite ist
 * verschlüsselt») — wer beides liest, erkennt es wieder.
 */
export default function BrowserRahmen({
  adresse = "deine-praxis.ch",
  children,
}: {
  adresse?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-base-100 shadow-xl ring-1 ring-base-300">
      <div className="flex items-center gap-3 border-b border-base-300 px-4 py-2.5">
        {/* Die drei Fensterknöpfe — bewusst dezent in einer Farbe */}
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-base-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-base-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-base-400" />
        </span>

        <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1 text-xs text-text-medium">
          <Lock className="h-3 w-3 text-brand" aria-hidden />
          {adresse}
        </span>

        {/* Rechts gleich viel Platz wie links, damit die Adresse mittig sitzt */}
        <span className="w-[46px]" aria-hidden />
      </div>

      {children}
    </div>
  );
}
