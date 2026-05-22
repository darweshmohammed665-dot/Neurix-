const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/zinc/g, 'blue');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated to use blue instead of zinc.');
