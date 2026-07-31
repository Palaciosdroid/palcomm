"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { defaultContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import type { HeroContent } from "@/types/content";

interface HeroSectionProps {
  content?: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const data = content || defaultContent.hero;
  const video = siteConfig.heroVideo;
  // Ein Foto haben fast alle, ein Video fast niemand. Ohne beides bleibt der
  // Farbverlauf — der wirkt auf einem grossen Schirm sehr leer.
  const foto = video ? null : siteConfig.heroImage;
  const medium = video ?? foto;

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden isolate ${
        medium ? "bg-accent-300" : "gradient-hero"
      }`}
    >
      {/* Hintergrundvideo — nur wenn in der Site-Config eines hinterlegt ist */}
      {video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback.jpg"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Hintergrundfoto — dieselbe Rolle wie das Video, nur der Normalfall */}
      {foto && (
        <Image
          src={foto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />
      )}

      {/* Abdunklung oben, damit die Navigation auf dem Medium lesbar bleibt */}
      {medium && (
        <div
          className="absolute inset-x-0 top-0 h-32 z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 min-[400px]:px-6 md:px-8 pt-24 min-[400px]:pt-32 pb-24 min-[400px]:pb-32">
        {/* Semi-transparent Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-5 py-10 min-[400px]:px-8 min-[400px]:py-14 md:px-20 md:py-20 text-center rounded-2xl min-[400px]:rounded-3xl"
          style={{
            // Ohne Foto steht die Karte auf einem hellen Verlauf und
            // verschwindet darauf. Mehr Deckung, sichtbare Kante, tieferer
            // Schatten — sonst wirkt das Startbild leer.
            background: "rgba(255, 255, 255, 0.62)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow: "0 18px 50px rgba(61, 74, 58, 0.10)"
          }}
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-display text-text-dark text-4xl min-[400px]:text-5xl md:text-6xl lg:text-7xl mb-6 min-[400px]:mb-10"
          >
            {data.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-text-medium text-base min-[400px]:text-xl md:text-2xl leading-relaxed mb-6 min-[400px]:mb-10 max-w-2xl mx-auto"
          >
            &laquo;{data.description}&raquo;
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-dark text-lg min-[400px]:text-xl md:text-2xl font-semibold"
          >
            {data.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Layered Organic Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          style={{ marginBottom: "-1px" }}
        >
          <path
            d="M0 80C240 120 480 40 720 80C960 120 1200 60 1440 90V150H0V80Z"
            fill="var(--accent-100)"
            opacity="0.5"
          />
          <path
            d="M0 100C200 60 400 120 600 90C800 60 1000 110 1200 80C1320 65 1400 85 1440 100V150H0V100Z"
            fill="var(--base-100)"
            opacity="0.7"
          />
          <path
            d="M0 110C180 130 360 95 540 115C720 135 900 100 1080 120C1260 140 1380 110 1440 125V150H0V110Z"
            fill="var(--base-50)"
          />
        </svg>
      </div>
    </section>
  );
}
