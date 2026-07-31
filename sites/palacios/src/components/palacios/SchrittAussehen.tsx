"use client";

import { Check, Info } from "lucide-react";
import { palettes, fontPairings } from "@/lib/theme";
import { paletteHinweise, schriftHinweise, designSchritt } from "@/lib/design-texte";
import Vorschau from "./Vorschau";

export default function SchrittAussehen({
  paletteId,
  setPaletteId,
  fontId,
  setFontId,
}: {
  paletteId: string;
  setPaletteId: (id: string) => void;
  fontId: string;
  setFontId: (id: string) => void;
}) {
  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <h2 className="text-2xl text-text-dark md:text-3xl">{designSchritt.title}</h2>
        <p className="mt-3 leading-relaxed text-text-medium">{designSchritt.lead}</p>
      </header>

      {/* Die Vorschau steht zuoberst, damit jede Wahl sofort sichtbar wird */}
      <div className="mb-10 rounded-2xl bg-white p-4 md:p-6">
        <p className="mb-3 text-sm text-text-light">
          So sieht deine Auswahl aus — das ist keine Zeichnung, sondern die
          echte Vorlage.
        </p>
        <Vorschau paletteId={paletteId} fontId={fontId} gross />
      </div>

      {/* Farben */}
      <h3 className="mb-1 font-sans text-lg font-semibold text-text-dark">Farben</h3>
      <p className="mb-4 text-sm text-text-light">
        Sechs fertige Kombinationen. Jede ist so abgestimmt, dass Text darauf
        gut lesbar bleibt.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {palettes.map((palette) => {
          const aktiv = palette.id === paletteId;
          const hinweis = paletteHinweise[palette.id];

          return (
            <button
              key={palette.id}
              type="button"
              onClick={() => setPaletteId(palette.id)}
              aria-pressed={aktiv}
              className={`rounded-xl border-2 bg-white p-4 text-left transition-all ${
                aktiv ? "border-brand shadow-sm" : "border-base-300 hover:border-brand-light"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="font-medium text-text-dark">{palette.name}</span>
                {aktiv && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                )}
              </span>

              <span className="mt-3 flex gap-1.5">
                {palette.preview.map((farbe) => (
                  <span
                    key={farbe}
                    style={{ backgroundColor: farbe }}
                    className="h-7 flex-1 rounded-md"
                  />
                ))}
              </span>

              <span className="mt-3 block text-sm leading-snug text-text-medium">
                {hinweis?.wirkung ?? palette.description}
              </span>
              {hinweis && (
                <span className="mt-2 block text-sm leading-snug text-brand">
                  {hinweis.passtWenn}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Schrift */}
      <h3 className="mb-1 mt-10 font-sans text-lg font-semibold text-text-dark">Schrift</h3>
      <p className="mb-4 text-sm text-text-light">
        Vier Paarungen — eine für Überschriften, eine für den Lesetext.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {fontPairings.map((paarung) => {
          const aktiv = paarung.id === fontId;
          const hinweis = schriftHinweise[paarung.id];

          return (
            <button
              key={paarung.id}
              type="button"
              onClick={() => setFontId(paarung.id)}
              aria-pressed={aktiv}
              className={`rounded-xl border-2 bg-white p-4 text-left transition-all ${
                aktiv ? "border-brand shadow-sm" : "border-base-300 hover:border-brand-light"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="font-medium text-text-dark">{paarung.name}</span>
                {aktiv && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                )}
              </span>

              {/* Musterzeile in der Schrift, um die es geht */}
              <span
                className="mt-3 block text-xl text-text-dark"
                style={{
                  fontFamily: paarung.heading,
                  fontStyle: paarung.headingItalic ? "italic" : "normal",
                }}
              >
                Da ankommen, wo du hinwolltest.
              </span>
              <span
                className="mt-1 block text-sm text-text-medium"
                style={{ fontFamily: paarung.body }}
              >
                Ich begleite Menschen, die mit Ängsten leben.
              </span>

              <span className="mt-3 block text-sm leading-snug text-text-medium">
                {hinweis?.wirkung ?? paarung.description}
              </span>
              {hinweis && (
                <span className="mt-2 block text-sm leading-snug text-brand">
                  {hinweis.passtWenn}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-3 rounded-2xl bg-accent-100 p-5">
        <p className="flex gap-2.5 text-sm leading-relaxed text-text-dark">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          {designSchritt.falle}
        </p>
        <p className="pl-[1.625rem] text-sm leading-relaxed text-text-medium">
          {designSchritt.unentschlossen}
        </p>
      </div>
    </div>
  );
}
