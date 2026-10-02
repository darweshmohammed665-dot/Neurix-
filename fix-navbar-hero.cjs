const fs = require('fs');

// 1. Fix NeurixNavbar.tsx
let navbar = fs.readFileSync('src/components/NeurixNavbar.tsx', 'utf8');

navbar = navbar.replace(/bg-\[#050B14\]\/90/g, 'bg-[#07111D]');
navbar = navbar.replace(/border-\[#163247\]/g, 'border-[rgba(0,217,255,0.18)]');

// Active navigation bg/text
navbar = navbar.replace(/bg-\[#00D9FF\] text-\[#050B14\]/g, 'bg-transparent text-[#00D9FF]');
navbar = navbar.replace(/bg-\[#0C1B2A\]\/70/g, 'bg-[#07111D]');
navbar = navbar.replace(/bg-\[#00D9FF\]\/10/g, 'transparent'); // for hover

fs.writeFileSync('src/components/NeurixNavbar.tsx', navbar, 'utf8');


// 2. Fix NeurixHero.tsx
let hero = fs.readFileSync('src/components/NeurixHero.tsx', 'utf8');
// HERO: #050B14 → #081827 → #06111D
hero = hero.replace(/bg-\[#050B14\]/g, 'bg-gradient-to-b from-[#050B14] via-[#081827] to-[#06111D]');
// Add glow: rgba(0,217,255,0.10)
// Replace some blur/glow divs
hero = hero.replace(/bg-\[#00D9FF\]\/5/g, 'bg-[rgba(0,217,255,0.10)]');
hero = hero.replace(/bg-\[#00D9FF\]\/10/g, 'bg-[rgba(0,217,255,0.10)]');
hero = hero.replace(/shadow-\[0_0_15px_rgba\(0,\s*217,\s*255,\s*0\.15\)\]/g, 'shadow-[0_0_25px_rgba(0,217,255,0.30)]'); // button glow
hero = hero.replace(/hover:bg-\[#F2FAFF\]/g, 'hover:bg-[#33E3FF]');
hero = hero.replace(/text-\[#050B14\]/g, 'text-[#031018]');
hero = hero.replace(/border border-\[#163247\]/g, 'border border-[#00D9FF]'); // secondary button border
hero = hero.replace(/hover:border-\[#00D9FF\]/g, 'hover:border-[#33E3FF]'); 

fs.writeFileSync('src/components/NeurixHero.tsx', hero, 'utf8');
