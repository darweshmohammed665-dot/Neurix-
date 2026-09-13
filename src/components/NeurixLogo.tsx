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
      {/* Dynamic Golden Neon Radiance Aura */}
      {glow && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FBBF24]/40 via-[#FBBF24]/30 to-[#FBBF24]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 pointer-events-none" />
          <div className="absolute -inset-1 bg-[#FBBF24]/20 rounded-xl blur-sm animate-pulse pointer-events-none" />
        </>
      )}

      {/* Unified Glowing Geometric 'U' Shield */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]"
      >
        <defs>
          {/* Radiant Metallic Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="30%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Core Neon Glow Filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Dark Neon Shield Frame */}
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="18"
          fill="#0F172A"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          className="transition-all duration-300"
        />

        {/* Corner Neon Accent Marks */}
        <path d="M 18 28 L 18 18 L 28 18" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 82 28 L 82 18 L 72 18" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 18 72 L 18 82 L 28 82" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 82 72 L 82 82 L 72 82" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

        {/* Glowing Geometric Unified 'N' Symbol */}
        <g filter="url(#neonGlow)">
          {/* Left Vertical Pillar */}
          <path
            d="M 28 72 L 28 28 L 38 28 L 38 72 Z"
            fill="url(#goldGradient)"
          />

          {/* Dynamic Diagonal Sliced Stem */}
          <path
            d="M 36 28 L 64 68 L 64 74 L 54 74 L 28 34 L 28 28 Z"
            fill="url(#goldGradient)"
            opacity="0.95"
          />

          {/* Right Vertical Pillar */}
          <path
            d="M 62 72 L 62 28 L 72 28 L 72 72 Z"
            fill="url(#goldGradient)"
          />

          {/* Inner Light Core Nodes */}
          <circle cx="28" cy="28" r="3" fill="#FFFFFF" />
          <circle cx="72" cy="72" r="3" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFBEB" />
        </g>
      </svg>
    </div>
  );
};

export default NeurixLogo;
