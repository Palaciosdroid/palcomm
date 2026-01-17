"use client";

import { motion } from "framer-motion";
import { philosophyContent } from "@/lib/data";

export default function PhilosophySection() {
  return (
    <section className="relative section-padding pb-28 bg-sage-200">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {philosophyContent.title}
        </motion.h2>

        {/* Philosophy Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <p className="text-text-medium leading-relaxed mb-6">
            Sind Deine Gefühle, Ängste und Glaubenssätze wirklich berechtigt, Dich
            zu blockieren? Hypnose ist ein sanfter, geistiger Zustand des
            Unterbewusstseins. Mit der Imagination suchen wir auf Deiner Reise neue
            Ressourcen die Dich Dein Unterbewusstsein positiv stärken.
          </p>
          <p className="text-text-medium leading-relaxed">
            Die Lösungsorientierte Methode nach{" "}
            <span className="text-sage-600 font-medium">Gabriel Palacios</span>{" "}
            Hypnoseexperte hilft Dir dabei die Blockaden nachhaltig zu befreien.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-20"
        >
          <a href={philosophyContent.ctaLink} className="btn-secondary">
            {philosophyContent.ctaText}
          </a>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-sage-100/50 rounded-2xl p-10 md:p-14 text-center relative"
        >
          {/* Large Quote Mark */}
          <div className="quote-mark absolute top-4 left-8 select-none">"</div>

          {/* Quote Text */}
          <p
            className="text-xl md:text-2xl text-text-dark leading-relaxed mb-6 relative z-10"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            «{philosophyContent.quote.text}»
          </p>

          {/* Author */}
          <div className="text-sm text-text-light">
            <span className="font-medium text-text-medium">
              {philosophyContent.quote.author}
            </span>
            <span className="mx-2">·</span>
            <span>{philosophyContent.quote.role}</span>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50C200 20 400 70 600 40C800 10 1000 60 1200 30C1350 10 1440 40 1440 40V80H0V50Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
