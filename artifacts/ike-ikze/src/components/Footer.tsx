import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const { t } = useLanguage();
  const [emailSent, setEmailSent] = useState(false);

  const navigation = {
    guides: [
      { name: t('nav.ike'), href: '/ike' },
      { name: t('nav.ikze'), href: '/ikze' },
      { name: t('nav.compare'), href: '/compare' },
    ],
    resources: [
      { name: t('nav.calculator'), href: '/calculator' },
      { name: t('nav.expats'), href: '/expats' },
      { name: t('nav.faq'), href: '/faq' },
    ],
    sessions: [
      { name: t('nav.booking'), href: '/book' },
    ]
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 5000);
  };

  return (
    <footer className="bg-muted border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                IR
              </div>
              IKE & IKZE Poland
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              {t('footer.brand')}
            </p>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">{t('footer.guides')}</h3>
            <ul className="space-y-2">
              {navigation.guides.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sessions */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">{t('footer.sessions')}</h3>
            <ul className="space-y-2">
              {navigation.sessions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email Opt-in */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto text-center mb-12 shadow-sm">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">
              {t('footer.guide.title')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('footer.guide.desc')}
            </p>
            {emailSent ? (
              <div className="text-sm font-medium text-accent bg-accent/10 py-3 px-4 rounded-md">
                {t('footer.guide.thanks')}
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder={t('footer.guide.email')}
                  required 
                  className="bg-background"
                />
                <Button type="submit" className="shrink-0 bg-primary text-primary-foreground">
                  {t('footer.guide.button')}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-border">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              {t('disclaimer.text')}
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 IKE & IKZE Poland Guide. Information provided for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
