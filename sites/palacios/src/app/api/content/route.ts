import { NextResponse } from "next/server";
import type { SiteContent } from "@/types/content";
import { readContent, writeContent } from "@/lib/content-store";
import { isAuthenticated } from "@/lib/auth";

// GET — Inhalte abrufen (öffentlich, die Seite zeigt sie ohnehin an)
export async function GET() {
  try {
    return NextResponse.json(await readContent());
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json({ error: "Inhalte nicht lesbar" }, { status: 500 });
  }
}

// PUT — Inhalte speichern (nur mit gültiger Admin-Session)
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  try {
    const content: SiteContent = await request.json();

    if (!content || typeof content !== "object" || !content.business) {
      return NextResponse.json({ error: "Ungültige Inhalte" }, { status: 400 });
    }

    const storage = await writeContent(content);
    return NextResponse.json({ success: true, storage });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json({ error: "Speichern fehlgeschlagen" }, { status: 500 });
  }
}
