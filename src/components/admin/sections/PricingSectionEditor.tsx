'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Banknote, Phone, Car, Info, AlertCircle, Percent } from 'lucide-react';
import Image from 'next/image';
import type { PricingContent } from '@/types/content';

interface PricingSectionEditorProps {
  content: PricingContent;
  onChange: (data: Partial<PricingContent>) => void;
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
        className={`w-full bg-white border-2 border-blue-500 rounded-lg p-3 focus:outline-none min-h-[60px] ${className}`}
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

export default function PricingSectionEditor({ content, onChange }: PricingSectionEditorProps) {
  return (
    <section className="section-padding bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Title */}
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
            className="text-4xl md:text-5xl font-serif"
          />
        </motion.div>

        {/* Free Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-sage-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Phone className="w-6 h-6 text-brand" />
            </div>
            <div>
              <EditableField
                value={content.freeConsultation.title}
                onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, title: value } })}
                className="font-medium text-text-dark block"
              />
              <EditableField
                value={content.freeConsultation.subtitle}
                onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, subtitle: value } })}
                className="text-sm text-text-medium"
              />
            </div>
          </div>
          <EditableField
            value={content.freeConsultation.buttonText}
            onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, buttonText: value } })}
            className="btn-secondary text-sm whitespace-nowrap"
          />
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-medium mb-8"
        >
          {/* Price */}
          <div className="text-center mb-8">
            <EditableField
              value={content.hourlyRate}
              onChange={(value) => onChange({ hourlyRate: value })}
              className="text-3xl md:text-4xl font-medium text-text-dark"
            />
          </div>

          <div className="divider-soft mb-8" />

          {/* Session Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <EditableField
                  value={content.firstSession.title}
                  onChange={(value) => onChange({ firstSession: { ...content.firstSession, title: value } })}
                  className="font-medium text-text-dark"
                />
                <EditableField
                  value={content.firstSession.duration}
                  onChange={(value) => onChange({ firstSession: { ...content.firstSession, duration: value } })}
                  className="text-sm text-text-light"
                />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <EditableField
                  value={content.followUpSession.title}
                  onChange={(value) => onChange({ followUpSession: { ...content.followUpSession, title: value } })}
                  className="font-medium text-text-dark"
                />
                <EditableField
                  value={content.followUpSession.duration}
                  onChange={(value) => onChange({ followUpSession: { ...content.followUpSession, duration: value } })}
                  className="text-sm text-text-light"
                />
              </div>
            </div>
          </div>

          {/* Discount Box */}
          <div className="bg-sage-50 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Percent className="w-5 h-5 text-brand" />
              <EditableField
                value={content.discount.title}
                onChange={(value) => onChange({ discount: { ...content.discount, title: value } })}
                className="font-medium text-text-dark"
              />
            </div>
            <EditableField
              value={content.discount.description}
              onChange={(value) => onChange({ discount: { ...content.discount, description: value } })}
              multiline
              className="text-sm text-text-medium"
            />
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <p className="font-medium text-text-dark mb-4">Bezahlung nach jeder Sitzung</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-sage-50 rounded-xl">
                <Banknote className="w-6 h-6 text-sage-600" />
                <span className="font-medium text-text-dark">Bar</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-black rounded-xl">
                <Image src="/images/twint-logo.svg" alt="Twint" width={80} height={32} className="h-8 w-auto" />
              </div>
            </div>
          </div>

          {/* House Visits */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <EditableField
                value={content.houseVisits.title}
                onChange={(value) => onChange({ houseVisits: { ...content.houseVisits, title: value } })}
                className="font-medium text-text-dark"
              />
              <EditableField
                value={content.houseVisits.cost}
                onChange={(value) => onChange({ houseVisits: { ...content.houseVisits, cost: value } })}
                className="text-sm text-text-light"
              />
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3 p-4 bg-cream-100 rounded-xl">
            <Info className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <EditableField
                value={content.cancellation.title}
                onChange={(value) => onChange({ cancellation: { ...content.cancellation, title: value } })}
                className="font-medium inline"
              />: <EditableField
                value={content.cancellation.text}
                onChange={(value) => onChange({ cancellation: { ...content.cancellation, text: value } })}
                className="inline"
              />
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 bg-cream-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <EditableField
                value={content.insurance.title}
                onChange={(value) => onChange({ insurance: { ...content.insurance, title: value } })}
                className="font-medium inline"
              />: <EditableField
                value={content.insurance.text}
                onChange={(value) => onChange({ insurance: { ...content.insurance, text: value } })}
                className="inline"
              />
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <EditableField
            value={content.ctaText}
            onChange={(value) => onChange({ ctaText: value })}
            className="btn-primary"
          />
        </motion.div>
      </div>
    </section>
  );
}
