"use client";

import { motion } from "framer-motion";
import { Clock, Banknote, CreditCard, Phone, Car, Info, AlertCircle, Percent } from "lucide-react";
import { defaultContent } from "@/lib/content";
import type { PricingContent } from "@/types/content";

interface PricingSectionProps {
  content?: PricingContent;
}

export default function PricingSection({ content }: PricingSectionProps) {
  const data = content || defaultContent.pricing;

  return (
    <section className="section-padding bg-base-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-12"
        >
          {data.title}
        </motion.h2>

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
              <p className="font-medium text-text-dark">{data.freeConsultation.title}</p>
              <p className="text-sm text-text-medium">{data.freeConsultation.subtitle}</p>
            </div>
          </div>
          <a
            href={data.freeConsultation.phone}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            {data.freeConsultation.buttonText}
          </a>
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
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-6xl font-medium text-text-dark">
                150
              </span>
              <span className="text-2xl text-text-medium">CHF</span>
              <span className="text-text-light ml-2">/ Stunde</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider-soft mb-8" />

          {/* Session Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">{data.firstSession.title}</p>
                <p className="text-sm text-text-light">
                  {data.firstSession.duration}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="font-medium text-text-dark">{data.followUpSession.title}</p>
                <p className="text-sm text-text-light">
                  {data.followUpSession.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Discount Box */}
          <div className="bg-accent-100 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Percent className="w-5 h-5 text-brand" />
              <p className="font-medium text-text-dark">{data.discount.title}</p>
            </div>
            <p className="text-sm text-text-medium">
              {data.discount.description}
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <p className="font-medium text-text-dark mb-4">{data.payment.title}</p>
            <div className="flex flex-wrap gap-4">
              {data.payment.methods.map((method) => {
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
              <p className="font-medium text-text-dark">{data.houseVisits.title}</p>
              <p className="text-sm text-text-light">
                {data.houseVisits.cost}
              </p>
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
          {/* Cancellation */}
          <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl">
            <Info className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <span className="font-medium">{data.cancellation.title}:</span> {data.cancellation.text}
            </p>
          </div>

          {/* Insurance Note */}
          <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-text-medium flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-medium">
              <span className="font-medium">{data.insurance.title}:</span> {data.insurance.text}
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
          <a href={data.ctaLink} className="btn-primary">
            {data.ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
