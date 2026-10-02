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

// We use placeholders to avoid overlapping replacements
const placeholders = [
  // Backgrounds
  { regex: /#0A0E17/gi, replacement: '__MAIN_BG__' },
  // Cards
  { regex: /#111827/gi, replacement: '__CARD_BG__' },
  // Primary (Electric Blue)
  { regex: /#3B82F6/gi, replacement: '__PRIMARY__' },
  // Secondary/Accent (Cyan)
  { regex: /#22D3EE/gi, replacement: '__ACCENT__' },
  // Highlight (Purple-Blue)
  { regex: /#6366F1/gi, replacement: '__HIGHLIGHT__' },
  // Texts
  { regex: /#F8FAFC/gi, replacement: '__TEXT_MAIN__' },
  { regex: /#94A3B8/gi, replacement: '__TEXT_SEC__' },
  
  // Status Colors
  { regex: /#10B981/gi, replacement: '__SUCCESS__' },
  
  // Tints
  { regex: /#E0E7FF/gi, replacement: '__TEXT_MUTED__' },
  
  // RGB values for Box Shadows (Old Primary)
  { regex: /59,\s*130,\s*246/g, replacement: '__PRIMARY_RGB__' },
  // RGB values for Box Shadows (Old Accent)
  { regex: /34,\s*211,\s*238/g, replacement: '__ACCENT_RGB__' },
  // Hardcoded index.css radial background from older version
  { regex: /17,\s*24,\s*39/g, replacement: '__CARD_BG_RGB__' }
];

const applyNew = [
  // Backgrounds
  { regex: /__MAIN_BG__/g, replacement: '#F8FAFC' },
  { regex: /__CARD_BG__/g, replacement: '#F1F5F9' },
  // Brand colors
  { regex: /__PRIMARY__/g, replacement: '#2563EB' },
  { regex: /__ACCENT__/g, replacement: '#0891B2' },
  { regex: /__HIGHLIGHT__/g, replacement: '#4F46E5' },
  // Texts
  { regex: /__TEXT_MAIN__/g, replacement: '#0F172A' },
  { regex: /__TEXT_SEC__/g, replacement: '#475569' },
  { regex: /__TEXT_MUTED__/g, replacement: '#64748B' },
  // Status Colors
  { regex: /__SUCCESS__/g, replacement: '#059669' },
  // RGB values
  { regex: /__PRIMARY_RGB__/g, replacement: '37, 99, 235' },
  { regex: /__ACCENT_RGB__/g, replacement: '8, 145, 178' },
  { regex: /__CARD_BG_RGB__/g, replacement: '241, 245, 249' }
];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // 1. Swap to placeholders
  placeholders.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  // 2. Apply new colors
  applyNew.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  // 3. Borders - Change any transparent borders to solid #E2E8F0
  content = content.replace(/border-\[#2563EB\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#0891B2\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#4F46E5\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#0F172A\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#475569\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#E2E8F0\]\/\d+/g, 'border-[#E2E8F0]');
  content = content.replace(/border-slate-700/g, 'border-[#E2E8F0]');

  // 4. Adjust overly strong glows/shadows for light theme
  // We need to tone down the opacity so it doesn't look messy on white.
  content = content.replace(/rgba\(37,\s*99,\s*235,\s*0\.[3-9]\)/g, 'rgba(37, 99, 235, 0.1)');
  content = content.replace(/rgba\(8,\s*145,\s*178,\s*0\.[3-9]\)/g, 'rgba(8, 145, 178, 0.1)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.[5-9]\)/g, 'rgba(0, 0, 0, 0.05)');

  // 5. Special index.html cleanup
  if (file === 'index.html') {
    content = content.replace(/class="dark"/, 'class=""');
  }

  // 6. Selection text should remain white if selection bg is primary blue
  content = content.replace(/selection:text-\[#0F172A\]/g, 'selection:text-[#ffffff]');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
