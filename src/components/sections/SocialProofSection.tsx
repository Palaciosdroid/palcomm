"use client";

import { motion } from "framer-motion";
import { Users, Mic, Star, Award } from "lucide-react";
import { stats } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "Teilnehmer": <Users className="w-8 h-8" />,
  "Weltklasse-Speaker": <Mic className="w-8 h-8" />,
  "Vorträge": <Star className="w-8 h-8" />,
  "Zufriedenheit": <Award className="w-8 h-8" />,
};

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="relative py-20 md:py-28 bg-[#f5f7fa] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
            Werde Teil einer{" "}
            <span className="text-gradient">grossen Community</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tausende Menschen haben bereits mit dem Angstfrei-Tag ihr Leben verändert.
            Sei auch du dabei!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#f5a623]/30">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] text-[#f5a623] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[stat.label]}
                </div>

                {/* Value */}
                <motion.p
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-2"
                >
                  {stat.value}
                </motion.p>

                {/* Label */}
                <p className="text-gray-500 font-medium">{stat.label}</p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f5a623]/0 to-[#ffd700]/0 group-hover:from-[#f5a623]/5 group-hover:to-[#ffd700]/5 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-8 items-center"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a2d4a] to-[#0a1628] border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm">
              <strong className="text-[#0a1628]">500+</strong> Anmeldungen diesen Monat
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#f5a623] fill-[#f5a623]"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              <strong className="text-[#0a1628]">4.9/5</strong> Bewertung
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
