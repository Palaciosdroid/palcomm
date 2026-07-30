// Admin-Session.
//
// Das Cookie ist mit HMAC signiert und enthält seine eigene Ablaufzeit. Ohne
// ADMIN_SESSION_SECRET lässt es sich nicht fälschen — entscheidend, weil die
// Session der einzige Schutz vor dem Endpunkt ist, der die Website-Inhalte
// überschreibt.

import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const MAX_AGE_SECONDS = 24 * 60 * 60;

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new Error(
      "ADMIN_SESSION_SECRET ist nicht gesetzt — ohne Secret ist der Admin-Bereich nicht absicherbar."
    );
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);

  if (given.length !== want.length) return false;
  if (!timingSafeEqual(given, want)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/** Prüft die Session des laufenden Requests. */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const store = await cookies();
    return verifySessionToken(store.get(SESSION_COOKIE)?.value);
  } catch {
    return false;
  }
}

/**
 * Passwortvergleich in konstanter Zeit, damit sich das Passwort nicht über
 * Antwortzeiten Zeichen für Zeichen erraten lässt.
 */
export function passwordMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: MAX_AGE_SECONDS,
  path: "/",
};
