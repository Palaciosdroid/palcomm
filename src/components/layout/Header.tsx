"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/data";
import Button from "../ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-[#2d2420]" : "text-white"
              }`}>
                Angstfrei<span className="text-[#daaf7a]">-Tag</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-300 text-sm font-medium tracking-wide hover:text-[#daaf7a] ${
                    isScrolled ? "text-[#5c4a3a]" : "text-white/90"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <Button variant="primary" size="sm" href="#tickets">
                Tickets
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled ? "text-[#2d2420]" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#fdfcfa] pt-24"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-8 p-8"
            >
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="text-[#2d2420] text-2xl font-medium tracking-wide hover:text-[#daaf7a] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  href="#tickets"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jetzt Platz sichern
                </Button>
              </motion.div>
            </motion.nav>

            {/* Decorative blob */}
            <div className="absolute bottom-20 right-10 w-64 h-64 blob bg-gradient-to-br from-[#daaf7a]/10 to-[#c4a484]/5 blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
