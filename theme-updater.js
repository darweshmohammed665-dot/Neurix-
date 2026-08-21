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

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.css'));

const replacements = [
  // 1. Main Background: #0B0F19
  { regex: /#081838/gi, replacement: '#0B0F19' },
  { regex: /#020617/gi, replacement: '#0B0F19' },
  { regex: /#030712/gi, replacement: '#0B0F19' },
  { regex: /bg-slate-950/g, replacement: 'bg-[#0B0F19]' },
  
  // 2. Card / Container: #111827
  { regex: /#0f2552/gi, replacement: '#111827' },
  { regex: /#0a0f1e/gi, replacement: '#111827' },
  
  // 3. Accent Color: #38BDF8
  { regex: /#ff9f00/gi, replacement: '#38BDF8' },
  { regex: /#ffd700/gi, replacement: '#38BDF8' },
  { regex: /#FFA500/gi, replacement: '#38BDF8' },
  { regex: /#FFDF00/gi, replacement: '#38BDF8' },
  
  // (Cinematic Intro Gradients adapted to Blue Theme)
  { regex: /#D4AF37/gi, replacement: '#0ea5e9' },
  { regex: /#996515/gi, replacement: '#0284c7' },
  { regex: /#4A3500/gi, replacement: '#0369a1' },
  
  // 4. Secondary Text: #9CA3AF
  { regex: /text-slate-400/g, replacement: 'text-[#9CA3AF]' },
  { regex: /text-slate-300/g, replacement: 'text-[#9CA3AF]' },
  { regex: /text-slate-500/g, replacement: 'text-[#9CA3AF]' },
  
  // 5. Primary Text: #F9FAFB
  { regex: /text-slate-100/g, replacement: 'text-[#F9FAFB]' },
  { regex: /text-white/g, replacement: 'text-[#F9FAFB]' },
  { regex: /bg-white/g, replacement: 'bg-[#F9FAFB]' },
  { regex: /border-white/g, replacement: 'border-[#F9FAFB]' },
  { regex: /from-white/g, replacement: 'from-[#F9FAFB]' },
  { regex: /via-white/g, replacement: 'via-[#F9FAFB]' },
  { regex: /to-white/g, replacement: 'to-[#F9FAFB]' },
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
