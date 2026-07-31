import { palacios } from "@/lib/palacios-content";

/**
 * «Bekannt aus» — die Medien, die über Gabriel Palacios berichtet haben.
 *
 * Vorerst als Schriftzüge statt als Logos: Logodateien liegen noch nicht im
 * Repo, und ein fehlendes Bild sieht schlechter aus als ein gesetzter Name.
 * Beim Ersetzen wird aus jedem <span> ein <Image> derselben Höhe — das
 * Raster bleibt.
 *
 * Auf schmalen Bildschirmen lässt sich die Reihe seitlich schieben, statt
 * auf vier Zeilen umzubrechen.
 */
export default function Medienleiste({ hell = false }: { hell?: boolean }) {
  const { medien } = palacios;

  // min-w-0: Ohne das behält ein Flex-Kind seine Mindestbreite aus dem Inhalt
  // (min-width: auto). Die Namen stehen auf whitespace-nowrap, die Leiste war
  // dadurch 635 statt 390 Punkte breit — und weil sie die Elternbreite
  // mitgezogen hat, liess sich die ganze Seite waagrecht scrollen.
  return (
    <div className="min-w-0">
      <p
        className={`text-xs uppercase tracking-[0.18em] ${
          hell ? "text-base-300" : "text-text-light"
        }`}
      >
        {medien.titel}
      </p>

      <ul
        className={`-mx-6 mt-4 flex w-[100vw] max-w-[100vw] items-center gap-7 overflow-x-auto px-6 pb-2 sm:mx-0 sm:w-auto sm:max-w-full sm:flex-wrap sm:overflow-visible sm:px-0 ${
          hell ? "text-base-300" : "text-text-medium"
        }`}
      >
        {medien.namen.map((name) => (
          <li
            key={name}
            className="shrink-0 whitespace-nowrap font-serif text-lg tracking-wide opacity-70 transition-opacity hover:opacity-100"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
