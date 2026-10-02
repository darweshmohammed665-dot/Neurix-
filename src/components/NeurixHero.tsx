import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Activity, Users, Cpu, Radio, Sparkles, Layers, ArrowRight, Zap, Play, Eye, Hexagon, Shield, Globe } from 'lucide-react';

interface NeurixHeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export const NeurixHero: React.FC<NeurixHeroProps> = ({ onNavigateSection }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-Driven Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Subtle background parallax elements
  const bgGlow1Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgGlow2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const bgGridY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const geometricOverlayY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const visualizerY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Spatial Elements with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: bgGlow1Y }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00D9FF]/5 rounded-full blur-[120px] animate-pulse" 
        />
        <motion.div 
          style={{ y: bgGlow2Y }}
          className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD43B]/3 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ y: bgGridY }}
          className="absolute inset-0 matrix-grid-pattern opacity-20" 
        />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      {/* Sophisticated Geometric Overlay with Parallax */}
      <motion.div 
        style={{ y: geometricOverlayY }}
        className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-10"
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M1000 0 L1000 1000 L0 1000 Z" fill="rgba(0, 217, 255, 0.05)" />
          <line x1="0" y1="1000" x2="1000" y2="0" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: heroTextY, opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-neurix-cyan" />
            <span className="text-neurix-cyan font-mono text-sm tracking-[0.3em] uppercase">Architecture v4.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
          >
            <span className="block text-[#F2FAFF]">NEURIX</span>
            <span className="block text-neurix-cyan italic text-glow-cyan">SPATIAL</span>
            <span className="block text-[#F2FAFF]">INTERFACE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#9DB2C3] font-light max-w-xl leading-relaxed mb-10"
          >
            Redefining human-machine symbiosis through high-fidelity computer vision and zero-latency gesture orchestration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-5"
          >
            <button
              onClick={() => onNavigateSection('roadmap')}
              className="group relative px-8 py-4 bg-neurix-cyan text-[#031018] font-bold uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,217,255,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              <span className="relative flex items-center gap-2">
                Initiate Protocol <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              onClick={() => onNavigateSection('live-demo-section')}
              className="px-8 py-4 border border-[#163247] hover:border-neurix-cyan text-[#EAF7FF] font-bold uppercase tracking-widest text-sm rounded-sm transition-all hover:bg-neurix-cyan/5 flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-neurix-cyan" />
              Live Feed
            </button>
          </motion.div>
        </div>

        {/* Right Column: Visualizer/Geometric Element */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            style={{ y: visualizerY }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            {/* Main Central Visual */}
            <div className="w-full aspect-square relative flex items-center justify-center">
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-dashed border-neurix-cyan/20 rounded-full" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border-[1px] border-neurix-cyan/10 rounded-full" 
              />
              
              {/* Glowing Core */}
              <div className="w-48 h-48 bg-neurix-cyan/10 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_rgba(0,217,255,0.15)] animate-float">
                <Hexagon className="w-16 h-16 text-neurix-cyan" />
              </div>

              {/* Floating Data Nodes */}
              {[
                { icon: Shield, pos: 'top-0 left-0', label: 'SECURE' },
                { icon: Zap, pos: 'top-10 right-0', label: 'FAST' },
                { icon: Globe, pos: 'bottom-20 left-10', label: 'GLOBAL' },
              ].map((node, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  className={`absolute ${node.pos} p-4 spatial-card flex flex-col items-center gap-2`}
                >
                  <node.icon className="w-5 h-5 text-neurix-cyan" />
                  <span className="text-[10px] font-mono tracking-tighter opacity-50">{node.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Stats: Sophisticated & Minimal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-7xl mx-auto w-full mt-20 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { label: 'Latency', value: '< 1ms', color: 'neurix-cyan' },
          { label: 'Precision', value: '0.1mm', color: 'neurix-cyan' },
          { label: 'Throughput', value: '256 Gbps', color: 'neurix-gold' },
          { label: 'Reliability', value: '99.99%', color: 'neurix-cyan' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-1 border-l border-white/5 pl-6 hover:border-neurix-cyan transition-colors group">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8199AA]">{stat.label}</span>
            <span className={`text-2xl font-black text-${stat.color} group-hover:text-glow-${stat.color === 'neurix-cyan' ? 'cyan' : 'gold'} transition-all`}>
              {stat.value}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default NeurixHero;
