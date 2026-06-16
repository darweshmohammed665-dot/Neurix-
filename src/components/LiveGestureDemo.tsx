import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Cpu, Activity, Terminal, RefreshCw, Settings, Zap } from 'lucide-react';

export const LiveGestureDemo: React.FC = () => {
  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle'>('sine');
  const [frequency, setFrequency] = useState<number>(3.5); // Hz
  const [voltage, setVoltage] = useState<number>(2.8); // V
  const [noiseLevel, setNoiseLevel] = useState<number>(10); // %
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [relayState, setRelayState] = useState<boolean>(false);
  
  // Pin states
  const [pinStates, setPinStates] = useState<{ [key: number]: boolean }>({
    12: false,
    14: true,
    27: false,
    33: false
  });

  const [telemetry, setTelemetry] = useState({
    txBuffer: 12,
    packetLoss: 0.04,
    baudRate: 115200,
    cpuLoads: [12, 14]
  });

  const [serialLogs, setSerialLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Periodically generate serial log entries and telemetry fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const nextTx = Math.max(2, Math.min(64, prev.txBuffer + Math.floor(Math.random() * 8) - 4));
        const nextLoss = Math.max(0.01, Math.min(0.12, prev.packetLoss + (Math.random() * 0.02 - 0.01)));
        const l1 = Math.max(5, Math.min(85, prev.cpuLoads[0] + Math.floor(Math.random() * 10 - 5)));
        const l2 = Math.max(8, Math.min(90, prev.cpuLoads[1] + Math.floor(Math.random() * 12 - 6)));
        return {
          ...prev,
          txBuffer: nextTx,
          packetLoss: nextLoss,
          cpuLoads: [l1, l2]
        };
      });

      // Add a random log message
      const logTypes = ['SYS_OK', 'BUS_TX', 'REG_UPD', 'TELEM_STREAM'];
      const activePins = Object.keys(pinStates).filter(k => pinStates[Number(k)]);
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const msg = `[${new Date().toLocaleTimeString()}] [${type}] ESP32 CORE -> IO_LINES:[${activePins.join(', ')}] REG_FREQ:${frequency.toFixed(1)}Hz REG_AMP:${voltage.toFixed(2)}V`;
      setSerialLogs(prev => [msg, ...prev.slice(0, 20)]);
    }, 1500);

    return () => clearInterval(timer);
  }, [frequency, voltage, pinStates]);

  // Log on pin state toggle
  const togglePin = (pinNum: number) => {
    const nextVal = !pinStates[pinNum];
    setPinStates(prev => ({ ...prev, [pinNum]: nextVal }));
    const timestamp = new Date().toLocaleTimeString();
    setSerialLogs(prev => [
      `[${timestamp}] [ISR] GPIO Pin Toggled: Register pin IO${pinNum} set to ${nextVal ? 'HIGH (3.3V)' : 'LOW (0.0V)'}`,
      ...prev
    ]);
  };

  const handleTriggerCalibration = () => {
    setIsCalibrating(true);
    setSerialLogs(prev => [
      `[${new Date().toLocaleTimeString()}] [DIAG] Initiating hardware diagnostic, checking capacitor buffers...`,
      ...prev
    ]);

    setTimeout(() => {
      setIsCalibrating(false);
      setSerialLogs(prev => [
        `[${new Date().toLocaleTimeString()}] [DIAG] Normal status resumed. Hardware DAC recalibrated successfully.`,
        ...prev
      ]);
    }, 1500);
  };

  // Draw simulated hardware feedback on canvas (Oscilloscope)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw phosphorus grid lines
      ctx.strokeStyle = 'rgba(255, 159, 0, 0.04)';
      ctx.lineWidth = 1;
      
      // X lines
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Y lines
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw center baseline calibration line
      ctx.strokeStyle = 'rgba(255, 159, 0, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Begin Amber Signal Plot
      ctx.strokeStyle = '#ff9f00'; // Pure bright phosphorus amber
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 159, 0, 0.6)';
      ctx.beginPath();

      const amplitude = (voltage / 3.3) * (centerY - 15);

      for (let x = 0; x < width; x++) {
        const timeFactor = (x / width) * frequency * Math.PI * 2;
        let y = 0;

        // Wave type logic
        if (waveType === 'sine') {
          y = Math.sin(timeFactor + offset);
        } else if (waveType === 'square') {
          y = Math.sin(timeFactor + offset) >= 0 ? 0.9 : -0.9;
        } else if (waveType === 'triangle') {
          y = (Math.abs(((timeFactor + offset) % (Math.PI * 2)) - Math.PI) / Math.PI) * 2 - 1;
        }

        // Add microchip thermal noise
        if (noiseLevel > 0) {
          const noise = (Math.random() * 2 - 1) * (noiseLevel / 100) * 14;
          y = y * amplitude + centerY + noise;
        } else {
          y = y * amplitude + centerY;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Reset shadows
      ctx.shadowBlur = 0;

      // Draw probe parameters
      ctx.fillStyle = 'rgba(255, 159, 0, 0.7)';
      ctx.font = '10px "Share Tech Mono"';
      ctx.fillText(`CH1 VOLTS/DIV: 500mV   VPP: ${(voltage * 2).toFixed(2)}v`, 15, centerY * 2 - 10);
      ctx.fillText(`SWEEP TIME/DIV: 10ms  FREQ: ${frequency.toFixed(1)}Hz`, width - 180, centerY * 2 - 10);

      offset += (frequency * 0.05);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [waveType, frequency, voltage, noiseLevel]);

  return (
    <div id="live-demo-interactive" className="p-0.5 rounded-[1.5rem] bg-gradient-to-br from-phosphor/30 via-transparent to-phosphor/20 border border-phosphor/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      <div className="bg-dark-charcoal rounded-[calc(1.5rem-2px)] p-6 md:p-10 text-slate-300 relative overflow-hidden">
        
        {/* Subtle warning stripe overlay at corners */}
        <div className="absolute top-0 right-0 w-32 h-1 bg-[repeating-linear-gradient(45deg,#ff9f00,#ff9f00_8px,#0e0f15_8px,#0e0f15_16px)]" />
        <div className="absolute bottom-0 left-0 w-32 h-1 bg-[repeating-linear-gradient(45deg,#ff9f00,#ff9f00_8px,#0e0f15_8px,#0e0f15_16px)]" />

        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-phosphor/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-phosphor" />
              </span>
              <p className="text-phosphor font-mono text-xs font-black uppercase tracking-[0.2em] amber-phosphor-glow">COSMIC TELEMETRY STREAM // ACTIVE CONSOLE</p>
            </div>
            <h4 className="text-3xl font-display font-black uppercase tracking-tight text-white">
              Signal & <span className="text-phosphor amber-phosphor-glow">Register Bus Cockpit</span>
            </h4>
            <p className="text-slate-400 text-sm font-sans mt-2 max-w-xl">
              Calibrate virtual DAC output wave patterns, simulate electrical thermal noise registers, and command low-level ESP32 core pins below.
            </p>
          </div>

          <button 
            onClick={handleTriggerCalibration}
            disabled={isCalibrating}
            className="px-6 py-3.5 bg-phosphor hover:bg-white hover:text-dark-obsidian text-dark-obsidian font-sans font-black uppercase tracking-widest text-xs rounded-none flex items-center gap-2.5 transition-all shadow-[0_5px_15px_rgba(255,159,0,0.25)] hover:shadow-[0_10px_30px_rgba(255,159,0,0.4)] cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isCalibrating ? 'animate-spin' : ''}`} />
            <span>{isCalibrating ? 'DE-SERIALLY ALIGNING...' : 'RECALIBRATE DAC CORE'}</span>
          </button>
        </div>

        {/* Dashboard Control Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Wave Modulators */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div>
              <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Waveform Synthesis
              </p>
              
              {/* Wave selectors */}
              <div className="grid grid-cols-3 gap-1 bg-dark-obsidian p-1 rounded-none border border-phosphor/20 mb-4">
                {(['sine', 'square', 'triangle'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`py-2 text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      waveType === type
                        ? 'bg-phosphor text-dark-obsidian shadow-md font-bold'
                        : 'text-phosphor/60 hover:text-white hover:bg-phosphor/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Slider Blocks with tactile details */}
              <div className="space-y-4 bg-dark-obsidian p-5 rounded-none border border-phosphor/15">
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-350 font-mono mb-2">
                    <span>Frequency Calibrator</span>
                    <span className="text-phosphor font-bold">{frequency.toFixed(1)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-phosphor/40 mt-1">
                    <span>0.5 Hz</span>
                    <span>10.0 Hz</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-355 font-mono mb-2">
                    <span>Voltage Amplitude</span>
                    <span className="text-phosphor font-bold">{voltage.toFixed(2)} V</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.3"
                    step="0.1"
                    value={voltage}
                    onChange={(e) => setVoltage(parseFloat(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-phosphor/40 mt-1">
                    <span>0.5 V</span>
                    <span>3.3 VCC</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-350 font-mono mb-2">
                    <span>Microchip Noise Flutter</span>
                    <span className="text-phosphor font-bold">{noiseLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                    className="w-full accent-phosphor cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-phosphor/40 mt-1">
                    <span>0% (CLEAN)</span>
                    <span>30% (NOISE)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware specifications */}
            <div className="p-4 bg-phosphor/[0.02] border border-phosphor/20 font-mono text-[10px] text-slate-300 space-y-2">
              <p className="font-bold text-phosphor text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Core Diagnostic Specs
              </p>
              <div className="flex justify-between"><span>Active Bus Type:</span><span className="text-white font-bold">12-Bit DAC Registers</span></div>
              <div className="flex justify-between"><span>GPIO Response:</span><span className="text-white">Active ISR Interrupt</span></div>
              <div className="flex justify-between"><span>Sample Overlap:</span><span className="text-white">COSMIC-V4 Multiport</span></div>
            </div>
          </div>

          {/* Column 2: The Oscilloscope Visualization Display */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Simulated Virtual Oscilloscope Channel A
            </p>

            <div className="w-full aspect-video rounded-none bg-dark-obsidian border border-phosphor/30 relative overflow-hidden flex flex-col items-center justify-center p-1.5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <canvas 
                ref={canvasRef} 
                width={420} 
                height={210} 
                className="w-full h-full bg-dark-obsidian cursor-crosshair"
              />

              <div className="absolute top-3 left-3 bg-dark-charcoal/90 border border-phosphor/30 px-2 py-0.5 font-mono text-[8px] text-phosphor uppercase tracking-widest">
                A: ANALOG WAVEFORM SIGNAL
              </div>
              
              {isCalibrating && (
                <div className="absolute inset-0 bg-dark-obsidian/95 flex flex-col items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-phosphor animate-spin mb-4" />
                  <span className="font-mono text-xs text-phosphor uppercase tracking-widest animate-pulse">REPROGRAMMING MEMORY FLASHER...</span>
                </div>
              )}
            </div>

            {/* Quick serial metrics readout */}
            <div className="grid grid-cols-2 gap-4 mt-4 font-mono">
              <div className="p-3 bg-dark-obsidian border border-phosphor/10 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-black">Wi-Fi Stream</span>
                <span className="text-phosphor font-bold text-xs">{(100 - telemetry.packetLoss * 100).toFixed(2)}% OK</span>
              </div>
              <div className="p-3 bg-dark-obsidian border border-phosphor/10 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-black">Baud Rate Config</span>
                <span className="text-phosphor font-bold text-xs">{telemetry.baudRate} kbps</span>
              </div>
            </div>
          </div>

          {/* Column 3: GPIO Gates */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                ESP32 GPIO Interrupt Keys
              </p>
              
              {/* IO Pin Toggles */}
              <div className="space-y-2">
                {[12, 14, 27, 33].map((pin) => (
                  <button
                    key={pin}
                    onClick={() => togglePINState(pin)}
                    className={`w-full flex items-center justify-between p-3 rounded-none border transition-all text-left cursor-pointer ${
                      pinStates[pin]
                        ? 'bg-phosphor/10 border-phosphor/80 text-phosphor shadow-[inset_0_0_15px_rgba(255,159,0,0.15)] font-bold'
                        : 'bg-dark-obsidian border-phosphor/10 text-phosphor/50 hover:bg-phosphor/5 hover:border-phosphor/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className={`w-3.5 h-3.5 ${pinStates[pin] ? 'text-phosphor fill-phosphor' : 'text-phosphor/30'}`} />
                      <span className="font-mono text-xs">GPIO Register IO{pin}</span>
                    </div>
                    <span className="font-mono text-[10px] font-black uppercase">
                      {pinStates[pin] ? 'HIGH' : 'LOW'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle relay control */}
            <div className="p-4 bg-dark-obsidian border border-phosphor/15 rounded-none flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-phosphor uppercase tracking-wider">Solenoid Relay EN</span>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5">Control dynamic feedback coil</span>
              </div>
              <button
                onClick={() => {
                  const nextState = !relayState;
                  setRelayState(nextState);
                  setSerialLogs(prev => [
                    `[${new Date().toLocaleTimeString()}] [RELAY] Trigger Solenoid Coil Gate: ${nextState ? 'COIL ENERGISED (ACTIVE)' : 'HOLD CLOSED'}`,
                    ...prev
                  ]);
                }}
                className={`py-1.5 px-4 rounded-none font-mono text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  relayState
                    ? 'bg-phosphor border-phosphor text-dark-obsidian font-black shadow-[0_0_12px_rgba(255,159,0,0.5)]'
                    : 'bg-dark-charcoal border-phosphor/20 text-phosphor/60 hover:bg-phosphor/10'
                }`}
              >
                {relayState ? 'CLOSE' : 'OPEN'}
              </button>
            </div>

          </div>

        </div>

        {/* Diagnostic Logs at bottom */}
        <div className="mt-8 border-t border-phosphor/10 pt-6">
          <p className="text-xs font-black text-phosphor tracking-wider uppercase mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            UART Core Telemetry Stream
          </p>
          <div className="bg-dark-obsidian border border-phosphor/20 rounded-none p-4 h-36 font-mono text-[9px] text-phosphor/80 overflow-y-auto no-scrollbar space-y-1.5 border-dashed">
            {serialLogs.length === 0 ? (
              <div className="text-phosphor/30">Connecting to UART serial bus on /dev/ttyUSB0...</div>
            ) : (
              serialLogs.map((log, index) => (
                <div key={index} className="flex gap-2 hover:bg-phosphor/5 px-2 py-0.5 rounded transition-colors">
                  <span className="text-phosphor select-none font-bold">&gt;&gt;</span>
                  <span className="flex-grow select-all font-mono leading-relaxed">{log}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );

  function togglePINState(pin: number) {
    togglePin(pin);
  }
};
