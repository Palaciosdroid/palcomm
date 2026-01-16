"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  image: string;
  featured?: boolean;
  index?: number;
}

export default function SpeakerCard({
  name,
  title,
  topic,
  featured = false,
  index = 0,
}: SpeakerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative bg-white rounded-3xl p-6 md:p-8 border border-[#daaf7a]/10
        hover:border-[#daaf7a]/30 transition-all duration-500 shadow-soft hover:shadow-warm
        ${featured ? "md:flex md:items-center md:gap-10" : ""}`}
      >
        {/* Image Container */}
        <div
          className={`relative mx-auto ${featured ? "md:mx-0 w-28 h-28 md:w-36 md:h-36" : "w-20 h-20 md:w-24 md:h-24"} mb-5 ${featured ? "md:mb-0" : ""}`}
        >
          {/* Soft glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#daaf7a]/20 to-[#c4a484]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110" />

          {/* Avatar circle */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] flex items-center justify-center overflow-hidden border-2 border-[#daaf7a]/20 group-hover:border-[#daaf7a]/40 transition-colors duration-500">
            <User className="w-10 h-10 text-[#c4a484]" />
          </div>
        </div>

        {/* Content */}
        <div className={`text-center ${featured ? "md:text-left md:flex-1" : ""}`}>
          <h3 className={`font-normal text-[#2d2420] mb-1 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
            {name}
          </h3>
          <p className="text-[#daaf7a] text-sm mb-2 font-medium">{title}</p>
          <p className="text-[#6b5b4f] text-sm leading-relaxed">{topic}</p>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
            <span className="bg-gradient-to-r from-[#daaf7a] to-[#c4a484] text-white text-xs font-medium px-4 py-1.5 rounded-full">
              Keynote Speaker
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
