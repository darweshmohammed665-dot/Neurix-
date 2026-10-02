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

const files = walkSync('./src').filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Card hover Background: #0D2030
  // Card background: #0B1927 or #0C1B2A -> from instruction it says #0B1927 for Cards specifically, but previously it said "Card / Surface: #0C1B2A". Let's use #0B1927 if we can easily find it, but #0C1B2A is what we set in the main replace.
  // Actually let's change hover:border-[#00D9FF]/xx to hover:border-[#00D9FF]
  content = content.replace(/hover:border-\[#00D9FF\]\/\d+/g, 'hover:border-[#00D9FF]');
  
  // Fix hover:bg-... for cards
  content = content.replace(/hover:bg-\[#163247\]/g, 'hover:bg-[#0D2030]');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
