'use client';

import { motion } from 'framer-motion';
import type { HeroContent } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface HeroSectionEditorProps {
  content: HeroContent;
  onChange: (data: Partial<HeroContent>) => void;
}

export default function HeroSectionEditor({ content, onChange }: HeroSectionEditorProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-accent-300">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-fallback.jpg"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/nature-bg.mp4"} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-[5]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 min-[400px]:px-6 md:px-8 pt-24 min-[400px]:pt-32 pb-24 min-[400px]:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-5 py-10 min-[400px]:px-8 min-[400px]:py-14 md:px-20 md:py-20 text-center rounded-2xl min-[400px]:rounded-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.38)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)"
          }}
        >
          {/* Main Title */}
          <div className="mb-6 min-[400px]:mb-10">
            <EditableBlock
              value={content.title}
              onChange={(value) => onChange({ title: value })}
              as="h1"
              className="text-4xl min-[400px]:text-5xl md:text-6xl lg:text-7xl font-serif italic text-text-dark"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={true}
              placeholder="Titel eingeben..."
            />
          </div>

          {/* Description */}
          <div className="mb-6 min-[400px]:mb-10">
            <EditableBlock
              value={content.description}
              onChange={(value) => onChange({ description: value })}
              as="p"
              className="text-base min-[400px]:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto text-text-medium"
              allowHeadings={false}
              allowLists={true}
              allowQuotes={false}
              allowAlignment={true}
              placeholder="Beschreibung eingeben..."
              minHeight="80px"
            />
          </div>

          {/* Subtitle */}
          <EditableBlock
            value={content.subtitle}
            onChange={(value) => onChange({ subtitle: value })}
            as="p"
            className="text-lg min-[400px]:text-xl md:text-2xl font-semibold text-text-dark"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Untertitel eingeben..."
          />
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0 z-20">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none" style={{ marginBottom: "-1px" }}>
          <path d="M0 80C240 120 480 40 720 80C960 120 1200 60 1440 90V150H0V80Z" fill="var(--accent-100)" opacity="0.5" />
          <path d="M0 100C200 60 400 120 600 90C800 60 1000 110 1200 80C1320 65 1400 85 1440 100V150H0V100Z" fill="var(--base-100)" opacity="0.7" />
          <path d="M0 110C180 130 360 95 540 115C720 135 900 100 1080 120C1260 140 1380 110 1440 125V150H0V110Z" fill="var(--base-50)" />
        </svg>
      </div>
    </section>
  );
}
