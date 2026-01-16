"use client";

import { motion } from "framer-motion";
import { Heart, Users, Sparkles } from "lucide-react";
import Button from "../ui/Button";

export default function HeartSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#2d2420] via-[#1a2d4a] to-[#2d2420] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#daaf7a]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#daaf7a] text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Das Herzstück
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Das Herzstück des{" "}
              <span className="text-gradient">Angstfrei-Tags</span>
            </h2>

            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Der Angstfrei-Tag ist mehr als nur ein Event – es ist eine
              Gemeinschaft von Menschen, die sich gegenseitig auf dem Weg
              zu einem angstfreien Leben unterstützen.
            </p>

            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Hier triffst du Gleichgesinnte, die verstehen, was du durchmachst.
              Gemeinsam lernen, wachsen und heilen wir.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#daaf7a]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#daaf7a]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Echte Verbindungen</h4>
                  <p className="text-white/60 text-sm">
                    Networking mit Menschen, die deine Reise verstehen
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#daaf7a]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#daaf7a]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Nachhaltige Transformation</h4>
                  <p className="text-white/60 text-sm">
                    Praktische Tools, die du sofort in deinem Leben anwenden kannst
                  </p>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" href="#tickets">
              Jetzt Teil werden
            </Button>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-[#daaf7a]/20"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-full border border-white/10"
              />

              {/* Center Content */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-[#daaf7a] to-[#ffd700] flex items-center justify-center">
                <Heart className="w-16 h-16 text-[#2d2420]" />
              </div>

              {/* Floating Elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute w-3 h-3 rounded-full bg-[#daaf7a]"
                  style={{
                    top: `${20 + i * 12}%`,
                    left: `${10 + i * 15}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
