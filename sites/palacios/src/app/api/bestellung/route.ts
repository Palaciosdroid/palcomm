import { NextResponse } from "next/server";
import { Resend } from "resend";
import { palacios } from "@/lib/palacios-content";
import {
  fasseZusammen,
  pruefeBestellung,
  type Bestellung,
} from "@/lib/bestellung";

export const dynamic = "force-dynamic";

/**
 * Nimmt eine Bestellung aus dem Assistenten entgegen.
 *
 * Zwei Dinge passieren hier bewusst serverseitig:
 * 1. Die Prüfung läuft nochmals. Was der Browser prüft, ist Bequemlichkeit;
 *    verlassen kann man sich nur auf das, was der Server sieht.
 * 2. Die Summe wird neu gerechnet, statt aus dem Formular übernommen — sonst
 *    bestätigen wir einen Auftrag zu einem Preis, den jemand selbst gesetzt hat.
 */
export async function POST(request: Request) {
  let eingang: Partial<Bestellung>;
  try {
    eingang = await request.json();
  } catch {
    return NextResponse.json({ fehler: "Unlesbare Anfrage" }, { status: 400 });
  }

  const pruefung = pruefeBestellung(eingang);
  if (!pruefung.ok) {
    return NextResponse.json({ fehler: pruefung.fehler }, { status: 400 });
  }

  const bestellung = eingang as Bestellung;
  const { summe, text } = fasseZusammen(bestellung);

  const empfaenger = process.env.BESTELLUNG_EMAIL || palacios.firma.email;
  const absender =
    process.env.RESEND_FROM_EMAIL ||
    `${palacios.firma.name} <onboarding@resend.dev>`;
  const schluessel = process.env.RESEND_API_KEY;

  // Ohne Mailversand darf die Bestellung nicht lautlos verschwinden: Wir
  // protokollieren sie und melden ehrlich, dass es nicht geklappt hat.
  if (!schluessel) {
    console.error("[bestellung] RESEND_API_KEY fehlt — Bestellung nur im Log:\n" + text);
    return NextResponse.json(
      {
        fehler:
          "Wir konnten die Bestellung gerade nicht zustellen. Bitte ruf uns an oder schreib uns — wir haben deine Auswahl noch nicht.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(schluessel);
  const betreff = `Bestellung: ${bestellung.vorname} ${bestellung.nachname} — CHF ${summe.einmalig}`;

  try {
    const anUns = await resend.emails.send({
      from: absender,
      to: empfaenger,
      replyTo: bestellung.email,
      subject: betreff,
      text,
    });
    if (anUns.error) throw new Error(anUns.error.message);
  } catch (fehler) {
    console.error("[bestellung] Versand an uns fehlgeschlagen:\n" + text, fehler);
    return NextResponse.json(
      {
        fehler:
          "Wir konnten die Bestellung gerade nicht zustellen. Bitte ruf uns an oder schreib uns — wir haben deine Auswahl noch nicht.",
      },
      { status: 502 }
    );
  }

  // Die Bestätigung an die Kund/in darf den Erfolg nicht mehr kippen: Bei uns
  // ist die Bestellung angekommen, das ist der Teil, der zählt.
  try {
    await resend.emails.send({
      from: absender,
      to: bestellung.email,
      replyTo: empfaenger,
      subject: "Deine Bestellung ist bei uns angekommen",
      text: [
        `Hallo ${bestellung.vorname}`,
        "",
        "Danke — wir haben deine Bestellung erhalten. Wir schauen sie an und",
        "melden uns innerhalb von zwei Arbeitstagen mit der schriftlichen",
        "Auftragsbestätigung. Erst damit wird der Preis verbindlich.",
        "",
        "Bilder, Lebenslauf oder ein bestehendes Logo brauchst du jetzt noch",
        "nicht — das schickst du uns später an diese Adresse.",
        "",
        "Das hast du gewählt:",
        "",
        text,
        "",
        "Herzlich",
        palacios.firma.rechtsform,
        `${palacios.firma.telefon} · ${palacios.firma.email}`,
      ].join("\n"),
    });
  } catch (fehler) {
    console.error("[bestellung] Bestätigung an Kund/in fehlgeschlagen", fehler);
  }

  return NextResponse.json({ ok: true, einmalig: summe.einmalig, proMonat: summe.proMonat });
}
