const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace dark zinc backgrounds with deep blue (azure-like) backgrounds
content = content.replace(/bg-zinc-950/g, 'bg-blue-950');
content = content.replace(/bg-zinc-900/g, 'bg-blue-900');
content = content.replace(/bg-zinc-800/g, 'bg-blue-800');
content = content.replace(/bg-zinc-700/g, 'bg-blue-700');

// Replace text zinc with text blue/slate
content = content.replace(/text-zinc-900/g, 'text-blue-950');
content = content.replace(/text-zinc-500/g, 'text-blue-500');
content = content.replace(/text-zinc-400/g, 'text-blue-400');
content = content.replace(/text-zinc-300/g, 'text-blue-300');
content = content.replace(/text-zinc-200/g, 'text-blue-200');
content = content.replace(/text-zinc-100/g, 'text-slate-100');

// Add some cyan/azure touches to backgrounds where amber was previously
// Actually, let's keep the gold elements because the user said "with gold and gray. I want the background to be blue, azure." in previous steps. 
// "I want the background to be blue, azure. The whole thing can be blue. The background is blue."

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated to blue background.');
