"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background Fallback (visible until video loads) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(168, 181, 160, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(139, 152, 130, 0.5) 0%, transparent 45%),
            radial-gradient(ellipse at 90% 30%, rgba(201, 212, 197, 0.7) 0%, transparent 40%),
            radial-gradient(ellipse at 10% 80%, rgba(160, 175, 150, 0.4) 0%, transparent 50%),
            linear-gradient(180deg, #b8c4a8 0%, #9aab8a 30%, #c2cdb5 60%, #a8b898 100%)
          `
        }}
      />

      {/* Blur overlay for dreamy effect */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Video Background (loads over gradient) */}
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

      {/* Subtle light overlay */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-32">
        {/* Semi-transparent Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-8 py-14 md:px-20 md:py-20 text-center rounded-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)"
          }}
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl mb-10"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              color: "#3d4a3a"
            }}
          >
            {heroContent.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "#5a6657" }}
          >
            &laquo;{heroContent.description}&raquo;
          </motion.p>

          {/* Subtitle - grösser und leserlicher */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl font-semibold"
            style={{ color: "#3d4a3a" }}
          >
            Professionell und{" "}
            <span
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                color: "#89715c"
              }}
            >
              Kompetent
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* Organic Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C180 100 360 20 540 60C720 100 900 40 1080 70C1200 90 1320 50 1440 60V120H0V60Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
