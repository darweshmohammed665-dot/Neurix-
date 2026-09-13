import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DarkNeonIntroReveal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quick, high-impact cinematic aperture reveal (0.95s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.08,
            filter: 'blur(12px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#0F172A] overflow-hidden"
        >
          {/* Expanding Neon Energy Rings */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.8, 3.5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute w-[400px] h-[400px] rounded-full border-2 border-[#FBBF24] shadow-[0_0_80px_rgba(251,191,36,0.3)]"
          />

          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 1.4, 2.8], opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
            className="absolute w-[350px] h-[350px] rounded-full border border-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.2)]"
          />

          {/* Central Golden Core Aperture */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: [0.5, 1.15, 1], opacity: [0, 1, 0.9], rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center p-8 z-10"
          >
            {/* Glowing Golden Geometric 'N' Symbol */}
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-[#FBBF24]/30 rounded-2xl blur-xl animate-pulse" />
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_20px_#FBBF24]">
                <rect x="10" y="10" width="80" height="80" rx="16" stroke="#FBBF24" strokeWidth="4" fill="#0F172A" />
                <path d="M 28 72 L 28 28 L 38 28 L 38 72 Z" fill="#FBBF24" />
                <path d="M 36 28 L 64 68 L 64 74 L 54 74 L 28 34 L 28 28 Z" fill="#FBBF24" />
                <path d="M 62 72 L 62 28 L 72 28 L 72 72 Z" fill="#FBBF24" />
              </svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-xs font-mono font-bold tracking-[0.4em] text-[#FBBF24] uppercase"
            >
              NEURIX // INITIALIZING
            </motion.p>
          </motion.div>

          {/* Horizontal Golden Laser Sweep */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_20px_#FBBF24]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DarkNeonIntroReveal;
