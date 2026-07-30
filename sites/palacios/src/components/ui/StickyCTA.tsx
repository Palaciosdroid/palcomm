"use client";

import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { defaultContent } from "@/lib/content";
import type { BusinessInfo } from "@/types/content";

interface StickyCTAProps {
  business?: BusinessInfo;
}

export default function StickyCTA({ business }: StickyCTAProps) {
  const info = business || defaultContent.business;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-sm border-t border-accent-200 p-3 safe-area-bottom"
    >
      <div className="flex gap-3">
        <a
          href={`tel:${info.phone.replace(/\s/g, '')}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-brand text-brand font-medium text-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          Anrufen
        </a>
        <a
          href="#kontakt"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-brand text-white font-medium text-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <Calendar className="w-4 h-4" />
          Termin buchen
        </a>
      </div>
    </motion.div>
  );
}
