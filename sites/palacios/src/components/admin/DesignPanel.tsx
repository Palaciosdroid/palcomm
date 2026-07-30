"use client";

import { Check } from "lucide-react";
import { palettes, fontPairings, type ThemeSelection } from "@/lib/theme";

interface DesignPanelProps {
  theme: ThemeSelection;
  onChange: (theme: ThemeSelection) => void;
}

/**
 * Der einzige Ort, an dem sich das Design ändern lässt: Palette und Schrift.
 * Beides greift sofort in der Vorschau — gespeichert wird erst mit dem
 * Speichern-Knopf oben.
 */
export default function DesignPanel({ theme, onChange }: DesignPanelProps) {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-lg font-medium mb-1">Farbpalette</h3>
        <p className="text-sm text-gray-500 mb-4">
          Bestimmt alle Farben der Website. Die Auswahl ist bewusst begrenzt,
          damit die Seite in jeder Variante stimmig bleibt.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {palettes.map((palette) => {
            const selected = palette.id === theme.paletteId;

            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onChange({ ...theme, paletteId: palette.id })}
                aria-pressed={selected}
                className={`relative text-left rounded-xl border-2 p-4 transition-all ${
                  selected
                    ? "border-gray-900 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {selected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}

                <span className="flex gap-1.5 mb-3">
                  {palette.preview.map((color) => (
                    <span
                      key={color}
                      className="w-7 h-7 rounded-full border border-black/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>

                <span className="block font-medium text-sm">{palette.name}</span>
                <span className="block text-xs text-gray-500 mt-1 leading-snug">
                  {palette.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-1">Schrift</h3>
        <p className="text-sm text-gray-500 mb-4">
          Überschriften und Fliesstext sind aufeinander abgestimmt und werden
          zusammen gewechselt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fontPairings.map((font) => {
            const selected = font.id === theme.fontId;

            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onChange({ ...theme, fontId: font.id })}
                aria-pressed={selected}
                className={`relative text-left rounded-xl border-2 p-4 transition-all ${
                  selected
                    ? "border-gray-900 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {selected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}

                <span
                  className="block text-2xl mb-1"
                  style={{
                    fontFamily: font.heading,
                    fontStyle: font.headingItalic ? "italic" : "normal",
                  }}
                >
                  Überschrift
                </span>
                <span
                  className="block text-sm text-gray-600 mb-3"
                  style={{ fontFamily: font.body }}
                >
                  So sieht der Fliesstext dieser Kombination aus.
                </span>

                <span className="block font-medium text-sm">{font.name}</span>
                <span className="block text-xs text-gray-500 mt-1 leading-snug">
                  {font.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
