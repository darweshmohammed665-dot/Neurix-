import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users } from 'lucide-react';

interface MemberProfileModalProps {
  member: any | null;
  onClose: () => void;
}

export const MemberProfileModal = React.memo(({ member, onClose }: MemberProfileModalProps) => {
  return (
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-obsidian/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-dark-charcoal border-2 border-phosphor/30 rounded-none overflow-hidden shadow-[0_0_60px_rgba(255,159,0,0.15)]"
          >
            {/* Warning stripes at the top of modal */}
            <div className="w-full h-1.5 bg-[repeating-linear-gradient(45deg,#ff9f00,#ff9f00_10px,#0e0f15_10px,#0e0f15_20px)] border-b border-phosphor/20" />

            <div className="absolute inset-0 opacity-[0.02] warning-stripe-bg pointer-events-none" />
            
            <div className="relative p-8 md:p-12 font-sans">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-dark-obsidian border border-phosphor/20 flex items-center justify-center text-phosphor hover:bg-phosphor hover:text-dark-obsidian hover:border-transparent transition-all z-20 cursor-pointer"
              >
                <span className="text-xl font-mono">×</span>
              </button>
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                {/* Profile Placeholder */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-phosphor/10 rounded-none blur opacity-40" />
                  <div className="relative w-36 h-36 rounded-none bg-dark-obsidian border border-phosphor/30 flex items-center justify-center shrink-0 overflow-hidden">
                    <Users className="w-16 h-16 text-phosphor/20" />
                    <div className="absolute inset-x-0 bottom-2 text-center text-[8px] font-mono font-black uppercase tracking-[0.3em] text-phosphor amber-phosphor-glow">NX_VERIFIED</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[9px] font-mono font-black uppercase tracking-wider mb-4 shadow-sm">
                    {member.team === "Software" ? "Software" : member.team === "Hardware" ? "Hardware" : member.team} Division
                  </div>
                  <h4 className="text-3xl font-display font-black mb-2 text-white tracking-tight uppercase">{member.name}</h4>
                  <p className="text-base text-phosphor font-mono tracking-wider mb-6 uppercase">{member.role}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-dark-obsidian border border-phosphor/10">
                      <p className="text-[9px] uppercase font-mono font-bold text-phosphor/40 mb-1 tracking-wider">SYSTEM STATUS</p>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-phosphor rounded-full animate-ping" />
                         <p className="text-xs font-mono font-bold text-white uppercase tracking-widest">CORE_MEMBER_ACTIVE</p>
                      </div>
                    </div>
                    <div className="p-4 bg-dark-obsidian border border-phosphor/10">
                      <p className="text-[9px] uppercase font-mono font-bold text-phosphor/40 mb-1 tracking-wider">SECURE ID REG</p>
                      <p className="text-xs font-mono font-bold text-phosphor">#NX-2026-{member.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-phosphor/10">
                     <p className="text-[9px] font-mono font-black uppercase tracking-widest text-phosphor/40 mb-3">// STRUCTURAL ASSIGNMENT BIOGRAPHY</p>
                     <p className="text-slate-300 text-sm leading-relaxed font-sans">
                       Active specialist contributing to the Neurix project ecosystem, focused heavily on {member.role.toLowerCase()} tasks. Drives the interface's low-overhead capabilities through precise technical feedback and multi-pod alignment.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

MemberProfileModal.displayName = 'MemberProfileModal';
