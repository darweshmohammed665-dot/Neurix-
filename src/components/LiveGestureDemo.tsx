import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Activity, Terminal, Radio, Play, Pause, RefreshCw, Zap, ShieldAlert } from 'lucide-react';

export const LiveGestureDemo: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeGesture, setActiveGesture] = useState<string>('SWIPE_RIGHT');
  const [confidence, setConfidence] = useState<number>(98.4);
  const [fps, setFps] = useState<number>(60);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [uartLog, setUartLog] = useState<string[]>([
    '[UART] RX: $NEURIX_FRAME_001_PKT_OK (len=64)',
    '[OPENCV] 21 Hand Landmarks Detected in 16.2ms',
    '[GESTURE] Recognized: SWIPE_RIGHT (conf=98.4%)',
    '[DSP] Audio feedback loop triggered @ 432Hz',
  ]);

  const oscCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const gestures = [
    { id: 'SWIPE_RIGHT', name: 'Swipe Right', desc: 'Trigger sequential viewport transition', keypoints: '21 pts' },
    { id: 'PINCH_ZOOM', name: 'Pinch & Zoom', desc: 'Scale spatial vector coordinate matrix', keypoints: 'Thumb + Index' },
    { id: 'PALM_ROTATE', name: 'Palm Rotate', desc: 'Rotate active 3D spatial orientation axis', keypoints: '5 Finger Plane' },
    { id: 'POINT_SELECT', name: 'Point & Select', desc: 'Precise hardware GPIO activation trigger', keypoints: 'Index Tip Vector' },
  ];

  // UART telemetry simulation interval
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const g = gestures[Math.floor(Math.random() * gestures.length)];
      const conf = (94 + Math.random() * 5.8).toFixed(1);
      setActiveGesture(g.id);
      setConfidence(parseFloat(conf));
      setFps(Math.round(59 + Math.random() * 2));

      const newLog = `[UART] ${new Date().toISOString().slice(14, 23)} CMD:${g.id} CONF:${conf}% [OK]`;
      setUartLog((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Oscilloscope canvas loop
  useEffect(() => {
    const canvas = oscCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 180);

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 159, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Signal Trace
      ctx.beginPath();
      ctx.strokeStyle = '#ff9f00';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ff9f00';
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x += 2) {
        const y =
          height / 2 +
          Math.sin(x * 0.05 + t) * 30 +
          Math.sin(x * 0.02 - t * 0.5) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={containerRef}
      id="live-demo-section"
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#ff9f00]/15 bg-[#081838] font-mono relative overflow-hidden"
    >
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
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Bench Diagnostics</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              Live Optical <span className="text-[#ff9f00] amber-phosphor-glow">& Gesture Engine</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-4 py-2 border text-xs uppercase font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isStreaming
                  ? 'bg-[#ff9f00] text-[#081838] border-[#ff9f00] shadow-[0_0_15px_rgba(255,159,0,0.3)]'
                  : 'bg-[#0f2552] text-slate-300 border-[#ff9f00]/30'
              }`}
            >
              {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isStreaming ? 'PAUSE TELEMETRY' : 'RESUME TELEMETRY'}
            </button>
          </div>
        </motion.div>

        {/* Diagnostics Sandbox Layout with Scroll-Driven Staggered Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Gesture State Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-3"
          >
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
              // Optical Tracking Pipeline
            </p>
            {gestures.map((g, idx) => {
              const isActive = activeGesture === g.id;
              return (
                <motion.div
                  key={g.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setActiveGesture(g.id);
                    setConfidence(98.9);
                  }}
                  className={`p-4 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0f2552] border-[#ff9f00] shadow-[0_0_20px_rgba(255,159,0,0.25)] translate-x-1'
                      : 'bg-[#0f2552]/40 border-[#ff9f00]/15 hover:border-[#ff9f00]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm font-bold ${isActive ? 'text-[#ff9f00]' : 'text-white'}`}>
                      {g.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#081838] border border-[#ff9f00]/20 text-slate-300">
                      {g.keypoints}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">{g.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center / Right: Oscilloscope & Terminal Feeds */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Oscilloscope Panel */}
            <div className="p-6 bg-[#0f2552]/70 border border-[#ff9f00]/30 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ff9f00]/15">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ff9f00]" />
                  Simulated Virtual Oscilloscope Channel A
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-emerald-400">FPS: {fps}</span>
                  <span className="text-[#ff9f00]">CONF: {confidence}%</span>
                </div>
              </div>

              <div className="h-44 bg-[#081838] border border-[#ff9f00]/20 overflow-hidden relative">
                <canvas ref={oscCanvasRef} className="w-full h-full" />
              </div>
            </div>

            {/* UART Terminal Stream */}
            <div className="p-6 bg-[#081838] border border-[#ff9f00]/30 shadow-lg">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ff9f00]/15 text-xs">
                <span className="font-bold text-white uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#ff9f00]" />
                  UART Core Telemetry Stream
                </span>
                <span className="text-slate-400 font-mono">BAUD: 115200 (8-N-1)</span>
              </div>

              <div className="space-y-1.5 h-36 overflow-y-auto font-mono text-xs text-slate-300 bg-[#0f2552]/40 p-3 border border-[#ff9f00]/10">
                {uartLog.map((log, i) => (
                  <p key={i} className={i === 0 ? 'text-[#ff9f00] font-bold' : 'text-slate-400'}>
                    {log}
                  </p>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LiveGestureDemo;
