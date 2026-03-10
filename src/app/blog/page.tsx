'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost, getPublishedPosts } from '@/lib/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Metadata wird im Head gesetzt (client component limitation)
// Für statische metadata siehe: generateMetadata in page.tsx (server component)

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPublishedPosts());
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600 mb-12">Gedanken, Tipps und Einblicke rund um Hypnose und Wohlbefinden.</p>

          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">Noch keine Blog-Beiträge vorhanden.</p>
              <p className="text-gray-400 mt-2">Schau bald wieder vorbei!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-primary transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{new Date(post.createdAt).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
