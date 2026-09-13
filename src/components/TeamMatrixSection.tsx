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
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#FBBF24]/15 bg-[#0F172A] font-mono relative overflow-hidden"
    >
      {/* Background Laser Matrix Grid */}
      

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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E293B] border border-[#FBBF24]/30 text-[#FBBF24] text-[11px] font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(251,191,36,0.05)]">
              <Users className="w-3.5 h-3.5" />
              <span>Project Team</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F9FAFB] tracking-tight uppercase">
              Meet The <span className="text-[#FBBF24] amber-phosphor-glow">Creators</span>
            </h2>
          </div>
          <p className="text-[#9CA3AF] max-w-md text-sm font-sans leading-relaxed">
            The talented team behind the design, engineering, and execution of this project.
          </p>
        </motion.div>

        {/* Network Connectome Tree & Grid Interactive Suite */}
        <TeamNetworkConnectome onSelectMember={onSelectMember} />

      </div>
    </section>
  );
};

export default TeamMatrixSection;
