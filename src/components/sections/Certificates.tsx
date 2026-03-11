import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, X, ZoomIn } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import cer1 from '@/assets/cer1.jpg';
import cer2 from '@/assets/cer2.jpg';
import cer3 from '@/assets/cer3.png';

const certificates = [
  {
    title: 'Full Stack Web Development Using .Net Track',
    issuer: 'ITI EL Minya',
    year: '2025',
    image: cer1,
    color: 'hsl(265 80% 65%)',
  },
  {
    title: 'SQL',
    issuer: '365datascience',
    year: '2023',
    image: cer2,
    color: 'hsl(0 90% 55%)',
  },
  {
    title: 'Feature Engineering',
    issuer: 'ML1000',
    year: '2022',
    image: cer3,
    color: 'hsl(195 100% 50%)',
  },
];

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="certificates" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(265 80% 60% / 0.25), transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Certificates
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">Professional certifications & achievements</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer"
            >
              <div
                className="rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-xl transition-all duration-300 hover:border-transparent"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cert.color}50`;
                  e.currentTarget.style.boxShadow = `0 15px 40px ${cert.color}20, 0 0 0 1px ${cert.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div
                      className="p-3 rounded-full"
                      style={{ background: `${cert.color}30`, color: cert.color }}
                    >
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: cert.color }}
                  >
                    {cert.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-6 right-6 p-3 rounded-xl border border-border bg-card/80 text-foreground hover:text-primary hover:border-primary/50 transition-all"
              onClick={() => setSelectedCert(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full rounded-2xl border-2 border-border shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">{selectedCert.title}</h3>
                <p className="text-muted-foreground">{selectedCert.issuer} • {selectedCert.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
