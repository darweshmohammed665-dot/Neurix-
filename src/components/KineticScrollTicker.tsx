import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Activity, Zap, Cpu, Radio, Sparkles, Orbit, ShieldCheck } from 'lucide-react';

export const KineticScrollTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const x1 = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(smoothProgress, [0, 1], ['-30%', '0%']);

  const tickerItems = [
    { text: 'NEURIX SPATIAL ARCHITECTURE', icon: <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />, gold: true },
    { text: 'ESP32-S3 DUAL CORE 240MHz', icon: <Cpu className="w-3.5 h-3.5 text-[#ff9f00]" />, gold: false },
    { text: 'OPENCV 21-KEYPOINT POSE', icon: <Activity className="w-3.5 h-3.5 text-cyan-400" />, gold: false },
    { text: 'UART 115.2 KBPS TELEMETRY', icon: <Radio className="w-3.5 h-3.5 text-emerald-400" />, gold: false },
    { text: 'DSP SENSORY AUDIO RESONATOR', icon: <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />, gold: true },
    { text: 'ZERO-LATENCY SPATIAL MATRIX', icon: <Orbit className="w-3.5 h-3.5 text-cyan-400" />, gold: false },
  ];

  return (
    <div
      ref={containerRef}
      className="relative py-7 bg-[#081838] border-y border-[#ffd700]/20 overflow-hidden font-mono select-none"
    >
      {/* Background ambient golden neon wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/5 via-transparent to-[#ffd700]/5 pointer-events-none" />

      {/* Row 1: Leftward Scroll-Driven Drift */}
      <motion.div
        style={{ x: x1 }}
        className="flex whitespace-nowrap gap-6 mb-3 items-center will-change-transform"
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center gap-3 px-5 py-2 border text-xs tracking-widest uppercase font-semibold transition-all ${
              item.gold
                ? 'bg-[#0f2552] border-[#ffd700]/50 shadow-[0_0_15px_rgba(255,215,0,0.15)] text-white'
                : 'bg-[#0f2552]/70 border-[#ff9f00]/20 text-slate-200'
            }`}
          >
            {item.icon}
            <span className={item.gold ? 'text-[#ffd700] font-bold' : ''}>{item.text}</span>
            <span className="text-[#ffd700]/40 font-black ml-2">•</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2: Rightward Scroll-Driven Drift */}
      <motion.div
        style={{ x: x2 }}
        className="flex whitespace-nowrap gap-6 items-center will-change-transform"
      >
        {[...tickerItems.slice().reverse(), ...tickerItems.slice().reverse(), ...tickerItems.slice().reverse()].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#081838] border border-[#ff9f00]/15 text-[11px] text-slate-400 tracking-widest uppercase"
          >
            <span className="text-[#ffd700] font-mono">[{`CH_0${(idx % 6) + 1}`}]</span>
            <span>{item.text}</span>
            <span className="text-emerald-400 font-bold ml-2">ACTIVE</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default KineticScrollTicker;
