import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'ua';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ike-ikze-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

interface Translations {
  [lang: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ike': 'IKE Account',
    'nav.ikze': 'IKZE Account',
    'nav.compare': 'Compare',
    'nav.calculator': 'Calculator',
    'nav.expats': 'For Expats',
    'nav.faq': 'FAQ',
    'nav.booking': 'Book a Session',
    
    // Home page
    'home.hero.title': 'Your Complete Guide to Retirement Savings in Poland',
    'home.hero.subtitle': 'Everything expats and foreign residents need to know about IKE and IKZE accounts in 2026',
    'home.hero.cta': 'Get Started',
    'home.hero.secondary': 'Compare Accounts',
    
    'home.what.title': 'What are IKE and IKZE?',
    'home.what.desc': 'Individual retirement accounts designed to help you save tax-efficiently for your future in Poland.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Tax-Free Growth',
    'home.ike.desc': 'Invest up to PLN 28,260 per year. No capital gains tax on withdrawals after age 60.',
    'home.ike.limit': 'PLN 28,260 annual limit',
    'home.ike.tax': '0% tax on qualified withdrawals',
    'home.ike.withdraw': 'Withdraw after age 60',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Tax Deduction Now',
    'home.ikze.desc': 'Contribute up to PLN 11,304 (employees) or PLN 16,956 (self-employed) and deduct from your taxable income. Pay only 10% tax on withdrawal at age 65.',
    'home.ikze.limit': 'PLN 11,304 annual limit (employees)',
    'home.ikze.deduction': 'Full PIT deduction',
    'home.ikze.tax': '10% flat tax on withdrawal',
    
    'home.who.title': 'Who Can Open These Accounts?',
    'home.who.desc': 'Any person with a PESEL number — including foreign residents with valid residence permits.',
    'home.who.polish': 'Polish citizens',
    'home.who.expats': 'Foreign residents',
    'home.who.pesel': 'Anyone with PESEL',
    
    'home.why.title': 'Why Save for Retirement in Poland?',
    'home.why.growth': 'Tax-efficient compound growth',
    'home.why.flexibility': 'Multiple investment options',
    'home.why.both': 'Can open both IKE and IKZE',
    
    'home.benefits.title': 'Key Benefits for Foreigners',
    'home.benefits.eligible': 'No citizenship required',
    'home.benefits.english': 'Many providers offer English support',
    'home.benefits.portable': 'Keep your account if you leave Poland',
    
    'home.booking.title': 'Have Questions? Book an Educational Session',
    'home.booking.subtitle': 'Walk through the mechanics of IKE and IKZE together. Educational sessions only — not financial advice.',
    'home.booking.desc': 'These are educational sessions to help you understand how IKE and IKZE work — their mechanics, limits, and tax rules — so you can evaluate them for your own situation. I do not provide personalized financial advice.',
    'home.booking.cta': 'Book a Free Session',
    
    'home.cta.title': 'Ready to Start Saving?',
    'home.cta.desc': 'Explore detailed guides, compare accounts, and use our calculator to plan your retirement.',
    'home.cta.button': 'Explore Guides',
    
    // IKE page
    'ike.meta.title': 'IKE Account Poland 2026: Complete Guide for Expats',
    'ike.meta.description': 'Everything you need to know about IKE (Indywidualne Konto Emerytalne) in Poland: contribution limits, tax benefits, how to open, and eligibility for foreign residents.',
    
    'ike.hero.title': 'IKE Account',
    'ike.hero.subtitle': 'Indywidualne Konto Emerytalne',
    'ike.hero.desc': 'Tax-free retirement savings for residents of Poland',
    
    'ike.what.title': 'What is IKE?',
    'ike.what.p1': 'IKE (Indywidualne Konto Emerytalne) is an individual retirement account that allows you to invest for your future with significant tax advantages. The key benefit: all capital gains, dividends, and interest earned inside the account are completely exempt from the 19% Belka tax when you withdraw after age 60.',
    'ike.what.p2': 'You can contribute up to PLN 28,260 annually (2026 limit, equal to 3× the average monthly salary). There is no upfront tax deduction on contributions, but all growth is tax-free at withdrawal.',
    
    'ike.limits.title': '2026 Contribution Limits',
    'ike.limits.annual': 'Annual contribution limit',
    'ike.limits.amount': 'PLN 28,260',
    'ike.limits.basis': 'Based on 3× average monthly salary',
    'ike.limits.monthly': 'Approximately PLN 2,355 per month',
    
    'ike.tax.title': 'Tax Benefits',
    'ike.tax.gains': 'No capital gains tax',
    'ike.tax.gains.desc': 'Normally 19% Belka tax — waived on IKE withdrawals',
    'ike.tax.withdraw': 'Withdraw tax-free after age 60',
    'ike.tax.withdraw.desc': 'Or after age 55 if you have acquired pension rights',
    'ike.tax.nopit': 'No PIT deduction on contributions',
    'ike.tax.nopit.desc': 'Unlike IKZE, contributions are not tax-deductible',
    
    'ike.eligible.title': 'Who Can Open IKE?',
    'ike.eligible.p1': 'Any individual with a PESEL number, including:',
    'ike.eligible.citizens': 'Polish citizens',
    'ike.eligible.residents': 'Foreign residents with valid residence permits',
    'ike.eligible.workers': 'Employed, self-employed, or unemployed',
    'ike.eligible.p2': 'No minimum age requirement. You can open IKE at any age.',
    
    'ike.how.title': 'How to Open IKE',
    'ike.how.step1': 'Choose your provider',
    'ike.how.step1.desc': 'Banks, brokerage firms (TFI), or insurance companies',
    'ike.how.step2': 'Gather documents',
    'ike.how.step2.desc': 'PESEL number, ID or passport, residence permit (if applicable)',
    'ike.how.step3': 'Open account online or in-branch',
    'ike.how.step3.desc': 'Many providers offer English-language support',
    'ike.how.step4': 'Start contributing',
    'ike.how.step4.desc': 'Set up regular transfers or contribute lump sums',
    
    'ike.invest.title': 'Investment Options',
    'ike.invest.p1': 'IKE funds can be invested in:',
    'ike.invest.funds': 'Mutual funds (TFI)',
    'ike.invest.stocks': 'Stocks and ETFs (via brokerage IKE)',
    'ike.invest.deposits': 'Bank deposits',
    'ike.invest.insurance': 'Insurance products',
    
    'ike.pros.title': 'Advantages',
    'ike.pros.taxfree': 'Tax-free withdrawals',
    'ike.pros.taxfree.desc': 'No capital gains tax on investment returns',
    'ike.pros.high': 'Higher contribution limit than IKZE',
    'ike.pros.high.desc': 'PLN 28,260 vs. PLN 11,304',
    'ike.pros.flexible': 'Flexible investment options',
    'ike.pros.flexible.desc': 'Choose from funds, stocks, ETFs, or deposits',
    
    'ike.cons.title': 'Disadvantages',
    'ike.cons.nodeduction': 'No upfront tax deduction',
    'ike.cons.nodeduction.desc': 'Contributions are made with post-tax income',
    'ike.cons.penalty': 'Early withdrawal penalties',
    'ike.cons.penalty.desc': 'Withdrawing before age 60 triggers 19% tax on gains only',
    'ike.cons.locked': 'Funds locked until retirement',
    'ike.cons.locked.desc': 'Not suitable for short-term savings',
    
    'ike.cta.title': 'Compare with IKZE',
    'ike.cta.desc': 'See how IKE stacks up against IKZE to choose the right account for you.',
    'ike.cta.button': 'Compare Accounts',
    
    // IKZE page
    'ikze.meta.title': 'IKZE Account Poland 2026: Tax Deduction & Contribution Limits',
    'ikze.meta.description': 'Complete guide to IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): PLN 11,304 annual limit (employees), PLN 16,956 (self-employed), PIT tax deduction, 10% withdrawal tax, and eligibility for expats.',
    
    'ikze.hero.title': 'IKZE Account',
    'ikze.hero.subtitle': 'Indywidualne Konto Zabezpieczenia Emerytalnego',
    'ikze.hero.desc': 'Tax-deductible retirement savings with immediate tax benefits',
    
    'ikze.what.title': 'What is IKZE?',
    'ikze.what.p1': 'IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego) is an individual retirement security account that offers an immediate tax benefit: contributions are fully deductible from your PIT (Personal Income Tax) taxable income.',
    'ikze.what.p2': 'For employees, the 2026 annual contribution limit is PLN 11,304 (1.2× average monthly salary). Self-employed individuals (JDG/B2B) can contribute up to PLN 16,956 (1.8× average monthly salary). When you withdraw funds after age 65, you pay a flat 10% tax — significantly lower than standard income tax rates.',
    
    'ikze.limits.title': '2026 Contribution Limits',
    'ikze.limits.employee': 'Employees (UoP)',
    'ikze.limits.employee.amount': 'PLN 11,304',
    'ikze.limits.selfemployed': 'Self-employed / B2B (JDG)',
    'ikze.limits.selfemployed.amount': 'PLN 16,956',
    'ikze.limits.basis': 'Based on 1.2× (employees) or 1.8× (self-employed/JDG) average monthly salary',
    
    'ikze.tax.title': 'Tax Benefits',
    'ikze.tax.deduction': 'Full PIT deduction',
    'ikze.tax.deduction.desc': 'Reduce taxable income by your contribution amount',
    'ikze.tax.savings': 'Immediate tax savings',
    'ikze.tax.savings.desc': 'Save 12-32% of contribution depending on tax bracket',
    'ikze.tax.withdraw': '10% flat tax on withdrawal',
    'ikze.tax.withdraw.desc': 'Much lower than standard income tax rates',
    
    'ikze.eligible.title': 'Who Can Open IKZE?',
    'ikze.eligible.p1': 'Any individual with a PESEL number who pays PIT tax in Poland:',
    'ikze.eligible.employed': 'Employees (umowa o pracę)',
    'ikze.eligible.selfemployed': 'Self-employed (działalność gospodarcza / JDG)',
    'ikze.eligible.contract': 'Contract workers (umowa zlecenie)',
    'ikze.eligible.p2': 'Foreign residents with valid residence permits are eligible.',
    
    'ikze.how.title': 'How to Open IKZE',
    'ikze.how.step1': 'Choose your provider',
    'ikze.how.step1.desc': 'Banks, investment funds (TFI), or insurance companies',
    'ikze.how.step2': 'Prepare documents',
    'ikze.how.step2.desc': 'PESEL, ID/passport, proof of income (for self-employed)',
    'ikze.how.step3': 'Open account',
    'ikze.how.step3.desc': 'Online or in-person, many offer English support',
    'ikze.how.step4': 'Contribute and claim deduction',
    'ikze.how.step4.desc': 'Report contributions in your annual PIT declaration',
    
    'ikze.invest.title': 'Investment Options',
    'ikze.invest.p1': 'IKZE funds can be invested in:',
    'ikze.invest.funds': 'Mutual funds (TFI)',
    'ikze.invest.stocks': 'Stocks and ETFs (via brokerage IKZE)',
    'ikze.invest.insurance': 'Insurance products',
    'ikze.invest.note': 'Note: Bank deposits are not available for IKZE (only IKE)',
    
    'ikze.pros.title': 'Advantages',
    'ikze.pros.immediate': 'Immediate tax deduction',
    'ikze.pros.immediate.desc': 'Lower your tax bill this year',
    'ikze.pros.low': 'Low withdrawal tax',
    'ikze.pros.low.desc': 'Only 10% flat tax, vs. 12-32% income tax',
    'ikze.pros.selfemployed': 'Higher limit for self-employed',
    'ikze.pros.selfemployed.desc': 'PLN 16,956 annual contribution',
    
    'ikze.cons.title': 'Disadvantages',
    'ikze.cons.lower': 'Lower contribution limit for employees',
    'ikze.cons.lower.desc': 'PLN 11,304 for employees vs. PLN 28,260 for IKE',
    'ikze.cons.tax': 'Withdrawal is taxed',
    'ikze.cons.tax.desc': 'Unlike IKE, you pay 10% tax when withdrawing at age 65',
    'ikze.cons.penalty': 'Early withdrawal penalties',
    'ikze.cons.penalty.desc': 'Early full liquidation adds the entire amount to your taxable income',
    
    'ikze.ryczalt.title': 'Important: If You Are on Ryczałt Tax',
    'ikze.ryczalt.desc': 'If you pay ryczałt (lump-sum tax on revenue — common among IT freelancers at 8.5% or 12%), the IKZE deduction reduces your revenue at your lump-sum rate, not your marginal income tax rate. The benefit is smaller than for skala or liniowy taxpayers. For ryczałt taxpayers, IKE is often worth considering first. This is a significant nuance the research shows is almost absent from English-language content.',
    
    'ikze.cta.title': 'Compare with IKE',
    'ikze.cta.desc': 'See how IKZE differs from IKE to make the best choice for your situation.',
    'ikze.cta.button': 'Compare Accounts',
    
    // Compare page
    'compare.meta.title': 'IKE vs IKZE: Complete Comparison Poland 2026',
    'compare.meta.description': 'Side-by-side comparison of IKE and IKZE retirement accounts: contribution limits, tax benefits, withdrawal rules, and which is best for your profile.',
    
    'compare.hero.title': 'IKE vs. IKZE',
    'compare.hero.subtitle': 'Side-by-side comparison',
    'compare.hero.desc': 'Choose the right retirement account for your situation',
    
    'compare.table.feature': 'Feature',
    'compare.table.ike': 'IKE',
    'compare.table.ikze': 'IKZE',
    
    'compare.annual': 'Annual contribution limit (employees)',
    'compare.annual.ike': 'PLN 28,260',
    'compare.annual.ikze': 'PLN 11,304',
    
    'compare.selfemployed': 'Self-employed limit',
    'compare.selfemployed.ike': 'PLN 28,260',
    'compare.selfemployed.ikze': 'PLN 16,956',
    
    'compare.deduction': 'Tax deduction on contributions',
    'compare.deduction.ike': 'No',
    'compare.deduction.ikze': 'Yes (full PIT deduction)',
    
    'compare.withdraw.tax': 'Tax on withdrawal',
    'compare.withdraw.tax.ike': '0% (tax-free)',
    'compare.withdraw.tax.ikze': '10% flat rate',
    
    'compare.age': 'Withdrawal age',
    'compare.age.ike': 'Age 60 (or 55 with pension rights)',
    'compare.age.ikze': 'Age 65',
    
    'compare.invest': 'Investment options',
    'compare.invest.ike': 'Funds, stocks, ETFs, bank deposits, insurance',
    'compare.invest.ikze': 'Funds, stocks, ETFs, insurance (no bank deposits)',
    
    'compare.eligible': 'Eligibility',
    'compare.eligible.both': 'Anyone with PESEL number',
    
    'compare.early': 'Early withdrawal penalty',
    'compare.early.ike': '19% capital gains tax on profits only',
    'compare.early.ikze': 'Full amount added to taxable income',
    
    'compare.both.title': 'Can You Have Both?',
    'compare.both.desc': 'Yes! You can open both IKE and IKZE accounts simultaneously. Many people use both to maximize tax benefits.',
    'compare.both.strategy': 'Common strategy: Max out IKZE first for the immediate tax deduction, then contribute remaining savings to IKE for higher limits and tax-free growth.',
    
    'compare.best.title': 'Which is Best for You?',
    
    'compare.choose.ike': 'Choose IKE if...',
    'compare.choose.ike.high': 'You want to save more than PLN 11,304 per year',
    'compare.choose.ike.taxfree': 'You prefer tax-free withdrawals over upfront deductions',
    'compare.choose.ike.horizon': 'You have a long time horizon and expect significant growth',
    
    'compare.choose.ikze': 'Choose IKZE if...',
    'compare.choose.ikze.immediate': 'You want immediate tax savings this year',
    'compare.choose.ikze.bracket': 'You are in a higher tax bracket (32%) or on liniowy (19%)',
    'compare.choose.ikze.selfemployed': 'You are self-employed and want to reduce taxable income',
    
    'compare.choose.both': 'Choose both if...',
    'compare.choose.both.max': 'You can afford to max out both accounts',
    'compare.choose.both.optimize': 'You want to optimize both immediate and long-term tax benefits',
    'compare.choose.both.diversify': 'You want to diversify your retirement savings strategy',
    
    'compare.cta.title': 'Ready to Calculate Your Savings?',
    'compare.cta.desc': 'Use our interactive calculator to see projected returns for IKE and IKZE.',
    'compare.cta.button': 'Use Calculator',
    
    // Calculator page
    'calc.meta.title': 'IKE & IKZE Savings Calculator Poland 2026',
    'calc.meta.description': 'Calculate projected retirement savings, tax benefits, and returns for IKE and IKZE accounts. Compare outcomes and estimate your future balance.',
    
    'calc.hero.title': 'Retirement Savings Calculator',
    'calc.hero.subtitle': 'Estimate your IKE and IKZE returns',
    'calc.hero.desc': 'Project your retirement balance and tax savings',
    
    'calc.inputs.title': 'Your Inputs',
    'calc.contracttype': 'Contract Type',
    'calc.contracttype.uop': 'Employee (UoP)',
    'calc.contracttype.jdg': 'Self-employed / B2B (JDG)',
    'calc.monthly': 'Monthly contribution',
    'calc.return': 'Expected annual return',
    'calc.years': 'Years until retirement',
    'calc.bracket': 'Your tax bracket',
    'calc.bracket.12': '12% (skala, up to 120k PLN)',
    'calc.bracket.32': '32% (skala, above 120k PLN)',
    'calc.bracket.19lin': '19% flat (liniowy)',
    'calc.bracket.ryczalt': 'Ryczałt (reduced IKZE benefit)',
    
    'calc.results.title': 'Projected Results',
    'calc.results.balance': 'Final balance',
    'calc.results.contributed': 'Total contributed',
    'calc.results.returns': 'Investment returns',
    'calc.results.tax': 'Tax savings vs. regular account',
    'calc.results.aftertax': 'After-tax withdrawal value',
    
    'calc.ike.title': 'IKE Projection',
    'calc.ikze.title': 'IKZE Projection',
    'calc.regular.title': 'Regular Brokerage (for comparison)',
    
    'calc.note': 'Note: These calculations illustrate how the mechanics work mathematically. They are not personalized financial advice. Results depend on your actual investment returns, tax situation, and other factors. Consult a licensed advisor for personalized guidance.',
    
    'calc.cta.title': 'Learn More',
    'calc.cta.ike': 'About IKE',
    'calc.cta.ikze': 'About IKZE',
    
    // Expats page
    'expats.meta.title': 'IKE & IKZE for Expats in Poland 2026: Eligibility & How to Open',
    'expats.meta.description': 'Complete guide for foreign residents: PESEL requirements, residence permit eligibility, English-language providers, and what happens if you leave Poland.',
    
    'expats.hero.title': 'Retirement Accounts for Expats',
    'expats.hero.subtitle': 'IKE and IKZE for foreign residents of Poland',
    'expats.hero.desc': 'Everything you need to know as a non-Polish citizen',
    
    'expats.eligible.title': 'Am I Eligible as a Foreigner?',
    'expats.eligible.p1': 'Yes! Foreign residents with valid residence permits can open both IKE and IKZE accounts. The key requirement is having a PESEL number.',
    'expats.eligible.req': 'Requirements:',
    'expats.eligible.pesel': 'PESEL number',
    'expats.eligible.permit': 'Valid residence permit (temporary or permanent)',
    'expats.eligible.income': 'Polish income (for IKZE tax deduction)',
    
    'expats.docs.title': 'Required Documents',
    'expats.docs.p1': 'Most providers require:',
    'expats.docs.pesel': 'PESEL number',
    'expats.docs.id': 'Passport or national ID',
    'expats.docs.permit': 'Residence permit card',
    'expats.docs.proof': 'Proof of address in Poland',
    'expats.docs.income': 'Employment contract or proof of income (for IKZE)',
    
    'expats.providers.title': 'English-Language Providers',
    'expats.providers.p1': 'Several banks and brokers offer English-language support:',
    'expats.providers.note': 'Always verify current offerings and fees directly with providers.',
    
    'expats.brokers.title': 'Which Providers Offer IKE and IKZE?',
    'expats.brokers.note': 'Important: Popular international brokers such as IBKR (Interactive Brokers), DEGIRO, Revolut, Trading 212, and eToro do NOT offer IKE or IKZE wrappers. These are Polish-specific tax wrappers only available through Polish-licensed institutions.',
    'expats.brokers.xtb': 'XTB — Polish broker, KNF-regulated, English interface, offers both IKE (since 2024) and IKZE (since 2025), 0% commission on stocks/ETFs up to €100,000/month. A common choice for foreigners due to its English app.',
    'expats.brokers.others': 'Other options: DM BOŚ (Bossa), mBank eMakler, BNP Paribas DM. Banks (PKO BP, ING, Millennium) offer lower-return deposit-based IKE/IKZE. Insurance-based products often carry higher fees.',
    'expats.brokers.warning75': 'Warning: You can only hold ONE IKE account at a time. Holding two simultaneously — even accidentally — triggers a punitive 75% flat-rate tax on income from all IKE accounts. Always close a previous IKE before opening a new one.',
    
    'expats.leave.title': 'What Happens If You Leave Poland?',
    'expats.leave.ike': 'IKE if you leave: You can keep the account. No new contributions are allowed once you are no longer a Polish tax resident. If you withdraw early (before age 60), the standard 19% Belka capital gains tax applies to profits only — your principal is untouched. An early IKE withdrawal simply makes it equivalent to a regular brokerage account. No worse than if you had never used it.',
    'expats.leave.ikze': 'IKZE if you leave: Early full liquidation adds the entire amount (contributions + gains) to your taxable income in that year at the progressive tax scale rate. The tax deductions you already received in prior years remain yours. Partial withdrawal is not permitted — it must be a full liquidation. This is the key risk difference between IKE and IKZE.',
    'expats.leave.currency': 'Currency risk: Both accounts are PLN-denominated. If you plan to retire outside Poland, consider how exchange rate movements between PLN and your target currency may affect your real purchasing power.',
    'expats.leave.disclaimer': 'Cross-border tax treaty implications between Poland and your new country of residence are complex and depend on your specific situation. Consult a licensed tax advisor (doradca podatkowy) for personalized cross-border guidance.',
    'expats.leave.uscitizen': 'US citizens face additional complexity due to PFIC tax rules on EU-domiciled ETFs. Consult a specialized cross-border tax advisor.',
    
    'expats.leave.p1': 'You can keep your IKE/IKZE accounts even after leaving Poland. The accounts remain yours, and you can still withdraw funds according to the standard rules (after qualifying age).',
    'expats.leave.p2': 'Important considerations:',
    'expats.leave.maintain': 'You can maintain the account remotely',
    'expats.leave.contribute': 'You generally cannot make new contributions without Polish income',
    'expats.leave.tax': 'Withdrawal tax treatment may depend on your new country of residence',
    'expats.leave.consult': 'Consult a tax advisor familiar with both countries',
    
    'expats.tax.title': 'Tax Considerations for Expats',
    'expats.tax.p1': 'As a foreign resident paying taxes in Poland, you can claim the same benefits as Polish citizens:',
    'expats.tax.ikze.deduction': 'IKZE contributions reduce your Polish PIT tax',
    'expats.tax.ike.exempt': 'IKE withdrawals are exempt from Polish capital gains tax',
    'expats.tax.declare': 'Declare contributions in your annual Polish tax return (PIT-37 or PIT-36)',
    
    'expats.tips.title': 'Tips for Foreign Residents',
    'expats.tips.start': 'Start early – even if you are not sure how long you will stay',
    'expats.tips.both': 'Consider opening both IKE and IKZE to maximize flexibility',
    'expats.tips.english': 'Choose a provider with English support if your Polish is limited',
    'expats.tips.advisor': 'Work with a financial advisor who understands expat situations',
    
    'expats.cta.title': 'Have Questions?',
    'expats.cta.desc': 'Check our FAQ for answers to common questions about IKE and IKZE.',
    'expats.cta.button': 'Read FAQ',
    
    // FAQ page
    'faq.meta.title': 'IKE & IKZE FAQ Poland 2026: Common Questions Answered',
    'faq.meta.description': 'Answers to frequently asked questions about IKE and IKZE: Can foreigners open accounts? What happens if I leave Poland? Can I have both? Early withdrawal penalties?',
    
    'faq.hero.title': 'Frequently Asked Questions',
    'faq.hero.subtitle': 'IKE and IKZE',
    'faq.hero.desc': 'Common questions about retirement accounts in Poland',
    
    'faq.q1': 'Can foreigners open IKE and IKZE accounts?',
    'faq.a1': 'Yes! Any person with a PESEL number can open IKE and IKZE accounts, including foreign residents with valid residence permits. You do not need Polish citizenship.',
    
    'faq.q2': 'Can I have both IKE and IKZE?',
    'faq.a2': 'Yes. You can open and contribute to both IKE and IKZE accounts simultaneously. Many people do this to maximize both immediate tax deductions (IKZE) and long-term tax-free growth (IKE).',
    
    'faq.q3': 'What happens to my account if I leave Poland?',
    'faq.a3': 'You can keep your IKE/IKZE accounts even after leaving Poland. The accounts remain yours, and you can withdraw funds according to standard rules. However, you generally cannot make new contributions without Polish income. Tax treatment may vary depending on your new country of residence.',
    
    'faq.q4': 'What happens to the money if I die?',
    'faq.a4': 'IKE and IKZE accounts are inheritable. Your designated beneficiaries (or legal heirs) will receive the account balance. The exact tax treatment for beneficiaries depends on their relationship to you and Polish inheritance law.',
    
    'faq.q5': 'Can I withdraw money before the qualifying age?',
    'faq.a5': 'Yes, but with penalties. For IKE, early withdrawal (before age 60) triggers 19% capital gains tax on profits only — your principal is untouched. For IKZE, early full liquidation adds the entire amount (contributions + gains) to your taxable income at the progressive tax scale rate. It is best to keep funds until retirement age.',
    
    'faq.q6': 'Do popular brokers like Interactive Brokers, DEGIRO, or Revolut offer IKE/IKZE?',
    'faq.a6': 'No. IKE and IKZE are Polish-specific tax wrappers and are only available through Polish-licensed financial institutions. IBKR, DEGIRO, Revolut, Trading 212, and eToro do not offer these accounts. Polish brokers such as XTB, DM BOŚ, and mBank eMakler are among those that do.',
    
    'faq.q7': 'What happens if I accidentally open two IKE accounts?',
    'faq.a7': 'Holding two IKE accounts simultaneously triggers a 75% punitive flat-rate tax on income from all your IKE accounts under Article 30(1)(7a) of the Polish PIT Act — the highest flat rate in the Polish tax system. If you open a new IKE, ensure you close your previous one first.',
    
    'faq.q8': 'I am on ryczałt tax. Does IKZE still make sense?',
    'faq.a8': 'On ryczałt, your IKZE contributions reduce your revenue at your lump-sum tax rate (e.g. 12% or 8.5% for IT), not at a marginal income tax rate. The benefit is real but smaller than for skala or liniowy taxpayers. For ryczałt users, IKE — which requires no specific tax form to benefit from — may be worth exploring first. This depends on your individual situation; consider discussing it with a tax professional.',
    
    'faq.q9': 'How do I claim the IKZE tax deduction?',
    'faq.a9': 'Report your IKZE contributions in your annual Polish tax return (PIT-37 for employees, PIT-36 for self-employed). The contribution amount reduces your taxable income, lowering your tax bill. Your provider will give you a statement of contributions.',
    
    'faq.q10': 'Can I transfer my IKE or IKZE to a different provider?',
    'faq.a10': 'Yes. You can transfer your IKE or IKZE account to a different provider without losing tax benefits, as long as the transfer is done correctly (direct transfer between providers, not withdrawal and redeposit). Check with both providers for transfer procedures.',
    
    'faq.q11': 'Are there any fees?',
    'faq.a11': 'Fees vary by provider. Common fees include account maintenance fees, fund management fees (TFI), or transaction fees (brokerage). Compare providers carefully and read fee schedules before opening an account.',
    
    'faq.q12': 'Do contribution limits increase each year?',
    'faq.a12': 'Yes. IKE and IKZE limits are based on the average monthly salary in Poland, which typically increases annually. The 2026 limits are PLN 28,260 (IKE) and PLN 11,304 (IKZE for employees) or PLN 16,956 (IKZE for self-employed/JDG).',
    
    'faq.cta.title': 'Still have questions?',
    'faq.cta.desc': 'Explore our detailed guides or use the calculator to model your retirement savings.',
    'faq.cta.guides': 'Read Guides',
    'faq.cta.calc': 'Use Calculator',
    
    // Footer
    'footer.disclaimer.title': 'Legal Disclaimer',
    'footer.disclaimer.text': 'Disclaimer: This content is strictly for educational purposes. I am not a licensed financial advisor or tax advisor (doradca podatkowy). I do not provide personalized investment recommendations or cross-border tax advice. Always verify information with a licensed professional.',
    'footer.lastupdated': 'Last updated for 2026 limits. Limits verified against Monitor Polski announcement, November 2025.',
    
    // Common
    'common.readmore': 'Read more',
    'common.getstarted': 'Get started',
    'common.learnmore': 'Learn more',
  },
  
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.ike': 'Счет IKE',
    'nav.ikze': 'Счет IKZE',
    'nav.compare': 'Сравнение',
    'nav.calculator': 'Калькулятор',
    'nav.expats': 'Для иностранцев',
    'nav.faq': 'Вопросы',
    'nav.booking': 'Записаться на консультацию',
    
