"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ImpressionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Einblicke
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Ein geschützter Rahmen für Deinen Weg zu mehr Wohlbefinden
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300"
          >
            <Image
              src="/images/therapie_01.jpg"
              alt="Hypnosetherapie Sitzung mit Enza Gasser-Fiorini in Bern"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300"
          >
            <Image
              src="/images/praxis_01.jpg"
              alt="Praxis für Hypnosetherapie in Bern - Hypnose Enza"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
