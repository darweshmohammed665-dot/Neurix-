import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Terminal, Play, Pause, Zap, Target, Binary, ChevronRight } from 'lucide-react';

export const LiveGestureDemo: React.FC = () => {
  const [activeGesture, setActiveGesture] = useState<string>('SWIPE_RIGHT');
  const [confidence, setConfidence] = useState<number>(98.4);
  const [fps, setFps] = useState<number>(60);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [uartLog, setUartLog] = useState<string[]>([
    'INIT_SEQUENCE_SUCCESSFUL',
    'HAND_DETECTION_STABLE',
    'NEURAL_LAYER_LINKED',
    'IO_SYNC_READY'
  ]);

  const oscCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const gestures = [
    { id: 'SWIPE_RIGHT', name: 'Swipe Right', desc: 'Viewport navigation protocol', tag: 'NAV' },
    { id: 'PINCH_ZOOM', name: 'Pinch & Zoom', desc: 'Spatial coordinate scaling', tag: 'SCALE' },
    { id: 'PALM_ROTATE', name: 'Palm Rotate', desc: '3D orientation adjustment', tag: 'AXIS' },
    { id: 'POINT_SELECT', name: 'Point & Select', desc: 'Hardware GPIO activation', tag: 'GPIO' },
  ];

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const g = gestures[Math.floor(Math.random() * gestures.length)];
      const conf = (96 + Math.random() * 3.5).toFixed(1);
      setActiveGesture(g.id);
      setConfidence(parseFloat(conf));
      setFps(Math.round(58 + Math.random() * 4));

      const newLog = `${new Date().toLocaleTimeString()} :: CMD_${g.id} :: CONF_${conf}%`;
      setUartLog((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  useEffect(() => {
    const canvas = oscCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 240);

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Trace
      ctx.beginPath();
      ctx.strokeStyle = '#00D9FF';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00D9FF';
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x += 2) {
        const y = height / 2 + Math.sin(x * 0.03 + t) * 40 + Math.cos(x * 0.01 - t * 0.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.05;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="live-demo-section" className="py-32 px-6 lg:px-12 relative overflow-hidden bg-[#050B14]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-neurix-cyan/5 border border-neurix-cyan/20 rounded-full mb-8"
            >
              <Binary className="w-3 h-3 text-neurix-cyan" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neurix-cyan">Diagnostic Feed</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-[#F2FAFF] tracking-tight leading-[0.9]"
            >
              REAL-TIME <br /> <span className="text-neurix-cyan italic">SYNTHESIS</span>
            </motion.h2>
          </div>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="px-8 py-3 bg-neurix-cyan/5 border border-neurix-cyan/20 hover:border-neurix-cyan text-neurix-cyan font-bold text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-3"
          >
            {isStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isStreaming ? 'SUSPEND FEED' : 'ACTIVATE FEED'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Gesture Selector */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-[#8199AA] uppercase tracking-[0.3em] block mb-4">Select Protocol</span>
            {gestures.map((g, idx) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveGesture(g.id)}
                className={`spatial-card p-6 cursor-pointer group flex items-center justify-between ${
                  activeGesture === g.id ? 'border-neurix-cyan/50 bg-neurix-cyan/5' : ''
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold mb-1 group-hover:text-neurix-cyan transition-colors">{g.name}</h4>
                  <p className="text-[10px] text-[#8199AA] font-light uppercase tracking-wider">{g.desc}</p>
                </div>
                <div className={`text-[9px] font-mono p-1 border ${
                  activeGesture === g.id ? 'border-neurix-cyan text-neurix-cyan' : 'border-white/10 text-white/30'
                }`}>
                  {g.tag}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Visualizer */}
          <div className="lg:col-span-8 space-y-8">
            <div className="spatial-card p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-neurix-cyan" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F2FAFF]">Spectral Analysis</span>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-mono">
                  <span className="text-neurix-cyan">FREQ: 120HZ</span>
                  <span className="text-neurix-cyan">SYNC: 99.8%</span>
                </div>
              </div>

              <div className="h-60 bg-black/20 border border-white/5 relative overflow-hidden rounded-sm">
                <canvas ref={oscCanvasRef} className="w-full h-full" />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-neurix-cyan/20 text-[10px] font-mono text-neurix-cyan">
                    {confidence}% CONF
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/5 text-[10px] font-mono text-[#8199AA]">
                    {fps} FPS
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Logs */}
            <div className="spatial-card p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <Terminal className="w-4 h-4 text-neurix-cyan" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F2FAFF]">System Telemetry</span>
              </div>
              <div className="space-y-2">
                {uartLog.map((log, i) => (
                  <div key={i} className="flex items-center gap-4 text-[10px] font-mono">
                    <span className="text-white/20">[{i}]</span>
                    <span className={i === 0 ? 'text-neurix-cyan' : 'text-[#8199AA]'}>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveGestureDemo;
