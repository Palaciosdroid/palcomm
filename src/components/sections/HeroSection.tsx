"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowDown } from "lucide-react";
import { eventDetails } from "@/lib/data";
import CountdownTimer from "../ui/CountdownTimer";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fdfcfa] via-[#f5f0e8] to-[#fdfcfa]">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating organic blobs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-[10%] w-72 h-72 md:w-96 md:h-96 blob bg-gradient-to-br from-[#daaf7a]/20 to-[#c4a484]/10 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-[5%] w-64 h-64 md:w-80 md:h-80 blob-2 bg-gradient-to-tr from-[#a8b5a0]/15 to-[#d4a5a5]/10 blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-[#b8a9c9]/10 blur-3xl"
        />

        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-[#daaf7a]/40" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-[#c4a484]/30" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-[#a8b5a0]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#daaf7a]/20 text-[#5c4a3a] text-sm font-medium tracking-wide shadow-soft">
              {eventDetails.name}
            </span>
          </motion.div>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[#6b5b4f] text-lg md:text-xl mb-6 font-light"
          >
            {eventDetails.slogan}
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2d2420] mb-8 leading-tight tracking-tight"
          >
            Entdecke die Kraft,
            <br />
            <span className="text-gradient font-normal">angstfrei zu leben</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-[#6b5b4f] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ein Tag voller Inspiration, Transformation und Gemeinschaft.
            Lerne von den besten Experten, wie du deine Ängste überwinden
            und dein volles Potenzial entfalten kannst.
          </motion.p>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12"
          >
            <div className="flex items-center gap-2.5 text-[#5c4a3a]">
              <div className="w-10 h-10 rounded-full bg-[#daaf7a]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#daaf7a]" />
              </div>
              <span className="font-medium">{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#5c4a3a]">
              <div className="w-10 h-10 rounded-full bg-[#daaf7a]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#daaf7a]" />
              </div>
              <span className="font-medium">{eventDetails.location}</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-12"
          >
            <CountdownTimer targetDate={eventDetails.countdownTarget} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" href="#tickets">
              Jetzt Platz sichern
            </Button>
            <Button variant="secondary" size="lg" href="#programm">
              Mehr erfahren
            </Button>
          </motion.div>

          {/* Trust Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-10"
          >
            <p className="text-[#8b7b6b] text-sm">
              Bereits über <span className="text-[#daaf7a] font-medium">2.500 Menschen</span> haben ihr Leben verändert
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <a
          href="#social-proof"
          className="flex flex-col items-center gap-2 text-[#8b7b6b] hover:text-[#daaf7a] transition-colors duration-300"
        >
          <span className="text-xs tracking-widest uppercase">Entdecken</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