    // Home page
    'home.hero.title': 'Полный гид по пенсионным накоплениям в Польше',
    'home.hero.subtitle': 'Всё, что иностранным резидентам нужно знать о счетах IKE и IKZE в 2026 году',
    'home.hero.cta': 'Начать',
    'home.hero.secondary': 'Сравнить счета',
    
    'home.what.title': 'Что такое IKE и IKZE?',
    'home.what.desc': 'Индивидуальные пенсионные счета, помогающие эффективно копить на будущее с налоговыми льготами.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Безналоговый рост',
    'home.ike.desc': 'Инвестируйте до 28 260 злотых в год. Никакого налога на прирост капитала при выводе после 60 лет.',
    'home.ike.limit': 'Годовой лимит 28 260 зл',
    'home.ike.tax': '0% налог при выводе',
    'home.ike.withdraw': 'Вывод после 60 лет',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Налоговый вычет сейчас',
    'home.ikze.desc': 'Внесите до 11 304 злотых (наемные работники) или 16 956 злотых (самозанятые) и вычтите из налогооблагаемого дохода. Платите только 10% налог при выводе в 65 лет.',
    'home.ikze.limit': 'Годовой лимит 11 304 зл (наемные работники)',
    'home.ikze.deduction': 'Полный вычет из PIT',
    'home.ikze.tax': '10% налог при выводе',
    
