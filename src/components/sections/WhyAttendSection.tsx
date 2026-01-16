"use client";

import { motion } from "framer-motion";
import { Brain, Shield, Zap, Users, Target, Lightbulb } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Wissenschaftlich fundiert",
    description: "Alle Methoden basieren auf neuesten Erkenntnissen der Psychologie und Neurowissenschaft.",
  },
  {
    icon: Zap,
    title: "Sofort anwendbar",
    description: "Praktische Techniken, die du noch am selben Tag in deinem Leben umsetzen kannst.",
  },
  {
    icon: Shield,
    title: "Sichere Umgebung",
    description: "Ein geschützter Raum, in dem du dich öffnen und wachsen kannst.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Vernetze dich mit Gleichgesinnten und baue langfristige Verbindungen auf.",
  },
  {
    icon: Target,
    title: "Klare Ergebnisse",
    description: "Konkrete Strategien, um deine spezifischen Ängste zu überwinden.",
  },
  {
    icon: Lightbulb,
    title: "Neue Perspektiven",
    description: "Erweitere deinen Horizont mit Einsichten von führenden Experten.",
  },
];

export default function WhyAttendSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f5f0e8] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#daaf7a]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#2d2420]/5 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#2d2420] text-[#daaf7a] text-sm font-semibold uppercase tracking-wider mb-4">
            Deine Vorteile
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2420] mb-4">
            Weshalb sollte ich{" "}
            <span className="text-gradient">teilnehmen</span>?
          </h2>
          <p className="text-[#6b5b4f] max-w-2xl mx-auto">
            Der Angstfrei-Tag gibt dir die Werkzeuge, die du brauchst,
            um dein Leben nachhaltig zu verändern.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#daaf7a]/10 hover:border-[#daaf7a]/30">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#2d2420] to-[#1a2d4a] text-[#daaf7a] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#2d2420] mb-2 group-hover:text-[#daaf7a] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[#6b5b4f]">{benefit.description}</p>

                {/* Hover Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#daaf7a]/0 to-transparent rounded-tr-2xl rounded-bl-full group-hover:from-[#daaf7a]/10 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
