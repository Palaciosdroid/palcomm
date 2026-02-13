'use client';

import { motion } from 'framer-motion';
import type { PhilosophyContent } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface PhilosophySectionEditorProps {
  content: PhilosophyContent;
  onChange: (data: Partial<PhilosophyContent>) => void;
}

export default function PhilosophySectionEditor({ content, onChange }: PhilosophySectionEditorProps) {
  return (
    <section className="relative section-padding pb-28 bg-sage-200">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <EditableBlock
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            as="h2"
            className="text-4xl md:text-5xl font-serif"
            allowHeadings={true}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Titel eingeben..."
          />
        </motion.div>

        {/* Philosophy Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <EditableBlock
            value={content.text}
            onChange={(value) => onChange({ text: value })}
            as="div"
            className="text-text-medium leading-relaxed"
            allowHeadings={true}
            allowLists={true}
            allowQuotes={true}
            allowAlignment={true}
            placeholder="Philosophie-Text eingeben..."
            minHeight="150px"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-20"
        >
          <div className="flex items-center gap-2">
            <EditableBlock
              value={content.ctaText}
              onChange={(value) => onChange({ ctaText: value })}
              as="span"
              className="btn-secondary"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Button-Text..."
            />
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-sage-100/50 rounded-2xl p-10 md:p-14 text-center relative"
        >
          <div className="quote-mark absolute top-4 left-8 select-none">&ldquo;</div>

          <EditableBlock
            value={content.quote.text}
            onChange={(value) => onChange({ quote: { ...content.quote, text: value } })}
            as="div"
            className="text-xl md:text-2xl text-text-dark leading-relaxed mb-6 relative z-10 font-serif"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Zitat eingeben..."
            minHeight="80px"
          />

          <div className="text-sm text-text-light flex items-center justify-center gap-2 flex-wrap">
            <EditableBlock
              value={content.quote.author}
              onChange={(value) => onChange({ quote: { ...content.quote, author: value } })}
              as="span"
              className="font-medium text-text-medium"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Autor..."
            />
            <span>&middot;</span>
            <EditableBlock
              value={content.quote.role}
              onChange={(value) => onChange({ quote: { ...content.quote, role: value } })}
              as="span"
              className=""
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Rolle..."
            />
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none" style={{ marginBottom: "-1px" }}>
          <path d="M0 50C200 20 400 70 600 40C800 10 1000 60 1200 30C1350 10 1440 40 1440 40V80H0V50Z" fill="#fdfcfa" />
        </svg>
      </div>
    </section>
  );
}
