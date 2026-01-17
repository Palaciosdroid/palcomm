"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/nature-bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle Overlay for better readability */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-20">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card px-8 py-12 md:px-16 md:py-16 text-center"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl text-text-dark mb-8"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic"
            }}
          >
            {heroContent.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-text-medium text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto"
          >
            &laquo;{heroContent.description}&raquo;
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-dark text-lg font-medium"
          >
            Professionell und{" "}
            <span
              style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic" }}
              className="text-brand"
            >
              Kompetent
            </span>
          </motion.p>
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
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V80Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
