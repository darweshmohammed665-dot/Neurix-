import React from 'react';
import { motion } from 'framer-motion';
import { NeurixLogo } from './NeurixLogo';
import { Github, Instagram, Mail, Calendar, ArrowUpRight, Cpu, Globe, Zap, Shield } from 'lucide-react';

export const NeurixFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const portalLinks = [
    {
      name: 'Code Repository',
      desc: 'Access the core system source and technical documentation.',
      icon: <Github className="w-5 h-5" />,
      link: 'https://github.com/Mostafa8269/Neurix-desktop-app',
    },
    {
      name: 'Visual Gallery',
      desc: 'Iteration showcase and laboratory experiments.',
      icon: <Instagram className="w-5 h-5" />,
      link: 'https://www.instagram.com/neurixfeed?igsh=cGJtcDEzZHBjOGw',
    },
    {
      name: 'Inquiry Line',
      desc: 'Direct channel for partnerships and deployments.',
      icon: <Mail className="w-5 h-5" />,
      link: 'mailto:neurixt@gmail.com',
    },
  ];

  return (
    <footer id="contact-hub" className="bg-[#050B14] relative overflow-hidden pt-32">
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Connection Portal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          <div className="lg:col-span-4">
            <div
              onClick={scrollToTop}
              className="flex items-center gap-4 cursor-pointer group mb-8"
            >
              <NeurixLogo className="w-8 h-8" glow />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#F2FAFF] group-hover:text-neurix-cyan transition-colors">
                  NEURIX
                </span>
                <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-[#8199AA]">OS v4.0.1</span>
              </div>
            </div>
            
            <p className="text-sm text-[#8199AA] leading-relaxed font-light mb-8 max-w-sm">
              The next evolution in spatial computing and human-machine interaction. 
              Bridging the gap between intent and execution.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-sm border border-white/10 text-white/20 hover:text-neurix-cyan hover:border-neurix-cyan transition-all cursor-pointer">
                <Github className="w-4 h-4" />
              </div>
              <div className="p-2 bg-white/5 rounded-sm border border-white/10 text-white/20 hover:text-neurix-cyan hover:border-neurix-cyan transition-all cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="p-2 bg-white/5 rounded-sm border border-white/10 text-white/20 hover:text-neurix-cyan hover:border-neurix-cyan transition-all cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {portalLinks.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="spatial-card p-8 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-neurix-cyan/5 border border-neurix-cyan/10 text-neurix-cyan flex items-center justify-center mb-8 rounded-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#F2FAFF] group-hover:text-neurix-cyan transition-colors flex items-center gap-2 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#8199AA] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-neurix-cyan uppercase tracking-widest">CONNECT_STATION</span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-neurix-cyan transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-10 bg-gradient-to-r from-neurix-cyan/10 to-transparent border border-neurix-cyan/20 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-32"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-neurix-cyan text-[#031018] rounded-sm shadow-[0_0_30px_rgba(0,217,255,0.3)]">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h5 className="text-xl font-bold text-[#F2FAFF] uppercase tracking-tight">Technical Partnership</h5>
              <p className="text-sm text-[#8199AA] font-light mt-1">Collaborate on next-gen embedded hardware and computer vision synthesis.</p>
            </div>
          </div>
          <a
            href="mailto:neurixt@gmail.com"
            className="px-10 py-4 bg-neurix-cyan text-[#031018] font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,217,255,0.2)]"
          >
            Deploy_Now
          </a>
        </motion.div>

        {/* Philosophy Quote */}
        <div className="text-center mb-32">
          <h3 className="text-4xl md:text-6xl font-black text-[#F2FAFF] uppercase leading-tight mb-6">
            "YOUR HAND, <br /> <span className="text-neurix-cyan italic">YOUR WORLD</span>"
          </h3>
          <p className="text-sm text-[#8199AA] font-light max-w-lg mx-auto leading-relaxed">
            Architecting the future of tangible human interaction through zero-latency digital control loops.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-mono text-[#8199AA] uppercase tracking-widest">
          <div className="flex items-center gap-12">
            <span>© 2026 Neurix Project Team</span>
            <span className="hidden md:block">System Status: Nominal</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-neurix-cyan" />
              <span>EST. FEB 11, 2026</span>
            </div>
            <a href="mailto:neurixt@gmail.com" className="hover:text-neurix-cyan transition-colors">neurixt@gmail.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default NeurixFooter;
