"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Bug,
  CloudLightning,
  Sun,
  CigaretteOff,
  Unlock,
  MoonStar,
  HeartPulse,
  Scale,
  Flower2,
  Trophy,
} from "lucide-react";
import { therapyContent } from "@/lib/data";

const topicIconMap: { [key: string]: React.ReactNode } = {
  spider: <Bug className="w-6 h-6" />,
  "cloud-lightning": <CloudLightning className="w-6 h-6" />,
  sun: <Sun className="w-6 h-6" />,
  "cigarette-off": <CigaretteOff className="w-6 h-6" />,
  unlock: <Unlock className="w-6 h-6" />,
  "moon-star": <MoonStar className="w-6 h-6" />,
  "heart-pulse": <HeartPulse className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6" />,
  "flower-2": <Flower2 className="w-6 h-6" />,
  trophy: <Trophy className="w-6 h-6" />,
};

export default function TherapySection() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

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

        {/* Zielgruppen - mit Bildern, immer offen */}
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
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300"
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

              {/* Content - immer offen */}
              <div className="p-5">
                <h4 className="text-lg font-medium text-text-dark mb-2">
                  {group.title}
                </h4>
                <p className="text-text-light text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Themenspezifisch - mit Icons, 3 Spalten */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-center mb-10"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {therapyContent.topicsTitle}
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-4">
          {therapyContent.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-sage-200 hover:border-brand hover:shadow-soft transition-all duration-300 cursor-pointer group w-full min-[400px]:w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)]"
              onClick={() => setExpandedTopic(prev => prev === topic.id ? null : topic.id)}
            >
              <div className="w-12 h-12 rounded-full bg-sage-100 group-hover:bg-brand/10 flex items-center justify-center text-sage-600 group-hover:text-brand transition-colors duration-300">
                {topicIconMap[topic.icon]}
              </div>
              <span className="text-base text-center font-medium text-text-dark">
                {topic.title}
              </span>

              {/* Expandable Description */}
              <AnimatePresence mode="wait">
                {expandedTopic === topic.id && (
                  <motion.p
                    key={topic.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-text-light text-sm leading-relaxed text-center overflow-hidden"
                  >
                    {topic.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
