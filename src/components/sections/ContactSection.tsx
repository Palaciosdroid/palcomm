"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { contactContent, practiceInfo } from "@/lib/data";

export default function ContactSection() {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check for success parameter in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      // Clean up URL without reload
      window.history.replaceState({}, "", window.location.pathname + "#kontakt");
      // Auto-hide after 10 seconds
      setTimeout(() => setShowSuccess(false), 10000);
    }
  }, []);

  return (
    <section id="kontakt" className="section-padding bg-cream-50">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {contactContent.title}
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

        {/* Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
        >
          <a
            href={`tel:${practiceInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-text-medium hover:text-brand transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>{practiceInfo.phone}</span>
          </a>
          <a
            href={`mailto:${practiceInfo.email}`}
            className="flex items-center gap-2 text-text-medium hover:text-brand transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{practiceInfo.email}</span>
          </a>
        </motion.div>

        {/* Contact Form - FormSubmit.co */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
          action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_CONTACT_EMAIL || practiceInfo.email}`}
          method="POST"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="Neue Kontaktanfrage – Hypnose Enza" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://hypnose-enza.ch'}/?success=true#kontakt`} />

          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="Vorname"
                placeholder={contactContent.fields.firstName}
                className="input-soft"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="Nachname"
                placeholder={contactContent.fields.lastName}
                className="input-soft"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="E-Mail"
              placeholder={contactContent.fields.email}
              className="input-soft"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="Telefon"
              placeholder={contactContent.fields.phone}
              className="input-soft"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="Nachricht"
              rows={5}
              placeholder={contactContent.fields.message}
              className="input-soft resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button type="submit" className="btn-primary w-full md:w-auto">
              {contactContent.submitText}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
