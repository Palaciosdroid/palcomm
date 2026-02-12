'use client';

import { useState, useEffect } from 'react';
import { defaultContent, saveContent } from '@/lib/content';
import type { SiteContent, SectionKey } from '@/types/content';
import { Save, RotateCcw, ChevronDown, ChevronRight, Check, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Section Labels auf Deutsch
const sectionLabels: Record<SectionKey, string> = {
  practiceInfo: 'Praxis-Informationen',
  navigation: 'Navigation',
  hero: 'Hero-Sektion',
  welcome: 'Willkommen / Über mich',
  philosophy: 'Philosophie',
  therapy: 'Therapieangebot',
  certificates: 'Zertifikate',
  testimonials: 'Kundenstimmen',
  pricing: 'Konditionen',
  disclaimer: 'Wichtige Hinweise',
  contact: 'Kontakt',
  footer: 'Footer',
};

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set(['hero']));
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Content von API laden
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  const toggleSection = (key: SectionKey) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleChange = (sectionKey: SectionKey, path: string[], value: unknown) => {
    const newContent = JSON.parse(JSON.stringify(content)) as SiteContent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = newContent[sectionKey];

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    setContent(newContent);
    // Auch lokal speichern für sofortige Vorschau
    saveContent(newContent);
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Über API speichern (persistent)
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        // Auch lokal speichern
        saveContent(content);
        setSaved(true);
        setHasChanges(false);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Alle Änderungen zurücksetzen? Dies stellt die Standard-Inhalte wieder her.')) {
      setContent(defaultContent);
      saveContent(defaultContent);

      // Auch auf Server zurücksetzen
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultContent),
      });

      setHasChanges(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Website bearbeiten</h1>
            <p className="text-sm text-gray-500">Alle Texte und Inhalte anpassen</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ExternalLink className="w-4 h-4" />
              Vorschau
            </Link>
            <Link
              href="/admin/blog"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              Blog
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Zurücksetzen
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                saved
                  ? 'bg-green-500 text-white'
                  : hasChanges && !isSaving
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Speichert...
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Gespeichert
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Speichern
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {(Object.keys(sectionLabels) as SectionKey[]).map((sectionKey) => (
            <SectionEditor
              key={sectionKey}
              sectionKey={sectionKey}
              label={sectionLabels[sectionKey]}
              data={content[sectionKey]}
              isExpanded={expandedSections.has(sectionKey)}
              onToggle={() => toggleSection(sectionKey)}
              onChange={(path, value) => handleChange(sectionKey, path, value)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

interface SectionEditorProps {
  sectionKey: SectionKey;
  label: string;
  data: SiteContent[SectionKey];
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (path: string[], value: unknown) => void;
}

function SectionEditor({ sectionKey, label, data, isExpanded, onToggle, onChange }: SectionEditorProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{label}</span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t">
          <div className="pt-4 space-y-4">
            <FieldRenderer
              data={data}
              path={[]}
              onChange={onChange}
              sectionKey={sectionKey}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface FieldRendererProps {
  data: unknown;
  path: string[];
  onChange: (path: string[], value: unknown) => void;
  sectionKey: SectionKey;
  fieldLabel?: string;
}

// Deutsche Labels für Felder
const fieldLabels: Record<string, string> = {
  name: 'Name',
  title: 'Titel',
  text: 'Text',
  description: 'Beschreibung',
  intro: 'Einleitung',
  subtitle: 'Untertitel',
  phone: 'Telefon',
  email: 'E-Mail',
  website: 'Website',
  street: 'Strasse',
  city: 'Stadt',
  country: 'Land',
  href: 'Link',
  image: 'Bild-URL',
  icon: 'Icon',
  ctaText: 'Button-Text',
  ctaLink: 'Button-Link',
  quote: 'Zitat',
  author: 'Autor',
  role: 'Rolle',
  location: 'Ort',
  rating: 'Bewertung',
  firstName: 'Vorname',
  lastName: 'Nachname',
  message: 'Nachricht',
  submitText: 'Senden-Button',
  privacyText: 'Datenschutz-Text',
  successTitle: 'Erfolgs-Titel',
  successMessage: 'Erfolgs-Nachricht',
  copyright: 'Copyright',
  tagline: 'Tagline',
  fullName: 'Voller Name',
  aboutTitle: 'Über-Titel',
  aboutText: 'Über-Text',
  targetGroupsTitle: 'Zielgruppen-Titel',
  topicsTitle: 'Themen-Titel',
  hourlyRate: 'Stundensatz',
  duration: 'Dauer',
  methods: 'Zahlungsmethoden',
  cost: 'Kosten',
  buttonText: 'Button-Text',
  external: 'Externer Link',
};

function FieldRenderer({ data, path, onChange, sectionKey, fieldLabel }: FieldRendererProps) {
  if (data === null || data === undefined) {
    return null;
  }

  // Array handling
  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {fieldLabel && (
          <label className="block text-sm font-medium text-gray-700">{fieldLabel}</label>
        )}
        {data.map((item, index) => (
          <div key={index} className="pl-4 border-l-2 border-gray-200">
            <div className="text-xs text-gray-400 mb-2">#{index + 1}</div>
            <FieldRenderer
              data={item}
              path={[...path, String(index)]}
              onChange={onChange}
              sectionKey={sectionKey}
            />
          </div>
        ))}
      </div>
    );
  }

  // Object handling
  if (typeof data === 'object') {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          // Skip id fields
          if (key === 'id') return null;

          const label = fieldLabels[key] || key;

          return (
            <FieldRenderer
              key={key}
              data={value}
              path={[...path, key]}
              onChange={onChange}
              sectionKey={sectionKey}
              fieldLabel={label}
            />
          );
        })}
      </div>
    );
  }

  // String handling - lange Texte als Textarea
  if (typeof data === 'string') {
    const isLongText = data.length > 100 || data.includes('\n');
    const isUrl = path[path.length - 1]?.includes('href') ||
                  path[path.length - 1]?.includes('link') ||
                  path[path.length - 1]?.includes('Link') ||
                  path[path.length - 1]?.includes('image') ||
                  path[path.length - 1]?.includes('phone');

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {fieldLabel}
        </label>
        {isLongText ? (
          <textarea
            value={data}
            onChange={(e) => onChange(path, e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y text-gray-900"
          />
        ) : (
          <input
            type={isUrl ? 'text' : 'text'}
            value={data}
            onChange={(e) => onChange(path, e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
              isUrl ? 'font-mono text-sm' : ''
            }`}
          />
        )}
      </div>
    );
  }

  // Number handling
  if (typeof data === 'number') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {fieldLabel}
        </label>
        <input
          type="number"
          value={data}
          onChange={(e) => onChange(path, Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        />
      </div>
    );
  }

  // Boolean handling
  if (typeof data === 'boolean') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data}
          onChange={(e) => onChange(path, e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">{fieldLabel}</label>
      </div>
    );
  }

  return null;
}
