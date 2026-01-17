"use client";

import { motion } from "framer-motion";
import { Clock, CreditCard, Info } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-12"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Konditionen
        </motion.h2>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-medium"
        >
          {/* Price */}
          <div className="text-center mb-8">
            <p className="text-text-light text-sm mb-2">Sitzung à 60 Minuten</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-6xl font-medium text-text-dark">
                150
              </span>
              <span className="text-2xl text-text-medium">CHF</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider-soft mb-8" />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">Erstgespräch</p>
                <p className="text-sm text-text-light">
                  Das Erstgespräch dauert ca. 90 Minuten und dient dem gegenseitigen Kennenlernen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">Bezahlung</p>
                <p className="text-sm text-text-light">
                  Bar oder per Überweisung. Keine Krankenkassen-Anerkennung.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">Absage</p>
                <p className="text-sm text-text-light">
                  Termine können bis 24 Stunden vorher kostenfrei abgesagt werden.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a href="#kontakt" className="btn-primary">
              Termin vereinbaren
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
