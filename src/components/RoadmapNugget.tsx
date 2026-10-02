import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Eye, BookOpen, CircuitBoard, ArrowUpRight } from 'lucide-react';

export const RoadmapNugget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const pillars = [
    {
      title: 'Hardware Architecture',
      description: 'Ultra-low latency firmware kernels on dual-core processors, enabling sub-millisecond physical feedback loops.',
      icon: <Cpu className="w-6 h-6 text-neurix-cyan" />,
      tag: 'KERNEL v2.0',
    },
    {
      title: 'Optical Synthesis',
      description: 'Advanced computer vision arrays interpreting human motion into 6DoF spatial commands at 120Hz.',
      icon: <Eye className="w-6 h-6 text-neurix-cyan" />,
      tag: 'OPTIC ENGINE',
    },
    {
      title: 'HCI Ergonomics',
      description: 'Rigorous cognitive load modeling to ensure touchless interaction feels intuitive and fatigue-free.',
      icon: <BookOpen className="w-6 h-6 text-neurix-cyan" />,
      tag: 'NEURAL UX',
    },
  ];

  return (
    <section ref={containerRef} id="roadmap" className="py-32 px-6 lg:px-12 relative overflow-hidden bg-[#050B14]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#163247] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#163247] to-transparent" />
      
      {/* Parallax Geometric Backgrounds */}
      <motion.div 
        style={{ y: decorY1 }}
        className="absolute top-1/4 right-[5%] w-64 h-64 border border-neurix-cyan/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ y: decorY2 }}
        className="absolute bottom-1/4 left-[5%] w-96 h-px bg-neurix-cyan/10 -rotate-12 pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Header Area */}
          <div className="lg:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-neurix-cyan/5 border border-neurix-cyan/20 rounded-full"
            >
              <CircuitBoard className="w-3 h-3 text-neurix-cyan" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neurix-cyan">SYSTEM PILLARS</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
            >
              ENGINEERING <br /> <span className="text-neurix-cyan italic">INTELLIGENCE</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#9DB2C3] leading-relaxed font-light"
            >
              The technical foundation of Neurix is built upon three convergent disciplines: real-time hardware orchestration, high-fidelity computer vision, and cognitive ergonomics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <div className="flex items-center gap-4 text-neurix-cyan font-mono text-xs cursor-pointer group">
                <span className="group-hover:mr-2 transition-all">READ WHITE PAPER</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Pillars Area */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className={`spatial-card p-8 group ${idx === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-neurix-cyan/5 rounded-sm border border-neurix-cyan/10 group-hover:border-neurix-cyan/30 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono text-white/20 tracking-widest">{pillar.tag}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-neurix-cyan transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#9DB2C3] leading-relaxed font-light">
                  {pillar.description}
                </p>
                
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-px flex-1 bg-neurix-cyan/20" />
                  <span className="text-[9px] font-mono text-neurix-cyan">EXPLORE CORE</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapNugget;
