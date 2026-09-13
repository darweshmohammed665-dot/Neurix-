const fs = require('fs');

const files = [
  'src/components/FutureWorkSection.tsx',
  'src/components/GoldCinematicIntro.tsx',
  'src/components/RoadmapNugget.tsx',
  'src/components/TeamMatrixSection.tsx',
  'src/components/TeamNetworkConnectome.tsx',
  'src/index.css'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove linear-gradient and radial-gradient lines
  content = content.replace(/<div className="absolute inset-0 [^"]*bg-\[(linear-gradient|radial-gradient)[^"]*" \/>/g, '');
  content = content.replace(/<div className="absolute inset-0 opacity-[^"]*bg-\[(linear-gradient|radial-gradient)[^"]*" \/>/g, '');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Grids removed');
