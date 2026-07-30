"use client";

import { Plus, Trash2 } from "lucide-react";
import type { BuilderState, BuilderTexts } from "@/lib/builder/types";
import { Field, TextInput, TextArea, StepHeading } from "../fields";

interface StepProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
}

export default function TextsStep({ state, onChange }: StepProps) {
  const { texts, sections } = state;

  function set<K extends keyof BuilderTexts>(key: K, value: BuilderTexts[K]) {
    onChange({ ...state, texts: { ...texts, [key]: value } });
  }

  function updateItem<K extends "targetGroups" | "topics" | "testimonials">(
    key: K,
    index: number,
    patch: Partial<BuilderTexts[K][number]>
  ) {
    const next = texts[key].map((item, i) => (i === index ? { ...item, ...patch } : item));
    set(key, next as BuilderTexts[K]);
  }

  return (
    <div className="space-y-12">
      <StepHeading
        title="Inhalte"
        lead="Was leer bleibt, wird im Prompt als offene Frage markiert — nichts wird erfunden."
      />

      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
          Startbild
        </h3>
        <div className="space-y-5">
          <Field label="Titel" hint="Kurz und einladend, drei bis fünf Wörter">
            <TextInput
              value={texts.heroTitle}
              onChange={(v) => set("heroTitle", v)}
              placeholder="Ihr Weg beginnt hier"
            />
          </Field>
          <Field label="Einstiegssatz" hint="Zwei bis drei Zeilen">
            <TextArea
              value={texts.heroDescription}
              onChange={(v) => set("heroDescription", v)}
              rows={3}
            />
          </Field>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Untertitel" hint="Ein kurzer Zusatz unter dem Einstieg">
              <TextInput
                value={texts.heroSubtitle}
                onChange={(v) => set("heroSubtitle", v)}
                placeholder="Persönlich und auf Augenhöhe"
              />
            </Field>
            <Field label="Beschriftung des Knopfes">
              <TextInput value={texts.ctaText} onChange={(v) => set("ctaText", v)} />
            </Field>
          </div>
        </div>
      </section>

      {sections.includes("welcome") && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
            Willkommen & Über mich
          </h3>
          <div className="space-y-5">
            <Field label="Einleitung" hint="Wen begleiten Sie, was erwartet die Leute?">
              <TextArea
                value={texts.welcomeIntro}
                onChange={(v) => set("welcomeIntro", v)}
                rows={3}
              />
            </Field>
            <Field label="Über mich" hint="Werdegang und Haltung, persönlich geschrieben">
              <TextArea
                value={texts.aboutText}
                onChange={(v) => set("aboutText", v)}
                rows={6}
              />
            </Field>
          </div>
        </section>
      )}

      {sections.includes("philosophy") && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
            Arbeitsweise
          </h3>
          <div className="space-y-5">
            <Field label="Überschrift">
              <TextInput
                value={texts.philosophyTitle}
                onChange={(v) => set("philosophyTitle", v)}
              />
            </Field>
            <Field
              label="Text"
              hint="Zwei Abschnitte mit Leerzeile dazwischen wirken gut"
            >
              <TextArea
                value={texts.philosophyText}
                onChange={(v) => set("philosophyText", v)}
                rows={6}
              />
            </Field>
          </div>
        </section>
      )}

      {sections.includes("services") && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
            Angebot
          </h3>

          <Field label="Einleitung">
            <TextArea
              value={texts.servicesIntro}
              onChange={(v) => set("servicesIntro", v)}
              rows={2}
            />
          </Field>

          <p className="text-sm font-medium text-gray-800 mt-8 mb-1">Zielgruppen</p>
          <p className="text-xs text-gray-500 mb-3">
            Je ein Bild pro Zielgruppe wird später gebraucht.
          </p>
          <RepeatList
            items={texts.targetGroups}
            onAdd={() =>
              set("targetGroups", [...texts.targetGroups, { title: "", description: "" }])
            }
            onRemove={(i) =>
              set(
                "targetGroups",
                texts.targetGroups.filter((_, index) => index !== i)
              )
            }
            addLabel="Zielgruppe hinzufügen"
            render={(item, i) => (
              <div className="space-y-3">
                <TextInput
                  value={item.title}
                  onChange={(v) => updateItem("targetGroups", i, { title: v })}
                  placeholder="Titel, z. B. Erwachsene"
                />
                <TextArea
                  value={item.description}
                  onChange={(v) => updateItem("targetGroups", i, { description: v })}
                  rows={2}
                  placeholder="Ein bis zwei Sätze zur Situation dieser Gruppe"
                />
              </div>
            )}
          />

          <p className="text-sm font-medium text-gray-800 mt-8 mb-3">Themen</p>
          <RepeatList
            items={texts.topics}
            onAdd={() => set("topics", [...texts.topics, { title: "", description: "" }])}
            onRemove={(i) =>
              set(
                "topics",
                texts.topics.filter((_, index) => index !== i)
              )
            }
            addLabel="Thema hinzufügen"
            render={(item, i) => (
              <div className="space-y-3">
                <TextInput
                  value={item.title}
                  onChange={(v) => updateItem("topics", i, { title: v })}
                  placeholder="Titel des Themas"
                />
                <TextArea
                  value={item.description}
                  onChange={(v) => updateItem("topics", i, { description: v })}
                  rows={2}
                  placeholder="Kurze Beschreibung"
                />
              </div>
            )}
          />
        </section>
      )}

      {sections.includes("testimonials") && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
            Erfahrungen
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Nur echte Rückmeldungen eintragen. Was hier fehlt, bleibt leer.
          </p>
          <RepeatList
            items={texts.testimonials}
            onAdd={() =>
              set("testimonials", [
                ...texts.testimonials,
                { text: "", author: "", location: "" },
              ])
            }
            onRemove={(i) =>
              set(
                "testimonials",
                texts.testimonials.filter((_, index) => index !== i)
              )
            }
            addLabel="Rückmeldung hinzufügen"
            render={(item, i) => (
              <div className="space-y-3">
                <TextArea
                  value={item.text}
                  onChange={(v) => updateItem("testimonials", i, { text: v })}
                  rows={3}
                  placeholder="Die Rückmeldung im Wortlaut"
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    value={item.author}
                    onChange={(v) => updateItem("testimonials", i, { author: v })}
                    placeholder="Name, z. B. Sarah M."
                  />
                  <TextInput
                    value={item.location}
                    onChange={(v) => updateItem("testimonials", i, { location: v })}
                    placeholder="Ort"
                  />
                </div>
              </div>
            )}
          />
        </section>
      )}

      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
          Sonstiges
        </h3>
        <Field
          label="Sonderwünsche"
          hint="Alles, was oben nicht reinpasst — kommt unverändert in den Prompt"
        >
          <TextArea
            value={state.notes}
            onChange={(v) => onChange({ ...state, notes: v })}
            rows={4}
            placeholder="z. B. Terminbuchung über Calendly einbinden, Newsletter-Anmeldung im Footer"
          />
        </Field>
      </section>
    </div>
  );
}

function RepeatList<T>({
  items,
  render,
  onAdd,
  onRemove,
  addLabel,
}: {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="relative p-4 pr-12 bg-white border rounded-xl">
          {render(item, i)}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="absolute top-3 right-3 p-2 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50"
              aria-label="Eintrag entfernen"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-dashed rounded-lg hover:border-gray-500 hover:text-gray-900"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}
