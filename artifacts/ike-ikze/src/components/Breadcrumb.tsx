import { useLocalePath, LocaleLink } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site-config';

interface CrumbItem {
  label: string;
  href?: string; // omit for current page (renders as text, no link)
}

export function Breadcrumb({ items }: { items: CrumbItem[] }) {
  const localePath = useLocalePath();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${localePath(item.href)}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <nav aria-label="Breadcrumb" className="border-b border-border/50 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden="true" className="opacity-40 select-none">/</span>
                )}
                {item.href ? (
                  <LocaleLink href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </LocaleLink>
                ) : (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