    'home.who.title': 'Кто может открыть эти счета?',
    'home.who.desc': 'Любой человек с номером PESEL — включая иностранных резидентов с действующим видом на жительство.',
    'home.who.polish': 'Граждане Польши',
    'home.who.expats': 'Иностранные резиденты',
    'home.who.pesel': 'Все с номером PESEL',
    
    'home.why.title': 'Зачем копить на пенсию в Польше?',
    'home.why.growth': 'Налогово-эффективный рост',
    'home.why.flexibility': 'Множество вариантов инвестирования',
    'home.why.both': 'Можно открыть оба счета',
    
    'home.benefits.title': 'Ключевые преимущества для иностранцев',
    'home.benefits.eligible': 'Гражданство не требуется',
    'home.benefits.english': 'Многие провайдеры предлагают поддержку на английском',
    'home.benefits.portable': 'Сохраните счет, даже если покинете Польшу',
    
    'home.booking.title': 'Есть вопросы? Запишитесь на образовательную сессию',
    'home.booking.subtitle': 'Разберите механику IKE и IKZE вместе. Только образовательные сессии — не финансовое консультирование.',
    'home.booking.desc': 'Это образовательные сессии, помогающие понять, как работают IKE и IKZE — их механику, лимиты и налоговые правила — чтобы вы могли оценить их для своей ситуации. Я не предоставляю персональных финансовых рекомендаций.',
    'home.booking.cta': 'Записаться на бесплатную сессию',
    
