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

export const RoadmapNugget = React.memo(({ title, data, icon: Icon, delay, onSelect }: RoadmapNuggetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="relative w-full max-w-[340px]"
    >
      <div className="p-0.5 rounded-none border border-phosphor/20 bg-dark-obsidian hover:border-phosphor transition-all duration-300 shadow-2xl">
        <div className="bg-dark-charcoal p-6 rounded-none relative overflow-hidden group">
          {/* Decorative Corner Bracket */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-phosphor/20 group-hover:border-phosphor/60 transition-colors" />
          
          <div className="absolute top-4 right-6 text-[7px] font-mono font-black tracking-[0.4em] text-phosphor/20 uppercase group-hover:text-phosphor/40 transition-colors">CORE_NODE</div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-phosphor/5 border border-phosphor/20 text-phosphor hover:scale-110 transition-transform">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display font-black text-base uppercase tracking-tight text-white">{title}</h5>
              <p className="text-[9px] font-mono font-black text-phosphor/60 uppercase tracking-wider mt-1">Matrix Division Pod</p>
            </div>
          </div>

          <div className="space-y-2">
            {data.map((member: any) => (
              <div 
                key={member.id}
                onClick={() => onSelect(member)}
                className="flex items-center justify-between p-3 rounded-none bg-dark-obsidian border border-phosphor/10 hover:bg-phosphor/5 hover:border-phosphor/40 transition-all cursor-pointer group/member"
              >
                <div>
                  <p className="text-[11px] font-bold text-slate-200 group-hover/member:text-white transition-colors">{member.name}</p>
                  <p className="text-[8px] font-mono text-phosphor/50 uppercase tracking-widest leading-none mt-1">{member.role}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-phosphor/30 group-hover/member:text-phosphor transform group-hover/member:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

RoadmapNugget.displayName = 'RoadmapNugget';
