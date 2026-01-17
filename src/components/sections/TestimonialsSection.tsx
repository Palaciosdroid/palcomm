"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Nach nur wenigen Sitzungen konnte ich meine Flugangst überwinden. Enza hat eine wunderbare Art, einen durch den Prozess zu begleiten.",
    author: "Sarah M.",
    location: "Bern",
    rating: 5,
  },
  {
    id: 2,
    text: "Endlich kann ich wieder ruhig schlafen. Die Hypnosetherapie hat mir geholfen, meine innere Unruhe loszulassen. Sehr empfehlenswert!",
    author: "Thomas K.",
    location: "Thun",
    rating: 5,
  },
  {
    id: 3,
    text: "Professionell, einfühlsam und wirkungsvoll. Ich habe mich von Anfang an gut aufgehoben gefühlt. Die Blockaden sind endlich gelöst.",
    author: "Laura B.",
    location: "Bern",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding gradient-sage-reverse">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Erfahrungen
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-medium text-center mb-12"
        >
          Was meine Klienten sagen
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-medium text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-sage-100 pt-4">
                <p className="font-medium text-text-dark text-sm">
                  {testimonial.author}
                </p>
                <p className="text-text-light text-xs">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
