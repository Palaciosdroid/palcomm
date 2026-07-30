import { NextResponse } from "next/server";
import { pruefeDomain } from "@/lib/funnel/domain";

export const dynamic = "force-dynamic";

/**
 * Verfügbarkeitsprüfung für den Konfigurator.
 *
 * Läuft serverseitig, weil die RDAP-Dienste der Registries keine
 * Cross-Origin-Anfragen aus dem Browser erlauben.
 */
export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get("name") ?? "";

  // Deckel gegen Missbrauch als fremdnutzbarer Prüfdienst.
  if (name.length > 100) {
    return NextResponse.json({ error: "Eingabe zu lang" }, { status: 400 });
  }

  const ergebnis = await pruefeDomain(name);

  return NextResponse.json(ergebnis, {
    // Vergebene Domains ändern sich fast nie, freie sollen nicht veralten.
    headers: {
      "Cache-Control":
        ergebnis.status === "vergeben"
          ? "public, max-age=86400"
          : "public, max-age=300",
    },
  });
}
