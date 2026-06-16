import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Volume2, VolumeX, Sliders, Play, Settings, Zap, Compass } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalRadius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

const BRAIN_WAVES = [
  {
    id: 'theta',
    name: 'Theta Sleep / REM',
    freqLabel: '4.0 - 7.5 Hz',
    desc: 'Deep subconscious states, meditation, and memory formation indices.',
    soundType: 'sine',
    baseFreq: 110,
    chord: [1, 1.25, 1.5, 1.875], // Major 7th chord for dream state
    glowClass: 'shadow-[0_0_20px_rgba(167,139,250,0.3)] border-purple-500/40 text-purple-300',
    particleColor: 'rgba(167, 139, 250, 0.75)',
    filterFreq: 350,
  },
  {
    id: 'alpha',
    name: 'Alpha Flow / Calm',
    freqLabel: '7.5 - 12.5 Hz',
    desc: 'Relaxed focus, creative ignition, and low cognitive load thresholds.',
    soundType: 'sine',
    baseFreq: 146.8, // D3
    chord: [1, 1.2, 1.5, 1.6], // Minor triad + 6th
    glowClass: 'shadow-[0_0_20px_rgba(56,189,248,0.3)] border-sky-400/40 text-sky-300',
    particleColor: 'rgba(56, 189, 248, 0.8)',
    filterFreq: 600,
  },
  {
    id: 'beta',
    name: 'Beta Logic / Focus',
    freqLabel: '12.5 - 30.0 Hz',
    desc: 'High logical computation, critical analysis, and active calculation loops.',
    soundType: 'triangle',
    baseFreq: 220, // A3
    chord: [1, 1.25, 1.5, 2.0], // Major triad octave
    glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.3)] border-yellow-500/40 text-yellow-300',
    particleColor: 'rgba(245, 158, 11, 0.8)',
    filterFreq: 900,
  },
  {
    id: 'gamma',
    name: 'Gamma Peak / Zen',
    freqLabel: '30.0 - 100.0 Hz',
    desc: 'Super-conscious synthesis, cognitive integration, and information burst grids.',
    soundType: 'sawtooth',
    baseFreq: 329.6, // E4
    chord: [1, 1.333, 1.5, 2.25], // Perfect intervals for ultra clear state
    glowClass: 'shadow-[0_0_20px_rgba(52,211,153,0.3)] border-emerald-400/40 text-emerald-300',
    particleColor: 'rgba(52, 211, 153, 0.85)',
    filterFreq: 1400,
  }
];

