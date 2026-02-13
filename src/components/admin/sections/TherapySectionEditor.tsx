'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Bug, CloudLightning, Sun, CigaretteOff, Unlock, MoonStar,
  HeartPulse, Scale, Flower2, Trophy,
} from 'lucide-react';
import type { TherapyContent } from '@/types/content';

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

interface TherapySectionEditorProps {
  content: TherapyContent;
  onChange: (data: Partial<TherapyContent>) => void;
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
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-3 focus:outline-none min-h-[80px] ${className}`}
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

export default function TherapySectionEditor({ content, onChange }: TherapySectionEditorProps) {
  const updateTargetGroup = (index: number, field: string, value: string) => {
    const newGroups = [...content.targetGroups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    onChange({ targetGroups: newGroups });
  };

  const updateTopic = (index: number, field: string, value: string) => {
    const newTopics = [...content.topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    onChange({ topics: newTopics });
  };

  return (
    <section id="therapieangebot" className="section-padding bg-cream-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <EditableField
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            className="text-4xl md:text-5xl font-serif"
          />
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <EditableField
            value={content.intro}
            onChange={(value) => onChange({ intro: value })}
            multiline
            className="text-text-medium text-lg leading-relaxed max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Target Groups Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <EditableField
            value={content.targetGroupsTitle}
            onChange={(value) => onChange({ targetGroupsTitle: value })}
            className="text-2xl md:text-3xl font-serif"
          />
        </motion.div>

        {/* Target Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {content.targetGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-card"
            >
              <div className="relative h-40 bg-sage-100">
                <Image src={group.image} alt={group.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <EditableField
                  value={group.title}
                  onChange={(value) => updateTargetGroup(index, 'title', value)}
                  className="text-lg font-medium text-text-dark mb-2"
                />
                <EditableField
                  value={group.description}
                  onChange={(value) => updateTargetGroup(index, 'description', value)}
                  multiline
                  className="text-text-light text-sm leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Topics Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <EditableField
            value={content.topicsTitle}
            onChange={(value) => onChange({ topicsTitle: value })}
            className="text-2xl md:text-3xl font-serif"
          />
        </motion.div>

        {/* Topics Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {content.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-sage-200 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)]"
            >
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                {topicIconMap[topic.icon]}
              </div>
              <EditableField
                value={topic.title}
                onChange={(value) => updateTopic(index, 'title', value)}
                className="text-base text-center font-medium text-text-dark"
              />
              <EditableField
                value={topic.description}
                onChange={(value) => updateTopic(index, 'description', value)}
                multiline
                className="text-text-light text-sm leading-relaxed text-center"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
