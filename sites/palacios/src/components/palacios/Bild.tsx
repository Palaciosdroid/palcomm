import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Bildplatz from "./Bildplatz";

/**
 * Zeigt ein Bild aus public/bilder/ — oder den Platzhalter, solange die
 * Datei fehlt.
 *
 * So können Bilder nachgereicht werden, ohne dass jemand Code anfasst:
 * Datei unter dem erwarteten Namen ins Repo legen, deployen, fertig. Der
 * Platzhalter nennt den erwarteten Dateinamen, damit beim Einsammeln der
 * Bilder die Liste auf der Seite selbst steht.
 *
 * Die Prüfung läuft beim Bauen (die Seite ist statisch) — nach dem Ablegen
 * einer Datei braucht es einen neuen Build. Auf Railway passiert das mit
 * jedem Push von selbst.
 */
export default function Bild({
  datei,
  titel,
  hinweis,
  hoehe = "mittel",
  ton = "warm",
  schmal = false,
  prioritaet = false,
  oben = false,
  rund = true,
}: {
  /** Dateiname unter public/bilder/, z. B. "diplom.jpg" */
  datei: string;
  titel: string;
  hinweis?: string;
  hoehe?: "flach" | "video" | "mittel" | "hoch" | "voll";
  ton?: "warm" | "dunkel" | "hell";
  schmal?: boolean;
  /** Fürs Startbild: lädt das Bild mit Vorrang, bevor gescrollt wird */
  prioritaet?: boolean;
  /**
   * Von oben statt aus der Mitte zuschneiden. Für Website-Bildschirmfotos:
   * Die Kopfzeile der gezeigten Seite muss sichtbar bleiben, unten darf
   * fehlen.
   */
  oben?: boolean;
  /** Ohne eigene Rundung — wenn ein Rahmen aussen die Ecken übernimmt */
  rund?: boolean;
}) {
  const aufPlatte = path.join(process.cwd(), "public", "bilder", datei);

  if (!existsSync(aufPlatte)) {
    return (
      <Bildplatz
        titel={titel}
        hinweis={`${hinweis ? hinweis + " · " : ""}Datei: public/bilder/${datei}`}
        hoehe={hoehe}
        ton={ton}
        schmal={schmal}
        rund={rund}
      />
    );
  }

  const hoehen = {
    flach: "aspect-[16/7]",
    video: "aspect-video",
    mittel: "aspect-[4/3]",
    hoch: "aspect-[3/4]",
    voll: "h-full min-h-[18rem]",
  }[hoehe];

  return (
    <div className={`relative overflow-hidden ${rund ? "rounded-2xl" : ""} ${hoehen}`}>
      <Image
        src={`/bilder/${datei}`}
        alt={titel}
        fill
        className={`object-cover ${oben ? "object-top" : ""}`}
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={prioritaet}
      />
    </div>
  );
}
