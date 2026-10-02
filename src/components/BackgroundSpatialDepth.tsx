import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const BackgroundSpatialDepth: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Create different movement rates for depth layers
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" ref={containerRef}>
      {/* Layer 1: Distant Slow Elements */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-[1px] h-64 bg-gradient-to-b from-transparent via-neurix-cyan/20 to-transparent" />
        <div className="absolute top-[45%] right-[15%] w-[1px] h-96 bg-gradient-to-b from-transparent via-neurix-cyan/10 to-transparent" />
        <div className="absolute top-[75%] left-[20%] w-[1px] h-48 bg-gradient-to-b from-transparent via-neurix-cyan/15 to-transparent" />
      </motion.div>

      {/* Layer 2: Medium Elements */}
      <motion.div style={{ y: y2, opacity }} className="absolute inset-0">
        <div className="absolute top-[25%] right-[10%] w-32 h-32 border border-neurix-cyan/5 rotate-45" />
        <div className="absolute top-[65%] left-[5%] w-48 h-48 border border-neurix-cyan/5 -rotate-12" />
        <div className="absolute top-[85%] right-[20%] w-24 h-24 border border-neurix-cyan/5 rotate-90" />
      </motion.div>

      {/* Layer 3: Occasional Floating Nodes */}
      <motion.div style={{ y: y3, opacity }} className="absolute inset-0">
        <div className="absolute top-[10%] right-[30%] w-1.5 h-1.5 bg-neurix-cyan/20 rounded-full blur-[2px]" />
        <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-neurix-cyan/30 rounded-full blur-[1px]" />
        <div className="absolute top-[60%] right-[40%] w-2 h-2 bg-neurix-cyan/10 rounded-full blur-[3px]" />
        <div className="absolute top-[90%] left-[35%] w-1 h-1 bg-neurix-cyan/40 rounded-full blur-[1px]" />
      </motion.div>
      
      {/* Horizontal Scan Lines (Fixed or very slow) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
};
