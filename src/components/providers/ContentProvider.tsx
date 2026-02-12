'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SiteContent } from '@/types/content';
import { getContent, defaultContent } from '@/lib/content';

interface ContentContextType {
  content: SiteContent;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  isLoading: true,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Content aus localStorage laden
    const loadedContent = getContent();
    setContent(loadedContent);
    setIsLoading(false);

    // Auf Storage-Änderungen hören (wenn Admin-Tab offen ist)
    const handleStorage = () => {
      setContent(getContent());
    };

    window.addEventListener('storage', handleStorage);

    // Custom Event für Same-Tab Updates
    window.addEventListener('content-updated', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('content-updated', handleStorage);
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