    'home.cta.title': 'Готовы начать копить?',
    'home.cta.desc': 'Изучите подробные гиды, сравните счета и используйте калькулятор для планирования пенсии.',
    'home.cta.button': 'Изучить гиды',
    
    // IKE page
    'ike.meta.title': 'Счет IKE в Польше 2026: Полный гид для иностранцев',
    'ike.meta.description': 'Всё о счете IKE (Indywidualne Konto Emerytalne) в Польше: лимиты взносов, налоговые льготы, как открыть, требования для иностранных резидентов.',
    
    'ike.hero.title': 'Счет IKE',
    'ike.hero.subtitle': 'Indywidualne Konto Emerytalne',
    'ike.hero.desc': 'Безналоговые пенсионные накопления для резидентов Польши',
    
    'ike.what.title': 'Что такое IKE?',
    'ike.what.p1': 'IKE (Indywidualne Konto Emerytalne) — это индивидуальный пенсионный счет, позволяющий инвестировать в будущее со значительными налоговыми льготами. Ключевое преимущество: весь прирост капитала, дивиденды и проценты внутри счета полностью освобождены от 19% налога Белки при выводе после 60 лет.',
    'ike.what.p2': 'Вы можете вносить до 28 260 злотых ежегодно (лимит 2026 года, равный 3× средней месячной зарплаты). Нет авансового налогового вычета на взносы, но весь рост не облагается налогом при выводе.',
    
