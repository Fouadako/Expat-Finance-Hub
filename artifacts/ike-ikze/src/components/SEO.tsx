import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  /** Canonical page path in English (no language prefix), e.g. "/ike" or "/" */
  path: string;
}

export function SEO({ title, description, path }: SEOProps) {
  const siteUrl = 'https://ike-ikze-poland.com'; // placeholder
  const { language } = useLanguage();

  // BCP 47 code for the current language (ua → uk per ISO 639-1)
  const bcp47 = language === 'ua' ? 'uk' : language;

  // Build per-language canonical URLs from the English base path
  const enUrl = `${siteUrl}${path}`;
  const ruUrl = `${siteUrl}${path === '/' ? '/ru' : `/ru${path}`}`;
  const uaUrl = `${siteUrl}${path === '/' ? '/ua' : `/ua${path}`}`;

  // The canonical URL for the current language
  const canonicalUrl = language === 'en' ? enUrl : language === 'ru' ? ruUrl : uaUrl;

  return (
    <Helmet>
      <html lang={bcp47} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'ru' ? 'ru_RU' : 'uk_UA'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang alternates — tell search engines about all language versions */}
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="ru" href={ruUrl} />
      <link rel="alternate" hreflang="uk" href={uaUrl} />
      {/* x-default points to the English (default) version */}
      <link rel="alternate" hreflang="x-default" href={enUrl} />
    </Helmet>
  );
}
