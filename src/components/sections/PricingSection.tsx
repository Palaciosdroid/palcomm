"use client";

import { motion } from "framer-motion";
import { Clock, Banknote, Phone, Car, Info, AlertCircle, Percent } from "lucide-react";
import Image from "next/image";

export default function PricingSection() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
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

        {/* Free Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-sage-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Phone className="w-6 h-6 text-brand" />
            </div>
            <div>
              <p className="font-medium text-text-dark">Kostenloses Kennenlerngespräch</p>
              <p className="text-sm text-text-medium">15 Min. telefonisch – unverbindlich</p>
            </div>
          </div>
          <a
            href="tel:+41794162223"
            className="btn-secondary text-sm whitespace-nowrap"
          >
            Jetzt anrufen
          </a>
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-medium mb-8"
        >
          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-6xl font-medium text-text-dark">
                150
              </span>
              <span className="text-2xl text-text-medium">CHF</span>
              <span className="text-text-light ml-2">/ Stunde</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider-soft mb-8" />

          {/* Session Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">Erstsitzung + Anamnese</p>
                <p className="text-sm text-text-light">
                  ca. 1.5 – 2 Stunden
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">Folgesitzungen</p>
                <p className="text-sm text-text-light">
                  ca. 1 – 1.5 Stunden
                </p>
              </div>
            </div>
          </div>

          {/* Discount Box */}
          <div className="bg-sage-50 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Percent className="w-5 h-5 text-brand" />
              <p className="font-medium text-text-dark">20% Ermässigung</p>
            </div>
            <p className="text-sm text-text-medium">
              für Kinder & Jugendliche (6–18 Jahre), Studierende, IV-Bezüger und Pensionierte
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <p className="font-medium text-text-dark mb-4">Bezahlung nach jeder Sitzung</p>
            <div className="flex flex-wrap gap-4">
              {/* Bar */}
              <div className="flex items-center gap-3 px-5 py-3 bg-sage-50 rounded-xl">
                <Banknote className="w-6 h-6 text-sage-600" />
                <span className="font-medium text-text-dark">Bar</span>
              </div>
              {/* Twint */}
              <div className="flex items-center gap-3 px-5 py-3 bg-[#00A0E4]/10 rounded-xl">
                <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                  <rect width="32" height="32" rx="6" fill="#00A0E4"/>
                  <path d="M8 11h6v10H8z" fill="white"/>
                  <path d="M18 11h6v10h-6z" fill="white"/>
                </svg>
                <span className="font-medium text-text-dark">Twint</span>
              </div>
            </div>
          </div>

          {/* House Visits */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <p className="font-medium text-text-dark">Hausbesuche möglich</p>
              <p className="text-sm text-text-light">
                zzgl. CHF 1.50 pro Kilometer Anfahrt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Cancellation */}
          <div className="flex items-start gap-3 p-4 bg-cream-100 rounded-xl">
            <Info className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <span className="font-medium">Terminabsage:</span> Bitte spätestens 24 Stunden vorher absagen,
              andernfalls wird die Sitzung verrechnet.
            </p>
          </div>

          {/* Insurance Note */}
          <div className="flex items-start gap-3 p-4 bg-cream-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <span className="font-medium">Krankenkasse:</span> Die Hypnosetherapie ist in der Schweiz noch
              nicht von allen Krankenkassen anerkannt. Die EGK beteiligt sich bereits an den Kosten.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a href="#kontakt" className="btn-primary">
            Termin vereinbaren
          </a>
        </motion.div>
      </div>
    </section>
  );
}
