import { NextResponse } from 'next/server';
import type { SiteContent } from '@/types/content';
import { defaultContent } from '@/lib/content';

// In-Memory Cache für Development
let cachedContent: SiteContent | null = null;

// GET: Content abrufen
export async function GET() {
  try {
    // Für Cloudflare KV (wenn deployed)
    // @ts-expect-error - Cloudflare KV binding
    if (typeof process.env.SITE_CONTENT !== 'undefined' && process.env.SITE_CONTENT?.get) {
      // @ts-expect-error - Cloudflare KV binding
      const stored = await process.env.SITE_CONTENT.get('content', 'json');
      if (stored) {
        return NextResponse.json(stored);
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

    // Für Cloudflare KV (wenn deployed)
    // @ts-expect-error - Cloudflare KV binding
    if (typeof process.env.SITE_CONTENT !== 'undefined' && process.env.SITE_CONTENT?.put) {
      // @ts-expect-error - Cloudflare KV binding
      await process.env.SITE_CONTENT.put('content', JSON.stringify(content));
      return NextResponse.json({ success: true, storage: 'kv' });
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
