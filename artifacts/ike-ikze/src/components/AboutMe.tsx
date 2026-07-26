import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Disclaimer } from '@/components/Disclaimer';
import { motion, useReducedMotion } from 'framer-motion';

const bodyKeys = [
  'about.body.0',
  'about.body.1',
  'about.body.2',
  'about.body.3',
  'about.body.4',
  'about.body.5',
];

const credLines = [
  'about.credentials.line0',
  'about.credentials.line1',
  'about.credentials.line2',
  'about.credentials.line3',
  'about.credentials.line4',
];

export function AboutMe() {
  const { t } = useLanguage();
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-muted" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid lg:grid-cols-5 gap-10 items-start"
        >
          {/* Left column: portrait + credentials */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
            {/* Portrait */}
            <Card className="overflow-hidden border shadow-sm">
              <picture>
                <source
                  srcSet="/images/fuad-mammadov-800.webp 800w, /images/fuad-mammadov-400.webp 400w"
                  sizes="(min-width: 1024px) 400px, 100vw"
                  type="image/webp"
                />
                <img
                  src="/images/fuad-mammadov.png"
                  alt={t('about.imageAlt')}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover object-top"
                />
              </picture>
            </Card>

            {/* Credentials card */}
            <Card className="border shadow-sm">
              <CardContent className="p-6 space-y-3">
                <p className="font-display font-bold text-foreground text-lg leading-snug">
                  {t('about.credentials.name')}
                </p>
                <p className="text-sm font-medium text-accent">
                  {t('about.credentials.role')}
                </p>
                <ul className="space-y-1.5 pt-1">
                  {credLines.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-[0.45rem]" aria-hidden="true" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2 text-xs text-muted-foreground/70 border-t border-border leading-relaxed">
                  {t('about.credentials.statusFlag')}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right column: prose */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <p
                className="text-xs font-semibold uppercase text-accent mb-3"
                style={{ letterSpacing: '0.1em' }}
              >
                {t('about.eyebrow')}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t('about.heading')}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {bodyKeys.map((key) => (
                <motion.p
                  key={key}
                  variants={itemVariants}
                  className="text-muted-foreground leading-relaxed"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {t(key)}
                </motion.p>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Disclaimer variant="long" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
