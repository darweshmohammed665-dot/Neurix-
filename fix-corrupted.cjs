const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css')) {
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

  content = content.replace(/text-\[#00D9FF\]xl/g, 'text-2xl');
  content = content.replace(/sm:text-\[#00D9FF\]xl/g, 'sm:text-7xl');
  content = content.replace(/text-\[#00D9FF\]ase/g, 'text-base');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed corrupted text sizes in ${file}`);
  }
});
