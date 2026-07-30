'use client';

import { motion } from 'framer-motion';
import { Clock, Banknote, CreditCard, Phone, Car, Info, AlertCircle, Percent } from 'lucide-react';
import type { PricingContent } from '@/types/content';
import EditableBlock from '../EditableBlock';

interface PricingSectionEditorProps {
  content: PricingContent;
  onChange: (data: Partial<PricingContent>) => void;
}

export default function PricingSectionEditor({ content, onChange }: PricingSectionEditorProps) {
  return (
    <section className="section-padding bg-base-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Title */}
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
            className="text-4xl md:text-5xl font-serif"
            allowHeadings={true}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={true}
            placeholder="Titel eingeben..."
          />
        </motion.div>

        {/* Free Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-accent-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Phone className="w-6 h-6 text-brand" />
            </div>
            <div>
              <EditableBlock
                value={content.freeConsultation.title}
                onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, title: value } })}
                as="div"
                className="font-medium text-text-dark"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
              <EditableBlock
                value={content.freeConsultation.subtitle}
                onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, subtitle: value } })}
                as="div"
                className="text-sm text-text-medium"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Untertitel..."
              />
            </div>
          </div>
          <EditableBlock
            value={content.freeConsultation.buttonText}
            onChange={(value) => onChange({ freeConsultation: { ...content.freeConsultation, buttonText: value } })}
            as="span"
            className="btn-secondary text-sm whitespace-nowrap"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={false}
            placeholder="Button-Text..."
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
            <EditableBlock
              value={content.hourlyRate}
              onChange={(value) => onChange({ hourlyRate: value })}
              as="div"
              className="text-3xl md:text-4xl font-medium text-text-dark"
              allowHeadings={false}
              allowLists={false}
              allowQuotes={false}
              allowAlignment={true}
              placeholder="Preis eingeben..."
            />
          </div>

          <div className="divider-soft mb-8" />

          {/* Session Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <EditableBlock
                  value={content.firstSession.title}
                  onChange={(value) => onChange({ firstSession: { ...content.firstSession, title: value } })}
                  as="div"
                  className="font-medium text-text-dark"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Titel..."
                />
                <EditableBlock
                  value={content.firstSession.duration}
                  onChange={(value) => onChange({ firstSession: { ...content.firstSession, duration: value } })}
                  as="div"
                  className="text-sm text-text-light"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Dauer..."
                />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <EditableBlock
                  value={content.followUpSession.title}
                  onChange={(value) => onChange({ followUpSession: { ...content.followUpSession, title: value } })}
                  as="div"
                  className="font-medium text-text-dark"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Titel..."
                />
                <EditableBlock
                  value={content.followUpSession.duration}
                  onChange={(value) => onChange({ followUpSession: { ...content.followUpSession, duration: value } })}
                  as="div"
                  className="text-sm text-text-light"
                  allowHeadings={false}
                  allowLists={false}
                  allowQuotes={false}
                  allowAlignment={false}
                  placeholder="Dauer..."
                />
              </div>
            </div>
          </div>

          {/* Discount Box */}
          <div className="bg-accent-100 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Percent className="w-5 h-5 text-brand" />
              <EditableBlock
                value={content.discount.title}
                onChange={(value) => onChange({ discount: { ...content.discount, title: value } })}
                as="span"
                className="font-medium text-text-dark"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
            </div>
            <EditableBlock
              value={content.discount.description}
              onChange={(value) => onChange({ discount: { ...content.discount, description: value } })}
              as="div"
              className="text-sm text-text-medium"
              allowHeadings={false}
              allowLists={true}
              allowQuotes={false}
              allowAlignment={false}
              placeholder="Beschreibung..."
              minHeight="50px"
            />
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <p className="font-medium text-text-dark mb-4">{content.payment.title}</p>
            <div className="flex flex-wrap gap-4">
              {content.payment.methods.map((method) => {
                const isCash = /^(bar|bargeld|cash)$/i.test(method);
                const Icon = isCash ? Banknote : CreditCard;

                return (
                  <div
                    key={method}
                    className="flex items-center gap-3 px-5 py-3 bg-accent-100 rounded-xl"
                  >
                    <Icon className="w-6 h-6 text-accent-600" />
                    <span className="font-medium text-text-dark">{method}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* House Visits */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <EditableBlock
                value={content.houseVisits.title}
                onChange={(value) => onChange({ houseVisits: { ...content.houseVisits, title: value } })}
                as="div"
                className="font-medium text-text-dark"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
              <EditableBlock
                value={content.houseVisits.cost}
                onChange={(value) => onChange({ houseVisits: { ...content.houseVisits, cost: value } })}
                as="div"
                className="text-sm text-text-light"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Kosten..."
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
          <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl">
            <Info className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <div className="text-sm text-text-medium flex flex-wrap items-center gap-1">
              <EditableBlock
                value={content.cancellation.title}
                onChange={(value) => onChange({ cancellation: { ...content.cancellation, title: value } })}
                as="span"
                className="font-medium"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
              <span>:</span>
              <EditableBlock
                value={content.cancellation.text}
                onChange={(value) => onChange({ cancellation: { ...content.cancellation, text: value } })}
                as="span"
                className=""
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Text..."
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <div className="text-sm text-text-medium flex flex-wrap items-center gap-1">
              <EditableBlock
                value={content.insurance.title}
                onChange={(value) => onChange({ insurance: { ...content.insurance, title: value } })}
                as="span"
                className="font-medium"
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Titel..."
              />
              <span>:</span>
              <EditableBlock
                value={content.insurance.text}
                onChange={(value) => onChange({ insurance: { ...content.insurance, text: value } })}
                as="span"
                className=""
                allowHeadings={false}
                allowLists={false}
                allowQuotes={false}
                allowAlignment={false}
                placeholder="Text..."
              />
            </div>
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
          <EditableBlock
            value={content.ctaText}
            onChange={(value) => onChange({ ctaText: value })}
            as="span"
            className="btn-primary"
            allowHeadings={false}
            allowLists={false}
            allowQuotes={false}
            allowAlignment={false}
            placeholder="Button-Text..."
          />
        </motion.div>
      </div>
    </section>
  );
}
