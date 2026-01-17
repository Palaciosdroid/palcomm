"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certificatesContent } from "@/lib/data";

export default function CertificatesSection() {
  return (
    <section className="section-padding gradient-sage">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Certificates Grid - responsive for 5 items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {certificatesContent.certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Certificate Image */}
              <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-card border border-sage-100 overflow-hidden relative hover:shadow-medium transition-shadow duration-300">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
