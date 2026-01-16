"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail, MapPin, Calendar, Heart } from "lucide-react";
import { eventDetails } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d2420] text-white">
      {/* Wave Top */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 30C360 60 720 0 1080 30C1260 45 1380 45 1440 30V60H0V30Z"
            fill="#2d2420"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-light mb-4">
              Angstfrei<span className="text-[#daaf7a]">-Tag</span>
            </h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {eventDetails.slogan}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#daaf7a] hover:bg-white/10 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#daaf7a] hover:bg-white/10 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#daaf7a] hover:bg-white/10 transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-sm uppercase tracking-wider text-[#daaf7a] mb-5">Navigation</h4>
            <ul className="space-y-3">
              {["Programm", "Speaker", "Tickets", "Workshops"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors duration-300 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-sm uppercase tracking-wider text-[#daaf7a] mb-5">Event</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Calendar className="w-4 h-4 text-[#daaf7a]" />
                {eventDetails.date}
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#daaf7a]" />
                {eventDetails.location}
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-[#daaf7a]" />
                info@angstfrei-tag.ch
              </li>
            </ul>
          </motion.div>

          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-sm uppercase tracking-wider text-[#daaf7a] mb-5">Partner</h4>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white/5 rounded-full text-white/40 text-xs">
                Kanton Bern
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-full text-white/40 text-xs">
                Bern Welcome
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
            <p className="flex items-center gap-1">
              &copy; {currentYear} Angstfrei-Tag. Mit <Heart className="w-3 h-3 text-[#daaf7a]" /> gestaltet.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors duration-300">Impressum</a>
              <a href="#" className="hover:text-white/60 transition-colors duration-300">Datenschutz</a>
              <a href="#" className="hover:text-white/60 transition-colors duration-300">AGB</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
