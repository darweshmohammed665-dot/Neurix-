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
  { regex: /#0A0E17/gi, replacement: '#050B14' },
  { regex: /#111827/gi, replacement: '#0C1B2A' },
  
  // Brand colors
  { regex: /#3B82F6/gi, replacement: '#00D9FF' },
  { regex: /#22D3EE/gi, replacement: '#00D9FF' },
  { regex: /#6366F1/gi, replacement: '#4D8DFF' }, // Blue
  
  // Texts
  { regex: /#F8FAFC/gi, replacement: '#F2FAFF' },
  { regex: /#94A3B8/gi, replacement: '#9DB2C3' },
  { regex: /#E0E7FF/gi, replacement: '#8199AA' },
  
  // Status Colors
  { regex: /#10B981/gi, replacement: '#39E58C' },
  
  // RGB values
  { regex: /59,\s*130,\s*246/g, replacement: '0, 217, 255' },
  { regex: /59,130,246/g, replacement: '0,217,255' },
  { regex: /34,\s*211,\s*238/g, replacement: '0, 217, 255' },
  { regex: /34,211,238/g, replacement: '0,217,255' },
  { regex: /17,\s*24,\s*39/g, replacement: '12, 27, 42' },
  { regex: /17,24,39/g, replacement: '12,27,42' },

  // Specific Tailwind Border rules (adjust to #163247)
  { regex: /border-\[#00D9FF\]\/30/g, replacement: 'border-[#163247]' },
  { regex: /border-\[#00D9FF\]\/20/g, replacement: 'border-[#163247]' },
  { regex: /border-\[#00D9FF\]\/15/g, replacement: 'border-[#163247]' },
  { regex: /border-\[#00D9FF\]\/40/g, replacement: 'border-[#163247]' },
];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  // Specific fixes
  content = content.replace(/rgba\(0,\s*217,\s*255,\s*0\.4\)/g, 'rgba(0, 217, 255, 0.15)'); // soften glows
  content = content.replace(/rgba\(0,217,255,0\.4\)/g, 'rgba(0,217,255,0.15)');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
