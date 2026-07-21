import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Shield, Users, Banknote, Globe, CheckCircle, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
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
        title={language === 'en' ? 'IKE & IKZE Poland 2026: Complete Guide for Expats' : language === 'ru' ? 'IKE и IKZE Польша 2026: Полный гид для иностранцев' : 'IKE і IKZE Польща 2026: Повний гід для іноземців'}
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
              Walk through the exact mechanics of IKE and IKZE — contribution limits, tax treatment, and withdrawal rules — and build the financial literacy to evaluate them for your own situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto font-semibold bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-sm" data-testid="button-get-started">
                <Link 
                  href="/book"
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'book_consultation_click', { event_category: 'engagement', event_label: 'home_hero' });
                    }
                  }}
                >
                  Book a consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-semibold" data-testid="button-compare">
                <Link href="/compare">
                  {t('home.hero.secondary')}
                </Link>
              </Button>
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
                  <Button asChild variant="outline" className="w-full mt-6" data-testid="button-learn-ike">
                    <Link href="/ike">
                      {t('common.learnmore')}
                    </Link>
                  </Button>
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
                  <Button asChild variant="outline" className="w-full mt-6" data-testid="button-learn-ikze">
                    <Link href="/ikze">
                      {t('common.learnmore')}
                    </Link>
                  </Button>
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

      {/* About / Why work with me */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              {t('home.about.title') !== 'home.about.title' ? t('home.about.title') : 'Why work with me?'}
            </h2>
            
            <Card className="border-l-4 border-l-amber-500 shadow-sm border-y-border border-r-border">
              <CardContent className="p-8 sm:p-10 space-y-6">
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {t('home.about.educator') !== 'home.about.educator' ? t('home.about.educator') : "I'm a financial educator who helps English and Russian-speaking foreigners understand how Poland's retirement accounts actually work."}
                </p>
                
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                    <span>{t('home.about.bullet1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                    <span>{t('home.about.bullet2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                    <span>{t('home.about.bullet3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              {t('home.booking.heading2')}
            </h2>
            <p className="text-lg text-amber-100 font-medium mb-3">
              {t('home.booking.subtitle2')}
            </p>
            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-6">
              {t('home.booking.desc2')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all">
                <Link
                  href="/book"
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'book_consultation_click', { event_category: 'engagement', event_label: 'home_booking_section' });
                    }
                  }}
                  className="inline-flex items-center"
                >
                  {t('home.booking.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <AlertCircle className="h-4 w-4" />
              <span>{t('home.booking.note')}</span>
            </div>
          </motion.div>
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
          <Button asChild size="lg" variant="secondary" className="font-semibold" data-testid="button-explore-guides">
            <Link href="/ike">
              {t('home.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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
