"use client";

import { motion } from "framer-motion";
import { Clock, Coffee, User, Sparkles } from "lucide-react";

interface TimelineItemProps {
  time: string;
  title: string;
  speaker: string | null;
  type: "talk" | "keynote" | "break";
  index?: number;
}

export default function TimelineItem({
  time,
  title,
  speaker,
  type,
  index = 0,
}: TimelineItemProps) {
  const isBreak = type === "break";
  const isKeynote = type === "keynote";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="relative flex gap-5 md:gap-6"
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 relative z-10 transition-all duration-300
          ${isKeynote
            ? "bg-gradient-to-r from-[#daaf7a] to-[#c4a484] ring-4 ring-[#daaf7a]/20"
            : isBreak
              ? "bg-[#e8dfd3]"
              : "bg-[#c4a484]"
          }`}
        />
        <div className="w-px flex-1 bg-gradient-to-b from-[#daaf7a]/30 to-[#e8dfd3] mt-2" />
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 ${isBreak ? "opacity-60" : ""}`}>
        <div
          className={`rounded-2xl p-5 transition-all duration-500
          ${isKeynote
            ? "bg-gradient-to-br from-[#3d2c1e] to-[#2d2420] text-white shadow-warm"
            : isBreak
              ? "bg-[#f5f0e8]/50"
              : "bg-white shadow-soft border border-[#daaf7a]/10 hover:shadow-warm hover:border-[#daaf7a]/20"
          }`}
        >
          {/* Time */}
          <div className="flex items-center gap-2 mb-3">
            <Clock className={`w-3.5 h-3.5 ${isKeynote ? "text-[#daaf7a]" : "text-[#c4a484]"}`} />
            <span className={`text-sm ${isKeynote ? "text-[#daaf7a]" : "text-[#8b7b6b]"}`}>
              {time}
            </span>
            {isKeynote && (
              <span className="ml-2 text-xs bg-[#daaf7a]/20 text-[#daaf7a] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Keynote
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className={`font-normal mb-1 ${isKeynote ? "text-white text-lg" : isBreak ? "text-[#6b5b4f]" : "text-[#2d2420]"}`}>
            {title}
          </h4>

          {/* Speaker */}
          {speaker && (
            <div className="flex items-center gap-2 mt-3">
              <User className={`w-3.5 h-3.5 ${isKeynote ? "text-[#daaf7a]" : "text-[#c4a484]"}`} />
              <span className={`text-sm ${isKeynote ? "text-white/70" : "text-[#6b5b4f]"}`}>
                {speaker}
              </span>
            </div>
          )}

          {/* Break Icon */}
          {isBreak && (
            <div className="flex items-center gap-2 mt-2 text-[#8b7b6b]">
              <Coffee className="w-3.5 h-3.5" />
              <span className="text-sm">Pause & Austausch</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