export const SynapticMindLink: React.FC = () => {
  const [activePreset, setActivePreset] = useState(BRAIN_WAVES[1]); // Alpha calm
  const [connectDistance, setConnectDistance] = useState<number>(85); // Connection radius
  const [resonance, setResonance] = useState<number>(60); // Resonator percentage
  const [synthFrequency, setSynthFrequency] = useState<number>(300); // Filter cutoff freq slider
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHoveredOverCanvas, setIsHoveredOverCanvas] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);

  // Web Audio Synth Variables
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const chordGainsRef = useRef<GainNode[]>([]);

  // Initialize particles once on load
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = 48;
    const initialParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.5 + 1.2;
      initialParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() * 0.5 - 0.25) * 1.5,
        vy: (Math.random() * 0.5 - 0.25) * 1.5,
        radius: radius,
        originalRadius: radius,
        color: activePreset.particleColor,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseAngle: Math.random() * Math.PI,
      });
    }
    particlesRef.current = initialParticles;
  }, []);

  // Update particle colors on preset change
  useEffect(() => {
    particlesRef.current.forEach(p => {
      p.color = activePreset.particleColor;
    });
    
    // Smoothly transition sound frequencies if synth is active
    if (soundEnabled && audioCtxRef.current) {
      updateSynthFrequencies(activePreset);
    }
  }, [activePreset]);

  // Handle dynamic synth modifications from slider changes
  useEffect(() => {
    if (soundEnabled && filterRef.current) {
      const currentMultiplier = syntheticCutoffMultiplier();
      filterRef.current.frequency.setValueAtTime(currentMultiplier, audioCtxRef.current!.currentTime);
      filterRef.current.Q.setValueAtTime((resonance / 100) * 18, audioCtxRef.current!.currentTime);
    }
  }, [synthFrequency, resonance, soundEnabled]);

  // Convert logarithmic scale for filter cutoff
  const syntheticCutoffMultiplier = () => {
    // Range 100Hz to 4000Hz based on synthFrequency slider (10% to 100%)
    const pct = synthFrequency / 1000;
    return 120 + (pct * pct * 3800);
  };

  // Web Audio Context Ignition
  const initAudioStack = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGainRef.current = masterGain;

      // Resonate Lowpass Filter Node
      const biquadFilter = ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.setValueAtTime(syntheticCutoffMultiplier(), ctx.currentTime);
      biquadFilter.Q.setValueAtTime((resonance / 100) * 18, ctx.currentTime);
      filterRef.current = biquadFilter;

      // Connect Master chain to Speaker
      masterGain.connect(biquadFilter);
      biquadFilter.connect(ctx.destination);

      // Create Oscillators for Chord
      setupSynthChord(activePreset);

      // Fade master gain in
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.5);
    } catch (e) {
      console.warn('Audio Context creation blocked or unsupported', e);
    }
  };

  const setupSynthChord = (preset: typeof BRAIN_WAVES[0]) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    // Clear any active oscillators first
    teardownOscillators();

    preset.chord.forEach((ratio, index) => {
      const targetFreq = preset.baseFreq * ratio;

      // Osc Node
      const osc = ctx.createOscillator();
      osc.type = preset.soundType as OscillatorType;
      osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);

      // Dedicated Gain for this oscillator voice to keep clean balance
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      // Soft high end dampening for square/saw waves to make them super atmospheric
      const individualVolume = preset.soundType === 'sine' ? 0.25 : 0.08;
      
      osc.connect(oscGain);
      oscGain.connect(masterGainRef.current!);
      
      osc.start();
      
      // Gentle staggered entry
      oscGain.gain.linearRampToValueAtTime(individualVolume, ctx.currentTime + 0.3 + index * 0.1);

      oscillatorsRef.current.push(osc);
      chordGainsRef.current.push(oscGain);
    });
  };

  const updateSynthFrequencies = (preset: typeof BRAIN_WAVES[0]) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Fade down, rebuild chord, fade up
    chordGainsRef.current.forEach(g => {
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    });

    setTimeout(() => {
      if (soundEnabled && audioCtxRef.current) {
        setupSynthChord(preset);
      }
    }, 180);
  };

  const teardownOscillators = () => {
    oscillatorsRef.current.forEach(o => {
      try {
        o.stop();
        o.disconnect();
      } catch (err) {}
    });
    chordGainsRef.current.forEach(g => g.disconnect());
    oscillatorsRef.current = [];
    chordGainsRef.current = [];
  };

  const toggleSoundState = () => {
    if (!soundEnabled) {
      initAudioStack();
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        masterGainRef.current?.gain.linearRampToValueAtTime(0.18, audioCtxRef.current.currentTime + 0.2);
      }
      setSoundEnabled(true);
    } else {
      if (audioCtxRef.current) {
        masterGainRef.current?.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.15);
        setTimeout(() => {
          teardownOscillators();
          setSoundEnabled(false);
        }, 180);
      } else {
        setSoundEnabled(false);
      }
    }
  };

  // Canvas interactive rendering loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight || 280;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const runFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw electronic subtle mesh background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const particles = particlesRef.current;
      const cursor = cursorRef.current;

      // Update and Draw Synaptic Paths
      particles.forEach((p, idx) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders comfortably
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse size dynamically
        p.pulseAngle += p.pulseSpeed;
        p.radius = p.originalRadius + Math.sin(p.pulseAngle) * 0.8;

        // Gravity pull to cursor if hovering
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const distFromCursor = Math.hypot(dx, dy);
          if (distFromCursor < 180) {
            // Soft magnet attraction
            const force = (180 - distFromCursor) / 1100;
            p.vx += (dx / distFromCursor) * force * 0.2;
            p.vy += (dy / distFromCursor) * force * 0.2;
            
            // Speed limiter
            p.vx = Math.max(-1.8, Math.min(1.8, p.vx));
            p.vy = Math.max(-1.8, Math.min(1.8, p.vy));
          }
        }

        // Draw connections between nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p2.x - p.x, p2.y - p.y);

          if (dist < connectDistance) {
            const alphaVal = ((connectDistance - dist) / connectDistance) * 0.35;
            ctx.strokeStyle = activePreset.particleColor.replace('0.8', String(alphaVal)).replace('0.75', String(alphaVal));
            ctx.lineWidth = ((connectDistance - dist) / connectDistance) * 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw node circles
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node soft outer halo
        ctx.fillStyle = p.color.replace('0.8', '0.07').replace('0.75', '0.06');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cursor link glow if inside
      if (cursor.active) {
        ctx.strokeStyle = activePreset.particleColor.replace('0.8', '0.1').replace('0.75', '0.08');
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 40, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = activePreset.particleColor.replace('0.8', '0.04').replace('0.75', '0.03');
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 180, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#white';
        // Connect cursor to closest particle nodes
        particles.forEach(p => {
          const dist = Math.hypot(cursor.x - p.x, cursor.y - p.y);
          if (dist < 120) {
            ctx.strokeStyle = activePreset.particleColor.replace('0.8', '0.2').replace('0.75', '0.16');
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(cursor.x, cursor.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      animationRef.current = requestAnimationFrame(runFrame);
    };

    runFrame();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      teardownOscillators();
    };
  }, [connectDistance, activePreset]);

  // Handle Touch or Trackpad Cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    cursorRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
    setIsHoveredOverCanvas(true);
  };

  const handleMouseLeave = () => {
    cursorRef.current.active = false;
    setIsHoveredOverCanvas(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    cursorRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      active: true
    };
    setIsHoveredOverCanvas(true);
  };

  // Cleanup synthesizer core on unmount
  useEffect(() => {
    return () => {
      teardownOscillators();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <div className="p-0.5 rounded-[1.5rem] bg-gradient-to-br from-phosphor/30 via-transparent to-phosphor/20 border border-phosphor/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
      <div className="bg-dark-charcoal rounded-[calc(1.5rem-2px)] p-6 md:p-10 text-slate-300 relative overflow-hidden flex flex-col justify-between">
        
        {/* Glowing warning stripe overlay */}
        <div className="absolute top-0 right-0 w-32 h-1 bg-[repeating-linear-gradient(45deg,#ff9f00,#ff9f00_8px,#0e0f15_8px,#0e0f15_16px)]" />

        {/* Sensory Deck Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-phosphor/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400" />
              </span>
              <p className="text-sky-400 font-mono text-xs font-black uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">INTELLIGENT BCI INTERFACING // SYNAPTIC CORE</p>
            </div>
            <h4 className="text-3xl font-display font-black uppercase tracking-tight text-white flex items-center gap-2.5">
              <Brain className="w-8 h-8 text-phosphor drop-shadow-[0_0_12px_rgba(255,159,0,0.3)]" />
              Neurix Synaptic Link <span className="text-phosphor amber-phosphor-glow font-display">Sandbox</span>
            </h4>
            <p className="text-slate-400 text-sm font-sans mt-2 max-w-xl">
              An interactive cognitive field playground. Move your cursor on the canvas matrix below to spark dynamic neuron path connects, trigger synth harmonies, and mold synthetic filter resonance sweeps!
            </p>
          </div>

          {/* Master Sound Ignite Toggle */}
          <button 
            onClick={toggleSoundState}
            className={`px-6 py-3.5 font-sans font-black uppercase tracking-widest text-xs rounded-none flex items-center gap-2.5 transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-[#ea9308] text-dark-obsidian shadow-[0_5px_20px_rgba(234,147,8,0.4)]'
                : 'bg-dark-obsidian border border-phosphor/35 text-phosphor hover:bg-phosphor/10'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>SYNTH AUDIO ACTIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-phosphor/60" />
                <span>ACTIVATE SYNTH AUDIO</span>
              </>
            )}
          </button>
        </div>

        {/* Dashboard Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Cognitive wave preset grid selector */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5">
            <div>
              <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3.5 flex items-center gap-1.5 font-mono">
                <Compass className="w-4 h-4 text-phosphor" />
                Brainwave Frequencies selectors
              </p>
              
              <div className="space-y-3">
                {BRAIN_WAVES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`w-full text-left p-4 rounded-none border transition-all cursor-pointer relative overflow-hidden ${
                      activePreset.id === preset.id 
                        ? `${preset.glowClass} bg-[#070e2b] border font-semibold`
                        : 'bg-dark-obsidian/60 border-phosphor/10 hover:border-phosphor/30 hover:bg-dark-obsidian text-slate-400 hover:text-slate-205'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs font-black uppercase tracking-wider">{preset.name}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 border border-dashed rounded bg-dark-charcoal font-semibold text-phosphor tracking-widest">{preset.freqLabel}</span>
                    </div>
                    <p className="text-[10px] text-slate-450 leading-normal">{preset.desc}</p>
                    
                    {activePreset.id === preset.id && (
                      <div className="absolute bottom-0 left-0 w-1.5 h-full bg-phosphor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated telemetry diagnostic specifications */}
            <div className="p-4 bg-phosphor/[0.02] border border-phosphor/20 font-mono text-[10px] text-slate-400 space-y-2.5">
              <p className="font-bold text-phosphor text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> WebAudio Register Settings
              </p>
              <div className="flex justify-between"><span>Oscillator Topology:</span><span className="text-white font-mono font-bold capitalize">{activePreset.soundType} Node</span></div>
              <div className="flex justify-between"><span>Filter Attenuation:</span><span className="text-white">-24 dB/Oct LowPass</span></div>
              <div className="flex justify-between"><span>Link Distance:</span><span className="text-white">{connectDistance} Pixels</span></div>
            </div>
          </div>

          {/* MAIN COLUMN: Interactive Neural Mesh Canvas (Sensory visualizer) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              Cognitive Synapse Connectome Grid
            </p>

            <div className="w-full h-80 rounded-none bg-dark-obsidian border border-phosphor/35 relative overflow-hidden flex flex-col items-center justify-center p-1 shadow-[inset_0_0_20px_rgba(0,0,0,0.85)]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full bg-[#03081e] cursor-crosshair relative z-10"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseLeave}
              />

              {/* Holographic scanner instructions layered */}
              <div className="absolute bottom-4 left-4 bg-dark-charcoal/90 border border-phosphor/35 px-3 py-1 font-mono text-[8px] text-phosphor uppercase tracking-widest z-20 pointer-events-none">
                {isHoveredOverCanvas ? 'STIMULATION INTERCEPT HIGH' : 'TOUCH AND SWEEP GRID TO TRIGGER CONNECTOME'}
              </div>

              {!soundEnabled && (
                <div className="absolute inset-0 bg-[#03081e]/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-phosphor/30 bg-phosphor/5 flex items-center justify-center mb-4">
                    <Play className="w-5 h-5 text-phosphor fill-phosphor" />
                  </div>
                  <h5 className="font-mono text-xs font-black uppercase text-white mb-1.5 tracking-wider">Holographic Audio Synthesizer</h5>
                  <p className="text-[10px] text-slate-400 max-w-xs leading-normal">
                    We support real-time audio! Turn on synth audio to synchronize cozy sound waves with each connectome node link.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive dials and filter envelopes */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6 font-mono">
            <div>
              <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-phosphor" />
                Physical Envelope Controllability
              </p>
              
              <div className="space-y-5 bg-dark-obsidian/75 p-5 border border-phosphor/15">
                {/* Dial 1: Radius scale */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
                    <span>Reach Radius</span>
                    <span className="text-phosphor font-bold font-mono">{connectDistance}px</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="160"
                    step="1"
                    value={connectDistance}
                    onChange={(e) => setConnectDistance(parseInt(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[8.5px] text-phosphor/30 mt-1">
                    <span>Sparse Nodes</span>
                    <span>High Connect</span>
                  </div>
                </div>

                {/* Dial 2: Cutoff scale */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
                    <span>Synth Filter Cutoff</span>
                    <span className="text-phosphor font-bold font-mono">{syntheticCutoffMultiplier().toFixed(0)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="5"
                    value={synthFrequency}
                    onChange={(e) => setSynthFrequency(parseInt(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[8.5px] text-phosphor/30 mt-1">
                    <span>Warmer Sound</span>
                    <span>Brighter Resonance</span>
                  </div>
                </div>

                {/* Dial 3: Q Factor / Resonance scale */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
                    <span>Q Resonant peaks</span>
                    <span className="text-phosphor font-bold font-mono">{(resonance / 10).toFixed(1)} Q</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={resonance}
                    onChange={(e) => setResonance(parseInt(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[8.5px] text-phosphor/30 mt-1">
                    <span>Classic Flat</span>
                    <span>High Self-Osc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action button warning statement */}
            <div className="p-3 bg-dark-obsidian border border-phosphor/10 rounded-none text-[9.5px] text-slate-500 leading-normal flex gap-2.5 items-start">
              <Zap className="w-4 h-4 text-phosphor shrink-0 mt-0.5" />
              <span>
                Each sensor node mapped corresponds to an interactive core synapse, synthesizing live sound models in-browser perfectly.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
