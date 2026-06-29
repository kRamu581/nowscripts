import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export const SEO = ({ 
  title = "NowScripts - Master ServiceNow | Interview Questions & Practice Labs", 
  description = "Premium ServiceNow learning platform. Master CSA, CAD, and ITSM with real interview questions, hands-on practice labs, and interactive roadmaps. Start learning for free.", 
  canonicalUrl = "https://nowscripts.com",
  ogImage = "https://nowscripts.com/hero-graphic.png",
  schema
}: SEOProps) => {
  const fullTitle = title.includes('NowScripts') ? title : `${title} | NowScripts`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
