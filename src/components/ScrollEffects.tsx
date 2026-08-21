import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp, Activity, Compass, ChevronDown, Radio, Layers, Zap } from 'lucide-react';

export const ScrollEffects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSection, setCurrentSection] = useState('HERO');

  const sections = [
    { id: 'hero-section', label: 'HERO', name: 'Home Nexus' },
    { id: 'about-concept', label: 'CORE', name: 'Engineering Pillars' },
    { id: 'architecture-section', label: 'IOT', name: 'IoT Register Matrix' },
    { id: 'showcase', label: 'MIND', name: 'Synaptic Mind Link' },
    { id: 'live-demo-section', label: 'DIAG', name: 'Live Diagnostics' },
    { id: 'roadmap', label: 'TEAM', name: 'Team Org Matrix' },
    { id: 'contact-hub', label: 'PORTAL', name: 'System Portal' },
  ];

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
      setShowScrollTop(latest > 0.08);

      // Identify active section
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setCurrentSection(sections[i].label);
          break;
        }
      }
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Animated Top Scroll Progress Bar with Dark Neon golden glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd700] via-[#ff9f00] to-cyan-400 z-50 origin-left shadow-[0_0_15px_#ffd700]"
        style={{ scaleX }}
      />

      {/* 2. Floating Side Section Telemetry Indicator (Desktop) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3 pointer-events-auto font-mono">
        <div className="p-2.5 bg-[#081838]/85 backdrop-blur-md border border-[#ff9f00]/30 shadow-2xl flex flex-col gap-2.5">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider pb-1.5 border-b border-[#ff9f00]/20 text-center flex items-center justify-center gap-1">
            <Radio className="w-2.5 h-2.5 text-[#ff9f00] animate-pulse" />
            <span>NAV</span>
          </div>

          {sections.map((sec) => {
            const isActive = currentSection === sec.label;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                title={sec.name}
                className="group relative flex items-center justify-end cursor-pointer"
              >
                {/* Tooltip on hover */}
                <span className="absolute right-7 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-0.5 bg-[#0f2552] border border-[#ff9f00]/50 text-[10px] text-white whitespace-nowrap pointer-events-none shadow-lg">
                  {sec.name}
                </span>

                <div
                  className={`transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'w-16 px-2 py-1 bg-[#ff9f00] text-[#081838] font-bold text-[10px]'
                      : 'w-2 h-2 rounded-full bg-slate-600 group-hover:bg-[#ff9f00]/60'
                  }`}
                >
                  {isActive && <span>{sec.label}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Floating Bottom HUD / Quick Scroll Controller */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 p-2 bg-[#081838]/95 backdrop-blur-xl border border-[#ffd700]/50 shadow-[0_0_35px_rgba(255,215,0,0.25)] font-mono"
          >
            {/* Live Active Section Tracker */}
            <div className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 bg-[#0f2552] border border-[#ffd700]/30 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-ping" />
              <span className="text-slate-400">LOC:</span>
              <span className="text-[#ffd700] font-bold">{currentSection}</span>
            </div>

            {/* Circular Percentage Indicator */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#ffd700] transition-all duration-150"
                  strokeDasharray={`${scrollPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-[#ffd700]">
                {scrollPercentage}%
              </span>
            </div>

            {/* Quick Back to Top Action */}
            <button
              onClick={scrollToTop}
              title="Return to System Nexus"
              className="p-2 bg-gradient-to-r from-[#ffd700] to-[#ff9f00] hover:from-white hover:to-slate-200 text-[#081838] font-black transition-all cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.4)] group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollEffects;
