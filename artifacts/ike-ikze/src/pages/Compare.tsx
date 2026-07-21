import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitCompare, TrendingUp, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Compare() {
  const { t } = useLanguage();

  const comparisonData = [
    { feature: t('compare.annual'), ike: t('compare.annual.ike'), ikze: t('compare.annual.ikze') },
    { feature: t('compare.selfemployed'), ike: t('compare.selfemployed.ike'), ikze: t('compare.selfemployed.ikze') },
    { feature: t('compare.deduction'), ike: t('compare.deduction.ike'), ikze: t('compare.deduction.ikze') },
    { feature: t('compare.withdraw.tax'), ike: t('compare.withdraw.tax.ike'), ikze: t('compare.withdraw.tax.ikze') },
    { feature: t('compare.age'), ike: t('compare.age.both'), ikze: t('compare.age.both') },
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
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
          <Link href="/calculator">
            <Button size="lg" variant="secondary" className="font-semibold" data-testid="button-use-calculator">
              {t('compare.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
