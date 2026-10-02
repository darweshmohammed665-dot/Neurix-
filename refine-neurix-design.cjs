const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Global Colors
  content = content.replace(/#163247/gi, '#163247'); // ensure correct border

  // Fix borders from cyan to #163247 globally to reduce cyan noise
  content = content.replace(/border-\[#00D9FF\](?!.*?hover)/g, 'border-[#163247]');
  
  // Specific fix for cards hover
  content = content.replace(/hover:border-\[#33E3FF\]/g, 'hover:border-[#00D9FF]');

  // Typography - reduce extreme letter spacing
  content = content.replace(/tracking-\[0\.25em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.35em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.3em\]/g, 'tracking-widest');
  
  // Fix rounded corners for cards/buttons
  content = content.replace(/rounded-none/g, 'rounded-lg');

  // Fix Specific Components
  if (file.includes('NeurixHero.tsx')) {
    // Top badge
    content = content.replace(/bg-\[#0C1B2A\]\/80 border border-\[#163247\]/g, 'bg-[rgba(0,217,255,0.025)] border border-[#00D9FF]');
    content = content.replace(/text-\[#00D9FF\] font-bold/g, 'text-[#00D9FF] font-bold'); // already correct
    content = content.replace(/text-\[#9DB2C3\]">ESP32 \+ OPENCV AI/g, 'text-[#8199AA]">ESP32 + OPENCV AI');

    // Title NEURIX words
    content = content.replace(/text-[#F2FAFF4b8]/g, 'text-[#00D9FF]');
    
    // Primary Button
    content = content.replace(/bg-gradient-to-r from-\[#00D9FF\] via-\[#00D9FF\] to-\[#00D9FF\] hover:from-\[#33E3FF\] hover:to-slate-100/g, 'bg-[#00D9FF] hover:bg-[#33E3FF] border-none');
    content = content.replace(/shadow-\[0_0_30px_rgba\(0, 217, 255,0\.45\)\] hover:shadow-\[0_0_45px_rgba\(0, 217, 255, 0\.15\)\]/g, 'shadow-[0_0_25px_rgba(0,217,255,0.25)] hover:shadow-[0_0_35px_rgba(0,217,255,0.4)]');
    content = content.replace(/border border-\[#163247\]/g, 'border-none');
    
    // Secondary Button
    content = content.replace(/bg-\[#0C1B2A\]\/80 hover:bg-\[#0C1B2A\]/g, 'bg-[rgba(0,217,255,0.04)] hover:bg-[rgba(0,217,255,0.10)]');
    content = content.replace(/border-2 border-\[#163247\]/g, 'border border-[#163247]');
    content = content.replace(/text-\[#F2FAFF\] font-bold/g, 'text-[#EAF7FF] font-bold');
  }

  if (file.includes('NeurixNavbar.tsx')) {
    // Mobile button background: rgba(0,217,255,0.04)
    content = content.replace(/bg-\[#0C1B2A\] text-\[#00D9FF\]/g, 'bg-[rgba(0,217,255,0.04)] text-[#00D9FF]');
  }

  if (file.includes('RoadmapNugget.tsx') || file.includes('LiveGestureDemo.tsx') || file.includes('FutureWorkSection.tsx') || file.includes('TeamMatrixSection.tsx')) {
    // Ensure cards use #0C1B2A bg and #163247 border, and hover to #0D2030 and #00D9FF border
    content = content.replace(/bg-\[#0C1B2A\]\/80/g, 'bg-[#0C1B2A]');
    content = content.replace(/bg-\[#0C1B2A\]\/50/g, 'bg-[#0C1B2A]');
    content = content.replace(/border border-[#00D9FF]/g, 'border border-[#163247]');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
