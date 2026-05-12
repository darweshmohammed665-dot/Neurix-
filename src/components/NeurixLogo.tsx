import React from 'react';
import { motion } from 'motion/react';

export const NeurixLogo = React.memo(({ className = "w-10 h-10" }: { className?: string }) => (
  <motion.div 
    className={`relative ${className}`}
    whileHover={{ scale: 1.05 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088ff" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
      {/* Outer abstract shape */}
      <motion.path 
        d="M20,30 L50,10 L80,30 L80,70 L50,90 L20,70 Z" 
        fill="none" 
        stroke="url(#logoGradient)" 
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* The 'N' structure */}
      <path 
        d="M35,65 L35,35 L65,65 L65,35" 
        fill="none" 
        stroke="url(#logoGradient)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Neural points */}
      <motion.circle 
        cx="35" cy="35" r="3" fill="#0088ff"
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="65" cy="65" r="3" fill="#ffff00"
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </svg>
    <div className="absolute inset-0 bg-blue-600/30 blur-xl rounded-full -z-10 animate-pulse" />
  </motion.div>
));

NeurixLogo.displayName = 'NeurixLogo';
