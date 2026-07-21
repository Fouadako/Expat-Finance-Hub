import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function BookingCTA({ location }: { location: string }) {
  const { t } = useLanguage();
  
  const handleBooking = () => {
    if (window.gtag) {
      window.gtag('event', 'book_consultation_click', {
        event_category: 'engagement',
        event_label: location
      });
    }
    window.open('https://calendar.app.google/Qd5aMvkXQJTQHw4q8', '_blank');
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-slate-50 border-y border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-8 w-8 text-amber-400" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            {t('cta.heading') !== 'cta.heading' ? t('cta.heading') : 'Want to understand how these mechanics apply in practice?'}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('cta.body') !== 'cta.body' ? t('cta.body') : "Book a consultation and I'll walk you through the exact mechanics of IKE and IKZE so you can evaluate your own strategy."}
          </p>
          <Button 
            size="lg" 
            className="font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg hover:shadow-xl transition-all"
            onClick={handleBooking}
          >
            {t('cta.button') !== 'cta.button' ? t('cta.button') : 'Book a consultation'}
          </Button>
          <p className="mt-6 text-sm opacity-70 italic font-medium">
            {t('cta.note') !== 'cta.note' ? t('cta.note') : 'Educational sessions only. Not financial or tax advice.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}