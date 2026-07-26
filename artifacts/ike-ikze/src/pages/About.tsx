import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { AboutMe } from '@/components/AboutMe';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BookingCTA } from '@/components/BookingCTA';
import { SITE_URL } from '@/lib/site-config';

// TODO: fill in the LinkedIn profile URL before going live
const LINKEDIN_URL = 'https://www.linkedin.com/in/fuad-mammadov/';

export default function About() {
  const { t } = useLanguage();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person-fuad-mammadov`,
    name: 'Fuad Mammadov',
    jobTitle: 'Senior Financial Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Lumen Technologies',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Vistula University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Warsaw',
        addressCountry: 'PL',
      },
    },
    knowsLanguage: ['English', 'Russian', 'Azerbaijani', 'Polish'],
    image: `${SITE_URL}/images/fuad-mammadov.png`,
    url: `${SITE_URL}/about`,
    sameAs: [LINKEDIN_URL],
  };

  return (
    <>
      <SEO
        title={t('about.pageTitle')}
        description={t('about.metaDescription')}
        path="/about"
      />

      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <Breadcrumb items={[
        { label: t('nav.home'), href: '/' },
        { label: t('nav.about') },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-accent/5 to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="font-display text-4xl sm:text-5xl font-bold text-foreground"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t('about.heading')}
          </h1>
        </div>
      </section>

      <AboutMe />

      <BookingCTA location="about" />
    </>
  );
}
