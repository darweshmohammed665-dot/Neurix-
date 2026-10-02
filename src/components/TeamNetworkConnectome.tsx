import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../types';
import { teamMembers } from '../data/neurixData';
import { 
  Users, 
  Search, 
  ArrowUpRight, 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Terminal,
  Globe,
  Layers
} from 'lucide-react';

interface TeamNetworkConnectomeProps {
  onSelectMember: (member: TeamMember) => void;
}

export const TeamNetworkConnectome: React.FC<TeamNetworkConnectomeProps> = ({ onSelectMember }) => {
  const [activeTeam, setActiveTeam] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const teams = ['ALL', 'Software', 'Hardware', 'Presentation'];

  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = activeTeam === 'ALL' || m.team === activeTeam;
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="space-y-12">
      {/* Control Suite */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
        <div className="flex items-center gap-2">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setActiveTeam(team)}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-all rounded-sm border ${
                activeTeam === team 
                  ? 'bg-neurix-cyan/10 border-neurix-cyan text-neurix-cyan' 
                  : 'bg-transparent border-white/10 text-[#8199AA] hover:border-white/20'
              }`}
            >
              {team}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 group">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8199AA] group-focus-within:text-neurix-cyan transition-colors" />
          <input
            type="text"
            placeholder="FILTER PERSONNEL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 py-2 pl-10 pr-4 text-[10px] font-mono text-[#F2FAFF] placeholder-[#8199AA] focus:outline-none focus:border-neurix-cyan/50 transition-all uppercase tracking-widest"
          />
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member, idx) => (
            <motion.div
              layout
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectMember(member)}
              className="spatial-card p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Card Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-2 right-2 w-px h-2 bg-neurix-cyan/30" />
                <div className="absolute top-2 right-2 w-2 h-px bg-neurix-cyan/30" />
              </div>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-2 bg-neurix-cyan/5 border border-neurix-cyan/10 rounded-sm">
                    {member.team === 'Software' ? <Terminal className="w-4 h-4 text-neurix-cyan" /> :
                     member.team === 'Hardware' ? <Cpu className="w-4 h-4 text-neurix-cyan" /> :
                     <Layers className="w-4 h-4 text-neurix-cyan" />}
                  </div>
                  <span className="text-[10px] font-mono text-[#8199AA] opacity-50">#{member.id.toString().padStart(3, '0')}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-bold group-hover:text-neurix-cyan transition-colors mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[10px] font-mono text-neurix-cyan tracking-widest uppercase opacity-70">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-[#9DB2C3] font-light line-clamp-2 mb-8 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neurix-cyan" />
                    <span className="text-[9px] font-mono text-[#8199AA] uppercase tracking-tighter">ACTIVE_LINK</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-neurix-cyan transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* System Status Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-[#8199AA] uppercase tracking-[0.2em]">Total Personnel</span>
            <span className="text-xl font-bold text-[#F2FAFF]">{teamMembers.length} ACTIVE</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-[#8199AA] uppercase tracking-[0.2em]">Synchronization</span>
            <span className="text-xl font-bold text-neurix-cyan">99.2% NOMINAL</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Globe className="w-4 h-4 text-neurix-cyan/40" />
          <Shield className="w-4 h-4 text-neurix-cyan/40" />
          <Zap className="w-4 h-4 text-neurix-cyan/40" />
        </div>
      </div>
    </div>
  );
};

export default TeamNetworkConnectome;
