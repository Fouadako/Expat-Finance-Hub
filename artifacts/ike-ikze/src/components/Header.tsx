import { Link } from 'wouter';
import { useLanguage, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.ike'), href: '/ike' },
    { name: t('nav.ikze'), href: '/ikze' },
    { name: t('nav.compare'), href: '/compare' },
    { name: t('nav.calculator'), href: '/calculator' },
    { name: t('nav.expats'), href: '/expats' },
    { name: t('nav.faq'), href: '/faq' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'ua', label: 'UA', flag: '🇺🇦' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover:text-accent transition-colors" data-testid="link-home">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                IR
              </div>
              <span className="hidden sm:inline">IKE & IKZE</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  data-testid={`link-nav-${item.href.slice(1)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === lang.code
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`button-language-${lang.code}`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid={`link-mobile-${item.href.slice(1)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
