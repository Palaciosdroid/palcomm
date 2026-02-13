'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { WelcomeContent, PracticeInfo } from '@/types/content';

interface WelcomeSectionEditorProps {
  content: WelcomeContent;
  practiceInfo: PracticeInfo;
  onChange: (data: Partial<WelcomeContent>) => void;
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
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-3 focus:outline-none min-h-[100px] ${className}`}
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
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-2 focus:outline-none ${className}`}
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

export default function WelcomeSectionEditor({ content, practiceInfo, onChange }: WelcomeSectionEditorProps) {
  return (
    <section id="ueber-mich" className="relative section-padding pb-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
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

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <EditableField
            value={content.intro}
            onChange={(value) => onChange({ intro: value })}
            multiline
            className="text-text-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Rainbow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <div
            className="w-6 h-6 rounded-full flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #24408E 80%, #732982 100%)"
            }}
          />
          <span className="text-text-medium text-sm italic">
            Alle sind willkommen
          </span>
        </motion.div>

        {/* Portrait and Bio */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-sage-100 rounded-[60%_40%_50%_50%] -rotate-6" />
              <div className="relative w-64 h-80 md:w-72 md:h-96 portrait-frame overflow-hidden">
                <Image
                  src={content.image}
                  alt={practiceInfo.fullName}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EditableField
              value={content.aboutText}
              onChange={(value) => onChange({ aboutText: value })}
              multiline
              className="text-text-medium text-lg leading-relaxed"
            />
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center py-12 px-6 bg-sage-100/50 rounded-2xl"
        >
          <EditableField
            value={content.quote}
            onChange={(value) => onChange({ quote: value })}
            multiline
            className="quote-text max-w-2xl mx-auto"
          />
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none" style={{ marginBottom: "-1px" }}>
          <path d="M0 40C240 70 480 20 720 50C960 80 1200 30 1440 60V80H0V40Z" fill="#e5ebe3" />
        </svg>
      </div>
    </section>
  );
}
