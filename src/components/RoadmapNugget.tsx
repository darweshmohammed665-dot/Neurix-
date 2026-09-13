import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Eye, BookOpen, Zap, Radio, Layers, CircuitBoard, CheckCircle, ArrowUpRight } from 'lucide-react';

export const RoadmapNugget: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const pillars = [
    {
      title: 'Hardware Integration',
      description: 'Developing intelligent, low-latency firmware kernels using modern dual-core microcontrollers to push physical control loops to sub-millisecond responsiveness.',
      icon: <Cpu className="w-7 h-7 text-[#FBBF24]" />,
      accent: 'border-[#FBBF24]/30 hover:border-[#FBBF24]',
      glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]',
      tags: ['Processing', 'Low Latency', 'Physical Control'],
    },
    {
      title: 'Optical Tracking',
      description: 'Utilizing dynamic computer vision algorithms via advanced interfaces to interpret and execute spatial commands in human-computer interaction fields.',
      icon: <Eye className="w-7 h-7 text-amber-400" />,
      accent: 'border-amber-500/30 hover:border-amber-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]',
      tags: ['Vision', 'Spatial Commands', '60 FPS Tracking'],
    },
    {
      title: 'System Evaluation',
      description: 'Structuring rigorous academic studies on gesture latency matrices, user hand-interaction ergonomic models, and computing efficiency.',
      icon: <BookOpen className="w-7 h-7 text-emerald-400" />,
      accent: 'border-emerald-500/30 hover:border-emerald-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]',
      tags: ['Latency Benchmarks', 'Ergonomics', 'User Testing'],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about-concept"
      className="py-28 px-4 sm:px-6 lg:px-8 border-y border-[#FBBF24]/15 bg-[#0F172A]/80 font-mono relative overflow-hidden"
    >
      {/* Background Subtle Laser Lines */}
      

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E293B] border border-[#FBBF24]/30 text-[#FBBF24] text-[11px] font-bold uppercase tracking-widest mb-3">
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>System Core Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F9FAFB] tracking-tight uppercase">
              Core Engineering <span className="text-[#FBBF24] amber-phosphor-glow">Pillars</span>
            </h2>
          </div>
          <p className="text-[#9CA3AF] max-w-md text-sm font-sans leading-relaxed">
            Bridging hardware firmware, computer vision optical tracking, and ergonomic HCI research into a unified spatial interface.
          </p>
        </motion.div>

        {/* Pillars Grid with Staggered Scroll-Driven Reveals & 3D Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.18, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`p-8 bg-[#1E293B]/80 border ${pillar.accent} ${pillar.glow} transition-all duration-300 relative group flex flex-col justify-between shadow-xl backdrop-blur-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#0F172A] border border-[#FBBF24]/30 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">
                    PILLAR // 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#F9FAFB] mb-3 group-hover:text-[#FBBF24] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm font-sans leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#FBBF24]/10 flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 bg-[#0F172A] border border-[#FBBF24]/20 text-[#9CA3AF] group-hover:border-[#FBBF24]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RoadmapNugget;
