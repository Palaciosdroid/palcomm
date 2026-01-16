"use client";

import { motion } from "framer-motion";
import { Clock, Coffee, User, Mic } from "lucide-react";

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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full flex-shrink-0 relative z-10
          ${isKeynote
            ? "bg-gradient-to-r from-[#daaf7a] to-[#ffd700]"
            : isBreak
              ? "bg-gray-300"
              : "bg-[#1a2d4a]"
          }`}
        >
          {isKeynote && (
            <div className="absolute inset-0 bg-[#daaf7a] rounded-full animate-ping opacity-50" />
          )}
        </div>
        <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
      </div>

      {/* Content */}
      <div
        className={`flex-1 pb-8 ${isBreak ? "opacity-70" : ""}`}
      >
        <div
          className={`rounded-xl p-4 transition-all duration-300 hover:shadow-md
          ${isKeynote
            ? "bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white"
            : isBreak
              ? "bg-gray-50"
              : "bg-white border border-gray-100"
          }`}
        >
          {/* Time */}
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-4 h-4 ${isKeynote ? "text-[#daaf7a]" : "text-gray-400"}`} />
            <span className={`text-sm font-medium ${isKeynote ? "text-[#daaf7a]" : "text-gray-500"}`}>
              {time}
            </span>
            {isKeynote && (
              <span className="ml-2 text-xs bg-[#daaf7a]/20 text-[#daaf7a] px-2 py-0.5 rounded-full">
                Keynote
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className={`font-semibold mb-1 ${isKeynote ? "text-white text-lg" : isBreak ? "text-gray-600" : "text-[#0a1628]"}`}>
            {title}
          </h4>

          {/* Speaker */}
          {speaker && (
            <div className="flex items-center gap-2 mt-2">
              {isKeynote ? (
                <Mic className="w-4 h-4 text-[#daaf7a]" />
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
              <span className={`text-sm ${isKeynote ? "text-white/80" : "text-gray-500"}`}>
                {speaker}
              </span>
            </div>
          )}

          {/* Break Icon */}
          {isBreak && (
            <div className="flex items-center gap-2 mt-2 text-gray-400">
              <Coffee className="w-4 h-4" />
              <span className="text-sm">Pause</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
