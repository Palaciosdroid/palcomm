"use client";

import { motion } from "framer-motion";
import { contactContent } from "@/lib/data";

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
          className="text-3xl md:text-4xl text-center mb-12"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {contactContent.title}
        </motion.h2>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                placeholder={contactContent.fields.firstName}
                className="input-soft"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder={contactContent.fields.lastName}
                className="input-soft"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder={contactContent.fields.email}
              className="input-soft"
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder={contactContent.fields.phone}
              className="input-soft"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              rows={5}
              placeholder={contactContent.fields.message}
              className="input-soft resize-none"
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
