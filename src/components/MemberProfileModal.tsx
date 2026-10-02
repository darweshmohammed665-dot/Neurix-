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
          className="relative w-full max-w-xl bg-[#050B14] border border-[#163247] p-6 sm:p-8 shadow-[0_0_50px_rgba(0, 217, 255,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#0C1B2A] border border-[#163247] text-[#9DB2C3] hover:text-[#F2FAFF] hover:border-[#163247] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Member Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#163247]">
            <div className="w-16 h-16 bg-[#0C1B2A] border border-[#163247] flex items-center justify-center text-2xl font-bold font-display text-[#00D9FF] shrink-0 amber-phosphor-glow">
              {member.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#00D9FF]/10 border border-[#163247] text-[#00D9FF] font-bold uppercase tracking-wider">
                  {member.team} Division
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#0C1B2A] text-[#9DB2C3] font-mono">
                  ID: #0{member.id}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-[#F2FAFF]">{member.name}</h3>
              <p className="text-xs text-[#00D9FF] mt-0.5">{member.role}</p>
            </div>
          </div>

          {/* Bio section */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-[#9DB2C3] uppercase tracking-wider mb-2">
              // Technical Profile & Focus
            </h4>
            <p className="text-sm text-[#9DB2C3] font-sans leading-relaxed bg-[#0C1B2A] p-4 border border-[#163247]">
              {member.bio || 'Directs systems development and implementation for the Neurix spatial interface.'}
            </p>
          </div>

          {/* Skills / Badges */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#9DB2C3] uppercase tracking-wider mb-2">
                // Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 bg-[#0C1B2A] border border-[#163247] text-[#F2FAFF] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#00D9FF]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer status */}
          <div className="pt-4 border-t border-[#163247] flex items-center justify-between text-xs text-[#9DB2C3]">
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#39E58C]" />
              Status: Verified Team Contributor
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#00D9FF] text-[#050B14] font-bold text-xs uppercase cursor-pointer hover:bg-[#F2FAFF] transition-colors"
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
