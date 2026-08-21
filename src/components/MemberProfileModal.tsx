import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../types';
import { X, Shield, Cpu, Code, BookOpen, Layers, CheckCircle2, UserCheck } from 'lucide-react';

interface MemberProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#081838] border border-[#ff9f00] p-6 sm:p-8 shadow-[0_0_50px_rgba(255,159,0,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#0f2552] border border-[#ff9f00]/30 text-slate-400 hover:text-white hover:border-[#ff9f00] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Member Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#ff9f00]/20">
            <div className="w-16 h-16 bg-[#0f2552] border border-[#ff9f00]/40 flex items-center justify-center text-2xl font-bold font-display text-[#ff9f00] shrink-0 amber-phosphor-glow">
              {member.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#ff9f00]/10 border border-[#ff9f00]/30 text-[#ff9f00] font-bold uppercase tracking-wider">
                  {member.team} Division
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#0f2552] text-slate-300 font-mono">
                  ID: #0{member.id}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">{member.name}</h3>
              <p className="text-xs text-[#ff9f00] mt-0.5">{member.role}</p>
            </div>
          </div>

          {/* Bio section */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              // Technical Profile & Focus
            </h4>
            <p className="text-sm text-slate-300 font-sans leading-relaxed bg-[#0f2552]/40 p-4 border border-[#ff9f00]/15">
              {member.bio || 'Directs systems development and implementation for the Neurix spatial interface.'}
            </p>
          </div>

          {/* Skills / Badges */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                // Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 bg-[#0f2552] border border-[#ff9f00]/30 text-white flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#ff9f00]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer status */}
          <div className="pt-4 border-t border-[#ff9f00]/20 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Status: Verified Team Contributor
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#ff9f00] text-[#081838] font-bold text-xs uppercase cursor-pointer hover:bg-white transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MemberProfileModal;
