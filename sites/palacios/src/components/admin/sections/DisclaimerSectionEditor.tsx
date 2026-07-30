'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Heart, Shield } from 'lucide-react';
import type { DisclaimerContent } from '@/types/content';
import EditableBlock from '../EditableBlock';

const icons = [
  <Heart key="heart" className="w-6 h-6" />,
  <AlertCircle key="alert" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
];

interface DisclaimerSectionEditorProps {
  content: DisclaimerContent;
  onChange: (data: Partial<DisclaimerContent>) => void;
}

export default function DisclaimerSectionEditor({ content, onChange }: DisclaimerSectionEditorProps) {
  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ items: newItems });
  };

  return (
    <section className="section-padding bg-accent-100/50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <EditableBlock
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            as="h2"
            className="text-3xl md:text-4xl font-serif"
            allowHeadings={true}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Titel eingeben..."
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card flex flex-col items-center text-center h-full"
            >
              <div className="w-14 h-14 rounded-full bg-accent-100 mb-5 flex items-center justify-center text-brand">
                {icons[index]}
              </div>
              <EditableBlock
                value={item.title}
                onChange={(value) => updateItem(index, 'title', value)}
                as="h3"
                className="font-medium text-text-dark mb-3 text-lg"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
              <EditableBlock
                value={item.text}
                onChange={(value) => updateItem(index, 'text', value)}
                as="div"
                className="text-text-medium text-base leading-relaxed flex-grow"
                allowHeadings={false}
                allowLists={true}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Text eingeben..."
                minHeight="80px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
