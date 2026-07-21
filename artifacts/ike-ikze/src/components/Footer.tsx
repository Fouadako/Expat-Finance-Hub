import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

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
  };

  return (
    <footer className="bg-muted border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                IR
              </div>
              IKE & IKZE Poland
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Independent financial guide for foreigners navigating Poland's retirement savings system. Not affiliated with any bank or financial institution.
            </p>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">Guides</h3>
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
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">Resources</h3>
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
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            2025 IKE & IKZE Poland Guide. Information provided for educational purposes only. Consult a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
