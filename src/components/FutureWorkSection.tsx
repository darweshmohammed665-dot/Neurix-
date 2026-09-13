import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Cpu, Globe, Infinity as InfinityIcon, ChevronRight } from 'lucide-react';

const futurePillars = [
  {
    id: 'pillar-1',
    title: 'Advanced Neural Mapping',
    description: 'Scaling the IoT bus to integrate multi-node sensor inputs, allowing precise real-time hand skeleton reconstruction in 3D space.',
    icon: <Cpu className="w-6 h-6 text-indigo-400" />,
    color: 'from-indigo-500/20 to-indigo-900/10',
    border: 'border-indigo-500/30'
  },
  {
    id: 'pillar-2',
    title: 'Haptic Feedback Ecosystem',
    description: 'Introducing ultra-low latency haptic wearables that synchronize physical sensations with spatial gesture interactions.',
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    color: 'from-emerald-500/20 to-emerald-900/10',
    border: 'border-emerald-500/30'
  },
  {
    id: 'pillar-3',
    title: 'Cloud-Edge AI Synergy',
    description: 'Offloading heavy neural rendering to the edge with continuous cloud syncing for personalized, adaptive gesture recognition.',
    icon: <InfinityIcon className="w-6 h-6 text-fuchsia-400" />,
    color: 'from-fuchsia-500/20 to-fuchsia-900/10',
    border: 'border-fuchsia-500/30'
  }
];

export const FutureWorkSection: React.FC = () => {
  return (
    <section id="future-work-section" className="relative py-24 sm:py-32 overflow-hidden bg-[#0F172A] border-t border-[#F9FAFB]/5">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-fuchsia-500/5 to-transparent blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern */}
      

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB]/5 border border-[#F9FAFB]/10 text-[#9CA3AF] text-sm font-medium tracking-wide mb-6"
          >
            <Rocket className="w-4 h-4 text-[#FBBF24]" />
            <span>Beyond The Horizon</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F9FAFB] via-slate-200 to-slate-500 tracking-tight"
          >
            Future Work
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-[#9CA3AF] leading-relaxed font-light"
          >
            Our architecture is designed for infinite scalability. We are actively researching and developing the next generation of spatial computing interfaces.
          </motion.p>
        </div>

        {/* Future Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {futurePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl pointer-events-none`} />
              
              <div className={`relative h-full flex flex-col p-8 rounded-3xl bg-[#1E293B]/80 backdrop-blur-md border ${pillar.border} hover:border-[#F9FAFB]/20 transition-all duration-500 overflow-hidden`}>
                
                {/* Minimalist Tech Lines */}
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" className="text-[#F9FAFB]">
                    <path d="M40 0L0 40M40 20L20 40M40 40L40 40" strokeWidth="1" strokeDasharray="2 4"/>
                  </svg>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB]/5 border border-[#F9FAFB]/10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500">
                  {pillar.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-[#F9FAFB] tracking-tight mb-4 group-hover:text-[#FBBF24] transition-colors duration-300">
                  {pillar.title}
                </h3>
                
                <p className="text-[#9CA3AF] leading-relaxed font-light flex-grow">
                  {pillar.description}
                </p>
                
                <div className="mt-8 flex items-center text-sm font-semibold text-[#9CA3AF] group-hover:text-[#F9FAFB] transition-colors">
                  <span>Explore Concept</span>
                  <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision Timeline Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          className="w-full h-px mt-24 bg-gradient-to-r from-transparent via-[#F9FAFB]/20 to-transparent origin-left"
        />
        
      </div>
    </section>
  );
};

export default FutureWorkSection;
