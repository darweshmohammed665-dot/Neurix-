import React from 'react';
import { motion } from 'framer-motion';

export const GlowingNeurixMarquee: React.FC = () => {
  const text = "NEURIX";
  
  return (
    <div className="relative w-full overflow-hidden bg-[#0F172A] py-8 sm:py-16 border-y border-[#FBBF24]/20 z-0 select-none">
      {/* Intense background glow behind the text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.05)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex whitespace-nowrap will-change-transform items-center"
        >
          {/* Duplicate the word multiple times to ensure seamless infinite scroll */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-7xl sm:text-9xl lg:text-[10rem] font-black font-display tracking-[0.3em] mx-8 sm:mx-16"
                style={{
                  color: '#FBBF24',
                  textShadow: '0 0 15px rgba(251,191,36,0.3), 0 0 30px rgba(251,191,36,0.2), 0 0 60px rgba(251,191,36,0.1), 0 0 100px rgba(251,191,36,0.05)',
                  WebkitTextStroke: '2px rgba(251,191,36,0.3)',
                  opacity: 0.95
                }}
              >
                {text}
              </span>
              <span className="text-4xl text-[#FBBF24]/30 mx-8">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GlowingNeurixMarquee;
