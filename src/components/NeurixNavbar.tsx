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
    { id: 'live-demo-section', label: 'Project' },
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
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-[#FBBF24]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
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
              <span className="text-2xl font-black font-display tracking-tight text-[#F9FAFB] group-hover:text-[#FBBF24] transition-colors flex items-center">
                <span className="golden-neon-text">NEURIX</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#FBBF24]/15 border border-[#FBBF24]/40 text-[#FBBF24] uppercase tracking-wider">
                CORE
              </span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] font-mono tracking-widest uppercase">
              Spatial Interface Matrix
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1E293B]/70 p-1.5 border border-[#FBBF24]/20">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FBBF24] text-[#0F172A] shadow-[0_0_12px_rgba(217,119,6,0.4)]'
                    : 'text-[#9CA3AF] hover:text-[#FBBF24] hover:bg-[#FBBF24]/10'
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
              title="Play Intro Video"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B] hover:bg-[#FBBF24] hover:text-[#0F172A] border border-[#FBBF24]/50 text-[#FBBF24] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(251,191,36,0.05)] cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-[#FBBF24] group-hover:bg-[#0F172A] animate-ping" />
              <span>Play Intro</span>
            </button>
          )}

          <button
            onClick={() => handleLinkClick('live-demo-section')}
            className="flex items-center gap-2 px-4 py-2 bg-[#FBBF24] hover:bg-[#F9FAFB] text-[#0F172A] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Project</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-[#FBBF24]/30 bg-[#1E293B] text-[#FBBF24] hover:text-[#F9FAFB] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-[#FBBF24]/30 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left px-4 py-3 border border-[#FBBF24]/20 bg-[#1E293B]/50 text-slate-200 hover:text-[#FBBF24] hover:border-[#FBBF24] text-sm uppercase tracking-wider font-semibold transition-colors"
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
              className="w-full text-left px-4 py-3 border border-[#FBBF24]/50 bg-[#1E293B] text-[#FBBF24] text-sm uppercase tracking-wider font-bold"
            >
              Play Intro Video
            </button>
          )}
          <button
            onClick={() => handleLinkClick('live-demo-section')}
            className="w-full mt-4 py-3 bg-[#FBBF24] text-[#0F172A] font-bold text-center uppercase tracking-wider text-xs shadow-md"
          >
            View Project
          </button>
        </div>
      )}
    </header>
  );
};

export default NeurixNavbar;
