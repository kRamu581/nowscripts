import { tracks, TrackItemType } from "../data/sharedModules";
import matter from 'gray-matter';

// Types for parsed markdown data
export type Subtopic = {
  id: string;      // The auto-generated hash id for the subtopic heading
  title: string;   // The heading title
  content: string; // The markdown content below the heading (optional, as we render the whole file)
};

export type LessonData = {
  type: TrackItemType;
  id: string;      // Based on slug
  slug: string;    // filename without .md
  categorySlug: string; // folder name
  title: string;
  category: string;
  duration: string; // Used for readingTime now
  readingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  order: number;
  tags: string[];
  description?: string;
  lastUpdated?: string;
  author?: string;
  videoUrl?: string;
  pdfUrl?: string;
  subtopics: Subtopic[];
  rawMarkdown: string; // The full markdown body used for rendering
};

export type CourseSection = {
  sectionTitle: string;
  lessons: LessonData[];
};

export type TrackData = {
  trackId: string;
  slug: string;
  title: string;
  sections: CourseSection[];
};

/**
 * Generates an ID from a string, e.g., "What is Cloud Computing" -> "what-is-cloud-computing"
 */
export function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const INTERVIEW_FOLDER_TO_CATEGORY: Record<string, string> = {
  'csa': 'CSA Questions',
  'cad': 'CAD Questions',
  'mock-interviews': 'Mock Interviews',
  'mock-tests': 'Mock Tests',
  'scenario-questions': 'Scenarios',
  'ai-interview': 'Ai interview'
};

const INTERVIEW_ORDER = [
  "CSA Questions",
  "CAD Questions",
  "Mock Interviews",
  "Mock Tests",
  "Scenarios",
  "Ai interview"
];

