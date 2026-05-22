/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { NeurixLogo } from './components/NeurixLogo';
import { RoadmapNugget } from './components/RoadmapNugget';
import { MemberProfileModal } from './components/MemberProfileModal';
import { Interactive3DObject } from './components/Interactive3DObject';
import { LiveGestureDemo } from './components/LiveGestureDemo';
import { 
  Cpu, 
  Layers, 
  Zap, 
  Users, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  GraduationCap,
  Microchip,
  Globe,
  BrainCircuit,
  Award,
  GitBranch,
  Hexagon,
  Smartphone,
  Megaphone,
  Search,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageSquare,
  ExternalLink,
  Code,
  CircuitBoard
} from 'lucide-react';

const TEAM_MEMBERS = [
  // Leadership
  { id: 1, name: "Mustafa Abdelrahman", role: "Team Leader & Systems Architect", team: "Governance", category: "Leadership" },

  // Overall Technical Management / Deputy
  { id: 3, name: "Mohamed Assem", role: "Team Coordinator", team: "Governance", category: "Management" },

  // Software Management
  { id: 2, name: "Mohamed Saeed", role: "Software Division Manager", team: "Software", category: "Software Management" },
  
  // Software Division
  { id: 4, name: "Malak Sabry", role: "Backend Developer", team: "Software", category: "Backend / Logic" },
  { id: 5, name: "Mariam Hassan", role: "Backend Developer", team: "Software", category: "Backend / Logic" },
  { id: 6, name: "Dalia Refaat", role: "CV Developer (OpenCV)", team: "Software", category: "Camera & Vision" },
  { id: 7, name: "Mohamed Abdullah", role: "CV Developer (OpenCV)", team: "Software", category: "Camera & Vision" },
  { id: 8, name: "Mohamed Saeed", role: "Frontend Developer", team: "Software", category: "Frontend / GUI" },
  { id: 9, name: "Jana Mohamed", role: "Frontend Developer", team: "Software", category: "Frontend / GUI" },
  
  // Hardware Management
  { id: 10, name: "Mariam Tarek", role: "Hardware Division Manager", team: "Hardware", category: "Hardware Management" },

  // Hardware Division
  { id: 11, name: "Mohamed Said", role: "Hardware Specialist", team: "Hardware", category: "Hardware Team" },
  { id: 12, name: "Ahmed Didamony", role: "Hardware presenter", team: "Hardware", category: "Hardware Team" },
  { id: 13, name: "Damiana Aziz", role: "Hardware Operations", team: "Hardware", category: "Hardware Team" },
  { id: 14, name: "Mariam Ahmed", role: "Electricity Specialist", team: "Hardware", category: "Hardware Team" },
  { id: 15, name: "Haneen Abdo", role: "Electricity Tech", team: "Hardware", category: "Hardware Team" },
  
  // Presentation & Research (Affiliated with Project Governance)
  { id: 16, name: "Mariam Abdelsadeq", role: "Presentation Lead", team: "Presentation", category: "Presentation" },
  { id: 17, name: "Hala Walid", role: "Research Lead", team: "Presentation", category: "Research" },
  { id: 18, name: "Haneen Masoud", role: "Presentation Media", team: "Presentation", category: "Presentation" },
  { id: 19, name: "Mohamed Alaa", role: "Presentation Support", team: "Presentation", category: "Presentation" },
  { id: 20, name: "Basmala Mostafa", role: "Research Specialist", team: "Presentation", category: "Research" },
  { id: 21, name: "Bilal Ahmed", role: "Research Associate", team: "Presentation", category: "Research" },
  { id: 22, name: "Abdelrahman Emad", role: "Research Support", team: "Presentation", category: "Research" },
];

