import React, { useState, useEffect } from 'react';
import { NeurixLogo } from './NeurixLogo';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NeurixNavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onReplayIntro?: () => void;
}

export const NeurixNavbar: React.FC<NeurixNavbarProps> = ({ onNavigateSection, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');

  const navLinks = [
    { id: 'hero-section', label: 'Index' },
    { id: 'roadmap', label: 'Systems' },
    { id: 'live-demo-section', label: 'Feeds' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#050B14]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Link */}
        <div
          onClick={() => handleLinkClick('hero-section')}
          className="flex items-center gap-4 cursor-pointer group select-none"
        >
          <NeurixLogo className="w-8 h-8" glow />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-[#F2FAFF] group-hover:text-neurix-cyan transition-colors">
              NEURIX
            </span>
            <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-[#8199AA]">OS v4.0.1</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-neurix-cyan' : 'text-[#8199AA] hover:text-[#F2FAFF]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-neurix-cyan"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status Badge & Telemetry Button */}
        <div className="hidden md:flex items-center gap-4">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Replay Cyber Pyramid & Benben Sequence"
              className="px-3 py-1.5 bg-[#0C1B2A] hover:bg-[#FFD43B]/10 border border-[#163247] hover:border-[#FFD43B] text-[#9DB2C3] hover:text-[#FFD43B] font-mono text-[9px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-xs text-neurix-gold">𓂀</span>
              <span>BENBEN INTRO</span>
            </button>
          )}

          <button
            onClick={() => handleLinkClick('live-demo-section')}
            className="px-5 py-2 bg-neurix-cyan/5 border border-neurix-cyan/20 hover:border-neurix-cyan text-neurix-cyan font-bold text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neurix-cyan animate-pulse group-hover:scale-125 transition-transform" />
            <span>Project Portal</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neurix-cyan transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 md:hidden bg-[#050B14] border-b border-white/10 px-6 py-10 space-y-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left text-sm uppercase tracking-[0.2em] font-mono text-[#8199AA] hover:text-neurix-cyan transition-colors"
              >
                {link.label}
              </button>
            ))}

            {onReplayIntro && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full py-3 bg-[#0C1B2A] border border-[#163247] text-neurix-gold font-mono text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 rounded-sm"
              >
                <span className="text-sm">𓂀</span> REPLAY CYBER PYRAMID
              </button>
            )}

            <button
              onClick={() => handleLinkClick('live-demo-section')}
              className="w-full py-4 bg-neurix-cyan text-[#031018] font-bold text-center uppercase tracking-widest text-xs rounded-sm"
            >
              Project Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NeurixNavbar;
