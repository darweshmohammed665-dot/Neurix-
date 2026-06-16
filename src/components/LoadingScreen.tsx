import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface LetterConfig {
  char: string;
  label: string;
  description: string;
  glow: string;
}

const NEURIX_LETTERS: LetterConfig[] = [
  { char: 'N', label: 'NEURAL_KERNEL', description: 'Synaptic artificial core allocation initialized.', glow: 'shadow-blue-500/50 text-blue-400' },
  { char: 'E', label: 'EMBEDDED_FPGA', description: 'Register mapping on gate-array channels active.', glow: 'shadow-indigo-500/50 text-indigo-400' },
  { char: 'U', label: 'UNIVERSAL_BUS', description: 'Inter-Integrated multi-device controller loaded.', glow: 'shadow-cyan-500/50 text-cyan-400' },
  { char: 'R', label: 'RESONANCE_DSP', description: 'Harmonic oscillator filters online at zero-latency.', glow: 'shadow-amber-500/50 text-phosphor' },
  { char: 'I', label: 'INTERFACE_MCU', description: 'Analog interface sensory drivers linked.', glow: 'shadow-teal-500/50 text-teal-400' },
  { char: 'X', label: 'XTENSIBLE_SYS', description: 'Central matrix synchronization successful.', glow: 'shadow-emerald-500/50 text-emerald-400' }
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [fallingIndex, setFallingIndex] = useState<number | null>(null);
  const [landedIndices, setLandedIndices] = useState<number[]>([]);
  const [completeSequence, setCompleteSequence] = useState(false);

  // Sequential cascading letter drop
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    // Starting delay before first letter drops
    const startTimer = setTimeout(() => {
      setFallingIndex(0);

      const triggerNext = (currentIndex: number) => {
        if (currentIndex >= NEURIX_LETTERS.length) return;

        // The current letter takes 700ms to arrive on the landing pad
        const landTimer = setTimeout(() => {
          setLandedIndices(prev => [...prev, currentIndex]);
          
          if (currentIndex + 1 < NEURIX_LETTERS.length) {
            // Next letter instantly starts descending
            setFallingIndex(currentIndex + 1);
            triggerNext(currentIndex + 1);
          } else {
            // All letters landed!
            setFallingIndex(null);
            
            // Wait slightly after the last landing for stabilization, then initiate the transition out
            const finalizeTimer = setTimeout(() => {
              setCompleteSequence(true);
              const exitTimer = setTimeout(onComplete, 1400);
              timers.push(exitTimer);
            }, 900);
            timers.push(finalizeTimer);
          }
        }, 700);

        timers.push(landTimer);
      };

      triggerNext(0);
    }, 600);

    timers.push(startTimer);

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#03081e] flex flex-col items-center justify-between font-sans overflow-hidden text-slate-300 select-none pb-12 pt-16"
      exit={{ opacity: 0, filter: "brightness(0.2) blur(12px)", scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background visual layers: Futuristic grid, matrix points and vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(rgba(30,58,138,0.3)_1.5px,transparent_1.5px)] bg-[size:36px_36px] opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-[#020514] opacity-80" />
        
        {/* Rising Golden Sparks / Embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", x: `${10 + Math.random() * 80}%`, scale: Math.random() * 0.4 + 0.6, opacity: 0 }}
              animate={{
                y: "-10%",
                opacity: [0, 0.9, 0.9, 0],
                x: [
                  `${10 + Math.random() * 80}%`, 
                  `${20 + Math.random() * 60}%`
                ],
              }}
              transition={{
                duration: 6 + Math.random() * 7,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 6,
              }}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-br from-[#ffd700] to-[#ffa500] rounded-full blur-[0.5px] shadow-[0_0_10px_#ffd700]"
            />
          ))}
        </div>
      </div>

      {/* Decorative top scope labels */}
      <div className="relative z-10 w-full max-w-7xl px-8 flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-phosphor/70 animate-ping" />
          <span>SYS_BOOT // COGNITIVE_RAMP_DEPROY</span>
        </div>
        <div>
          <span>ADDRESS_REG: 0x00F7A59D</span>
        </div>
      </div>

      {/* CENTERPIECE: Cinematic Letter-Drop Scene */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        
        {/* Holographic floor landing target grid */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-8 bg-gradient-to-t from-phosphor/5 to-transparent blur-md rounded-full pointer-events-none opacity-40" />

        {/* Dynamic drop letters assembly row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 relative py-12 px-6">
          {NEURIX_LETTERS.map((letter, index) => {
            const hasLanded = landedIndices.includes(index);
            const isFalling = fallingIndex === index;
            
            return (
              <div key={index} className="relative flex flex-col items-center h-28 sm:h-44 justify-end">
                
                {/* Volumetric ambient golden backlight bubble behind landed letters */}
                <AnimatePresence>
                  {hasLanded && (
                    <>
                      {/* Permanent soft undulating golden glow */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ 
                          opacity: [0, 0.6, 0.38, 0.6], 
                          scale: [0.3, 1.3, 1.08, 1.3] 
                        }}
                        transition={{
                          opacity: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                          scale: { repeat: Infinity, duration: 4.8, ease: "easeInOut" }
                        }}
                        className="absolute w-24 h-24 sm:w-36 sm:h-36 bg-[radial-gradient(circle,_rgba(255,165,0,0.28)_0%,_transparent_75%)] rounded-full blur-2xl pointer-events-none -translate-y-10"
                      />

                      {/* Laser Pillar of light shooting down behind the letter */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: [0, 0.4, 0.15], height: ["0vh", "100vh"] }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="absolute bottom-0 w-[1px] bg-gradient-to-t from-[#ea9308] via-[#ea9308]/20 to-transparent pointer-events-none blur-[0.5px]"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* The Falling Letter Particle */}
                <motion.div
                  initial={{ y: -950, opacity: 0, scaleY: 2.2, scaleX: 0.5, rotate: -25 }}
                  animate={
                    hasLanded
                      ? {
                          y: [0, 18, -12, 6, -2, 0],
                          scaleY: [0.45, 1.25, 0.9, 1.05, 1],
                          scaleX: [1.55, 0.8, 1.1, 0.95, 1],
                          rotate: [12, -6, 3, -1, 0],
                          opacity: 1,
                        }
                      : isFalling
                      ? {
                          y: 0,
                          opacity: 1,
                          scaleY: 1.8,
                          scaleX: 0.7,
                          rotate: -15,
                        }
                      : {
                          y: -950,
                          opacity: 0,
                          scaleY: 2.2,
                          scaleX: 0.5,
                          rotate: -25,
                        }
                  }
                  transition={
                    hasLanded
                      ? {
                          duration: 0.85,
                          ease: "easeOut",
                        }
                      : isFalling
                      ? {
                          duration: 0.7, // Matches the timeout exactly
                          ease: "easeIn", // Real-world acceleration physics
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                  className="relative z-10 select-none"
                >
                  {/* Infinite independent float/breathe layer when landed */}
                  <motion.div
                    animate={hasLanded ? {
                      y: [0, -8, 0],
                      scale: [1, 1.03, 0.98, 1],
                      rotateY: [0, 8, -8, 0],
                    } : {}}
                    transition={hasLanded ? {
                      y: {
                        repeat: Infinity,
                        duration: 3 + index * 0.35,
                        ease: "easeInOut",
                        delay: 0.85,
                      },
                      scale: {
                        repeat: Infinity,
                        duration: 3.4 + index * 0.4,
                        ease: "easeInOut",
                        delay: 0.85,
                      },
                      rotateY: {
                        repeat: Infinity,
                        duration: 4.2 + index * 0.5,
                        ease: "easeInOut",
                        delay: 0.85,
                      }
                    } : {}}
                    className="relative flex items-center justify-center"
                  >
                    <span 
                      className={`text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl font-display font-black block tracking-normal transition-all duration-700 ${
                        hasLanded 
                          ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#fffef5] via-[#ea9308] to-[#ab5a00]' 
                          : 'text-phosphor/15'
                      }`}
                      style={hasLanded ? {
                        filter: 'drop-shadow(0 0 10px rgba(255,191,0,0.85)) drop-shadow(0 0 30px rgba(234,147,8,0.55))'
                      } : undefined}
                    >
                      {letter.char}
                    </span>

                    {/* Exploding vector sparks on impact */}
                    {hasLanded && Array.from({ length: 8 }).map((_, sparkIdx) => {
                      const angle = (sparkIdx * 360) / 8;
                      const radians = (angle * Math.PI) / 180;
                      const targetX = Math.cos(radians) * 65;
                      const targetY = Math.sin(radians) * 65;
                      return (
                        <motion.div
                          key={sparkIdx}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                          animate={{ x: targetX, y: targetY, opacity: 0, scale: 0.1 }}
                          transition={{ duration: 0.95, ease: "easeOut" }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffaa00] blur-[0.5px] shadow-[0_0_8px_#ffd700] pointer-events-none"
                        />
                      );
                    })}

                    {/* High voltage shockwave ring emitted exactly on impact */}
                    <AnimatePresence>
                      {hasLanded && (
                        <motion.div
                          initial={{ scale: 0.3, opacity: 1 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.0, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-2 border-[#ea9308] shadow-[0_0_20px_rgba(234,147,8,0.4)] pointer-events-none z-0"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Reactive Landing platform pedestal */}
                <div className="absolute bottom-[-10px] flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      scaleX: hasLanded ? [0.2, 1.2, 1] : 0.2,
                      opacity: hasLanded ? 0.8 : 0.1
                    }}
                    transition={{ duration: 0.4 }}
                    className={`h-0.5 w-10 sm:w-16 bg-gradient-to-r from-transparent via-phosphor to-transparent`}
                  />
                  
                  {/* Miniature landed module confirmation label */}
                  <span className={`text-[7px] font-mono tracking-wider transition-all duration-300 mt-2 ${
                    hasLanded ? 'text-phosphor/90 font-bold' : 'text-slate-700'
                  }`}>
                    {hasLanded ? `CH_${index}` : 'OFFLINE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Glow Fusion light blast overlay */}
        <AnimatePresence>
          {completeSequence && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.45, 0], scaleY: [0, 1.3, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20 blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Detailed real-time calibration subtitle feedback logs */}
        <div className="h-10 mt-12 flex flex-col items-center justify-center font-mono text-[10px] tracking-widest uppercase transition-all duration-500">
          {completeSequence ? (
            <motion.div 
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-2 text-emerald-400 font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>COGNITIVE REGISTER FUSION STATUS [100% NOMINAL]</span>
            </motion.div>
          ) : landedIndices.length > 0 ? (
            <div className="text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-phosphor animate-ping" />
              <span>STABILIZING {NEURIX_LETTERS[Math.min(landedIndices.length - 1, 5)].label} ...</span>
            </div>
          ) : (
            <span className="text-slate-650 animate-pulse">LOCKING CORE PLL CLOCK ALIGNMENT...</span>
          )}
        </div>
      </div>

      {/* BOTTOM AREA: Minimal Ambient loading progress bar */}
      <div className="relative z-10 w-full max-w-xl px-8 font-mono mt-8">
        {/* Global Loading Bar representation */}
        <div className="w-full bg-[#070e2b] border border-phosphor/15 h-2 p-0.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: completeSequence ? "100%" : `${(landedIndices.length / NEURIX_LETTERS.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-phosphor to-[#ff5f00]"
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Cinematic sweeping horizontal radar scanning line */}
      <motion.div
        animate={{ y: ["-15vh", "115vh"] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-0.5 bg-phosphor/25 shadow-[0_0_25px_rgba(255,159,0,0.5)] z-20 pointer-events-none"
      />
    </motion.div>
  );
}
