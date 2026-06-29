import { useEffect, lazy, Suspense } from "react";
import { useAppContext } from "../App";
import { SEO } from "../components/SEO";

// Above the fold
import { PremiumHero } from "../components/landing/PremiumHero";
import { TrustedBy } from "../components/landing/TrustedBy";
import { PlatformStatistics } from "../components/landing/PlatformStatistics";
import { LandingEnhancements } from "../components/landing/LandingEnhancements";

// Lazy-loaded components below the fold for better Lighthouse scores
const CategoriesBento = lazy(() => import("../components/landing/CategoriesBento").then(module => ({ default: module.CategoriesBento })));
const FeaturesBento = lazy(() => import("../components/landing/FeaturesBento").then(module => ({ default: module.FeaturesBento })));
const InteractiveRoadmap = lazy(() => import("../components/landing/InteractiveRoadmap").then(module => ({ default: module.InteractiveRoadmap })));
const TrendingResources = lazy(() => import("../components/landing/TrendingResources").then(module => ({ default: module.TrendingResources })));
const LatestUpdatesTimeline = lazy(() => import("../components/landing/LatestUpdatesTimeline").then(module => ({ default: module.LatestUpdatesTimeline })));
const CommunityConnect = lazy(() => import("../components/landing/CommunityConnect").then(module => ({ default: module.CommunityConnect })));

const InterviewExperiencesShowcase = lazy(() => import("../components/landing/InterviewExperiencesShowcase").then(module => ({ default: module.InterviewExperiencesShowcase })));
const ProjectsShowcaseV2 = lazy(() => import("../components/landing/ProjectsShowcaseV2").then(module => ({ default: module.ProjectsShowcaseV2 })));
const TestimonialsV2 = lazy(() => import("../components/landing/TestimonialsV2").then(module => ({ default: module.TestimonialsV2 })));
const FAQSectionV2 = lazy(() => import("../components/landing/FAQSectionV2").then(module => ({ default: module.FAQSectionV2 })));
const FinalCTA = lazy(() => import("../components/landing/FinalCTA").then(module => ({ default: module.FinalCTA })));
const FooterV2 = lazy(() => import("../components/landing/FooterV2").then(module => ({ default: module.FooterV2 })));

// Loading skeleton for lazy components
const SectionSkeleton = () => (
  <div className="w-full h-96 flex items-center justify-center bg-[#020617]">
    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default function UnAuthHome() {
  const { hideNavbar } = useAppContext();
  
  useEffect(() => {
    hideNavbar(true);
    return () => hideNavbar(false);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <SEO 
        title="Master ServiceNow with Real Interview Questions & Hands-on Practice"
        description="Join thousands of learners on NowScripts. Fast-track your career with structured roadmaps, 253+ real-world interview questions, and 100+ practice labs."
      />
      
      <PremiumHero />
      <TrustedBy />
      <PlatformStatistics />
      <LandingEnhancements />
      
      <Suspense fallback={<SectionSkeleton />}>
        <CategoriesBento />
        <FeaturesBento />
        <InteractiveRoadmap />
        <TrendingResources />
        <InterviewExperiencesShowcase />
        <ProjectsShowcaseV2 />
        <TestimonialsV2 />
        <LatestUpdatesTimeline />
        <CommunityConnect />
        <FAQSectionV2 />
        <FinalCTA />
        <FooterV2 />
      </Suspense>
    </div>
  );
}
