'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { WelcomeContent, BusinessInfo } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface WelcomeSectionEditorProps {
  content: WelcomeContent;
  business: BusinessInfo;
  onChange: (data: Partial<WelcomeContent>) => void;
}

export default function WelcomeSectionEditor({ content, business, onChange }: WelcomeSectionEditorProps) {
  return (
    <section id="ueber-mich" className="relative section-padding pb-28 bg-base-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
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

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <EditableBlock
            value={content.intro}
            onChange={(value) => onChange({ intro: value })}
            as="p"
            className="text-text-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            allowHeadings={false}
            allowLists={true}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Einleitung eingeben..."
            minHeight="80px"
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
              <div className="absolute -inset-4 bg-accent-100 rounded-[60%_40%_50%_50%] -rotate-6" />
              <div className="relative w-64 h-80 md:w-72 md:h-96 portrait-frame overflow-hidden">
                <Image
                  src={content.image}
                  alt={business.fullName}
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
            <EditableBlock
              value={content.aboutText}
              onChange={(value) => onChange({ aboutText: value })}
              as="div"
              className="text-text-medium text-lg leading-relaxed"
              allowHeadings={true}
              allowLists={true}
              allowQuotes={true}
              allowAlignment={true}
              placeholder="Über mich Text eingeben..."
              minHeight="150px"
            />
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center py-12 px-6 bg-accent-100/50 rounded-2xl"
        >
          <EditableBlock
            value={content.quote}
            onChange={(value) => onChange({ quote: value })}
            as="div"
            className="quote-text max-w-2xl mx-auto"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={true}
            allowAlignment={true}
            placeholder="Zitat eingeben..."
            minHeight="60px"
          />
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none" style={{ marginBottom: "-1px" }}>
          <path d="M0 40C240 70 480 20 720 50C960 80 1200 30 1440 60V80H0V40Z" fill="var(--accent-200)" />
        </svg>
      </div>
    </section>
  );
}
