const fs = require('fs');

let navbar = fs.readFileSync('src/components/NeurixNavbar.tsx', 'utf8');

navbar = navbar.replace(/hover:transparent/g, 'hover:bg-transparent');

// View Project button:
navbar = navbar.replace(
  /className="flex items-center gap-2 px-4 py-2 bg-\[#00D9FF\] hover:bg-\[#F2FAFF\] text-\[#050B14\] font-bold text-xs uppercase tracking-wider transition-all shadow-\[0_0_15px_rgba\(0, 217, 255, 0\.15\)\] cursor-pointer"/g,
  'className="flex items-center gap-2 px-4 py-2 bg-[#00D9FF] hover:bg-[#33E3FF] text-[#031018] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,217,255,0.15)] cursor-pointer rounded-lg"'
);

// Mobile View Project button
navbar = navbar.replace(
  /className="w-full mt-4 py-3 bg-transparent text-\[#00D9FF\] font-bold text-center uppercase tracking-wider text-xs shadow-md"/g,
  'className="w-full mt-4 py-3 bg-[#00D9FF] hover:bg-[#33E3FF] text-[#031018] font-bold text-center uppercase tracking-wider text-xs shadow-md rounded-lg"'
);

// Play intro
navbar = navbar.replace(/border-\[rgba\(0,217,255,0\.18\)\]/g, 'border-[#163247]');
navbar = navbar.replace(/border-b border-\[#163247\]/g, 'border-b border-[rgba(0,217,255,0.18)]');

fs.writeFileSync('src/components/NeurixNavbar.tsx', navbar, 'utf8');
