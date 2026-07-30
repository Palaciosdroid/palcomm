"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import { defaultContent } from "@/lib/content";
import type { ContactContent, BusinessInfo } from "@/types/content";

interface ContactSectionProps {
  content?: ContactContent;
  business?: BusinessInfo;
}

export default function ContactSection({ content, business }: ContactSectionProps) {
  const data = content || defaultContent.contact;
  const info = business || defaultContent.business;
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    nachricht: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Fehler beim Senden");
      }

      setShowSuccess(true);
      setFormData({ vorname: "", nachname: "", email: "", telefon: "", nachricht: "" });
      setTimeout(() => setShowSuccess(false), 10000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-base-50">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-8"
        >
          {data.title}
        </motion.h2>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4"
            >
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Nachricht gesendet!</p>
                <p className="text-green-700 text-sm">
                  Vielen Dank für Deine Anfrage. Ich melde mich so schnell wie möglich bei Dir.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl"
            >
              <p className="font-medium text-red-800">Fehler</p>
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
        >
          <a
            href={`tel:${info.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-text-medium hover:text-brand transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>{info.phone}</span>
          </a>
          <a
            href={`mailto:${info.email}`}
            className="flex items-center gap-2 text-text-medium hover:text-brand transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{info.email}</span>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                placeholder={data.fields.firstName}
                className="input-soft"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="nachname"
                value={formData.nachname}
                onChange={handleChange}
                placeholder={data.fields.lastName}
                className="input-soft"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={data.fields.email}
              className="input-soft"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder={data.fields.phone}
              className="input-soft"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              rows={5}
              placeholder={data.fields.message}
              className="input-soft resize-none"
              required
            />
          </div>

          {/*
            Hinweis zur Datenbearbeitung. Pflicht nach revDSG und DSGVO, und
            der Satz zur Datensparsamkeit schützt zusätzlich: Über dieses
            Formular sollen keine Gesundheitsangaben laufen.
          */}
          <p className="text-sm text-text-light leading-relaxed">
            {data.privacyNotice}{" "}
            <a href="/datenschutz" className="underline hover:text-brand">
              {data.privacyText}
            </a>
          </p>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                data.submitText
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
