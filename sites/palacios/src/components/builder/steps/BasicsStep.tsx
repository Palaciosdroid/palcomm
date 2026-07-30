"use client";

import type { BuilderState } from "@/lib/builder/types";
import { Field, TextInput, TextArea, StepHeading } from "../fields";

interface StepProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
}

export default function BasicsStep({ state, onChange }: StepProps) {
  function set<K extends keyof BuilderState["basics"]>(
    key: K,
    value: BuilderState["basics"][K]
  ) {
    onChange({ ...state, basics: { ...state.basics, [key]: value } });
  }

  return (
    <div>
      <StepHeading
        title="Grunddaten"
        lead="Wer betreibt die Website und wie ist sie erreichbar?"
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Name der Website" hint="Erscheint im Header, Footer und Titel">
          <TextInput
            value={state.basics.siteName}
            onChange={(v) => set("siteName", v)}
            placeholder="z. B. Praxis Sonnenberg"
          />
        </Field>

        <Field label="Domain" hint="Ohne https:// und ohne www.">
          <TextInput
            value={state.basics.domain}
            onChange={(v) => set("domain", v)}
            placeholder="praxis-sonnenberg.ch"
          />
        </Field>

        <Field label="Inhaber/in" hint="Voller Name, für Impressum und SEO">
          <TextInput
            value={state.basics.ownerName}
            onChange={(v) => set("ownerName", v)}
            placeholder="Maria Beispiel"
          />
        </Field>

        <Field label="Angebot in zwei Wörtern" hint="Wird als Untertitel verwendet">
          <TextInput
            value={state.basics.tagline}
            onChange={(v) => set("tagline", v)}
            placeholder="Ernährungsberatung"
          />
        </Field>

        <Field label="Telefon">
          <TextInput
            value={state.basics.phone}
            onChange={(v) => set("phone", v)}
            placeholder="+41 79 000 00 00"
          />
        </Field>

        <Field label="E-Mail" hint="Hierhin gehen die Anfragen aus dem Formular">
          <TextInput
            type="email"
            value={state.basics.email}
            onChange={(v) => set("email", v)}
            placeholder="kontakt@praxis-sonnenberg.ch"
          />
        </Field>

        <Field label="Strasse und Nummer" hint="Optional — leer lassen, wenn keine Adresse öffentlich sein soll">
          <TextInput
            value={state.basics.street}
            onChange={(v) => set("street", v)}
            placeholder="Bahnhofstrasse 12"
          />
        </Field>

        <Field label="PLZ und Ort">
          <TextInput
            value={state.basics.city}
            onChange={(v) => set("city", v)}
            placeholder="3000 Bern"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Das Angebot in einem Satz"
          hint="Fliesst in die Suchmaschinen-Beschreibung ein — ein bis zwei Sätze"
        >
          <TextArea
            value={state.basics.summary}
            onChange={(v) => set("summary", v)}
            rows={3}
            placeholder="Ernährungsberatung in Bern. Persönliche Begleitung bei Umstellung, Unverträglichkeiten und Gewichtsfragen."
          />
        </Field>
      </div>
    </div>
  );
}
