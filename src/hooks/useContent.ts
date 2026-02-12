'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SiteContent, SectionKey } from '@/types/content';
import { getContent, saveContent, getSection, saveSection, defaultContent, resetSection } from '@/lib/content';

// Hook für den gesamten Content
export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setContent(getContent());
    setIsLoading(false);
  }, []);

  const updateContent = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    saveContent(newContent);
  }, []);

  const updateSection = useCallback(<K extends SectionKey>(key: K, data: SiteContent[K]) => {
    setContent(prev => {
      const updated = { ...prev, [key]: data };
      saveContent(updated);
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    setContent(defaultContent);
    saveContent(defaultContent);
  }, []);

  return { content, isLoading, updateContent, updateSection, reset };
}

// Hook für eine einzelne Sektion
export function useSectionContent<K extends SectionKey>(key: K) {
  const [data, setData] = useState<SiteContent[K]>(defaultContent[key]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(getSection(key));
    setIsLoading(false);
  }, [key]);

  const update = useCallback((newData: SiteContent[K]) => {
    setData(newData);
    saveSection(key, newData);
  }, [key]);

  const reset = useCallback(() => {
    const defaultData = defaultContent[key];
    setData(defaultData);
    resetSection(key);
  }, [key]);

  return { data, isLoading, update, reset };
}
