'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhilosophyContent } from '@/types/content';

interface PhilosophySectionEditorProps {
  content: PhilosophyContent;
  onChange: (data: Partial<PhilosophyContent>) => void;
}

function EditableField({
  value,
  onChange,
  className = '',
  multiline = false,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setEditValue(value);
            setIsEditing(false);
          }
        }}
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-3 focus:outline-none min-h-[150px] ${className}`}
        autoFocus
      />
    ) : (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') {
            setEditValue(value);
            setIsEditing(false);
          }
        }}
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-2 focus:outline-none text-center ${className}`}
        autoFocus
      />
    );
  }

  return (
    <div
      className={`${className} cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 hover:rounded transition-all`}
      onClick={() => setIsEditing(true)}
      title="Klicken zum Bearbeiten"
    >
      {value}
    </div>
  );
}

export default function PhilosophySectionEditor({ content, onChange }: PhilosophySectionEditorProps) {
  const paragraphs = content.text.split('\n\n').filter(p => p.trim());

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
          <EditableField
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            className="text-4xl md:text-5xl font-serif"
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
          <EditableField
            value={content.text}
            onChange={(value) => onChange({ text: value })}
            multiline
            className="text-text-medium leading-relaxed"
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
            <EditableField
              value={content.ctaText}
              onChange={(value) => onChange({ ctaText: value })}
              className="btn-secondary"
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

          <EditableField
            value={content.quote.text}
            onChange={(value) => onChange({ quote: { ...content.quote, text: value } })}
            multiline
            className="text-xl md:text-2xl text-text-dark leading-relaxed mb-6 relative z-10 font-serif"
          />

          <div className="text-sm text-text-light">
            <EditableField
              value={content.quote.author}
              onChange={(value) => onChange({ quote: { ...content.quote, author: value } })}
              className="font-medium text-text-medium inline"
            />
            <span className="mx-2">&middot;</span>
            <EditableField
              value={content.quote.role}
              onChange={(value) => onChange({ quote: { ...content.quote, role: value } })}
              className="inline"
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
