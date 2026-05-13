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
  Smartphone
} from 'lucide-react';

const TEAM_MEMBERS = [
  // Leadership
  { id: 1, name: "Mustafa Abdelrahman", role: "Team Leader & Systems Architect", team: "Governance", category: "Leadership" },

  // Overall Technical Management / Deputy
  { id: 3, name: "Mohamed Asem", role: "Team Coordinator", team: "Governance", category: "Management" },

  // Software Management
  { id: 2, name: "Mohamed Said", role: "Software Division Manager", team: "Software", category: "Software Management" },
  
  // Software Division
  { id: 4, name: "Malak Sabry", role: "Backend Developer", team: "Software", category: "Backend / Logic" },
  { id: 5, name: "Mariam Hassan", role: "Backend Developer", team: "Software", category: "Backend / Logic" },
  { id: 6, name: "Dalia Refaat", role: "CV Developer (OpenCV)", team: "Software", category: "Camera & Vision" },
  { id: 7, name: "Mohamed Abdullah", role: "CV Developer (OpenCV)", team: "Software", category: "Camera & Vision" },
  { id: 8, name: "Mohamed Saeed", role: "Frontend Developer", team: "Software", category: "Frontend / GUI" },
  { id: 9, name: "Jana Mohamed", role: "Frontend Developer", team: "Software", category: "Frontend / GUI" },
  
  // Hardware Management
  { id: 10, name: "Mariam Tarek", role: "Hardware Division Manager", team: "Hardware", category: "Hardware Management" },

  // Hardware Division (Stage & Setup)
  { id: 11, name: "Mohamed Elsaid", role: "Stage & Setup specialist", team: "Hardware", category: "Stage & Setup" },
  { id: 12, name: "Ahmed El Didamony", role: "Hardware presenter", team: "Hardware", category: "Hardware Team" },
  { id: 13, name: "Damiana Aziz", role: "Hardware Operations", team: "Hardware", category: "Hardware Team" },
  { id: 14, name: "Mariam Ahmed", role: "Electricity Specialist", team: "Hardware", category: "Hardware Team" },
  { id: 15, name: "Haneen Abdo", role: "Electricity Tech", team: "Hardware", category: "Hardware Team" },
  
  // Presentation & Research (Affiliated with Project Governance)
  { id: 16, name: "Mariam Abdelsadeq", role: "Presentation Lead", team: "Presentation", category: "Presentation" },
  { id: 17, name: "Hala Walid", role: "Presentation Specialist", team: "Presentation", category: "Presentation" },
  { id: 18, name: "Haneen Masoud", role: "Presentation Media", team: "Presentation", category: "Presentation" },
  { id: 19, name: "Mohamed Alaa", role: "Presentation Support", team: "Presentation", category: "Presentation" },
  { id: 20, name: "Basmala Mostafa", role: "Research Head", team: "Presentation", category: "Research" },
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

  const teamData = useMemo(() => {
    return {
      leader: TEAM_MEMBERS.find(m => m.id === 1) || null,
      deputy: TEAM_MEMBERS.find(m => m.id === 3) || null,
      softManager: TEAM_MEMBERS.find(m => m.id === 2) || null,
      hardManager: TEAM_MEMBERS.find(m => m.id === 10) || null,
      softTeam: TEAM_MEMBERS.filter(m => m.team === "Software" && m.id !== 2),
      hardTeam: (() => {
        const members = TEAM_MEMBERS.filter(m => m.team === "Hardware" && m.id !== 10 && m.category !== "Stage & Setup");
        // Sort so Damiana(13) then Ahmed(12) are first
        return members.sort((a, b) => {
          if (a.id === 13) return -1;
          if (b.id === 13) return 1;
          if (a.id === 12) return -1;
          if (b.id === 12) return 1;
          return 0;
        });
      })(),
      presentationTeam: TEAM_MEMBERS.filter(m => m.team === "Presentation")
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 text-slate-100 font-sans selection:bg-yellow-500/20 relative">
      {/* Global Soft Golden/Yellow Glow */}
      <div className="fixed inset-0 pointer-events-none z-[100] shadow-[inset_0_0_150px_rgba(234,179,8,0.15)]" />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-blue-500/10 blur-[120px] md:blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-amber-500/10 blur-[120px] md:blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] md:w-[30%] h-[40%] bg-blue-700/10 blur-[120px] md:blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <AnimatePresence>
          {isLoading && (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {/* Header / Nav */}
        <header className="sticky top-0 z-50 border-b border-yellow-500/50 shadow-[0_4px_30px_-5px_rgba(234,179,8,0.25)] bg-gradient-to-b from-yellow-950/40 to-blue-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-auto py-2 md:py-3 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-16 bg-slate-500/10 blur-[30px] rounded-full pointer-events-none" />
            <NeurixLogo className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
            <div className="text-left relative z-10 pb-0.5 mt-1">
              <motion.h1 
                className="font-bold text-lg md:text-xl tracking-wider leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-yellow-400 to-slate-400"
                style={{ backgroundSize: '200% auto' }}
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                NEURIX
              </motion.h1>
              <p className="text-[7px] md:text-[8px] text-slate-400 tracking-[0.3em] font-black uppercase mt-0.5">Project 2026</p>
            </div>
          </div>
          <nav className="flex flex-row items-center justify-end gap-3 md:gap-8 overflow-x-auto no-scrollbar shrink-0">
            <a href="#about" className="text-[10px] md:text-sm font-medium hover:text-yellow-400 transition-colors whitespace-nowrap">About</a>
            <a href="#core-concept" className="text-[10px] md:text-sm font-medium hover:text-yellow-400 transition-colors whitespace-nowrap">Concept</a>
            <a href="#objectives" className="text-[10px] md:text-sm font-medium hover:text-yellow-400 transition-colors whitespace-nowrap hidden sm:block">Objectives</a>
            <a href="#roadmap" className="text-[10px] md:text-sm font-medium hover:text-yellow-400 transition-colors whitespace-nowrap hidden sm:block">Matrix</a>
            <button className="bg-slate-800 border border-yellow-500/30 text-yellow-400/90 px-4 md:px-6 py-1 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold hover:bg-slate-800/80 hover:border-yellow-400/50 hover:text-yellow-300 hover:shadow-[0_4px_12px_rgba(234,179,8,0.15)] transition-all ease-out duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap ml-1 md:ml-3">
              Connect
            </button>
          </nav>
        </div>
      </header>

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 md:pt-20 pb-24 md:pb-32 overflow-hidden px-6 lg:px-16 w-full">
          {/* Subtle Animated Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] left-[20%] w-[50%] h-[80%] bg-gradient-to-br from-blue-600/10 to-transparent blur-[100px] rounded-full"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 50, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[10%] w-[40%] h-[60%] bg-gradient-to-t from-yellow-500/5 to-transparent blur-[100px] rounded-full transform rotate-45"
            />
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/stardust.png')] opacity-20"
            />
          </div>

          <div className="w-full xl:pl-8 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-yellow-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Active Project
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] md:leading-[1.1]">
                Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-300">Interactive</span> Hardware-Software System.
              </h2>
              <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Developing the next generation of tangible interaction. Bringing your hand into your world with seamless sensor integration and advanced embedded logic.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                <button className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30">
                  Explore Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-yellow-300" />
                </button>
                <div className="flex items-center gap-4 px-6 text-slate-400 border-l border-white/10 sm:ml-2">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">Started</p>
                    <p className="font-mono text-slate-200 text-sm md:text-base">2026/02/11</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 md:opacity-20 pointer-events-none hidden lg:block">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-[500px] h-[500px] border-[1px] border-blue-500/30 rounded-full flex items-center justify-center"
            >
              <div className="w-[400px] h-[400px] border-[1px] border-blue-400/20 rounded-full flex items-center justify-center">
                <div className="w-[300px] h-[300px] border-[1px] border-blue-600/10 rounded-full" />
              </div>
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
        <section id="core-concept" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                  The Core Concept
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6">Vision-Based Touchless Interactive System</h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-6">
                  Neurix is a hardware-software system that enables users to interact with a digital environment using hand gestures in mid-air — without physical contact, controllers, or traditional input devices.
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-slate-300">Transforms interaction from touch-based to spatial, creating a more immersive and futuristic user experience.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-slate-300">Captures hand movements through a camera, analyzes them in real-time, and converts them into meaningful commands.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/50 rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full point-events-none" />
                <h4 className="text-2xl font-bold mb-8">How It Works</h4>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-600 before:to-transparent">
                  {/* Step 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-blue-950 bg-blue-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] z-10">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <h5 className="font-bold text-yellow-400 mb-1">Input Layer</h5>
                      <p className="text-sm text-slate-400">A camera captures the user's hand movements and gestures in the air.</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-blue-950 bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(37,99,235,0.2)] z-10">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-600/50 transition-colors">
                      <h5 className="font-bold text-yellow-400 mb-1">Processing Layer</h5>
                      <p className="text-sm text-slate-400">Analyzes movements in real-time, recognizes patterns, and maps to commands.</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-blue-950 bg-blue-700 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(29,78,216,0.2)] z-10">
                      3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-700/50 transition-colors">
                      <h5 className="font-bold text-yellow-400 mb-1">Output Layer</h5>
                      <p className="text-sm text-slate-400">Executes command instantly — modifying a model, navigating, or triggering response.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <p className="text-yellow-300 font-medium">Move your hand → System understands → System responds instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Application */}
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-bold mb-4">Practical Application</h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Applying the interactive system concept to a real use case: 3D Design for beginners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl">
                <h4 className="text-red-400 font-bold text-xl mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  The Problem
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">×</span>
                    Beginners and children struggle with complex 3D design tools.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">×</span>
                    Printing offices often receive incorrect or incomplete files.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">×</span>
                    Lack of understanding regarding design dimensions required for 3D printing.
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-500/5 border border-green-500/10 p-8 rounded-3xl">
                <h4 className="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Our Initial Solution
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    Simplified 3D design environment using touchless interaction.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    Select ready-made models and modify them using intuitive gesture-based interaction.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    Ensure basic printability conditions automatically to reduce errors.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section id="objectives" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h3 className="text-4xl font-bold mb-4">Project Objectives</h3>
              <p className="text-slate-500 text-lg">The drive behind our innovation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OBJECTIVES.map((obj, i) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all"
                >
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-white/[0.05] group-hover:scale-110 transition-transform">
                    {obj.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{obj.title}</h4>
                  <p className="text-slate-400 leading-relaxed">
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-blue-500/20 rounded-full animate-[pulse_10s_infinite]" />
           </div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
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
                    className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-yellow-400 to-blue-400 shadow-[0_0_50px_rgba(37,99,235,0.3)] cursor-pointer group"
                  >
                    <div className="bg-blue-950 px-16 py-10 rounded-[calc(2.5rem-4px)] text-center min-w-[320px] border border-white/5">
                      <Hexagon className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:rotate-180 transition-transform duration-1000" />
                      <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">{teamData.leader?.name}</h4>
                      <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mt-2">{teamData.leader?.role}</p>
                    </div>
                  </motion.div>
                  
                  {/* Stem Down to Level 2 */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-yellow-400 to-blue-500" />
                </div>

                {/* 2. Level 2: Project Management / Technical Lead (Mohamed Asem) */}
                <div className="relative mb-24 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(teamData.deputy)}
                    className="relative p-1 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.2)] cursor-pointer group"
                  >
                    <div className="bg-blue-950 px-12 py-8 rounded-[calc(2rem-4px)] text-center min-w-[280px] border border-white/10">
                      <Microchip className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                      <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">{teamData.deputy?.name}</h4>
                      <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">{teamData.deputy?.role}</p>
                    </div>
                  </motion.div>

                  {/* Stem Down to Divisions */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50" />
                </div>

                {/* Level 3: Divisions */}
                <div className="w-full relative">
                  {/* Horizontal Bar Connecting All 4 Branches */}
                  <div className="absolute top-[-48px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/40 via-indigo-500/40 via-emerald-500/40 via-orange-500/40 to-blue-400/40" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12">
                    
                    {/* Left Branch: Software Team */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-blue-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedMember(teamData.softManager)}
                          className="px-6 py-4 rounded-3xl bg-blue-900/60 border border-blue-400/50 shadow-[0_10px_30px_rgba(59,130,246,0.15)] backdrop-blur-md cursor-pointer text-center min-w-[180px] hover:scale-105 transition-transform group"
                        >
                           <Zap className="w-5 h-5 text-blue-400 mx-auto mb-2 group-hover:animate-pulse" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight">Software Team</h5>
                           <p className="text-[8px] font-black text-blue-300 uppercase tracking-widest mt-1">Lead: {teamData.softManager?.name}</p>
                        </div>
                        <div className="h-12 w-px bg-blue-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[180px]">
                        {teamData.softTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: 5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-blue-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 2: Presentation & Research */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-emerald-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div className="px-6 py-3 rounded-full bg-emerald-900/40 border border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.1)] backdrop-blur-md text-center min-w-[180px] group transition-all hover:bg-emerald-900/60">
                           <span className="text-[9px] font-black text-emerald-300 uppercase tracking-[0.3em]">Research & Present</span>
                        </div>
                        <div className="h-12 w-px bg-emerald-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[180px]">
                        {teamData.presentationTeam.map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, y: -2 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-emerald-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
                             </div>
                           </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Branch 3: Stage & Setup */}
                    <div className="flex flex-col items-center relative">
                      {/* Line from horizontal bar to branch start */}
                      <div className="hidden md:block absolute top-[-48px] left-1/2 h-12 w-px bg-orange-500/50" />
                      
                      <div className="mb-12 relative flex flex-col items-center">
                        <div className="px-6 py-4 rounded-3xl bg-orange-900/40 border border-orange-500/50 shadow-[0_10px_30px_rgba(249,115,22,0.15)] backdrop-blur-md text-center min-w-[180px] transition-all hover:bg-orange-900/60">
                           <Layers className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                           <h5 className="text-base font-bold text-white uppercase tracking-tight text-orange-200">Stage & Setup</h5>
                           <p className="text-[8px] font-black text-orange-400 uppercase tracking-widest mt-1">Infrastructure</p>
                        </div>
                        <div className="h-12 w-px bg-orange-500/20" />
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full max-w-[180px]">
                        {TEAM_MEMBERS.filter(m => m.category === "Stage & Setup").map((member) => (
                           <motion.div 
                             key={member.id}
                             whileHover={{ scale: 1.02, x: -5 }}
                             onClick={() => setSelectedMember(member)}
                             className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all cursor-pointer shadow-sm group"
                           >
                             <div className="w-1 h-1 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                             <div className="text-left">
                               <p className="text-[10px] font-bold text-slate-100">{member.name}</p>
                               <p className="text-[6px] text-orange-400/70 uppercase tracking-widest leading-none mt-0.5">{member.role}</p>
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
        <section className="py-32 px-6 bg-zinc-950/50 border-y border-white/5">
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-yellow-400/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative w-48 h-48">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full"
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
                 </div>
              </div>
           </div>
        </section>


        <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

        {/* CTA */}
        <section className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-blue-600 to-yellow-400 p-0.5 md:p-1">
            <div className="bg-blue-950 rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-24 text-center">
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
            <div className="flex items-center gap-6">
               <Calendar className="w-4 h-4 text-yellow-400" />
               <p className="text-sm text-slate-400">Founded Feb 11, 2026</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}