import { useLanguage, LocaleLink } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitCompare, TrendingUp, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Disclaimer } from '@/components/Disclaimer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { BookingCTA } from '@/components/BookingCTA';

export default function Compare() {
  const { t, language } = useLanguage();
  const IL = 'text-accent font-medium underline underline-offset-2 hover:no-underline';

  const comparisonData = [
    { feature: t('compare.annual'), ike: t('compare.annual.ike'), ikze: t('compare.annual.ikze') },
    { feature: t('compare.selfemployed'), ike: t('compare.selfemployed.ike'), ikze: t('compare.selfemployed.ikze') },
    { feature: t('compare.deduction'), ike: t('compare.deduction.ike'), ikze: t('compare.deduction.ikze') },
    { feature: t('compare.withdraw.tax'), ike: t('compare.withdraw.tax.ike'), ikze: t('compare.withdraw.tax.ikze') },
    { feature: t('compare.age'), ike: t('compare.age.ike'), ikze: t('compare.age.ikze') },
    { feature: t('compare.invest'), ike: t('compare.invest.ike'), ikze: t('compare.invest.ikze') },
    { feature: t('compare.eligible'), ike: t('compare.eligible.both'), ikze: t('compare.eligible.both') },
    { feature: t('compare.early'), ike: t('compare.early.ike'), ikze: t('compare.early.ikze') },
  ];

  return (
    <>
      <SEO
        title={t('compare.meta.title')}
        description={t('compare.meta.description')}
        path="/compare"
      />
      <Breadcrumb items={[
        { label: t('nav.home'), href: '/' },
        { label: t('nav.compare') },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-muted to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
              <GitCompare className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('compare.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('compare.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('compare.hero.desc')}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              {language === 'en' && <>For a deeper look first, read how the <LocaleLink href="/ike" className={IL}>IKE account</LocaleLink> and the <LocaleLink href="/ikze" className={IL}>IKZE account</LocaleLink> each work in detail.</>}
              {language === 'ru' && <>Для более детального изучения — прочитайте, как работает <LocaleLink href="/ike" className={IL}>счёт IKE</LocaleLink> и <LocaleLink href="/ikze" className={IL}>счёт IKZE</LocaleLink>.</>}
              {language === 'ua' && <>Для детальнішого вивчення — прочитайте, як працює <LocaleLink href="/ike" className={IL}>рахунок IKE</LocaleLink> та <LocaleLink href="/ikze" className={IL}>рахунок IKZE</LocaleLink>.</>}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Updated badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent">Updated for 2026 limits</span>
            </div>
          </div>
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('compare.table.feature')}
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold text-foreground">
                {t('compare.table.ike')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-display text-lg font-bold text-foreground">
                {t('compare.table.ikze')}
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {comparisonData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="font-medium text-foreground text-sm">
                        {row.feature}
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">{row.ike}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">{row.ikze}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Disclaimer variant="long" />
        </div>
      </section>

      <BookingCTA location="compare" />

      {/* Can you have both */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
            {t('compare.both.title')}
          </h2>
          <Card className="border-2 border-accent/50">
            <CardContent className="p-8">
              <p className="text-lg text-foreground mb-4">
                {t('compare.both.desc')}
              </p>
              <p className="text-muted-foreground">
                {t('compare.both.strategy')}
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                {language === 'en' && <>The <LocaleLink href="/calculator" className={IL}>IKE & IKZE retirement calculator</LocaleLink> lets you model both accounts simultaneously to see the combined impact on your retirement pot.</>}
                {language === 'ru' && <><LocaleLink href="/calculator" className={IL}>Калькулятор IKE & IKZE</LocaleLink> позволяет смоделировать оба счёта одновременно, чтобы увидеть совокупный эффект для вашего пенсионного капитала.</>}
                {language === 'ua' && <><LocaleLink href="/calculator" className={IL}>Калькулятор IKE & IKZE</LocaleLink> дозволяє змоделювати обидва рахунки одночасно, щоб побачити сукупний ефект для вашого пенсійного капіталу.</>}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Which is best for you */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
            {t('compare.best.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Choose IKE */}
            <Card className="border-2 border-primary/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {t('compare.choose.ike')}
                </h3>
                <ul className="space-y-3">
                  {[
                    t('compare.choose.ike.high'),
                    t('compare.choose.ike.taxfree'),
                    t('compare.choose.ike.horizon'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Choose IKZE */}
            <Card className="border-2 border-accent/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {t('compare.choose.ikze')}
                </h3>
                <ul className="space-y-3">
                  {[
                    t('compare.choose.ikze.immediate'),
                    t('compare.choose.ikze.bracket'),
                    t('compare.choose.ikze.selfemployed'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Choose Both */}
            <Card className="border-2 border-foreground/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
                  <GitCompare className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {t('compare.choose.both')}
                </h3>
                <ul className="space-y-3">
                  {[
                    t('compare.choose.both.max'),
                    t('compare.choose.both.optimize'),
                    t('compare.choose.both.diversify'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground text-sm mt-8 text-center">
            {language === 'en' && <>Common decision-making questions — including which account fits which tax situation — are answered in the <LocaleLink href="/faq" className={IL}>IKE & IKZE FAQ</LocaleLink>. Foreign residents can also check the <LocaleLink href="/expats" className={IL}>expat eligibility guide</LocaleLink>.</>}
            {language === 'ru' && <>Ответы на самые распространённые вопросы — в том числе, какой счёт подходит для какой налоговой ситуации — в <LocaleLink href="/faq" className={IL}>разделе вопросов и ответов</LocaleLink>. Иностранные резиденты также могут ознакомиться с <LocaleLink href="/expats" className={IL}>гидом по требованиям для иностранцев</LocaleLink>.</>}
            {language === 'ua' && <>Відповіді на найпоширеніші питання — зокрема, який рахунок підходить для якої податкової ситуації — у <LocaleLink href="/faq" className={IL}>розділі запитань і відповідей</LocaleLink>. Іноземні резиденти також можуть переглянути <LocaleLink href="/expats" className={IL}>гід з вимог для іноземців</LocaleLink>.</>}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {t('compare.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('compare.cta.desc')}
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold" data-testid="button-use-calculator">
            <LocaleLink href="/calculator">
              {t('compare.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </LocaleLink>
          </Button>
        </div>
      </section>
    </>
  );
}