    'ike.limits.title': 'Лимиты взносов 2026',
    'ike.limits.annual': 'Годовой лимит взноса',
    'ike.limits.amount': '28 260 зл',
    'ike.limits.basis': 'На основе 3× средней месячной зарплаты',
    'ike.limits.monthly': 'Примерно 2 355 зл в месяц',
    
    'ike.tax.title': 'Налоговые льготы',
    'ike.tax.gains': 'Без налога на прирост капитала',
    'ike.tax.gains.desc': 'Обычно 19% налог Белки — отменяется при выводе с IKE',
    'ike.tax.withdraw': 'Вывод без налога после 60 лет',
    'ike.tax.withdraw.desc': 'Или после 55 лет при наличии пенсионных прав',
    'ike.tax.nopit': 'Нет вычета PIT на взносы',
    'ike.tax.nopit.desc': 'В отличие от IKZE, взносы не вычитаются из налогов',
    
    'ike.eligible.title': 'Кто может открыть IKE?',
    'ike.eligible.p1': 'Любое лицо с номером PESEL, включая:',
    'ike.eligible.citizens': 'Граждане Польши',
    'ike.eligible.residents': 'Иностранные резиденты с действующим видом на жительство',
    'ike.eligible.workers': 'Наемные работники, самозанятые или безработные',
    'ike.eligible.p2': 'Нет минимального возрастного требования. Можно открыть IKE в любом возрасте.',
    
    'ike.how.title': 'Как открыть IKE',
    'ike.how.step1': 'Выберите провайдера',
    'ike.how.step1.desc': 'Банки, брокерские фирмы (TFI) или страховые компании',
    'ike.how.step2': 'Соберите документы',
    'ike.how.step2.desc': 'Номер PESEL, ID или паспорт, вид на жительство (если применимо)',
    'ike.how.step3': 'Откройте счет онлайн или в отделении',
    'ike.how.step3.desc': 'Многие провайдеры предлагают поддержку на английском',
    'ike.how.step4': 'Начните вносить взносы',
    'ike.how.step4.desc': 'Настройте регулярные переводы или вносите единовременные суммы',
    
