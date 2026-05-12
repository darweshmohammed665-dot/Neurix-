/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Award
} from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: "Mostafa Abdelrahman Mohamed Elsaid", role: "Team Leader & Systems Architect" },
  { id: 2, name: "Mohamed Assem Salah Hamed", role: "Hardware Integration Lead" },
  { id: 3, name: "Mariam Tarek Mohamed Gharib", role: "Software Engineering Lead" },
  { id: 4, name: "Mariam Abdelsadeq Abdelwahed Abdelsadeq", role: "Embedded Systems Developer" },
  { id: 5, name: "Mariam Ahmed Mohamed Fouad", role: "UI/UX & Tangible Interface Design" },
  { id: 6, name: "Mariam Hassan Ali Hassan", role: "AI Model Researcher" },
  { id: 7, name: "Mohamed Abdullah Mohamed Abdelhamed", role: "IoT Communication Specialist" },
  { id: 8, name: "Mohamed Saaed Aboelmagd Ramadan", role: "Mechanical Design & Prototyping" },
  { id: 9, name: "Dalia Refat Metwally Mahmoud", role: "Data Analysis & Processing" },
  { id: 10, name: "Hala Walid Ali Abdullah", role: "Quality Assurance & Testing" },
  { id: 11, name: "Jana Mohamed Hassan El Sharnouby", role: "Front-end Development" },
  { id: 12, name: "Mohamed Alaa Abdel Fattah Mahmoud", role: "Sensing Technologies Expert" },
  { id: 13, name: "Malak Sabry Mostafa El Sayed", role: "Backend Systems Architect" },
  { id: 14, name: "Damiana Aziz Awad Aziz", role: "Circuit Design & Optimization" },
  { id: 15, name: "Haneen Masoud Mohie Gab Allah", role: "Research & Documentation" },
  { id: 16, name: "Ahmed Mohamed Mahmoud El Didamony", role: "Control Systems Engineer" },
  { id: 17, name: "Mohamed Yasser El Sayed Abdel Galil", role: "Product Strategy & Media" },
  { id: 18, name: "Abdelrahman Emad Shaaban Hamada", role: "Support Engineer" },
  { id: 19, name: "Bilal Ahmed Abdel Hakim", role: "Logistics & Resource Management" },
  { id: 20, name: "Basmala Mostafa Hassanein Aly", role: "System Documentation" },
];

const OBJECTIVES = [
  {
    title: "Innovative Solutions",
    arabicTitle: "حلول مبتكرة",
    description: "Developing smart, cost-effective solutions using Embedded Systems to push the boundaries of interaction.",
    icon: <Cpu className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Integration",
    arabicTitle: "التكامل",
    description: "Merging hardware and software to create a highly interactive and automated system that bridges the physical and digital worlds.",
    icon: <Layers className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Practical Impact",
    arabicTitle: "التأثير العملي",
    description: "Utilizing IoT and AI technologies to solve real-world challenges efficiently with high-tech sensors.",
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  }
];

const NeurixLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <motion.div 
    className={`relative ${className}`}
    whileHover={{ scale: 1.05 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      {/* Outer abstract shape */}
      <motion.path 
        d="M20,30 L50,10 L80,30 L80,70 L50,90 L20,70 Z" 
        fill="none" 
        stroke="url(#logoGradient)" 
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* The 'N' structure */}
      <path 
        d="M35,65 L35,35 L65,65 L65,35" 
        fill="none" 
        stroke="url(#logoGradient)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Neural points */}
      <motion.circle 
        cx="35" cy="35" r="3" fill="#3b82f6"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="65" cy="65" r="3" fill="#eab308"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </svg>
    <div className="absolute inset-0 bg-blue-600/30 blur-xl rounded-full -z-10 animate-pulse" />
  </motion.div>
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-blue-600/40">

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-700/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[140px] rounded-full" />
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NeurixLogo className="w-12 h-12" />
            <div>
              <h1 className="font-bold text-2xl tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NEURIX</h1>
              <p className="text-[10px] text-yellow-400 tracking-[0.3em] font-black uppercase mt-1">Project 2026</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-yellow-400 transition-colors">About</a>
            <a href="#core-concept" className="text-sm font-medium hover:text-yellow-400 transition-colors">Core Concept</a>
            <a href="#objectives" className="text-sm font-medium hover:text-yellow-400 transition-colors">Objectives</a>
            <a href="#team" className="text-sm font-medium hover:text-yellow-400 transition-colors">Team Members</a>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 hover:text-black transition-all active:scale-95">
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Active Project
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-400">Interactive</span> Hardware-Software System.
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
                Developing the next generation of tangible interaction. Bringing your hand into your world with seamless sensor integration and advanced embedded logic.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <button className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20">
                  Explore Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-yellow-400" />
                </button>
                <div className="flex items-center gap-4 px-6 text-slate-400 border-l border-white/10 ml-2">
                  <div className="text-center">
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-1">Started</p>
                    <p className="font-mono text-slate-200">2026/02/11</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
              <div className="flex items-center gap-4">
                <GraduationCap className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Institution</p>
                  <p className="text-lg font-semibold">Borg Al Arab Technological University</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l md:border-l-0 pl-8 md:pl-0 border-white/10">
                <MapPin className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Faculty</p>
                  <p className="text-lg font-semibold">Industrial and Energy Technology</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Program</p>
                  <p className="text-lg font-semibold">Industry Technology Program</p>
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

              <div className="bg-black rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full point-events-none" />
                <h4 className="text-2xl font-bold mb-8">How It Works</h4>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-600 before:to-transparent">
                  {/* Step 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-black bg-blue-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] z-10">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <h5 className="font-bold text-yellow-400 mb-1">Input Layer</h5>
                      <p className="text-sm text-slate-400">A camera captures the user's hand movements and gestures in the air.</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-black bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(37,99,235,0.2)] z-10">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-600/50 transition-colors">
                      <h5 className="font-bold text-yellow-400 mb-1">Processing Layer</h5>
                      <p className="text-sm text-slate-400">Analyzes movements in real-time, recognizes patterns, and maps to commands.</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-black bg-blue-700 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(29,78,216,0.2)] z-10">
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

        {/* Project Vision Images */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                Project Vision
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">Scalability & Future Potential</h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Neurix is designed as an expandable interactive device that can evolve into professional-grade deployments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <div className="relative rounded-3xl overflow-hidden aspect-video mb-6 border border-white/10 group-hover:border-blue-500/50 transition-colors bg-gradient-to-br from-blue-900/40 to-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-2xl font-bold text-white mb-1">Plan A</h4>
                    <p className="text-blue-300">Interactive Holographic Table</p>
                  </div>
                </div>
              </div>
              
              <div className="group md:mt-24">
                <div className="relative rounded-3xl overflow-hidden aspect-video mb-6 border border-white/10 group-hover:border-yellow-500/50 transition-colors bg-gradient-to-br from-yellow-900/40 to-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-2xl font-bold text-white mb-1">Plan B</h4>
                    <p className="text-yellow-300">Touchless Control Environment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
               <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                 <p className="font-semibold text-slate-300">Education Tech</p>
               </div>
               <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                 <p className="font-semibold text-slate-300">Interactive Exhibitions</p>
               </div>
               <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                 <p className="font-semibold text-slate-300">Smart Industry</p>
               </div>
               <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                 <p className="font-semibold text-slate-300">Medical Control</p>
               </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section id="objectives" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h3 className="text-4xl font-bold mb-4">Project Objectives</h3>
              <p className="text-slate-500 text-lg">الحافز وراء الفكرة - The drive behind our innovation</p>
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
                  <p className="text-cyan-400 font-medium mb-4 text-sm uppercase tracking-widest">{obj.arabicTitle}</p>
                  <p className="text-slate-400 leading-relaxed">
                    {obj.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-32 px-6 bg-gradient-to-b from-transparent to-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div>
                <h3 className="text-4xl font-bold mb-4">The Neurix Team</h3>
                <p className="text-slate-400 text-lg max-w-xl">
                  A multi-disciplinary group of 20 pioneers working together to redefine tangible hardware interaction.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                <Users className="w-5 h-5 ml-4 text-yellow-400" />
                <span className="px-4 py-2 font-bold text-sm bg-blue-600 text-white rounded-lg">20 Members</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 8) * 0.05 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-xs font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {member.id < 10 ? `0${member.id}` : member.id}
                    </div>
                    <h5 className="font-bold text-lg mb-1 leading-snug group-hover:text-yellow-400 transition-colors">
                      {member.name}
                    </h5>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <ArrowRight className="w-3 h-3 text-yellow-400" />
                       {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-600 to-yellow-500 p-1">
            <div className="bg-black rounded-[2.9rem] p-12 md:p-24 text-center">
              <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                "Your Hand, Your World"
              </h3>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                Join us on our journey to create the most intuitive hardware-software system for humanity.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10">
                  <Microchip className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Tech Stack</p>
                    <p className="font-bold">Embedded IoT</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10">
                  <BrainCircuit className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Engine</p>
                    <p className="font-bold">AI Processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10">
                  <Globe className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Scope</p>
                    <p className="font-bold">Global Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
  );
}
