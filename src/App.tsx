import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoldCinematicIntro } from './components/GoldCinematicIntro';
import { DarkNeonCursorSpotlight } from './components/DarkNeonCursorSpotlight';
import { ScrollEffects } from './components/ScrollEffects';
import { BackgroundSpatialDepth } from './components/BackgroundSpatialDepth';
import { NeurixNavbar } from './components/NeurixNavbar';
import { NeurixHero } from './components/NeurixHero';
import { GlowingNeurixMarquee } from './components/GlowingNeurixMarquee';
import { RoadmapNugget } from './components/RoadmapNugget';
import { LiveGestureDemo } from './components/LiveGestureDemo';
import { TeamNetworkConnectome } from './components/TeamNetworkConnectome';
import { FutureWorkSection } from './components/FutureWorkSection';
import { MemberProfileModal } from './components/MemberProfileModal';
import { NeurixFooter } from './components/NeurixFooter';
import { TeamMember } from './types';
import { Users } from 'lucide-react';

const RevealSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [showGoldIntro, setShowGoldIntro] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Set document title
  useEffect(() => {
    document.title = 'NEURIX — Spatial Interface Matrix';
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-[#F2FAFF] selection:bg-neurix-cyan/30 selection:text-[#F2FAFF] relative overflow-x-hidden font-sans">
      
      {/* 1. Cinematic Intro */}
      {showGoldIntro && (
        <GoldCinematicIntro 
          isOpenByDefault={true} 
          onComplete={() => setShowGoldIntro(false)} 
        />
      )}

      {/* 2. Interactive Spotlight */}
      <DarkNeonCursorSpotlight />

      {/* 3. Scroll Progress */}
      <ScrollEffects />

      {/* 4. Background Depth Elements */}
      <BackgroundSpatialDepth />

      {/* 5. Navigation */}
      <NeurixNavbar 
        onNavigateSection={handleNavigateSection} 
        onReplayIntro={() => setShowGoldIntro(true)}
      />

      {/* 5. Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <NeurixHero onNavigateSection={handleNavigateSection} />

        {/* Marquee */}
        <RevealSection delay={0.2}>
          <GlowingNeurixMarquee />
        </RevealSection>

        {/* Engineering Pillars */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050B14] to-transparent z-10" />
          <RevealSection delay={0.1}>
            <RoadmapNugget />
          </RevealSection>
        </div>

        {/* Live Diagnostics */}
        <RevealSection delay={0.1}>
          <LiveGestureDemo />
        </RevealSection>

        {/* Personnel Matrix */}
        <section id="roadmap" className="py-32 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <RevealSection>
              <div className="mb-24 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neurix-cyan/5 border border-neurix-cyan/20 rounded-full mb-8">
                  <Users className="w-3 h-3 text-neurix-cyan" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neurix-cyan">Neural Network</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-[#F2FAFF] tracking-tight leading-[0.9]">
                  OPERATIONAL <br /> <span className="text-neurix-cyan italic">PERSONNEL</span>
                </h2>
              </div>
              <TeamNetworkConnectome onSelectMember={(member) => setSelectedMember(member)} />
            </RevealSection>
          </div>
        </section>
        
        {/* Future Work */}
        <RevealSection delay={0.1}>
          <FutureWorkSection />
        </RevealSection>

      </main>

      {/* 6. Footer */}
      <NeurixFooter />

      {/* 7. Member Profile Modal */}
      <MemberProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

    </div>
  );
}
