import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hand, Sliders, Play, CheckCircle2, ShieldCheck, Cpu, RefreshCw, Sparkles, Orbit, Gauge, Zap } from 'lucide-react';

export const LiveGestureDemo: React.FC = () => {
  const [activeGesture, setActiveGesture] = useState<'hover' | 'drift' | 'scale' | 'rotate' | 'calibrate'>('drift');
  const [trackerStatus, setTrackerStatus] = useState<'calibrated' | 'scanning' | 'idle'>('calibrated');
  const [modelSides, setModelSides] = useState<number>(6); // Geometric sides
  const [modelScale, setModelScale] = useState<number>(1);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2);
  const [confidence, setConfidence] = useState<number>(99.1);
  const [latency, setLatency] = useState<number>(8.4);

  // Drift simulation states ("تفحيط" physics metrics)
  const [driftAngle, setDriftAngle] = useState<number>(34); // in degrees
  const [slipRatio, setSlipRatio] = useState<number>(0.84); // fraction of tires sliding
  const [boostGauge, setBoostGauge] = useState<number>(65); // speed/oversteer intensity

  // Simulated coordinate trackers that update when moving the cursor inside the "Virtual Sensor Field"
  const [coordinates, setCoordinates] = useState({ x: 180, y: 140, z: 60 });
  const sensorFieldRef = useRef<HTMLDivElement>(null);

  // Periodically generate slight noise in coordinates when hand is "active" to simulate real optical sensor feeds
  useEffect(() => {
    const timer = setInterval(() => {
      setCoordinates(prev => {
        const dx = (Math.random() * 12 - 6);
        const dy = (Math.random() * 8 - 4);
        const dz = (Math.random() * 6 - 3);
        return {
          x: Math.max(40, Math.min(320, prev.x + dx)),
          y: Math.max(50, Math.min(230, prev.y + dy)),
          z: Math.max(20, Math.min(120, prev.z + dz))
        };
      });
      // Fluctuations in optical processing metrics
      setConfidence(prev => Math.max(98.2, Math.min(99.9, prev + (Math.random() * 0.2 - 0.1))));
      setLatency(prev => Math.max(7.2, Math.min(11.8, prev + (Math.random() * 0.8 - 0.4))));
      
      // If we are in drift mode, simulate oversteer fluctuations
      setDriftAngle(prev => {
        const target = activeGesture === 'drift' ? 45 : 0;
        return Math.max(0, Math.min(90, prev + (target - prev) * 0.1 + (Math.random() * 8 - 4)));
      });
      setSlipRatio(prev => {
        const target = activeGesture === 'drift' ? 0.88 : 0.05;
        return Math.max(0.01, Math.min(1.0, prev + (target - prev) * 0.08 + (Math.random() * 0.04 - 0.02)));
      });
      setBoostGauge(prev => {
        const noise = Math.random() * 6 - 3;
        return Math.max(10, Math.min(100, prev + noise));
      });
    }, 120);

    return () => clearInterval(timer);
  }, [activeGesture]);

  const handleSensorMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sensorFieldRef.current) return;
    const rect = sensorFieldRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    // Z is simulated by how close the cursor is tracking towards the center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const z = Math.round(180 - dist / 2);

    setCoordinates({ x, y, z });

    // Interactive response: if drift mode is on, adjust parameters dynamically with mouse X
    if (activeGesture === 'drift') {
      const angleVal = Math.max(10, Math.min(85, (x / rect.width) * 90));
      setDriftAngle(Math.round(angleVal));
      setSlipRatio(Math.min(0.99, Math.max(0.2, (y / rect.height))));
    }
    // If scale mode is on, scale based on Z
    if (activeGesture === 'scale') {
      const scaleVal = Math.max(0.4, Math.min(1.7, (z / 90)));
      setModelScale(scaleVal);
    }
  };

  const triggerCalibration = () => {
    setTrackerStatus('scanning');
    const timer = setTimeout(() => {
      setTrackerStatus('calibrated');
    }, 1800);
  };

  return (
    <div id="live-demo-interactive" className="p-1.5 rounded-[3rem] bg-gradient-to-br from-yellow-500/20 via-blue-950/45 to-yellow-600/30 border border-yellow-400/30 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="bg-slate-950/95 rounded-[calc(3rem-4px)] p-6 md:p-10 text-slate-100">
        
        {/* Module Header with dual Arab-English layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-400 font-mono text-xs font-black uppercase tracking-widest">REAL-TIME AIR INTERFACE — ACTIVE SENSORS</p>
            </div>
            <h4 className="text-3xl font-black italic uppercase tracking-tight text-white animate-pulse">
              Intelligent Air-Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow">Interactive Workspace</span>
            </h4>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Move your mouse inside the sensing zone below to simulate real-time, touchless in-the-air handheld control, drift mechanics, and standing skeleton tracking.
            </p>
          </div>

          <button 
            onClick={triggerCalibration}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2.5 transition-all shadow-[0_10px_25px_rgba(234,179,8,0.2)]"
          >
            <RefreshCw className={`w-4 h-4 ${trackerStatus === 'scanning' ? 'animate-spin' : ''}`} />
            <span>{trackerStatus === 'scanning' ? 'CALIBRATING...' : 'CALIBRATE SPACE'}</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Virtual Sensor Field with Standing Operator wireframe */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-xs font-black text-slate-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-yellow-400" />
              Skeletal Hand Tracking & Human operator
            </p>
            
            <div 
              ref={sensorFieldRef}
              onMouseMove={handleSensorMouseMove}
              className="relative w-full aspect-[4/3] rounded-3xl border-2 border-dashed border-white/10 hover:border-yellow-400/40 bg-slate-900 overflow-hidden cursor-crosshair group transition-all"
            >
              {/* Radar Sweeping Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:16px_16px]" />
              
              <motion.div 
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10 pointer-events-none"
              />

              {/* Dynamic Standing Human Operator Rig SVG ("واحد واقف يحركها من على الهوا") */}
              <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full text-slate-700">
                  {/* Calibrated Ground line */}
                  <line x1="50" y1="280" x2="350" y2="280" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  
                  {/* Standing Operator Wireframe Profile */}
                  <g className="transition-all duration-300">
                    {/* Head */}
                    <circle cx="200" cy="80" r="14" fill="none" stroke="#64748b" strokeWidth="2" />
                    <circle cx="200" cy="80" r="4" fill="#38bdf8 animate-pulse" />
                    
                    {/* Spine / Torso */}
                    <line x1="200" y1="94" x2="200" y2="180" stroke="#64748b" strokeWidth="2" />
                    
                    {/* Shoulders */}
                    <line x1="165" y1="110" x2="235" y2="110" stroke="#64748b" strokeWidth="2.5" />
                    
                    {/* Left standing leg */}
                    <line x1="200" y1="180" x2="185" y2="280" stroke="#475569" strokeWidth="2" />
                    {/* Right standing leg */}
                    <line x1="200" y1="180" x2="215" y2="280" stroke="#475569" strokeWidth="2" />

                    {/* Left Arm tracking towards coordinates mouse */}
                    <line x1="165" y1="110" x2="140" y2="150" stroke="#facc15" strokeWidth="1.5" />
                    <line x1="140" y1="150" x2={coordinates.x} y2={coordinates.y} stroke="#facc15" strokeWidth="2" strokeDasharray="2,2" />
                    
                    {/* Right Arm waving free in space */}
                    <line x1="235" y1="110" x2="260" y2="140" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="260" y1="140" x2="290" y2="115" stroke="#38bdf8" strokeWidth="2" />

                    {/* Joint marker points */}
                    <circle cx="165" cy="110" r="4" fill="#64748b" />
                    <circle cx="235" cy="110" r="4" fill="#64748b" />
                    <circle cx="140" cy="150" r="3.5" fill="#facc15" />
                    <circle cx="260" cy="140" r="3.5" fill="#38bdf8" />
                    
                    {/* Virtual hand beam projection rays */}
                    <line x1={coordinates.x} y1={coordinates.y} x2="330" y2="150" stroke="rgba(250,204,21,0.25)" strokeWidth="1" strokeDasharray="2,5" />
                  </g>
                  
                  {/* Calibrated text indicator */}
                  <text x="50" y="270" fill="gray" className="font-mono text-[9px] uppercase font-bold">Rig: Standing Operator [1.8m]</text>
                  <text x="210" y="70" fill="#38bdf8" className="font-mono text-[8px] uppercase tracking-wider">Face/Iris Tracked</text>
                </svg>
              </div>

              {/* Hand/Pinch tracking node representation */}
              <motion.div 
                animate={{ 
                  scale: activeGesture === 'scale' ? [1, 1.25, 1] : 1,
                  boxShadow: activeGesture === 'drift' ? "0 0 25px rgba(234,179,8,0.8)" : "0 0 15px rgba(56,189,248,0.6)"
                }}
                style={{ 
                  left: coordinates.x, 
                  top: coordinates.y,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute w-8 h-8 rounded-full bg-blue-500/20 border-2 border-sky-400 backdrop-blur flex items-center justify-center transition-all duration-75 pointer-events-none z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                
                {/* Finger tracking points representation */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-sky-300 rounded-full"
                    style={{
                      transform: `rotate(${i * 72}deg) translateY(-24px)`
                    }}
                  />
                ))}
              </motion.div>

              {/* Grid calibration crosshair absolute overlays */}
              <div className="absolute top-4 left-4 font-mono text-[8.5px] text-slate-500 uppercase">
                CALIBRATED OPERATOR: STANDING<br />
                OPTICAL RIG: OK (AIR MODE)
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-yellow-300 bg-slate-900/80 border border-white/5 px-2 py-1 rounded">
                SIMULATING: {activeGesture.toUpperCase()}
              </div>

              {/* Calibration Scanning Layer */}
              <AnimatePresence>
                {trackerStatus === 'scanning' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-blue-950/90 backdrop-blur-sm flex flex-col items-center justify-center z-30"
                  >
                    <RefreshCw className="w-12 h-12 text-yellow-400 animate-spin mb-4" />
                    <p className="font-mono text-sm tracking-widest text-slate-200">SCANNING STANDING FIELD OF VIEW...</p>
                    <p className="text-xs text-slate-400 mt-2">Adjusting lighting & depth thresholds</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Coordinates Stream */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-white/5 font-mono text-[11px] border border-white/5">
              <div>
                <span className="text-slate-500 font-bold">X-Axis:</span> <span className="text-sky-400 font-bold">{Math.round(coordinates.x)}px</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Y-Axis:</span> <span className="text-sky-400 font-bold">{Math.round(coordinates.y)}px</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Z-Depth:</span> <span className="text-yellow-400 font-bold">{Math.round(coordinates.z)}mm</span>
              </div>
            </div>
          </div>

          {/* Center Column: The Virtual 3D Output featuring Drifting Sports Car Model ("تفحيط") */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-xs font-black text-slate-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <Orbit className="w-4 h-4 text-sky-400" />
              Skeletal Rig & Physics-based Drifting Simulation
            </p>

            <div className="w-full aspect-square md:aspect-video rounded-3xl bg-slate-900 border border-white/15 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:14px_14px] pointer-events-none" />
              
              {/* Drift Skid Sparks / Shockwave rings decoration */}
              <AnimatePresence>
                {activeGesture === 'drift' && (
                  <>
                    {/* Left slip sparks line */}
                    <div className="absolute bottom-6 left-12 right-12 h-0.5 bg-gradient-to-r from-yellow-500/0 via-yellow-400/50 to-yellow-500/0 animate-pulse pointer-events-none" />
                    {/* Drifting tyre smoke trails effect */}
                    <motion.div 
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0], x: [-15, 15] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute bottom-10 left-16 w-8 h-8 rounded-full bg-slate-400/10 blur-md pointer-events-none"
                    />
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.5, 0], x: [10, -10] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                      className="absolute bottom-8 right-16 w-10 h-10 rounded-full bg-slate-400/10 blur-xl pointer-events-none"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Responsive 3D Canvas Container */}
              <motion.div 
                animate={{ 
                  rotateY: activeGesture === 'rotate' ? 360 : [0, 360],
                  // When Drifting is active, we apply heavy sideways tilt/yaw oversteer ("تفحيط")
                  rotateX: activeGesture === 'drift' ? [12, -12, 12] : 18,
                  rotateZ: activeGesture === 'drift' ? [-driftAngle / 2.2, driftAngle / 2.2, -driftAngle / 2.2] : 0,
                  x: activeGesture === 'drift' ? [-25, 25, -25] : 0,
                  scale: modelScale
                }}
                transition={{ 
                  rotateY: { duration: activeGesture === 'rotate' ? rotationSpeed * 3 : 20, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: activeGesture === 'drift' ? 2 : 5, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: activeGesture === 'drift' ? 2.5 : 8, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: activeGesture === 'drift' ? 2.5 : 0, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
                className="w-56 h-48 relative flex items-center justify-center pointer-events-none select-none"
              >
                {/* 3D Wireframe Vector Car Drift Silhouette */}
                {activeGesture === 'drift' ? (
                  <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(250,204,21,0.55)]">
                    <defs>
                      <linearGradient id="racerGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>

                    {/* Drifting Skid Trailing lines */}
                    <path d="M 10,75 Q 30,50 50,30" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                    <path d="M 110,75 Q 90,55 70,30" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

                    {/* Streamlined futuristic speed chassis wireframe */}
                    {/* Cabin cowl */}
                    <polygon points="45,40 75,40 90,52 30,52" fill="none" stroke="url(#racerGrad)" strokeWidth="2.5" />
                    {/* Front nose */}
                    <polygon points="30,52 90,52 110,65 10,65" fill="none" stroke="#facc15" strokeWidth="2" />
                    {/* Spoiler wing */}
                    <polygon points="12,32 108,32 100,24 20,24" fill="none" stroke="#60a5fa" strokeWidth="2" />
                    <line x1="25" y1="32" x2="25" y2="52" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="95" y1="32" x2="95" y2="52" stroke="#60a5fa" strokeWidth="1.5" />

                    {/* Wheels showing angled drift coordinates */}
                    {/* Left front wheel */}
                    <g transform={`rotate(${driftAngle - 30} 30 65)`}>
                      <rect x="24" y="58" width="12" height="14" rx="3" fill="none" stroke="#ef4444" strokeWidth="2" />
                      <line x1="30" y1="58" x2="30" y2="72" stroke="#facc15" strokeWidth="1" />
                    </g>
                    {/* Right front wheel */}
                    <g transform={`rotate(${driftAngle - 30} 90 65)`}>
                      <rect x="84" y="58" width="12" height="14" rx="3" fill="none" stroke="#ef4444" strokeWidth="2" />
                      <line x1="90" y1="58" x2="90" y2="72" stroke="#facc15" strokeWidth="1" />
                    </g>
                    {/* Rear Wheels */}
                    <rect x="15" y="65" width="14" height="15" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <rect x="91" y="65" width="14" height="15" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2" />

                    {/* Laser guidance connection points from Operator space */}
                    <circle cx="60" cy="46" r="3" fill="#facc15 animate-pulse" />
                  </svg>
                ) : (
                  /* Standard 3D Polygons utilizing points on circle */
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_35px_rgba(250,204,21,0.4)]">
                    <defs>
                      <linearGradient id="demoGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#ca8a04" />
                      </linearGradient>
                    </defs>
                    
                    {/* Base geometric shape wireframe */}
                    <polygon
                      points={Array.from({ length: modelSides }).map((_, i) => {
                        const angle = (i * 2 * Math.PI) / modelSides;
                        const x = 50 + 35 * Math.cos(angle);
                        const y = 50 + 35 * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="url(#demoGrad)"
                      strokeWidth="3"
                      className="transition-all duration-300"
                    />

                    {/* Connect lines to center simulating 3D vertices expansion */}
                    {Array.from({ length: modelSides }).map((_, i) => {
                      const angle = (i * 2 * Math.PI) / modelSides;
                      const x = 50 + 35 * Math.cos(angle);
                      const y = 50 + 35 * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1="50"
                          y1="50"
                          x2={x}
                          y2={y}
                          stroke="#facc15"
                          strokeWidth="1.5"
                          strokeDasharray="2,2"
                          className="transition-all duration-300"
                        />
                      );
                    })}

                    {/* Vertices points */}
                    {Array.from({ length: modelSides }).map((_, i) => {
                      const angle = (i * 2 * Math.PI) / modelSides;
                      const x = 50 + 35 * Math.cos(angle);
                      const y = 50 + 35 * Math.sin(angle);
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#ca8a04"
                          stroke="#fef08a"
                          strokeWidth="1"
                          className="transition-all duration-300"
                        />
                      );
                    })}

                    {/* Center Node */}
                    <circle cx="50" cy="50" r="5" fill="#facc15" className="animate-ping" />
                  </svg>
                )}
              </motion.div>

              {/* Status floating tags */}
              <div className="absolute top-4 right-4 bg-slate-950/90 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-[9px] text-slate-300">
                {activeGesture === 'drift' ? (
                  <>
                    DRIFT ANGLE: <span className="text-yellow-400 font-bold">{driftAngle}°</span><br />
                    OVERSTEER YAW: <span className="text-red-400 font-bold">{(slipRatio * 100).toFixed(0)}%</span>
                  </>
                ) : (
                  <>
                    GEOMETRIC SIDES: <span className="text-yellow-400 font-bold">{modelSides}</span><br />
                    SCALE RATIO: <span className="text-sky-400 font-bold">{modelScale.toFixed(2)}x</span>
                  </>
                )}
              </div>

              {/* Drift Slip Indicator Alert Bar */}
              {activeGesture === 'drift' && (
                <div className="absolute bottom-4 left-4 bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Max Air-Drifting (تفحيط هندسي مفرط)
                </div>
              )}
            </div>

            {/* Quick Metrics display */}
            <div className="grid grid-cols-2 gap-4 mt-4 font-mono">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-black">Tracking Confidence</span>
                <span className="text-emerald-400 font-bold text-sm">{confidence.toFixed(2)}%</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-black">Vector Processing Latency</span>
                <span className="text-yellow-300 font-bold text-sm">{latency.toFixed(1)}ms</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Controls */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-black text-slate-400 tracking-wider uppercase mb-1 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-yellow-400" />
                Air-Control Gesture Library
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                {[
                  { id: 'drift', label: 'Air-Drifting ("التفحيط الفراغي")', desc: 'Operator stands up, sweeping arms in circular oversteer vectors to slide and drift 3D ship wireframes.' },
                  { id: 'hover', label: 'Static Air Hover', desc: 'Hover key joints in mid-air to initialize real-time skeletal coordinate mapping.' },
                  { id: 'scale', label: 'Depth Pinch & Zoom', desc: 'Pinch fingers closer or further in air space to calculate dynamic scale matrices.' },
                  { id: 'rotate', label: 'Gyroscopic Air Rotation', desc: 'Sweep hand in circular orbital vectors to rotate objects around 3D axes.' }
                ].map((gesture) => (
                  <button
                    key={gesture.id}
                    onClick={() => setActiveGesture(gesture.id as any)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      activeGesture === gesture.id 
                        ? 'bg-yellow-400 text-blue-950 border-yellow-200' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <p className="font-bold text-xs">{gesture.label}</p>
                    <p className={`text-[9px] mt-1 leading-normal ${
                      activeGesture === gesture.id ? 'text-blue-900/80 font-semibold' : 'text-slate-400'
                    }`}>
                      {gesture.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-2xl">
              <h6 className="font-bold text-yellow-300 text-xs uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Standing Human Calibration
              </h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                Perfect for full standing human tracking setups. The optical array maps body height variations to filter background noise, locking onto hand gestures for direct spatial physics control.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