const OBJECTIVES = [
  {
    title: "Innovative Solutions",
    description: "Developing smart, cost-effective solutions using Embedded Systems to push the boundaries of interaction.",
    icon: <Cpu className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Integration",
    description: "Merging hardware and software to create a highly interactive and automated system that bridges the physical and digital worlds.",
    icon: <Layers className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Practical Impact",
    description: "Utilizing IoT and AI technologies to solve real-world challenges efficiently with high-tech sensors.",
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);
  const [presentationStage, setPresentationStage] = useState<'hook' | 'problem' | 'solution'>('hook');

  const teamData = useMemo(() => {
    const leader = TEAM_MEMBERS.find(m => m.id === 1) || null;
    const deputy = TEAM_MEMBERS.find(m => m.id === 3) || null;
    const softManager = TEAM_MEMBERS.find(m => m.id === 2) || null;
    const hardManager = TEAM_MEMBERS.find(m => m.id === 10) || null;
    const presManager = TEAM_MEMBERS.find(m => m.id === 16) || null;
    const resManager = TEAM_MEMBERS.find(m => m.id === 17) || null;

    return {
      leader,
      deputy,
      softManager,
      hardManager,
      presManager,
      resManager,
      softTeam: TEAM_MEMBERS.filter(m => m.team === "Software" && m.name !== softManager?.name),
      hardTeam: (() => {
        const members = TEAM_MEMBERS.filter(m => m.team === "Hardware" && m.name !== hardManager?.name);
        // Sort so Damiana(13) then Ahmed(12) then Mohamed Said(11) are first
        return members.sort((a, b) => {
          if (a.id === 13) return -1;
          if (b.id === 13) return 1;
          if (a.id === 12) return -1;
          if (b.id === 12) return 1;
          if (a.id === 11) return -1;
          if (b.id === 11) return 1;
          return 0;
        });
      })(),
      presentationTeam: TEAM_MEMBERS.filter(m => m.category === "Presentation" && m.name !== presManager?.name),
      researchTeam: TEAM_MEMBERS.filter(m => m.category === "Research" && m.name !== resManager?.name)
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-slate-100 font-sans selection:bg-yellow-500/20 relative">
      {/* Global Azure Underlay overlaying the dark dark slate */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-blue-900 via-sky-900/80 to-blue-900" />
      {/* Global Soft Golden/Yellow Glow */}
      <div className="fixed inset-0 pointer-events-none z-[100] shadow-[inset_0_0_150px_rgba(255,191,0,0.1)]" />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-sky-500/10 blur-[120px] md:blur-[160px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] bg-yellow-600/10 blur-[120px] md:blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-cyan-500/15 blur-[120px] md:blur-[140px] rounded-full" 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <AnimatePresence>
          {isLoading && (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {/* Header / Nav */}
        <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 backdrop-blur-2xl supports-[backdrop-filter]:bg-blue-900/80">
        {/* Subtle gold top border highlight */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-auto py-3 md:py-4 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 relative group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-16 bg-yellow-500/5 blur-[20px] rounded-full pointer-events-none group-hover:bg-yellow-500/10 transition-colors duration-500" />
            <NeurixLogo className="w-8 h-8 md:w-10 md:h-10 relative z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-transform duration-500 group-hover:scale-105" />
            
            {/* Staggered Animated Character Blend next to Logo */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.3
                  }
                }
              }}
              className="flex items-center relative z-10 select-none pb-0.5 mt-1"
            >
              {"NEURIX".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: -80, opacity: 0, scale: 0.5 },
                    visible: { 
                      y: 0, 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 150,
                        damping: 10,
                        mass: 0.8
                      }
                    }
                  }}
                  className="font-black text-xl md:text-2xl tracking-[0.02em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-500 to-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {char}
                </motion.span>
              ))}
              
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="ml-2.5 text-[7px] md:text-[8px] text-yellow-300 font-black tracking-[0.25em] uppercase mt-1 hidden sm:inline-block border-l border-white/20 pl-2.5"
              >
                Project 2026
              </motion.span>
            </motion.div>
          </div>
          <nav className="flex flex-row items-center justify-end gap-5 md:gap-7 overflow-x-auto no-scrollbar shrink-0">
            <a href="#contact-hub" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Connect</a>
            <a href="#live-demo-section" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-350 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Live Demo</a>
            <a href="#roadmap" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Matrix</a>
            <a href="#architecture" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Stack</a>
            <a href="#objectives" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Objectives</a>
            <a href="#core-concept" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Concept</a>
            <a href="#about" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-250 transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">About</a>
          </nav>
        </div>
      </header>

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden px-6 lg:px-16 w-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 border-b border-white/5">
          {/* Subtle Animated Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] left-[20%] w-[50%] h-[80%] bg-gradient-to-br from-yellow-500/10 to-transparent blur-[100px] rounded-full"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 50, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[10%] w-[40%] h-[60%] bg-gradient-to-t from-yellow-700/10 to-transparent blur-[100px] rounded-full transform rotate-45"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Stage-Based Texts */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              <AnimatePresence mode="wait">
                {presentationStage === 'hook' && (
                  <motion.div
                    key="stage-hook"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border-2 border-yellow-400/50 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                      INTRODUCING • THE HOOK
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white leading-tight">
                      NEURIX PROJECT <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-250 via-yellow-400 to-yellow-600 drop-shadow">Interactive Air Control</span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:lg:mx-0">
                      Developing the next generation of touchless, in-the-air handheld control. Interact with digital objects in 3D physics engines with zero physical surface contact or mice, powered by high-precision optical AI key-joint tracking.
                    </p>

                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-8">
                      Hover mouse inside the logo area on the right to interact in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      <button 
                        onClick={() => setPresentationStage('problem')}
                        className="w-full sm:w-auto overflow-hidden relative group bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-950 px-10 py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:shadow-[0_0_50px_rgba(234,179,8,0.45)] hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10">Start Journey</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <div className="flex items-center gap-3 text-slate-400 pl-4 border-l border-white/10">
                        <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                        <span className="text-xs font-mono tracking-wide">Touchless Gesture Controller</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {presentationStage === 'problem' && (
                  <motion.div
                    key="stage-problem"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border-2 border-red-500/50 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
                      ⚠️ THE CHALLENGE • THE PROBLEM
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-red-400 leading-tight">
                      CAD Learning Curves<br />
                      <span className="text-white">& 3D Printing Material Waste</span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto lg:lg:mx-0">
                      Children and makers face high cognitive barriers mastering spatial 3D axes on traditional CAD platforms. This complexity results in structural model defects, failed 3D prints, and severe material waste in training labs.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left max-w-xl">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <p className="text-red-400 font-bold text-sm mb-1">Stiff Traditional Inputs</p>
                        <p className="text-xs text-slate-400 font-sans">Standard computer mice and hotkeys fail to map intuitive, mid-air human hand ergonomics in three-dimensional space.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <p className="text-red-400 font-bold text-sm mb-1">Failed 3D Print Rates</p>
                        <p className="text-xs text-slate-400 font-sans">Over 40% of novice CAD projects fail at print time due to dimensional misalignment and inaccurate size constraints.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      <button 
                        onClick={() => setPresentationStage('solution')}
                        className="w-full sm:w-auto bg-white text-blue-950 px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-lg"
                      >
                        Explore Hardware Solution
                      </button>
                      <button 
                        onClick={() => setPresentationStage('hook')}
                        className="text-slate-400 hover:text-white px-6 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
                      >
                        Back
                      </button>
                    </div>
                  </motion.div>
                )}

                {presentationStage === 'solution' && (
                  <motion.div
                    key="stage-solution"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
                      💡 TECHNICAL SYSTEM • THE SOLUTION
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white leading-tight">
                      The Open-Source Stack<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-400 drop-shadow">Exploded Technology Stack</span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto lg:lg:mx-0">
                      We engineered a cohesive systems stack that unifies frontends and custom microcontrol sensors. It maps handheld vectors directly in the air, instantly converting coordinates to minimize faults and guarantee printability.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-center text-xs font-bold">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="block text-yellow-300 mb-1">React + Vite</span>
                        <span className="text-slate-400 font-mono text-[10px]">Frontend UI Workspace</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="block text-sky-400 mb-1">MediaPipe Core</span>
                        <span className="text-slate-400 font-mono text-[10px]">Optical Hand Tracking</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="block text-emerald-400 mb-1">ESP32 + Hardware</span>
                        <span className="text-slate-400 font-mono text-[10px]">Depth Micro-Sensor Unit</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      <a 
                        href="#live-demo-section"
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 text-center shadow-lg"
                      >
                        Launch Live Simulation
                      </a>
                      <button 
                        onClick={() => setPresentationStage('hook')}
                        className="text-slate-400 hover:text-white px-6 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
                      >
                        Reset Journey
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Box: Dynamic 3D SVG Object with camera zoom effects */}
            <div className="lg:col-span-5 flex items-center justify-center relative min-h-[460px]">
              <Interactive3DObject stage={presentationStage} />
            </div>

          </div>
        </section>

        {/* Detailed About Section */}
        <section id="about" className="py-24 px-6 lg:px-16 border-y border-white/5 bg-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent)]" />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h3 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-600 drop-shadow-md">
              Forging the Future
            </h3>
            <p className="text-slate-300 md:text-xl leading-relaxed mb-16 max-w-4xl mx-auto font-medium">
              Neurix represents a paradigm shift in human-computer interaction. Conceived as a holistic hardware-software integration, this project challenges the boundaries of traditional input systems by bringing digital control directly into three-dimensional space.
              <br/><br/>
              By bridging spatial artificial intelligence, dynamic sensor fusion, and real-time environment mapping, Neurix empowers users to sculpt, command, and interact purely through intuition and natural gestures.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 border-t border-white/5 pt-12 max-w-3xl mx-auto">
               <div className="flex flex-col items-center gap-2">
                 <div className="text-yellow-400 font-bold text-4xl">01</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Spatial Engine</div>
               </div>
               <div className="w-px h-12 bg-white/5 hidden md:block" />
               <div className="flex flex-col items-center gap-2">
                 <div className="text-yellow-400 font-bold text-4xl">02</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Sensor Fusion</div>
               </div>
               <div className="w-px h-12 bg-white/5 hidden md:block" />
               <div className="flex flex-col items-center gap-2">
                 <div className="text-yellow-400 font-bold text-4xl">03</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Zero Latency</div>
               </div>
            </div>
          </div>
        </section>
        
        {/* Infinite Gold Brand Marquee */}
        <section className="bg-black font-black py-8 md:py-12 overflow-hidden relative shadow-[0_30px_100px_rgba(250,204,21,0.25)] border-y-2 border-yellow-400">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.1),transparent)]" />
          {/* Subtle light sweep across the whole strip */}
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent skew-x-[-20deg]"
          />
          
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-32 whitespace-nowrap relative z-10"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex gap-32 items-center">
                <motion.div className="relative">
                  <motion.span 
                    animate={{ 
                      opacity: [1, 0.5, 1],
                      textShadow: [
                        "0 0 15px rgba(250,204,21,0.6)",
                        "0 0 35px rgba(250,204,21,1)",
                        "0 0 15px rgba(250,204,21,0.6)"
                      ],
                      color: ["#facc15", "#fef08a", "#facc15"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.15
                    }}
                    className="text-6xl md:text-9xl font-black italic tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                  >
                    NEURIX
                  </motion.span>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Visual Showcase Gallery: Infinite Moving Strip */}
        <section id="showcase" className="py-24 px-0 bg-blue-900 overflow-hidden relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-600 drop-shadow-md">Technical Showcase</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Explore the Neurix ecosystem through our dynamic interactive gallery.
            </p>
          </div>
          
          <div className="relative flex overflow-hidden py-12">
            {/* Background Text Overlay for the strip */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="text-[20rem] font-black whitespace-nowrap text-yellow-300"
              >
                NEURIX NEURIX NEURIX NEURIX
              </motion.div>
            </div>

            <motion.div 
              animate={{ 
                x: [0, -3500],
              }}
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
              className="flex gap-16 whitespace-nowrap items-center"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center">
                  {/* Stylized Gold Text */}
                  <div className="flex flex-col items-center justify-center px-12 group">
                    <motion.span 
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                      }}
                      className="text-7xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-500 to-yellow-800 bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                    >
                      NEURIX
                    </motion.span>
                    <motion.div 
                      animate={{ 
                        width: ["0%", "100%", "0%"],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4" 
                    />
                  </div>

                  {/* Image 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-[3.5rem] border-2 border-yellow-400/50 hover:border-yellow-300/80 bg-blue-900/60 shadow-[0_30px_60px_rgba(245,158,11,0.2)]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/interface.jpg" 
                        alt="Smart Interface" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"; // UI/Cyber placeholder
                        }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 " 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/50 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-10">
                      <h5 className="text-2xl font-bold text-white mb-1">Smart Interface</h5>
                      <p className="text-xs text-yellow-300 font-black uppercase tracking-widest">Interaction Mapping</p>
                    </div>
                  </motion.div>

                  {/* Image 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-[3.5rem] border-2 border-yellow-400/50 hover:border-yellow-300/80 bg-blue-900/60 shadow-[0_30px_60px_rgba(245,158,11,0.2)]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/workspace.jpg" 
                        alt="Future Workspace Table" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200"; // Tech Workspace placeholder
                        }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 " 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/50 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-10">
                      <h5 className="text-2xl font-bold text-white mb-1">Future Workspace</h5>
                      <p className="text-xs text-yellow-400 font-black uppercase tracking-widest">Next-Gen Collaboration</p>
                    </div>
                  </motion.div>

                  {/* Image 3 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-[3.5rem] border-2 border-yellow-400/50 hover:border-yellow-300/80 bg-blue-900/60 shadow-[0_30px_60px_rgba(245,158,11,0.2)]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/presentation.jpg" 
                        alt="Advanced Presentation System" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"; // Network/Global placeholder
                        }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 " 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/50 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-10">
                      <h5 className="text-2xl font-bold text-white mb-1">Advanced Projection</h5>
                      <p className="text-xs text-yellow-300 font-black uppercase tracking-widest">Optical Logic</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brand/Affiliation */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 opacity-60">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                  <GraduationCap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">Institution</p>
                    <p className="text-base md:text-lg font-semibold">Borg Al Arab Technological University</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:border-l border-white/10 sm:pl-8">
                  <MapPin className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">Faculty</p>
                    <p className="text-base md:text-lg font-semibold">Industrial and Energy Technology</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">Program</p>
                    <p className="text-base md:text-lg font-semibold">Industry Technology Program</p>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Core Concept & How it Works */}
        <section id="core-concept" className="py-24 md:py-32 px-6 relative border-t border-white/5 bg-gradient-to-b from-blue-950 to-blue-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/40 shadow-[0_0_15px_rgba(255,215,0,0.2)] text-yellow-300 text-[10px] font-black uppercase tracking-widest mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  The Core Concept
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
                  Vision-Based <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md">Touchless</span> System
                </h3>
                <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed mb-8">
                  Neurix is a hardware-software system that enables users to interact with a digital environment using hand gestures in mid-air — without physical contact, controllers, or traditional input devices.
                </p>
                <div className="space-y-4">
                  <div className="p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 hover:bg-white/[0.04] transition-all group duration-300 flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-yellow-500/10 text-yellow-300 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 mb-1">Spatial Immersion</h5>
                      <p className="text-sm text-slate-400 leading-relaxed">Transforms interaction from touch-based to spatial, creating a more immersive and futuristic user experience.</p>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 hover:bg-white/[0.04] transition-all group duration-300 flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 mb-1">Real-Time Analysis</h5>
                      <p className="text-sm text-slate-400 leading-relaxed">Captures hand movements through a camera, analyzes them in real-time, and converts them into meaningful commands.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-blue-800/50 rounded-[2.5rem] p-4 border border-white/5 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <motion.div 
                  className="relative h-full w-full rounded-[2rem] overflow-hidden bg-black"
                >
                  <motion.img 
                    src="/interface.jpg" 
                    alt="Neurix Holographic Interface"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200";
                    }}
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] transition-all duration-700"
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none z-20" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                    <p className="text-yellow-300 font-bold tracking-widest text-[10px] uppercase mb-2">Prototype Stage</p>
                    <p className="text-white font-medium text-lg">System Interface Concept</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Real-World Application & The Live Demo */}
        <section id="live-demo-section" className="py-24 px-6 border-y border-white/5 bg-blue-850/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border-2 border-yellow-400/50 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
                🚀 EXPERIMENTAL INTERFACE • THE LIVE DEMO
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white">Live Workspace Simulation</h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Interact with the geometric coordinates and virtual spatial camera matrices below. This simulated environment showcases the capabilities of the NEURIX system to process and manipulate models instantly with mid-air handheld gestures.
              </p>
            </div>
            
            <LiveGestureDemo />
          </div>
        </section>

        {/* Objectives */}
        <section id="objectives" className="py-24 md:py-32 px-6 bg-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(wrap,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 md:mb-24 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6">
                Strategic Goals
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Project Objectives</h3>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">The drive behind our innovation and technological implementations.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {OBJECTIVES.map((obj, i) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100" />
                  
                  <div className="mb-8 p-4 w-16 h-16 flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-yellow-500/30 group-hover:bg-yellow-500/10 transition-colors shadow-lg">
                    {obj.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors">{obj.title}</h4>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium">
                    {obj.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Command Matrix - Org Chart Style */}
        <section id="roadmap" className="py-32 px-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-yellow-500/20 rounded-full animate-[pulse_10s_infinite]" />
           </div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/40 shadow-[0_0_15px_rgba(255,215,0,0.2)] text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                  Structural Hierarchy
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic italic-shadow uppercase">NEURIX Org Chart</h3>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                  The mission-critical leadership structure driving the Neurix initiative.
                </p>
              </div>

              {/* Org Chart Visualization */}
              <div className="flex flex-col items-center">
                {/* 1. Level 1: Team Leader */}
                <div className="relative mb-32 flex flex-col items-center">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-3xl md:text-5xl font-black text-yellow-400 uppercase tracking-[0.2em] italic border-b-2 border-yellow-400 pb-2">TEAM LEADER</span>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(teamData.leader)}
                    className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-400 shadow-[0_0_50px_rgba(245,158,11,0.3)] cursor-pointer group"
                  >
                    <div className="bg-blue-900 px-16 py-10 rounded-[calc(2.5rem-4px)] text-center min-w-[320px] border border-white/5">
                      <Hexagon className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:rotate-180 transition-transform duration-1000" />
                      <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">{teamData.leader?.name}</h4>
                      <p className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em] mt-2">{teamData.leader?.role}</p>
                    </div>
                  </motion.div>
                  
                  {/* Stem Down to Level 2 */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-yellow-400 to-yellow-500" />
                </div>

                {/* 2. Level 2: Project Management / Technical Lead (Mohamed Asem) */}
                <div className="relative mb-24 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(teamData.deputy)}
                    className="relative p-1 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.2)] cursor-pointer group"
                  >
                    <div className="bg-blue-900 px-12 py-8 rounded-[calc(2rem-4px)] text-center min-w-[280px] border border-white/10">
                      <Microchip className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                      <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">{teamData.deputy?.name}</h4>
                      <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">{teamData.deputy?.role}</p>
                    </div>
                  </motion.div>

                  {/* Stem Down to Divisions */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-purple-500/50 to-yellow-500/50" />
                </div>

                {/* Level 3: Divisions */}
                <div className="w-full relative">
                  {/* Horizontal Bar Connecting All 4 Branches */}
                  <div className="absolute top-[-48px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-yellow-500/40 via-indigo-500/40 via-emerald-500/40 via-orange-500/40 to-yellow-400/40" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12">
                    
                    {/* Left Branch: Software Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-yellow-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedMember(teamData.softManager)}
                          className="px-6 py-4 rounded-3xl bg-blue-900/60 border border-yellow-400/50 shadow-[0_10px_30px_rgba(245,158,11,0.15)] backdrop-blur-md cursor-pointer text-center min-w-[180px] hover:scale-105 transition-transform group"
                        >
                           <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2 group-hover:animate-pulse" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight">Software Team</h5>
                           <p className="text-[8px] font-black text-yellow-300 uppercase tracking-widest mt-1">Lead: {teamData.softManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-yellow-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[180px]">
                        {teamData.softTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: 5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-yellow-500 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-yellow-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 2: Presentation Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-yellow-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedMember(teamData.presManager)}
                          className="px-6 py-4 rounded-3xl bg-blue-900/60 border border-yellow-400/50 shadow-[0_10px_30px_rgba(245,158,11,0.15)] backdrop-blur-md cursor-pointer text-center min-w-[170px] hover:scale-105 transition-transform group"
                        >
                           <Megaphone className="w-5 h-5 text-yellow-400 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight text-yellow-300">Presentation</h5>
                           <p className="text-[8px] font-black text-yellow-400 uppercase tracking-widest mt-1">Lead: {teamData.presManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-yellow-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[170px]">
                        {teamData.presentationTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, y: -2 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-yellow-500 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-yellow-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 3: Research Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-sky-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedMember(teamData.resManager)}
                          className="px-6 py-4 rounded-3xl bg-sky-900/40 border border-sky-400/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] backdrop-blur-md cursor-pointer text-center min-w-[170px] transition-all hover:bg-sky-900/60 group hover:scale-105"
                        >
                           <Search className="w-5 h-5 text-sky-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight text-sky-100">Research</h5>
                           <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest mt-1">Lead: {teamData.resManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-sky-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[170px]">
                        {teamData.researchTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: -5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-500/5 border border-sky-500/10 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-sky-400 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-sky-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 4: Hardware Support / Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-sky-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedMember(teamData.hardManager)}
                          className="px-6 py-4 rounded-3xl bg-sky-900/40 border border-sky-400/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] backdrop-blur-md cursor-pointer text-center min-w-[180px] hover:scale-105 transition-transform group"
                        >
                           <Microchip className="w-5 h-5 text-sky-400 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight text-sky-100">Hardware Team</h5>
                           <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest mt-1">Lead: {teamData.hardManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-sky-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[180px]">
                        {teamData.hardTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: -5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-500/5 border border-sky-500/10 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-sky-400 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-sky-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
           </div>
        </section>

        {/* Operational Roadmap Summary */}
        <section className="py-32 px-6 bg-blue-800/50 border-y border-white/5">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="flex-1">
                    <div className="w-12 h-1 bg-yellow-400 mb-8" />
                    <h3 className="text-4xl font-bold mb-6 tracking-tight">Functional Inter-Matrix</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                       The NEURIX project operates through a synchronized functional matrix, where each division feeds critical data into the centralized core logic.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                       {[
                         { label: "Data Loop", value: "Real-time" },
                         { label: "Latency", value: "< 15ms" },
                         { label: "Architecture", value: "Distributed" },
                         { label: "Redundancy", value: "99.9%" }
                       ].map(stat => (
                         <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                           <p className="text-xl font-bold text-yellow-400">{stat.value}</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="flex-1 w-full relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-blue-700/10 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                    <motion.img 
                      src="IMG-20260513-WA0050.jpg.jpeg" 
                      alt="Neurix Hardware Integration"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        x: [-10, 10, -10],
                        rotate: [-2, 2, -2]
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ 
                        x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 1.5 }
                      }}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                       <div className="relative w-48 h-48 pointer-events-none">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-yellow-500/30 rounded-full"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-yellow-400/20 rounded-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Hexagon className="w-12 h-12 text-white animate-pulse" />
                          </div>
                       </div>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-full border-2 border-yellow-400/50 hover:border-yellow-300/80 z-30">
                       <p className="text-[10px] font-black text-yellow-300 uppercase tracking-widest">Hardware Module v1.0</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Technical Architecture: How we built it */}
        <section id="architecture" className="py-32 px-6 relative bg-blue-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/40 shadow-[0_0_15px_rgba(255,215,0,0.2)] text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6"
              >
                The Engine Under the Hood
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic uppercase text-white">
                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-md">Architecture</span>
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                A brief overview of the advanced fusion between high-performance hardware and intelligent software logic that brings Neurix to life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Software Column */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-10 rounded-[3rem] bg-blue-800/50 border border-yellow-500/10 shadow-2xl group"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-8 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                  <Code className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-3xl font-black italic tracking-tight text-white mb-6 uppercase">Software Engineering</h4>
                <ul className="space-y-6">
                  {[
                    { title: "Computer Vision", desc: "Utilizing OpenCV for high-accuracy hand and gesture landmark detection." },
                    { title: "Spatial Mapping", desc: "Real-time transformation of 2D camera coordinates into 3D interaction space." },
                    { title: "Low Latency Pipeline", desc: "Optimized data processing ensuring response times under 15ms for fluid feedback." },
                    { title: "Backend Core", desc: "Scalable logic architecture handling state synchronization and gesture parsing." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2 shrink-0" />
                      <div>
                        <p className="text-white font-bold text-lg mb-1">{item.title}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Hardware Column */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-10 rounded-[3rem] bg-yellow-500/5 border border-yellow-500/10 shadow-2xl group"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-8 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                  <CircuitBoard className="w-8 h-8 text-yellow-500" />
                </div>
                <h4 className="text-3xl font-black italic tracking-tight text-white mb-6 uppercase">Hardware Systems</h4>
                <ul className="space-y-6">
                  {[
                    { title: "Optical Sensor Array", desc: "High-resolution camera configuration for precise environmental depth capture." },
                    { title: "Embedded Processing", desc: "Microcontroller-driven units managing sensor calibration and primary I/O logic." },
                    { title: "Tangible Workspace", desc: "Custom-engineered interactive surface optimized for optical reflection and tracking." },
                    { title: "Integrated Feedback", desc: "Conceptual haptic integration and visual projection synchronization." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2 shrink-0" />
                      <div>
                        <p className="text-white font-bold text-lg mb-1">{item.title}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-20 text-center">
              <p className="inline-block px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-mono text-sm">
                Built with: <span className="text-yellow-400">OpenCV</span> + <span className="text-yellow-400">Embedded IoT Architecture</span> + <span className="text-purple-400">Spatial AI Logic</span>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Hub: Digital Portal */}
        <section id="contact-hub" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              >
                The Connection Nexus
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic uppercase text-white">
                Contact
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                Bridge the gap between vision and reality. Access our official networks and technical repositories below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                { name: "GitHub Repository", desc: "View the core system source code and technical desktop application documentation.", icon: <Github className="w-6 h-6" />, color: "from-slate-700 to-slate-900", link: "https://github.com/Mostafa8269/Neurix-desktop-app" },
                { name: "Instagram Gallery", desc: "Visual showcase of our hardware iterations and design lab.", icon: <Instagram className="w-6 h-6" />, color: "from-pink-600 to-purple-600", link: "https://www.instagram.com/neurixfeed?igsh=cGJtcDEzZHBjOGw" },
                { name: "Official Email", desc: "Direct inquiry line for partnerships and technical collaboration.", icon: <Mail className="w-6 h-6" />, color: "from-yellow-500 to-indigo-600", link: "mailto:neurixt@gmail.com" },
              ].map((hub, i) => (
                <motion.a
                  key={hub.name}
                  href={hub.link}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-full flex flex-col p-8 rounded-[2.5rem] bg-blue-800/40 border border-white/5 hover:border-yellow-500/40 transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  {/* Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.color} opacity-[0.03] group-hover:opacity-20 blur-[40px] transition-opacity duration-500`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${hub.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {hub.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                      {hub.name}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {hub.desc}
                    </p>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className="mt-8 h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent transition-all duration-700 opacity-50" />
                </motion.a>
              ))}
            </div>

            {/* Special Callout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 p-1 rounded-[3rem] bg-gradient-to-r from-yellow-600/20 via-yellow-400/30 to-yellow-600/20"
            >
              <div className="bg-blue-900 rounded-[calc(3rem-4px)] px-8 py-10 text-center flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                    <Globe className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xl font-bold text-white uppercase tracking-tight">Technical Partnership</h5>
                    <p className="text-slate-400 text-sm">Seeking investors and hardware manufacturers for Q3 2026 expansion.</p>
                  </div>
                </div>
                <button className="px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.5)] hover:-translate-y-1">
                  Connect Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

        {/* CTA */}
        <section className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-yellow-600 to-yellow-400 p-0.5 md:p-1">
            <div className="bg-blue-900 rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-24 text-center">
              <h3 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                "Your Hand, <span className="text-yellow-400">Your World</span>"
              </h3>
              <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto">
                Join us on our journey to create the most intuitive hardware-software system for humanity.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/10">
                  <Microchip className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-500">Tech Stack</p>
                    <p className="text-xs md:text-base font-bold">Embedded IoT</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/10">
                  <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-500">Engine</p>
                    <p className="text-xs md:text-base font-bold">AI Processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/10">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-500">Scope</p>
                    <p className="text-xs md:text-base font-bold">Global Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        <footer className="py-16 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-4">
              <NeurixLogo className="w-10 h-10 opacity-70" />
              <div>
                <p className="text-sm font-bold text-slate-200">NEURIX</p>
                <p className="text-xs text-slate-500">© 2026 Neurix Project Team. All Rights Reserved.</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer group">
                <Mail className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                <a href="mailto:neurixt@gmail.com" className="text-sm font-medium">neurixt@gmail.com</a>
              </div>
              <div className="flex items-center gap-6">
                 <Calendar className="w-4 h-4 text-yellow-400" />
                 <p className="text-sm text-slate-400">Founded Feb 11, 2026</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}