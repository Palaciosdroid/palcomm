"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { program } from "@/lib/data";
import TimelineItem from "../ui/TimelineItem";

export default function ProgramSection() {
  return (
    <section id="programm" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#f5f7fa] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#0a1628] text-[#f5a623] text-sm font-semibold uppercase tracking-wider mb-4">
            Programm 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            Ein Tag voller <span className="text-gradient">Inspiration</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Von morgens bis abends erwarten dich hochkarätige Vorträge,
            inspirierende Workshops und wertvolle Networking-Gelegenheiten.
          </p>

          {/* Event Info Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f7fa] text-[#0a1628]">
              <Calendar className="w-4 h-4 text-[#f5a623]" />
              <span className="font-medium">{program.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f7fa] text-[#0a1628]">
              <MapPin className="w-4 h-4 text-[#f5a623]" />
              <span className="font-medium">{program.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {program.slots.map((slot, index) => (
            <TimelineItem
              key={index}
              time={slot.time}
              title={slot.title}
              speaker={slot.speaker}
              type={slot.type as "talk" | "keynote" | "break"}
              index={index}
            />
          ))}
        </div>

        {/* Download Program Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#f5a623] hover:text-[#0a1628] transition-colors font-medium"
          >
            <span>Programm als PDF herunterladen</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