function extractSubtopics(rawMarkdown: string): Subtopic[] {
  const subtopics: Subtopic[] = [];
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  let headingMatch;

  while ((headingMatch = headingRegex.exec(rawMarkdown)) !== null) {
    const rawTitle = headingMatch[1].trim();
    const cleanTitle = rawTitle.replace(/(\*\*|__|[*_`~])/g, '');
    subtopics.push({
      id: generateSlug(cleanTitle),
      title: cleanTitle,
      content: ""
    });
  }
  return subtopics;
}

/**
 * Loads and parses markdown files to build the course tree
 */
export function getCourseData(type: 'learn' | 'interview' = 'learn'): TrackData[] | CourseSection[] {
  const modules = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  
  if (type === 'learn') {
    const allTracksData: TrackData[] = [];
    
    tracks.forEach(track => {
      const courseSections: CourseSection[] = [];
      
      track.modules.forEach(mod => {
        const lessons: LessonData[] = [];
        
        mod.items.forEach((item, index) => {
          let rawMd = "";
          let subtopics: Subtopic[] = [];
          let readingTime = "5 min read";
          let parsedVideoUrl: string | undefined;
          let parsedLastUpdated: string | undefined;
          
          if (item.type === 'topic') {
            const expectedPath = `../content/learn/${mod.id}/${item.id}.md`;
            rawMd = modules[expectedPath] as string | undefined || "";
            
            if (!rawMd) {
               const foundKey = Object.keys(modules).find(k => k.toLowerCase() === expectedPath.toLowerCase());
               if (foundKey) {
                 rawMd = modules[foundKey] as string;
               }
            }
            
            if (!rawMd) {
              console.warn(`Missing markdown file for topic: ${mod.id}/${item.id}`);
              rawMd = `# ${item.title}\n\nThe lesson you're looking for is currently being updated. Please select another module from the sidebar.`;
            }
            
            rawMd = typeof rawMd === 'string' ? rawMd : (rawMd as any).default;
            
            if (rawMd) {
              // Fallback regex extraction in case gray-matter fails in production (Node polyfill issues)
              const videoMatch = rawMd.match(/videoUrl:\s*["']([^"']+)["']/);
              if (videoMatch) {
                parsedVideoUrl = videoMatch[1];
              }

              try {
                const parsed = matter(rawMd);
                rawMd = parsed.content;
                if (parsed.data.videoUrl) {
                  parsedVideoUrl = parsed.data.videoUrl;
                }
                if (parsed.data.lastUpdated) {
                  parsedLastUpdated = parsed.data.lastUpdated;
                }
              } catch (e) {
                // Ignore matter parsing errors and manually strip frontmatter
                rawMd = rawMd.replace(/^---[\s\S]+?---\n/, '');
              }
            }
            
            subtopics = extractSubtopics(rawMd);
            const wordCount = rawMd.split(/\s+/).length;
            const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
            readingTime = `${readingTimeMinutes} min read`;
          } else {
            // For non-topics (project, mock-interview, milestone), we don't load markdown
            // The UI will handle rendering them specially based on item.type
            rawMd = `# ${item.title}\n\n${item.description || ''}`;
            if (item.type === 'project') readingTime = "2 hours";
            else if (item.type === 'mock-interview') readingTime = "45 min";
            else readingTime = "1 hour";
          }

          lessons.push({
            type: item.type,
            id: item.id,
            slug: item.id,
            categorySlug: mod.id,
            title: item.title,
            category: mod.title,
            duration: readingTime,
            readingTime: readingTime,
            difficulty: mod.level,
            order: index,
            tags: [mod.title],
            description: item.description,
            videoUrl: parsedVideoUrl,
            pdfUrl: item.pdfUrl,
            lastUpdated: parsedLastUpdated,
            subtopics,
            rawMarkdown: rawMd
          });
        });
        
        courseSections.push({
          sectionTitle: mod.title,
          lessons
        });
      });
      
      allTracksData.push({
        trackId: track.id,
        slug: track.slug,
        title: track.title,
        sections: courseSections
      });
    });
    
    return allTracksData;
  }

  // INTERVIEW LOGIC REMAINS UNCHANGED
  const allLessons: LessonData[] = [];

  for (const [filepath, rawMd] of Object.entries(modules)) {
    if (!filepath.includes('/interview-prep/')) continue;

    const content = typeof rawMd === 'string' ? rawMd : (rawMd as any).default;
    
    try {
      let frontmatter: any = {};
      let rawMarkdown = content;
      
      try {
        const parsed = matter(content);
        frontmatter = parsed.data || {};
        rawMarkdown = parsed.content;
      } catch (e) {
        // Ignore matter parsing errors in browser (Node polyfill missing) and manually strip frontmatter
        rawMarkdown = content.replace(/^---[\s\S]+?---\n/, '');
        
        // Try to manually extract some basic metadata if needed (e.g., title)
        const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        if (titleMatch) frontmatter.title = titleMatch[1];
      }

      const subtopics = extractSubtopics(rawMarkdown);

      const pathParts = filepath.split('/');
      const filename = pathParts.pop() || '';
      const categorySlug = pathParts.pop() || '';
      const slug = filename.replace('.md', '');

      let autoCategory = categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      autoCategory = INTERVIEW_FOLDER_TO_CATEGORY[categorySlug] || autoCategory;
      
      const wordCount = rawMarkdown.split(/\s+/).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      const readingTime = `${readingTimeMinutes} min read`;

      allLessons.push({
        type: 'topic',
        id: `${categorySlug}-${slug}`,
        slug,
        categorySlug,
        title: frontmatter.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        category: autoCategory,
        duration: readingTime,
        readingTime: readingTime,
        difficulty: frontmatter.difficulty || 'Beginner',
        order: frontmatter.order || 999,
        tags: frontmatter.tags || [],
        description: frontmatter.description,
        lastUpdated: frontmatter.lastUpdated,
        author: frontmatter.author,
        videoUrl: frontmatter.videoUrl,
        subtopics,
        rawMarkdown
      });
    } catch (err) {
      console.error(`Failed to parse interview markdown file ${filepath}`, err);
    }
  }

  const categoryMap = new Map<string, LessonData[]>();
  allLessons.forEach(lesson => {
    const cat = lesson.category;
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat)!.push(lesson);
  });

  const courseSections: CourseSection[] = [];
  categoryMap.forEach((lessons, sectionTitle) => {
    lessons.sort((a, b) => a.order - b.order);
    courseSections.push({ sectionTitle, lessons });
  });

  courseSections.sort((a, b) => {
    const idxA = INTERVIEW_ORDER.indexOf(a.sectionTitle);
    const idxB = INTERVIEW_ORDER.indexOf(b.sectionTitle);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.sectionTitle.localeCompare(b.sectionTitle);
  });

  return courseSections;
}

export const allTrackData = getCourseData('learn') as TrackData[];
export const courseData = allTrackData[0].sections; // default to CSA track sections for fallback
export const interviewData = getCourseData('interview') as CourseSection[];
 
