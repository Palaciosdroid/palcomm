"use client";

import { motion } from "framer-motion";
import { Shield, Clock } from "lucide-react";
import { tickets } from "@/lib/data";
import TicketCard from "../ui/TicketCard";

export default function TicketsSection() {
  return (
    <section id="tickets" className="relative py-20 md:py-28 bg-[#f5f7fa] overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0a1628]/5 via-transparent to-[#f5a623]/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#0a1628] text-[#f5a623] text-sm font-semibold uppercase tracking-wider mb-4">
            Tickets
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            Sichere dir deinen <span className="text-gradient">Platz</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wähle das Ticket, das am besten zu dir passt.
            Alle Tickets beinhalten Zugang zu allen Vorträgen.
          </p>

          {/* Urgency Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#0a1628]"
          >
            <Clock className="w-4 h-4 text-[#f5a623]" />
            <span className="text-sm font-medium">
              Frühbucherpreis nur noch bis <strong>31. August 2026</strong>!
            </span>
          </motion.div>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {tickets.map((ticket, index) => (
            <TicketCard
              key={ticket.id}
              name={ticket.name}
              price={ticket.price}
              currency={ticket.currency}
              description={ticket.description}
              features={ticket.features}
              highlighted={ticket.highlighted}
              badge={ticket.badge}
              index={index}
            />
          ))}
        </div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#f5a623]" />
              <span>100% sichere Bezahlung</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>14 Tage Geld-zurück-Garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Sofortige Bestätigung per E-Mail</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500">
            Fragen?{" "}
            <a href="#" className="text-[#f5a623] hover:underline font-medium">
              Kontaktiere uns
            </a>{" "}
            oder lies unsere{" "}
            <a href="#" className="text-[#f5a623] hover:underline font-medium">
              FAQ
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
