"use client";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Shield, LifeBuoy } from "lucide-react";
import { defaultContent } from "@/lib/content";
import type { DisclaimerContent } from "@/types/content";

// Reihenfolge: Ergänzende Begleitung, Laufende Behandlung, Kein
// Heilversprechen, Im Notfall. Der Zugriff ist bewusst umlaufend (Modulo) —
// so bleibt jede Karte bebildert, auch wenn jemand einen Hinweis ergänzt.
const icons = [
  <Heart key="heart" className="w-6 h-6" />,
  <AlertCircle key="alert" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
  <LifeBuoy key="lifebuoy" className="w-6 h-6" />,
];

interface DisclaimerSectionProps {
  content?: DisclaimerContent;
}

export default function DisclaimerSection({ content }: DisclaimerSectionProps) {
  const data = content || defaultContent.disclaimer;

  return (
    <section className="section-padding bg-accent-100/50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-center mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card flex flex-col items-center text-center h-full"
            >
              <div className="w-14 h-14 rounded-full bg-accent-100 mb-5 flex items-center justify-center text-brand">
                {icons[index % icons.length]}
              </div>
              <h3 className="font-medium text-text-dark mb-3 text-lg">
                {item.title}
              </h3>
              <p className="text-text-medium text-base leading-relaxed flex-grow">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
