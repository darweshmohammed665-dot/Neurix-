import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_LOGS = [
  "Initializing neural pathways...",
  "Calibrating tactile sensors...",
  "Syncing IoT mesh network...",
  "Loading embedded logic kernels...",
  "Establishing secure handwave link...",
  "Optimizing interface responsiveness...",
  "Systems operational. Welcome to NEURIX."
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < SYSTEM_LOGS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#0066ff_1px,transparent_1px),linear-gradient(to_bottom,#0066ff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 border-2 border-blue-500 rounded-lg flex items-center justify-center relative">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-yellow-400 rounded-lg" 
               />
               <span className="text-white font-bold">N</span>
            </div>
            <h1 className="text-4xl font-bold tracking-[0.2em] text-white">NEURIX</h1>
          </div>
          <p className="text-blue-400 text-xs tracking-[0.5em] uppercase">Tactile Innovation Hub</p>
        </motion.div>

        <div className="w-full bg-blue-900/20 border border-blue-500/30 h-1.5 rounded-full overflow-hidden mb-4 p-[1px]">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full mb-8">
          <span className="text-[10px] text-blue-500 uppercase tracking-widest font-bold">Initializing Systems</span>
          <span className="text-sm text-yellow-400 font-bold">{progress}%</span>
        </div>

        <div className="h-6 w-full text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={logIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose"
            >
              {SYSTEM_LOGS[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Pulsing Scanline */}
      <motion.div 
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-px bg-blue-500/30 shadow-[0_0_20px_rgba(0,102,255,0.5)] z-20"
      />
    </motion.div>
  );
}
