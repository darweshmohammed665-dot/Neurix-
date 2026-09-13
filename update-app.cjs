const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove matrix-grid-pattern
content = content.replace(' relative matrix-grid-pattern overflow-x-hidden', ' relative overflow-x-hidden');

// 2. Replace KineticScrollTicker import with GlowingNeurixMarquee
content = content.replace(
  "import { KineticScrollTicker } from './components/KineticScrollTicker';",
  "import { GlowingNeurixMarquee } from './components/GlowingNeurixMarquee';"
);

// 3. Add the component below NeurixHero
// Wait, currently KineticScrollTicker might not be in the JSX anymore (it was removed in an earlier turn). Let's check where to place it.
const heroTag = "<NeurixHero onNavigateSection={handleNavigateSection} />";
const marqueeTag = "\n        {/* Glowing Scrolling Marquee */}\n        <GlowingNeurixMarquee />\n";

if (content.includes(heroTag)) {
  content = content.replace(heroTag, heroTag + marqueeTag);
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx updated');
