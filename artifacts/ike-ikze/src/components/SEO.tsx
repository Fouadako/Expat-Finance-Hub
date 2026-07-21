import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export function SEO({ title, description, path }: SEOProps) {
  const siteUrl = 'https://ike-ikze-poland.com'; // placeholder
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
