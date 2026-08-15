import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientRoot = path.join(__dirname, '..');
const publicDir = path.join(clientRoot, 'public');
const BASE_URL = 'https://www.nowscripts.in';

const sitemapIndexPath = path.join(publicDir, 'sitemap_index.xml');
const pageSitemapPath = path.join(publicDir, 'page-sitemap.xml');
const courseSitemapPath = path.join(publicDir, 'course-sitemap.xml');
const communitySitemapPath = path.join(publicDir, 'community-sitemap.xml');

// Helper to get last mod date from git
const getGitLastMod = (filePath) => {
  try {
    const output = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: 'utf-8', cwd: clientRoot }).trim();
    if (output) {
      // Return YYYY-MM-DD
      return output.split('T')[0];
    }
  } catch (err) {
    // fallback if git fails
  }
  return new Date().toISOString().split('T')[0];
};

const createUrlXml = (url, lastmod, changefreq, priority) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const wrapUrlSet = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

function generatePageSitemap() {
  const routes = [
    { path: '/', file: 'src/pages/UnAuthHome.tsx', priority: '1.0', freq: 'daily' },
    { path: '/about', file: 'src/pages/AboutUs.tsx', priority: '0.8', freq: 'weekly' },
    { path: '/contact', file: 'src/pages/StaticInfoPages.tsx', priority: '0.5', freq: 'monthly' },
    { path: '/login', file: 'src/pages/Auth.tsx', priority: '0.4', freq: 'monthly' },
    { path: '/terms', file: 'src/pages/StaticInfoPages.tsx', priority: '0.1', freq: 'yearly' },
    { path: '/privacy', file: 'src/pages/StaticInfoPages.tsx', priority: '0.1', freq: 'yearly' },
    { path: '/help', file: 'src/pages/StaticInfoPages.tsx', priority: '0.3', freq: 'yearly' },
    { path: '/how-it-works', file: 'src/pages/StaticInfoPages.tsx', priority: '0.7', freq: 'monthly' },
  ];

  const urls = routes.map(route => {
    const absoluteFilePath = path.join(clientRoot, route.file.replace(/\//g, path.sep));
    const lastmod = getGitLastMod(absoluteFilePath);
    return createUrlXml(`${BASE_URL}${route.path}`, lastmod, route.freq, route.priority);
  });

  fs.writeFileSync(pageSitemapPath, wrapUrlSet(urls));
  console.log('✅ Generated page-sitemap.xml');
}

function getMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const absoluteFile = path.join(dir, file);
    const stat = fs.statSync(absoluteFile);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(absoluteFile));
    } else if (file.endsWith('.md')) {
      results.push(absoluteFile);
    }
  });
  return results;
}

function generateCourseSitemap() {
  const urls = [];
  
  // Base routes for courses
  const baseRoutes = [
    { path: '/learn', file: 'src/pages/LearnCatalog.tsx' },
    { path: '/roadmaps', file: 'src/pages/RoadmapDashboard.tsx' },
    { path: '/projects', file: 'src/pages/Projects.tsx' },
    { path: '/interview-prep', file: 'src/pages/InterviewPrepDashboard.tsx' },
  ];

  baseRoutes.forEach(route => {
    const absoluteFilePath = path.join(clientRoot, route.file.replace(/\//g, path.sep));
    const lastmod = getGitLastMod(absoluteFilePath);
    urls.push(createUrlXml(`${BASE_URL}${route.path}`, lastmod, 'weekly', '0.9'));
  });

  // Dynamic routes from content
  const contentDir = path.join(clientRoot, 'src', 'content');
  if (fs.existsSync(contentDir)) {
    const mdFiles = getMarkdownFiles(contentDir);
    mdFiles.forEach(file => {
      // Normalize path to use forward slashes
      const relativePath = path.relative(contentDir, file).replace(/\\/g, '/');
      const parts = relativePath.split('/');
      
      let routePath = '';
      if (parts[0] === 'learn' && parts.length === 3 && parts[1] !== '_orphaned') {
        const categorySlug = parts[1];
        const lessonSlug = parts[2].replace('.md', '');
        routePath = `/learn/${categorySlug}/${lessonSlug}`;
      } else if (parts[0] === 'interview-prep' && parts.length === 3) {
        const categorySlug = parts[1];
        const lessonSlug = parts[2].replace('.md', '');
        routePath = `/interview-prep/${categorySlug}-${lessonSlug}`;
      }

      if (routePath) {
        const lastmod = getGitLastMod(file);
        urls.push(createUrlXml(`${BASE_URL}${routePath}`, lastmod, 'weekly', '0.7'));
      }
    });
  }

  fs.writeFileSync(courseSitemapPath, wrapUrlSet(urls));
  console.log('✅ Generated course-sitemap.xml');
}

function generateCommunitySitemap() {
  const routes = [
    { path: '/community', file: 'src/pages/Home.tsx' },
    { path: '/interviews', file: 'src/pages/InterviewExperiences.tsx' },
  ];

  const urls = routes.map(route => {
    const absoluteFilePath = path.join(clientRoot, route.file.replace(/\//g, path.sep));
    const lastmod = getGitLastMod(absoluteFilePath);
    return createUrlXml(`${BASE_URL}${route.path}`, lastmod, 'daily', '0.8');
  });

  fs.writeFileSync(communitySitemapPath, wrapUrlSet(urls));
  console.log('✅ Generated community-sitemap.xml');
}

function generateSitemapIndex() {
  // Use today's date for the index modification, or max of children
  const today = new Date().toISOString().split('T')[0];
  
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/page-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/course-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/community-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(sitemapIndexPath, indexXml);
  console.log('✅ Generated sitemap_index.xml');
}

function run() {
  generatePageSitemap();
  generateCourseSitemap();
  generateCommunitySitemap();
  generateSitemapIndex();
}

run();
