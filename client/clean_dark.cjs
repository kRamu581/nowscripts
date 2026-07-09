const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, 'src/pages/InterviewPrepDashboard.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Remove dark mode classes
content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]#]+/g, '');

// Clean up double spaces created by removal
content = content.replace(/  +/g, ' ');

// Replace specific hardcoded dark colors
content = content.replace(/bg-\[#0F172A\]/g, 'bg-gray-900');
content = content.replace(/bg-\[#1E293B\]/g, 'bg-gray-800');
content = content.replace(/border-\[#334155\]/g, 'border-gray-700');

// Additional adjustments to make it look like GitHub docs
// Change slate to gray for a cleaner look
content = content.replace(/-slate-/g, '-gray-');

fs.writeFileSync(targetFile, content);
console.log('Cleaned ' + targetFile);
