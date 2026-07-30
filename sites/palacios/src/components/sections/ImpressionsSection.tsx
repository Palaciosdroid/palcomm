"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { defaultContent } from "@/lib/content";
import type { ImpressionsContent } from "@/types/content";

interface ImpressionsSectionProps {
  content?: ImpressionsContent;
}

export default function ImpressionsSection({ content }: ImpressionsSectionProps) {
  const data = content || defaultContent.impressions;

  if (data.images.length === 0) return null;

  return (
    <section className="section-padding bg-base-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-4"
        >
          {data.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {data.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {data.images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
