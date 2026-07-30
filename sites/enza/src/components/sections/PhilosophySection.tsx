"use client";

import { motion } from "framer-motion";
import { philosophyContent as defaultPhilosophyContent } from "@/lib/data";
import type { PhilosophyContent } from "@/types/content";

interface PhilosophySectionProps {
  content?: PhilosophyContent;
}

export default function PhilosophySection({ content }: PhilosophySectionProps) {
  const data = content || defaultPhilosophyContent;
  const paragraphs = data.text.split('\n\n').filter(p => p.trim());

  return (
    <section className="relative section-padding pb-28 bg-sage-200">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {data.title}
        </motion.h2>

        {/* Philosophy Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-text-medium leading-relaxed mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-20"
        >
          <a href={data.ctaLink} className="btn-secondary">
            {data.ctaText}
          </a>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-sage-100/50 rounded-2xl p-10 md:p-14 text-center relative"
        >
          {/* Large Quote Mark */}
          <div className="quote-mark absolute top-4 left-8 select-none">"</div>

          {/* Quote Text */}
          <p
            className="text-xl md:text-2xl text-text-dark leading-relaxed mb-6 relative z-10"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            «{data.quote.text}»
          </p>

          {/* Author */}
          <div className="text-sm text-text-light">
            <span className="font-medium text-text-medium">
              {data.quote.author}
            </span>
            <span className="mx-2">·</span>
            <span>{data.quote.role}</span>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          style={{ marginBottom: "-1px" }}
        >
          <path
            d="M0 50C200 20 400 70 600 40C800 10 1000 60 1200 30C1350 10 1440 40 1440 40V80H0V50Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
