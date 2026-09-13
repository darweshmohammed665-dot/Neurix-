import React, { useState, useEffect } from 'react';
import { GoldCinematicIntro } from './components/GoldCinematicIntro';
import { DarkNeonCursorSpotlight } from './components/DarkNeonCursorSpotlight';
import { ScrollEffects } from './components/ScrollEffects';
import { NeurixNavbar } from './components/NeurixNavbar';
import { NeurixHero } from './components/NeurixHero';
import { GlowingNeurixMarquee } from './components/GlowingNeurixMarquee';
import { RoadmapNugget } from './components/RoadmapNugget';
import { IoTSystemVisualizer } from './components/IoTSystemVisualizer';
import { SynapticMindLink } from './components/SynapticMindLink';
import { LiveGestureDemo } from './components/LiveGestureDemo';
import { TelemetryChannelGrid } from './components/TelemetryChannelGrid';
import { TeamMatrixSection } from './components/TeamMatrixSection';
import { FutureWorkSection } from './components/FutureWorkSection';
import { MemberProfileModal } from './components/MemberProfileModal';
import { NeurixFooter } from './components/NeurixFooter';
import { TeamMember } from './types';

export default function App() {
  const [showGoldIntro, setShowGoldIntro] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Set document title
  useEffect(() => {
    document.title = 'NEURIX — Touchless Spatial Interface';
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F9FAFB] selection:bg-[#FBBF24]/30 selection:text-[#F9FAFB] relative overflow-x-hidden font-sans">
      
      {/* 1. Cinematic "New Tricks" Gold Background Video Animation on Open */}
      {showGoldIntro && (
        <GoldCinematicIntro 
          isOpenByDefault={true} 
          onComplete={() => setShowGoldIntro(false)} 
        />
      )}

      {/* 2. Interactive Dark Neon Cursor Spotlight Glow */}
      <DarkNeonCursorSpotlight />

      {/* 3. Scroll Progress & Floating Controller */}
      <ScrollEffects />

      {/* 4. Top Fixed Navigation Bar with Replay Intro Button */}
      <NeurixNavbar 
        onNavigateSection={handleNavigateSection} 
        onReplayIntro={() => setShowGoldIntro(true)}
      />

      {/* 4. Main Portal View Sections */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <NeurixHero onNavigateSection={handleNavigateSection} />
        {/* Glowing Scrolling Marquee */}
        <GlowingNeurixMarquee />


        {/* Engineering Pillars / About Concept */}
        <RoadmapNugget />

        {/* Live Diagnostics: Oscilloscope & Gesture Tracker (Kept as project shape/demo) */}
        <LiveGestureDemo />

        {/* Team Org Chart Matrix */}
        <TeamMatrixSection onSelectMember={(member) => setSelectedMember(member)} />
        
        {/* Future Work Section */}
        <FutureWorkSection />

      </main>

      {/* 5. System Portal & Footer */}
      <NeurixFooter />

      {/* 6. Member Dossier Modal */}
      <MemberProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

    </div>
  );
}
