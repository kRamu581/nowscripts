const fs = require('fs');
const data = fs.readFileSync('debug.html', 'utf8');
const lines = data.split('\n');
let inContent = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('entry-content') || lines[i].includes('post-content')) {
    console.log(`Line ${i}: ${lines[i].substring(0, 100)}`);
  }
}
