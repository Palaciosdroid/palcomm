'use client';

import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import type { ContactContent, BusinessInfo } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface ContactSectionEditorProps {
  content: ContactContent;
  business: BusinessInfo;
  onChange: (data: Partial<ContactContent>) => void;
}

export default function ContactSectionEditor({ content, business, onChange }: ContactSectionEditorProps) {
  return (
    <section id="kontakt" className="section-padding bg-base-50">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
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
            className="text-4xl md:text-5xl font-playfair"
            allowHeadings={true}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Titel eingeben..."
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
            <span>{business.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-text-medium">
            <Mail className="w-5 h-5" />
            <span>{business.email}</span>
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
              <EditableBlock
                value={content.fields.firstName}
                onChange={(value) => onChange({ fields: { ...content.fields, firstName: value } })}
                as="div"
                className="input-soft w-full"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Vorname..."
              />
            </div>
            <div>
              <EditableBlock
                value={content.fields.lastName}
                onChange={(value) => onChange({ fields: { ...content.fields, lastName: value } })}
                as="div"
                className="input-soft w-full"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Nachname..."
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <EditableBlock
              value={content.fields.email}
              onChange={(value) => onChange({ fields: { ...content.fields, email: value } })}
              as="div"
              className="input-soft w-full"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="E-Mail..."
            />
          </div>

          {/* Phone */}
          <div>
            <EditableBlock
              value={content.fields.phone}
              onChange={(value) => onChange({ fields: { ...content.fields, phone: value } })}
              as="div"
              className="input-soft w-full"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Telefon..."
            />
          </div>

          {/* Message */}
          <div>
            <EditableBlock
              value={content.fields.message}
              onChange={(value) => onChange({ fields: { ...content.fields, message: value } })}
              as="div"
              className="input-soft w-full"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Nachricht..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <EditableBlock
              value={content.submitText}
              onChange={(value) => onChange({ submitText: value })}
              as="span"
              className="btn-primary"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Button-Text..."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
