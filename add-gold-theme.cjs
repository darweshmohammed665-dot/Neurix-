const fs = require('fs');
const path = require('path');

// 1. Restore Gold in CSS
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the ruined .golden-neon-text
css = css.replace(
  /\.golden-neon-text \{[^}]+\}/,
  `.golden-neon-text {
  background: linear-gradient(135deg, #FFF8D6 0%, #FFD43B 30%, #FFB84D 70%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(255, 212, 59, 0.25)) drop-shadow(0 0 35px rgba(255, 212, 59, 0.15));
}`
);

css = css.replace(
  /\.golden-glow-box \{[^}]+\}/,
  `.golden-glow-box {
  box-shadow: 0 0 20px rgba(255, 212, 59, 0.15), inset 0 0 15px rgba(255, 212, 59, 0.08);
}`
);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Restored Gold in CSS');


// 2. Add Gold to NeurixHero.tsx animated letters
let hero = fs.readFileSync('src/components/NeurixHero.tsx', 'utf8');
hero = hero.replace(
  /className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-t from-\[#00D9FF\] via-\[#33E3FF\] to-transparent pointer-events-none blur-\[1px\]"/g,
  'className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-t from-[#FFD43B] via-[#FFB84D] to-transparent pointer-events-none blur-[1px]"'
);
fs.writeFileSync('src/components/NeurixHero.tsx', hero, 'utf8');
console.log('Restored Gold in NeurixHero.tsx');


// 3. GlowingNeurixMarquee.tsx - Make the large background text Gold
let marquee = fs.readFileSync('src/components/GlowingNeurixMarquee.tsx', 'utf8');
// Currently it might be text-[#00D9FF] or something.
marquee = marquee.replace(/text-\[#00D9FF\]/g, 'text-[#FFD43B]');
marquee = marquee.replace(/from-\[#00D9FF\]/g, 'from-[#FFB84D]');
marquee = marquee.replace(/via-\[#00D9FF\]/g, 'via-[#FFD43B]');
marquee = marquee.replace(/to-\[#00D9FF\]/g, 'to-[#F59E0B]');
// Fix opacity if it's too bright now
marquee = marquee.replace(/opacity-\d+/g, 'opacity-10');
// Just ensure the marquee itself gets a golden touch
fs.writeFileSync('src/components/GlowingNeurixMarquee.tsx', marquee, 'utf8');
console.log('Added Gold to Marquee');


// 4. GoldCinematicIntro.tsx - Ensure the cinematic intro uses Gold
let intro = fs.readFileSync('src/components/GoldCinematicIntro.tsx', 'utf8');
intro = intro.replace(/text-\[#00D9FF\]/g, 'text-[#FFD43B]');
intro = intro.replace(/bg-\[#00D9FF\]/g, 'bg-[#FFD43B]');
intro = intro.replace(/border-\[#00D9FF\]/g, 'border-[#FFD43B]');
intro = intro.replace(/rgba\(0,\s*217,\s*255/g, 'rgba(255, 212, 59'); // Replace cyan glow with gold glow in rgba
fs.writeFileSync('src/components/GoldCinematicIntro.tsx', intro, 'utf8');
console.log('Restored Gold in Intro');

