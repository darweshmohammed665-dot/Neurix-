const fs = require('fs');

let hero = fs.readFileSync('src/components/NeurixHero.tsx', 'utf8');

// Fix the via-[#F2FAFF4b8] in the gradient text to via-[#33E3FF]
hero = hero.replace(/via-\[#F2FAFF4b8\]/g, 'via-[#33E3FF]');

// Fix the primary button classes:
hero = hero.replace(
  /className="px-8 sm:px-10 py-4 bg-gradient-to-r from-\[#00D9FF\] via-\[#00D9FF\] to-\[#00D9FF\] hover:from-\[#F2FAFF\] hover:to-slate-100 text-\[#031018\] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-\[0_0_25px_rgba\(0,217,255,0\.25\)\] hover:shadow-\[0_0_35px_rgba\(0,217,255,0\.4\)\] hover:-translate-y-1 cursor-pointer flex items-center gap-3 rounded-lg border border-\[#F2FAFF4b8\]"/g,
  'className="px-8 sm:px-10 py-4 bg-[#00D9FF] hover:bg-[#33E3FF] text-[#031018] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(0,217,255,0.25)] hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:-translate-y-1 cursor-pointer flex items-center gap-3 rounded-lg border-none"'
);

// Fix the sm:text-2xl back to sm:text-8xl in the animated text
hero = hero.replace(/sm:text-2xl md:text-9xl/g, 'sm:text-8xl md:text-9xl');

fs.writeFileSync('src/components/NeurixHero.tsx', hero, 'utf8');
