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
    } catch (err) { }
  });
  return filelist;
}

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));
files.push('index.html');

const replacements = [
  // Backgrounds
  { regex: /#0F172A/gi, replacement: '#0A0E17' },
  { regex: /#081838/gi, replacement: '#0A0E17' },
  { regex: /#080c09/gi, replacement: '#0A0E17' },
  
  // Cards
  { regex: /#1E293B/gi, replacement: '#111827' },
  { regex: /#0f2552/gi, replacement: '#111827' },
  
  // Primary (Electric Blue)
  { regex: /#FBBF24/gi, replacement: '#3B82F6' },
  { regex: /#ffd700/gi, replacement: '#3B82F6' },
  
  // Secondary/Accent (Cyan)
  { regex: /#D97706/gi, replacement: '#22D3EE' },
  { regex: /#D4AF37/gi, replacement: '#22D3EE' },
  
  // Highlight (Purple-Blue)
  { regex: /#B45309/gi, replacement: '#6366F1' },
  { regex: /#78350F/gi, replacement: '#6366F1' },
  { regex: /#996515/gi, replacement: '#6366F1' },
  { regex: /#4A3500/gi, replacement: '#6366F1' },
  
  // Light Tints
  { regex: /#FEF3C7/gi, replacement: '#E0E7FF' },
  { regex: /#FFF8DC/gi, replacement: '#E0E7FF' },
  
  // Texts
  { regex: /#F9FAFB/gi, replacement: '#F8FAFC' },
  { regex: /#9CA3AF/gi, replacement: '#94A3B8' },
  
  // RGB values
  { regex: /251, 191, 36/g, replacement: '59, 130, 246' },
  { regex: /251,191,36/g, replacement: '59,130,246' },
  { regex: /255, 215, 0/g, replacement: '59, 130, 246' },
  { regex: /255,215,0/g, replacement: '59,130,246' },
  { regex: /217, 119, 6/g, replacement: '34, 211, 238' },
  { regex: /217,119,6/g, replacement: '34,211,238' },
  { regex: /255, 159, 0/g, replacement: '34, 211, 238' },
  { regex: /255,159,0/g, replacement: '34,211,238' },
  
  // Tailwind specifics
  { regex: /text-amber-400/g, replacement: 'text-[#22D3EE]' },
  { regex: /bg-amber-500\/10/g, replacement: 'bg-[#6366F1]/10' },
  { regex: /border-amber-400\/40/g, replacement: 'border-[#3B82F6]/40' },
  { regex: /border-amber-500\/30/g, replacement: 'border-[#3B82F6]/30' },
  { regex: /text-amber-300/g, replacement: 'text-[#6366F1]' },
  
  // Status Colors
  { regex: /text-emerald-400/g, replacement: 'text-[#10B981]' },
  { regex: /border-emerald-500/g, replacement: 'border-[#10B981]' },
  { regex: /bg-emerald-500/g, replacement: 'bg-[#10B981]' },
];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
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
