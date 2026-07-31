import { getPalette, getFontPairing, themeToCssVars } from "@/lib/theme";

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
}: {
  paletteId: string;
  fontId: string;
  gross?: boolean;
}) {
  const vars = themeToCssVars({ paletteId, fontId });
  const { colors } = getPalette(paletteId);
  const schrift = getFontPairing(fontId);

  return (
    <div
      style={vars as React.CSSProperties}
      className="overflow-hidden rounded-xl border border-base-300"
      aria-hidden
    >
      {/* Kopfzeile */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ backgroundColor: colors.base50, borderBottom: `1px solid ${colors.base300}` }}
      >
        <span
          className="text-[0.6rem] tracking-[0.18em]"
          style={{ color: colors.textDark, fontFamily: schrift.heading }}
        >
          PRAXIS SONNENBERG
        </span>
        <span className="flex gap-2">
          {["Angebot", "Über mich", "Kontakt"].map((eintrag) => (
            <span
              key={eintrag}
              className="text-[0.5rem]"
              style={{ color: colors.textMedium, fontFamily: schrift.body }}
            >
              {eintrag}
            </span>
          ))}
        </span>
      </div>

      {/* Startbild */}
      <div
        className={gross ? "px-6 py-9" : "px-4 py-6"}
        style={{
          background: `linear-gradient(180deg, ${colors.accent200} 0%, ${colors.accent100} 55%, ${colors.base50} 100%)`,
        }}
      >
        <p
          className="text-[0.5rem] uppercase tracking-[0.16em]"
          style={{ color: colors.brand, fontFamily: schrift.body }}
        >
          Hypnosetherapie in Bern
        </p>
        <p
          className={gross ? "mt-2 text-2xl leading-tight" : "mt-1.5 text-base leading-tight"}
          style={{
            color: colors.textDark,
            fontFamily: schrift.heading,
            fontStyle: schrift.headingItalic ? "italic" : "normal",
          }}
        >
          Da ankommen, wo du hinwolltest.
        </p>
        <p
          className={gross ? "mt-3 max-w-sm text-xs leading-relaxed" : "mt-2 text-[0.6rem] leading-relaxed"}
          style={{ color: colors.textMedium, fontFamily: schrift.body }}
        >
          Ich begleite Menschen, die mit Ängsten, Schlafproblemen oder alten
          Mustern leben — behutsam und in deinem Tempo.
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
    </div>
  );
}
