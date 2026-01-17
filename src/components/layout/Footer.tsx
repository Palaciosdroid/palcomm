"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { footerContent, practiceInfo, navigation } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-100 border-t border-sage-100">
      {/* Main Footer */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex flex-col leading-tight mb-3">
              <span
                className="text-xl font-medium text-brand"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {practiceInfo.name.split(" ")[0]}
              </span>
              <span
                className="text-base text-brand-light"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {practiceInfo.name.split(" ")[1]}
              </span>
            </div>
            <a
              href={`mailto:${footerContent.email}`}
              className="text-sm text-sage-600 hover:text-sage-700 transition-colors"
            >
              {footerContent.email}
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3"
          >
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 hover:text-sage-700 hover:bg-sage-200 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 hover:text-sage-700 hover:bg-sage-200 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 hover:text-sage-700 hover:bg-sage-200 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Certificates Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            {/* Placeholder badges */}
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
              <span className="text-xs text-sage-400">NGH</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
              <span className="text-xs text-sage-400">VSH</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage-100">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-light">
            <p>&copy; {currentYear} {footerContent.copyright}</p>
            <div className="flex gap-6">
              {footerContent.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="hover:text-sage-600 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
