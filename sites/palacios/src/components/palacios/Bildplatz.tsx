import type { ReactNode } from "react";
import { Image as BildSymbol } from "lucide-react";

/**
 * Platzhalter für ein Bild, das noch fehlt.
 *
 * Statt eines grauen Kastens ein Farbverlauf aus den Theme-Farben, dazu die
 * Beschriftung, was hier hingehört. Zwei Gründe: Die Seite wirkt schon jetzt
 * lebendig, und beim Zusammensuchen der Bilder steht die Liste auf der Seite
 * selbst statt in einem Dokument, das niemand findet.
 *
 * Beim Ersetzen: `<Bildplatz>` durch `<Image>` tauschen, `titel` wird zum alt.
 */
export default function Bildplatz({
  titel,
  hinweis,
  hoehe = "mittel",
  ton = "warm",
  farben,
  schmal = false,
  kinder,
}: {
  /** Was hier hingehört — wird später zum Alternativtext */
  titel: string;
  /** Optionale Regieanweisung: Format, Motiv, Stimmung */
  hinweis?: string;
  hoehe?: "flach" | "mittel" | "hoch" | "voll";
  ton?: "warm" | "dunkel" | "hell";
  /**
   * Drei Farbwerte statt des Theme-Verlaufs. Damit zeigen die Beispielkacheln
   * die Palette, die daneben steht — sonst verspricht die Beschriftung Salbei
   * und die Kachel ist golden wie alles andere.
   */
  farben?: [string, string, string];
  /** Beschriftung schmal halten — für Bilder, die teilweise verdeckt werden */
  schmal?: boolean;
  kinder?: ReactNode;
}) {
  const hoehen = {
    flach: "aspect-[16/7]",
    mittel: "aspect-[4/3]",
    hoch: "aspect-[3/4]",
    voll: "h-full min-h-[18rem]",
  }[hoehe];

  const toene = {
    warm: "from-brand via-brand-light to-accent-300",
    dunkel: "from-text-dark via-brand-dark to-brand",
    // Hell muss trotzdem Farbe haben — sonst liest sich der Platzhalter als
    // leerer Kasten und die Seite wirkt unfertig statt vorbereitet.
    hell: "from-accent-400 via-accent-200 to-accent-100",
  }[ton];

  const schrift = ton === "hell" ? "text-text-dark" : "text-white";

  return (
    <div
      role="img"
      aria-label={titel}
      style={
        farben
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${farben[0]}, ${farben[1]}, ${farben[2]})`,
            }
          : undefined
      }
      className={`relative overflow-hidden rounded-2xl ${
        farben ? "" : `bg-gradient-to-br ${toene}`
      } ${hoehen}`}
    >
      {/* Leichte Struktur, damit die Fläche nicht wie ein Farbfehler wirkt */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />

      <div
        className={`absolute inset-0 flex flex-col justify-end gap-1 p-5 ${schrift} ${
          schmal ? "pr-[42%]" : ""
        }`}
      >
        <BildSymbol
          className="mb-auto h-5 w-5 opacity-60"
          strokeWidth={1.5}
          aria-hidden
        />
        <p className="text-sm font-medium leading-snug">{titel}</p>
        {hinweis && (
          <p className="text-xs leading-snug opacity-75">{hinweis}</p>
        )}
        {kinder}
      </div>
    </div>
  );
}
