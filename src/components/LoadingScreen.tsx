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
      {/* Background Effect - Removed Grid as requested */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.15)_0%,transparent_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-6 mb-4">
            <div className="relative">
              {/* Wrapping rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border-2 border-dashed border-blue-500/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border border-dotted border-yellow-400/30 rounded-full"
              />
              
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-2 border-blue-500 rounded-3xl flex items-center justify-center relative shadow-[0_0_40px_rgba(0,136,255,0.4)] bg-black z-10"
              >
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-6px] border-2 border-t-yellow-400 border-r-transparent border-b-yellow-400 border-l-transparent rounded-3xl" 
                 />
                 <span className="text-white text-4xl font-bold">N</span>
              </motion.div>
            </div>

            <div className="relative mt-4">
              <motion.h1 
                className="text-4xl font-bold tracking-[0.3em] text-white"
                animate={{ opacity: [0.6, 1, 0.6], letterSpacing: ["0.2em", "0.4em", "0.2em"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                NEWREXS
              </motion.h1>
              <motion.div 
                className="absolute -inset-x-4 -inset-y-2 border-x border-yellow-400/30"
                animate={{ scaleX: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
          <p className="text-blue-400 text-[10px] tracking-[0.4em] uppercase mt-4">Autonomous Bio-Logic Systems</p>
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
