import { useLanguage, LocaleLink } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Disclaimer } from '@/components/Disclaimer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { BookingCTA } from '@/components/BookingCTA';

export default function IKE() {
  const { t, language } = useLanguage();
  const IL = 'text-accent font-medium underline underline-offset-2 hover:no-underline';

  return (
    <>
      <SEO
        title={t('ike.meta.title')}
        description={t('ike.meta.description')}
        path="/ike"
      />
      <Breadcrumb items={[
        { label: t('nav.home'), href: '/' },
        { label: t('nav.ike') },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('ike.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('ike.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('ike.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Updated badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Updated for 2026: PLN 28,260 annual limit</span>
            </div>
          </div>
          <article className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ike.what.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('ike.what.p1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('ike.what.p2')}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
              {language === 'en' && <>To see how IKE's Belka exemption stacks up against IKZE's upfront deduction, visit the <LocaleLink href="/compare" className={IL}>IKE vs. IKZE side-by-side comparison</LocaleLink>.</>}
              {language === 'ru' && <>Чтобы сравнить освобождение IKE от налога Белки с авансовым вычетом IKZE, смотрите <LocaleLink href="/compare" className={IL}>полное сравнение IKE и IKZE</LocaleLink>.</>}
              {language === 'ua' && <>Щоб порівняти звільнення IKE від податку Белки з авансовим відрахуванням IKZE, дивіться <LocaleLink href="/compare" className={IL}>повне порівняння IKE та IKZE</LocaleLink>.</>}
            </p>
          </article>

          {/* Contribution Limits */}
          <Card className="my-12 border-2">
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                {t('ike.limits.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('ike.limits.annual')}</p>
                <p className="font-mono text-3xl font-bold text-foreground mb-1">
                  {t('ike.limits.amount')}
                </p>
                <p className="text-xs text-muted-foreground">{t('ike.limits.basis')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('ike.limits.monthly')}</p>
                <p className="font-mono text-2xl font-semibold text-accent">
                  PLN
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Benefits */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ike.tax.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t('ike.tax.gains'), desc: t('ike.tax.gains.desc') },
                { title: t('ike.tax.withdraw'), desc: t('ike.tax.withdraw.desc') },
                { title: t('ike.tax.nopit'), desc: t('ike.tax.nopit.desc') },
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
              {t('ike.eligible.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">{t('ike.eligible.p1')}</p>
                <ul className="space-y-3 mb-4">
                  {[
                    t('ike.eligible.citizens'),
                    t('ike.eligible.residents'),
                    t('ike.eligible.workers'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{t('ike.eligible.p2')}</p>
              </CardContent>
            </Card>
          </div>

          {/* How to Open */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ike.how.title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: t('ike.how.step1'), desc: t('ike.how.step1.desc'), num: '1' },
                { title: t('ike.how.step2'), desc: t('ike.how.step2.desc'), num: '2' },
                { title: t('ike.how.step3'), desc: t('ike.how.step3.desc'), num: '3' },
                { title: t('ike.how.step4'), desc: t('ike.how.step4.desc'), num: '4' },
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

          <p className="text-muted-foreground leading-relaxed text-sm">
            {language === 'en' && <>Use the <LocaleLink href="/calculator" className={IL}>IKE & IKZE retirement calculator</LocaleLink> to model how compound growth and the Belka exemption add up across your specific time horizon.</>}
            {language === 'ru' && <>Воспользуйтесь <LocaleLink href="/calculator" className={IL}>калькулятором IKE & IKZE</LocaleLink>, чтобы смоделировать, как сложные проценты и освобождение от налога Белки складываются на вашем горизонте планирования.</>}
            {language === 'ua' && <>Скористайтеся <LocaleLink href="/calculator" className={IL}>калькулятором IKE & IKZE</LocaleLink>, щоб змоделювати, як складні відсотки та звільнення від податку Белки складаються на вашому горизонті планування.</>}
          </p>

          {/* Investment Options */}
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('ike.invest.title')}
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">{t('ike.invest.p1')}</p>
                <ul className="space-y-3">
                  {[
                    t('ike.invest.funds'),
                    t('ike.invest.stocks'),
                    t('ike.invest.deposits'),
                    t('ike.invest.insurance'),
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

          {/* Pros and Cons */}
          <div className="my-12 grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-accent flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  {t('ike.pros.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t('ike.pros.taxfree'), desc: t('ike.pros.taxfree.desc') },
                  { title: t('ike.pros.high'), desc: t('ike.pros.high.desc') },
                  { title: t('ike.pros.flexible'), desc: t('ike.pros.flexible.desc') },
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
                  {t('ike.cons.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t('ike.cons.nodeduction'), desc: t('ike.cons.nodeduction.desc') },
                  { title: t('ike.cons.penalty'), desc: t('ike.cons.penalty.desc') },
                  { title: t('ike.cons.locked'), desc: t('ike.cons.locked.desc') },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-6 text-sm">
            {language === 'en' && <>If reducing this year's taxable income matters more than tax-free withdrawals later, the <LocaleLink href="/ikze" className={IL}>IKZE account</LocaleLink> deducts your contribution directly from your taxable income in the same year you make it.</>}
            {language === 'ru' && <>Если уменьшение налогооблагаемого дохода в текущем году важнее, чем безналоговые выплаты позже, <LocaleLink href="/ikze" className={IL}>счёт IKZE</LocaleLink> вычитает взнос из дохода в том же году.</>}
            {language === 'ua' && <>Якщо зменшення оподатковуваного доходу в поточному році важливіше за безподаткові виплати пізніше, <LocaleLink href="/ikze" className={IL}>рахунок IKZE</LocaleLink> вираховує внесок із доходу в тому ж році.</>}
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Disclaimer variant="long" />
        </div>
      </section>

      <BookingCTA location="ike" />

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('ike.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('ike.cta.desc')}
          </p>
          <Button asChild size="lg" data-testid="button-compare-accounts">
            <LocaleLink href="/compare">
              {t('ike.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </LocaleLink>
          </Button>
        </div>
      </section>
    </>
  );
}
