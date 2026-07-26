const fs = require('fs');
const path = require('path');

const dir = 'client/src/content/learn';

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(dir, function(filePath) {
    if (filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace frontmatter title
        content = content.replace(/title: "(Lesson \d+: |Lab \d+[a-z]?: )/g, 'title: "');
        // Replace h1 header
        content = content.replace(/^# (Lesson \d+: |Lesson \d+ |Lab \d+[a-z]?: |Lab \d+[a-z]? )/gm, '# ');
        fs.writeFileSync(filePath, content);
    }
});
console.log('Done!');