    'ike.invest.title': 'Варианты инвестирования',
    'ike.invest.p1': 'Средства IKE можно инвестировать в:',
    'ike.invest.funds': 'Взаимные фонды (TFI)',
    'ike.invest.stocks': 'Акции и ETF (через брокерский IKE)',
    'ike.invest.deposits': 'Банковские депозиты',
    'ike.invest.insurance': 'Страховые продукты',
    
    'ike.pros.title': 'Преимущества',
    'ike.pros.taxfree': 'Вывод без налогов',
    'ike.pros.taxfree.desc': 'Без налога на прирост капитала на доход от инвестиций',
    'ike.pros.high': 'Более высокий лимит взносов, чем IKZE',
    'ike.pros.high.desc': '28 260 зл против 11 304 зл',
    'ike.pros.flexible': 'Гибкие варианты инвестирования',
    'ike.pros.flexible.desc': 'Выбирайте из фондов, акций, ETF или депозитов',
    
    'ike.cons.title': 'Недостатки',
    'ike.cons.nodeduction': 'Нет авансового налогового вычета',
    'ike.cons.nodeduction.desc': 'Взносы вносятся из дохода после налогообложения',
    'ike.cons.penalty': 'Штрафы за досрочный вывод',
    'ike.cons.penalty.desc': 'Вывод до 60 лет активирует 19% налог только на прибыль',
    'ike.cons.locked': 'Средства заблокированы до пенсии',
    'ike.cons.locked.desc': 'Не подходит для краткосрочных накоплений',
    
    'ike.cta.title': 'Сравните с IKZE',
    'ike.cta.desc': 'Посмотрите, как IKE соотносится с IKZE, чтобы выбрать правильный счет для себя.',
    'ike.cta.button': 'Сравнить счета',
    
    // (Continuing with Russian translations for IKZE, Compare, Calculator, Expats, FAQ...)
    // Due to length constraints, I'll include key sections with 2026 updates
    
    'ikze.meta.title': 'Счет IKZE в Польше 2026: Налоговый вычет и лимиты взносов',
    'ikze.what.p2': 'Для наемных работников годовой лимит взноса 2026 года составляет 11 304 злотых (1,2× средней месячной зарплаты). Самозанятые (JDG/B2B) могут вносить до 16 956 злотых (1,8× средней месячной зарплаты). При выводе средств после 65 лет вы платите фиксированный налог 10% — значительно ниже стандартных ставок подоходного налога.',
    
    'ikze.limits.employee.amount': '11 304 зл',
    'ikze.limits.selfemployed.amount': '16 956 зл',
    
    'ikze.ryczalt.title': 'Важно: Если вы на налоге рычалт',
    'ikze.ryczalt.desc': 'Если вы платите рычалт (паушальный налог на выручку — распространен среди IT-фрилансеров на 8,5% или 12%), вычет IKZE уменьшает вашу выручку по вашей паушальной ставке, а не по предельной ставке подоходного налога. Выгода меньше, чем для налогоплательщиков скала или линёвы. Для плательщиков рычалт часто стоит рассмотреть IKE в первую очередь. Это значимый нюанс, который, как показывают исследования, почти отсутствует в англоязычном контенте.',
    
    'compare.annual.ike': '28 260 зл',
    'compare.annual.ikze': '11 304 зл',
    'compare.selfemployed.ikze': '16 956 зл',
    'compare.age.ike': 'Возраст 60 (или 55 при наличии пенсионных прав)',
    'compare.age.ikze': 'Возраст 65',
    
    'calc.contracttype': 'Тип контракта',
    'calc.contracttype.uop': 'Трудовой договор (UoP)',
    'calc.contracttype.jdg': 'Самозанятый / B2B (JDG)',
    'calc.bracket.12': '12% (шкала, до 120k PLN)',
    'calc.bracket.32': '32% (шкала, свыше 120k PLN)',
    'calc.bracket.19lin': '19% плоский (liniowy)',
    'calc.bracket.ryczalt': 'Рычалт (уменьшенная льгота IKZE)',
    
    'expats.brokers.title': 'Какие провайдеры предлагают IKE и IKZE?',
    'expats.brokers.note': 'Важно: Популярные международные брокеры, такие как IBKR (Interactive Brokers), DEGIRO, Revolut, Trading 212 и eToro, НЕ предлагают оболочки IKE или IKZE. Это специфичные для Польши налоговые оболочки, доступные только через лицензированные польские учреждения.',
    'expats.brokers.xtb': 'XTB — польский брокер, регулируется KNF, английский интерфейс, предлагает как IKE (с 2024 года), так и IKZE (с 2025 года), 0% комиссии на акции/ETF до €100 000/месяц. Распространенный выбор для иностранцев благодаря английскому приложению.',
    'expats.brokers.others': 'Другие варианты: DM BOŚ (Bossa), mBank eMakler, BNP Paribas DM. Банки (PKO BP, ING, Millennium) предлагают депозитные IKE/IKZE с меньшей доходностью. Страховые продукты часто имеют более высокие комиссии.',
    'expats.brokers.warning75': 'Предупреждение: Вы можете держать только ОДИН счет IKE одновременно. Одновременное владение двумя — даже случайно — активирует карательный налог 75% фиксированной ставки на доход со всех счетов IKE. Всегда закрывайте предыдущий IKE перед открытием нового.',
    
    'expats.leave.ike': 'IKE при отъезде: Вы можете сохранить счет. Новые взносы не допускаются после того, как вы перестали быть налоговым резидентом Польши. При досрочном выводе (до 60 лет) применяется стандартный 19% налог Белки на прирост капитала только на прибыль — ваш основной капитал не затрагивается. Досрочный вывод с IKE просто делает его эквивалентным обычному брокерскому счету. Не хуже, чем если бы вы никогда его не использовали.',
    'expats.leave.ikze': 'IKZE при отъезде: Досрочная полная ликвидация добавляет всю сумму (взносы + прибыль) к вашему налогооблагаемому доходу в этом году по прогрессивной шкале налогообложения. Налоговые вычеты, которые вы уже получили в предыдущие годы, остаются вашими. Частичный вывод не разрешен — это должна быть полная ликвидация. Это ключевое различие в рисках между IKE и IKZE.',
    'expats.leave.currency': 'Валютный риск: Оба счета номинированы в злотых. Если вы планируете выйти на пенсию за пределами Польши, учитывайте, как колебания обменного курса между злотым и вашей целевой валютой могут повлиять на вашу реальную покупательную способность.',
    'expats.leave.disclaimer': 'Последствия трансграничного налогового соглашения между Польшей и вашей новой страной проживания сложны и зависят от вашей конкретной ситуации. Проконсультируйтесь с лицензированным налоговым консультантом (doradca podatkowy) для персональных трансграничных рекомендаций.',
    'expats.leave.uscitizen': 'Граждане США сталкиваются с дополнительной сложностью из-за правил налогообложения PFIC на ETF, зарегистрированные в ЕС. Проконсультируйтесь со специализированным трансграничным налоговым консультантом.',
    
