import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSessionToken,
  isAuthenticated,
  passwordMatches,
  sessionCookieOptions,
} from "@/lib/auth";

// POST — Anmelden
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || !process.env.ADMIN_SESSION_SECRET) {
      console.error("ADMIN_PASSWORD oder ADMIN_SESSION_SECRET fehlt");
      return NextResponse.json(
        { error: "Admin-Bereich ist nicht konfiguriert" },
        { status: 500 }
      );
    }

    if (typeof password !== "string" || !passwordMatches(password, adminPassword)) {
      return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
    }

    const store = await cookies();
    store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler bei der Anmeldung" }, { status: 500 });
  }
}

// GET — Status abfragen
export async function GET() {
  return NextResponse.json({ authenticated: await isAuthenticated() });
}

// DELETE — Abmelden
export async function DELETE() {
  try {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Abmelden" }, { status: 500 });
  }
}
