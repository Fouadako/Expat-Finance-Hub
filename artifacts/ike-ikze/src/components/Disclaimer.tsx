import { useLanguage } from '@/lib/i18n';
import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  variant: 'long' | 'short';
}

export function Disclaimer({ variant }: DisclaimerProps) {
  const { t } = useLanguage();

  if (variant === 'short') {
    return (
      <p className="text-xs text-muted-foreground leading-relaxed">
        {t('disclaimer.short')}
      </p>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5 flex gap-3">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
      <p className="text-xs text-muted-foreground leading-relaxed">
        {t('disclaimer.long')}
      </p>
    </div>
  );
}
