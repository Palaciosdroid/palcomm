"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { program } from "@/lib/data";
import TimelineItem from "../ui/TimelineItem";

export default function ProgramSection() {
  return (
    <section id="programm" className="relative py-24 md:py-32 bg-[#fdfcfa] overflow-hidden">
      {/* Organic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 blob bg-gradient-to-bl from-[#daaf7a]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 blob-2 bg-gradient-to-tr from-[#a8b5a0]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#daaf7a] text-sm uppercase tracking-widest mb-4">
            Dein Tag
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2420] mb-6">
            Ein Tag voller <span className="text-gradient font-normal">Inspiration</span>
          </h2>
          <p className="text-[#6b5b4f] max-w-xl mx-auto text-lg leading-relaxed mb-10">
            Von morgens bis abends erwarten dich wertvolle Impulse,
            tiefgreifende Erkenntnisse und bereichernde Begegnungen.
          </p>

          {/* Event Info Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white shadow-soft border border-[#daaf7a]/10">
              <Calendar className="w-4 h-4 text-[#daaf7a]" />
              <span className="text-[#5c4a3a] text-sm font-medium">{program.date}</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white shadow-soft border border-[#daaf7a]/10">
              <MapPin className="w-4 h-4 text-[#daaf7a]" />
              <span className="text-[#5c4a3a] text-sm font-medium">{program.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
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

        {/* Download Program Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#daaf7a] hover:text-[#c4a484] transition-colors duration-300 text-sm"
          >
            <span>Vollständiges Programm herunterladen</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
