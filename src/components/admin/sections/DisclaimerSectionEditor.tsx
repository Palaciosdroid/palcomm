'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Heart, Shield } from 'lucide-react';
import type { DisclaimerContent } from '@/types/content';

const icons = [
  <Heart key="heart" className="w-6 h-6" />,
  <AlertCircle key="alert" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
];

interface DisclaimerSectionEditorProps {
  content: DisclaimerContent;
  onChange: (data: Partial<DisclaimerContent>) => void;
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

export default function DisclaimerSectionEditor({ content, onChange }: DisclaimerSectionEditorProps) {
  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ items: newItems });
  };

  return (
    <section className="section-padding bg-sage-100/50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <EditableField
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            className="text-3xl md:text-4xl font-serif"
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
              <div className="w-14 h-14 rounded-full bg-sage-100 mb-5 flex items-center justify-center text-brand">
                {icons[index]}
              </div>
              <EditableField
                value={item.title}
                onChange={(value) => updateItem(index, 'title', value)}
                className="font-medium text-text-dark mb-3 text-lg"
              />
              <EditableField
                value={item.text}
                onChange={(value) => updateItem(index, 'text', value)}
                multiline
                className="text-text-medium text-base leading-relaxed flex-grow"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
