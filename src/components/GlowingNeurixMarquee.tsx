import React from 'react';
import { motion } from 'framer-motion';

export const GlowingNeurixMarquee: React.FC = () => {
  const text = "NEURIX_PROTOCOL";
  
  return (
    <div className="relative w-full overflow-hidden bg-[#050B14] py-12 border-y border-white/5 z-0 select-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap will-change-transform items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-8xl sm:text-[12rem] font-black tracking-tighter mx-12 text-transparent stroke-neurix-cyan/20" style={{ WebkitTextStroke: '1px rgba(0, 217, 255, 0.15)' }}>
                {text}
              </span>
              <div className="w-4 h-4 rounded-full border border-neurix-cyan/30 mx-12" />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050B14] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050B14] to-transparent z-10" />
    </div>
  );
};

export default GlowingNeurixMarquee;