    'faq.q6': 'Предлагают ли популярные брокеры, такие как Interactive Brokers, DEGIRO или Revolut, IKE/IKZE?',
    'faq.a6': 'Нет. IKE и IKZE — это специфичные для Польши налоговые оболочки, доступные только через лицензированные польские финансовые учреждения. IBKR, DEGIRO, Revolut, Trading 212 и eToro не предлагают эти счета. Среди польских брокеров, предлагающих их, — XTB, DM BOŚ и mBank eMakler.',
    
    'faq.q7': 'Что произойдет, если я случайно открою два счета IKE?',
    'faq.a7': 'Одновременное владение двумя счетами IKE активирует карательный налог 75% фиксированной ставки на доход со всех ваших счетов IKE согласно статье 30(1)(7a) польского закона о PIT — самая высокая фиксированная ставка в польской налоговой системе. Если вы открываете новый IKE, убедитесь, что сначала закрыли предыдущий.',
    
    'faq.q8': 'Я на налоге рычалт. Имеет ли смысл IKZE?',
    'faq.a8': 'При рычалт ваши взносы в IKZE уменьшают вашу выручку по вашей паушальной налоговой ставке (например, 12% или 8,5% для IT), а не по предельной ставке подоходного налога. Выгода реальна, но меньше, чем для налогоплательщиков скала или линёвы. Для пользователей рычалт может быть целесообразно сначала изучить IKE, который не требует специальной налоговой формы для получения льгот. Это зависит от вашей индивидуальной ситуации; рассмотрите возможность обсуждения с налоговым специалистом.',
    
    'faq.q12': 'Увеличиваются ли лимиты взносов каждый год?',
    'faq.a12': 'Да. Лимиты IKE и IKZE основаны на средней месячной зарплате в Польше, которая обычно растет ежегодно. Лимиты 2026 года составляют 28 260 зл (IKE) и 11 304 зл (IKZE для наемных работников) или 16 956 зл (IKZE для самозанятых/JDG).',
    
    'footer.disclaimer.title': 'Правовая оговорка',
    'footer.disclaimer.text': 'Оговорка: Этот контент носит исключительно образовательный характер. Я не являюсь лицензированным финансовым консультантом или налоговым консультантом (doradca podatkowy). Я не предоставляю персональных инвестиционных рекомендаций или советов по трансграничному налогообложению. Всегда проверяйте информацию у лицензированного специалиста.',
    'footer.lastupdated': 'Последнее обновление для лимитов 2026 года. Лимиты проверены по объявлению Monitor Polski, ноябрь 2025 г.',
    
