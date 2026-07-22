import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  /** Canonical page path in English (no language prefix), e.g. "/ike" or "/" */
  path: string;
  /** Optional social preview image URL. Defaults to the site-wide social preview. */
  image?: string;
}

export function SEO({ title, description, path, image }: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://ike-ikze-poland.com';
  const { language } = useLanguage();

  // BCP 47 code for the current language (ua → uk per ISO 639-1)
  const bcp47 = language === 'ua' ? 'uk' : language;

  // Build per-language canonical URLs from the English base path
  const enUrl = `${siteUrl}${path}`;
  const ruUrl = `${siteUrl}${path === '/' ? '/ru' : `/ru${path}`}`;
  const uaUrl = `${siteUrl}${path === '/' ? '/ua' : `/ua${path}`}`;

  // The canonical URL for the current language
  const canonicalUrl = language === 'en' ? enUrl : language === 'ru' ? ruUrl : uaUrl;

  // OG locale derived from language
  const ogLocale = language === 'en' ? 'en_US' : language === 'ru' ? 'ru_RU' : 'uk_UA';

  // Social preview image — per-route override or site-wide default
  const ogImage = image ?? `${siteUrl}/social-preview.svg`;

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
      <meta property="og:site_name" content="IKE &amp; IKZE Poland Guide" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

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
