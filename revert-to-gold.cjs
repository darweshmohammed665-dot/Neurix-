const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EACCES') return;
    }
  });
  return filelist;
}

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));

const replacements = [
  // 1. Backgrounds
  { regex: /#0B0F19/gi, replacement: '#081838' }, // deep navy background
  { regex: /bg-\[#0B0F19\]/g, replacement: 'bg-[#081838]' },
  
  // 2. Containers / Cards
  { regex: /#111827/gi, replacement: '#0f2552' },
  
  // 3. Primary Accents (Cyan to Gold)
  { regex: /#38BDF8/gi, replacement: '#ffd700' }, 
  { regex: /#e0f2fe/gi, replacement: '#FFF8DC' },
  
  // 4. Cinematic Gradients
  { regex: /#0ea5e9/gi, replacement: '#D4AF37' },
  { regex: /#0284c7/gi, replacement: '#996515' },
  { regex: /#0369a1/gi, replacement: '#4A3500' },
  
  // 5. Shadows and RGB colors
  { regex: /rgba\(56,189,248/g, replacement: 'rgba(255,215,0' }, // #38BDF8 to Gold RGB
  { regex: /rgba\(56, 189, 248/g, replacement: 'rgba(255, 215, 0' },
  { regex: /rgba\(14, 165, 233/g, replacement: 'rgba(255, 159, 0' }, // #0ea5e9 to Orange/Gold RGB
  { regex: /rgba\(14,165,233/g, replacement: 'rgba(255,159,0' },
  { regex: /rgba\(34,211,238/g, replacement: 'rgba(255,215,0' }, // cyan
  { regex: /rgba\(34, 211, 238/g, replacement: 'rgba(255, 215, 0' },

  // Logo specific gradient fixes if any left over
  { regex: /#0284C7/gi, replacement: '#D97706' },
  { regex: /#FFF9E6/gi, replacement: '#FFF9E6' } // keeping it same
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
