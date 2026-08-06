"use client";

import BausteinKarten from "./BausteinKarten";

/**
 * Schritt 2: alles Freiwillige. Der Satz oben ist der wichtigste Teil des
 * Schritts — er nimmt der Liste den Katalog-Charakter, bevor sie einer
 * wird: Nichts hier ist nötig, und nichts davon ist die letzte Gelegenheit.
 * Beides stimmt (nachbuchen geht jederzeit), und genau deshalb liest sich
 * die Seite danach als Angebot statt als Kostenfalle.
 */
export default function SchrittExtras({
  gewaehlt,
  setGewaehlt,
}: {
  gewaehlt: string[];
  setGewaehlt: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div>
      <p className="mb-8 text-sm text-text-light">
        Alles auf dieser Seite ist freiwillig — deine Website ist auch ohne
        komplett. Und nichts davon ist eine letzte Gelegenheit: Was du heute
        weglässt, kannst du später jederzeit dazubuchen.
      </p>

      <BausteinKarten
        gruppen={["sichtbarkeit", "auftritt", "funktionen"]}
        gewaehlt={gewaehlt}
        setGewaehlt={setGewaehlt}
      />
    </div>
  );
}
