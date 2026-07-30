"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import type { BuilderState } from "@/lib/builder/types";
import {
  generateSiteConfig,
  generateContent,
  generatePrompt,
  siteSlug,
} from "@/lib/builder/generate";
import { StepHeading } from "../fields";

export default function ResultStep({ state }: { state: BuilderState }) {
  const slug = siteSlug(state);

  const files = [
    { id: "prompt", label: "Prompt", name: "PROMPT.md", body: generatePrompt(state) },
    {
      id: "config",
      label: "site-config.ts",
      name: "site-config.ts",
      body: generateSiteConfig(state),
    },
    {
      id: "content",
      label: "content.ts",
      name: "content.ts",
      body: generateContent(state),
    },
  ];

  const [active, setActive] = useState(files[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const current = files.find((f) => f.id === active) ?? files[0];

  async function copy(id: string, body: string) {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      alert("Kopieren hat nicht geklappt — bitte den Text von Hand markieren.");
    }
  }

  function download(name: string, body: string) {
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <StepHeading
        title="Fertig"
        lead={`Die Seite kommt nach sites/${slug}. Prompt kopieren, in Claude Code einfügen — die beiden Dateien sind darin schon beschrieben.`}
      />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {files.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              active === f.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 hover:border-gray-400"
            }`}
          >
            {f.label}
          </button>
        ))}

        <span className="flex-1" />

        <button
          onClick={() => copy(current.id, current.body)}
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
        >
          {copied === current.id ? (
            <>
              <Check size={15} className="text-green-600" />
              Kopiert
            </>
          ) : (
            <>
              <Copy size={15} />
              Kopieren
            </>
          )}
        </button>

        <button
          onClick={() => download(current.name, current.body)}
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
          aria-label={`${current.name} herunterladen`}
        >
          <Download size={15} />
        </button>
      </div>

      <pre className="text-xs leading-relaxed bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto max-h-[32rem] overflow-y-auto">
        <code>{current.body}</code>
      </pre>

      <div className="mt-8 p-5 bg-white border rounded-xl">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">So geht es weiter</h3>
        <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside leading-relaxed">
          <li>Prompt kopieren und in Claude Code einfügen</li>
          <li>
            Die beiden Dateien herunterladen und mitgeben — oder Claude sie aus dem
            Prompt heraus anlegen lassen
          </li>
          <li>Bilder in <code className="text-xs">public/images/</code> ablegen</li>
          <li>
            Hosting-Projekt anlegen, Root Directory auf{" "}
            <code className="text-xs">sites/{slug}</code> setzen
          </li>
        </ol>
      </div>
    </div>
  );
}
