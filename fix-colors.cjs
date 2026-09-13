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
  { regex: /#7dd3fc/gi, replacement: '#fef08a' },
  { regex: /rgba\(2, 132, 199/gi, replacement: 'rgba(255, 159, 0' },
  { regex: /text-cyan-/gi, replacement: 'text-amber-' },
  { regex: /border-cyan-/gi, replacement: 'border-amber-' },
  { regex: /bg-cyan-/gi, replacement: 'bg-amber-' },
  { regex: /#22d3ee/gi, replacement: '#fbbf24' },
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
