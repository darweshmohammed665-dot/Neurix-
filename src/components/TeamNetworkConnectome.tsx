import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../types';
import { teamMembers } from '../data/neurixData';
import { 
  Users, 
  Network, 
  Cpu, 
  Code, 
  CircuitBoard, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Activity, 
  Zap,
  Layers,
  Search,
  Eye
} from 'lucide-react';

interface TeamNetworkConnectomeProps {
  onSelectMember: (member: TeamMember) => void;
}

interface NetworkNode {
  member: TeamMember;
  level: number; // 0 = Root, 1 = Operations, 2 = Division Lead, 3 = Specialist
  parentId?: number;
  divisionGroup: 'Governance' | 'Software' | 'Hardware' | 'Presentation';
  color: string;
}

export const TeamNetworkConnectome: React.FC<TeamNetworkConnectomeProps> = ({ onSelectMember }) => {
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);
  const [activeDivision, setActiveDivision] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'network' | 'grid'>('network');
  const [searchQuery, setSearchQuery] = useState('');

  // Structured Network Hierarchy
  const leader = teamMembers.find((m) => m.id === 1)!;
  const coordinator = teamMembers.find((m) => m.id === 3)!;

  const softwareLead = teamMembers.find((m) => m.id === 2)!;
  const softwareMembers = teamMembers.filter((m) => m.team === 'Software' && m.id !== 2);

  const hardwareLead = teamMembers.find((m) => m.id === 10)!;
  const hardwareMembers = teamMembers.filter((m) => m.team === 'Hardware' && m.id !== 10);

  const presentationLead = teamMembers.find((m) => m.id === 16)!;
  const researchLead = teamMembers.find((m) => m.id === 17)!;
  const presentationMembers = teamMembers.filter((m) => m.team === 'Presentation' && m.id !== 16 && m.id !== 17);

  // Map of parent IDs to trace the route from Leader to any member
  const parentMapping: Record<number, number> = {
    // Coordinator attached to Leader
    3: 1,
    // Division leads attached to Leader / Coordinator
    2: 1, // Software Lead
    10: 1, // Hardware Lead
    16: 1, // Presentation Lead
    17: 1, // Research Lead
    // Software team attached to Software Lead (id 2)
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
    // Hardware team attached to Hardware Lead (id 10)
    11: 10,
    12: 10,
    13: 10,
    14: 10,
    15: 10,
    // Presentation/Research members attached to Presentation Lead (id 16) or Research Lead (id 17)
    18: 16,
    19: 16,
    20: 17,
    21: 17,
    22: 17,
  };

  // Helper to check if a node is in the active highlighted path
  const isNodeInPath = (id: number) => {
    if (!hoveredMemberId) return false;
    if (hoveredMemberId === id) return true;

    // Traverse upwards from hovered node
    let curr: number | undefined = hoveredMemberId;
    while (curr) {
      if (curr === id) return true;
      curr = parentMapping[curr];
    }

    // Traverse downwards if hovered is a parent
    const isParentOfHovered = (parentId: number, targetId: number): boolean => {
      let node: number | undefined = targetId;
      while (node) {
        if (node === parentId) return true;
        node = parentMapping[node];
      }
      return false;
    };

    return isParentOfHovered(id, hoveredMemberId);
  };

  return (
    <div className="space-y-8">
      {/* Control Bar: View Switcher, Search & Division Filter */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-[#111827]/70 border border-[#38BDF8]/30 shadow-xl backdrop-blur-md">
        
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setViewMode('network')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'network'
                ? 'bg-[#38BDF8] text-[#0B0F19] shadow-[0_0_20px_rgba(255,159,0,0.4)]'
                : 'bg-[#0B0F19] text-[#9CA3AF] border border-[#38BDF8]/20 hover:border-[#38BDF8]/60'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Network Connectome</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#38BDF8] text-[#0B0F19] shadow-[0_0_20px_rgba(255,159,0,0.4)]'
                : 'bg-[#0B0F19] text-[#9CA3AF] border border-[#38BDF8]/20 hover:border-[#38BDF8]/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Standard Grid</span>
          </button>
        </div>

        {/* Center: Search Field */}
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter network nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#0B0F19] border border-[#38BDF8]/20 text-xs text-[#F9FAFB] placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
          />
        </div>

        {/* Right: Division Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {['ALL', 'Governance', 'Software', 'Hardware', 'Presentation'].map((div) => {
            const isSelected = activeDivision === div;
            return (
              <button
                key={div}
                onClick={() => setActiveDivision(div)}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#38BDF8] text-[#0B0F19]'
                    : 'bg-[#0B0F19] text-[#9CA3AF] border border-[#38BDF8]/15 hover:border-[#38BDF8]/40 hover:text-[#F9FAFB]'
                }`}
              >
                {div}
              </button>
            );
          })}
        </div>
      </div>

      {/* Network Connectome Mode */}
      {viewMode === 'network' && (
        <div className="relative bg-[#0B0F19]/90 border border-[#38BDF8]/30 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Ambient Background Glow & Radar Pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Network Legend & Telemetry Status */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-[#38BDF8]/20 gap-4 text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#F9FAFB]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                Root Architecture (Tier 0)
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Division Hubs (Tier 1)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Specialists & Researchers (Tier 2)
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#9CA3AF]">
              <Activity className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
              <span>SYNAPSE TOPOLOGY: <strong className="text-emerald-400">22 ACTIVE NODES CONNECTED</strong></span>
            </div>
          </div>

          {/* HIERARCHY TREE LAYOUT */}
          <div className="flex flex-col items-center space-y-12 relative z-10">
            
            {/* LEVEL 0: ROOT NODE (Team Leader & Systems Architect) */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredMemberId(leader.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                onClick={() => onSelectMember(leader)}
                className={`relative p-5 md:p-6 bg-gradient-to-b from-[#111827] to-[#0B0F19] border-2 cursor-pointer transition-all duration-300 max-w-md w-full shadow-2xl text-center group ${
                  isNodeInPath(leader.id)
                    ? 'border-[#38BDF8] shadow-[0_0_35px_rgba(255,159,0,0.6)] ring-2 ring-[#38BDF8]'
                    : 'border-[#38BDF8] hover:shadow-[0_0_30px_rgba(255,159,0,0.4)]'
                }`}
              >
                {/* Ping Beacon */}
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#38BDF8]"></span>
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#38BDF8] text-[#0B0F19] text-[10px] font-black uppercase tracking-widest mb-2">
                  <Cpu className="w-3 h-3" />
                  <span>ROOT NODE // SYSTEMS ARCHITECT & LEAD</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black font-display text-[#F9FAFB] group-hover:text-[#38BDF8] transition-colors">
                  {leader.name}
                </h3>
                <p className="text-xs text-[#38BDF8] font-mono mt-0.5">{leader.role}</p>

                <div className="mt-3 pt-3 border-t border-[#38BDF8]/20 flex items-center justify-between text-[10px] text-[#9CA3AF] font-mono">
                  <span>BUS ID: #01 (ROOT)</span>
                  <span className="text-emerald-400 font-bold">115.2 KBPS MASTER LINK</span>
                </div>
              </motion.div>

              {/* Trunk Laser Line to Coordinator & Divisions */}
              <div className="w-0.5 h-10 bg-gradient-to-b from-[#38BDF8] via-cyan-400 to-[#38BDF8] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F9FAFB]/80 animate-[ping_1.5s_infinite]" />
              </div>
            </div>

            {/* LEVEL 1: TEAM COORDINATION HUB */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                onMouseEnter={() => setHoveredMemberId(coordinator.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                onClick={() => onSelectMember(coordinator)}
                className={`relative p-4 md:p-5 bg-[#111827]/90 border cursor-pointer transition-all duration-300 max-w-sm w-full shadow-xl text-center group ${
                  isNodeInPath(coordinator.id)
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400'
                    : 'border-[#38BDF8]/40 hover:border-[#38BDF8]'
                }`}
              >
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0B0F19] border border-cyan-400/40 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <Zap className="w-3 h-3" />
                  <span>OPERATIONS & SYNC HUB</span>
                </div>
                <h4 className="text-lg font-bold font-display text-[#F9FAFB] group-hover:text-cyan-300 transition-colors">
                  {coordinator.name}
                </h4>
                <p className="text-xs text-[#9CA3AF] font-mono">{coordinator.role}</p>
              </motion.div>

              {/* Horizontal Trunk Line Branching to 3 Main Divisions */}
              <div className="w-full max-w-4xl relative h-10 flex items-center justify-center">
                <div className="absolute top-0 bottom-1/2 w-0.5 bg-cyan-400" />
                <div className="w-full h-0.5 bg-gradient-to-r from-cyan-400 via-[#38BDF8] to-emerald-400 shadow-[0_0_10px_#38BDF8]" />
              </div>
            </div>

            {/* LEVEL 2 & 3: DIVISIONAL COLUMNS WITH CONNECTED MEMBER NODES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              
              {/* --- 1. SOFTWARE DIVISION TREE --- */}
              <div className="flex flex-col items-center space-y-4 p-4 bg-[#111827]/40 border border-cyan-500/20 shadow-lg">
                
                {/* Division Hub Header */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onMouseEnter={() => setHoveredMemberId(softwareLead.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                  onClick={() => onSelectMember(softwareLead)}
                  className={`w-full p-4 bg-[#0B0F19] border-2 cursor-pointer transition-all duration-300 group text-center relative ${
                    isNodeInPath(softwareLead.id)
                      ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)]'
                      : 'border-cyan-500/40 hover:border-cyan-400'
                  }`}
                >
                  <span className="text-[9px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-mono font-bold">
                    SOFTWARE DIVISION MANAGER
                  </span>
                  <h4 className="text-base font-bold font-display text-[#F9FAFB] mt-1 group-hover:text-cyan-300 transition-colors">
                    {softwareLead.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">CV, Backend & Logic Lead</p>
                </motion.div>

                {/* Sub-node connection vertical track */}
                <div className="w-0.5 h-4 bg-cyan-400/40" />

                {/* Software Specialists List */}
                <div className="w-full space-y-2.5">
                  {softwareMembers.map((member) => {
                    const isHighlighted = isNodeInPath(member.id);
                    return (
                      <motion.div
                        key={member.id}
                        whileHover={{ x: 4 }}
                        onMouseEnter={() => setHoveredMemberId(member.id)}
                        onMouseLeave={() => setHoveredMemberId(null)}
                        onClick={() => onSelectMember(member)}
                        className={`p-3 bg-[#0B0F19]/90 border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                          isHighlighted
                            ? 'border-cyan-400 bg-[#111827] shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                            : 'border-[#38BDF8]/15 hover:border-cyan-400/60'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F9FAFB] group-hover:text-cyan-300 transition-colors">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-[#9CA3AF] font-mono">{member.role}</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#111827] text-cyan-400 font-mono">
                          #0{member.id}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* --- 2. HARDWARE DIVISION TREE --- */}
              <div className="flex flex-col items-center space-y-4 p-4 bg-[#111827]/40 border border-[#38BDF8]/20 shadow-lg">
                
                {/* Division Hub Header */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onMouseEnter={() => setHoveredMemberId(hardwareLead.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                  onClick={() => onSelectMember(hardwareLead)}
                  className={`w-full p-4 bg-[#0B0F19] border-2 cursor-pointer transition-all duration-300 group text-center relative ${
                    isNodeInPath(hardwareLead.id)
                      ? 'border-[#38BDF8] shadow-[0_0_25px_rgba(255,159,0,0.5)]'
                      : 'border-[#38BDF8]/40 hover:border-[#38BDF8]'
                  }`}
                >
                  <span className="text-[9px] px-2 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 uppercase font-mono font-bold">
                    HARDWARE DIVISION MANAGER
                  </span>
                  <h4 className="text-base font-bold font-display text-[#F9FAFB] mt-1 group-hover:text-[#38BDF8] transition-colors">
                    {hardwareLead.name}
                  </h4>
                  <p className="text-xs text-[#38BDF8] font-mono mt-0.5">PCB & Silicon Integration Lead</p>
                </motion.div>

                {/* Sub-node connection vertical track */}
                <div className="w-0.5 h-4 bg-[#38BDF8]/40" />

                {/* Hardware Specialists List */}
                <div className="w-full space-y-2.5">
                  {hardwareMembers.map((member) => {
                    const isHighlighted = isNodeInPath(member.id);
                    return (
                      <motion.div
                        key={member.id}
                        whileHover={{ x: 4 }}
                        onMouseEnter={() => setHoveredMemberId(member.id)}
                        onMouseLeave={() => setHoveredMemberId(null)}
                        onClick={() => onSelectMember(member)}
                        className={`p-3 bg-[#0B0F19]/90 border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                          isHighlighted
                            ? 'border-[#38BDF8] bg-[#111827] shadow-[0_0_15px_rgba(255,159,0,0.4)]'
                            : 'border-[#38BDF8]/15 hover:border-[#38BDF8]/60'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F9FAFB] group-hover:text-[#38BDF8] transition-colors">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-[#9CA3AF] font-mono">{member.role}</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#111827] text-[#38BDF8] font-mono">
                          #0{member.id}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* --- 3. PRESENTATION & RESEARCH DIVISION TREE --- */}
              <div className="flex flex-col items-center space-y-4 p-4 bg-[#111827]/40 border border-emerald-500/20 shadow-lg">
                
                {/* Dual Division Hub Header */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredMemberId(presentationLead.id)}
                    onMouseLeave={() => setHoveredMemberId(null)}
                    onClick={() => onSelectMember(presentationLead)}
                    className={`p-3 bg-[#0B0F19] border cursor-pointer transition-all duration-300 group text-center ${
                      isNodeInPath(presentationLead.id)
                        ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                        : 'border-emerald-500/40 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-[8px] text-emerald-400 font-mono uppercase font-bold block">
                      PRESENTATION LEAD
                    </span>
                    <h5 className="text-xs font-bold text-[#F9FAFB] mt-1 group-hover:text-emerald-300">
                      {presentationLead.name}
                    </h5>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredMemberId(researchLead.id)}
                    onMouseLeave={() => setHoveredMemberId(null)}
                    onClick={() => onSelectMember(researchLead)}
                    className={`p-3 bg-[#0B0F19] border cursor-pointer transition-all duration-300 group text-center ${
                      isNodeInPath(researchLead.id)
                        ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                        : 'border-emerald-500/40 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-[8px] text-emerald-400 font-mono uppercase font-bold block">
                      RESEARCH LEAD
                    </span>
                    <h5 className="text-xs font-bold text-[#F9FAFB] mt-1 group-hover:text-emerald-300">
                      {researchLead.name}
                    </h5>
                  </motion.div>
                </div>

                {/* Sub-node connection vertical track */}
                <div className="w-0.5 h-4 bg-emerald-400/40" />

                {/* Presentation & Research Members List */}
                <div className="w-full space-y-2.5">
                  {presentationMembers.map((member) => {
                    const isHighlighted = isNodeInPath(member.id);
                    return (
                      <motion.div
                        key={member.id}
                        whileHover={{ x: 4 }}
                        onMouseEnter={() => setHoveredMemberId(member.id)}
                        onMouseLeave={() => setHoveredMemberId(null)}
                        onClick={() => onSelectMember(member)}
                        className={`p-3 bg-[#0B0F19]/90 border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                          isHighlighted
                            ? 'border-emerald-400 bg-[#111827] shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                            : 'border-[#38BDF8]/15 hover:border-emerald-400/60'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F9FAFB] group-hover:text-emerald-300 transition-colors">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-[#9CA3AF] font-mono">{member.role}</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#111827] text-emerald-400 font-mono">
                          #0{member.id}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers
            .filter((m) => {
              const matchesSearch =
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.role.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesDiv = activeDivision === 'ALL' || m.team === activeDivision;
              return matchesSearch && matchesDiv;
            })
            .map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectMember(member)}
                className="p-5 bg-[#111827]/60 border border-[#38BDF8]/20 hover:border-[#38BDF8] hover:shadow-[0_0_25px_rgba(255,159,0,0.25)] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#38BDF8]/10">
                    <span className="text-[10px] px-2 py-0.5 bg-[#0B0F19] text-[#38BDF8] font-bold uppercase">
                      {member.team}
                    </span>
                    <span className="text-[10px] text-[#9CA3AF] font-mono">#0{member.id}</span>
                  </div>
                  <h4 className="text-base font-bold font-display text-[#F9FAFB] group-hover:text-[#38BDF8] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] mt-1 font-mono">{member.role}</p>
                  <p className="text-xs text-[#9CA3AF] mt-2 font-sans line-clamp-2">{member.bio}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#38BDF8]/10 flex items-center justify-between text-[11px] text-[#38BDF8]">
                  <span>Open Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TeamNetworkConnectome;
