"use client";

import { motion } from "framer-motion";
import { speakers } from "@/lib/data";
import SpeakerCard from "../ui/SpeakerCard";

export default function SpeakerSection() {
  const featuredSpeaker = speakers.find((s) => s.featured);
  const otherSpeakers = speakers.filter((s) => !s.featured);

  return (
    <section id="speaker" className="relative py-24 md:py-32 bg-gradient-to-b from-[#f5f0e8] to-[#fdfcfa] overflow-hidden">
      {/* Organic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-80 h-80 blob bg-gradient-to-br from-[#daaf7a]/10 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 blob-2 bg-gradient-to-tr from-[#a8b5a0]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#daaf7a] text-sm uppercase tracking-widest mb-4">
            Deine Begleiter
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2420] mb-6">
            Inspirierende <span className="text-gradient font-normal">Speaker</span>
          </h2>
          <p className="text-[#6b5b4f] max-w-xl mx-auto text-lg leading-relaxed">
            Lerne von Menschen, die selbst den Weg zur Angstfreiheit gegangen sind
            und ihr Wissen mit Herz und Leidenschaft teilen.
          </p>
        </motion.div>

        {/* Featured Speaker */}
        {featuredSpeaker && (
          <div className="mb-12 md:mb-16">
            <SpeakerCard
              name={featuredSpeaker.name}
              title={featuredSpeaker.title}
              topic={featuredSpeaker.topic}
              image={featuredSpeaker.image}
              featured={true}
              index={0}
            />
          </div>
        )}

        {/* Speaker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {otherSpeakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              title={speaker.title}
              topic={speaker.topic}
              image={speaker.image}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 40V80H0V40Z"
            fill="#fdfcfa"
          />
        </svg>
      </div>
    </section>
  );
}
