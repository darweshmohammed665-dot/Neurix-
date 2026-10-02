import React from 'react';

interface NeurixLogoProps {
  className?: string;
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const NeurixLogo: React.FC<NeurixLogoProps> = ({ 
  className = 'w-10 h-10', 
  glow = true 
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className} group`}>
      {/* Dynamic Cyan Neon Radiance Aura */}
      {glow && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00D9FF]/40 via-[#00D9FF]/20 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none opacity-50 group-hover:opacity-80" />
          <div className="absolute -inset-2 bg-[#00D9FF]/10 rounded-full blur-md animate-pulse pointer-events-none" />
        </>
      )}

      {/* Premium Programmatic SVG Logo */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(0,217,255,0.2)]"
      >
        <defs>
          <linearGradient id="neurixGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#4D8DFF" />
            <stop offset="100%" stopColor="#F2FAFF" />
          </linearGradient>
          <filter id="neurixGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Spatial Computing / Vision Reticle Rings */}
        <circle cx="50" cy="50" r="46" stroke="#163247" strokeWidth="1" />
        
        {/* Animated Outer Tracking Ring */}
        <circle 
          cx="50" cy="50" r="46" 
          stroke="#00D9FF" strokeWidth="1.5" 
          strokeDasharray="1 12" strokeLinecap="round" 
          className="origin-center animate-[spin_12s_linear_infinite]" 
          opacity="0.7" 
        />
        
        {/* Inner Depth Ring */}
        <circle cx="50" cy="50" r="38" stroke="rgba(0, 217, 255, 0.08)" strokeWidth="4" />
        
        {/* Animated Inner Orbital Ring */}
        <circle 
          cx="50" cy="50" r="38" 
          stroke="#00D9FF" strokeWidth="1" 
          strokeDasharray="30 60" strokeLinecap="round" 
          className="origin-center animate-[spin_8s_linear_infinite_reverse]" 
          opacity="0.9"
        />

        {/* Hardware Crosshairs */}
        <path d="M50 2 L50 10 M50 90 L50 98 M2 50 L10 50 M90 50 L98 50" stroke="#163247" strokeWidth="2" strokeLinecap="round" />

        {/* Core 'N' Shape - Neural / Spatial Nodes */}
        <g filter="url(#neurixGlow)">
          {/* Left Vertical Node */}
          <rect x="30" y="28" width="8" height="44" rx="4" fill="url(#neurixGrad)" />
          {/* Right Vertical Node */}
          <rect x="62" y="28" width="8" height="44" rx="4" fill="url(#neurixGrad)" />
          {/* Data Connection Diagonal */}
          <path d="M34 32 L66 68" stroke="url(#neurixGrad)" strokeWidth="8" strokeLinecap="round" />
          
          {/* Active Synaptic Processing Points */}
          <circle cx="34" cy="28" r="2.5" fill="#F2FAFF" className="animate-pulse" />
          <circle cx="66" cy="72" r="2.5" fill="#00D9FF" className="animate-pulse" />
        </g>

        {/* Floating Tracking Point (Simulating Hand/Eye Target) */}
        <circle cx="78" cy="22" r="3" fill="#39E58C" className="animate-pulse" filter="url(#neurixGlow)" />
        <path d="M68 32 L78 22" stroke="#39E58C" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    </div>
  );
};

export default NeurixLogo;
