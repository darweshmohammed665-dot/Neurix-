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
  const [fallingIndex, setFallingIndex] = useState<number | null>(null);
  const [landedIndices, setLandedIndices] = useState<number[]>([]);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [completeSequence, setCompleteSequence] = useState(false);

  // Canvas interactive neuron elements simulation hooks
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const sparkParticlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[]>([]);
  const clickWavesRef = useRef<{ x: number; y: number; currentRadius: number; maxRadius: number; speed: number; alpha: number }[]>([]);
  const lastSynthNodePlayedRef = useRef(0);

  // Direct sound synthesis engine using safe Web Audio API calls
  const playBeep = (freq = 600, duration = 0.08, type: OscillatorType = 'sine', gainVal = 0.04) => {
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
      // Catch silently to support strict silent autofiles guidelines
    }
  };

  // Play subtle descending synth chord on letter lands
  useEffect(() => {
    if (landedIndices.length > 0 && landedIndices.length <= NEURIX_LETTERS.length) {
      const frequencies = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // E4, G4, A4, C5, D5, E5
      playBeep(frequencies[(landedIndices.length - 1) % frequencies.length], 0.12, 'sine', 0.038);
    }
  }, [landedIndices]);

  // Sequential cascading letter drop
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    // Delayed intro kickoff
    const startTimer = setTimeout(() => {
      setFallingIndex(0);

      const triggerNext = (currentIndex: number) => {
        if (currentIndex >= NEURIX_LETTERS.length) return;

        // Current letter drops down
        const landTimer = setTimeout(() => {
          setLandedIndices(prev => [...prev, currentIndex]);
          
          if (currentIndex + 1 < NEURIX_LETTERS.length) {
            // Initiate next cascade drop
            setFallingIndex(currentIndex + 1);
            triggerNext(currentIndex + 1);
          } else {
            setFallingIndex(null);
            
            // All letters stabilized, trigger auto console sequence launcher
            const finalizeTimer = setTimeout(() => {
              setIsFullyLoaded(true);
            }, 800);
            timers.push(finalizeTimer);
          }
        }, 580); // Quick snappy modern drop duration

        timers.push(landTimer);
      };

      triggerNext(0);
    }, 550);

    timers.push(startTimer);

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AUTOMATED CINEMATIC ENTRY ORCHESTRATION - NO MANUAL BUTTON REQ
  useEffect(() => {
    if (!isFullyLoaded) return;

    let localTimers: NodeJS.Timeout[] = [];

    // Sweeping electronic arpeggiation chords to blow expectations completely!
    const harmonicStep1 = setTimeout(() => playBeep(261.63, 0.45, 'triangle', 0.025), 100); // C4
    const harmonicStep2 = setTimeout(() => playBeep(329.63, 0.45, 'sine', 0.035), 220);     // E4
    const harmonicStep3 = setTimeout(() => playBeep(392.00, 0.45, 'sine', 0.035), 340);     // G4
    const harmonicStep4 = setTimeout(() => playBeep(523.25, 0.55, 'sine', 0.045), 460);     // C5
    const harmonicStep5 = setTimeout(() => playBeep(659.25, 0.70, 'sine', 0.045), 580);     // E5

    // Unified Cosmic Resonance Root Chord
    const chordTimer = setTimeout(() => {
      playBeep(261.63, 1.6, 'sine', 0.025); // C4
      playBeep(392.00, 1.6, 'sine', 0.025); // G4
      playBeep(523.25, 1.6, 'sine', 0.025); // C5
      playBeep(783.99, 1.6, 'sine', 0.025); // G5
    }, 900);

    // Fade out screen elements automatically
    const fadeTimer = setTimeout(() => {
      setCompleteSequence(true);
    }, 1500);

    // Fully enter site
    const transitionTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    localTimers.push(harmonicStep1, harmonicStep2, harmonicStep3, harmonicStep4, harmonicStep5, chordTimer, fadeTimer, transitionTimer);

    return () => {
      localTimers.forEach(t => clearTimeout(t));
    };
  }, [isFullyLoaded, onComplete]);

  // Interactive Interactive Matrix Synaptic Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial Synapse Node structures
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      color: string;
    }[] = [];

    const nodesCount = 68;
    for (let i = 0; i < nodesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.35 + 0.2,
        color: Math.random() > 0.45 ? '#ea9308' : '#22d3ee'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connective lines between nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / 115) * 0.08;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // Render interactive synapses to cursor coordinates
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounding wraps
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Distance to mouse pointer
        const mouseDist = Math.hypot(p.x - mx, p.y - my);
        let alphaMultiplier = 1;
        let pRadius = p.radius;

        if (mouseDist < 200) {
          alphaMultiplier = 1.6;
          pRadius = p.radius * 1.35;

          // Draw real-time synaptic lightning path to pointer!
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          const synapticAlpha = (1 - mouseDist / 200) * 0.14;

          const pathwayGrad = ctx.createLinearGradient(p.x, p.y, mx, my);
          pathwayGrad.addColorStop(0, p.color);
          pathwayGrad.addColorStop(1, 'rgba(234, 147, 8, 0.15)');

          ctx.strokeStyle = pathwayGrad;
          ctx.lineWidth = 0.85 * (1 - mouseDist / 200);
          ctx.stroke();

          // Spark micro sound responses on exact proximity overlaps
          if (mouseDist < 16) {
            const now = Date.now();
            if (now - lastSynthNodePlayedRef.current > 180) {
              const nodesPool = [987.77, 1046.50, 1174.66, 1318.51, 1567.98];
              const frequencySelected = nodesPool[Math.floor(Math.random() * nodesPool.length)];
              playBeep(frequencySelected, 0.04, 'sine', 0.0035); // very soft elegant chime audio
              lastSynthNodePlayedRef.current = now;
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, pRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1.0, p.baseAlpha * alphaMultiplier);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Update click shockwave ring expansions
      clickWavesRef.current.forEach((w, idx) => {
        w.currentRadius += w.speed;
        w.alpha *= 0.94; // slow fade

        if (w.alpha < 0.01) {
          clickWavesRef.current.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(w.x, w.y, w.currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(234, 147, 8, ${w.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Render sparks physics
      sparkParticlesRef.current.forEach((s, idx) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.alpha *= 0.94;

        if (s.alpha < 0.01) {
          sparkParticlesRef.current.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
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

  const handlePointerDown = (e: React.PointerEvent) => {
    // Dynamic coordinate click capture
    clickWavesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      currentRadius: 4,
      maxRadius: 190,
      speed: 4.5,
      alpha: 0.75
    });

    // Create a spray of 18 golden spark elements radiating outwards
    for (let i = 0; i < 18; i++) {
      const theta = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.0 + 1.25;
      sparkParticlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(theta) * speed,
        vy: Math.sin(theta) * speed,
        size: Math.random() * 2.2 + 0.8,
        alpha: 1.0,
        color: Math.random() > 0.4 ? '#ea9308' : '#ffd700'
      });
    }

    // Interactive synthesizer sound on click trigger
    playBeep(440.00, 0.18, 'sine', 0.018);
  };

  return (
    <motion.div
      onPointerMove={(e) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerDown={handlePointerDown}
      className="fixed inset-0 z-[200] bg-[#03081e] flex flex-col items-center justify-between font-sans overflow-hidden text-slate-300 select-none pb-12 pt-16 cursor-crosshair"
      exit={{ opacity: 0, filter: "brightness(0.1) blur(18px)", scale: 1.05 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* High-Performance Synaptic Connectome Live Canvas Background Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-55"
      />

      {/* Decorative matrix points and grid backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(rgba(30,58,138,0.25)_1.5px,transparent_1.5px)] bg-[size:36px_36px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-[#020514] opacity-80" />
        
        {/* Slow drifting star background overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", x: `${10 + Math.random() * 80}%`, scale: Math.random() * 0.4 + 0.6, opacity: 0 }}
              animate={{
                y: "-10%",
                opacity: [0, 0.8, 0.8, 0],
                x: [
                  `${10 + Math.random() * 80}%`, 
                  `${20 + Math.random() * 60}%`
                ],
              }}
              transition={{
                duration: 7 + Math.random() * 7,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 6,
              }}
              className="absolute w-1 h-1 bg-gradient-to-br from-[#ffd700] to-[#ffa500] rounded-full blur-[0.5px] shadow-[0_0_8px_#ffd700]"
            />
          ))}
        </div>
      </div>

      {/* Decorative top header scope grids */}
      <div className="relative z-10 w-full max-w-7xl px-8 flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-phosphor/70 animate-ping" />
          <span>COGNITIVE MATRIX LOCK : DIRECT INTERFACE ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#ea9308]" /> MCU_OK</span>
          <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-cyan-400" /> BCI_SYNCED</span>
          <span className="flex items-center gap-1.5"><Network className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> FUSION_9x12</span>
        </div>
      </div>

      {/* CENTERPIECE: Cinematic Letter-Drop Scene */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Holographic floor base shadows */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-8 bg-gradient-to-t from-phosphor/5 to-transparent blur-md rounded-full pointer-events-none opacity-40" />

        {/* Dynamic dropping letters assembly layout row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 relative py-12 px-6">
          {NEURIX_LETTERS.map((letter, index) => {
            const hasLanded = landedIndices.includes(index);
            const isFalling = fallingIndex === index;
            
            return (
              <div key={index} className="relative flex flex-col items-center h-28 sm:h-44 justify-end">
                {/* Volumetric glowing backlight bubble behind landed letters */}
                <AnimatePresence>
                  {hasLanded && (
                    <>
                      {/* permanent undulating halo */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ 
                          opacity: [0, 0.5, 0.35, 0.5], 
                          scale: [0.3, 1.25, 1.05, 1.25] 
                        }}
                        transition={{
                          opacity: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                          scale: { repeat: Infinity, duration: 4.8, ease: "easeInOut" }
                        }}
                        className="absolute w-24 h-24 sm:w-36 sm:h-36 bg-[radial-gradient(circle,_rgba(255,165,0,0.25)_0%,_transparent_75%)] rounded-full blur-2xl pointer-events-none -translate-y-10"
                      />

                      {/* Laser Pillar vertical beam */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: [0, 0.35, 0.12], height: ["0vh", "100vh"] }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-0 w-[1px] bg-gradient-to-t from-[#ea9308] via-[#ea9308]/20 to-transparent pointer-events-none blur-[0.5px]"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* The falling volumetric letter container */}
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
                          duration: 0.58, // Match timeout
                          ease: "easeIn",
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                  className="relative z-10 select-none"
                >
                  {/* Gentle float breathe physics when letters land */}
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
                          : 'text-[#475569]/20'
                      }`}
                      style={hasLanded ? {
                        filter: 'drop-shadow(0 0 10px rgba(255,191,0,0.85)) drop-shadow(0 0 30px rgba(234,147,8,0.55))'
                      } : undefined}
                    >
                      {letter.char}
                    </span>

                    {/* Exploding sparks on precise impact */}
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

                    {/* High energy expanding circle shockwave ring */}
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

                {/* Secure Landing base module conformation pedestal */}
                <div className="absolute bottom-[-10px] flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      scaleX: hasLanded ? [0.2, 1.2, 1] : 0.2,
                      opacity: hasLanded ? 0.8 : 0.1
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-0.5 w-10 sm:w-16 bg-gradient-to-r from-transparent via-phosphor to-transparent"
                  />
                  
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

        {/* Clean scanning scanline glow overlay */}
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

        {/* REAL-TIME ENTRANCE HANDLER & PROGRESS DISPLAY CONTROL */}
        <div className="h-28 mt-8 flex flex-col items-center justify-center font-mono text-[10px] tracking-widest uppercase transition-all duration-500 w-full max-w-xl px-8 z-30">
          <AnimatePresence mode="wait">
            {!isFullyLoaded ? (
              <motion.div 
                key="loading-stage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-center gap-4"
              >
                {/* Micro progression slide loader bar */}
                <div className="w-full bg-[#070e2b] border border-phosphor/15 h-2 p-0.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(landedIndices.length / NEURIX_LETTERS.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-phosphor to-[#ff5000]"
                    transition={{ ease: "easeInOut" }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  {landedIndices.length > 0 ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-phosphor animate-ping" />
                      <span className="text-slate-400">STABILIZING {NEURIX_LETTERS[Math.min(landedIndices.length - 1, NEURIX_LETTERS.length - 1)].label} ({(landedIndices.length / NEURIX_LETTERS.length * 100).toFixed(0)}%) ...</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
                      <span className="text-slate-500">LOCKING CORE PLL CLOCK ALIGNMENT...</span>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="launched-stage"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center gap-3.5 w-full"
              >
                {/* Ethereal automatic launching confirm state indicators */}
                <div className="flex flex-col items-center gap-2 font-mono text-[10px] text-center max-w-sm">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-extrabold text-[11px] tracking-[0.25em]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>SYNAPSE LINK ESTABLISHED • AUTOPILOT COCKPIT ENGAGED</span>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 1.0, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-slate-400 leading-relaxed font-bold tracking-[0.18em]"
                  >
                    DECRYPTING NEURAL MATRIX FEED... ACCESS GRANTED
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative cyber horizontal scanning laser bar */}
      <motion.div
        animate={{ y: ["-15vh", "115vh"] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-0.5 bg-phosphor/25 shadow-[0_0_25px_rgba(255,159,0,0.5)] z-20 pointer-events-none"
      />
    </motion.div>
  );
}
