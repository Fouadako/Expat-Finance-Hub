import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, CheckCircle, FileText, Building2, Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Expats() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('expats.meta.title')}
        description={t('expats.meta.description')}
        path="/expats"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('expats.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('expats.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('expats.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Eligibility */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.eligible.title')}
            </h2>
            <Card className="border-2 border-accent/50">
              <CardContent className="p-8">
                <p className="text-lg text-foreground mb-6">
                  {t('expats.eligible.p1')}
                </p>
                <div className="bg-muted rounded-lg p-6">
                  <p className="font-semibold text-foreground mb-3">{t('expats.eligible.req')}</p>
                  <ul className="space-y-2">
                    {[
                      t('expats.eligible.pesel'),
                      t('expats.eligible.permit'),
                      t('expats.eligible.income'),
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Required Documents */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.docs.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6">{t('expats.docs.p1')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: FileText, text: t('expats.docs.pesel') },
                    { icon: FileText, text: t('expats.docs.id') },
                    { icon: FileText, text: t('expats.docs.permit') },
                    { icon: FileText, text: t('expats.docs.proof') },
                    { icon: FileText, text: t('expats.docs.income') },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                      <doc.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{doc.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* English-Language Providers */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.providers.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">{t('expats.providers.p1')}</p>
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <div className="flex gap-3">
                    <Building2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground mb-2">
                        International banks, online brokers, and major Polish banks often provide English-language account opening and support for IKE and IKZE accounts.
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        {t('expats.providers.note')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What if I leave Poland */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.leave.title')}
            </h2>
            <Card className="border-2">
              <CardContent className="p-8">
                <p className="text-foreground mb-6">
                  {t('expats.leave.p1')}
                </p>
                <p className="font-semibold text-foreground mb-4">{t('expats.leave.p2')}</p>
                <ul className="space-y-3">
                  {[
                    t('expats.leave.maintain'),
                    t('expats.leave.contribute'),
                    t('expats.leave.tax'),
                    t('expats.leave.consult'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Tax Considerations */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.tax.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6">{t('expats.tax.p1')}</p>
                <ul className="space-y-3">
                  {[
                    t('expats.tax.ikze.deduction'),
                    t('expats.tax.ike.exempt'),
                    t('expats.tax.declare'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('expats.tips.title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                t('expats.tips.start'),
                t('expats.tips.both'),
                t('expats.tips.english'),
                t('expats.tips.advisor'),
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm text-foreground">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {t('expats.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('expats.cta.desc')}
          </p>
          <Link href="/faq">
            <Button size="lg" variant="secondary" className="font-semibold" data-testid="button-faq">
              {t('expats.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
