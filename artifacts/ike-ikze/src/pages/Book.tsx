import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Book() {
  const { t } = useLanguage();

  const handleBooking = () => {
    if (window.gtag) {
      window.gtag('event', 'book_consultation_click', {
        event_category: 'engagement',
        event_label: 'book_page'
      });
    }
    window.open('https://calendar.app.google/Qd5aMvkXQJTQHw4q8', '_blank');
  };

  return (
    <>
      <SEO
        title="Book a Consultation — IKE & IKZE Educational Sessions"
        description="Book a session to walk through the exact mechanics of IKE and IKZE in Poland."
        path="/book"
      />

      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Book a Consultation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I'll walk you through the exact mechanics of IKE and IKZE — contribution limits, withdrawal rules, tax treatment, and account types — so you can make your own informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What to expect
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">How IKE and IKZE contribution limits and withdrawal rules work in 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">The tax treatment of each account — Belka tax, PIT deduction, 10% flat rate at withdrawal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">How to read and evaluate the numbers, so you can apply them to your own situation</span>
                </li>
              </ul>
              
              <Card className="bg-muted/50 border-muted">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Session price</span>
                    <span className="text-lg font-mono font-bold text-accent">450 PLN / 60-minute session</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 border-primary/20 bg-slate-900 shadow-xl text-slate-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                <CardContent className="p-8 sm:p-10 text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Schedule Your Session
                  </h3>
                  <p className="text-slate-400 mb-8 text-sm">
                    Find a time that works for you. Educational purposes only.
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all h-14 text-lg"
                    onClick={handleBooking}
                  >
                    Select a Time
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-border">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {t('disclaimer.text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}