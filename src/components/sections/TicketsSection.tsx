"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Mail } from "lucide-react";
import { tickets } from "@/lib/data";
import TicketCard from "../ui/TicketCard";

export default function TicketsSection() {
  return (
    <section id="tickets" className="relative py-24 md:py-32 bg-gradient-to-b from-[#fdfcfa] to-[#f5f0e8] overflow-hidden">
      {/* Organic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 blob bg-gradient-to-br from-[#daaf7a]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 blob-2 bg-gradient-to-tl from-[#d4a5a5]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#daaf7a] text-sm uppercase tracking-widest mb-4">
            Deine Investition
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2420] mb-6">
            Wähle deinen <span className="text-gradient font-normal">Weg</span>
          </h2>
          <p className="text-[#6b5b4f] max-w-xl mx-auto text-lg leading-relaxed">
            Jedes Ticket öffnet dir die Tür zu einem Tag voller Transformation.
            Welcher Weg passt am besten zu dir?
          </p>

          {/* Gentle Urgency Note */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-soft border border-[#daaf7a]/10"
          >
            <div className="w-2 h-2 rounded-full bg-[#daaf7a] animate-pulse" />
            <span className="text-[#5c4a3a] text-sm">
              Frühbucherpreis bis <span className="font-medium text-[#daaf7a]">31. August 2026</span>
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
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3 text-[#6b5b4f]">
              <div className="w-10 h-10 rounded-full bg-[#daaf7a]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#daaf7a]" />
              </div>
              <span className="text-sm">Sichere Bezahlung</span>
            </div>
            <div className="flex items-center gap-3 text-[#6b5b4f]">
              <div className="w-10 h-10 rounded-full bg-[#daaf7a]/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#daaf7a]" />
              </div>
              <span className="text-sm">14 Tage Geld-zurück</span>
            </div>
            <div className="flex items-center gap-3 text-[#6b5b4f]">
              <div className="w-10 h-10 rounded-full bg-[#daaf7a]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#daaf7a]" />
              </div>
              <span className="text-sm">Sofortige Bestätigung</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#8b7b6b] text-sm">
            Fragen? Wir sind für dich da.{" "}
            <a href="#" className="text-[#daaf7a] hover:underline underline-offset-4 transition-colors">
              Schreib uns
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
