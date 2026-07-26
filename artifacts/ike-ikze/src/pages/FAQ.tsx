import { useLanguage, LocaleLink } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Disclaimer } from '@/components/Disclaimer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { BookingCTA } from '@/components/BookingCTA';

export default function FAQ() {
  const { t, language } = useLanguage();
  const IL = 'text-accent font-medium underline underline-offset-2 hover:no-underline';

  const faqs = [
    { q: t('faq.q1'), a: <>{t('faq.a1')}{' '}
      {language === 'en' && <>The <LocaleLink href="/expats" className={IL}>dedicated expat guide</LocaleLink> covers required documents and the full opening process.</>}
      {language === 'ru' && <><LocaleLink href="/expats" className={IL}>Специальный гид для иностранцев</LocaleLink> охватывает необходимые документы и полный процесс открытия счёта.</>}
      {language === 'ua' && <><LocaleLink href="/expats" className={IL}>Спеціальний гід для іноземців</LocaleLink> охоплює необхідні документи та повний процес відкриття рахунку.</>}
    </> },
    { q: t('faq.q2'), a: <>{t('faq.a2')}{' '}
      {language === 'en' && <>See the <LocaleLink href="/compare" className={IL}>full IKE vs. IKZE comparison</LocaleLink> for a structured breakdown of how the two accounts complement each other.</>}
      {language === 'ru' && <>Смотрите <LocaleLink href="/compare" className={IL}>полное сравнение IKE и IKZE</LocaleLink> для структурированного обзора того, как оба счёта дополняют друг друга.</>}
      {language === 'ua' && <>Дивіться <LocaleLink href="/compare" className={IL}>повне порівняння IKE та IKZE</LocaleLink> для структурованого огляду того, як обидва рахунки доповнюють один одного.</>}
    </> },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: <>{t('faq.a5')}{' '}
      {language === 'en' && <>Full withdrawal rules for each account are covered in the <LocaleLink href="/ike" className={IL}>IKE guide</LocaleLink> and the <LocaleLink href="/ikze" className={IL}>IKZE guide</LocaleLink>.</>}
      {language === 'ru' && <>Полные правила вывода для каждого счёта рассмотрены в <LocaleLink href="/ike" className={IL}>руководстве по IKE</LocaleLink> и <LocaleLink href="/ikze" className={IL}>руководстве по IKZE</LocaleLink>.</>}
      {language === 'ua' && <>Повні правила виведення для кожного рахунку розглянуто в <LocaleLink href="/ike" className={IL}>посібнику по IKE</LocaleLink> та <LocaleLink href="/ikze" className={IL}>посібнику по IKZE</LocaleLink>.</>}
    </> },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: <>{t('faq.a8')}{' '}
      {language === 'en' && <>Use the <LocaleLink href="/calculator" className={IL}>tax benefit calculator</LocaleLink> to model the numerical difference between IKE and IKZE for lump-sum taxpayers.</>}
      {language === 'ru' && <>Воспользуйтесь <LocaleLink href="/calculator" className={IL}>калькулятором налоговых льгот</LocaleLink>, чтобы смоделировать разницу между IKE и IKZE для плательщиков паушального налога.</>}
      {language === 'ua' && <>Скористайтеся <LocaleLink href="/calculator" className={IL}>калькулятором податкових пільг</LocaleLink>, щоб змоделювати різницю між IKE та IKZE для платників паушального податку.</>}
    </> },
    { q: t('faq.q9'), a: t('faq.a9') },
    { q: t('faq.q10'), a: t('faq.a10') },
    { q: t('faq.q11'), a: t('faq.a11') },
    { q: t('faq.q12'), a: t('faq.a12') },
  ];

  return (
    <>
      <SEO
        title={t('faq.meta.title')}
        description={t('faq.meta.description')}
        path="/faq"
      />
      <Breadcrumb items={[
        { label: t('nav.home'), href: '/' },
        { label: t('nav.faq') },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-muted to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('faq.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('faq.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('faq.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Disclaimer */}
          <div className="mb-8">
            <Disclaimer variant="long" />
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-border rounded-lg px-6 bg-card"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Structured Data for FAQ */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })}
          </script>
        </div>
      </section>

      <BookingCTA location="faq" />

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('faq.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('faq.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" data-testid="button-guides">
              <LocaleLink href="/ike">
                {t('faq.cta.guides')}
              </LocaleLink>
            </Button>
            <Button asChild size="lg" data-testid="button-calculator">
              <LocaleLink href="/calculator">
                {t('faq.cta.calc')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
