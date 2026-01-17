"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Bug,
  AlertTriangle,
  Sun,
  Cigarette,
  Unlock,
  Moon,
  HeartPulse,
  Scale,
  Flower2,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { therapyContent } from "@/lib/data";

const topicIconMap: { [key: string]: React.ReactNode } = {
  bug: <Bug className="w-5 h-5" />,
  "alert-triangle": <AlertTriangle className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  cigarette: <Cigarette className="w-5 h-5" />,
  unlock: <Unlock className="w-5 h-5" />,
  moon: <Moon className="w-5 h-5" />,
  "heart-pulse": <HeartPulse className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
  flower: <Flower2 className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
};

export default function TherapySection() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (id: string) => {
    setExpandedGroup(expandedGroup === id ? null : id);
  };

  return (
    <section id="therapieangebot" className="section-padding bg-cream-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-6"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyContent.title}
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          {therapyContent.intro}
        </motion.p>

        {/* Zielgruppen - mit Bildern */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-center mb-10"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyContent.targetGroupsTitle}
        </motion.h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {therapyContent.targetGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300 cursor-pointer"
              onClick={() => toggleGroup(group.id)}
            >
              {/* Bild */}
              <div className="relative h-40 bg-sage-100">
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-text-dark">
                    {group.title}
                  </h4>
                  <motion.div
                    animate={{ rotate: expandedGroup === group.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-text-light" />
                  </motion.div>
                </div>

                {/* Expandable Description */}
                <AnimatePresence>
                  {expandedGroup === group.id && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-text-light text-sm leading-relaxed mt-3 overflow-hidden"
                    >
                      {group.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Themenspezifisch - mit Icons */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-center mb-10"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyContent.topicsTitle}
        </motion.h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {therapyContent.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-sage-200 hover:border-brand hover:shadow-soft transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                {topicIconMap[topic.icon]}
              </div>
              <span className="text-sm text-center font-medium text-text-dark">
                {topic.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
