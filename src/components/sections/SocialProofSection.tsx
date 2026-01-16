"use client";

import { motion } from "framer-motion";
import { Users, Mic, Heart, Sparkles } from "lucide-react";
import { stats } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "Teilnehmer": <Users className="w-6 h-6" />,
  "Weltklasse-Speaker": <Mic className="w-6 h-6" />,
  "Vorträge": <Sparkles className="w-6 h-6" />,
  "Zufriedenheit": <Heart className="w-6 h-6" />,
};

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="relative py-24 md:py-32 bg-[#fdfcfa] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 blob bg-gradient-to-br from-[#daaf7a]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 blob-2 bg-gradient-to-tr from-[#a8b5a0]/5 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#daaf7a] text-sm uppercase tracking-widest mb-4">
            Gemeinsam stark
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2d2420] mb-6">
            Werde Teil unserer{" "}
            <span className="text-gradient font-normal">Community</span>
          </h2>
          <p className="text-[#6b5b4f] max-w-xl mx-auto text-lg leading-relaxed">
            Tausende Menschen haben bereits ihren Weg zur Angstfreiheit begonnen.
            Lass dich inspirieren und wachse mit uns.
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-warm transition-all duration-500 text-center border border-[#daaf7a]/10 hover:border-[#daaf7a]/20">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#daaf7a]/10 to-[#c4a484]/5 text-[#daaf7a] mb-5 group-hover:scale-105 transition-transform duration-500">
                  {iconMap[stat.label]}
                </div>

                {/* Value */}
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.2 }}
                  className="text-3xl md:text-4xl font-light text-[#2d2420] mb-2"
                >
                  {stat.value}
                </motion.p>

                {/* Label */}
                <p className="text-[#8b7b6b] text-sm tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-5 rounded-full bg-white shadow-soft border border-[#daaf7a]/10">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-white flex items-center justify-center text-[#daaf7a] text-xs font-medium"
                >
                  {["M", "S", "T", "L", "A"][i]}
                </div>
              ))}
            </div>
            <p className="text-[#5c4a3a] text-sm">
              <span className="font-medium text-[#daaf7a]">+127 neue Anmeldungen</span> in den letzten 7 Tagen
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
