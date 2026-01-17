"use client";

import { motion } from "framer-motion";
import { certificatesContent } from "@/lib/data";

export default function CertificatesSection() {
  return (
    <section className="section-padding gradient-sage">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
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
              {/* Certificate Image Placeholder */}
              <div className="w-full aspect-[4/3] bg-white rounded-lg shadow-card border border-sage-100 flex items-center justify-center mb-4 overflow-hidden">
                {/* Placeholder for certificate image */}
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-sage-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-sage-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-text-muted">{cert.title}</p>
                </div>
              </div>

              {/* Certificate Info */}
              <p className="text-sm text-text-light text-center">{cert.issuer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
