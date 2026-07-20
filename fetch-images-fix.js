const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  { url: 'https://snowexpertrohit.com/child-document/what-is-integration/', id: 'what-is-integration' },
  { url: 'https://snowexpertrohit.com/child-document/type-of-integration/', id: 'type-of-integration' },
  { url: 'https://snowexpertrohit.com/child-document/basic-requirements-for-integrate-any-system/', id: 'basic-requirements' },
  { url: 'https://snowexpertrohit.com/child-document/integration-testing-tools/', id: 'integration-testing-tools' },
  { url: 'https://snowexpertrohit.com/child-document/integration-module/', id: 'integration-module' }
];

const destDir = path.join(__dirname, 'client/src/content/learn/integrations');

function stripHtmlWithImages(html) {
  let text = html;
  
  // Extract images and replace them with markdown
  // Match <img ... src="..." ... alt="..." ... >
  text = text.replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, '\n\n![$2]($1)\n\n');
  // Match <img ... src="..." ... > without alt
  text = text.replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, '\n\n![]($1)\n\n');
  
  // Basic HTML cleanup
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Convert headings
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');
  text = text.replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**');
  text = text.replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*');
  text = text.replace(/<i>([\s\S]*?)<\/i>/gi, '*$1*');
  
  // Lists
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<br\s*[\/]?>/gi, '\n');
  
  // Clean remaining tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Unescape entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&#8211;/g, '-');
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&ldquo;/g, '"');
  text = text.replace(/&rdquo;/g, '"');
  
  return text.trim();
}

async function fetchPage(urlObj) {
  return new Promise((resolve, reject) => {
    https.get(urlObj.url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // extract main content block
          let content = data;
          const entryContentSplit = data.split(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>/i);
          if (entryContentSplit.length > 1) {
            content = entryContentSplit[1];
            // Cut off at footer or related posts or comments
            const endSplit = content.split(/<div class="navigation"|<footer|<div id="comments"/i);
            content = endSplit[0];
            
            // Further cut off at next generic div if necessary to balance
            // but stripping tags might be fine enough
          } else {
             // Fallback
             const colibriSplit = data.split(/<div[^>]*class="[^"]*colibri-post-content[^"]*"[^>]*>/i);
             if (colibriSplit.length > 1) {
               content = colibriSplit[1].split(/<\/article>/i)[0];
             }
          }

          // Strip out the Series Links to avoid duplication
          content = content.replace(/<div class="wp-post-series-nav">[\s\S]*?<\/div>\s*<\/div>/i, '');
          content = content.replace(/<p>This is post \d+ of \d+ in the series.*?<\/p>/i, '');
          content = content.replace(/<ul[^>]*wp-post-series-list[\s\S]*?<\/ul>/i, '');

          const titleMatch = data.match(/<title>([^<]+)<\/title>/);
          let title = urlObj.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          if (titleMatch) {
             title = titleMatch[1].replace('&#8211; SnowExpert', '').trim();
          }

          let markdown = `# ${title}\n\n${stripHtmlWithImages(content)}`;
          
          // Cleanup extra spaces/newlines
          markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
          markdown = markdown.replace(/^\s+|\s+$/g, '');

          const filepath = path.join(destDir, `${urlObj.id}.md`);
          fs.writeFileSync(filepath, markdown);
          console.log(`Saved ${urlObj.id}.md with proper content and images`);
          resolve();
        } catch (e) {
          console.error(`Error processing ${urlObj.url}:`, e);
          resolve();
        }
      });
    }).on('error', (e) => {
      console.error(`Fetch error ${urlObj.url}:`, e);
      resolve();
    });
  });
}

async function run() {
  for (const u of urls) {
    await fetchPage(u);
  }
  console.log('Done downloading proper content with images');
}

run();
