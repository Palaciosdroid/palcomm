'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { OutputData } from '@editorjs/editorjs';
import { BlogPost, getAllPosts, savePost, deletePost, createNewPost, generateSlug } from '@/lib/blog';
import { Loader2, LogOut } from 'lucide-react';
import AdminLogin from '@/components/admin/AdminLogin';

const Editor = dynamic(() => import('@/components/blog/Editor'), { ssr: false });

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState<OutputData | undefined>(undefined);
  const [showEditor, setShowEditor] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getAllPosts());
    }
  }, [isAuthenticated]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Bitte gib einen Titel ein.');
      return;
    }

    const postContent = content || { time: Date.now(), blocks: [], version: '2.28.0' };

    if (editingPost) {
      const updatedPost: BlogPost = {
        ...editingPost,
        title,
        slug: generateSlug(title),
        content: postContent,
        excerpt,
        updatedAt: new Date().toISOString()
      };
      savePost(updatedPost);
    } else {
      const newPost = createNewPost(title, postContent, excerpt);
      savePost(newPost);
    }

    setPosts(getAllPosts());
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setShowEditor(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bist du sicher, dass du diesen Beitrag löschen möchtest?')) {
      deletePost(id);
      setPosts(getAllPosts());
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const updatedPost = { ...post, published: !post.published };
    savePost(updatedPost);
    setPosts(getAllPosts());
  };

  const resetForm = () => {
    setEditingPost(null);
    setTitle('');
    setExcerpt('');
    setContent(undefined);
    setShowEditor(false);
  };

  const handleNewPost = () => {
    resetForm();
    setShowEditor(true);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Verwaltung</h1>
          <div className="flex gap-3">
            {!showEditor && (
              <button
                onClick={handleNewPost}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                + Neuer Beitrag
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 border rounded-lg bg-white"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showEditor ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Titel des Beitrags"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kurzbeschreibung</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={2}
                placeholder="Kurze Beschreibung für die Vorschau"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Inhalt</label>
              <Editor
                data={content}
                onChange={setContent}
                placeholder="Schreibe hier deinen Blog-Beitrag..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                {editingPost ? 'Aktualisieren' : 'Speichern'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">Noch keine Blog-Beiträge vorhanden.</p>
                <button
                  onClick={handleNewPost}
                  className="mt-4 text-primary hover:underline"
                >
                  Erstelle deinen ersten Beitrag
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                      <p className="text-gray-500 text-sm mt-1">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>Erstellt: {new Date(post.createdAt).toLocaleDateString('de-DE')}</span>
                        <span className={`px-2 py-1 rounded ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {post.published ? 'Veröffentlicht' : 'Entwurf'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-3 py-1 rounded text-sm ${post.published ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                      >
                        {post.published ? 'Zurückziehen' : 'Veröffentlichen'}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <a href="/admin" className="text-gray-500 hover:text-gray-700">
            ← Zurück zur Website-Bearbeitung
          </a>
          <span className="text-gray-300">|</span>
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}
