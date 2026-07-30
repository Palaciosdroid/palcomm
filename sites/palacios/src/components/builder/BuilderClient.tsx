"use client";

import dynamic from "next/dynamic";

// Der Wizard lebt vollständig im Browser: Er liest den Zwischenstand aus dem
// localStorage und hat keinen Inhalt, der serverseitig gerendert werden
// müsste. Ohne SSR entfällt der Umweg über einen Zwischenzustand.
const BuilderWizard = dynamic(() => import("./BuilderWizard"), {
  ssr: false,
  loading: () => <div className="p-12 text-center text-gray-400">Lädt…</div>,
});

export default function BuilderClient() {
  return <BuilderWizard />;
}
