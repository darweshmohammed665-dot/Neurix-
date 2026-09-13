import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Activity, Users, Cpu, Radio, Sparkles, Layers, ArrowRight, Zap, Play, Eye } from 'lucide-react';
import { NeurixLogo } from './NeurixLogo';

interface NeurixHeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export const NeurixHero: React.FC<NeurixHeroProps> = ({ onNavigateSection }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHoveredWord, setIsHoveredWord] = useState(false);

  // Mouse interaction for 3D perspective / Dark Neon lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Scroll-Driven Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.05]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const bgGlowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const wordSpacing = useTransform(scrollYProgress, [0, 0.5], ['0.02em', '0.12em']);

  // Letters of the golden animated brand
  const brandLetters = ['N', 'E', 'U', 'R', 'I', 'X'];

  return (
    <section
      ref={containerRef}
      id="hero-section"
      onMouseMove={handleMouseMove}
      className="relative min-h-[96vh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-mono overflow-hidden select-none"
    >
      {/* 1. Dark Neon Ambient Lighting & Radial Beacons */}
      <motion.div
        style={{ y: bgGlowY, scale: bgGlowScale }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] bg-gradient-to-b from-[#FBBF24]/15 via-[#FBBF24]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"
      />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#1E293B]/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#FBBF24]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Interactive Dark Neon Floor Grid (Scroll & Perspective Shift) */}
      

      {/* Main Dynamic Hero Canvas */}
      <motion.div
        style={{ y: heroTextY, opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center text-center"
      >
        {/* Top Floating Dark Neon Status Chip */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-[#1E293B]/80 border border-[#FBBF24]/40 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(251,191,36,0.05)] group hover:border-[#FBBF24] transition-colors"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBBF24] opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBBF24]" />
          </span>
          <span className="text-[#FBBF24] font-bold">NEXT-GEN SPATIAL ARCHITECTURE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          <span className="text-[#9CA3AF]">ESP32 + OPENCV AI</span>
        </motion.div>

        {/* 🌟 KINETIC GOLDEN "NEWREKS" SHOWCASE 🌟 */}
        <div
          onMouseEnter={() => setIsHoveredWord(true)}
          onMouseLeave={() => setIsHoveredWord(false)}
          className="relative my-2 cursor-pointer group"
        >
          {/* Subtle Golden Halo Backlight */}
          <div className="absolute -inset-8 bg-gradient-to-r from-[#FBBF24]/0 via-[#FBBF24]/25 to-[#FBBF24]/0 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Letter by Letter Floating Animated Word */}
          <motion.div 
            style={{ letterSpacing: wordSpacing }}
            className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 md:gap-4 py-2"
          >
            {brandLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -16,
                  scale: 1.14,
                  rotateZ: (index % 2 === 0 ? 4 : -4),
                  transition: { type: 'spring', stiffness: 400, damping: 10 },
                }}
                className="relative inline-block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black font-display tracking-tighter leading-none"
              >
                {/* Golden Gradient Text with Deep Metallic Sheen */}
                <span className="golden-neon-text drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                  {letter}
                </span>

                {/* Animated Gold Under-Gleam */}
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.98, 1.05, 0.98],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-t from-[#FBBF24] via-[#F9FAFB4b8] to-transparent pointer-events-none blur-[1px]"
                >
                  {letter}
                </motion.span>
              </motion.span>
            ))}
          </motion.div>

          {/* Brand Tagline Badge in Golden Dark Neon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-2 flex items-center justify-center gap-3 text-sm sm:text-lg font-display uppercase tracking-[0.35em] text-[#FBBF24]"
          >
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#FBBF24]" />
            <span className="font-bold drop-shadow-[0_0_10px_#FBBF24]">TOUCHLESS SPATIAL INTERFACE</span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#FBBF24]" />
          </motion.div>
        </div>

        {/* Secondary Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl text-[#9CA3AF] font-sans font-light tracking-wide max-w-3xl leading-relaxed mt-6 mb-10"
        >
          An immersive touchless interface that translates human motion into fluid digital interactions with seamless sensory feedback.
        </motion.p>

        {/* Action CTAs: High Contrast Dark Neon Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <button
            onClick={() => onNavigateSection('roadmap')}
            className="px-8 sm:px-10 py-4 bg-gradient-to-r from-[#FBBF24] via-[#FBBF24] to-[#D97706] hover:from-[#F9FAFB] hover:to-slate-100 text-[#0F172A] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.45)] hover:shadow-[0_0_45px_rgba(251,191,36,0.7)] hover:-translate-y-1 cursor-pointer flex items-center gap-3 rounded-none border border-[#F9FAFB4b8]"
          >
            <Users className="w-4 h-4 text-[#0F172A]" />
            <span>Meet The Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateSection('live-demo-section')}
            className="px-8 sm:px-10 py-4 bg-[#1E293B]/80 hover:bg-[#1E293B] border-2 border-[#FBBF24]/50 hover:border-[#FBBF24] text-[#F9FAFB] font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:-translate-y-1 cursor-pointer flex items-center gap-3"
          >
            <Eye className="w-4 h-4 text-[#FBBF24]" />
            <span>View Project Demo</span>
          </button>
        </motion.div>

        {/* Modern Dark Neon Feature Highlights (Infinity Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl"
        >
          {[
            { label: 'INTERACTION', value: 'Touchless Control', sub: 'Fluid Gestures', icon: Eye },
            { label: 'INTELLIGENCE', value: 'AI Recognition', sub: 'Real-time Tracking', icon: Cpu },
            { label: 'FEEDBACK', value: 'Sensory Audio', sub: 'Immersive Response', icon: Zap },
            { label: 'DESIGN', value: 'Sleek Hardware', sub: 'Modern Aesthetics', icon: Layers },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, borderColor: 'rgba(251,191,36,0.3)' }}
                className="p-5 bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/90 border border-[#FBBF24]/20 text-left transition-all duration-300 shadow-lg group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-mono">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-[#FBBF24] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-base sm:text-lg font-black font-display text-[#F9FAFB] group-hover:text-[#FBBF24] transition-colors">
                  {item.value}
                </p>
                <p className="text-[11px] text-[#FBBF24]/80 font-mono mt-0.5">
                  {item.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default NeurixHero;
