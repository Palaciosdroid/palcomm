"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-sage-300">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-fallback.jpg"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/videos/nature-bg.mp4" type="video/mp4" />
        Dein Browser unterstützt keine Videos.
      </video>

      {/* Dark gradient overlay for navigation readability */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-[5]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-32">
        {/* Semi-transparent Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-8 py-14 md:px-20 md:py-20 text-center rounded-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
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

          {/* Subtitle */}
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

      {/* Layered Organic Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80C240 120 480 40 720 80C960 120 1200 60 1440 90V150H0V80Z"
            fill="#f4f6f3"
            opacity="0.5"
          />
          <path
            d="M0 100C200 60 400 120 600 90C800 60 1000 110 1200 80C1320 65 1400 85 1440 100V150H0V100Z"
            fill="#faf8f5"
            opacity="0.7"
          />
          <path
            d="M0 110C180 130 360 95 540 115C720 135 900 100 1080 120C1260 140 1380 110 1440 125V150H0V110Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
