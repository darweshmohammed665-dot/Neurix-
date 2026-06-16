import React from 'react';
import { motion } from 'motion/react';

export const NeurixLogo = React.memo(({ className = "w-10 h-10" }: { className?: string }) => (
  <motion.div 
    className={`relative ${className}`}
    variants={{
      hover: { 
        scale: 1.1,
        rotateY: 360,
      }
    }}
    whileHover="hover"
    transition={{
      rotateY: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: 0.4 }
    }}
    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
  >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,159,0,0.6)]">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff5f00">
               <animate attributeName="stop-color" values="#ff5f00;#ff9f00;#ffbf00;#ff5f00" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#ffbf00">
               <animate attributeName="stop-color" values="#ffbf00;#ff5f00;#ff9f00;#ffbf00" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ff9f00">
               <animate attributeName="stop-color" values="#ff9f00;#ffbf00;#ff5f00;#ff9f00" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        {/* Outer abstract shape */}
        <motion.path 
          d="M20,30 L50,10 L80,30 L80,70 L50,90 L20,70 Z" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* The 'N' structure */}
        <path 
          d="M35,65 L35,35 L65,65 L65,35" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Neural points */}
        <motion.circle 
          cx="35" cy="35" r="3" fill="#ffbf00"
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle 
          cx="65" cy="65" r="3" fill="#ff5f00"
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>
      <div className="absolute inset-0 bg-phosphor/20 blur-xl rounded-full -z-10 animate-pulse" />
  </motion.div>
));

NeurixLogo.displayName = 'NeurixLogo';
