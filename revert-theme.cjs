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
  { regex: /#F8FAFC/gi, replacement: '#0A0E17' },
  { regex: /#F1F5F9/gi, replacement: '#111827' },
  
  // Brand colors
  { regex: /#2563EB/gi, replacement: '#3B82F6' },
  { regex: /#0891B2/gi, replacement: '#22D3EE' },
  { regex: /#4F46E5/gi, replacement: '#6366F1' },
  
  // Texts (The old Main Text #0F172A back to #F8FAFC, but note that #F8FAFC was mapped above. Let's do placeholders)
];

const placeholders = [
  // Backgrounds
  { regex: /#F8FAFC/gi, replacement: '__MAIN_BG__' },
  { regex: /#F1F5F9/gi, replacement: '__CARD_BG__' },
  // Brand colors
  { regex: /#2563EB/gi, replacement: '__PRIMARY__' },
  { regex: /#0891B2/gi, replacement: '__ACCENT__' },
  { regex: /#4F46E5/gi, replacement: '__HIGHLIGHT__' },
  // Texts
  { regex: /#0F172A/gi, replacement: '__TEXT_MAIN__' },
  { regex: /#475569/gi, replacement: '__TEXT_SEC__' },
  { regex: /#64748B/gi, replacement: '__TEXT_MUTED__' },
  // Status Colors
  { regex: /#059669/gi, replacement: '__SUCCESS__' },
  // RGB values
  { regex: /37,\s*99,\s*235/g, replacement: '__PRIMARY_RGB__' },
  { regex: /8,\s*145,\s*178/g, replacement: '__ACCENT_RGB__' },
  { regex: /241,\s*245,\s*249/g, replacement: '__CARD_BG_RGB__' }
];

const applyNew = [
  // Backgrounds
  { regex: /__MAIN_BG__/g, replacement: '#0A0E17' },
  { regex: /__CARD_BG__/g, replacement: '#111827' },
  // Brand colors
  { regex: /__PRIMARY__/g, replacement: '#3B82F6' },
  { regex: /__ACCENT__/g, replacement: '#22D3EE' },
  { regex: /__HIGHLIGHT__/g, replacement: '#6366F1' },
  // Texts
  { regex: /__TEXT_MAIN__/g, replacement: '#F8FAFC' },
  { regex: /__TEXT_SEC__/g, replacement: '#94A3B8' },
  { regex: /__TEXT_MUTED__/g, replacement: '#E0E7FF' },
  // Status Colors
  { regex: /__SUCCESS__/g, replacement: '#10B981' },
  // RGB values
  { regex: /__PRIMARY_RGB__/g, replacement: '59, 130, 246' },
  { regex: /__ACCENT_RGB__/g, replacement: '34, 211, 238' },
  { regex: /__CARD_BG_RGB__/g, replacement: '17, 24, 39' }
];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  placeholders.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  applyNew.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  // Borders - Change solid #E2E8F0 back to a transparent border
  content = content.replace(/border-\[#E2E8F0\]/g, 'border-[#3B82F6]/20');

  // Adjust glows/shadows back
  content = content.replace(/rgba\(59,\s*130,\s*246,\s*0\.1\)/g, 'rgba(59, 130, 246, 0.4)');
  content = content.replace(/rgba\(34,\s*211,\s*238,\s*0\.1\)/g, 'rgba(34, 211, 238, 0.4)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.05\)/g, 'rgba(0, 0, 0, 0.6)');

  // index.html cleanup
  if (file === 'index.html') {
    content = content.replace(/class=""/, 'class="dark"');
  }

  // Selection text
  content = content.replace(/selection:text-\[#ffffff\]/g, 'selection:text-[#F8FAFC]');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
