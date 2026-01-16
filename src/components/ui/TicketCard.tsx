"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown } from "lucide-react";
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
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative ${highlighted ? "md:-mt-4 md:mb-4" : ""}`}
    >
      {/* Highlighted Glow Effect */}
      {highlighted && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f5a623] to-[#ffd700] rounded-3xl blur opacity-30" />
      )}

      <div
        className={`relative h-full bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl
        ${highlighted
          ? "border-2 border-[#f5a623] shadow-xl shadow-orange-500/10"
          : "border border-gray-200 hover:border-[#f5a623]/50"
        }`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-sm font-semibold
              ${highlighted
                ? "bg-gradient-to-r from-[#f5a623] to-[#ffd700] text-[#0a1628]"
                : "bg-[#0a1628] text-white"
              }`}
            >
              {highlighted ? <Sparkles className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
              {badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <h3 className="text-xl font-bold text-[#0a1628] mb-2">{name}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm text-gray-500">{currency}</span>
            <span className={`text-5xl font-bold ${highlighted ? "text-gradient" : "text-[#0a1628]"}`}>
              {price}
            </span>
            <span className="text-gray-500">.–</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                ${highlighted ? "bg-[#f5a623]/20" : "bg-gray-100"}`}
              >
                <Check className={`w-3 h-3 ${highlighted ? "text-[#f5a623]" : "text-[#0a1628]"}`} />
              </div>
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={highlighted ? "primary" : "outline"}
          fullWidth
          href="#"
        >
          Jetzt sichern
        </Button>

        {/* Urgency Note */}
        {highlighted && (
          <p className="text-center text-xs text-[#f5a623] mt-4 font-medium">
            Nur noch wenige Plätze verfügbar!
          </p>
        )}
      </div>
    </motion.div>
  );
}
