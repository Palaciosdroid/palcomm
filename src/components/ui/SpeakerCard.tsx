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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10
        hover:border-[#daaf7a]/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10
        ${featured ? "md:flex md:items-center md:gap-8" : ""}`}
      >
        {/* Image Container */}
        <div
          className={`relative mx-auto ${featured ? "md:mx-0 w-32 h-32 md:w-40 md:h-40" : "w-24 h-24 md:w-28 md:h-28"} mb-4 ${featured ? "md:mb-0" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#daaf7a] to-[#ffd700] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1a2d4a] to-[#0a1628] flex items-center justify-center overflow-hidden border-2 border-white/20 group-hover:border-[#daaf7a]/50 transition-colors">
            <User className="w-12 h-12 text-white/40" />
          </div>
        </div>

        {/* Content */}
        <div className={`text-center ${featured ? "md:text-left md:flex-1" : ""}`}>
          <h3 className={`font-bold text-white mb-1 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
            {name}
          </h3>
          <p className="text-[#daaf7a] text-sm mb-2">{title}</p>
          <p className="text-white/60 text-sm">{topic}</p>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
            <span className="bg-gradient-to-r from-[#daaf7a] to-[#ffd700] text-[#0a1628] text-xs font-bold px-3 py-1 rounded-full">
              Keynote Speaker
            </span>
          </div>
        )}

        {/* Hover Reveal Info */}
        <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
          <div className="p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            <div className="h-px bg-gradient-to-r from-transparent via-[#daaf7a]/50 to-transparent mb-3" />
            <p className="text-white/40 text-xs text-center">
              Klicke für mehr Info
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
