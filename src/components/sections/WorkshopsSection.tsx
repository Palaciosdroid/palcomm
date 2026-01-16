"use client";

import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import { workshops } from "@/lib/data";
import Button from "../ui/Button";

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#0a1628] text-[#f5a623] text-sm font-semibold uppercase tracking-wider mb-4">
            Vertiefung
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            Intensive <span className="text-gradient">Workshops</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vertiefe dein Wissen in unseren exklusiven Workshops mit
            persönlicher Betreuung durch unsere Experten.
          </p>
        </motion.div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#f5a623]/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 md:h-56 bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl text-white/10 font-bold">
                    {index + 1}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#f5a623]/0 group-hover:bg-[#f5a623]/10 transition-colors duration-300" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-[#0a1628] font-bold text-sm">
                    CHF {workshop.price}.–
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0a1628] mb-2 group-hover:text-[#f5a623] transition-colors">
                  {workshop.title}
                </h3>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#f5a623]" />
                    <span>{workshop.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#f5a623]" />
                    <span>{workshop.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{workshop.description}</p>

                {/* CTA */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#f5a623] font-medium group-hover:gap-3 transition-all"
                >
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-6">
            Workshops können separat oder zusammen mit dem Tagesticket gebucht werden.
          </p>
          <Button variant="outline" href="#tickets">
            Alle Pakete ansehen
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
