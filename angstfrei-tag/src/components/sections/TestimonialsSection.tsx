"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import TestimonialCard from "../ui/TestimonialCard";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#f5f7fa] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#f5a623]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#0a1628]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#0a1628] text-[#f5a623] text-sm font-semibold uppercase tracking-wider mb-4">
            Erfahrungen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            Was unsere <span className="text-gradient">Teilnehmer</span> sagen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lies, was andere über ihre Erfahrungen beim Angstfrei-Tag berichten.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard
                  quote={testimonials[currentIndex].quote}
                  name={testimonials[currentIndex].name}
                  role={testimonials[currentIndex].role}
                  image={testimonials[currentIndex].image}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-[#0a1628]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#f5a623]"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-[#0a1628]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
