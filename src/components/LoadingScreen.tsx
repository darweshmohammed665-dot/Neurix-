import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Radio, Network } from 'lucide-react';

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
  const [landedIndices, setLandedIndices] = useState<number[]>([]);
  const [completeSequence, setCompleteSequence] = useState(false);
  const completedRef = useRef(false);

  // Canvas interactive neuron elements simulation hooks
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  // Direct sound synthesis engine using safe Web Audio API calls
  const playBeep = (freq = 600, duration = 0.08, type: OscillatorType = 'sine', gainVal = 0.03) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Catch silently
    }
  };

  // Instant fast exit trigger handler (zero lag, zero waiting)
  const triggerInstantExit = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setCompleteSequence(true);
    playBeep(523.25, 0.15, 'sine', 0.04);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  // Cascading letter drop (each letter drops individually from top to center over 6-7s total)
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    // Staggered sequence: each letter drops individually with ~1.0s gap
    NEURIX_LETTERS.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setLandedIndices(prev => [...prev, idx]);
        playBeep(260 + idx * 85, 0.12, 'sine', 0.04);
      }, 300 + idx * 950);
      timers.push(timer);
    });

    // Auto complete after all 6 letters fall and land gracefully (~6.8 seconds)
    const autoFinishTimer = setTimeout(() => {
      triggerInstantExit();
    }, 6800);
    timers.push(autoFinishTimer);

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lightweight Interactive Matrix Canvas (35 particles max for 60fps performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      color: string;
    }[] = [];

    const nodesCount = 35; // Optimized for 0% lag
    for (let i = 0; i < nodesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.3 + 0.15,
        color: Math.random() > 0.5 ? '#ea9308' : '#22d3ee'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connective lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist / 100) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      onClick={triggerInstantExit}
      onPointerMove={(e) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
      }}
      className="fixed inset-0 z-[200] bg-[#081838] flex flex-col items-center justify-between font-sans overflow-hidden text-slate-300 select-none pb-12 pt-16 cursor-pointer"
      animate={{ opacity: completeSequence ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Synaptic Canvas Background Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-45"
      />

      {/* Decorative matrix points and grid backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(rgba(30,58,138,0.25)_1.5px,transparent_1.5px)] bg-[size:36px_36px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051129] via-transparent to-[#051129] opacity-80" />
      </div>

      {/* Decorative top header */}
      <div className="relative z-10 w-full max-w-7xl px-8 flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-phosphor/70 animate-ping" />
          <span>NEURIX SYSTEM ACTIVE • TOUCH ANYWHERE TO SKIP</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#ea9308]" /> MCU_OK</span>
          <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-cyan-400" /> SYNCED</span>
          <span className="flex items-center gap-1.5"><Network className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> FAST_LOAD</span>
        </div>
      </div>

      {/* CENTERPIECE: Stylish Individual Falling Letter-Drop Scene */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 relative py-12 px-6">
          {NEURIX_LETTERS.map((letter, index) => {
            const hasLanded = landedIndices.includes(index);
            
            return (
              <div key={index} className="relative flex flex-col items-center h-28 sm:h-40 justify-end min-w-[36px] sm:min-w-[64px]">
                {/* Vertical Falling Trajectory Light Beam */}
                <AnimatePresence>
                  {hasLanded && (
                    <motion.div
                      initial={{ opacity: 0.8, height: "100vh" }}
                      animate={{ opacity: 0, height: "0vh" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute bottom-0 w-[2px] bg-gradient-to-t from-phosphor via-amber-300 to-transparent pointer-events-none z-0"
                    />
                  )}
                </AnimatePresence>

                {/* Main Falling Letter Container */}
                <motion.div
                  initial={{ y: -650, opacity: 0, scaleY: 1.4, scaleX: 0.7 }}
                  animate={
                    hasLanded
                      ? { 
                          y: 0, 
                          opacity: 1, 
                          scaleY: [1.4, 0.8, 1.1, 0.95, 1],
                          scaleX: [0.7, 1.25, 0.9, 1.05, 1]
                        }
                      : { y: -650, opacity: 0, scaleY: 1.4, scaleX: 0.7 }
                  }
                  transition={{
                    duration: 0.6,
                    times: [0, 0.55, 0.75, 0.9, 1],
                    ease: "easeOut"
                  }}
                  className="relative z-10 select-none"
                >
                  <span 
                    className={`text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl font-display font-black block tracking-normal transition-colors duration-300 ${
                      hasLanded 
                        ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f59e0b] to-[#b45309]' 
                        : 'text-slate-700/30'
                    }`}
                    style={hasLanded ? {
                      filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.75)) drop-shadow(0 0 40px rgba(245,158,11,0.3))'
                    } : undefined}
                  >
                    {letter.char}
                  </span>
                </motion.div>

                {/* Impact Base Landing Light & Shockwave */}
                <div className="absolute bottom-[-24px] flex flex-col items-center">
                  {hasLanded && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0.5, 2.2, 2.8], opacity: [1, 0.6, 0] }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute bottom-0 w-12 h-3 rounded-full bg-phosphor/50 blur-sm pointer-events-none"
                    />
                  )}
                  
                  <div 
                    className={`h-0.5 w-8 sm:w-14 transition-all duration-300 ${
                      hasLanded ? 'bg-phosphor opacity-100 shadow-[0_0_12px_#ff9f00]' : 'bg-slate-800 opacity-20'
                    }`}
                  />
                  {hasLanded && (
                    <motion.span 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-mono text-phosphor/90 tracking-tighter uppercase mt-1 hidden sm:block font-bold"
                    >
                      {letter.label.split('_')[0]}
                    </motion.span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time status progress bar & Active Module Display */}
        <div className="mt-4 flex flex-col items-center justify-center font-mono text-[10px] tracking-widest uppercase w-full max-w-lg px-6 z-30 gap-2.5">
          {/* Current landing module details */}
          <div className="h-7 flex items-center justify-center text-center px-3 py-1 bg-sky-950/40 border border-sky-500/20 rounded-md w-full backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {landedIndices.length > 0 ? (
                <motion.div
                  key={landedIndices[landedIndices.length - 1]}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2 text-sky-200 font-medium tracking-normal text-[11px]"
                >
                  <span className="font-bold font-display text-phosphor text-xs">
                    {NEURIX_LETTERS[landedIndices[landedIndices.length - 1]].char}
                  </span>
                  <span className="text-sky-400 font-bold">
                    [{NEURIX_LETTERS[landedIndices[landedIndices.length - 1]].label}]
                  </span>
                  <span className="text-slate-300 hidden sm:inline text-[10px]">
                    — {NEURIX_LETTERS[landedIndices[landedIndices.length - 1]].description}
                  </span>
                </motion.div>
              ) : (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-slate-400 font-mono text-[10px]"
                >
                  INITIALIZING NEURIX MATRIX SEQUENCE...
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full bg-[#0f2552] border border-phosphor/20 h-1.5 p-0.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${(landedIndices.length / NEURIX_LETTERS.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-phosphor to-[#ff5000]"
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-slate-400 font-bold pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>
                {landedIndices.length === NEURIX_LETTERS.length 
                  ? 'NEURIX SYSTEM ONLINE' 
                  : `LOADING MODULE ${landedIndices.length}/6`}
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerInstantExit();
              }}
              className="px-3 py-1 rounded bg-phosphor/20 hover:bg-phosphor/30 text-phosphor border border-phosphor/40 text-[10px] font-mono font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-phosphor/10 cursor-pointer"
            >
              CONTINUE TO APP →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
