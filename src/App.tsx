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
import { LiveGestureDemo } from './components/LiveGestureDemo';
import { SynapticMindLink } from './components/SynapticMindLink';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'matrix' | 'livedemo' | 'connect'>('home');
  const [activeDemoTab, setActiveDemoTab] = useState<'signal' | 'synaptic'>('signal');

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
    <div className="min-h-screen bg-dark-obsidian text-slate-300 font-sans selection:bg-phosphor/20 relative">
      {/* Global Azure Underlay overlaying the dark dark slate */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-dark-obsidian" />
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
        <header className="sticky top-0 z-50 border-b border-phosphor/20 bg-dark-obsidian/90 backdrop-blur-md">
        {/* Subtle gold top border highlight */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-phosphor to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-auto py-3 md:py-4 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 relative group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                  className="font-black text-xl md:text-2xl tracking-[0.02em] text-transparent bg-clip-text bg-gradient-to-b from-white via-phosphor to-phosphor/45 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {char}
                </motion.span>
              ))}
              
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="ml-2.5 text-[7px] md:text-[8px] text-phosphor font-black tracking-[0.25em] uppercase mt-1 hidden sm:inline-block border-l border-phosphor/20 pl-2.5"
              >
                Project 2026
              </motion.span>
            </motion.div>
          </div>
          <nav className="flex flex-row items-center justify-end gap-3 md:gap-5 overflow-x-auto no-scrollbar shrink-0">
            {[
              { id: 'hero-section', label: 'Home', colorClass: 'text-phosphor hover:text-white' },
              { id: 'about-concept', label: 'Concept', colorClass: 'text-phosphor hover:text-white' },
              { id: 'roadmap', label: 'The Team', colorClass: 'text-phosphor hover:text-white' },
              { id: 'live-demo-section', label: 'Diagnostics', colorClass: 'text-phosphor font-black hover:text-white' },
              { id: 'contact-hub', label: 'Connect', colorClass: 'text-phosphor hover:text-white' },
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  if (page.id === 'hero-section') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    const el = document.getElementById(page.id);
                    if (el) {
                      const headerOffset = 80;
                      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                      const offsetPosition = elementPosition - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                className="text-[11px] md:text-xs font-black uppercase tracking-widest transition-all relative py-1 px-1 shrink-0 text-phosphor hover:text-white border-b-2 border-transparent hover:border-phosphor/20"
              >
                {page.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="page-home-hero"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <section className="relative pt-24 pb-28 md:pt-36 md:pb-40 overflow-hidden px-6 lg:px-16 w-full bg-dark-obsidian border-b border-phosphor/10">
                {/* Subtle Animated Background */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,159,0,0.04),transparent)]" />
                  <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] left-[20%] w-[50%] h-[80%] bg-gradient-to-br from-phosphor/5 to-transparent blur-[100px] rounded-full"
                  />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
                  {/* Centerpiece Logo */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: 'spring' }}
                    className="mb-10"
                  >
                    <NeurixLogo className="w-56 h-56" />
                  </motion.div>

                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase italic">
                    NEURIX PROJECT
                  </h2>
                  
                  <div className="h-1 w-24 bg-gradient-to-r from-phosphor to-phosphor/30 rounded-none mb-8" />
                  
                  <p className="text-phosphor font-mono text-sm tracking-[0.4em] uppercase font-black mb-12 amber-phosphor-glow">
                    EMBEDDED CONTROL PORTAL
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full max-w-md">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('roadmap');
                        if (el) {
                          const headerOffset = 85;
                          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                          const offsetPosition = elementPosition - headerOffset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto bg-phosphor text-dark-obsidian px-10 py-4 rounded-none font-black text-xs uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(255,159,0,0.35)] hover:shadow-[0_8px_30px_rgba(255,159,0,0.5)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      Team Org Chart Matrix
                    </button>
                    
                    <button 
                      onClick={() => {
                        const el = document.getElementById('live-demo-section');
                        if (el) {
                          const headerOffset = 85;
                          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                          const offsetPosition = elementPosition - headerOffset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto bg-dark-charcoal border border-phosphor/20 text-phosphor hover:bg-phosphor/5 px-10 py-4 rounded-none font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      Signal Diagnostics
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        
          {currentPage === 'home' && (
            <motion.div
              key="page-home-marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Infinite Gold Brand Marquee */}
              <section className="bg-dark-obsidian font-black py-8 md:py-12 overflow-hidden relative border-y-2 border-phosphor/30 shadow-[0_20px_60px_rgba(255,159,0,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,159,0,0.06),transparent)]" />
          {/* Subtle light sweep across the whole strip */}
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-phosphor/15 to-transparent skew-x-[-20deg]"
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
                        "0 0 15px rgba(255,159,0,0.5)",
                        "0 0 35px rgba(255,159,0,0.9)",
                        "0 0 15px rgba(255,159,0,0.5)"
                      ],
                      color: ["#ff9f00", "#ffbf00", "#ff9f00"]
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

        {/* Project Description, Affiliation Panel & Core Concepts */}
        <section id="about-concept" className="py-24 px-6 lg:px-16 border-y border-phosphor/15 bg-dark-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,159,0,0.03),transparent)] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10 text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-6">
              Initiative Vision
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-black mb-8 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-phosphor to-phosphor/30 drop-shadow-md">
              Forging the Future
            </h3>
            <p className="text-slate-400 md:text-xl leading-relaxed mb-12 max-w-4xl mx-auto font-sans">
              Neurix represents a paradigm shift in human-computer interaction. Conceived as a holistic hardware-software integration, this project challenges the boundaries of traditional input systems by bringing digital control directly into three-dimensional space.
              <br/><br/>
              By bridging spatial artificial intelligence, dynamic sensor fusion, and real-time environment mapping, Neurix empowers users to sculpt, command, and interact purely through intuition and natural gestures.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 border-t border-phosphor/10 pt-12 max-w-3xl mx-auto font-mono">
               <div className="flex flex-col items-center gap-2">
                 <div className="text-phosphor font-black text-4xl">01</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Spatial Engine</div>
               </div>
               <div className="w-px h-12 bg-phosphor/10 hidden md:block" />
               <div className="flex flex-col items-center gap-2">
                 <div className="text-phosphor font-black text-4xl">02</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Sensor Fusion</div>
               </div>
               <div className="w-px h-12 bg-phosphor/10 hidden md:block" />
               <div className="flex flex-col items-center gap-2">
                 <div className="text-phosphor font-black text-4xl">03</div>
                 <div className="text-xs uppercase tracking-widest font-black text-slate-500">Zero Latency</div>
               </div>
            </div>
          </div>
        </section>

        {/* Academic Affiliation Panel */}
        <section className="py-12 border-b border-phosphor/10 bg-dark-obsidian">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 opacity-90 font-mono">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                  <div className="p-3 bg-phosphor/5 text-phosphor border border-phosphor/20">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">// Institution</p>
                    <p className="text-base md:text-lg font-bold text-white">Borg Arab Technological Uni.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:border-l border-phosphor/15 sm:pl-8">
                  <div className="p-3 bg-phosphor/5 text-phosphor border border-phosphor/20">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">// Faculty</p>
                    <p className="text-base md:text-lg font-bold text-white">Ind. & Energy Tech</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:border-l border-phosphor/15 sm:pl-8">
                  <div className="p-3 bg-phosphor/5 text-phosphor border border-phosphor/20">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">// Program</p>
                    <p className="text-base md:text-lg font-bold text-white">Industry Technology</p>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Core Concept: Telemetry & Signal Design */}
        <section className="py-24 md:py-32 px-6 relative border-t border-phosphor/15 bg-dark-obsidian">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono font-black uppercase tracking-widest mb-6">
                  <div className="w-1.5 h-1.5 rounded-none bg-phosphor animate-pulse" />
                  The Concept Architecture
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 leading-tight tracking-tight text-white uppercase">
                  Telemetry & <span className="text-phosphor amber-phosphor-glow">Signal Control</span> System
                </h3>
                <p className="text-lg md:text-xl text-slate-355 leading-relaxed mb-8 font-sans">
                  Neurix is a hardware-software system that enables developers to analyze, visualize, and control a physical microchip environment using live web telemetry — bridging the gap between local device status and visual software controllers.
                </p>
                <div className="space-y-4">
                  <div className="p-5 md:p-6 rounded-none bg-dark-charcoal border border-phosphor/15 hover:border-phosphor/40 transition-all group duration-300 flex items-start gap-4">
                    <div className="mt-1 p-2 bg-phosphor/10 text-phosphor hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1 uppercase font-mono">Direct Serial Processing</h5>
                      <p className="text-sm text-slate-400 leading-relaxed font-sans">Transforms hardware diagnostics from low-level text console logs into responsive waveforms and clear pin matrices.</p>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 rounded-none bg-dark-charcoal border border-phosphor/15 hover:border-phosphor/40 transition-all group duration-300 flex items-start gap-4">
                    <div className="mt-1 p-2 bg-phosphor/10 text-phosphor hover:scale-110 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1 uppercase font-mono">Hardware-Software Loops</h5>
                      <p className="text-sm text-slate-400 leading-relaxed font-sans">Registers electrical interrupts, voltage readings, and pin high/low states dynamically without any latency configuration.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-dark-charcoal rounded-none p-4 border border-phosphor/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-phosphor/10 via-transparent to-phosphor/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full w-full rounded-none overflow-hidden bg-black">
                  <img 
                    src="/interface.jpg" 
                    alt="Neurix Holographic Interface"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200";
                    }}
                    className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] transition-all duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 border border-phosphor/10 rounded-none pointer-events-none z-20" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-obsidian via-dark-obsidian/90 to-transparent z-20 font-mono">
                    <p className="text-phosphor font-black tracking-widest text-[10px] uppercase mb-2">// Prototype Stage</p>
                    <p className="text-white font-bold text-lg">System Interface Concept</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Strategic Goals / Objectives Section */}
        <section id="objectives-section" className="py-24 md:py-32 px-6 bg-dark-charcoal relative overflow-hidden border-t border-phosphor/15">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 md:mb-24 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono font-black uppercase tracking-widest mb-6">
                Strategic Goals
              </div>
              <h3 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tight text-white uppercase">Project Objectives</h3>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-sans">The technological drive behind our embedded hardware implementations.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {OBJECTIVES.map((obj, i) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-8 md:p-10 rounded-none bg-dark-obsidian border border-phosphor/15 hover:border-phosphor transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-phosphor opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100" />
                  
                  <div className="mb-8 p-4 w-16 h-16 flex items-center justify-center rounded-none bg-phosphor/5 border border-phosphor/10 group-hover:border-phosphor/40 group-hover:bg-phosphor/10 transition-colors shadow-lg">
                    {obj.icon}
                  </div>
                  <h4 className="text-2xl font-mono font-bold mb-4 text-white group-hover:text-phosphor transition-colors uppercase">{obj.title}</h4>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">
                    {obj.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture Section */}
        <section id="architecture-section" className="py-32 px-6 relative bg-dark-obsidian border-t border-phosphor/15">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-6"
              >
                The Engine Under the Hood
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase text-white">
                Technical <span className="text-phosphor amber-phosphor-glow">Architecture</span>
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
                A brief overview of the advanced fusion between high-performance hardware and intelligent software logic that brings Neurix to life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Software Column */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-10 rounded-none bg-dark-charcoal border border-phosphor/25 shadow-2xl group"
              >
                <div className="w-16 h-16 rounded-none bg-phosphor/5 flex items-center justify-center mb-8 border border-phosphor/20 group-hover:bg-phosphor/20 transition-colors">
                  <Code className="w-8 h-8 text-phosphor" />
                </div>
                <h4 className="text-3xl font-mono font-black tracking-tight text-white mb-6 uppercase">Software Engineering</h4>
                <ul className="space-y-6">
                  {[
                    { title: "Signal Processing", desc: "Utilizing optimized buffer parsers for high-speed serial packet analysis." },
                    { title: "Registers Decoder", desc: "Real-time transformation of active physical register signals into JSON schemas." },
                    { title: "Low Latency Pipeline", desc: "Optimized stream processing ensuring transmission latency under 5ms." },
                    { title: "Backend Core", desc: "Scalable node architecture handling state synchronization and bus register mapping." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 shrink-0" />
                      <div>
                        <p className="text-white font-bold text-lg mb-1 font-mono">{item.title}</p>
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
                className="p-10 rounded-none bg-dark-charcoal border border-phosphor/25 shadow-2xl group"
              >
                <div className="w-16 h-16 rounded-none bg-phosphor/5 flex items-center justify-center mb-8 border border-phosphor/20 group-hover:bg-phosphor/20 transition-colors">
                  <CircuitBoard className="w-8 h-8 text-phosphor" />
                </div>
                <h4 className="text-3xl font-mono font-black tracking-tight text-white mb-6 uppercase">Hardware Systems</h4>
                <ul className="space-y-6">
                  {[
                    { title: "SPI & I2C Bus", desc: "High-speed communication interface configurations for dynamic microcontrollers." },
                    { title: "Embedded Processing", desc: "Dual-core microcontroller-driven units managing physical registers and multi-channel input/output logic." },
                    { title: "Diagnostic Board", desc: "Custom-engineered testing environment designed for signal isolation and circuit analysis." },
                    { title: "Integrated Feedback", desc: "Dynamic status LEDs and automated coil relay triggers for active physical feedback." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 shrink-0" />
                      <div>
                        <p className="text-white font-bold text-lg mb-1 font-mono">{item.title}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-20 text-center">
              <p className="inline-block px-8 py-4 rounded-none bg-dark-charcoal border border-phosphor/20 text-slate-400 font-mono text-sm shadow-md">
                Built with: <span className="text-phosphor">OpenCV</span> + <span className="text-phosphor">Embedded IoT Architecture</span> + <span className="text-phosphor">Spatial AI Logic</span>
              </p>
            </div>
          </div>
        </section>
            </motion.div>
          )}

          {currentPage === 'home' && (
            <motion.div
              key="page-home-showcase"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {/* Visual Showcase Gallery: Infinite Moving Strip */}
              <section id="showcase" className="py-24 px-0 bg-dark-obsidian overflow-hidden relative border-y border-phosphor/10">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center font-mono">
            <h3 className="text-3xl md:text-5xl font-display font-medium mb-4 uppercase tracking-normal text-white">Technical Showcase</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
              Explore the Neurix ecosystem through our dynamic interactive gallery.
            </p>
          </div>
          
          <div className="relative flex overflow-hidden py-12">
            {/* Background Text Overlay for the strip */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="text-[20rem] font-black whitespace-nowrap text-phosphor/10"
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
                  {/* Stylized Phosphor Text */}
                  <div className="flex flex-col items-center justify-center px-12 group font-mono">
                    <motion.span 
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                      }}
                      className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-phosphor to-slate-500 bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(255,159,0,0.15)]"
                    >
                      NEURIX
                    </motion.span>
                    <motion.div 
                      animate={{ 
                        width: ["0%", "100%", "0%"],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="h-px bg-gradient-to-r from-transparent via-phosphor to-transparent mt-4" 
                    />
                  </div>

                  {/* Image 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-none border border-phosphor/30 hover:border-phosphor bg-dark-charcoal shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-obsidian via-dark-obsidian/40 to-transparent opacity-95" />
                    <div className="absolute bottom-0 left-0 p-10 font-mono">
                      <h5 className="text-2xl font-bold text-white mb-1 uppercase">Smart Interface</h5>
                      <p className="text-xs text-phosphor font-black uppercase tracking-widest">// Interaction Mapping</p>
                    </div>
                  </motion.div>

                  {/* Image 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-none border-2 border-phosphor/30 hover:border-phosphor bg-dark-charcoal shadow-2xl"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/beautiful_workspace.jpg" 
                        alt="Future Workspace Table" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1200"; // Beautiful Workspace placeholder
                        }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 " 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-obsidian via-dark-obsidian/40 to-transparent opacity-95" />
                    <div className="absolute bottom-0 left-0 p-10 font-mono">
                      <h5 className="text-2xl font-bold text-white mb-1 uppercase">Future Workspace</h5>
                      <p className="text-xs text-phosphor font-black uppercase tracking-widest">// Next-Gen Collaboration</p>
                    </div>
                  </motion.div>

                  {/* Image 3 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1.5, y: -10 }}
                    className="w-[380px] md:w-[550px] flex-shrink-0 group relative overflow-hidden rounded-none border-2 border-phosphor/30 hover:border-phosphor bg-dark-charcoal shadow-2xl"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-obsidian via-dark-obsidian/40 to-transparent opacity-95" />
                    <div className="absolute bottom-0 left-0 p-10 font-mono">
                      <h5 className="text-2xl font-bold text-white mb-1 uppercase">Advanced Projection</h5>
                      <p className="text-xs text-phosphor font-black uppercase tracking-widest">// Optical Logic</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
            </motion.div>
          )}

          {currentPage === 'home' && (
            <motion.div
              key="page-home-team"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {/* Roadmap Command Matrix - Org Chart Style */}
              <section id="roadmap" className="py-32 px-6 relative overflow-hidden bg-dark-obsidian">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-phosphor/20 rounded-full animate-[pulse_10s_infinite]" />
           </div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-6">
                  Structural Hierarchy
                </div>
                <h3 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase">NEURIX Org Chart</h3>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
                  The mission-critical leadership structure driving the Neurix initiative.
                </p>
              </div>

              {/* Org Chart Visualization */}
              <div className="flex flex-col items-center">
                {/* 1. Level 1: Team Leader */}
                <div className="relative mb-32 flex flex-col items-center">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono">
                    <span className="text-3xl md:text-5xl font-black text-phosphor uppercase tracking-[0.2em] border-b-2 border-phosphor pb-2">// TEAM LEADER</span>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(teamData.leader)}
                    className="relative p-0.5 rounded-none bg-phosphor/20 hover:bg-phosphor cursor-pointer group transition-all"
                  >
                    <div className="bg-dark-charcoal px-16 py-10 rounded-none text-center min-w-[320px] border border-phosphor/30 shadow-[0_0_40px_rgba(255,159,0,0.15)]">
                      <Hexagon className="w-12 h-12 text-phosphor mx-auto mb-4 group-hover:rotate-180 transition-transform duration-1000" />
                      <h4 className="text-3xl font-mono font-black tracking-tighter text-white uppercase">{teamData.leader?.name}</h4>
                      <p className="text-xs font-mono font-black text-phosphor uppercase tracking-[0.3em] mt-2">{teamData.leader?.role}</p>
                    </div>
                  </motion.div>
                  
                  {/* Stem Down to Level 2 */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 w-px bg-phosphor/55" />
                </div>

                {/* 2. Level 2: Project Management / Technical Lead (Mohamed Asem) */}
                <div className="relative mb-24 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(teamData.deputy)}
                    className="relative p-0.5 rounded-none bg-phosphor/20 hover:bg-phosphor cursor-pointer group transition-all"
                  >
                    <div className="bg-dark-charcoal px-12 py-8 rounded-none text-center min-w-[280px] border border-phosphor/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                      <Microchip className="w-8 h-8 text-phosphor mx-auto mb-3" />
                      <h4 className="text-2xl font-mono font-black tracking-tighter text-white uppercase">{teamData.deputy?.name}</h4>
                      <p className="text-[10px] font-mono font-black text-phosphor uppercase tracking-widest mt-1">{teamData.deputy?.role}</p>
                    </div>
                  </motion.div>

                  {/* Stem Down to Divisions */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 w-px bg-phosphor/40" />
                </div>

                {/* Level 3: Divisions */}
                <div className="w-full relative">
                  {/* Horizontal Bar Connecting All 4 Branches */}
                  <div className="absolute top-[-48px] left-[12.5%] right-[12.5%] h-px bg-phosphor/20" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12">
                    
                    {/* Left Branch: Software Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-phosphor/30" />
                      
                      <div className="mb-12 relative flex flex-col items-center w-full">
                        <div 
                          onClick={() => setSelectedMember(teamData.softManager)}
                          className="px-6 py-4 rounded-none bg-dark-charcoal border border-phosphor/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] cursor-pointer text-center min-w-[185px] hover:border-phosphor hover:-translate-y-1 transition-all duration-300 group"
                        >
                           <Zap className="w-5 h-5 text-phosphor mx-auto mb-2 group-hover:scale-110 transition-transform" />
                           <h5 className="text-base font-mono font-bold text-white uppercase tracking-tight">Software</h5>
                           <p className="text-[8px] font-mono font-black text-phosphor uppercase tracking-widest mt-1">Lead: {teamData.softManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-phosphor/15" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[185px] font-mono">
                        {teamData.softTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: 5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2.5 p-2.5 rounded-none bg-dark-charcoal border border-phosphor/10 hover:border-phosphor/50 hover:bg-phosphor/5 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-phosphor group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-phosphor/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 2: Presentation Team */}
                    <div className="flex flex-col items-center relative font-mono">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-phosphor/30" />
                      
                      <div className="mb-12 relative flex flex-col items-center w-full">
                        <div 
                          onClick={() => setSelectedMember(teamData.presManager)}
                          className="px-6 py-4 rounded-none bg-dark-charcoal border border-phosphor/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] cursor-pointer text-center min-w-[175px] hover:border-phosphor hover:-translate-y-1 transition-all duration-300 group"
                        >
                           <Megaphone className="w-5 h-5 text-phosphor mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight">Presentation</h5>
                           <p className="text-[8px] font-black text-phosphor uppercase tracking-widest mt-1">Lead: {teamData.presManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-phosphor/15" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[175px]">
                        {teamData.presentationTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, y: -2 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2.5 p-2.5 rounded-none bg-dark-charcoal border border-phosphor/10 hover:border-phosphor/50 hover:bg-phosphor/5 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-phosphor group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-phosphor/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 3: Research Team */}
                    <div className="flex flex-col items-center relative font-mono">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-phosphor/30" />
                      
                      <div className="mb-12 relative flex flex-col items-center w-full">
                        <div 
                          onClick={() => setSelectedMember(teamData.resManager)}
                          className="px-6 py-4 rounded-none bg-dark-charcoal border border-phosphor/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] cursor-pointer text-center min-w-[175px] hover:border-phosphor hover:-translate-y-1 transition-all duration-300 group"
                        >
                           <Search className="w-5 h-5 text-phosphor mx-auto mb-2 group-hover:scale-110 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight">Research</h5>
                           <p className="text-[8px] font-black text-phosphor uppercase tracking-widest mt-1">Lead: {teamData.resManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-phosphor/15" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[175px]">
                        {teamData.researchTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: -5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2.5 p-2.5 rounded-none bg-dark-charcoal border border-phosphor/10 hover:border-phosphor/50 hover:bg-phosphor/5 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-phosphor group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-phosphor/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 4: Hardware Support / Team */}
                    <div className="flex flex-col items-center relative font-mono">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-phosphor/30" />
                      
                      <div className="mb-12 relative flex flex-col items-center w-full">
                        <div 
                          onClick={() => setSelectedMember(teamData.hardManager)}
                          className="px-6 py-4 rounded-none bg-dark-charcoal border border-phosphor/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] cursor-pointer text-center min-w-[185px] hover:border-phosphor hover:-translate-y-1 transition-all duration-300 group"
                        >
                           <Microchip className="w-5 h-5 text-phosphor mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight">Hardware</h5>
                           <p className="text-[8px] font-black text-phosphor uppercase tracking-widest mt-1">Lead: {teamData.hardManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-phosphor/15" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[185px]">
                        {teamData.hardTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: -5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2.5 p-2.5 rounded-none bg-dark-charcoal border border-phosphor/10 hover:border-phosphor/50 hover:bg-phosphor/5 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-phosphor group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-phosphor/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
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
        <section className="py-32 px-6 bg-dark-obsidian border-y border-phosphor/10">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="flex-1">
                    <div className="w-12 h-[2px] bg-phosphor mb-8" />
                    <h3 className="text-4xl font-display font-medium mb-6 text-white uppercase">Functional Inter-Matrix</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 font-sans">
                       The NEURIX project operates through a synchronized functional matrix, where each division feeds critical data into the centralized core logic.
                    </p>
                    <div className="grid grid-cols-2 gap-6 font-mono">
                       {[
                         { label: "Data Loop", value: "Real-time" },
                         { label: "Latency", value: "< 15ms" },
                         { label: "Architecture", value: "Distributed" },
                         { label: "Redundancy", value: "99.9%" }
                       ].map(stat => (
                         <div key={stat.label} className="p-4 rounded-none bg-dark-charcoal border border-phosphor/15">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                           <p className="text-xl font-bold text-phosphor">{stat.value}</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="flex-1 w-full relative aspect-square md:aspect-video rounded-none overflow-hidden border border-phosphor/20 group">
                    <div className="absolute inset-0 bg-phosphor/[0.02] z-10 group-hover:opacity-0 transition-opacity duration-700" />
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
                            className="absolute inset-0 border border-dashed border-phosphor/30 rounded-full"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-phosphor/20 rounded-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Hexagon className="w-12 h-12 text-white animate-pulse" />
                          </div>
                       </div>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-dark-charcoal/80 backdrop-blur-md px-4 py-2 rounded-none border border-phosphor/30 hover:border-phosphor/60 z-30 font-mono">
                       <p className="text-[10px] font-black text-phosphor uppercase tracking-widest">// Hardware Module v1.0</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
            </motion.div>
          )}

          {currentPage === 'home' && (
            <motion.div
              key="page-live-demo-workspace"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <section id="live-demo-section" className="py-24 px-6 border-y border-phosphor/10 bg-dark-obsidian">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-6 animate-pulse">
                🚀 LIVE TELEMETRY DASHBOARD
              </div>
              <h3 className="text-4xl md:text-6xl font-display font-medium mb-4 uppercase text-white">Signal Diagnostics</h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Simulate analog waveforms, test digital frequency modulation, and toggle active MCU pins directly. This experimental dashboard simulates direct serial control systems designed by the NEURIX hardware integration team.
              </p>
            </div>

            {/* High-tech Tab Selector */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 font-mono">
              <button 
                onClick={() => setActiveDemoTab('signal')}
                className={`w-full sm:w-auto px-8 py-4 font-mono text-xs font-black uppercase tracking-widest border transition-all cursor-pointer relative ${
                  activeDemoTab === 'signal'
                    ? 'bg-phosphor border-phosphor text-dark-obsidian font-bold shadow-[0_0_20px_rgba(255,159,0,0.35)] font-black'
                    : 'bg-dark-charcoal/60 border-phosphor/15 text-phosphor/60 hover:text-white hover:bg-phosphor/5'
                }`}
              >
                <span>Diagnostics Oscilloscope</span>
              </button>
              <button 
                onClick={() => setActiveDemoTab('synaptic')}
                className={`w-full sm:w-auto px-8 py-4 font-mono text-xs font-black uppercase tracking-widest border transition-all cursor-pointer relative ${
                  activeDemoTab === 'synaptic'
                    ? 'bg-phosphor border-phosphor text-dark-obsidian font-bold shadow-[0_0_20px_rgba(255,159,0,0.35)] font-black'
                    : 'bg-dark-charcoal/60 border-phosphor/15 text-phosphor/60 hover:text-white hover:bg-phosphor/5'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SYNAPSE MIND-LINK</span>
                </div>
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoTab === 'signal' ? (
                <motion.div
                  key="signal-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <LiveGestureDemo />
                </motion.div>
              ) : (
                <motion.div
                  key="synaptic-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <SynapticMindLink />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
            </motion.div>
          )}

          

          {currentPage === 'home' && (
            <motion.div
              key="page-contact-hub"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {/* Contact Hub: Digital Portal */}
              <section id="contact-hub" className="py-32 px-6 relative border-t border-phosphor/10 bg-dark-obsidian overflow-hidden">
          <div className="absolute inset-0 bg-phosphor/[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20 font-mono">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-phosphor/10 border border-phosphor/30 text-phosphor text-[10px] font-mono uppercase tracking-[0.4em] mb-6"
              >
                The Connection Nexus
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-display font-medium mb-6 uppercase text-white">
                // System Portal
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
                Bridge the gap between vision and reality. Access our official networks and technical repositories below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                { name: "GitHub Repository", desc: "View the core system source code and technical desktop application documentation.", icon: <Github className="w-6 h-6" />, color: "from-phosphor/10 to-transparent", link: "https://github.com/Mostafa8269/Neurix-desktop-app" },
                { name: "Instagram Gallery", desc: "Visual showcase of our hardware iterations and design lab.", icon: <Instagram className="w-6 h-6" />, color: "from-phosphor/10 to-transparent", link: "https://www.instagram.com/neurixfeed?igsh=cGJtcDEzZHBjOGw" },
                { name: "Official Email", desc: "Direct inquiry line for partnerships and technical collaboration.", icon: <Mail className="w-6 h-6" />, color: "from-phosphor/10 to-transparent", link: "mailto:neurixt@gmail.com" },
              ].map((hub, i) => (
                <motion.a
                  key={hub.name}
                  href={hub.link}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-full flex flex-col p-8 rounded-none bg-dark-charcoal border border-phosphor/10 hover:border-phosphor/50 transition-all duration-500 shadow-xl overflow-hidden font-mono"
                >
                  {/* Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.color} opacity-[0.03] group-hover:opacity-20 blur-[40px] transition-opacity duration-500`} />
                  
                  <div className={`w-12 h-12 rounded-none bg-phosphor/10 border border-phosphor/30 flex items-center justify-center text-phosphor mb-8 group-hover:bg-phosphor group-hover:text-dark-charcoal transition-all duration-500`}>
                    {hub.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-phosphor transition-colors flex items-center gap-2">
                      {hub.name}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </h4>
                    <p className="text-slate-450 leading-relaxed text-sm font-sans">
                      {hub.desc}
                    </p>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className="mt-8 h-[2px] w-0 group-hover:w-full bg-phosphor transition-all duration-700" />
                </motion.a>
              ))}
            </div>

            {/* Special Callout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 p-0.5 rounded-none bg-phosphor/20"
            >
              <div className="bg-dark-charcoal rounded-none px-8 py-10 text-center flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 border border-phosphor/30 font-mono">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-none bg-phosphor/10 flex items-center justify-center border border-phosphor/20">
                    <Globe className="w-8 h-8 text-phosphor animate-pulse" />
                  </div>
                  <div className="text-left font-sans">
                    <h5 className="text-xl font-bold font-mono text-white uppercase tracking-tight">Technical Partnership</h5>
                    <p className="text-slate-450 text-sm mt-1">Seeking investors and hardware manufacturers for Q3 2026 expansion.</p>
                  </div>
                </div>
                <button className="px-10 py-5 bg-phosphor hover:bg-white text-dark-charcoal font-black uppercase tracking-widest text-sm rounded-none transition-all shadow-[0_4px_25px_rgba(255,159,0,0.15)] hover:shadow-[0_8px_35px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 font-mono">
                  Connect Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>
            </motion.div>
          )}

        <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

          {currentPage === 'home' && (
            <motion.div
              key="page-home-cta"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {/* CTA */}
              <section className="py-20 md:py-32 px-4 md:px-6 border-t border-phosphor/10 bg-dark-charcoal/30">
          <div className="max-w-5xl mx-auto rounded-none bg-phosphor/25 p-0.5">
            <div className="bg-dark-obsidian rounded-none p-8 md:p-24 text-center border border-phosphor/20 font-mono">
              <h3 className="text-3xl md:text-6xl font-display font-medium mb-6 md:mb-8 leading-tight uppercase text-white">
                "Your Hand, <span className="text-phosphor">Your World</span>"
              </h3>
              <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
                Join us on our journey to create the most intuitive hardware-software system for tangible human interaction and digital command loop systems.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-mono">
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-none bg-dark-charcoal border border-phosphor/25">
                  <Microchip className="w-5 h-5 md:w-6 md:h-6 text-phosphor" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] uppercase font-bold text-slate-500 tracking-wider">Tech Stack</p>
                    <p className="text-xs md:text-sm font-bold text-slate-200">Embedded IoT</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-none bg-dark-charcoal border border-phosphor/25">
                  <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-phosphor" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] uppercase font-bold text-slate-500 tracking-wider">Engine</p>
                    <p className="text-xs md:text-sm font-bold text-slate-200">AI Processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-none bg-dark-charcoal border border-phosphor/25">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-phosphor" />
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] uppercase font-bold text-slate-500 tracking-wider">Scope</p>
                    <p className="text-xs md:text-sm font-bold text-slate-200">Global Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        <footer className="py-16 border-t border-phosphor/10 bg-dark-obsidian px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 font-mono">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-4 cursor-pointer hover:opacity-90 active:scale-95 transition-all group"
            >
              <NeurixLogo className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div>
                <p className="text-sm font-mono font-bold text-slate-200 group-hover:text-phosphor transition-colors tracking-widest">// NEURIX</p>
                <p className="text-xs text-slate-500">© 2026 Neurix Project Team. All Rights Reserved.</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 text-slate-400">
              <div className="flex items-center gap-2 hover:text-phosphor transition-colors cursor-pointer group">
                <Mail className="w-4 h-4 text-phosphor group-hover:scale-110 transition-transform" />
                <a href="mailto:neurixt@gmail.com" className="text-sm font-medium">neurixt@gmail.com</a>
              </div>
              <div className="flex items-center gap-6">
                 <Calendar className="w-4 h-4 text-phosphor" />
                 <p className="text-sm">Founded Feb 11, 2026</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}