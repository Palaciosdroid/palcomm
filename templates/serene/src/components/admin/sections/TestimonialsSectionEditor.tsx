'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { TestimonialsContent } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface TestimonialsSectionEditorProps {
  content: TestimonialsContent;
  onChange: (data: Partial<TestimonialsContent>) => void;
}

export default function TestimonialsSectionEditor({ content, onChange }: TestimonialsSectionEditorProps) {
  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    onChange({ testimonials: newTestimonials });
  };

  return (
    <section className="section-padding gradient-accent-reverse">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <EditableBlock
            value={content.subtitle}
            onChange={(value) => onChange({ subtitle: value })}
            as="p"
            className="text-text-medium"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Untertitel eingeben..."
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
              <EditableBlock
                value={testimonial.text}
                onChange={(value) => updateTestimonial(index, 'text', value)}
                as="p"
                className="text-text-medium text-sm leading-relaxed mb-4"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Testimonial-Text..."
                minHeight="80px"
              />

              {/* Author */}
              <div className="border-t border-accent-100 pt-4">
                <EditableBlock
                  value={testimonial.author}
                  onChange={(value) => updateTestimonial(index, 'author', value)}
                  as="div"
                  className="font-medium text-text-dark text-sm"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Name..."
                />
                <EditableBlock
                  value={testimonial.location}
                  onChange={(value) => updateTestimonial(index, 'location', value)}
                  as="div"
                  className="text-text-light text-xs"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Ort..."
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
