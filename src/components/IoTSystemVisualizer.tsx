import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Sliders } from 'lucide-react';

interface IoTSystemVisualizerProps {
  stage: 'hook' | 'problem' | 'solution';
}

export const IoTSystemVisualizer: React.FC<IoTSystemVisualizerProps> = ({ stage }) => {
  const [activePin, setActivePin] = useState<number | null>(null);
  const [voltage, setVoltage] = useState<number>(3.3);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isTransmitting] = useState<boolean>(true);

  // Auto generate serial logs to represent active communication
  useEffect(() => {
    const timer = setInterval(() => {
      if (isTransmitting) {
        const timestamp = new Date().toLocaleTimeString();
        const pins = [12, 14, 27, 33];
        const randomPin = pins[Math.floor(Math.random() * pins.length)];
        const packetSize = Math.floor(Math.random() * 64) + 16;
        const msg = `[${timestamp}] DE-REG OUT: ${packetSize} Bytes -> Serial Register Pin IO${randomPin} (V: ${(Math.random() * 0.4 + 2.9).toFixed(2)}V)`;
        setLogMessages(prev => [msg, ...prev.slice(0, 15)]);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [isTransmitting]);

  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto flex flex-col justify-between p-6 bg-dark-charcoal backdrop-blur-md rounded-none border-2 border-phosphor/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)] amber-phosphor-box-glow">
      
      {/* Background glow effects */}
      <div 
        className={`absolute inset-0 blur-[80px] opacity-10 transition-colors duration-1000 pointer-events-none ${
          stage === 'problem' ? 'bg-red-600' : 'bg-phosphor'
        }`} 
      />

      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-phosphor/10 pb-4 mb-4 relative z-10 font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-phosphor animate-pulse" />
          <p className="text-xs font-bold text-slate-350 uppercase tracking-widest">ESP32 Core Registrator</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTransmitting ? 'bg-phosphor' : 'bg-red-400'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isTransmitting ? 'bg-phosphor' : 'bg-red-500'}`} />
          </span>
          <span className="text-[9px] text-phosphor/60 uppercase font-black">
            {isTransmitting ? 'SERIAL_LIVE' : 'SERIAL_IDLE'}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'hook' && (
          <motion.div
            key="sys-hook"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow flex flex-col justify-between"
          >
            {/* Embedded Microcontroller Block Graphic */}
            <div className="bg-dark-obsidian p-4 border border-phosphor/15 relative overflow-hidden flex-grow flex flex-col justify-center gap-4">
              <div className="grid grid-cols-4 gap-2">
                {[12, 14, 27, 33, 4, 15, 16, 17].map((pin) => (
                  <button
                    key={pin}
                    onClick={() => {
                      setActivePin(pin);
                      setVoltage(Math.random() > 0.5 ? 3.3 : 0.0);
                      setLogMessages(prev => [`[${new Date().toLocaleTimeString()}] USER INTERRUPT: Core Pin IO${pin} set to ${(Math.random() > 0.5 ? 3.3 : 0.0)}V`, ...prev]);
                    }}
                    className={`p-2 rounded-none border font-mono text-[10px] font-bold text-center transition-all cursor-pointer ${
                      activePin === pin
                        ? 'bg-phosphor text-dark-obsidian border-phosphor shadow-[0_0_12px_rgba(255,159,0,0.5)]'
                        : 'bg-dark-charcoal border-phosphor/10 text-phosphor/60 hover:bg-phosphor/5'
                    }`}
                  >
                    IO{pin}
                  </button>
                ))}
              </div>

              {/* Central Microcontroller Block Core */}
              <div className="border border-dashed border-phosphor/30 p-4 bg-phosphor/[0.02] flex flex-col items-center">
                <p className="font-bold text-xs text-phosphor uppercase tracking-wider mb-1">Tensilica Dual-Core core</p>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500">
                  <span>Freq: 240MHz</span>
                  <span>SRAM: 520KB</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-phosphor/80 bg-dark-charcoal border border-phosphor/20 py-1 px-3 rounded-none">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Click Pin to generate ISR event</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-none bg-dark-obsidian font-mono text-[10px] text-slate-400 flex justify-between items-center border border-phosphor/10">
              <span>REGISTER_BUS: <b className="text-phosphor">ACTIVE CHANNEL A</b></span>
              <span>FEED VOLTS: <b className="text-phosphor">{voltage.toFixed(1)} V</b></span>
            </div>
          </motion.div>
        )}

        {stage === 'problem' && (
          <motion.div
            key="sys-problem"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow flex flex-col justify-between"
          >
            {/* Debugging challenges visual */}
            <div className="bg-dark-obsidian p-5 border border-red-500/20 flex-grow flex flex-col justify-center gap-4">
              <div className="p-3.5 bg-red-500/5 border border-red-500/30 rounded-none relative overflow-hidden">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <h6 className="text-[11px] font-mono font-black text-red-500 uppercase tracking-widest mb-1">DATA PACKAGE STRIP OVERFLOW</h6>
                <p className="text-[10px] text-slate-405 leading-normal">
                  Standard asynchronous print loops drop up to 45% of hardware pin interrupts, blinding local debuggers to physical capacitor glitches.
                </p>
              </div>

              {/* Chaotic unformatted stream mock */}
              <div className="p-3.5 bg-black rounded-none font-mono text-[8px] text-red-500 opacity-60 h-28 overflow-hidden select-none space-y-1">
                <div>[CRIT_MEM] OVERFLOW RES_REG 0x3FFA92 - HIGH DROPOUT VALUE DETECTED</div>
                <div>[ISR_FAIL] SPI BUFFER DE-SYNC AT INTERRUPT BOUND IO33</div>
                <div>[WARN] VOLT_STABILITY pin IO12 DROPPED BELOW INTERRUPT V_MIN: 1.15V</div>
                <div>[SYS_WARN] LOG DEQUEUE DELAY EXCEEDS 400MS (SYSTEM UNSTABLE)</div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-none bg-red-950/20 border border-red-500/20 font-mono text-[10px] text-red-400 flex justify-between items-center">
              <span>CONTROLLER: <b className="text-red-500 font-bold uppercase animate-pulse">DE-SYNCED</b></span>
              <span>PACKET ERROR: <b className="text-red-500 text-xs font-bold">42.80%</b></span>
            </div>
          </motion.div>
        )}

        {stage === 'solution' && (
          <motion.div
            key="sys-solution"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow flex flex-col justify-between"
          >
            {/* Solutions schematic block diagram */}
            <div className="bg-dark-obsidian p-4 border border-phosphor/20 flex-grow flex flex-col justify-center gap-3">
              <div className="space-y-2">
                {[
                  { level: "A", title: "Web Telemetry Panel", desc: "Phosphor-level rendering matrices and signal plots.", color: "border-phosphor bg-phosphor/5 text-phosphor" },
                  { level: "B", title: "Wi-Fi Socket Pipeline", desc: "Non-blocking high-frequency buffering loops.", color: "border-phosphor bg-phosphor/5 text-phosphor" },
                  { level: "C", title: "Physical ESP32 Board Network", desc: "Low-overhead ISR firmware gates and analog DAC registers.", color: "border-phosphor bg-phosphor/5 text-phosphor" }
                ].map((item) => (
                  <div key={item.level} className={`p-2.5 rounded-none border ${item.color} flex items-start gap-3`}>
                    <div className="w-5 h-5 rounded-none border flex items-center justify-center text-[10px] font-black shrink-0 border-phosphor">
                      {item.level}
                    </div>
                    <div>
                      <h6 className="font-bold text-[11px] uppercase tracking-wide">{item.title}</h6>
                      <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-none bg-phosphor/5 border border-phosphor/20 font-mono text-[10px] text-phosphor flex justify-between items-center">
              <span>CONTROLLER: <b className="text-phosphor font-bold">CALIBRATED</b></span>
              <span>PACKAGE ERROR: <b className="text-phosphor">0.02%</b></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Serial activity monitor bar */}
      <div className="mt-4 border-t border-phosphor/10 pt-3">
        <div className="flex items-center gap-2 mb-1.5 font-mono">
          <Terminal className="w-3.5 h-3.5 text-phosphor" />
          <span className="text-[9px] uppercase font-black text-slate-500">Live UART Diagnostic Line</span>
        </div>
        <div className="bg-dark-obsidian border border-phosphor/10 rounded-none py-1.5 px-3 h-14 overflow-y-auto no-scrollbar font-mono text-[8px] text-slate-400 select-none space-y-1">
          {logMessages.length === 0 ? (
            <div className="text-slate-650">Awaiting UART signal packet broadcasts...</div>
          ) : (
            logMessages.slice(0, 2).map((log, idx) => (
              <div key={idx} className="truncate text-phosphor/75">{log}</div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
