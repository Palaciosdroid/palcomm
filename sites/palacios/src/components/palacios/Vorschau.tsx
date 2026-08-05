import { CloudLightning, HeartPulse, MoonStar, CigaretteOff } from "lucide-react";
import { getPalette, getFontPairing, themeToCssVars } from "@/lib/theme";

/** Die vier Themen im Angebot-Raster. Ohne Symbole wirken die Kästchen wie
 *  unfertige Platzhalter statt wie eine gebaute Seite. */
const THEMEN = [
  { name: "Ängste", Symbol: CloudLightning },
  { name: "Schlaf", Symbol: MoonStar },
  { name: "Schmerzen", Symbol: HeartPulse },
  { name: "Rauchstopp", Symbol: CigaretteOff },
];

/**
 * Kleine Vorschau der künftigen Kundenseite.
 *
 * Kein Bild, sondern echtes Markup mit den gewählten Theme-Variablen — was
 * hier steht, sieht später genauso aus. Eine Palette als Farbstreifen zu
 * zeigen verkauft nichts; erst im Zusammenspiel mit Schrift, Weissraum und
 * einem Knopf sieht man, ob es passt.
 */
export default function Vorschau({
  paletteId,
  fontId,
  gross = false,
  lang = false,
  praxis = "PRAXIS SONNENBERG",
  kicker = "Hypnosetherapie in Bern",
  /** Navigation als eigener weisser Balken statt im Verlauf. Genau eine von
   *  drei Karten baut so — das ist die Abweichung, die zeigt, dass auch der
   *  Aufbau wählbar ist. Bei allen wäre es kein Unterschied mehr. */
  navBalken = false,
  titel = "Da ankommen, wo du hinwolltest.",
  lead = "Ich begleite Menschen, die mit Ängsten, Schlafproblemen oder alten Mustern leben — behutsam und in deinem Tempo.",
}: {
  paletteId: string;
  fontId: string;
  gross?: boolean;
  /** Zeigt zusätzlich Angebot und Kontakt — für das Hochformat auf der Startseite. */
  lang?: boolean;
  praxis?: string;
  kicker?: string;
  navBalken?: boolean;
  titel?: string;
  lead?: string;
}) {
  const vars = themeToCssVars({ paletteId, fontId });
  const { colors } = getPalette(paletteId);
  const schrift = getFontPairing(fontId);

  return (
    <div
      style={vars as React.CSSProperties}
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-base-300"
      aria-hidden
    >
      {/* Kopfzeile. Standard: im selben Verlauf wie das Startbild. Mit
          navBalken bekommt sie einen eigenen weissen Streifen mit Linie
          darunter — beides sind Aufbauten, die Kundenseiten wirklich haben. */}
      <div
        className={`z-10 flex items-center justify-between px-4 py-2.5 ${
          navBalken ? "" : "absolute inset-x-0 top-0"
        }`}
        style={
          navBalken
            ? { backgroundColor: colors.base50, borderBottom: `1px solid ${colors.base300}` }
            : undefined
        }
      >
        <span
          className="whitespace-nowrap text-[0.55rem] tracking-[0.14em]"
          style={{ color: colors.textDark, fontFamily: schrift.heading }}
        >
          {praxis}
        </span>
        <span className="flex shrink-0 gap-1.5">
          {["Angebot", "Über mich", "Kontakt"].map((eintrag) => (
            <span
              key={eintrag}
              className="whitespace-nowrap text-[0.45rem]"
              style={{ color: colors.textMedium, fontFamily: schrift.body }}
            >
              {eintrag}
            </span>
          ))}
        </span>
      </div>

      {/* Startbild */}
      <div
        className={`flex-1 ${
          gross
            ? navBalken ? "px-6 py-9" : "px-6 pb-9 pt-14"
            : navBalken ? "px-4 py-6" : "px-4 pb-6 pt-12"
        }`}
        style={{
          background: `linear-gradient(180deg, ${colors.accent300} 0%, ${colors.accent100} 55%, ${colors.base50} 100%)`,
        }}
      >
        <p
          className="text-[0.5rem] uppercase tracking-[0.16em]"
          style={{ color: colors.brand, fontFamily: schrift.body }}
        >
          {kicker}
        </p>
        <p
          className={gross ? "mt-2 text-2xl leading-tight" : "mt-1.5 text-base leading-tight"}
          style={{
            color: colors.textDark,
            fontFamily: schrift.heading,
            fontStyle: schrift.headingItalic ? "italic" : "normal",
          }}
        >
          {titel}
        </p>
        <p
          className={gross ? "mt-3 max-w-sm text-xs leading-relaxed" : "mt-2 text-[0.6rem] leading-relaxed"}
          style={{ color: colors.textMedium, fontFamily: schrift.body }}
        >
          {lead}
        </p>
        <span
          className={`mt-4 inline-block rounded-full ${gross ? "px-4 py-2 text-[0.65rem]" : "px-3 py-1.5 text-[0.55rem]"}`}
          style={{ backgroundColor: colors.brand, color: "#fff", fontFamily: schrift.body }}
        >
          Termin vereinbaren
        </span>
      </div>

      {/* Ein Abschnitt darunter, damit man den zweiten Flächenton sieht */}
      <div
        className={gross ? "px-6 py-6" : "px-4 py-4"}
        style={{ backgroundColor: colors.base100 }}
      >
        <p
          className={gross ? "text-sm" : "text-[0.7rem]"}
          style={{
            color: colors.textDark,
            fontFamily: schrift.heading,
            fontStyle: schrift.headingItalic ? "italic" : "normal",
          }}
        >
          Wie ich arbeite
        </p>
        <div className="mt-2 space-y-1.5">
          {[100, 88, 94].map((breite, i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{ width: `${breite}%`, backgroundColor: colors.base300 }}
            />
          ))}
        </div>
      </div>

      {/* Nur im Hochformat: Angebot und Kontakt. Ohne die wirkt die Vorschau
          im hohen Rahmen wie ein angeschnittenes Bild statt wie eine Seite. */}
      {lang && (
        <>
          <div className="px-4 py-5" style={{ backgroundColor: colors.base50 }}>
            <p
              className="text-[0.7rem]"
              style={{
                color: colors.textDark,
                fontFamily: schrift.heading,
                fontStyle: schrift.headingItalic ? "italic" : "normal",
              }}
            >
              Angebot
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              {THEMEN.map(({ name, Symbol }) => (
                <span
                  key={name}
                  className="flex items-center gap-1.5 rounded-md px-2 py-2 text-[0.5rem]"
                  style={{
                    backgroundColor: colors.accent100,
                    color: colors.textMedium,
                    fontFamily: schrift.body,
                  }}
                >
                  <Symbol size={11} strokeWidth={1.6} style={{ color: colors.brand }} />
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 py-5" style={{ backgroundColor: colors.accent200 }}>
            <p
              className="text-[0.7rem]"
              style={{
                color: colors.textDark,
                fontFamily: schrift.heading,
                fontStyle: schrift.headingItalic ? "italic" : "normal",
              }}
            >
              Kontakt
            </p>
            <div className="mt-2 space-y-1.5">
              {[70, 52].map((breite, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full"
                  style={{ width: `${breite}%`, backgroundColor: colors.base400 }}
                />
              ))}
            </div>
            <span
              className="mt-3 inline-block rounded-full px-3 py-1.5 text-[0.55rem]"
              style={{ backgroundColor: colors.brand, color: "#fff", fontFamily: schrift.body }}
            >
              Nachricht schreiben
            </span>
          </div>
        </>
      )}
    </div>
  );
}
