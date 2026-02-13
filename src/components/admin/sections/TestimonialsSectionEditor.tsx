'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { TestimonialsContent } from '@/types/content';

interface TestimonialsSectionEditorProps {
  content: TestimonialsContent;
  onChange: (data: Partial<TestimonialsContent>) => void;
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

export default function TestimonialsSectionEditor({ content, onChange }: TestimonialsSectionEditorProps) {
  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    onChange({ testimonials: newTestimonials });
  };

  return (
    <section className="section-padding gradient-sage-reverse">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <EditableField
            value={content.title}
            onChange={(value) => onChange({ title: value })}
            className="text-4xl md:text-5xl font-serif"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <EditableField
            value={content.subtitle}
            onChange={(value) => onChange({ subtitle: value })}
            className="text-text-medium"
          />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <EditableField
                value={testimonial.text}
                onChange={(value) => updateTestimonial(index, 'text', value)}
                multiline
                className="text-text-medium text-sm leading-relaxed mb-4"
              />

              {/* Author */}
              <div className="border-t border-sage-100 pt-4">
                <EditableField
                  value={testimonial.author}
                  onChange={(value) => updateTestimonial(index, 'author', value)}
                  className="font-medium text-text-dark text-sm"
                />
                <EditableField
                  value={testimonial.location}
                  onChange={(value) => updateTestimonial(index, 'location', value)}
                  className="text-text-light text-xs"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
