import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface RoadmapNuggetProps {
  title: string;
  data: any[];
  icon: LucideIcon;
  color: string;
  delay: number;
  onSelect: (member: any) => void;
}

export const RoadmapNugget = React.memo(({ title, data, icon: Icon, color, delay, onSelect }: RoadmapNuggetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="relative w-full max-w-[340px]"
    >
      <div className={`p-0.5 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 hover:from-${color}/30 transition-all duration-500 shadow-2xl`}>
        <div className="bg-zinc-950/80 backdrop-blur-xl p-6 rounded-[calc(2.5rem-2px)] relative overflow-hidden group">
          {/* Neurix Branding */}
          <div className="absolute top-4 right-6 text-[7px] font-black tracking-[0.6em] text-white/10 uppercase group-hover:text-yellow-400/20 transition-colors">NEURIX</div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-${color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-base leading-[1.1] uppercase tracking-widest text-white">{title}</h5>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Pod Matrix</p>
            </div>
          </div>

          <div className="space-y-2">
            {data.map((member: any) => (
              <div 
                key={member.id}
                onClick={() => onSelect(member)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-yellow-400/5 hover:border-yellow-400/20 transition-all cursor-pointer group/member"
              >
                <div>
                  <p className="text-[11px] font-bold text-slate-200 group-hover/member:text-white transition-colors">{member.name}</p>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{member.role}</p>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-700 group-hover/member:text-yellow-400 transform group-hover/member:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

RoadmapNugget.displayName = 'RoadmapNugget';
