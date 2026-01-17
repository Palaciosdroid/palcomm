"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import Button from "./Button";

interface TicketCardProps {
  name: string;
  price: string;
  currency: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string | null;
  index?: number;
}

export default function TicketCard({
  name,
  price,
  currency,
  description,
  features,
  highlighted = false,
  badge,
  index = 0,
}: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative ${highlighted ? "md:-mt-4 md:mb-4" : ""}`}
    >
      {/* Highlighted Soft Glow */}
      {highlighted && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#daaf7a]/20 to-[#c4a484]/20 rounded-[2rem] blur-xl" />
      )}

      <div
        className={`relative h-full bg-white rounded-3xl p-6 md:p-8 transition-all duration-500
        ${highlighted
          ? "border-2 border-[#daaf7a]/40 shadow-warm"
          : "border border-[#daaf7a]/10 shadow-soft hover:shadow-warm hover:border-[#daaf7a]/20"
        }`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium
              ${highlighted
                ? "bg-gradient-to-r from-[#daaf7a] to-[#c4a484] text-white"
                : "bg-[#f5f0e8] text-[#5c4a3a]"
              }`}
            >
              {highlighted ? <Sparkles className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
              {badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 pt-3">
          <h3 className="text-xl font-bold text-[#2d2420] mb-2">{name}</h3>
          <p className="text-[#8b7b6b] text-sm">{description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm text-[#8b7b6b]">{currency}</span>
            <span className={`text-4xl md:text-5xl font-light ${highlighted ? "text-gradient" : "text-[#2d2420]"}`}>
              {price}
            </span>
            <span className="text-[#8b7b6b]">.–</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                ${highlighted ? "bg-[#daaf7a]/15" : "bg-[#f5f0e8]"}`}
              >
                <Check className={`w-3 h-3 ${highlighted ? "text-[#daaf7a]" : "text-[#c4a484]"}`} />
              </div>
              <span className="text-[#5c4a3a] text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={highlighted ? "primary" : "outline"}
          fullWidth
          href="#"
        >
          Auswählen
        </Button>
      </div>
    </motion.div>
  );
}
