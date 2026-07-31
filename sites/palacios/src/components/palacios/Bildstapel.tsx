import Bildplatz from "./Bildplatz";

/**
 * Zwei versetzt übereinanderliegende Bilder.
 *
 * Für Abschnitte, die sonst nur aus Text bestehen. Der Versatz macht aus zwei
 * Rechtecken eine Szene — und er erzählt nebenbei die Reihenfolge: erst das
 * Diplom, dann die Praxis.
 *
 * Auf kleinen Bildschirmen wird gestapelt statt überlappt: Überlappung braucht
 * Breite, sonst verdeckt das vordere Bild das hintere fast vollständig.
 */
export default function Bildstapel({
  hinten,
  vorne,
}: {
  hinten: { titel: string; hinweis?: string };
  vorne: { titel: string; hinweis?: string };
}) {
  return (
    <div className="space-y-4 sm:relative sm:space-y-0 sm:pb-16 sm:pr-16">
      <div className="sm:w-[78%]">
        <Bildplatz
          titel={hinten.titel}
          hinweis={hinten.hinweis}
          hoehe="mittel"
          ton="hell"
          schmal
        />
      </div>

      <div className="sm:absolute sm:bottom-0 sm:right-0 sm:w-[55%] sm:rounded-2xl sm:shadow-xl sm:ring-8 sm:ring-base-50">
        <Bildplatz
          titel={vorne.titel}
          hinweis={vorne.hinweis}
          hoehe="mittel"
          ton="warm"
        />
      </div>
    </div>
  );
}
