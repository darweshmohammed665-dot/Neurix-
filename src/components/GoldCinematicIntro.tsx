import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberPyramidCanvas } from './CyberPyramidCanvas';
import { Sparkles, ArrowRight, Eye, ShieldAlert, Cpu } from 'lucide-react';

interface GoldCinematicIntroProps {
  onComplete?: () => void;
  isOpenByDefault?: boolean;
}

export const GoldCinematicIntro: React.FC<GoldCinematicIntroProps> = ({ 
  onComplete,
  isOpenByDefault = true 
}) => {
  const [isActive, setIsActive] = useState(isOpenByDefault);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("CREATING...");
  const [subStatus, setSubStatus] = useState("CALIBRATING BENBEN RESONANCE...");
  const [isGlitching, setIsGlitching] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  // Subtle web audio synth for harmonic frequency
  const audioContextRef = useRef<AudioContext | null>(null);

  const startAudioTone = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          
          // Very gentle, subtle 432Hz ambient drone
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(216, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(432, ctx.currentTime + 3.5);
          
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 2.5);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 4);
        }
      }
    } catch {
      // Audio autoplay policy fail-safe
    }
  };

  useEffect(() => {
    if (!isActive) return;

    // Trigger subtle harmonic tone on first user interaction or mount
    const handleFirstTouch = () => {
      startAudioTone();
      window.removeEventListener('pointerdown', handleFirstTouch);
    };
    window.addEventListener('pointerdown', handleFirstTouch);

    // Progress counter logic: ~3.8 seconds total
    const duration = 3800;
    const interval = 25;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      window.removeEventListener('pointerdown', handleFirstTouch);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (progress < 28) {
      setStatus("CREATING...");
      setSubStatus("CALIBRATING BENBEN RESONANCE // 432 Hz");
    } else if (progress < 58) {
      setStatus("PUBLISHING...");
      setSubStatus("DECODING DIGITAL HIEROGLYPHICS // MATRIX v4.0");
    } else if (progress < 88) {
      setStatus("MONETIZING...");
      setSubStatus("QUANTUM HARMONIZATION // GOLDEN RATIO 1.618");
    } else if (progress < 100) {
      setStatus("ALIGNING...");
      setSubStatus("BENBEN CAPSTONE LOCK // PROTOCOL ONLINE");
    } else {
      setStatus("READY!");
      setSubStatus("NEURIX SPATIAL OS // ENGAGED");
    }

    if (progress === 100) {
      // Trigger RGB glitch effect
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        // Trigger wave exit
        setIsWaving(true);
        setTimeout(() => {
          setIsActive(false);
          if (onComplete) onComplete();
        }, 850);
      }, 250);
    }
  }, [progress, onComplete]);

  // Fast skip function for instant entrance
  const handleSkip = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setIsWaving(true);
      setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, 400);
    }, 150);
  };

  // SVG Paths for "NEURIX" self-drawing wireframe
  const logoPaths = [
    // N
    "M20 80 V20 L80 80 V20", 
    // E
    "M120 20 H180 M120 50 H170 M120 80 H180 M120 20 V80",
    // U
    "M220 20 V70 Q220 80 230 80 H270 Q280 80 280 70 V20",
    // R
    "M320 80 V20 H360 Q380 20 380 40 Q380 60 360 60 H320 M350 60 L380 80",
    // I
    "M420 20 H460 M440 20 V80 M420 80 H460",
    // X
    "M500 20 L580 80 M580 20 L500 80"
  ];

  // Upward wave transition variant
  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          variants={containerVariants}
          initial={{ y: 0 }}
          exit="exit"
          className="fixed inset-0 z-[999] bg-[#050B14] flex flex-col items-center justify-between p-6 md:p-10 overflow-hidden select-none"
        >
          {/* 1. Large Background Counter with Soft Opacity */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
            <motion.span 
              className="text-[34vw] md:text-[40vw] font-black text-[#00D9FF]/[0.035] whitespace-nowrap tracking-tighter"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              {Math.floor(progress).toString().padStart(2, '0')}
            </motion.span>
          </div>

          {/* Background Atmospheric Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00D9FF]/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD43B]/[0.03] rounded-full blur-[100px] pointer-events-none z-0" />

          {/* 2. Top Telemetry Bar */}
          <div className="relative z-20 w-full max-w-7xl flex items-center justify-between border-b border-[#163247]/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_10px_#00D9FF]" />
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-[#EAF7FF] uppercase flex items-center gap-2">
                  NEURIX <span className="text-neurix-gold">BENBEN PROTOCOL</span>
                </span>
                <span className="text-[8px] font-mono text-[#8199AA] tracking-widest hidden sm:block">
                  COORD: 29.9792°N, 31.1342°E // GIZA MATRIX
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col text-right font-mono">
                <span className="text-[9px] text-neurix-cyan uppercase tracking-widest">
                  QUANTUM RESONANCE
                </span>
                <span className="text-[8px] text-[#8199AA]">
                  Φ = 1.6180339887...
                </span>
              </div>

              <button
                onClick={handleSkip}
                className="group px-3 py-1 bg-[#0C1B2A] hover:bg-[#00D9FF]/10 border border-[#163247] hover:border-[#00D9FF] text-[#9DB2C3] hover:text-[#00D9FF] text-[9px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer rounded-sm"
              >
                <span>SKIP</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3. Centerpiece: The Floating Cyber Pyramid & Benben Stone */}
          <div className="relative z-10 w-full flex-1 max-w-5xl flex flex-col items-center justify-center my-auto min-h-[360px] md:min-h-[460px]">
            
            {/* 3D Canvas of the Floating Cyber Pyramid */}
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] max-w-3xl flex items-center justify-center">
              <CyberPyramidCanvas progress={progress} isGlitching={isGlitching} />

              {/* Side Floating Hieroglyphic Telemetry Panels */}
              <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 font-mono text-[9px] text-[#8199AA]/80 pointer-events-none">
                <div className="p-2 bg-[#0C1B2A]/60 border border-[#163247]/60 backdrop-blur-md rounded-sm">
                  <div className="text-neurix-gold font-bold mb-1 flex items-center gap-1.5">
                    <span className="text-xs">𓂀</span> HORUS OPTICS
                  </div>
                  <div className="text-[8px] text-[#9DB2C3]">DEPTH: 6-DoF ACTIVE</div>
                  <div className="text-[8px] text-[#00D9FF]">FPS: 120.0 Hz</div>
                </div>

                <div className="p-2 bg-[#0C1B2A]/60 border border-[#163247]/60 backdrop-blur-md rounded-sm">
                  <div className="text-neurix-cyan font-bold mb-1 flex items-center gap-1.5">
                    <span className="text-xs">☥</span> ANKH KERNEL
                  </div>
                  <div className="text-[8px] text-[#9DB2C3]">LATENCY: &lt; 0.8ms</div>
                  <div className="text-[8px] text-neurix-gold">SYNC: {Math.floor(progress)}%</div>
                </div>
              </div>

              <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 font-mono text-[9px] text-[#8199AA]/80 pointer-events-none text-right">
                <div className="p-2 bg-[#0C1B2A]/60 border border-[#163247]/60 backdrop-blur-md rounded-sm">
                  <div className="text-neurix-gold font-bold mb-1 flex items-center justify-end gap-1.5">
                    BENBEN CAPSTONE <span className="text-xs">𓊹</span>
                  </div>
                  <div className="text-[8px] text-[#9DB2C3]">LEVITATION: HARMONIC</div>
                  <div className="text-[8px] text-[#00D9FF]">ROTATION: 0.35 rad/s</div>
                </div>

                <div className="p-2 bg-[#0C1B2A]/60 border border-[#163247]/60 backdrop-blur-md rounded-sm">
                  <div className="text-neurix-cyan font-bold mb-1 flex items-center justify-end gap-1.5">
                    CYBER GLYPHS <span className="text-xs">𓆣</span>
                  </div>
                  <div className="text-[8px] text-[#9DB2C3]">DECODING: QUAD-STREAM</div>
                  <div className="text-[8px] text-neurix-gold">INTEGRITY: 99.98%</div>
                </div>
              </div>
            </div>

            {/* Drawing Logo (SVG Path Animation) */}
            <div className="w-full max-w-xl px-4 mt-2">
              <svg 
                viewBox="0 0 600 100" 
                className={`w-full h-auto drop-shadow-[0_0_20px_rgba(0,217,255,0.35)] ${isGlitching ? 'animate-pulse' : ''}`}
                style={{
                  filter: isGlitching ? 'url(#glitch-filter)' : 'none'
                }}
              >
                <defs>
                  <filter id="glitch-filter">
                    <feOffset in="SourceGraphic" dx="-3" dy="0" result="offset1" />
                    <feColorMatrix in="offset1" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
                    <feOffset in="SourceGraphic" dx="3" dy="0" result="offset2" />
                    <feColorMatrix in="offset2" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan" />
                    <feBlend in="red" in2="cyan" mode="screen" />
                  </filter>
                </defs>
                
                {/* Glowing cyan outline */}
                {logoPaths.map((path, index) => (
                  <motion.path
                    key={`cyan-${index}`}
                    d={path}
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: progress / 100, opacity: 1 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                ))}
                
                {/* Pure white core beam */}
                {logoPaths.map((path, index) => (
                  <motion.path
                    key={`white-${index}`}
                    d={path}
                    fill="none"
                    stroke="#F2FAFF"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: progress / 100, opacity: 0.9 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                ))}

                {/* Subtle golden apex accents */}
                {logoPaths.map((path, index) => (
                  <motion.path
                    key={`gold-${index}`}
                    d={path}
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: progress / 100, opacity: 0.6 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* 4. Bottom Telemetry & Multi-Stage Status */}
          <div className="relative z-20 w-full max-w-xl text-center pb-4">
            
            {/* Dynamic Status Title */}
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-3 text-base md:text-lg font-mono font-bold tracking-[0.4em] uppercase"
            >
              <span className={status === 'READY!' ? 'text-neurix-gold text-glow-gold' : 'text-[#F2FAFF]'}>
                {status}
              </span>
              <span className="text-neurix-cyan text-sm tracking-widest">
                [{Math.floor(progress)}%]
              </span>
            </motion.div>

            {/* Sub-status technical line */}
            <motion.div
              key={subStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-1 text-[10px] md:text-xs font-mono text-[#8199AA] tracking-[0.2em] uppercase"
            >
              {subStatus}
            </motion.div>
            
            {/* Precision Dual-Color Progress Bar */}
            <div className="mt-4 w-full h-[2px] bg-[#163247] mx-auto relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00D9FF] via-[#00D9FF] to-[#FFD43B] shadow-[0_0_12px_#00D9FF]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* System Status Footnotes */}
            <div className="mt-3 flex items-center justify-between text-[8px] md:text-[9px] font-mono text-[#526777] uppercase tracking-widest">
              <span>CYBER ARCHITECTURE v4.0</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                NEURAL LINK ACTIVE
              </span>
              <span>BENBEN PYRAMID CORE</span>
            </div>
          </div>

          {/* 5. Wave Bottom SVG Overlay for Cinematic Lifting */}
          <div className="absolute bottom-0 left-0 right-0 h-36 translate-y-full pointer-events-none z-50">
            <svg viewBox="0 0 1440 320" className="w-full h-full fill-[#050B14] drop-shadow-[0_-20px_30px_rgba(0,217,255,0.2)]">
              <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* 6. RGB Chromatic Aberration Glitch Layer */}
          {isGlitching && (
            <div className="absolute inset-0 pointer-events-none z-[1000] mix-blend-screen opacity-70">
              <div className="absolute inset-0 bg-red-500/15 animate-[pulse_0.08s_infinite] translate-x-1.5" />
              <div className="absolute inset-0 bg-cyan-500/15 animate-[pulse_0.08s_infinite] -translate-x-1.5" />
              <div className="absolute inset-0 bg-yellow-500/10 animate-[pulse_0.08s_infinite] translate-y-1" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoldCinematicIntro;
