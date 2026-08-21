import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TeamMember } from '../types';
import { TeamNetworkConnectome } from './TeamNetworkConnectome';
import { Users, Network, Cpu, Radio, Sparkles } from 'lucide-react';

interface TeamMatrixSectionProps {
  onSelectMember: (member: TeamMember) => void;
}

export const TeamMatrixSection: React.FC<TeamMatrixSectionProps> = ({ onSelectMember }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={containerRef}
      id="roadmap"
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#ff9f00]/15 bg-[#081838] font-mono relative overflow-hidden"
    >
      {/* Background Laser Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff9f00_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll-Driven Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2552] border border-[#ff9f00]/30 text-[#ff9f00] text-[11px] font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,159,0,0.2)]">
              <Network className="w-3.5 h-3.5 animate-pulse" />
              <span>Full-Stack Enterprise Network Synapse</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              Team Hierarchy <span className="text-[#ff9f00] amber-phosphor-glow">& Network Matrix</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm font-sans leading-relaxed">
            Live neural connection topology linking systems architecture, division operations, and specialized engineering nodes from team leader to the final contributor.
          </p>
        </motion.div>

        {/* Network Connectome Tree & Grid Interactive Suite */}
        <TeamNetworkConnectome onSelectMember={onSelectMember} />

      </div>
    </section>
  );
};

export default TeamMatrixSection;
