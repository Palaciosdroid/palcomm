import { pruefeDomain, normalisiereDomain } from "../src/lib/funnel/domain.js";

const faelle: [string, string][] = [
  ["google.ch", "vergeben"],
  ["hypnose-enza.ch", "vergeben"],
  ["praxis-sonnenberg-xyz123.ch", "frei"],
  ["google.de", "vergeben"],           // der Fall, den rdap.org falsch meldet
  ["praxis-sonnenberg-xyz123.de", "frei"],
  ["google.com", "vergeben"],
  ["praxis-sonnenberg-xyz123.com", "frei"],
  // .at hat kein offenes RDAP. Vergeben erkennen wir sicher über das DNS;
  // "frei" gibt es für .at nie — nur "unbekannt" mit ehrlichem Hinweis,
  // weil eine registrierte, aber nicht aufgeschaltete Domain im DNS
  // genauso aussieht wie eine freie.
  ["google.at", "vergeben"],
  ["praxis-sonnenberg-xyz123.at", "unbekannt"],
  ["-kaputt-.ch", "ungueltig"],
  ["ohnepunkt", "ungueltig"],
];

console.log("Normalisierung:");
for (const e of ["HTTPS://WWW.Praxis-Sonnenberg.CH/kontakt", " praxis.ch. "]) {
  console.log(`  ${JSON.stringify(e)} -> ${normalisiereDomain(e)}`);
}
console.log();

let fehler = 0;
for (const [eingabe, erwartet] of faelle) {
  const r = await pruefeDomain(eingabe);
  const ok = r.status === erwartet;
  if (!ok) fehler++;
  const preis = r.inbegriffen ? "inbegriffen" : r.preisChf ? `CHF ${r.preisChf}/Jahr` : "—";
  console.log(`${ok ? "OK  " : "FEHL"} ${eingabe.padEnd(30)} ${r.status.padEnd(10)} ${preis}`);
  if (!ok) console.log(`     erwartet: ${erwartet}`);
}
console.log(`\n${faelle.length - fehler}/${faelle.length} bestanden`);
process.exit(fehler ? 1 : 0);
