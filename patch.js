const fs = require('fs');
let data = fs.readFileSync('client/src/data/projectsData.ts', 'utf8');
data = data.replace(/views: "([^"]+)"/g, 'views: "$1",\n      bookmarks: Math.floor(Math.random() * 50) + 10,\n      comments: Math.floor(Math.random() * 20) + 2,\n      publishedDate: "1 week ago"');
fs.writeFileSync('client/src/data/projectsData.ts', data);
