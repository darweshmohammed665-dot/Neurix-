import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Zap, Activity, Radio, Terminal, Settings, CheckCircle2 } from 'lucide-react';

export const IoTSystemVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [selectedBus, setSelectedBus] = useState<'UART' | 'I2C' | 'SPI' | 'ADC'>('UART');

  const busData = {
    UART: {
      name: 'UART Protocol Controller (TXD0 / RXD0)',
      pins: ['GPIO 43 (U0TXD)', 'GPIO 44 (U0RXD)'],
      baud: '115200 Baud / 8-N-1',
      description: 'Asynchronous serial link streaming telemetry frames directly to the desktop diagnostics suite.',
      status: 'TRANSMITTING',
      rate: '11.5 KB/s',
    },
    I2C: {
      name: 'Inter-Integrated Circuit Bus (SDA / SCL)',
      pins: ['GPIO 8 (SDA)', 'GPIO 9 (SCL)'],
      baud: '400 kHz Fast Mode',
      description: 'Multi-device sensory controller polling 6-axis IMU sensors and environmental digital registers.',
      status: 'ACTIVE_POLL',
      rate: '48.2 KB/s',
    },
    SPI: {
      name: 'Serial Peripheral Interface (MOSI / MISO / SCK)',
      pins: ['GPIO 11 (MOSI)', 'GPIO 13 (MISO)', 'GPIO 12 (SCK)', 'GPIO 10 (CS)'],
      baud: '20.0 MHz High Speed',
      description: 'Ultra-low latency pipe pushing display framebuffers and high-rate DSP buffer exchanges.',
      status: 'BURST_MODE',
      rate: '2.4 MB/s',
    },
    ADC: {
      name: 'Analog-to-Digital Converter (12-bit SAR)',
      pins: ['GPIO 1 (ADC1_CH0)', 'GPIO 2 (ADC1_CH1)', 'GPIO 3 (ADC1_CH2)'],
      baud: '2 Msps Sampling Rate',
      description: 'High-precision sensory line sampling raw voltage potential from physical touchless transducers.',
      status: 'SAMPLING',
      rate: '3.3V Max',
    },
  };

  const currentBus = busData[selectedBus];

  return (
    <section
      ref={containerRef}
      id="architecture-section"
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#ff9f00]/15 bg-[#081838] font-mono relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2552] border border-[#ff9f00]/30 text-[#ff9f00] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware Register Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
            Embedded <span className="text-[#ff9f00] amber-phosphor-glow">IoT Controller</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm font-sans">
            Direct silicon bus multiplexing and hardware signal serialization for the Neurix spatial transceiver.
          </p>
        </motion.div>

        {/* Interactive Bus Visualizer Box with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0f2552]/80 border border-[#ff9f00]/30 p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden"
        >
          {/* Subtle Top Phosphor Scanline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9f00] to-transparent animate-pulse" />

          {/* Left Column: Bus Selector */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
              // Select Active Bus Protocol
            </p>
            {(['UART', 'I2C', 'SPI', 'ADC'] as const).map((bus) => {
              const isSelected = selectedBus === bus;
              return (
                <button
                  key={bus}
                  onClick={() => setSelectedBus(bus)}
                  className={`w-full p-4 text-left border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#ff9f00] text-[#081838] border-[#ff9f00] font-bold shadow-[0_0_20px_rgba(255,159,0,0.35)] translate-x-1'
                      : 'bg-[#081838]/70 border-[#ff9f00]/20 text-slate-300 hover:border-[#ff9f00]/60 hover:text-white'
                  }`}
                >
                  <div>
                    <span className="text-sm tracking-wider uppercase flex items-center gap-2">
                      {bus} Pipeline
                    </span>
                    <p className={`text-[10px] ${isSelected ? 'text-[#081838]/80 font-medium' : 'text-slate-400'}`}>
                      {busData[bus].pins.length} Signal Lines Active
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 font-mono transition-colors ${isSelected ? 'bg-[#081838] text-[#ff9f00]' : 'bg-[#0f2552] text-slate-300'}`}>
                    {busData[bus].status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Bus Diagnostic Inspector */}
          <div className="lg:col-span-8 bg-[#081838] border border-[#ff9f00]/20 p-6 flex flex-col justify-between relative">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#ff9f00]/15 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase">{currentBus.name}</h3>
                  <p className="text-xs text-[#ff9f00] font-mono mt-0.5">{currentBus.baud}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#0f2552] border border-emerald-500/40 text-emerald-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>STREAM: {currentBus.rate}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm font-sans mt-4 leading-relaxed">
                {currentBus.description}
              </p>

              {/* Pin Map Visualization */}
              <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#ff9f00]" />
                  <span>Mapped Microcontroller GPIO Channels:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentBus.pins.map((pin) => (
                    <motion.div
                      key={pin}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-[#0f2552]/60 border border-[#ff9f00]/20 hover:border-[#ff9f00]/60 flex items-center justify-between transition-colors"
                    >
                      <span className="text-xs text-white font-mono">{pin}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#ff9f00]/10 text-[#ff9f00] font-mono font-semibold">
                        3.3V TTL
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Signal Oscilloscope Simulation Bar */}
            <div className="mt-6 pt-4 border-t border-[#ff9f00]/15 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Logic Clock Sync: LOCKED (240.000 MHz)
              </span>
              <span className="text-[#ff9f00]">Latency: ~0.42 ms</span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default IoTSystemVisualizer;
