import React from 'react';
import { motion } from 'framer-motion';
import { NeurixLogo } from './NeurixLogo';
import { Github, Instagram, Mail, Calendar, ArrowUpRight, Sparkles, Cpu, Globe } from 'lucide-react';

export const NeurixFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const portalLinks = [
    {
      name: 'GitHub Repository',
      desc: 'View the core system source code and technical desktop application documentation.',
      icon: <Github className="w-6 h-6" />,
      link: 'https://github.com/Mostafa8269/Neurix-desktop-app',
    },
    {
      name: 'Instagram Gallery',
      desc: 'Visual showcase of our hardware iterations and design lab experiments.',
      icon: <Instagram className="w-6 h-6" />,
      link: 'https://www.instagram.com/neurixfeed?igsh=cGJtcDEzZHBjOGw',
    },
    {
      name: 'Official Email',
      desc: 'Direct inquiry line for technical partnerships, academic trials, and hardware deployment.',
      icon: <Mail className="w-6 h-6" />,
      link: 'mailto:neurixt@gmail.com',
    },
  ];

  return (
    <footer id="contact-hub" className="border-t border-[#ff9f00]/20 bg-[#081838] font-mono text-slate-300 relative overflow-hidden">
      
      {/* 1. Connection Portal Cards with Scroll Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2552] border border-[#ff9f00]/30 text-[#ff9f00] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>The Connection Nexus</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            // System <span className="text-[#ff9f00] amber-phosphor-glow">Portal</span>
          </h3>
          <p className="text-slate-400 text-sm font-sans mt-3">
            Bridge the gap between spatial vision and physical reality. Access our official technical repositories and direct contact channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {portalLinks.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="p-8 bg-[#0f2552]/70 border border-[#ff9f00]/20 hover:border-[#ff9f00] hover:shadow-[0_0_30px_rgba(255,159,0,0.25)] transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-12 h-12 bg-[#081838] border border-[#ff9f00]/30 text-[#ff9f00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold font-display text-white group-hover:text-[#ff9f00] transition-colors flex items-center gap-2">
                  {item.name}
                  <ArrowUpRight className="w-4 h-4 text-[#ff9f00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-slate-400 text-sm font-sans mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#ff9f00]/10 text-xs text-[#ff9f00] uppercase font-bold flex items-center gap-1">
                <span>Access Node</span>
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Technical Partnership Banner with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="p-8 bg-[#0f2552] border border-[#ff9f00]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-5">
            <div className="p-4 bg-[#081838] border border-[#ff9f00]/30 text-[#ff9f00] shrink-0">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h5 className="text-xl font-bold font-display text-white uppercase">
                Technical Partnership & Academic Deployment
              </h5>
              <p className="text-sm text-slate-300 font-sans mt-1">
                Collaborate on low-latency gesture tracking, OpenCV optical integrations, and next-gen embedded hardware.
              </p>
            </div>
          </div>

          <a
            href="mailto:neurixt@gmail.com"
            className="px-8 py-4 bg-[#ff9f00] hover:bg-white text-[#081838] font-bold text-xs uppercase tracking-widest transition-all shrink-0 shadow-[0_0_20px_rgba(255,159,0,0.3)] cursor-pointer"
          >
            Connect Now
          </a>
        </motion.div>

      </div>

      {/* 2. Philosophy Banner with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-[#ff9f00]/15 py-16 px-4 sm:px-6 lg:px-8 bg-[#0f2552]/30 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl sm:text-5xl font-black font-display text-white uppercase mb-4">
            "Your Hand, <span className="text-[#ff9f00] amber-phosphor-glow">Your World</span>"
          </h3>
          <p className="text-slate-400 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            Creating the most intuitive hardware-software ecosystem for tangible spatial human interaction and zero-latency digital control loops.
          </p>
        </div>
      </motion.div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-[#ff9f00]/20 py-8 px-4 sm:px-6 lg:px-8 bg-[#081838]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <NeurixLogo className="w-6 h-6" glow={false} />
            <div>
              <span className="font-bold text-white group-hover:text-[#ff9f00] transition-colors">
                // NEURIX
              </span>
              <span className="text-slate-500 ml-2">
                © 2026 Neurix Project Team. All Rights Reserved.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#ff9f00]" />
              Founded Feb 11, 2026
            </span>
            <a
              href="mailto:neurixt@gmail.com"
              className="text-slate-400 hover:text-[#ff9f00] transition-colors"
            >
              neurixt@gmail.com
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default NeurixFooter;
