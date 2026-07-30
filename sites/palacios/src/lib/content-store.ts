// Server-seitiger Content-Speicher.
//
// Verbindlicher Stand der Website-Inhalte. Liegt in Redis, wenn REDIS_URL
// gesetzt ist; ohne Redis (lokale Entwicklung) im Arbeitsspeicher — dann
// gehen Änderungen beim Neustart verloren, was für die Entwicklung reicht.

import "server-only";
import Redis from "ioredis";
import type { SiteContent } from "@/types/content";
import { defaultContent, mergeContent } from "./content";
import { siteConfig } from "./site-config";

// Der Schlüssel MUSS die Seite enthalten. Mit einem festen Schlüssel würden
// sich zwei Seiten, die sich eine Redis-Instanz teilen, gegenseitig die
// Inhalte überschreiben — lautlos und ohne Fehlermeldung.
const CONTENT_KEY = `site:${siteConfig.domain}:content`;

let redis: Redis | null = null;
let memoryContent: SiteContent | null = null;

function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!redis) redis = new Redis(process.env.REDIS_URL);
  return redis;
}

export async function readContent(): Promise<SiteContent> {
  const client = getRedis();

  if (client) {
    try {
      const stored = await client.get(CONTENT_KEY);
      if (stored) {
        // Über die Defaults legen, damit neu hinzugekommene Felder vorhanden
        // sind, auch wenn der gespeicherte Stand sie noch nicht kennt.
        return mergeContent(defaultContent, JSON.parse(stored));
      }
    } catch (error) {
      console.error("Redis GET error:", error);
    }
  }

  return memoryContent ?? defaultContent;
}

export async function writeContent(content: SiteContent): Promise<"redis" | "memory"> {
  const client = getRedis();

  if (client) {
    try {
      await client.set(CONTENT_KEY, JSON.stringify(content));
      memoryContent = content;
      return "redis";
    } catch (error) {
      console.error("Redis SET error:", error);
    }
  }

  memoryContent = content;
  return "memory";
}
