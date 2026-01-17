"use client";

import { motion } from "framer-motion";
import { User, Baby, Users, Brain, Heart } from "lucide-react";
import { therapyContent } from "@/lib/data";

const iconMap: { [key: string]: React.ReactNode } = {
  user: <User className="w-6 h-6" />,
  baby: <Baby className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
};

export default function TherapySection() {
  return (
    <section id="therapieangebot" className="section-padding bg-cream-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-center mb-6"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
        >
          {therapyContent.title}
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          {therapyContent.intro}
        </motion.p>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapyContent.categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-soft p-6"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mb-4">
                {iconMap[category.icon]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-text-dark mb-3">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-text-light text-sm leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
