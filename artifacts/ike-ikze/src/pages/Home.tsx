import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Shield, Users, Banknote, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { t, language } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO
        title={language === 'en' ? 'IKE & IKZE Poland 2025: Complete Guide for Expats' : language === 'ru' ? 'IKE и IKZE Польша 2025: Полный гид для иностранцев' : 'IKE і IKZE Польща 2025: Повний гід для іноземців'}
        description={language === 'en' ? 'Everything expats need to know about IKE and IKZE retirement accounts in Poland: contribution limits, tax benefits, and how to open as a foreign resident.' : language === 'ru' ? 'Все, что иностранцам нужно знать о пенсионных счетах IKE и IKZE в Польше: лимиты взносов, налоговые льготы и как открыть.' : 'Все, що іноземцям потрібно знати про пенсійні рахунки IKE і IKZE у Польщі: ліміти внесків, податкові пільги та як відкрити.'}
        path="/"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background via-muted/30 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/expats">
                <Button size="lg" className="w-full sm:w-auto font-semibold" data-testid="button-get-started">
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold" data-testid="button-compare">
                  {t('home.hero.secondary')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are IKE and IKZE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('home.what.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.what.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* IKE Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 hover:border-accent transition-colors">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t('home.ike.title')}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-3">
                    {t('home.ike.subtitle')}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {t('home.ike.desc')}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <span className="font-mono font-semibold">{t('home.ike.limit')}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{t('home.ike.tax')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{t('home.ike.withdraw')}</span>
                    </li>
                  </ul>
                  <Link href="/ike">
                    <Button variant="outline" className="w-full mt-6" data-testid="button-learn-ike">
                      {t('common.learnmore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* IKZE Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 hover:border-accent transition-colors">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t('home.ikze.title')}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-3">
                    {t('home.ikze.subtitle')}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {t('home.ikze.desc')}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <span className="font-mono font-semibold">{t('home.ikze.limit')}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{t('home.ikze.deduction')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{t('home.ikze.tax')}</span>
                    </li>
                  </ul>
                  <Link href="/ikze">
                    <Button variant="outline" className="w-full mt-6" data-testid="button-learn-ikze">
                      {t('common.learnmore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Can Open */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('home.who.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.who.desc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: t('home.who.polish') },
              { icon: Globe, label: t('home.who.expats') },
              { icon: Banknote, label: t('home.who.pesel') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <p className="font-medium text-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Save */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              {t('home.why.title')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                t('home.why.growth'),
                t('home.why.flexibility'),
                t('home.why.both'),
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {i + 1}
                  </div>
                  <p className="text-foreground font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Foreigners */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            {t('home.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              t('home.benefits.eligible'),
              t('home.benefits.english'),
              t('home.benefits.portable'),
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-accent mb-4" />
                    <p className="text-foreground font-medium">{benefit}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t('home.cta.desc')}
          </p>
          <Link href="/ike">
            <Button size="lg" variant="secondary" className="font-semibold" data-testid="button-explore-guides">
              {t('home.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "IKE & IKZE Poland Guide",
          "url": "https://ike-ikze-poland.com",
          "description": "Complete guide to IKE and IKZE retirement accounts in Poland for expats and foreign residents",
          "inLanguage": ["en", "ru", "uk"]
        })}
      </script>
    </>
  );
}
