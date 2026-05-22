import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Cpu, Layers, Radio, HelpCircle, Code, Eye, RefreshCw } from 'lucide-react';

interface Interactive3DObjectProps {
  stage: 'hook' | 'problem' | 'solution';
  onNextStage?: () => void;
}

export const Interactive3DObject: React.FC<Interactive3DObjectProps> = ({ stage, onNextStage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Tracks the mouse position over the element to control the 3D rotation and perspective shift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // range -0.5 to 0.5
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Compute transform based on stage and mouse position
  const getObjectRotation = () => {
    const baseTiltX = mousePos.y * -30;
    const baseTiltY = mousePos.x * 30;

    switch (stage) {
      case 'problem':
        // Zoom-in tightly on a critical, warning area
        return {
          rotateX: baseTiltX + 15,
          rotateY: baseTiltY - 45,
          scale: 1.4,
          z: 80,
          transition: { type: 'spring', stiffness: 85, damping: 15 }
        };
      case 'solution':
        // Exploded view, slightly rotated and open
        return {
          rotateX: baseTiltX + 25,
          rotateY: baseTiltY + 35,
          scale: 1.05,
          z: 0,
          transition: { type: 'spring', stiffness: 70, damping: 12 }
        };
      case 'hook':
      default:
        // Slow float
        return {
          rotateX: baseTiltX,
          rotateY: baseTiltY,
          scale: 1,
          z: 0,
          transition: { type: 'spring', stiffness: 50, damping: 20 }
        };
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center p-6"
      style={{ perspective: '1200px' }}
    >
      {/* Background radial highlight */}
      <div 
        className={`absolute inset-0 rounded-full blur-[80px] opacity-30 transition-colors duration-1000 ${
          stage === 'problem' ? 'bg-red-500/20' : 'bg-yellow-400/20'
        }`} 
      />

      {/* Decorative Interactive Floating Rings */}
      <motion.div 
        animate={{ 
          rotate: stage === 'problem' ? [180, -180] : [0, 360],
          scale: stage === 'problem' ? 0.95 : 1
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-4 border-2 border-dashed rounded-[3rem] opacity-25 pointer-events-none transition-colors duration-1000 ${
          stage === 'problem' ? 'border-red-500' : 'border-yellow-400'
        }`}
      />

      <motion.div 
        animate={getObjectRotation()}
        className="w-full h-full relative flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Render different models or modes based on the stage */}
        <AnimatePresence mode="wait">
          {stage === 'hook' && (
            <motion.div
              key="hook-obj"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-76 h-76 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Outer Glowing Hexagonal Frame */}
              <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.15)] bg-slate-900/60 backdrop-blur-sm">
                <div className="absolute inset-4 border border-yellow-500/10 rounded-[2rem] animate-pulse" />
              </div>

              {/* Central Glowing Orb & Core Waves */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    "0 0 20px rgba(250,204,21,0.4)",
                    "0 0 45px rgba(250,204,21,0.8)",
                    "0 0 20px rgba(250,204,21,0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-300 relative z-10 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-slate-950/80 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="w-14 h-14 border-2 border-t-yellow-400 border-r-transparent border-b-yellow-400 border-l-transparent rounded-full flex items-center justify-center"
                  >
                    <Cpu className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Holographic Wave Rings projecting from center */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 2.2], 
                    opacity: [0.6, 0] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 1,
                    ease: "easeOut"
                  }}
                  className="absolute w-24 h-24 border border-yellow-400/50 rounded-full pointer-events-none"
                />
              ))}

              <div className="absolute bottom-8 text-center text-yellow-300/80 font-mono text-[9px] uppercase tracking-[0.3em] font-black pointer-events-none">
                Interactive Touchless Logic
              </div>
            </motion.div>
          )}

          {stage === 'problem' && (
            <motion.div
              key="problem-obj"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-80 h-80 flex items-center justify-center text-red-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Complex Chaotic Mesh representing user friction */}
              <div className="absolute inset-0 border-2 border-red-500/40 rounded-[2.5rem] bg-black/80 flex items-center justify-center p-6 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                {/* Visual Error grid lines */}
                <div className="absolute inset-2 grid grid-cols-6 grid-rows-6 gap-2 opacity-15">
                  {[...Array(36)].map((_, idx) => (
                    <div key={idx} className="border border-red-500 rounded" />
                  ))}
                </div>
                
                {/* Red warning lasers crossing */}
                <motion.div 
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute left-0 right-0 h-0.5 bg-red-500 z-10" 
                />
                <motion.div 
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10" 
                />
              </div>

              {/* Locked/Failing Digital Prototype Node */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.08, 1],
                    rotateY: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-400 rounded-3xl border border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center mb-4"
                >
                  <ShieldAlert className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-center">
                  <h6 className="font-bold text-white uppercase text-base tracking-widest drop-shadow">CRITICAL ERROR</h6>
                  <p className="text-[10px] text-red-300 font-mono tracking-wider mt-1">UX COMPLEXITY FAULT</p>
                </div>
              </div>

              {/* Red glowing feedback points */}
              <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-red-500 animate-ping" />
              <div className="absolute bottom-12 right-12 w-4 h-4 rounded-full bg-red-500 animate-ping delay-500" />
            </motion.div>
          )}

          {stage === 'solution' && (
            <motion.div
              key="solution-obj"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative w-80 h-96 flex flex-col items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* EXPLODED SYSTEM VIEW: Staggered Layers that represent standard blocks */}
              <div className="flex flex-col gap-6 w-full items-center" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* 1. Interface & UI layer */}
                <motion.div 
                  style={{ transform: 'rotateX(40deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
                  whileHover={{ translateZ: 60, scale: 1.05 }}
                  onMouseEnter={() => setHoveredSlice(1)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`w-64 p-4 rounded-xl border transition-all cursor-pointer ${
                    hoveredSlice === 1 
                      ? 'bg-slate-800 border-yellow-400 shadow-[0_15px_30px_rgba(250,204,21,0.25)]' 
                      : 'bg-slate-900/80 border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-black uppercase text-yellow-300 tracking-wider">Level A: React Desktop App</p>
                    <Layers className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">Interactive CAD / 3D design pipeline tailored for simple gesture parsing.</p>
                </motion.div>

                {/* Vertical connection track indicator */}
                <div className="w-1 h-3 bg-gradient-to-b from-yellow-400/50 to-sky-400/55" />

                {/* 2. Visual AI Parsing Engine (MediaPipe, Custom OpenCV Tracker) */}
                <motion.div 
                  style={{ transform: 'rotateX(40deg) translateZ(0px)', transformStyle: 'preserve-3d' }}
                  whileHover={{ translateZ: 20, scale: 1.05 }}
                  onMouseEnter={() => setHoveredSlice(2)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`w-64 p-4 rounded-xl border transition-all cursor-pointer ${
                    hoveredSlice === 2 
                      ? 'bg-slate-800 border-yellow-400 shadow-[0_15px_30px_rgba(250,204,21,0.25)]' 
                      : 'bg-slate-900/80 border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-black uppercase text-yellow-300 tracking-wider">Level B: Mediapipe Core</p>
                    <Eye className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal font-sans">Computer Vision mapping index processing 2D frames & coordinates instantly.</p>
                </motion.div>

                {/* Vertical connection track indicator */}
                <div className="w-1 h-3 bg-gradient-to-b from-sky-400/55 to-emerald-400/50" />

                {/* 3. Hardware Support Unit (ESP32 / Embedded Circuits) */}
                <motion.div 
                  style={{ transform: 'rotateX(40deg) translateZ(-40px)', transformStyle: 'preserve-3d' }}
                  whileHover={{ translateZ: -20, scale: 1.05 }}
                  onMouseEnter={() => setHoveredSlice(3)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`w-64 p-4 rounded-xl border transition-all cursor-pointer ${
                    hoveredSlice === 3 
                      ? 'bg-slate-800 border-yellow-500 shadow-[0_15px_30px_rgba(234,179,8,0.25)]' 
                      : 'bg-slate-900/80 border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-black uppercase text-yellow-300 tracking-wider">Level C: ESP32 Hardware</p>
                    <Radio className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">Embedded microcontrollers and optical arrays driving physical system depth mapping.</p>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
