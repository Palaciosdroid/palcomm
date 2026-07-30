'use client';

import { useState, useEffect } from 'react';
import { defaultContent, saveContent } from '@/lib/content';
import type { SiteContent } from '@/types/content';
import { Save, RotateCcw, Check, Eye, Loader2, LogOut, Settings, Palette } from 'lucide-react';
import Link from 'next/link';
import AdminLogin from '@/components/admin/AdminLogin';
import DesignPanel from '@/components/admin/DesignPanel';
import ThemeProvider from '@/components/providers/ThemeProvider';

// Import all section components for visual editing
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSectionEditor from '@/components/admin/sections/HeroSectionEditor';
import WelcomeSectionEditor from '@/components/admin/sections/WelcomeSectionEditor';
import PhilosophySectionEditor from '@/components/admin/sections/PhilosophySectionEditor';
import ServicesSectionEditor from '@/components/admin/sections/ServicesSectionEditor';
import TestimonialsSectionEditor from '@/components/admin/sections/TestimonialsSectionEditor';
import CertificatesSectionEditor from '@/components/admin/sections/CertificatesSectionEditor';
import PricingSectionEditor from '@/components/admin/sections/PricingSectionEditor';
import DisclaimerSectionEditor from '@/components/admin/sections/DisclaimerSectionEditor';
import ContactSectionEditor from '@/components/admin/sections/ContactSectionEditor';

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

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

  // Content von API laden
  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  const updateContent = (section: keyof SiteContent, data: Partial<SiteContent[keyof SiteContent]>) => {
    const newContent = {
      ...content,
      [section]: { ...content[section], ...data },
    };
    setContent(newContent);
    saveContent(newContent);
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
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

      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultContent),
      });

      setHasChanges(false);
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Admin Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Visueller Editor</h1>
              <p className="text-xs text-gray-500">Klicke auf Texte zum Bearbeiten</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Vorschau
            </Link>

            <button
              onClick={() => { setShowDesign(!showDesign); setShowSettings(false); }}
              title="Farben & Schrift"
              className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg ${showDesign ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Palette className="w-4 h-4" />
              Design
            </button>

            <button
              onClick={() => { setShowSettings(!showSettings); setShowDesign(false); }}
              className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg ${showSettings ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" />
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

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 border rounded-lg"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Design Panel — Farben und Schrift */}
        {showDesign && (
          <div className="border-t bg-gray-50 px-4 py-6 max-h-[70vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <DesignPanel
                theme={content.theme}
                onChange={(theme) => updateContent('theme', theme)}
              />
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t bg-gray-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Praxis-Informationen</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={content.business.name}
                    onChange={(e) => updateContent('business', { name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Telefon</label>
                  <input
                    type="text"
                    value={content.business.phone}
                    onChange={(e) => updateContent('business', { phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">E-Mail</label>
                  <input
                    type="email"
                    value={content.business.email}
                    onChange={(e) => updateContent('business', { email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Stadt</label>
                  <input
                    type="text"
                    value={content.business.address.city}
                    onChange={(e) => updateContent('business', { address: { ...content.business.address, city: e.target.value } })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live-Vorschau der gewählten Palette und Schrift */}
      <ThemeProvider theme={content.theme} />

      {/* Visual Website Preview with Inline Editing */}
      <main className={`min-h-screen ${showSettings ? 'pt-32' : 'pt-16'}`}>
        <Header content={{ navigation: content.navigation, business: content.business }} />

        <HeroSectionEditor
          content={content.hero}
          onChange={(data) => updateContent('hero', data)}
        />

        <WelcomeSectionEditor
          content={content.welcome}
          business={content.business}
          onChange={(data) => updateContent('welcome', data)}
        />

        <PhilosophySectionEditor
          content={content.philosophy}
          onChange={(data) => updateContent('philosophy', data)}
        />

        <ServicesSectionEditor
          content={content.services}
          onChange={(data) => updateContent('services', data)}
        />

        <TestimonialsSectionEditor
          content={content.testimonials}
          onChange={(data) => updateContent('testimonials', data)}
        />

        <CertificatesSectionEditor
          content={content.certificates}
          onChange={(data) => updateContent('certificates', data)}
        />

        <PricingSectionEditor
          content={content.pricing}
          onChange={(data) => updateContent('pricing', data)}
        />

        <DisclaimerSectionEditor
          content={content.disclaimer}
          onChange={(data) => updateContent('disclaimer', data)}
        />

        <ContactSectionEditor
          content={content.contact}
          business={content.business}
          onChange={(data) => updateContent('contact', data)}
        />

        <Footer content={content.footer} business={content.business} />
      </main>
    </div>
  );
}
