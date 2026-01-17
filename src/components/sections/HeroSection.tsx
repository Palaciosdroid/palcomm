"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft organic shapes */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-32 w-96 h-96 rounded-full bg-sage-300/30 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full bg-cream-300/40 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-20 text-center">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl text-text-dark mb-6"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {heroContent.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-medium text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto"
        >
          {heroContent.description}
        </motion.p>

        {/* Subtitle Badge */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sage-600 text-base italic mb-10"
        >
          {heroContent.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href={heroContent.ctaLink}
            className="btn-primary inline-flex"
          >
            {heroContent.ctaText}
          </a>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
