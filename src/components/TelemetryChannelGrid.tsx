import React from 'react';
import { motion } from 'framer-motion';
import { systemDiagnostics } from '../data/neurixData';
import { Activity, Radio, Cpu, CheckCircle2 } from 'lucide-react';

export const TelemetryChannelGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#163247] bg-[#0C1B2A] font-mono relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10 pb-4 border-b border-[#163247]"
        >
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#00D9FF] animate-pulse" />
            <div>
              <h3 className="text-xl font-bold font-display text-[#F2FAFF] uppercase">
                Telemetry & Signal Channels
              </h3>
              <p className="text-xs text-[#9DB2C3] font-sans mt-0.5">
                Real-time serial register bus diagnostic feeds from the hardware core
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#050B14] border border-[#39E58C]/30 text-[#39E58C] text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>6/6 CHANNELS LOCKED</span>
          </div>
        </motion.div>

        {/* Channel Grid with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemDiagnostics.map((ch, idx) => (
            <motion.div
              key={ch.channel}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 bg-[#050B14] border border-[#163247] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0, 217, 255,0.2)] transition-all group shadow-sm"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#163247]">
                <span className="text-xs font-bold text-[#F2FAFF] group-hover:text-[#00D9FF] transition-colors">
                  {ch.channel}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#0C1B2A] text-[#39E58C] font-bold">
                  {ch.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-[#0C1B2A] border border-[#163247]">
                  <p className="text-[9px] text-[#9DB2C3] uppercase">Frequency</p>
                  <p className="font-bold text-slate-200 mt-0.5">{ch.freq}</p>
                </div>
                <div className="p-2 bg-[#0C1B2A] border border-[#163247]">
                  <p className="text-[9px] text-[#9DB2C3] uppercase">Voltage</p>
                  <p className="font-bold text-[#00D9FF] mt-0.5">{ch.voltage}</p>
                </div>
                <div className="p-2 bg-[#0C1B2A] border border-[#163247]">
                  <p className="text-[9px] text-[#9DB2C3] uppercase">Bandwidth</p>
                  <p className="font-bold text-[#F2FAFF] mt-0.5">{ch.bandwidth}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TelemetryChannelGrid;
