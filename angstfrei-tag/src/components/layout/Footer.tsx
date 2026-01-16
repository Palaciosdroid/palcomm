"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail, MapPin, Calendar } from "lucide-react";
import { eventDetails } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Angstfrei<span className="text-[#f5a623]">-Tag</span>
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {eventDetails.slogan}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-[#f5a623] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#f5a623] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#f5a623] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#programm" className="text-white/60 hover:text-white transition-colors text-sm">
                  Programm
                </a>
              </li>
              <li>
                <a href="#speaker" className="text-white/60 hover:text-white transition-colors text-sm">
                  Speaker
                </a>
              </li>
              <li>
                <a href="#tickets" className="text-white/60 hover:text-white transition-colors text-sm">
                  Tickets
                </a>
              </li>
              <li>
                <a href="#workshops" className="text-white/60 hover:text-white transition-colors text-sm">
                  Workshops
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Event Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar className="w-4 h-4 text-[#f5a623]" />
                {eventDetails.date}
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#f5a623]" />
                {eventDetails.location}
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#f5a623]" />
                info@angstfrei-tag.ch
              </li>
            </ul>
          </motion.div>

          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Unterstützt durch</h4>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg text-white/60 text-xs">
                Kanton Bern
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-white/60 text-xs">
                Bern Welcome
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>&copy; {currentYear} Angstfrei-Tag. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
