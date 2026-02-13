'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import type { ContactContent, PracticeInfo } from '@/types/content';

interface ContactSectionEditorProps {
  content: ContactContent;
  practiceInfo: PracticeInfo;
  onChange: (data: Partial<ContactContent>) => void;
}

function EditableField({
  value,
  onChange,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
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
        className={`bg-white border-2 border-blue-500 rounded-lg p-2 focus:outline-none ${className}`}
        autoFocus
      />
    );
  }

  return (
    <span
      className={`${className} cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 hover:rounded transition-all`}
      onClick={() => setIsEditing(true)}
      title="Klicken zum Bearbeiten"
    >
      {value}
    </span>
  );
}

export default function ContactSectionEditor({ content, practiceInfo, onChange }: ContactSectionEditorProps) {
  return (
    <section id="kontakt" className="section-padding bg-cream-50">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
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
            className="text-4xl md:text-5xl font-playfair"
          />
        </motion.div>

        {/* Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 text-text-medium">
            <Phone className="w-5 h-5" />
            <span>{practiceInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-text-medium">
            <Mail className="w-5 h-5" />
            <span>{practiceInfo.email}</span>
          </div>
        </motion.div>

        {/* Contact Form Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <EditableField
                value={content.fields.firstName}
                onChange={(value) => onChange({ fields: { ...content.fields, firstName: value } })}
                className="input-soft w-full"
              />
            </div>
            <div>
              <EditableField
                value={content.fields.lastName}
                onChange={(value) => onChange({ fields: { ...content.fields, lastName: value } })}
                className="input-soft w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <EditableField
              value={content.fields.email}
              onChange={(value) => onChange({ fields: { ...content.fields, email: value } })}
              className="input-soft w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <EditableField
              value={content.fields.phone}
              onChange={(value) => onChange({ fields: { ...content.fields, phone: value } })}
              className="input-soft w-full"
            />
          </div>

          {/* Message */}
          <div>
            <EditableField
              value={content.fields.message}
              onChange={(value) => onChange({ fields: { ...content.fields, message: value } })}
              className="input-soft w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <EditableField
              value={content.submitText}
              onChange={(value) => onChange({ submitText: value })}
              className="btn-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
