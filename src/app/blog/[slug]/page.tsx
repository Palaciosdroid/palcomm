'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, getPostBySlug } from '@/lib/blog';
import BlogRenderer from '@/components/blog/BlogRenderer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      const foundPost = getPostBySlug(params.slug as string);
      setPost(foundPost || null);
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Beitrag nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Der gewünschte Blog-Beitrag existiert nicht oder wurde entfernt.</p>
            <Link
              href="/blog"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Zurück zum Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="text-primary hover:underline mb-6 inline-block"
          >
            ← Zurück zum Blog
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-500">
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <BlogRenderer data={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
