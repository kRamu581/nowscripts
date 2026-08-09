import { useEffect, lazy, Suspense } from "react";
import { useAppContext } from "../App";
import { SEO } from "../components/SEO";

// Above the fold - Amber Redesign (Batch 1)
import { AmberHero } from "../components/landing/amber/AmberHero";
import { AmberStats } from "../components/landing/amber/AmberStats";
import { NowScriptsCopilot } from "../components/landing/NowScriptsCopilot";

// Lazy-loaded components - Amber Redesign (Batch 1)
const AmberPopularRoles = lazy(() => import("../components/landing/amber/AmberPopularRoles").then(m => ({ default: m.AmberPopularRoles })));
const AmberResources = lazy(() => import("../components/landing/amber/AmberResources").then(m => ({ default: m.AmberResources })));

// Lazy-loaded components - Amber Redesign (Batch 2)
const AmberSocialProof = lazy(() => import("../components/landing/amber/AmberSocialProof").then(m => ({ default: m.AmberSocialProof })));
const AmberValueProps = lazy(() => import("../components/landing/amber/AmberValueProps").then(m => ({ default: m.AmberValueProps })));
const AmberLearningSteps = lazy(() => import("../components/landing/amber/AmberLearningSteps").then(m => ({ default: m.AmberLearningSteps })));

// Lazy-loaded components - Amber Redesign (Batch 3)
const TrustedBy = lazy(() => import("../components/landing/TrustedBy").then(m => ({ default: m.TrustedBy })));
const AmberTagCloud = lazy(() => import("../components/landing/amber/AmberTagCloud").then(m => ({ default: m.AmberTagCloud })));
const AmberSupportCards = lazy(() => import("../components/landing/amber/AmberSupportCards").then(m => ({ default: m.AmberSupportCards })));
const AmberCommunityFeedback = lazy(() => import("../components/landing/amber/AmberCommunityFeedback").then(m => ({ default: m.AmberCommunityFeedback })));
const AmberFooter = lazy(() => import("../components/landing/amber/AmberFooter").then(m => ({ default: m.AmberFooter })));

// Loading skeleton for lazy components
const SectionSkeleton = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-[#FF5A3C]/20 border-t-[#FF5A3C] rounded-full animate-spin"></div>
  </div>
);

export default function UnAuthHome() {
  const { hideNavbar } = useAppContext();
  
  useEffect(() => {
    hideNavbar(true);
    return () => hideNavbar(false);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#FF5A3C]/20 selection:text-[#FF5A3C] overflow-x-hidden">
      <SEO 
        title="Master ServiceNow with Real Interview Questions & Hands-on Practice"
        description="Join thousands of learners on NowScripts. Fast-track your career with structured roadmaps, 253+ real-world interview questions, and 100+ practice labs."
        canonicalUrl="https://www.nowscripts.in/"
        keywords="ServiceNow, ServiceNow training, ServiceNow interview questions, CSA, CAD, CIS, ServiceNow courses, ServiceNow developer"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "NowScripts",
            "url": "https://www.nowscripts.in/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.nowscripts.in/search/all/{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NowScripts",
            "url": "https://www.nowscripts.in/",
            "logo": "https://www.nowscripts.in/favicon.ico",
            "sameAs": [
              "https://linkedin.com/company/nowscripts",
              "https://github.com/kRamu81/nowscripts"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": ["Learn", "Roadmaps", "Projects", "Interview Prep", "Community", "About Us", "Contact"],
            "url": [
              "https://www.nowscripts.in/learn",
              "https://www.nowscripts.in/roadmaps",
              "https://www.nowscripts.in/projects",
              "https://www.nowscripts.in/interview-prep",
              "https://www.nowscripts.in/community",
              "https://www.nowscripts.in/about",
              "https://www.nowscripts.in/contact"
            ]
          }
        ]}
      />
      
      {/* Batch 1 */}
      <AmberHero />
      <AmberStats />
      
      <Suspense fallback={<SectionSkeleton />}>
        {/* Batch 1 */}
        <AmberPopularRoles />
        <AmberResources />
        
        {/* Batch 2 */}
        <AmberSocialProof />
        <AmberValueProps />
        <AmberLearningSteps />

        {/* Batch 3 */}
        <TrustedBy />
        <AmberTagCloud />
        <AmberCommunityFeedback />
        <AmberFooter />
      </Suspense>
      <NowScriptsCopilot />
    </div>
  );
}
