"use client";

import { motion } from "framer-motion";
import { speakers } from "@/lib/data";
import SpeakerCard from "../ui/SpeakerCard";

export default function SpeakerSection() {
  const featuredSpeaker = speakers.find((s) => s.featured);
  const otherSpeakers = speakers.filter((s) => !s.featured);

  return (
    <section id="speaker" className="relative py-20 md:py-28 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-[#daaf7a] text-sm font-semibold uppercase tracking-wider mb-4">
            Die Speaker
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{speakers.length} Weltklasse</span> Vorträge
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Lerne von den besten Experten im deutschsprachigen Raum.
            Jeder Vortrag ist vollgepackt mit praktischen Tipps.
          </p>
        </motion.div>

        {/* Featured Speaker */}
        {featuredSpeaker && (
          <div className="mb-8 md:mb-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
