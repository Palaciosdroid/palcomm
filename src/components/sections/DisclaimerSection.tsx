"use client";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Shield } from "lucide-react";
import { therapyDisclaimer } from "@/lib/data";

const icons = [
  <AlertCircle key="alert" className="w-5 h-5" />,
  <Heart key="heart" className="w-5 h-5" />,
  <Shield key="shield" className="w-5 h-5" />,
];

export default function DisclaimerSection() {
  return (
    <section className="py-12 bg-sage-100/50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl text-center mb-8"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyDisclaimer.title}
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {therapyDisclaimer.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-brand">
                {icons[index]}
              </div>
              <h4 className="font-medium text-text-dark mb-2 text-sm">
                {item.title}
              </h4>
              <p className="text-text-light text-xs leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
