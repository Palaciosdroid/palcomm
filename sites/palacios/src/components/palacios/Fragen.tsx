"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Frage {
  frage: string;
  antwort: string;
}

export default function Fragen({ fragen }: { fragen: Frage[] }) {
  // Die erste Frage ist offen — sonst sieht die Sektion aus wie eine
  // Linkliste und niemand klickt.
  const [offen, setOffen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-base-300 border-y border-base-300">
      {fragen.map((eintrag, index) => {
        const istOffen = offen === index;

        return (
          <div key={eintrag.frage}>
            <h3>
              <button
                type="button"
                onClick={() => setOffen(istOffen ? null : index)}
                aria-expanded={istOffen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-sans text-lg font-semibold text-text-dark">
                  {eintrag.frage}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand transition-transform ${
                    istOffen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {istOffen && (
              <p className="max-w-3xl pb-6 leading-relaxed text-text-medium">
                {eintrag.antwort}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
