"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { welcomeContent } from "@/lib/data";

export default function WelcomeSection() {
  return (
    <section id="ueber-mich" className="relative section-padding pb-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {welcomeContent.title}
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          {welcomeContent.intro}
        </motion.p>

        {/* Portrait and Bio */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-sage-100 rounded-[60%_40%_50%_50%] -rotate-6" />

              {/* Image Container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 portrait-frame overflow-hidden">
                <Image
                  src={welcomeContent.image}
                  alt="Enza Gasser-Fiorini"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-text-medium text-lg leading-relaxed mb-6">
              <span className="text-brand font-medium">Mein Name ist </span>
              <span className="text-text-dark font-medium">Enza Gasser-Fiorini</span>
              , ich bin verheiratet und Mutter von 2 erwachsenen Söhne und zweifache
              Nonna. Meine Eltern waren Italiener (Rom/Apulien) und zudem geprägte
              Kriegskinder. Ich wuchs zweisprachig mit einer acht Jahren älteren
              Schwester in Bern auf. Uns wurde die Wertschätzung und respektvollen
              Umgang mit Menschen, Tiere und Umwelt mitgegeben.
            </p>
          </motion.div>
        </div>

        {/* Quote - Grösser und besser lesbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center py-12 px-6 bg-sage-100/50 rounded-2xl"
        >
          <p className="quote-text max-w-2xl mx-auto">
            {welcomeContent.quote}
          </p>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          style={{ marginBottom: "-1px" }}
        >
          <path
            d="M0 40C240 70 480 20 720 50C960 80 1200 30 1440 60V80H0V40Z"
            fill="#e5ebe3"
          />
        </svg>
      </div>
    </section>
  );
}
