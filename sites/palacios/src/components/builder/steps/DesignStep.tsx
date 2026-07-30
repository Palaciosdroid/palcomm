"use client";

import { Check } from "lucide-react";
import { palettes, fontPairings, getPalette, getFontPairing } from "@/lib/theme";
import type { BuilderState } from "@/lib/builder/types";
import { StepHeading } from "../fields";

interface StepProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
}

export default function DesignStep({ state, onChange }: StepProps) {
  const palette = getPalette(state.paletteId);
  const font = getFontPairing(state.fontId);

  return (
    <div>
      <StepHeading
        title="Design"
        lead="Farben und Schrift. Beides bleibt später im Admin änderbar."
      />

      <h3 className="text-sm font-medium text-gray-800 mb-3">Farbpalette</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {palettes.map((p) => {
          const selected = p.id === state.paletteId;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange({ ...state, paletteId: p.id })}
              aria-pressed={selected}
              className={`relative text-left rounded-xl border-2 p-4 bg-white transition-all ${
                selected ? "border-gray-900 shadow-md" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {selected && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
              <span className="flex gap-1.5 mb-3">
                {p.preview.map((color) => (
                  <span
                    key={color}
                    className="w-7 h-7 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
              <span className="block font-medium text-sm text-gray-900">{p.name}</span>
              <span className="block text-xs text-gray-500 mt-1 leading-snug">
                {p.description}
              </span>
            </button>
          );
        })}
      </div>

      <h3 className="text-sm font-medium text-gray-800 mb-3">Schrift</h3>
      <div className="grid md:grid-cols-2 gap-3 mb-10">
        {fontPairings.map((f) => {
          const selected = f.id === state.fontId;

          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ ...state, fontId: f.id })}
              aria-pressed={selected}
              className={`relative text-left rounded-xl border-2 p-4 bg-white transition-all ${
                selected ? "border-gray-900 shadow-md" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {selected && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
              <span
                className="block text-2xl mb-1 text-gray-900"
                style={{
                  fontFamily: f.heading,
                  fontStyle: f.headingItalic ? "italic" : "normal",
                }}
              >
                Überschrift
              </span>
              <span className="block text-sm text-gray-600 mb-3" style={{ fontFamily: f.body }}>
                So sieht der Fliesstext aus.
              </span>
              <span className="block font-medium text-sm text-gray-900">{f.name}</span>
              <span className="block text-xs text-gray-500 mt-1 leading-snug">
                {f.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vorschau der Kombination */}
      <h3 className="text-sm font-medium text-gray-800 mb-3">So wirkt das zusammen</h3>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: palette.colors.base50 }}
      >
        <div
          className="px-8 py-10 text-center"
          style={{ backgroundColor: palette.colors.accent100 }}
        >
          <p
            className="text-3xl md:text-4xl mb-3"
            style={{
              fontFamily: font.heading,
              fontStyle: font.headingItalic ? "italic" : "normal",
              color: palette.colors.textDark,
            }}
          >
            {state.basics.siteName || "Ihr Websitename"}
          </p>
          <p
            className="text-base max-w-md mx-auto"
            style={{ fontFamily: font.body, color: palette.colors.textMedium }}
          >
            {state.basics.summary || "Hier steht später Ihr einleitender Satz."}
          </p>
          <span
            className="inline-block mt-6 px-6 py-3 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: palette.colors.brand, fontFamily: font.body }}
          >
            Termin vereinbaren
          </span>
        </div>
        <div className="px-8 py-8">
          <p
            className="text-xl mb-2"
            style={{ fontFamily: font.heading, color: palette.colors.textDark }}
          >
            Ein Abschnittstitel
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: font.body, color: palette.colors.textMedium }}
          >
            Und hier ein Stück Fliesstext, damit sichtbar wird, wie sich Überschrift
            und Text zueinander verhalten und wie ruhig die Farben wirken.
          </p>
        </div>
      </div>
    </div>
  );
}
