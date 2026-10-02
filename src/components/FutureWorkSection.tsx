import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Cpu, Globe, Infinity as InfinityIcon, ChevronRight, Zap, Target, Binary } from 'lucide-react';

const futurePillars = [
  {
    id: 'pillar-1',
    title: 'Neural Mapping',
    description: 'Scaling the IoT bus to integrate multi-node sensor inputs, allowing precise real-time hand skeleton reconstruction in 3D space.',
    icon: <Binary className="w-6 h-6 text-neurix-cyan" />,
    tag: 'MODULE v5'
  },
  {
    id: 'pillar-2',
    title: 'Haptic Sync',
    description: 'Introducing ultra-low latency haptic wearables that synchronize physical sensations with spatial gesture interactions.',
    icon: <Zap className="w-6 h-6 text-neurix-cyan" />,
    tag: 'HAPTIC_BUS'
  },
  {
    id: 'pillar-3',
    title: 'Edge Synergy',
    description: 'Offloading heavy neural rendering to the edge with continuous cloud syncing for personalized, adaptive gesture recognition.',
    icon: <Target className="w-6 h-6 text-neurix-cyan" />,
    tag: 'SYNERGY_CORE'
  }
];

export const FutureWorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const lineY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={containerRef} id="future-work-section" className="relative py-32 overflow-hidden bg-[#050B14]">
      {/* Abstract Background Elements with Parallax */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-neurix-cyan/5 blur-[120px] pointer-events-none" 
      />
      
      {/* Decorative Parallax Line */}
      <motion.div 
        style={{ y: lineY }}
        className="absolute top-1/2 right-[-5%] w-[40%] h-[1px] bg-gradient-to-l from-neurix-cyan/20 to-transparent rotate-[-45deg] pointer-events-none" 
      />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-neurix-cyan/5 border border-neurix-cyan/20 rounded-full mb-8"
          >
            <Rocket className="w-3 h-3 text-neurix-cyan" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neurix-cyan">Vision 2030</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-[#F2FAFF] tracking-tight leading-[0.9]"
          >
            BEYOND THE <br /> <span className="text-neurix-cyan italic">HORIZON</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-[#9DB2C3] leading-relaxed font-light max-w-xl"
          >
            Neurix is not just a project; it is a continuously evolving ecosystem. Our roadmap extends into the fusion of edge computing and neural haptics.
          </motion.p>
        </div>

        {/* Future Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futurePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="spatial-card p-10 group"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-neurix-cyan/5 border border-neurix-cyan/10 rounded-sm group-hover:border-neurix-cyan/30 transition-colors">
                  {pillar.icon}
                </div>
                <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">{pillar.tag}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#F2FAFF] tracking-tight mb-4 group-hover:text-neurix-cyan transition-colors">
                {pillar.title}
              </h3>
              
              <p className="text-[#9DB2C3] leading-relaxed font-light text-sm">
                {pillar.description}
              </p>
              
              <div className="mt-12 flex items-center justify-between">
                <div className="h-px flex-1 bg-white/5 group-hover:bg-neurix-cyan/20 transition-colors mr-4" />
                <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-neurix-cyan transition-all group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Line */}
        <div className="mt-32 w-full h-px bg-gradient-to-r from-neurix-cyan/20 via-white/5 to-transparent" />
      </div>
    </section>
  );
};

export default FutureWorkSection;
