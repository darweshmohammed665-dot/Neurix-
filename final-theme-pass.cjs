const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css') || dirFile.endsWith('.ts')) {
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

  // Clean up backgrounds
  content = content.replace(/bg-\[#0C1B2A\]\/\d+/g, 'bg-[#0C1B2A]');
  content = content.replace(/bg-\[#050B14\]\/\d+/g, 'bg-[#050B14]');
  
  // Fix hover backgrounds for cards
  content = content.replace(/hover:bg-\[#0C1B2A\]/g, 'hover:bg-[#0D2030]');
  
  // Refine active borders
  content = content.replace(/hover:border-\[#33E3FF\]/g, 'hover:border-[#00D9FF]');
  
  // Fix specific functional colors in LiveGestureDemo.tsx or others if we see generic green/blue
  content = content.replace(/text-\[#39E58C\]/g, 'text-[#39E58C]'); // make sure it's intact
  
  // Refine letter spacing
  content = content.replace(/tracking-\[0\.25em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.3em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.35em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.2em\]/g, 'tracking-wider');

  // Fix button roundness
  content = content.replace(/rounded-none/g, 'rounded-lg');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Final polish applied to ${file}`);
  }
});
