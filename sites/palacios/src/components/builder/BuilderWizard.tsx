"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { emptyState, type BuilderState } from "@/lib/builder/types";
import BasicsStep from "./steps/BasicsStep";
import DesignStep from "./steps/DesignStep";
import SectionsStep from "./steps/SectionsStep";
import TextsStep from "./steps/TextsStep";
import ResultStep from "./steps/ResultStep";

const STORAGE_KEY = "builder_state";

const STEPS = [
  { id: "basics", label: "Grunddaten" },
  { id: "design", label: "Design" },
  { id: "sections", label: "Sektionen" },
  { id: "texts", label: "Inhalte" },
  { id: "result", label: "Ergebnis" },
] as const;

/**
 * Zwischenstand aus dem Browser lesen. Läuft nur im Client — der Wizard wird
 * bewusst ohne Server-Rendering geladen (siehe BuilderClient.tsx).
 */
function readStored(): BuilderState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...emptyState, ...JSON.parse(stored) };
  } catch {
    // Kaputter Stand im Speicher: mit leerem Formular weitermachen
  }
  return emptyState;
}

export default function BuilderWizard() {
  const [step, setStep] = useState(0);
  // Eingaben überleben ein versehentliches Neuladen — beim Onboarding sitzt
  // man schnell eine halbe Stunde an den Texten.
  const [state, setState] = useState<BuilderState>(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Speicher voll oder gesperrt — nicht kritisch, nur kein Zwischenstand
    }
  }, [state]);

  const isLast = step === STEPS.length - 1;
  const canContinue =
    step !== 0 || (state.basics.siteName.trim() !== "" && state.basics.email.trim() !== "");

  function reset() {
    if (!confirm("Alle Eingaben verwerfen und neu anfangen?")) return;
    setState(emptyState);
    setStep(0);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Website-Builder</h1>
              <p className="text-xs text-gray-500">
                Angaben ausfüllen — am Ende kommen die fertigen Dateien raus
              </p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" />
              Neu
            </button>
          </div>

          <ol className="flex items-center gap-1">
            {STEPS.map((s, i) => {
              const done = i < step;
              const current = i === step;

              return (
                <li key={s.id} className="flex-1">
                  <button
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className={`w-full text-left group ${i > step ? "cursor-default" : ""}`}
                  >
                    <span
                      className={`block h-1 rounded-full transition-colors ${
                        done || current ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                    <span
                      className={`flex items-center gap-1.5 mt-2 text-xs ${
                        current
                          ? "text-gray-900 font-medium"
                          : done
                            ? "text-gray-500"
                            : "text-gray-300"
                      }`}
                    >
                      {done && <Check className="w-3 h-3" />}
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {step === 0 && <BasicsStep state={state} onChange={setState} />}
        {step === 1 && <DesignStep state={state} onChange={setState} />}
        {step === 2 && <SectionsStep state={state} onChange={setState} />}
        {step === 3 && <TextsStep state={state} onChange={setState} />}
        {step === 4 && <ResultStep state={state} />}

        <div className="flex items-center justify-between mt-12 pt-6 border-t">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 text-sm border rounded-lg text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>

          {!isLast && (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue}
              className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {step === 0 && !canContinue && (
          <p className="text-xs text-gray-400 text-right mt-2">
            Name und E-Mail werden zum Weitermachen gebraucht.
          </p>
        )}
      </main>
    </div>
  );
}
