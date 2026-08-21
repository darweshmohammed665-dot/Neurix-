import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Volume2, VolumeX, Radio, Sparkles, Activity, Play, RefreshCw, Layers } from 'lucide-react';

export const SynapticMindLink: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [waveType, setWaveType] = useState<'theta' | 'alpha' | 'beta' | 'gamma'>('alpha');
  const [freq, setFreq] = useState(432);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const waveFrequencies = {
    theta: { base: 6, label: 'Theta Band (4-8 Hz)', color: 'text-indigo-400' },
    alpha: { base: 10, label: 'Alpha Band (8-13 Hz)', color: 'text-cyan-400' },
    beta: { base: 20, label: 'Beta Band (13-30 Hz)', color: 'text-[#38BDF8]' },
    gamma: { base: 40, label: 'Gamma Band (30-80 Hz)', color: 'text-emerald-400' },
  };

  // Toggle Web Audio Synth
  const toggleAudio = () => {
    if (!isAudioEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        gainRef.current = gain;
        setIsAudioEnabled(true);
      } catch (err) {
        console.error('Audio initialisation error', err);
      }
    } else {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setIsAudioEnabled(false);
    }
  };

  // Update Frequency on change
  const handleFreqChange = (newFreq: number) => {
    setFreq(newFreq);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(newFreq, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Neural canvas interactive simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 300);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; pulse: number }> = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw interactive synaptic connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.05;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const currentRadius = p.radius + Math.sin(p.pulse) * 1.5;

        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(255, 159, 0, ${0.35 * (1 - dist / 100)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#38BDF8]/15 bg-[#111827]/40 font-mono relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] border border-[#38BDF8]/30 text-[#38BDF8] text-[11px] font-bold uppercase tracking-widest mb-3">
              <Brain className="w-3.5 h-3.5" />
              <span>Resonant Sensory Loop</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F9FAFB] tracking-tight uppercase">
              Neurix Synaptic <span className="text-[#38BDF8] amber-phosphor-glow">Link Sandbox</span>
            </h2>
          </div>
          <p className="text-[#9CA3AF] max-w-md text-sm font-sans leading-relaxed">
            Real-time sensory feedback generator linking optical hand motion states to resonant audio synthesis and spatial matrices.
          </p>
        </motion.div>

        {/* Sandbox Grid Box with Scroll-Driven Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0B0F19] border border-[#38BDF8]/30 p-6 md:p-8 shadow-2xl relative"
        >
          {/* Left: Canvas Neural Connectome */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#38BDF8]/15">
                <span className="text-xs text-[#9CA3AF] font-bold uppercase flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Neural Topology Mapping (30 Nodes Active)
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#111827] text-[#38BDF8] font-mono">
                  {waveFrequencies[waveType].label}
                </span>
              </div>

              <div className="relative h-64 bg-[#111827]/40 border border-[#38BDF8]/20 overflow-hidden mb-4">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CA3AF] pt-2 border-t border-[#38BDF8]/15">
              <span>Oscillator Pitch: <strong className="text-[#F9FAFB]">{freq} Hz</strong></span>
              <span>Harmonic Phase: <strong className="text-[#38BDF8]">Synchronous</strong></span>
            </div>
          </div>

          {/* Right: Controls & DSP Oscillator */}
          <div className="lg:col-span-5 bg-[#111827]/60 border border-[#38BDF8]/20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-[#F9FAFB] uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  DSP Tone Generator
                </h3>
                
                {/* Audio Enable / Mute Toggle */}
                <button
                  onClick={toggleAudio}
                  className={`px-3 py-1.5 border text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                    isAudioEnabled
                      ? 'bg-[#38BDF8] text-[#0B0F19] border-[#38BDF8] shadow-[0_0_15px_rgba(255,159,0,0.5)]'
                      : 'bg-[#0B0F19] text-[#9CA3AF] border-slate-700 hover:text-[#F9FAFB] hover:border-[#38BDF8]/50'
                  }`}
                >
                  {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  {isAudioEnabled ? 'AUDIO LIVE' : 'START AUDIO'}
                </button>
              </div>

              {/* Wave Selection Pills */}
              <div className="space-y-2 mb-6">
                <label className="text-[11px] text-[#9CA3AF] uppercase font-bold">
                  Resonance Band Selection
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['theta', 'alpha', 'beta', 'gamma'] as const).map((band) => (
                    <button
                      key={band}
                      onClick={() => {
                        setWaveType(band);
                        handleFreqChange(band === 'theta' ? 220 : band === 'alpha' ? 432 : band === 'beta' ? 528 : 852);
                      }}
                      className={`p-2.5 text-xs text-left border uppercase font-bold transition-all cursor-pointer ${
                        waveType === band
                          ? 'bg-[#38BDF8] text-[#0B0F19] border-[#38BDF8]'
                          : 'bg-[#0B0F19] text-[#9CA3AF] border-[#38BDF8]/20 hover:border-[#38BDF8]/60'
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF] uppercase">Frequency Modulation</span>
                  <span className="text-[#38BDF8] font-bold">{freq} Hz</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="5"
                  value={freq}
                  onChange={(e) => handleFreqChange(Number(e.target.value))}
                  className="w-full accent-[#38BDF8] bg-[#0B0F19] cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#38BDF8]/15 text-[11px] text-[#9CA3AF]">
              <p>Generates low-latency sensory sound feedback models directly in browser via Web Audio API.</p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SynapticMindLink;
