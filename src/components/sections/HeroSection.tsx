"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowDown } from "lucide-react";
import { eventDetails } from "@/lib/data";
import CountdownTimer from "../ui/CountdownTimer";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628]">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating organic blobs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] blob bg-gradient-to-br from-[#daaf7a]/20 to-[#daaf7a]/5 blur-3xl"
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
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] blob-2 bg-gradient-to-tr from-[#1a3a5c]/50 to-[#daaf7a]/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#daaf7a]/10 blur-3xl"
        />

        {/* Subtle star-like dots */}
        <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-white/30" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#daaf7a]/50" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/20" />
        <div className="absolute top-2/3 right-1/2 w-1 h-1 rounded-full bg-[#daaf7a]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[#daaf7a] text-sm font-semibold uppercase tracking-wider">
              {eventDetails.name}
            </span>
          </motion.div>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl mb-4"
          >
            {eventDetails.slogan}
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Entdecke die Kraft,
            <br />
            <span className="text-gradient">angstfrei zu leben</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ein Tag voller Inspiration, Transformation und Gemeinschaft.
            Lerne von den besten Experten, wie du deine Ängste überwinden
            und dein volles Potenzial entfalten kannst.
          </motion.p>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10"
          >
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-5 h-5 text-[#daaf7a]" />
              <span>{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-5 h-5 text-[#daaf7a]" />
              <span>{eventDetails.location}</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center mb-10"
          >
            <CountdownTimer targetDate={eventDetails.countdownTarget} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10"
          >
            <span className="inline-flex items-center gap-2 text-[#daaf7a] text-sm">
              <span className="w-2 h-2 bg-[#daaf7a] rounded-full animate-pulse" />
              Bereits über 2.500 Menschen haben ihr Leben verändert
            </span>
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
          opacity: { delay: 1, duration: 0.5 },
          y: { delay: 1, duration: 1.5, repeat: Infinity },
        }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2"
      >
        <a
          href="#social-proof"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">Mehr erfahren</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
