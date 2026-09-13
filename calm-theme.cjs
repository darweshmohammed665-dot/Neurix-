const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        filelist.push(dirFile);
      }
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EACCES') return;
    }
  });
  return filelist;
}

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));

const replacements = [
  // Backgrounds: Deep harsh navy to Soft Slate
  { regex: /#081838/gi, replacement: '#0F172A' },
  // Containers: harsh blue to Slate-800
  { regex: /#0f2552/gi, replacement: '#1E293B' },
  
  // Primary Gold: harsh #ffd700 to Soft Amber/Gold #FBBF24
  { regex: /#ffd700/gi, replacement: '#FBBF24' },
  
  // Secondary Gold / Highlights
  { regex: /#D4AF37/gi, replacement: '#D97706' },
  { regex: /#996515/gi, replacement: '#B45309' },
  { regex: /#4A3500/gi, replacement: '#78350F' },
  { regex: /#FFF8DC/gi, replacement: '#FEF3C7' },

  // Glowing Marquee specific harsh opacity reductions
  { regex: /rgba\(255,215,0,0\.8\)/g, replacement: 'rgba(251,191,36,0.3)' },
  { regex: /rgba\(255,215,0,0\.6\)/g, replacement: 'rgba(251,191,36,0.2)' },
  { regex: /rgba\(255,215,0,0\.4\)/g, replacement: 'rgba(251,191,36,0.1)' },
  { regex: /rgba\(255,215,0,0\.2\)/g, replacement: 'rgba(251,191,36,0.05)' },
  { regex: /rgba\(255,215,0,0\.15\)/g, replacement: 'rgba(251,191,36,0.05)' },
  { regex: /rgba\(255,215,0,0\.1\)/g, replacement: 'rgba(251,191,36,0.05)' },

  // General rgba RGB changes from (255,215,0) to (251,191,36)
  { regex: /255, 215, 0/g, replacement: '251, 191, 36' },
  { regex: /255,215,0/g, replacement: '251,191,36' },
  { regex: /255, 159, 0/g, replacement: '217, 119, 6' },
  { regex: /255,159,0/g, replacement: '217,119,6' },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  // Soften Opacities globally for boxes/borders
  // This helps to make the theme "calm"
  content = content.replace(/box-shadow: 0 0 30px rgba\(251, 191, 36, 0\.25\)/g, 'box-shadow: 0 0 20px rgba(251, 191, 36, 0.1)');
  content = content.replace(/shadow-\[0_0_15px_rgba\(251,191,36,0\.15\)\]/g, 'shadow-[0_0_10px_rgba(251,191,36,0.05)]');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
