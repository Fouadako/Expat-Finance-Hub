import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IKZE() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('ikze.meta.title')}
        description={t('ikze.meta.description')}
        path="/ikze"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-accent/5 to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('ikze.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('ikze.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('ikze.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Updated badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent">Updated for 2026: PLN 11,304 (UoP) / PLN 16,956 (JDG)</span>
            </div>
          </div>
          <article className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ikze.what.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('ikze.what.p1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('ikze.what.p2')}
            </p>
          </article>

          {/* Contribution Limits */}
          <Card className="my-12 border-2">
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                {t('ikze.limits.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('ikze.limits.employee')}</p>
                <p className="font-mono text-3xl font-bold text-foreground mb-1">
                  {t('ikze.limits.employee.amount')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('ikze.limits.selfemployed')}</p>
                <p className="font-mono text-3xl font-bold text-accent mb-1">
                  {t('ikze.limits.selfemployed.amount')}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">{t('ikze.limits.basis')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Benefits */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ikze.tax.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t('ikze.tax.deduction'), desc: t('ikze.tax.deduction.desc') },
                { title: t('ikze.tax.savings'), desc: t('ikze.tax.savings.desc') },
                { title: t('ikze.tax.withdraw'), desc: t('ikze.tax.withdraw.desc') },
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ikze.eligible.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">{t('ikze.eligible.p1')}</p>
                <ul className="space-y-3 mb-4">
                  {[
                    t('ikze.eligible.employed'),
                    t('ikze.eligible.selfemployed'),
                    t('ikze.eligible.contract'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{t('ikze.eligible.p2')}</p>
              </CardContent>
            </Card>
          </div>

          {/* How to Open */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ikze.how.title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: t('ikze.how.step1'), desc: t('ikze.how.step1.desc'), num: '1' },
                { title: t('ikze.how.step2'), desc: t('ikze.how.step2.desc'), num: '2' },
                { title: t('ikze.how.step3'), desc: t('ikze.how.step3.desc'), num: '3' },
                { title: t('ikze.how.step4'), desc: t('ikze.how.step4.desc'), num: '4' },
              ].map((step) => (
                <Card key={step.num}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shrink-0">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investment Options */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ikze.invest.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">{t('ikze.invest.p1')}</p>
                <ul className="space-y-3 mb-4">
                  {[
                    t('ikze.invest.funds'),
                    t('ikze.invest.stocks'),
                    t('ikze.invest.insurance'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground italic">{t('ikze.invest.note')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Ryczałt Warning */}
          <div className="my-12">
            <Card className="border-2 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="p-8">
                <div className="flex gap-4">
                  <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      {t('ikze.ryczalt.title')}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t('ikze.ryczalt.desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pros and Cons */}
          <div className="my-12 grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-accent flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  {t('ikze.pros.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t('ikze.pros.immediate'), desc: t('ikze.pros.immediate.desc') },
                  { title: t('ikze.pros.low'), desc: t('ikze.pros.low.desc') },
                  { title: t('ikze.pros.selfemployed'), desc: t('ikze.pros.selfemployed.desc') },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cons */}
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-muted-foreground flex items-center gap-2">
                  <XCircle className="h-6 w-6" />
                  {t('ikze.cons.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t('ikze.cons.lower'), desc: t('ikze.cons.lower.desc') },
                  { title: t('ikze.cons.tax'), desc: t('ikze.cons.tax.desc') },
                  { title: t('ikze.cons.penalty'), desc: t('ikze.cons.penalty.desc') },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('ikze.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('ikze.cta.desc')}
          </p>
          <Link href="/compare">
            <Button size="lg" data-testid="button-compare-accounts">
              {t('ikze.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
