import { OutputData } from '@editorjs/editorjs';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: OutputData;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

const STORAGE_KEY = 'blog_posts';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getAllPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
  return getAllPosts().find(post => post.id === id);
}

export function savePost(post: BlogPost): void {
  const posts = getAllPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);

  if (existingIndex >= 0) {
    posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    posts.push(post);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(id: string): void {
  const posts = getAllPosts().filter(post => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function createNewPost(title: string, content: OutputData, excerpt: string): BlogPost {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    slug: generateSlug(title),
    content,
    excerpt,
    createdAt: now,
    updatedAt: now,
    published: false
  };
}
