"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { contactContent, practiceInfo } from "@/lib/data";

export default function ContactSection() {
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
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://hypnose-enza.ch'}/#kontakt`} />
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
