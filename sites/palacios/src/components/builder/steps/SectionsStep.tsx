"use client";

import { Check, Lock } from "lucide-react";
import type { SectionId } from "@/lib/site-config";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  REQUIRED_SECTIONS,
  type BuilderState,
} from "@/lib/builder/types";
import { StepHeading } from "../fields";

interface StepProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
}

export default function SectionsStep({ state, onChange }: StepProps) {
  function toggle(id: SectionId) {
    if (REQUIRED_SECTIONS.includes(id)) return;

    const active = state.sections.includes(id);
    const next = active
      ? state.sections.filter((s) => s !== id)
      : [...state.sections, id];

    onChange({ ...state, sections: SECTION_ORDER.filter((s) => next.includes(s)) });
  }

  return (
    <div>
      <StepHeading
        title="Sektionen"
        lead="Welche Abschnitte soll die Seite haben? Die Reihenfolge steht fest."
      />

      <ul className="space-y-2">
        {SECTION_ORDER.map((id) => {
          const active = state.sections.includes(id);
          const required = REQUIRED_SECTIONS.includes(id);
          const { name, hint } = SECTION_LABELS[id];

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => toggle(id)}
                disabled={required}
                aria-pressed={active}
                className={`w-full flex items-center gap-4 text-left p-4 rounded-xl border-2 bg-white transition-all ${
                  active ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
                } ${required ? "cursor-default" : ""}`}
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                    active ? "bg-gray-900 text-white" : "border-2 border-gray-300"
                  }`}
                >
                  {active && <Check size={14} strokeWidth={3} />}
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-gray-900">{name}</span>
                  <span className="block text-xs text-gray-500">{hint}</span>
                </span>

                {required && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Lock size={12} />
                    fest
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-gray-500 mt-6 leading-relaxed">
        Diese Auswahl ist danach nicht mehr über den Admin-Bereich änderbar. Das ist
        Absicht: So bleibt der Aufbau der Seite stabil, auch wenn die Kund/in später
        Texte bearbeitet.
      </p>
    </div>
  );
}
