"use client";

import { motion } from "framer-motion";
import { welcomeContent } from "@/lib/data";

export default function WelcomeSection() {
  return (
    <section id="ueber-mich" className="section-padding bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-center mb-6"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {welcomeContent.title}
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          {welcomeContent.intro}
        </motion.p>

        {/* Portrait and Bio */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-sage-100 rounded-[60%_40%_50%_50%] -rotate-6" />

              {/* Image Container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 portrait-frame bg-sage-200">
                {/* Placeholder for portrait image */}
                <div className="w-full h-full flex items-center justify-center text-sage-400">
                  <svg
                    className="w-24 h-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-text-medium leading-relaxed mb-6">
              <span className="text-sage-600 font-medium">Mein Name ist </span>
              <span className="text-text-dark font-medium">Enza Gasser-Piscitelli</span>
              , ich bin verheiratet und Mutter von 2 erwachsenen Söhnen und
              praktiziere Homöo. Meine Eltern waren Italiener (Mein Vater(*) und
              meine Mutter waren gelernte Angestellte). Ich wuchs zweisprachig mit
              einer stark 12jährigen Schwester in Bern auf. Von meiner Familie habe
              ich die Wertschätzung und respektvoller Umgang mit Menschen, Tiere und
              Umwelt mitgegeben.
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p
            className="text-xl md:text-2xl text-text-light italic max-w-2xl mx-auto"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            {welcomeContent.quote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
