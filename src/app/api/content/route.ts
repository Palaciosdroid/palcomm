import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import type { SiteContent } from '@/types/content';
import { defaultContent } from '@/lib/content';

// Redis Client (lazy initialization)
let redis: Redis | null = null;

// Content version - increment when critical defaults change (email, phone, etc.)
const CONTENT_VERSION = 2;
const VERSION_KEY = 'site:content:version';

function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }

  return redis;
}

// In-Memory Cache für Development (Fallback)
let cachedContent: SiteContent | null = null;

const CONTENT_KEY = 'site:content';

// GET: Content abrufen
export async function GET() {
  try {
    const redisClient = getRedis();

    // Wenn Redis verfügbar, von dort laden
    if (redisClient) {
      try {
        // Check version - reset practiceInfo if version changed
        const storedVersion = await redisClient.get(VERSION_KEY);
        const currentVersion = storedVersion ? parseInt(storedVersion, 10) : 0;

        const stored = await redisClient.get(CONTENT_KEY);
        if (stored) {
          let content = JSON.parse(stored);

          // Version changed - reset practiceInfo and footer to defaults
          if (currentVersion < CONTENT_VERSION) {
            content.practiceInfo = defaultContent.practiceInfo;
            content.footer = defaultContent.footer;
            // Save updated content and version
            await redisClient.set(CONTENT_KEY, JSON.stringify(content));
            await redisClient.set(VERSION_KEY, CONTENT_VERSION.toString());
            cachedContent = content;
          }

          return NextResponse.json(content);
        }
      } catch (redisError) {
        console.error('Redis GET error:', redisError);
        // Fallback to memory cache
      }
    }

    // Fallback: In-Memory Cache (Development)
    if (cachedContent) {
      return NextResponse.json(cachedContent);
    }

    // Default Content zurückgeben
    return NextResponse.json(defaultContent);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(defaultContent);
  }
}

// PUT: Content speichern
export async function PUT(request: Request) {
  try {
    const content: SiteContent = await request.json();
    const redisClient = getRedis();

    // Wenn Redis verfügbar, dort speichern
    if (redisClient) {
      try {
        await redisClient.set(CONTENT_KEY, JSON.stringify(content));
        // Auch im Memory Cache speichern für schnellere Zugriffe
        cachedContent = content;
        return NextResponse.json({ success: true, storage: 'redis' });
      } catch (redisError) {
        console.error('Redis SET error:', redisError);
        // Fallback to memory cache
      }
    }

    // Fallback: In-Memory Cache (Development)
    cachedContent = content;
    return NextResponse.json({ success: true, storage: 'memory' });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
