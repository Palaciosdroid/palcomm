"use client";

import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  index?: number;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#daaf7a] to-[#ffd700] flex items-center justify-center">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Quote Text */}
      <p className="text-gray-600 leading-relaxed mb-6 pt-2">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a2d4a] to-[#0a1628] flex items-center justify-center">
          <User className="w-6 h-6 text-white/60" />
        </div>
        <div>
          <p className="font-semibold text-[#0a1628]">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#daaf7a]/5 to-transparent rounded-bl-2xl rounded-tr-2xl" />
    </motion.div>
  );
}