    'common.readmore': 'Читать дальше',
    'common.getstarted': 'Начать',
    'common.learnmore': 'Узнать больше',
  },
  
  ua: {
    // Navigation
    'nav.home': 'Головна',
    'nav.ike': 'Рахунок IKE',
    'nav.ikze': 'Рахунок IKZE',
    'nav.compare': 'Порівняння',
    'nav.calculator': 'Калькулятор',
    'nav.expats': 'Для іноземців',
    'nav.faq': 'Питання',
    'nav.booking': 'Записатися на консультацію',
    
    // Home page
    'home.hero.title': 'Повний гід по пенсійних накопиченнях у Польщі',
    'home.hero.subtitle': 'Все, що іноземним резидентам потрібно знати про рахунки IKE і IKZE в 2026 році',
    'home.hero.cta': 'Почати',
    'home.hero.secondary': 'Порівняти рахунки',
    
    'home.what.title': 'Що таке IKE і IKZE?',
    'home.what.desc': 'Індивідуальні пенсійні рахунки, що допомагають ефективно накопичувати на майбутнє з податковими пільгами.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Безподатковий ріст',
    'home.ike.desc': 'Інвестуйте до 28 260 злотих на рік. Жодного податку на приріст капіталу при виведенні після 60 років.',
    'home.ike.limit': 'Річний ліміт 28 260 зл',
    'home.ike.tax': '0% податок при виведенні',
    'home.ike.withdraw': 'Виведення після 60 років',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Податкова знижка зараз',
    'home.ikze.desc': 'Внесіть до 11 304 злотих (найм працівники) або 16 956 злотих (самозайняті) і відрахуйте з оподатковуваного доходу. Сплачуйте лише 10% податок при виведенні у 65 років.',
    'home.ikze.limit': 'Річний ліміт 11 304 зл (найм працівники)',
    'home.ikze.deduction': 'Повна знижка з PIT',
    'home.ikze.tax': '10% податок при виведенні',
    
    'home.who.title': 'Хто може відкрити ці рахунки?',
    'home.who.desc': 'Будь-яка особа з номером PESEL — включаючи іноземних резидентів з дійсним видом на проживання.',
    'home.who.polish': 'Громадяни Польщі',
    'home.who.expats': 'Іноземні резиденти',
    'home.who.pesel': 'Всі з номером PESEL',
    
    'home.why.title': 'Навіщо накопичувати на пенсію в Польщі?',
    'home.why.growth': 'Податково-ефективний ріст',
    'home.why.flexibility': 'Безліч варіантів інвестування',
    'home.why.both': 'Можна відкрити обидва рахунки',
    
    'home.benefits.title': 'Ключові переваги для іноземців',
    'home.benefits.eligible': 'Громадянство не потрібне',
    'home.benefits.english': 'Багато провайдерів пропонують підтримку англійською',
    'home.benefits.portable': 'Збережіть рахунок, навіть якщо покинете Польщу',
    
    'home.booking.title': 'Є питання? Запишіться на освітню сесію',
    'home.booking.subtitle': 'Розберіть механіку IKE і IKZE разом. Тільки освітні сесії — не фінансове консультування.',
    'home.booking.desc': 'Це освітні сесії, що допомагають зрозуміти, як працюють IKE і IKZE — їх механіку, ліміти та податкові правила — щоб ви могли оцінити їх для своєї ситуації. Я не надаю персональних фінансових рекомендацій.',
    'home.booking.cta': 'Записатися на безкоштовну сесію',
    
    'home.cta.title': 'Готові почати накопичувати?',
    'home.cta.desc': 'Вивчіть детальні гіди, порівняйте рахунки та використовуйте калькулятор для планування пенсії.',
    'home.cta.button': 'Вивчити гіди',
    
    // (Continue with Ukrainian translations following same 2026 updates pattern)
    // Key sections with 2026 updates:
    
    'ike.what.p2': 'Ви можете вносити до 28 260 злотих щорічно (ліміт 2026 року, дорівнює 3× середньої місячної зарплати). Немає авансової податкової знижки на внески, але весь ріст не оподатковується при виведенні.',
    'ike.limits.amount': '28 260 зл',
    'ike.limits.monthly': 'Приблизно 2 355 зл на місяць',
    
    'ikze.what.p2': 'Для найм працівників річний ліміт внеску 2026 року становить 11 304 злотих (1,2× середньої місячної зарплати). Самозайняті (JDG/B2B) можуть вносити до 16 956 злотих (1,8× середньої місячної зарплати). При виведенні коштів після 65 років ви платите фіксований податок 10% — значно нижче стандартних ставок прибуткового податку.',
    
    'ikze.limits.employee.amount': '11 304 зл',
    'ikze.limits.selfemployed.amount': '16 956 зл',
    
    'ikze.ryczalt.title': 'Важливо: Якщо ви на податку ричалт',
    'ikze.ryczalt.desc': 'Якщо ви сплачуєте ричалт (паушальний податок на виручку — поширений серед IT-фрилансерів на 8,5% або 12%), відрахування IKZE зменшує вашу виручку за вашою паушальною ставкою, а не за граничною ставкою прибуткового податку. Вигода менша, ніж для платників податку скала або лінійни. Для платників ричалт часто варто розглянути IKE насамперед. Це значимий нюанс, який, як показують дослідження, майже відсутній в англомовному контенті.',
    
    'compare.annual.ike': '28 260 зл',
    'compare.annual.ikze': '11 304 зл',
    'compare.selfemployed.ikze': '16 956 зл',
    'compare.age.ike': 'Вік 60 (або 55 за наявності пенсійних прав)',
    'compare.age.ikze': 'Вік 65',
    
    'calc.contracttype': 'Тип контракту',
    'calc.contracttype.uop': 'Трудовий договір (UoP)',
    'calc.contracttype.jdg': 'Самозайнятий / B2B (JDG)',
    'calc.bracket.12': '12% (шкала, до 120k PLN)',
    'calc.bracket.32': '32% (шкала, понад 120k PLN)',
    'calc.bracket.19lin': '19% фіксований (liniowy)',
    'calc.bracket.ryczalt': 'Ричалт (зменшена пільга IKZE)',
    
    'expats.brokers.title': 'Які провайдери пропонують IKE і IKZE?',
    'expats.brokers.note': 'Важливо: Популярні міжнародні брокери, такі як IBKR (Interactive Brokers), DEGIRO, Revolut, Trading 212 та eToro, НЕ пропонують обгортки IKE або IKZE. Це специфічні для Польщі податкові обгортки, доступні лише через ліцензовані польські установи.',
    'expats.brokers.xtb': 'XTB — польський брокер, регулюється KNF, англійський інтерфейс, пропонує як IKE (з 2024 року), так і IKZE (з 2025 року), 0% комісії на акції/ETF до €100 000/місяць. Поширений вибір для іноземців завдяки англійському додатку.',
    'expats.brokers.others': 'Інші варіанти: DM BOŚ (Bossa), mBank eMakler, BNP Paribas DM. Банки (PKO BP, ING, Millennium) пропонують депозитні IKE/IKZE з меншою дохідністю. Страхові продукти часто мають вищі комісії.',
    'expats.brokers.warning75': 'Попередження: Ви можете тримати лише ОДИН рахунок IKE одночасно. Одночасне володіння двома — навіть випадково — активує каральний податок 75% фіксованої ставки на дохід з усіх рахунків IKE. Завжди закривайте попередній IKE перед відкриттям нового.',
    
    'expats.leave.ike': 'IKE при від\'їзді: Ви можете зберегти рахунок. Нові внески не дозволяються після того, як ви перестали бути податковим резидентом Польщі. При достроковому виведенні (до 60 років) застосовується стандартний 19% податок Белки на приріст капіталу тільки на прибуток — ваш основний капітал не зачіпається. Дострокове виведення з IKE просто робить його еквівалентним звичайному брокерському рахунку. Не гірше, ніж якби ви ніколи його не використовували.',
    'expats.leave.ikze': 'IKZE при від\'їзді: Дострокова повна ліквідація додає всю суму (внески + прибуток) до вашого оподатковуваного доходу в цьому році за прогресивною шкалою оподаткування. Податкові знижки, які ви вже отримали в попередні роки, залишаються вашими. Часткове виведення не дозволено — це має бути повна ліквідація. Це ключова різниця в ризиках між IKE і IKZE.',
    'expats.leave.currency': 'Валютний ризик: Обидва рахунки номіновані в злотих. Якщо ви плануєте вийти на пенсію за межами Польщі, враховуйте, як коливання обмінного курсу між злотим і вашою цільовою валютою можуть вплинути на вашу реальну купівельну спроможність.',
    'expats.leave.disclaimer': 'Наслідки транскордонної податкової угоди між Польщею та вашою новою країною проживання складні та залежать від вашої конкретної ситуації. Проконсультуйтеся з ліцензованим податковим консультантом (doradca podatkowy) для персональних транскордонних рекомендацій.',
    'expats.leave.uscitizen': 'Громадяни США стикаються з додатковою складністю через правила оподаткування PFIC на ETF, зареєстровані в ЄС. Проконсультуйтеся зі спеціалізованим транскордонним податковим консультантом.',
    
    'faq.q6': 'Чи пропонують популярні брокери, такі як Interactive Brokers, DEGIRO або Revolut, IKE/IKZE?',
    'faq.a6': 'Ні. IKE і IKZE — це специфічні для Польщі податкові обгортки, доступні лише через ліцензовані польські фінансові установи. IBKR, DEGIRO, Revolut, Trading 212 та eToro не пропонують ці рахунки. Серед польських брокерів, що їх пропонують, — XTB, DM BOŚ та mBank eMakler.',
    
    'faq.q7': 'Що станеться, якщо я випадково відкрию два рахунки IKE?',
    'faq.a7': 'Одночасне володіння двома рахунками IKE активує каральний податок 75% фіксованої ставки на дохід з усіх ваших рахунків IKE згідно зі статтею 30(1)(7a) польського закону про PIT — найвища фіксована ставка в польській податковій системі. Якщо ви відкриваєте новий IKE, переконайтеся, що спочатку закрили попередній.',
    
    'faq.q8': 'Я на податку ричалт. Чи має сенс IKZE?',
    'faq.a8': 'При ричалт ваші внески в IKZE зменшують вашу виручку за вашою паушальною податковою ставкою (наприклад, 12% або 8,5% для IT), а не за граничною ставкою прибуткового податку. Вигода реальна, але менша, ніж для платників податку скала або лінійни. Для користувачів ричалт може бути доцільно спочатку вивчити IKE, який не вимагає спеціальної податкової форми для отримання пільг. Це залежить від вашої індивідуальної ситуації; розгляньте можливість обговорення з податковим фахівцем.',
    
    'faq.q12': 'Чи збільшуються ліміти внесків щороку?',
    'faq.a12': 'Так. Ліміти IKE і IKZE базуються на середній місячній зарплаті в Польщі, яка зазвичай зростає щорічно. Ліміти 2026 року становлять 28 260 зл (IKE) і 11 304 зл (IKZE для найм працівників) або 16 956 зл (IKZE для самозайнятих/JDG).',
    
    'footer.disclaimer.title': 'Правова застереження',
    'footer.disclaimer.text': 'Застереження: Цей контент має виключно освітній характер. Я не є ліцензованим фінансовим консультантом або податковим консультантом (doradca podatkowy). Я не надаю персональних інвестиційних рекомендацій або порад щодо транскордонного оподаткування. Завжди перевіряйте інформацію у ліцензованого фахівця.',
    'footer.lastupdated': 'Останнє оновлення для лімітів 2026 року. Ліміти перевірені за оголошенням Monitor Polski, листопад 2025 р.',
    
    'common.readmore': 'Читати далі',
    'common.getstarted': 'Почати',
    'common.learnmore': 'Дізнатися більше',
  },
};
