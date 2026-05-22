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
            className="absolute inset-0 bg-blue-950/90 backdrop-blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-3xl bg-blue-900 border border-yellow-400/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,215,0,0.1)]"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[100px] rounded-full" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 blur-[100px] rounded-full" />
            </div>
            
            <div className="relative p-8 md:p-16">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 hover:border-transparent transition-all z-20 group"
              >
                <span className="text-2xl transition-transform group-hover:scale-110">×</span>
              </button>
              
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-yellow-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-[2rem] bg-blue-950 border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    <Users className="w-20 h-20 text-slate-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
                    <div className="absolute bottom-4 left-0 right-0 text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400 opacity-60">Verified</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-blue-600/30">
                    {member.team === "Software" ? "Soft" : member.team === "Hardware" ? "Hardware" : member.team} Division
                  </div>
                  <h4 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{member.name}</h4>
                  <p className="text-xl text-yellow-400 font-bold mb-8 tracking-wide drop-shadow-lg">{member.role}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-[0.2em]">Operational Status</p>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                         <p className="text-sm font-black text-white uppercase tracking-widest">Active Member</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-[0.2em]">Matrix Credential</p>
                      <p className="text-sm font-mono font-bold text-blue-400">#NX-2026-{member.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-10 border-t border-white/5">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="h-0.5 w-12 bg-yellow-400" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Member Biography</p>
                     </div>
                     <p className="text-slate-400 text-base leading-relaxed font-medium">
                       Integral member of the project ecosystem, specializing in {member.role.toLowerCase()}. Contributing to the architectural evolution of the Neurix tangible interface through precise execution and cross-discipline collaboration.
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
