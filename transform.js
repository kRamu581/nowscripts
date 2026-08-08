const fs = require('fs');
let code = fs.readFileSync('client/src/components/learn/PracticeViewer.tsx', 'utf-8');

// 1. Change signature
code = code.replace('export default function InterviewPrepDashboard() {', 'export function PracticeViewer({ dataUrl, categoryId }: { dataUrl: string, categoryId: string }) {');

// 2. Remove useParams and unused states
code = code.replace(/const \{ categoryId \} = useParams\(\);\n/, '');
code = code.replace(/const \[categories, setCategories\].*\n/, '');
code = code.replace(/const \[activeCategory, setActiveCategory\].*\n/, '');
code = code.replace(/const \[expandedCategories, setExpandedCategories\].*\n/, '');

// 3. Remove useEffect for index.json and expandedCategories
code = code.replace(/useEffect\(\(\) => \{\n\s*if \(activeCategory\) \{\n\s*setExpandedCategories[^\}]+\}\n\s*\}, \[activeCategory\]\);\n/, '');
code = code.replace(/\/\/ Load index\.json on mount[\s\S]*?\}, \[categoryId, navigate\]\);\n/, '');

// 4. Update data.json fetch useEffect
const newUseEffect = `  // Load data.json & progress
  useEffect(() => {
    if (!dataUrl) return;

    setLoading(true);
    setQuestionBank(null);
    
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        setQuestionBank(data);
        setActiveModuleIndex(0);
        setActiveQuestionIndex(0);
        return axios.get(\`\${API_BASE}/api/progress/interview-prep/\${categoryId}\`);
      })
      .then(res => {
        const p = res.data;
        setProgress({
          completedQuestions: p.completedQuestions || [],
          bookmarkedQuestions: p.bookmarkedQuestions || [],
          importantQuestions: p.importantQuestions || [],
          lastViewedQuestion: p.lastViewedQuestion || null,
          progressPercentage: p.progressPercentage || 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load question bank or progress", err);
        setLoading(false);
      });
  }, [dataUrl, categoryId]);`;

code = code.replace(/\/\/ Load data\.json & progress when category changes[\s\S]*?\}, \[activeCategory\]\);/, newUseEffect);

// 5. Replace references to activeCategory.id with categoryId
code = code.replace(/activeCategory\?\.id/g, 'categoryId');
code = code.replace(/activeCategory\?\.status === "coming_soon"/g, 'false');

// 6. Remove SEO
code = code.replace(/<SEO[\s\S]*?\/>\n/, '');

// 7. Remove Main Categories Sidebar
code = code.replace(/\{\/\* Main Categories Sidebar \*\/\}([\s\S]*?)\{\/\* Question Palette Sidebar \(Right side, primarily for mobile overlay\) \*\/\}/, '{/* Question Palette Sidebar */}');

// 8. Remove Breadcrumbs
code = code.replace(/<div className="px-4 lg:px-8 pt-4 pb-2 bg-gray-50\/50">\s*<Breadcrumbs \/>\s*<\/div>/, '');

// 9. Remove coming_soon block
code = code.replace(/: false \? \([\s\S]*?\) : questionBank \? \(/, ': questionBank ? (');

fs.writeFileSync('client/src/components/learn/PracticeViewer.tsx', code);
