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
      title: 'Interactive Embedded Systems',
      description: 'Developing intelligent, low-latency firmware kernels using modern dual-core microcontrollers to push physical control loops to sub-millisecond responsiveness.',
      icon: <Cpu className="w-7 h-7 text-[#ff9f00]" />,
      accent: 'border-[#ff9f00]/30 hover:border-[#ff9f00]',
      glow: 'group-hover:shadow-[0_0_30px_rgba(255,159,0,0.25)]',
      tags: ['ESP32-S3', 'FreeRTOS', 'SPI / I2C', 'Direct Register Access'],
    },
    {
      title: 'Gesture & Optical Computer Vision',
      description: 'Utilizing dynamic computer vision algorithms via OpenCV interfaces to interpret and execute spatial commands in human-computer interaction fields.',
      icon: <Eye className="w-7 h-7 text-cyan-400" />,
      accent: 'border-cyan-500/30 hover:border-cyan-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]',
      tags: ['OpenCV', 'Hand Pose Landmarks', 'Coordinate Matrix', '60 FPS Tracking'],
    },
    {
      title: 'Systematic Academic Research',
      description: 'Structuring rigorous academic studies on gesture latency matrices, user hand-interaction ergonomic models, and edge computing efficiency.',
      icon: <BookOpen className="w-7 h-7 text-emerald-400" />,
      accent: 'border-emerald-500/30 hover:border-emerald-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]',
      tags: ['Latency Benchmarks', 'HCI Ergonomics', 'Statistical Logs', 'Comparative Study'],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about-concept"
      className="py-28 px-4 sm:px-6 lg:px-8 border-y border-[#ff9f00]/15 bg-[#081838]/80 font-mono relative overflow-hidden"
    >
      {/* Background Subtle Laser Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff9f00_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2552] border border-[#ff9f00]/30 text-[#ff9f00] text-[11px] font-bold uppercase tracking-widest mb-3">
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>System Core Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              Core Engineering <span className="text-[#ff9f00] amber-phosphor-glow">Pillars</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm font-sans leading-relaxed">
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
              className={`p-8 bg-[#0f2552]/80 border ${pillar.accent} ${pillar.glow} transition-all duration-300 relative group flex flex-col justify-between shadow-xl backdrop-blur-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#081838] border border-[#ff9f00]/30 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    PILLAR // 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-[#ff9f00] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ff9f00]/10 flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 bg-[#081838] border border-[#ff9f00]/20 text-slate-300 group-hover:border-[#ff9f00]/40 transition-colors"
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
