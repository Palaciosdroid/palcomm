"use client";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Shield } from "lucide-react";
import { therapyDisclaimer } from "@/lib/data";

const icons = [
  <AlertCircle key="alert" className="w-6 h-6" />,
  <Heart key="heart" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
];

export default function DisclaimerSection() {
  return (
    <section className="section-padding bg-sage-100/50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-center mb-12"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyDisclaimer.title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {therapyDisclaimer.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-white mx-auto mb-5 flex items-center justify-center text-brand shadow-sm">
                {icons[index]}
              </div>
              <h3 className="font-medium text-text-dark mb-3 text-lg">
                {item.title}
              </h3>
              <p className="text-text-medium text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
