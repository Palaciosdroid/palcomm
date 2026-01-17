"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { navigation, practiceInfo } from "@/lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
            ? "bg-white/95 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt={practiceInfo.name}
                width={160}
                height={65}
                className={`h-14 md:h-16 w-auto transition-all duration-500 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-text-medium hover:text-brand"
                      : "text-white/90 hover:text-white"
                  } ${index === 0 ? "text-brand" : ""}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-brand" : "text-white"
              }`}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
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
            className="fixed inset-0 z-40 bg-cream-50 pt-28"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-6 p-8"
            >
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="text-text-dark text-2xl font-medium hover:text-brand transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
