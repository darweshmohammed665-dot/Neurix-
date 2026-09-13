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

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
files.push('./index.html');

const replacements = [
  { regex: /NEURIX/g, replacement: 'ULTRALEAP' },
  { regex: /Neurix(?!.*(\.tsx|Data|Logo|Navbar|Hero|Footer))/g, replacement: 'Ultraleap' }
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Custom manual replacements for specific lines
  content = content.replace(/NEURIX/g, 'ULTRALEAP');
  // Replace Neurix but try not to break imports like NeurixLogo
  // Wait, simpler way: just replace in text
  content = content.replace(/>Neurix</g, '>Ultraleap<');
  content = content.replace(/> NEURIX</g, '> ULTRALEAP<');
  content = content.replace(/Neurix Project Team/g, 'Ultraleap Project Team');
  content = content.replace(/Neurix spatial interface/g, 'Ultraleap spatial interface');
  content = content.replace(/Neurix spatial transceiver/g, 'Ultraleap spatial transceiver');
  content = content.replace(/Neurix Cloud/g, 'Ultraleap Cloud');
  content = content.replace(/'NEURIX — Touchless Spatial Interface'/g, "'ULTRALEAP — Touchless Spatial Interface'");
  content = content.replace(/NEURIX_FRAME_001_PKT_OK/g, 'ULTRALEAP_FRAME_001_PKT_OK');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
