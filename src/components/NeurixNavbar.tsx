import React, { useState, useEffect } from 'react';
import { NeurixLogo } from './NeurixLogo';
import { Menu, X, Activity, Terminal, Radio, ShieldCheck } from 'lucide-react';

interface NeurixNavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onReplayIntro?: () => void;
}

export const NeurixNavbar: React.FC<NeurixNavbarProps> = ({ onNavigateSection, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');

  const navLinks = [
    { id: 'hero-section', label: 'Home' },
    { id: 'about-concept', label: 'Concept' },
    { id: 'roadmap', label: 'The Team' },
    { id: 'live-demo-section', label: 'Diagnostics' },
    { id: 'contact-hub', label: 'Connect' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

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
      className={`fixed top-0 left-0 right-0 z-40 font-mono transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081838]/90 backdrop-blur-md border-b border-[#ff9f00]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Link */}
        <div
          onClick={() => handleLinkClick('hero-section')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <NeurixLogo className="w-10 h-10" glow />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-display tracking-tight text-white group-hover:text-[#ff9f00] transition-colors flex items-center">
                <span className="golden-neon-text">NEURIX</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#ff9f00]/15 border border-[#ff9f00]/40 text-[#ffd700] uppercase tracking-wider">
                CORE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Spatial Interface Matrix
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f2552]/70 p-1.5 border border-[#ff9f00]/20">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#ff9f00] text-[#081838] shadow-[0_0_12px_rgba(255,159,0,0.4)]'
                    : 'text-slate-300 hover:text-[#ff9f00] hover:bg-[#ff9f00]/10'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Badge & Telemetry Button */}
        <div className="hidden lg:flex items-center gap-3">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Play Gold Intro Video"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0f2552] hover:bg-[#ffd700] hover:text-[#081838] border border-[#ffd700]/50 text-[#ffd700] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(255,215,0,0.2)] cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-[#ffd700] group-hover:bg-[#081838] animate-ping" />
              <span>Play Intro</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0f2552]/80 border border-[#ff9f00]/30 text-[11px] text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">UART: 115.2k</span>
          </div>

          <button
            onClick={() => handleLinkClick('live-demo-section')}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff9f00] hover:bg-white text-[#081838] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,159,0,0.3)] cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Launch Diagnostics</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-[#ff9f00]/30 bg-[#0f2552] text-[#ff9f00] hover:text-white transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#081838] border-b border-[#ff9f00]/30 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left px-4 py-3 border border-[#ff9f00]/20 bg-[#0f2552]/50 text-slate-200 hover:text-[#ff9f00] hover:border-[#ff9f00] text-sm uppercase tracking-wider font-semibold transition-colors"
            >
              {link.label}
            </button>
          ))}
          {onReplayIntro && (
            <button
              onClick={() => {
                onReplayIntro();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 border border-[#ffd700]/50 bg-[#0f2552] text-[#ffd700] text-sm uppercase tracking-wider font-bold"
            >
              Play Gold Intro Video
            </button>
          )}
          <button
            onClick={() => handleLinkClick('live-demo-section')}
            className="w-full mt-4 py-3 bg-[#ff9f00] text-[#081838] font-bold text-center uppercase tracking-wider text-xs shadow-md"
          >
            Launch Diagnostics
          </button>
        </div>
      )}
    </header>
  );
};

export default NeurixNavbar;
