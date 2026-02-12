'use client';

import { useState } from 'react';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || 'Anmeldung fehlgeschlagen');
      }
    } catch {
      setError('Verbindungsfehler');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-center text-gray-900 mb-2">
            Admin-Bereich
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Bitte gib das Passwort ein, um fortzufahren
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-center"
                autoFocus
                disabled={isLoading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isLoading || !password
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wird überprüft...
                </>
              ) : (
                'Anmelden'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Passwort vergessen? Kontaktiere den Administrator.
        </p>
      </div>
    </div>
  );
}
