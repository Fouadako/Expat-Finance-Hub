import { useState } from 'react';
import { useLanguage, LocaleLink } from '@/lib/i18n';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator as CalcIcon, TrendingUp, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingCTA } from '@/components/BookingCTA';

export default function Calculator() {
  const { t } = useLanguage();

  const [contractType, setContractType] = useState<'uop' | 'jdg'>('uop');
  const [monthly, setMonthly] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(25);
  const [taxBracket, setTaxBracket] = useState(12);

  // Calculate future value with monthly contributions
  const calculateFV = (monthlyContribution: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    const fv = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return fv;
  };

  const totalContributed = monthly * 12 * years;
  
  // IKE: No upfront deduction, no tax on withdrawal
  const ikeFV = calculateFV(monthly, annualReturn, years);
  const ikeReturns = ikeFV - totalContributed;
  const ikeTaxSavings = ikeReturns * 0.19; // Savings vs. 19% capital gains tax
  const ikeAfterTax = ikeFV; // No tax on withdrawal

  // IKZE: Upfront deduction, 10% tax on withdrawal
  const ikzeLimit = contractType === 'jdg' ? 16956 : 11304;
  const ikzeAnnualContribution = Math.min(monthly * 12, ikzeLimit);
  const ikzeMonthlyEffective = ikzeAnnualContribution / 12;
  // Annual PIT refund: what the taxpayer gets back in the NEXT year's tax settlement
  const ikzeAnnualRefund = ikzeAnnualContribution * (taxBracket / 100);
  const ikzeFV = calculateFV(ikzeMonthlyEffective, annualReturn, years);
  const ikzeReturns = ikzeFV - (ikzeMonthlyEffective * 12 * years);
  const ikzeTax = ikzeFV * 0.10; // 10% flat tax on withdrawal
  const ikzeAfterTax = ikzeFV - ikzeTax;

  // Regular brokerage: No deduction, 19% tax on gains
  const regularFV = calculateFV(monthly, annualReturn, years);
  const regularReturns = regularFV - totalContributed;
  const regularTax = regularReturns * 0.19; // 19% Belka tax
  const regularAfterTax = regularFV - regularTax;

  const formatPLN = (value: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <SEO
        title={t('calc.meta.title')}
        description={t('calc.meta.description')}
        path="/calculator"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-accent/5 to-background py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6">
              <CalcIcon className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('calc.hero.title')}
            </h1>
            <p className="text-lg text-accent font-medium mb-3">
              {t('calc.hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('calc.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Updated badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent">{t('calc.limits.badge')}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-2">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    {t('calc.inputs.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contract Type */}
                  <div>
                    <Label htmlFor="contractType" className="text-sm font-medium mb-2 block">
                      {t('calc.contracttype')}
                    </Label>
                    <Select value={contractType} onValueChange={(val) => setContractType(val as 'uop' | 'jdg')}>
                      <SelectTrigger id="contractType" data-testid="select-contract-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uop">{t('calc.contracttype.uop')}</SelectItem>
                        <SelectItem value="jdg">{t('calc.contracttype.jdg')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Monthly contribution */}
                  <div>
                    <Label htmlFor="monthly" className="text-sm font-medium mb-2 block">
                      {t('calc.monthly')}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="monthly"
                        type="number"
                        value={monthly}
                        onChange={(e) => setMonthly(Number(e.target.value))}
                        className="font-mono"
                        min="0"
                        max="10000"
                        data-testid="input-monthly"
                      />
                      <span className="text-sm text-muted-foreground">PLN</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatPLN(monthly * 12)} {t('calc.inputs.title').toLowerCase()}
                    </p>
                  </div>

                  {/* Annual return */}
                  <div>
                    <Label htmlFor="return" className="text-sm font-medium mb-2 block">
                      {t('calc.return')}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="return"
                        type="number"
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(Number(e.target.value))}
                        className="font-mono"
                        min="0"
                        max="20"
                        step="0.5"
                        data-testid="input-return"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  {/* Years */}
                  <div>
                    <Label htmlFor="years" className="text-sm font-medium mb-2 block">
                      {t('calc.years')}
                    </Label>
                    <Input
                      id="years"
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="font-mono"
                      min="1"
                      max="50"
                      data-testid="input-years"
                    />
                  </div>

                  {/* Tax bracket */}
                  <div>
                    <Label htmlFor="bracket" className="text-sm font-medium mb-2 block">
                      {t('calc.bracket')}
                    </Label>
                    <Select value={taxBracket.toString()} onValueChange={(val) => setTaxBracket(Number(val))}>
                      <SelectTrigger id="bracket" data-testid="select-tax-bracket">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">{t('calc.bracket.12')}</SelectItem>
                        <SelectItem value="32">{t('calc.bracket.32')}</SelectItem>
                        <SelectItem value="19">{t('calc.bracket.19lin')}</SelectItem>
                        <SelectItem value="10">{t('calc.bracket.ryczalt')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {t('calc.results.title')}
              </h2>

              {/* IKE Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary/50">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      {t('calc.ike.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.balance')}</p>
                        <p className="font-mono text-2xl font-bold text-foreground">
                          {formatPLN(ikeFV)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.contributed')}</p>
                        <p className="font-mono text-lg text-foreground">
                          {formatPLN(totalContributed)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.returns')}</p>
                        <p className="font-mono text-lg text-accent">
                          {formatPLN(ikeReturns)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.tax')}</p>
                        <p className="font-mono text-lg text-accent">
                          {formatPLN(ikeTaxSavings)}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">{t('calc.results.aftertax')}</p>
                      <p className="font-mono text-3xl font-bold text-primary">
                        {formatPLN(ikeAfterTax)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* IKZE Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-2 border-accent/50">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" />
                      {t('calc.ikze.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {monthly * 12 > ikzeLimit && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                          {contractType === 'jdg'
                            ? t('calc.ikze.cap.jdg')
                            : t('calc.ikze.cap.uop')}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.balance')}</p>
                        <p className="font-mono text-2xl font-bold text-foreground">
                          {formatPLN(ikzeFV)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.contributed')}</p>
                        <p className="font-mono text-lg text-foreground">
                          {formatPLN(ikzeMonthlyEffective * 12 * years)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.returns')}</p>
                        <p className="font-mono text-lg text-accent">
                          {formatPLN(ikzeReturns)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.ikze.annualrefund')}</p>
                        <p className="font-mono text-lg text-accent">
                          {formatPLN(ikzeAnnualRefund)}<span className="text-sm font-normal ml-1">{t('calc.ikze.peryear')}</span>
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">{t('calc.results.aftertax')}</p>
                      <p className="font-mono text-3xl font-bold text-accent">
                        {formatPLN(ikzeAfterTax)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Regular Brokerage (comparison) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-muted">
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-muted-foreground">
                      {t('calc.regular.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.balance')}</p>
                        <p className="font-mono text-2xl font-bold text-foreground">
                          {formatPLN(regularFV)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('calc.results.belka')}</p>
                        <p className="font-mono text-lg text-destructive">
                          -{formatPLN(regularTax)}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">{t('calc.results.aftertax')}</p>
                      <p className="font-mono text-3xl font-bold text-muted-foreground">
                        {formatPLN(regularAfterTax)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <BookingCTA location="calculator" />

              {/* Disclaimer */}
              <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('calc.note')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Disclaimer: This content is strictly for educational purposes. I am not a licensed financial advisor or tax advisor (doradca podatkowy). Always verify information with a licensed professional.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            {t('calc.cta.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" data-testid="button-learn-ike">
              <LocaleLink href="/ike">
                {t('calc.cta.ike')}
              </LocaleLink>
            </Button>
            <Button asChild variant="outline" size="lg" data-testid="button-learn-ikze">
              <LocaleLink href="/ikze">
                {t('calc.cta.ikze')}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
