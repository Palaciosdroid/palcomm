'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CertificatesContent } from '@/types/content';

interface CertificatesSectionEditorProps {
  content: CertificatesContent;
  onChange: (data: Partial<CertificatesContent>) => void;
}

export default function CertificatesSectionEditor({ content }: CertificatesSectionEditorProps) {
  const duplicatedCerts = [...content.certificates, ...content.certificates];

  return (
    <section className="py-16 md:py-24 gradient-sage overflow-hidden">
      <div className="text-center mb-8 px-6">
        <p className="text-text-medium text-sm">Zertifikate werden automatisch angezeigt</p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        <motion.div
          className="flex gap-6 md:gap-8"
          animate={{
            x: [0, -50 * content.certificates.length + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedCerts.map((cert, index) => (
            <div key={`${cert.id}-${index}`} className="flex-shrink-0">
              <div className="h-64 md:h-80 lg:h-96 bg-white rounded-2xl shadow-card border border-sage-100 overflow-hidden hover:shadow-medium transition-shadow duration-300">
                <div className="relative h-full w-auto">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={500}
                    className="h-full w-auto object-contain p-3"
                    style={{ maxWidth: 'none' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
