"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";
import Button from "./Button";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);

      // Hide when near bottom (footer area)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      setIsAtBottom(scrollTop + clientHeight > scrollHeight - 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isAtBottom && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-[#daaf7a]/15 shadow-lg md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2d2420]">
                Ab CHF 99.–
              </p>
              <p className="text-xs text-[#8b7b6b]">
                Nur noch wenige Plätze!
              </p>
            </div>
            <Button variant="primary" size="md" href="#tickets">
              <Ticket className="w-4 h-4 mr-2" />
              Tickets
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
