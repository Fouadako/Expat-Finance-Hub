import IKE from '@/pages/IKE';
import { on } from 'cluster';
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
    
    // Home page
    'home.hero.title': 'Your Complete Guide to Retirement Savings in Poland',
    'home.hero.subtitle': 'Everything expats and foreign residents need to know about IKE and IKZE accounts in 2025',
    'home.hero.cta': 'Get Started',
    'home.hero.secondary': 'Compare Accounts',
    
    'home.what.title': 'What are IKE and IKZE?',
    'home.what.desc': 'Individual retirement accounts designed to help you save tax-efficiently for your future in Poland.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Tax-Free Growth',
    'home.ike.desc': 'Invest up to PLN 23,472 per year. No capital gains tax on withdrawals after age 60.',
    'home.ike.limit': 'PLN 23,472 annual limit',
    'home.ike.tax': '0% tax on qualified withdrawals',
    'home.ike.withdraw': 'Withdraw after age 60',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Tax Deduction Now',
    'home.ikze.desc': 'Contribute up to PLN 9,388.80 and deduct from your taxable income. Pay only 10% tax on withdrawal.',
    'home.ikze.limit': 'PLN 9,388.80 annual limit',
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
    
    'home.cta.title': 'Ready to Start Saving?',
    'home.cta.desc': 'Explore detailed guides, compare accounts, and use our calculator to plan your retirement.',
    'home.cta.button': 'Explore Guides',
    
    // IKE page
    'ike.meta.title': 'IKE Account Poland 2025: Complete Guide for Expats',
    'ike.meta.description': 'Everything you need to know about IKE (Indywidualne Konto Emerytalne) in Poland: contribution limits, tax benefits, how to open, and eligibility for foreign residents.',
    
    'ike.hero.title': 'IKE Account',
    'ike.hero.subtitle': 'Indywidualne Konto Emerytalne',
    'ike.hero.desc': 'Tax-free retirement savings for residents of Poland',
    
    'ike.what.title': 'What is IKE?',
    'ike.what.p1': 'IKE (Indywidualne Konto Emerytalne) is an individual retirement account that allows you to invest for your future with significant tax advantages. The key benefit: all capital gains, dividends, and interest earned inside the account are completely exempt from the 19% Belka tax when you withdraw after age 60.',
    'ike.what.p2': 'You can contribute up to PLN 23,472 annually (2025 limit, equal to 3× the average monthly salary). There is no upfront tax deduction on contributions, but all growth is tax-free at withdrawal.',
    
    'ike.limits.title': '2025 Contribution Limits',
    'ike.limits.annual': 'Annual contribution limit',
    'ike.limits.amount': 'PLN 23,472',
    'ike.limits.basis': 'Based on 3× average monthly salary',
    'ike.limits.monthly': 'Approximately PLN 1,956 per month',
    
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
    'ike.pros.high.desc': 'PLN 23,472 vs. PLN 9,388.80',
    'ike.pros.flexible': 'Flexible investment options',
    'ike.pros.flexible.desc': 'Choose from funds, stocks, ETFs, or deposits',
    
    'ike.cons.title': 'Disadvantages',
    'ike.cons.nodeduction': 'No upfront tax deduction',
    'ike.cons.nodeduction.desc': 'Contributions are made with post-tax income',
    'ike.cons.penalty': 'Early withdrawal penalties',
    'ike.cons.penalty.desc': 'Withdrawing before age 60 triggers 19% tax + possible penalties',
    'ike.cons.locked': 'Funds locked until retirement',
    'ike.cons.locked.desc': 'Not suitable for short-term savings',
    
    'ike.cta.title': 'Compare with IKZE',
    'ike.cta.desc': 'See how IKE stacks up against IKZE to choose the right account for you.',
    'ike.cta.button': 'Compare Accounts',
    
    // IKZE page
    'ikze.meta.title': 'IKZE Account Poland 2025: Tax Deduction & Contribution Limits',
    'ikze.meta.description': 'Complete guide to IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): PLN 9,388.80 annual limit, PIT tax deduction, 10% withdrawal tax, and eligibility for expats.',
    
    'ikze.hero.title': 'IKZE Account',
    'ikze.hero.subtitle': 'Indywidualne Konto Zabezpieczenia Emerytalnego',
    'ikze.hero.desc': 'Tax-deductible retirement savings with immediate tax benefits',
    
    'ikze.what.title': 'What is IKZE?',
    'ikze.what.p1': 'IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego) is an individual retirement security account that offers an immediate tax benefit: contributions are fully deductible from your PIT (Personal Income Tax) taxable income.',
    'ikze.what.p2': 'For employees, the 2025 annual contribution limit is PLN 9,388.80 (1.2× average monthly salary). Self-employed individuals can contribute up to PLN 14,083.20. When you withdraw funds after retirement age, you pay a flat 10% tax — significantly lower than standard income tax rates.',
    
    'ikze.limits.title': '2025 Contribution Limits',
    'ikze.limits.employee': 'Employees',
    'ikze.limits.employee.amount': 'PLN 9,388.80',
    'ikze.limits.selfemployed': 'Self-employed',
    'ikze.limits.selfemployed.amount': 'PLN 14,083.20',
    'ikze.limits.basis': 'Based on 1.2× (employees) or 1.8× (self-employed) average monthly salary',
    
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
    'ikze.eligible.selfemployed': 'Self-employed (działalność gospodarcza)',
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
    'ikze.pros.low.desc': 'Only 10% flat tax, vs. 17-32% income tax',
    'ikze.pros.selfemployed': 'Higher limit for self-employed',
    'ikze.pros.selfemployed.desc': 'PLN 14,083.20 annual contribution',
    
    'ikze.cons.title': 'Disadvantages',
    'ikze.cons.lower': 'Lower contribution limit',
    'ikze.cons.lower.desc': 'PLN 9,388.80 for employees vs. PLN 23,472 for IKE',
    'ikze.cons.tax': 'Withdrawal is taxed',
    'ikze.cons.tax.desc': 'Unlike IKE, you pay 10% tax when withdrawing',
    'ikze.cons.penalty': 'Early withdrawal penalties',
    'ikze.cons.penalty.desc': 'Taxed at full income tax rate if withdrawn early',
    
    'ikze.cta.title': 'Compare with IKE',
    'ikze.cta.desc': 'See how IKZE differs from IKE to make the best choice for your situation.',
    'ikze.cta.button': 'Compare Accounts',
    
    // Compare page
    'compare.meta.title': 'IKE vs IKZE: Complete Comparison Poland 2025',
    'compare.meta.description': 'Side-by-side comparison of IKE and IKZE retirement accounts: contribution limits, tax benefits, withdrawal rules, and which is best for your profile.',
    
    'compare.hero.title': 'IKE vs. IKZE',
    'compare.hero.subtitle': 'Side-by-side comparison',
    'compare.hero.desc': 'Choose the right retirement account for your situation',
    
    'compare.table.feature': 'Feature',
    'compare.table.ike': 'IKE',
    'compare.table.ikze': 'IKZE',
    
    'compare.annual': 'Annual contribution limit (employees)',
    'compare.annual.ike': 'PLN 23,472',
    'compare.annual.ikze': 'PLN 9,388.80',
    
    'compare.selfemployed': 'Self-employed limit',
    'compare.selfemployed.ike': 'PLN 23,472',
    'compare.selfemployed.ikze': 'PLN 14,083.20',
    
    'compare.deduction': 'Tax deduction on contributions',
    'compare.deduction.ike': 'No',
    'compare.deduction.ikze': 'Yes (full PIT deduction)',
    
    'compare.withdraw.tax': 'Tax on withdrawal',
    'compare.withdraw.tax.ike': '0% (tax-free)',
    'compare.withdraw.tax.ikze': '10% flat rate',
    
    'compare.age': 'Withdrawal age',
    'compare.age.both': 'Age 60 (or 55 with pension rights)',
    
    'compare.invest': 'Investment options',
    'compare.invest.ike': 'Funds, stocks, ETFs, bank deposits, insurance',
    'compare.invest.ikze': 'Funds, stocks, ETFs, insurance (no bank deposits)',
    
    'compare.eligible': 'Eligibility',
    'compare.eligible.both': 'Anyone with PESEL number',
    
    'compare.early': 'Early withdrawal penalty',
    'compare.early.ike': '19% capital gains tax + penalties',
    'compare.early.ikze': 'Full income tax rate + penalties',
    
    'compare.both.title': 'Can You Have Both?',
    'compare.both.desc': 'Yes! You can open both IKE and IKZE accounts simultaneously. Many financial advisors recommend contributing to both to maximize tax benefits.',
    'compare.both.strategy': 'Common strategy: Max out IKZE first for the immediate tax deduction, then contribute remaining savings to IKE for higher limits and tax-free growth.',
    
    'compare.best.title': 'Which is Best for You?',
    
    'compare.choose.ike': 'Choose IKE if...',
    'compare.choose.ike.high': 'You want to save more than PLN 9,388.80 per year',
    'compare.choose.ike.taxfree': 'You prefer tax-free withdrawals over upfront deductions',
    'compare.choose.ike.horizon': 'You have a long time horizon and expect significant growth',
    
    'compare.choose.ikze': 'Choose IKZE if...',
    'compare.choose.ikze.immediate': 'You want immediate tax savings this year',
    'compare.choose.ikze.bracket': 'You are in a higher tax bracket (17% or 32%)',
    'compare.choose.ikze.selfemployed': 'You are self-employed and want to reduce taxable income',
    
    'compare.choose.both': 'Choose both if...',
    'compare.choose.both.max': 'You can afford to max out both accounts',
    'compare.choose.both.optimize': 'You want to optimize both immediate and long-term tax benefits',
    'compare.choose.both.diversify': 'You want to diversify your retirement savings strategy',
    
    'compare.cta.title': 'Ready to Calculate Your Savings?',
    'compare.cta.desc': 'Use our interactive calculator to see projected returns for IKE and IKZE.',
    'compare.cta.button': 'Use Calculator',
    
    // Calculator page
    'calc.meta.title': 'IKE & IKZE Savings Calculator Poland 2025',
    'calc.meta.description': 'Calculate projected retirement savings, tax benefits, and returns for IKE and IKZE accounts. Compare outcomes and estimate your future balance.',
    
    'calc.hero.title': 'Retirement Savings Calculator',
    'calc.hero.subtitle': 'Estimate your IKE and IKZE returns',
    'calc.hero.desc': 'Project your retirement balance and tax savings',
    
    'calc.inputs.title': 'Your Inputs',
    'calc.monthly': 'Monthly contribution',
    'calc.return': 'Expected annual return',
    'calc.years': 'Years until retirement',
    'calc.bracket': 'Your tax bracket',
    'calc.bracket.12': '12% (lowest)',
    'calc.bracket.17': '17%',
    'calc.bracket.32': '32% (highest)',
    
    'calc.results.title': 'Projected Results',
    'calc.results.balance': 'Final balance',
    'calc.results.contributed': 'Total contributed',
    'calc.results.returns': 'Investment returns',
    'calc.results.tax': 'Tax savings vs. regular account',
    'calc.results.aftertax': 'After-tax withdrawal value',
    
    'calc.ike.title': 'IKE Projection',
    'calc.ikze.title': 'IKZE Projection',
    'calc.regular.title': 'Regular Brokerage (for comparison)',
    
    'calc.note': 'Note: This calculator provides estimates only. Actual returns depend on investment performance, future tax law changes, and other factors. Consult a financial advisor for personalized advice.',
    
    'calc.cta.title': 'Learn More',
    'calc.cta.ike': 'About IKE',
    'calc.cta.ikze': 'About IKZE',
    
    // Expats page
    'expats.meta.title': 'IKE & IKZE for Expats in Poland 2025: Eligibility & How to Open',
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
    
    'expats.leave.title': 'What If I Leave Poland?',
    'expats.leave.p1': 'You can keep your IKE/IKZE accounts even after leaving Poland. The accounts remain yours, and you can still withdraw funds according to the standard rules (after age 60).',
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
    'faq.meta.title': 'IKE & IKZE FAQ Poland 2025: Common Questions Answered',
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
    
    'faq.q5': 'Can I withdraw money before age 60?',
    'faq.a5': 'Yes, but with penalties. For IKE, early withdrawal triggers 19% capital gains tax plus potential penalties. For IKZE, early withdrawal is taxed at your full income tax rate (17-32%) plus penalties. It is best to keep funds until retirement age.',
    
    'faq.q6': 'Which providers offer English-language support?',
    'faq.a6': 'Several banks and brokers offer English support, including some international banks operating in Poland and online brokers. Check directly with providers for current language support and account opening procedures.',
    
    'faq.q7': 'How do I claim the IKZE tax deduction?',
    'faq.a7': 'Report your IKZE contributions in your annual Polish tax return (PIT-37 for employees, PIT-36 for self-employed). The contribution amount reduces your taxable income, lowering your tax bill. Your provider will give you a statement of contributions.',
    
    'faq.q8': 'Can I transfer my IKE or IKZE to a different provider?',
    'faq.a8': 'Yes. You can transfer your IKE or IKZE account to a different provider without losing tax benefits, as long as the transfer is done correctly (direct transfer between providers, not withdrawal and redeposit). Check with both providers for transfer procedures.',
    
    'faq.q9': 'What is the difference between IKE and a regular brokerage account?',
    'faq.a9': 'In a regular brokerage account, you pay 19% capital gains tax (Belka tax) on profits when you sell. In an IKE, there is no capital gains tax on withdrawals after age 60. This can result in significantly higher returns over decades of investing.',
    
    'faq.q10': 'Are there any fees?',
    'faq.a10': 'Fees vary by provider. Common fees include account maintenance fees, fund management fees (TFI), or transaction fees (brokerage). Compare providers carefully and read fee schedules before opening an account.',
    
    'faq.q11': 'Can I contribute more than the annual limit?',
    'faq.a11': 'No. Contributions above the annual limit (PLN 23,472 for IKE, PLN 9,388.80 for IKZE employees) will not receive tax benefits and may trigger penalties. Stay within the limits.',
    
    'faq.q12': 'Do contribution limits increase each year?',
    'faq.a12': 'Yes. IKE and IKZE limits are based on the average monthly salary in Poland, which typically increases annually. The 2025 limits are PLN 23,472 (IKE) and PLN 9,388.80 (IKZE for employees).',
    
    'faq.cta.title': 'Still have questions?',
    'faq.cta.desc': 'Explore our detailed guides or use the calculator to model your retirement savings.',
    'faq.cta.guides': 'Read Guides',
    'faq.cta.calc': 'Use Calculator',
    
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
    
    // Home page
    'home.hero.title': 'Полный гид по пенсионным накоплениям в Польше',
    'home.hero.subtitle': 'Всё, что иностранным резидентам нужно знать о счетах IKE и IKZE в 2025 году',
    'home.hero.cta': 'Начать',
    'home.hero.secondary': 'Сравнить счета',
    
    'home.what.title': 'Что такое IKE и IKZE?',
    'home.what.desc': 'Индивидуальные пенсионные счета, помогающие эффективно копить на будущее с налоговыми льготами.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Безналоговый рост',
    'home.ike.desc': 'Инвестируйте до 23 472 злотых в год. Никакого налога на прирост капитала при выводе после 60 лет.',
    'home.ike.limit': 'Годовой лимит 23 472 зл',
    'home.ike.tax': '0% налог при выводе',
    'home.ike.withdraw': 'Вывод после 60 лет',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Налоговый вычет сейчас',
    'home.ikze.desc': 'Внесите до 9 388,80 злотых и вычтите из налогооблагаемого дохода. Платите только 10% налог при выводе.',
    'home.ikze.limit': 'Годовой лимит 9 388,80 зл',
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
    
    'home.cta.title': 'Готовы начать копить?',
    'home.cta.desc': 'Изучите подробные гиды, сравните счета и используйте калькулятор для планирования пенсии.',
    'home.cta.button': 'Изучить гиды',
    
    // IKE page
    'ike.meta.title': 'Счет IKE в Польше 2025: Полный гид для иностранцев',
    'ike.meta.description': 'Всё о счете IKE (Indywidualne Konto Emerytalne) в Польше: лимиты взносов, налоговые льготы, как открыть, требования для иностранных резидентов.',
    
    'ike.hero.title': 'Счет IKE',
    'ike.hero.subtitle': 'Indywidualne Konto Emerytalne',
    'ike.hero.desc': 'Безналоговые пенсионные накопления для резидентов Польши',
    
    'ike.what.title': 'Что такое IKE?',
    'ike.what.p1': 'IKE (Indywidualne Konto Emerytalne) — индивидуальный пенсионный счет, позволяющий инвестировать в будущее со значительными налоговыми преимуществами. Главное преимущество: весь прирост капитала, дивиденды и проценты внутри счета полностью освобождены от 19% налога Белки при выводе после 60 лет.',
    'ike.what.p2': 'Вы можете вносить до 23 472 злотых в год (лимит 2025 года, равный 3× средней месячной зарплаты). Нет налогового вычета на взносы, но весь рост не облагается налогом при выводе.',
    
    'ike.limits.title': 'Лимиты взносов на 2025 год',
    'ike.limits.annual': 'Годовой лимит взноса',
    'ike.limits.amount': '23 472 зл',
    'ike.limits.basis': 'На основе 3× средней месячной зарплаты',
    'ike.limits.monthly': 'Примерно 1 956 зл в месяц',
    
    'ike.tax.title': 'Налоговые льготы',
    'ike.tax.gains': 'Нет налога на прирост капитала',
    'ike.tax.gains.desc': 'Обычно 19% налог Белки — отменяется при выводе с IKE',
    'ike.tax.withdraw': 'Вывод без налога после 60 лет',
    'ike.tax.withdraw.desc': 'Или после 55 лет при наличии пенсионных прав',
    'ike.tax.nopit': 'Нет вычета из PIT на взносы',
    'ike.tax.nopit.desc': 'В отличие от IKZE, взносы не вычитаются из налога',
    
    'ike.eligible.title': 'Кто может открыть IKE?',
    'ike.eligible.p1': 'Любое лицо с номером PESEL, включая:',
    'ike.eligible.citizens': 'Граждане Польши',
    'ike.eligible.residents': 'Иностранные резиденты с действующим видом на жительство',
    'ike.eligible.workers': 'Работающие, самозанятые или безработные',
    'ike.eligible.p2': 'Нет минимального возраста. Можно открыть IKE в любом возрасте.',
    
    'ike.how.title': 'Как открыть IKE',
    'ike.how.step1': 'Выберите провайдера',
    'ike.how.step1.desc': 'Банки, брокерские фирмы (TFI) или страховые компании',
    'ike.how.step2': 'Соберите документы',
    'ike.how.step2.desc': 'Номер PESEL, ID или паспорт, вид на жительство (если применимо)',
    'ike.how.step3': 'Откройте счет онлайн или в офисе',
    'ike.how.step3.desc': 'Многие провайдеры предлагают поддержку на английском',
    'ike.how.step4': 'Начните вносить средства',
    'ike.how.step4.desc': 'Настройте регулярные переводы или вносите единовременно',
    
    'ike.invest.title': 'Варианты инвестирования',
    'ike.invest.p1': 'Средства IKE можно инвестировать в:',
    'ike.invest.funds': 'Взаимные фонды (TFI)',
    'ike.invest.stocks': 'Акции и ETF (через брокерский IKE)',
    'ike.invest.deposits': 'Банковские депозиты',
    'ike.invest.insurance': 'Страховые продукты',
    
    'ike.pros.title': 'Преимущества',
    'ike.pros.taxfree': 'Вывод без налога',
    'ike.pros.taxfree.desc': 'Нет налога на прирост капитала',
    'ike.pros.high': 'Более высокий лимит, чем IKZE',
    'ike.pros.high.desc': '23 472 зл против 9 388,80 зл',
    'ike.pros.flexible': 'Гибкие варианты инвестирования',
    'ike.pros.flexible.desc': 'Фонды, акции, ETF или депозиты',
    
    'ike.cons.title': 'Недостатки',
    'ike.cons.nodeduction': 'Нет налогового вычета на взносы',
    'ike.cons.nodeduction.desc': 'Взносы делаются из дохода после налогообложения',
    'ike.cons.penalty': 'Штрафы за досрочный вывод',
    'ike.cons.penalty.desc': 'Вывод до 60 лет облагается 19% налогом + штрафы',
    'ike.cons.locked': 'Средства заблокированы до пенсии',
    'ike.cons.locked.desc': 'Не подходит для краткосрочных накоплений',
    
    'ike.cta.title': 'Сравнить с IKZE',
    'ike.cta.desc': 'Посмотрите, как IKE сравнивается с IKZE, чтобы выбрать подходящий счет.',
    'ike.cta.button': 'Сравнить счета',
    
    // IKZE page
    'ikze.meta.title': 'Счет IKZE в Польше 2025: Налоговый вычет и лимиты взносов',
    'ikze.meta.description': 'Полный гид по IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): годовой лимит 9 388,80 зл, вычет из PIT, 10% налог при выводе, требования для иностранцев.',
    
    'ikze.hero.title': 'Счет IKZE',
    'ikze.hero.subtitle': 'Indywidualne Konto Zabezpieczenia Emerytalnego',
    'ikze.hero.desc': 'Пенсионные накопления с налоговым вычетом и немедленной выгодой',
    
    'ikze.what.title': 'Что такое IKZE?',
    'ikze.what.p1': 'IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego) — индивидуальный счет пенсионного обеспечения, предлагающий немедленную налоговую льготу: взносы полностью вычитаются из налогооблагаемого дохода PIT.',
    'ikze.what.p2': 'Для работающих по найму годовой лимит взноса в 2025 году составляет 9 388,80 злотых (1,2× средней месячной зарплаты). Самозанятые могут вносить до 14 083,20 злотых. При выводе средств после пенсионного возраста вы платите фиксированный налог 10% — значительно ниже стандартных ставок подоходного налога.',
    
    'ikze.limits.title': 'Лимиты взносов на 2025 год',
    'ikze.limits.employee': 'Работающие по найму',
    'ikze.limits.employee.amount': '9 388,80 зл',
    'ikze.limits.selfemployed': 'Самозанятые',
    'ikze.limits.selfemployed.amount': '14 083,20 зл',
    'ikze.limits.basis': 'На основе 1,2× (наёмные) или 1,8× (самозанятые) средней месячной зарплаты',
    
    'ikze.tax.title': 'Налоговые льготы',
    'ikze.tax.deduction': 'Полный вычет из PIT',
    'ikze.tax.deduction.desc': 'Уменьшите налогооблагаемый доход на сумму взноса',
    'ikze.tax.savings': 'Немедленная экономия налога',
    'ikze.tax.savings.desc': 'Экономия 12-32% от взноса в зависимости от налоговой ставки',
    'ikze.tax.withdraw': '10% налог при выводе',
    'ikze.tax.withdraw.desc': 'Намного ниже стандартных ставок подоходного налога',
    
    'ikze.eligible.title': 'Кто может открыть IKZE?',
    'ikze.eligible.p1': 'Любое лицо с номером PESEL, платящее налог PIT в Польше:',
    'ikze.eligible.employed': 'Работающие по трудовому договору (umowa o pracę)',
    'ikze.eligible.selfemployed': 'Самозанятые (działalność gospodarcza)',
    'ikze.eligible.contract': 'Работающие по договору подряда (umowa zlecenie)',
    'ikze.eligible.p2': 'Иностранные резиденты с действующим видом на жительство имеют право.',
    
    'ikze.how.title': 'Как открыть IKZE',
    'ikze.how.step1': 'Выберите провайдера',
    'ikze.how.step1.desc': 'Банки, инвестиционные фонды (TFI) или страховые компании',
    'ikze.how.step2': 'Подготовьте документы',
    'ikze.how.step2.desc': 'PESEL, ID/паспорт, подтверждение дохода (для самозанятых)',
    'ikze.how.step3': 'Откройте счет',
    'ikze.how.step3.desc': 'Онлайн или лично, многие предлагают поддержку на английском',
    'ikze.how.step4': 'Вносите и заявляйте вычет',
    'ikze.how.step4.desc': 'Укажите взносы в годовой налоговой декларации PIT',
    
    'ikze.invest.title': 'Варианты инвестирования',
    'ikze.invest.p1': 'Средства IKZE можно инвестировать в:',
    'ikze.invest.funds': 'Взаимные фонды (TFI)',
    'ikze.invest.stocks': 'Акции и ETF (через брокерский IKZE)',
    'ikze.invest.insurance': 'Страховые продукты',
    'ikze.invest.note': 'Примечание: банковские депозиты недоступны для IKZE (только для IKE)',
    
    'ikze.pros.title': 'Преимущества',
    'ikze.pros.immediate': 'Немедленный налоговый вычет',
    'ikze.pros.immediate.desc': 'Снизьте налоги в этом году',
    'ikze.pros.low': 'Низкий налог при выводе',
    'ikze.pros.low.desc': 'Всего 10%, против 17-32% подоходного налога',
    'ikze.pros.selfemployed': 'Более высокий лимит для самозанятых',
    'ikze.pros.selfemployed.desc': '14 083,20 зл годового взноса',
    
    'ikze.cons.title': 'Недостатки',
    'ikze.cons.lower': 'Более низкий лимит взноса',
    'ikze.cons.lower.desc': '9 388,80 зл для наёмных против 23 472 зл для IKE',
    'ikze.cons.tax': 'Вывод облагается налогом',
    'ikze.cons.tax.desc': 'В отличие от IKE, вы платите 10% налог при выводе',
    'ikze.cons.penalty': 'Штрафы за досрочный вывод',
    'ikze.cons.penalty.desc': 'Облагается полной ставкой подоходного налога при досрочном выводе',
    
    'ikze.cta.title': 'Сравнить с IKE',
    'ikze.cta.desc': 'Посмотрите, чем IKZE отличается от IKE, чтобы сделать лучший выбор.',
    'ikze.cta.button': 'Сравнить счета',
    
    // Compare page
    'compare.meta.title': 'IKE против IKZE: Полное сравнение Польша 2025',
    'compare.meta.description': 'Сравнение пенсионных счетов IKE и IKZE: лимиты взносов, налоговые льготы, правила вывода, какой счет лучше для вашей ситуации.',
    
    'compare.hero.title': 'IKE против IKZE',
    'compare.hero.subtitle': 'Сравнение',
    'compare.hero.desc': 'Выберите подходящий пенсионный счет',
    
    'compare.table.feature': 'Параметр',
    'compare.table.ike': 'IKE',
    'compare.table.ikze': 'IKZE',
    
    'compare.annual': 'Годовой лимит (наёмные)',
    'compare.annual.ike': '23 472 зл',
    'compare.annual.ikze': '9 388,80 зл',
    
    'compare.selfemployed': 'Лимит для самозанятых',
    'compare.selfemployed.ike': '23 472 зл',
    'compare.selfemployed.ikze': '14 083,20 зл',
    
    'compare.deduction': 'Налоговый вычет на взносы',
    'compare.deduction.ike': 'Нет',
    'compare.deduction.ikze': 'Да (полный вычет из PIT)',
    
    'compare.withdraw.tax': 'Налог при выводе',
    'compare.withdraw.tax.ike': '0% (без налога)',
    'compare.withdraw.tax.ikze': '10% фиксированная ставка',
    
    'compare.age': 'Возраст вывода',
    'compare.age.both': '60 лет (или 55 при наличии пенсионных прав)',
    
    'compare.invest': 'Варианты инвестирования',
    'compare.invest.ike': 'Фонды, акции, ETF, банковские депозиты, страхование',
    'compare.invest.ikze': 'Фонды, акции, ETF, страхование (без банковских депозитов)',
    
    'compare.eligible': 'Требования',
    'compare.eligible.both': 'Любой с номером PESEL',
    
    'compare.early': 'Штраф за досрочный вывод',
    'compare.early.ike': '19% налог на прирост капитала + штрафы',
    'compare.early.ikze': 'Полная ставка подоходного налога + штрафы',
    
    'compare.both.title': 'Можно ли иметь оба счета?',
    'compare.both.desc': 'Да! Вы можете открыть оба счета IKE и IKZE одновременно. Многие финансовые консультанты рекомендуют вносить в оба счета для максимальной налоговой выгоды.',
    'compare.both.strategy': 'Частая стратегия: сначала максимально используйте IKZE для немедленного налогового вычета, затем оставшиеся накопления вносите в IKE для более высоких лимитов и безналогового роста.',
    
    'compare.best.title': 'Какой счет лучше для вас?',
    
    'compare.choose.ike': 'Выбирайте IKE, если...',
    'compare.choose.ike.high': 'Хотите откладывать больше 9 388,80 зл в год',
    'compare.choose.ike.taxfree': 'Предпочитаете вывод без налога вместо вычета',
    'compare.choose.ike.horizon': 'У вас долгосрочный горизонт и ожидаете значительный рост',
    
    'compare.choose.ikze': 'Выбирайте IKZE, если...',
    'compare.choose.ikze.immediate': 'Хотите немедленную экономию налога в этом году',
    'compare.choose.ikze.bracket': 'Вы в высокой налоговой ставке (17% или 32%)',
    'compare.choose.ikze.selfemployed': 'Вы самозанятый и хотите снизить налогооблагаемый доход',
    
    'compare.choose.both': 'Выбирайте оба, если...',
    'compare.choose.both.max': 'Можете позволить максимально использовать оба счета',
    'compare.choose.both.optimize': 'Хотите оптимизировать как немедленные, так и долгосрочные налоговые льготы',
    'compare.choose.both.diversify': 'Хотите диверсифицировать стратегию пенсионных накоплений',
    
    'compare.cta.title': 'Готовы рассчитать свои накопления?',
    'compare.cta.desc': 'Используйте наш интерактивный калькулятор для прогнозирования доходности IKE и IKZE.',
    'compare.cta.button': 'Калькулятор',
    
    // Calculator page
    'calc.meta.title': 'Калькулятор накоплений IKE и IKZE Польша 2025',
    'calc.meta.description': 'Рассчитайте прогнозируемые пенсионные накопления, налоговые льготы и доходность для счетов IKE и IKZE. Сравните результаты и оцените будущий баланс.',
    
    'calc.hero.title': 'Калькулятор пенсионных накоплений',
    'calc.hero.subtitle': 'Оцените доходность IKE и IKZE',
    'calc.hero.desc': 'Спрогнозируйте пенсионный баланс и налоговую экономию',
    
    'calc.inputs.title': 'Ваши данные',
    'calc.monthly': 'Ежемесячный взнос',
    'calc.return': 'Ожидаемая годовая доходность',
    'calc.years': 'Лет до пенсии',
    'calc.bracket': 'Ваша налоговая ставка',
    'calc.bracket.12': '12% (низшая)',
    'calc.bracket.17': '17%',
    'calc.bracket.32': '32% (высшая)',
    
    'calc.results.title': 'Прогноз результатов',
    'calc.results.balance': 'Итоговый баланс',
    'calc.results.contributed': 'Всего внесено',
    'calc.results.returns': 'Инвестиционная доходность',
    'calc.results.tax': 'Экономия налога против обычного счета',
    'calc.results.aftertax': 'Сумма после налогов при выводе',
    
    'calc.ike.title': 'Прогноз IKE',
    'calc.ikze.title': 'Прогноз IKZE',
    'calc.regular.title': 'Обычный брокерский счет (для сравнения)',
    
    'calc.note': 'Примечание: Калькулятор дает только оценки. Фактическая доходность зависит от инвестиционных результатов, будущих изменений налогового законодательства и других факторов. Проконсультируйтесь с финансовым консультантом для персональных советов.',
    
    'calc.cta.title': 'Узнать больше',
    'calc.cta.ike': 'О счете IKE',
    'calc.cta.ikze': 'О счете IKZE',
    
    // Expats page
    'expats.meta.title': 'IKE и IKZE для иностранцев в Польше 2025: Требования и как открыть',
    'expats.meta.description': 'Полный гид для иностранных резидентов: требования PESEL, право на вид на жительство, провайдеры с английским языком, что происходит, если вы покинете Польшу.',
    
    'expats.hero.title': 'Пенсионные счета для иностранцев',
    'expats.hero.subtitle': 'IKE и IKZE для иностранных резидентов Польши',
    'expats.hero.desc': 'Всё, что нужно знать не-гражданам Польши',
    
    'expats.eligible.title': 'Имею ли я право как иностранец?',
    'expats.eligible.p1': 'Да! Иностранные резиденты с действующим видом на жительство могут открыть оба счета IKE и IKZE. Ключевое требование — наличие номера PESEL.',
    'expats.eligible.req': 'Требования:',
    'expats.eligible.pesel': 'Номер PESEL',
    'expats.eligible.permit': 'Действующий вид на жительство (временный или постоянный)',
    'expats.eligible.income': 'Доход в Польше (для налогового вычета IKZE)',
    
    'expats.docs.title': 'Необходимые документы',
    'expats.docs.p1': 'Большинство провайдеров требуют:',
    'expats.docs.pesel': 'Номер PESEL',
    'expats.docs.id': 'Паспорт или национальный ID',
    'expats.docs.permit': 'Карта вида на жительство',
    'expats.docs.proof': 'Подтверждение адреса в Польше',
    'expats.docs.income': 'Трудовой договор или подтверждение дохода (для IKZE)',
    
    'expats.providers.title': 'Провайдеры с английским языком',
    'expats.providers.p1': 'Несколько банков и брокеров предлагают поддержку на английском:',
    'expats.providers.note': 'Всегда проверяйте актуальные предложения и комиссии напрямую у провайдеров.',
    
    'expats.leave.title': 'Что, если я покину Польшу?',
    'expats.leave.p1': 'Вы можете сохранить счета IKE/IKZE даже после отъезда из Польши. Счета остаются вашими, и вы можете вывести средства согласно стандартным правилам (после 60 лет).',
    'expats.leave.p2': 'Важные аспекты:',
    'expats.leave.maintain': 'Вы можете вести счет удаленно',
    'expats.leave.contribute': 'Обычно нельзя делать новые взносы без польского дохода',
    'expats.leave.tax': 'Налогообложение при выводе может зависеть от новой страны проживания',
    'expats.leave.consult': 'Проконсультируйтесь с налоговым консультантом, знакомым с обеими странами',
    
    'expats.tax.title': 'Налоговые аспекты для иностранцев',
    'expats.tax.p1': 'Как иностранный резидент, платящий налоги в Польше, вы можете претендовать на те же льготы, что и граждане Польши:',
    'expats.tax.ikze.deduction': 'Взносы в IKZE снижают ваш польский налог PIT',
    'expats.tax.ike.exempt': 'Выводы с IKE освобождены от польского налога на прирост капитала',
    'expats.tax.declare': 'Укажите взносы в годовой польской налоговой декларации (PIT-37 или PIT-36)',
    
    'expats.tips.title': 'Советы для иностранных резидентов',
    'expats.tips.start': 'Начните рано — даже если не уверены, как долго останетесь',
    'expats.tips.both': 'Рассмотрите открытие обоих счетов для максимальной гибкости',
    'expats.tips.english': 'Выберите провайдера с поддержкой на английском, если ваш польский ограничен',
    'expats.tips.advisor': 'Работайте с финансовым консультантом, понимающим ситуацию экспатов',
    
    'expats.cta.title': 'Есть вопросы?',
    'expats.cta.desc': 'Посмотрите наш раздел часто задаваемых вопросов о IKE и IKZE.',
    'expats.cta.button': 'Читать FAQ',
    
    // FAQ page
    'faq.meta.title': 'FAQ по IKE и IKZE Польша 2025: Ответы на частые вопросы',
    'faq.meta.description': 'Ответы на частые вопросы об IKE и IKZE: Могут ли иностранцы открыть счета? Что происходит, если я покину Польшу? Можно ли иметь оба? Штрафы за досрочный вывод?',
    
    'faq.hero.title': 'Часто задаваемые вопросы',
    'faq.hero.subtitle': 'IKE и IKZE',
    'faq.hero.desc': 'Частые вопросы о пенсионных счетах в Польше',
    
    'faq.q1': 'Могут ли иностранцы открыть счета IKE и IKZE?',
    'faq.a1': 'Да! Любой человек с номером PESEL может открыть счета IKE и IKZE, включая иностранных резидентов с действующим видом на жительство. Гражданство Польши не требуется.',
    
    'faq.q2': 'Можно ли иметь оба счета IKE и IKZE?',
    'faq.a2': 'Да. Вы можете открыть и вносить средства в оба счета одновременно. Многие люди делают это для максимизации как немедленных налоговых вычетов (IKZE), так и долгосрочного безналогового роста (IKE).',
    
    'faq.q3': 'Что происходит со счетом, если я покину Польшу?',
    'faq.a3': 'Вы можете сохранить счета IKE/IKZE даже после отъезда из Польши. Счета остаются вашими, и вы можете вывести средства согласно стандартным правилам. Однако обычно нельзя делать новые взносы без польского дохода. Налогообложение может различаться в зависимости от новой страны проживания.',
    
    'faq.q4': 'Что происходит с деньгами, если я умру?',
    'faq.a4': 'Счета IKE и IKZE наследуются. Ваши назначенные бенефициары (или законные наследники) получат баланс счета. Точное налогообложение для бенефициаров зависит от их отношения к вам и польского закона о наследовании.',
    
    'faq.q5': 'Могу ли я вывести деньги до 60 лет?',
    'faq.a5': 'Да, но со штрафами. Для IKE досрочный вывод облагается 19% налогом на прирост капитала плюс возможные штрафы. Для IKZE досрочный вывод облагается полной ставкой подоходного налога (17-32%) плюс штрафы. Лучше держать средства до пенсионного возраста.',
    
    'faq.q6': 'Какие провайдеры предлагают поддержку на английском?',
    'faq.a6': 'Несколько банков и брокеров предлагают поддержку на английском, включая некоторые международные банки, работающие в Польше, и онлайн-брокеров. Проверяйте напрямую у провайдеров текущую языковую поддержку и процедуры открытия счета.',
    
    'faq.q7': 'Как получить налоговый вычет IKZE?',
    'faq.a7': 'Укажите взносы в IKZE в годовой польской налоговой декларации (PIT-37 для наёмных, PIT-36 для самозанятых). Сумма взноса уменьшает налогооблагаемый доход, снижая налоговый счет. Ваш провайдер выдаст справку о взносах.',
    
    'faq.q8': 'Могу ли я перевести IKE или IKZE к другому провайдеру?',
    'faq.a8': 'Да. Вы можете перевести счет IKE или IKZE к другому провайдеру без потери налоговых льгот, если перевод выполнен правильно (прямой перевод между провайдерами, а не вывод и повторное внесение). Уточните процедуру перевода у обоих провайдеров.',
    
    'faq.q9': 'В чём разница между IKE и обычным брокерским счетом?',
    'faq.a9': 'На обычном брокерском счете вы платите 19% налог на прирост капитала (налог Белки) при продаже. В IKE нет налога на прирост капитала при выводе после 60 лет. Это может привести к значительно более высокой доходности за десятилетия инвестирования.',
    
    'faq.q10': 'Есть ли комиссии?',
    'faq.a10': 'Комиссии варьируются по провайдерам. Распространённые комиссии включают обслуживание счета, управление фондами (TFI) или транзакционные комиссии (брокерские). Тщательно сравните провайдеров и изучите тарифы перед открытием счета.',
    
    'faq.q11': 'Могу ли я внести больше годового лимита?',
    'faq.a11': 'Нет. Взносы сверх годового лимита (23 472 зл для IKE, 9 388,80 зл для IKZE для наёмных) не получат налоговые льготы и могут вызвать штрафы. Соблюдайте лимиты.',
    
    'faq.q12': 'Увеличиваются ли лимиты взносов каждый год?',
    'faq.a12': 'Да. Лимиты IKE и IKZE основаны на средней месячной зарплате в Польше, которая обычно растет ежегодно. Лимиты 2025 года: 23 472 зл (IKE) и 9 388,80 зл (IKZE для наёмных).',
    
    'faq.cta.title': 'Остались вопросы?',
    'faq.cta.desc': 'Изучите наши подробные гиды или используйте калькулятор для моделирования пенсионных накоплений.',
    'faq.cta.guides': 'Читать гиды',
    'faq.cta.calc': 'Калькулятор',
    
    // Common
    'common.readmore': 'Читать далее',
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
    
    // Home page
    'home.hero.title': 'Повний гід по пенсійних накопиченнях у Польщі',
    'home.hero.subtitle': 'Все, що іноземним резидентам потрібно знати про рахунки IKE і IKZE у 2025 році',
    'home.hero.cta': 'Почати',
    'home.hero.secondary': 'Порівняти рахунки',
    
    'home.what.title': 'Що таке IKE і IKZE?',
    'home.what.desc': 'Індивідуальні пенсійні рахунки, які допомагають ефективно заощаджувати на майбутнє з податковими пільгами.',
    
    'home.ike.title': 'IKE',
    'home.ike.subtitle': 'Безподатковий ріст',
    'home.ike.desc': 'Інвестуйте до 23 472 злотих на рік. Жодного податку на приріст капіталу при виведенні після 60 років.',
    'home.ike.limit': 'Річний ліміт 23 472 зл',
    'home.ike.tax': '0% податок при виведенні',
    'home.ike.withdraw': 'Виведення після 60 років',
    
    'home.ikze.title': 'IKZE',
    'home.ikze.subtitle': 'Податкова знижка зараз',
    'home.ikze.desc': 'Внесіть до 9 388,80 злотих і вирахуйте з оподатковуваного доходу. Платіть лише 10% податок при виведенні.',
    'home.ikze.limit': 'Річний ліміт 9 388,80 зл',
    'home.ikze.deduction': 'Повне вирахування з PIT',
    'home.ikze.tax': '10% податок при виведенні',
    
    'home.who.title': 'Хто може відкрити ці рахунки?',
    'home.who.desc': 'Будь-яка людина з номером PESEL — включно з іноземними резидентами з діючим видом на проживання.',
    'home.who.polish': 'Громадяни Польщі',
    'home.who.expats': 'Іноземні резиденти',
    'home.who.pesel': 'Всі з номером PESEL',
    
    'home.why.title': 'Навіщо заощаджувати на пенсію в Польщі?',
    'home.why.growth': 'Податково-ефективне зростання',
    'home.why.flexibility': 'Безліч варіантів інвестування',
    'home.why.both': 'Можна відкрити обидва рахунки',
    
    'home.benefits.title': 'Ключові переваги для іноземців',
    'home.benefits.eligible': 'Громадянство не потрібне',
    'home.benefits.english': 'Багато провайдерів пропонують підтримку англійською',
    'home.benefits.portable': 'Збережіть рахунок, навіть якщо покинете Польщу',
    
    'home.cta.title': 'Готові почати заощаджувати?',
    'home.cta.desc': 'Вивчіть детальні гіди, порівняйте рахунки та використайте калькулятор для планування пенсії.',
    'home.cta.button': 'Вивчити гіди',
    
    // IKE page
    'ike.meta.title': 'Рахунок IKE у Польщі 2025: Повний гід для іноземців',
    'ike.meta.description': 'Все про рахунок IKE (Indywidualne Konto Emerytalne) у Польщі: ліміти внесків, податкові пільги, як відкрити, вимоги для іноземних резидентів.',
    
    'ike.hero.title': 'Рахунок IKE',
    'ike.hero.subtitle': 'Indywidualne Konto Emerytalne',
    'ike.hero.desc': 'Безподаткові пенсійні накопичення для резидентів Польщі',
    
    'ike.what.title': 'Що таке IKE?',
    'ike.what.p1': 'IKE (Indywidualne Konto Emerytalne) — індивідуальний пенсійний рахунок, що дозволяє інвестувати в майбутнє зі значними податковими перевагами. Головна перевага: весь приріст капіталу, дивіденди та відсотки всередині рахунку повністю звільнені від 19% податку Белки при виведенні після 60 років.',
    'ike.what.p2': 'Ви можете вносити до 23 472 злотих на рік (ліміт 2025 року, рівний 3× середньої місячної зарплати). Немає податкової знижки на внески, але весь ріст не оподатковується при виведенні.',
    
    'ike.limits.title': 'Ліміти внесків на 2025 рік',
    'ike.limits.annual': 'Річний ліміт внеску',
    'ike.limits.amount': '23 472 зл',
    'ike.limits.basis': 'На основі 3× середньої місячної зарплати',
    'ike.limits.monthly': 'Приблизно 1 956 зл на місяць',
    
    'ike.tax.title': 'Податкові пільги',
    'ike.tax.gains': 'Немає податку на приріст капіталу',
    'ike.tax.gains.desc': 'Зазвичай 19% податок Белки — скасовується при виведенні з IKE',
    'ike.tax.withdraw': 'Виведення без податку після 60 років',
    'ike.tax.withdraw.desc': 'Або після 55 років при наявності пенсійних прав',
    'ike.tax.nopit': 'Немає вирахування з PIT на внески',
    'ike.tax.nopit.desc': 'На відміну від IKZE, внески не вираховуються з податку',
    
    'ike.eligible.title': 'Хто може відкрити IKE?',
    'ike.eligible.p1': 'Будь-яка особа з номером PESEL, включно:',
    'ike.eligible.citizens': 'Громадяни Польщі',
    'ike.eligible.residents': 'Іноземні резиденти з діючим видом на проживання',
    'ike.eligible.workers': 'Працевлаштовані, самозайняті або безробітні',
    'ike.eligible.p2': 'Немає мінімального віку. Можна відкрити IKE у будь-якому віці.',
    
    'ike.how.title': 'Як відкрити IKE',
    'ike.how.step1': 'Оберіть провайдера',
    'ike.how.step1.desc': 'Банки, брокерські фірми (TFI) або страхові компанії',
    'ike.how.step2': 'Зберіть документи',
    'ike.how.step2.desc': 'Номер PESEL, ID або паспорт, вид на проживання (якщо застосовується)',
    'ike.how.step3': 'Відкрийте рахунок онлайн або в офісі',
    'ike.how.step3.desc': 'Багато провайдерів пропонують підтримку англійською',
    'ike.how.step4': 'Почніть вносити кошти',
    'ike.how.step4.desc': 'Налаштуйте регулярні перекази або вносьте одноразово',
    
    'ike.invest.title': 'Варіанти інвестування',
    'ike.invest.p1': 'Кошти IKE можна інвестувати в:',
    'ike.invest.funds': 'Взаємні фонди (TFI)',
    'ike.invest.stocks': 'Акції та ETF (через брокерський IKE)',
    'ike.invest.deposits': 'Банківські депозити',
    'ike.invest.insurance': 'Страхові продукти',
    
    'ike.pros.title': 'Переваги',
    'ike.pros.taxfree': 'Виведення без податку',
    'ike.pros.taxfree.desc': 'Немає податку на приріст капіталу',
    'ike.pros.high': 'Вищий ліміт, ніж IKZE',
    'ike.pros.high.desc': '23 472 зл проти 9 388,80 зл',
    'ike.pros.flexible': 'Гнучкі варіанти інвестування',
    'ike.pros.flexible.desc': 'Фонди, акції, ETF або депозити',
    
    'ike.cons.title': 'Недоліки',
    'ike.cons.nodeduction': 'Немає податкової знижки на внески',
    'ike.cons.nodeduction.desc': 'Внески робляться з доходу після оподаткування',
    'ike.cons.penalty': 'Штрафи за дострокове виведення',
    'ike.cons.penalty.desc': 'Виведення до 60 років оподатковується 19% податком + штрафи',
    'ike.cons.locked': 'Кошти заблоковані до пенсії',
    'ike.cons.locked.desc': 'Не підходить для короткострокових заощаджень',
    
    'ike.cta.title': 'Порівняти з IKZE',
    'ike.cta.desc': 'Подивіться, як IKE порівнюється з IKZE, щоб обрати підходящий рахунок.',
    'ike.cta.button': 'Порівняти рахунки',
    
    // IKZE page
    'ikze.meta.title': 'Рахунок IKZE у Польщі 2025: Податкова знижка та ліміти внесків',
    'ikze.meta.description': 'Повний гід по IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): річний ліміт 9 388,80 зл, вирахування з PIT, 10% податок при виведенні, вимоги для іноземців.',
    
    'ikze.hero.title': 'Рахунок IKZE',
    'ikze.hero.subtitle': 'Indywidualne Konto Zabezpieczenia Emerytalnego',
    'ikze.hero.desc': 'Пенсійні накопичення з податковою знижкою та негайною вигодою',
    
    'ikze.what.title': 'Що таке IKZE?',
    'ikze.what.p1': 'IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego) — індивідуальний рахунок пенсійного забезпечення, що пропонує негайну податкову пільгу: внески повністю вираховуються з оподатковуваного доходу PIT.',
    'ikze.what.p2': 'Для працюючих за наймом річний ліміт внеску у 2025 році становить 9 388,80 злотих (1,2× середньої місячної зарплати). Самозайняті можуть вносити до 14 083,20 злотих. При виведенні коштів після пенсійного віку ви платите фіксований податок 10% — значно нижче стандартних ставок прибуткового податку.',
    
    'ikze.limits.title': 'Ліміти внесків на 2025 рік',
    'ikze.limits.employee': 'Працюючі за наймом',
    'ikze.limits.employee.amount': '9 388,80 зл',
    'ikze.limits.selfemployed': 'Самозайняті',
    'ikze.limits.selfemployed.amount': '14 083,20 зл',
    'ikze.limits.basis': 'На основі 1,2× (найманні) або 1,8× (самозайняті) середньої місячної зарплати',
    
    'ikze.tax.title': 'Податкові пільги',
    'ikze.tax.deduction': 'Повне вирахування з PIT',
    'ikze.tax.deduction.desc': 'Зменшіть оподатковуваний дохід на суму внеску',
    'ikze.tax.savings': 'Негайна економія податку',
    'ikze.tax.savings.desc': 'Економія 12-32% від внеску залежно від податкової ставки',
    'ikze.tax.withdraw': '10% податок при виведенні',
    'ikze.tax.withdraw.desc': 'Набагато нижче стандартних ставок прибуткового податку',
    
    'ikze.eligible.title': 'Хто може відкрити IKZE?',
    'ikze.eligible.p1': 'Будь-яка особа з номером PESEL, що платить податок PIT у Польщі:',
    'ikze.eligible.employed': 'Працюючі за трудовим договором (umowa o pracę)',
    'ikze.eligible.selfemployed': 'Самозайняті (działalność gospodarcza)',
    'ikze.eligible.contract': 'Працюючі за договором підряду (umowa zlecenie)',
    'ikze.eligible.p2': 'Іноземні резиденти з діючим видом на проживання мають право.',
    
    'ikze.how.title': 'Як відкрити IKZE',
    'ikze.how.step1': 'Оберіть провайдера',
    'ikze.how.step1.desc': 'Банки, інвестиційні фонди (TFI) або страхові компанії',
    'ikze.how.step2': 'Підготуйте документи',
    'ikze.how.step2.desc': 'PESEL, ID/паспорт, підтвердження доходу (для самозайнятих)',
    'ikze.how.step3': 'Відкрийте рахунок',
    'ikze.how.step3.desc': 'Онлайн або особисто, багато пропонують підтримку англійською',
    'ikze.how.step4': 'Вносьте та заявляйте знижку',
    'ikze.how.step4.desc': 'Вкажіть внески в річній податковій декларації PIT',
    
    'ikze.invest.title': 'Варіанти інвестування',
    'ikze.invest.p1': 'Кошти IKZE можна інвестувати в:',
    'ikze.invest.funds': 'Взаємні фонди (TFI)',
    'ikze.invest.stocks': 'Акції та ETF (через брокерський IKZE)',
    'ikze.invest.insurance': 'Страхові продукти',
    'ikze.invest.note': 'Примітка: банківські депозити недоступні для IKZE (лише для IKE)',
    
    'ikze.pros.title': 'Переваги',
    'ikze.pros.immediate': 'Негайна податкова знижка',
    'ikze.pros.immediate.desc': 'Знизьте податки цього року',
    'ikze.pros.low': 'Низький податок при виведенні',
    'ikze.pros.low.desc': 'Лише 10%, проти 17-32% прибуткового податку',
    'ikze.pros.selfemployed': 'Вищий ліміт для самозайнятих',
    'ikze.pros.selfemployed.desc': '14 083,20 зл річного внеску',
    
    'ikze.cons.title': 'Недоліки',
    'ikze.cons.lower': 'Нижчий ліміт внеску',
    'ikze.cons.lower.desc': '9 388,80 зл для найманних проти 23 472 зл для IKE',
    'ikze.cons.tax': 'Виведення оподатковується',
    'ikze.cons.tax.desc': 'На відміну від IKE, ви платите 10% податок при виведенні',
    'ikze.cons.penalty': 'Штрафи за дострокове виведення',
    'ikze.cons.penalty.desc': 'Оподатковується повною ставкою прибуткового податку при достроковому виведенні',
    
    'ikze.cta.title': 'Порівняти з IKE',
    'ikze.cta.desc': 'Подивіться, чим IKZE відрізняється від IKE, щоб зробити кращий вибір.',
    'ikze.cta.button': 'Порівняти рахунки',
    
    // Compare page
    'compare.meta.title': 'IKE проти IKZE: Повне порівняння Польща 2025',
    'compare.meta.description': 'Порівняння пенсійних рахунків IKE та IKZE: ліміти внесків, податкові пільги, правила виведення, який рахунок краще для вашої ситуації.',
    
    'compare.hero.title': 'IKE проти IKZE',
    'compare.hero.subtitle': 'Порівняння',
    'compare.hero.desc': 'Оберіть підходящий пенсійний рахунок',
    
    'compare.table.feature': 'Параметр',
    'compare.table.ike': 'IKE',
    'compare.table.ikze': 'IKZE',
    
    'compare.annual': 'Річний ліміт (найманні)',
    'compare.annual.ike': '23 472 зл',
    'compare.annual.ikze': '9 388,80 зл',
    
    'compare.selfemployed': 'Ліміт для самозайнятих',
    'compare.selfemployed.ike': '23 472 зл',
    'compare.selfemployed.ikze': '14 083,20 зл',
    
    'compare.deduction': 'Податкова знижка на внески',
    'compare.deduction.ike': 'Ні',
    'compare.deduction.ikze': 'Так (повне вирахування з PIT)',
    
    'compare.withdraw.tax': 'Податок при виведенні',
    'compare.withdraw.tax.ike': '0% (без податку)',
    'compare.withdraw.tax.ikze': '10% фіксована ставка',
    
    'compare.age': 'Вік виведення',
    'compare.age.both': '60 років (або 55 за наявності пенсійних прав)',
    
    'compare.invest': 'Варіанти інвестування',
    'compare.invest.ike': 'Фонди, акції, ETF, банківські депозити, страхування',
    'compare.invest.ikze': 'Фонди, акції, ETF, страхування (без банківських депозитів)',
    
    'compare.eligible': 'Вимоги',
    'compare.eligible.both': 'Будь-хто з номером PESEL',
    
    'compare.early': 'Штраф за дострокове виведення',
    'compare.early.ike': '19% податок на приріст капіталу + штрафи',
    'compare.early.ikze': 'Повна ставка прибуткового податку + штрафи',
    
    'compare.both.title': 'Чи можна мати обидва рахунки?',
    'compare.both.desc': 'Так! Ви можете відкрити обидва рахунки IKE і IKZE одночасно. Багато фінансових консультантів рекомендують вносити в обидва рахунки для максимальної податкової вигоди.',
    'compare.both.strategy': 'Часта стратегія: спочатку максимально використайте IKZE для негайної податкової знижки, потім решту накопичень вносьте в IKE для вищих лімітів та безподаткового зростання.',
    
    'compare.best.title': 'Який рахунок краще для вас?',
    
    'compare.choose.ike': 'Обирайте IKE, якщо...',
    'compare.choose.ike.high': 'Хочете відкладати більше 9 388,80 зл на рік',
    'compare.choose.ike.taxfree': 'Віддаєте перевагу виведенню без податку замість знижки',
    'compare.choose.ike.horizon': 'Маєте довгостроковий горизонт і очікуєте значне зростання',
    
    'compare.choose.ikze': 'Обирайте IKZE, якщо...',
    'compare.choose.ikze.immediate': 'Хочете негайну економію податку цього року',
    'compare.choose.ikze.bracket': 'Ви у високій податковій ставці (17% або 32%)',
    'compare.choose.ikze.selfemployed': 'Ви самозайнятий і хочете знизити оподатковуваний дохід',
    
    'compare.choose.both': 'Обирайте обидва, якщо...',
    'compare.choose.both.max': 'Можете дозволити максимально використати обидва рахунки',
    'compare.choose.both.optimize': 'Хочете оптимізувати як негайні, так і довгострокові податкові пільги',
    'compare.choose.both.diversify': 'Хочете диверсифікувати стратегію пенсійних накопичень',
    
    'compare.cta.title': 'Готові розрахувати свої накопичення?',
    'compare.cta.desc': 'Використайте наш інтерактивний калькулятор для прогнозування доходності IKE та IKZE.',
    'compare.cta.button': 'Калькулятор',
    
    // Calculator page
    'calc.meta.title': 'Калькулятор накопичень IKE та IKZE Польща 2025',
    'calc.meta.description': 'Розрахуйте прогнозовані пенсійні накопичення, податкові пільги та дохідність для рахунків IKE та IKZE. Порівняйте результати та оцініть майбутній баланс.',
    
    'calc.hero.title': 'Калькулятор пенсійних накопичень',
    'calc.hero.subtitle': 'Оцініть дохідність IKE та IKZE',
    'calc.hero.desc': 'Спрогнозуйте пенсійний баланс та податкову економію',
    
    'calc.inputs.title': 'Ваші дані',
    'calc.monthly': 'Щомісячний внесок',
    'calc.return': 'Очікувана річна дохідність',
    'calc.years': 'Років до пенсії',
    'calc.bracket': 'Ваша податкова ставка',
    'calc.bracket.12': '12% (найнижча)',
    'calc.bracket.17': '17%',
    'calc.bracket.32': '32% (найвища)',
    
    'calc.results.title': 'Прогноз результатів',
    'calc.results.balance': 'Підсумковий баланс',
    'calc.results.contributed': 'Всього внесено',
    'calc.results.returns': 'Інвестиційна дохідність',
    'calc.results.tax': 'Економія податку проти звичайного рахунку',
    'calc.results.aftertax': 'Сума після податків при виведенні',
    
    'calc.ike.title': 'Прогноз IKE',
    'calc.ikze.title': 'Прогноз IKZE',
    'calc.regular.title': 'Звичайний брокерський рахунок (для порівняння)',
    
    'calc.note': 'Примітка: Калькулятор надає лише оцінки. Фактична дохідність залежить від інвестиційних результатів, майбутніх змін податкового законодавства та інших факторів. Проконсультуйтеся з фінансовим консультантом для персональних порад.',
    
    'calc.cta.title': 'Дізнатися більше',
    'calc.cta.ike': 'Про рахунок IKE',
    'calc.cta.ikze': 'Про рахунок IKZE',
    
    // Expats page
    'expats.meta.title': 'IKE і IKZE для іноземців у Польщі 2025: Вимоги та як відкрити',
    'expats.meta.description': 'Повний гід для іноземних резидентів: вимоги PESEL, право на вид на проживання, провайдери з англійською мовою, що відбувається, якщо ви покинете Польщу.',
    
    'expats.hero.title': 'Пенсійні рахунки для іноземців',
    'expats.hero.subtitle': 'IKE та IKZE для іноземних резидентів Польщі',
    'expats.hero.desc': 'Все, що потрібно знати негромадянам Польщі',
    
    'expats.eligible.title': 'Чи маю я право як іноземець?',
    'expats.eligible.p1': 'Так! Іноземні резиденти з діючим видом на проживання можуть відкрити обидва рахунки IKE та IKZE. Ключова вимога — наявність номера PESEL.',
    'expats.eligible.req': 'Вимоги:',
    'expats.eligible.pesel': 'Номер PESEL',
    'expats.eligible.permit': 'Діючий вид на проживання (тимчасовий або постійний)',
    'expats.eligible.income': 'Дохід у Польщі (для податкової знижки IKZE)',
    
    'expats.docs.title': 'Необхідні документи',
    'expats.docs.p1': 'Більшість провайдерів вимагають:',
    'expats.docs.pesel': 'Номер PESEL',
    'expats.docs.id': 'Паспорт або національний ID',
    'expats.docs.permit': 'Картка виду на проживання',
    'expats.docs.proof': 'Підтвердження адреси у Польщі',
    'expats.docs.income': 'Трудовий договір або підтвердження доходу (для IKZE)',
    
    'expats.providers.title': 'Провайдери з англійською мовою',
    'expats.providers.p1': 'Кілька банків і брокерів пропонують підтримку англійською:',
    'expats.providers.note': 'Завжди перевіряйте актуальні пропозиції та комісії безпосередньо у провайдерів.',
    
    'expats.leave.title': 'Що, якщо я покину Польщу?',
    'expats.leave.p1': 'Ви можете зберегти рахунки IKE/IKZE навіть після виїзду з Польщі. Рахунки залишаються вашими, і ви можете вивести кошти згідно зі стандартними правилами (після 60 років).',
    'expats.leave.p2': 'Важливі аспекти:',
    'expats.leave.maintain': 'Ви можете вести рахунок віддалено',
    'expats.leave.contribute': 'Зазвичай не можна робити нові внески без польського доходу',
    'expats.leave.tax': 'Оподаткування при виведенні може залежати від нової країни проживання',
    'expats.leave.consult': 'Проконсультуйтеся з податковим консультантом, знайомим з обома країнами',
    
    'expats.tax.title': 'Податкові аспекти для іноземців',
    'expats.tax.p1': 'Як іноземний резидент, що платить податки у Польщі, ви можете претендувати на ті ж пільги, що й громадяни Польщі:',
    'expats.tax.ikze.deduction': 'Внески в IKZE знижують ваш польський податок PIT',
    'expats.tax.ike.exempt': 'Виведення з IKE звільнені від польського податку на приріст капіталу',
    'expats.tax.declare': 'Вкажіть внески в річній польській податковій декларації (PIT-37 або PIT-36)',
    
    'expats.tips.title': 'Поради для іноземних резидентів',
    'expats.tips.start': 'Починайте рано — навіть якщо не впевнені, як довго залишитеся',
    'expats.tips.both': 'Розгляньте відкриття обох рахунків для максимальної гнучкості',
    'expats.tips.english': 'Оберіть провайдера з підтримкою англійською, якщо ваша польська обмежена',
    'expats.tips.advisor': 'Працюйте з фінансовим консультантом, що розуміє ситуацію експатів',
    
    'expats.cta.title': 'Є питання?',
    'expats.cta.desc': 'Подивіться наш розділ часто поставлених питань про IKE та IKZE.',
    'expats.cta.button': 'Читати FAQ',
    
    // FAQ page
    'faq.meta.title': 'FAQ по IKE та IKZE Польща 2025: Відповіді на часті питання',
    'faq.meta.description': 'Відповіді на часті питання про IKE та IKZE: Чи можуть іноземці відкрити рахунки? Що відбувається, якщо я покину Польщу? Чи можна мати обидва? Штрафи за дострокове виведення?',
    
    'faq.hero.title': 'Часто поставлені питання',
    'faq.hero.subtitle': 'IKE та IKZE',
    'faq.hero.desc': 'Часті питання про пенсійні рахунки у Польщі',
    
    'faq.q1': 'Чи можуть іноземці відкрити рахунки IKE та IKZE?',
    'faq.a1': 'Так! Будь-яка людина з номером PESEL може відкрити рахунки IKE та IKZE, включно з іноземними резидентами з діючим видом на проживання. Громадянство Польщі не потрібне.',
    
    'faq.q2': 'Чи можна мати обидва рахунки IKE та IKZE?',
    'faq.a2': 'Так. Ви можете відкрити та вносити кошти в обидва рахунки одночасно. Багато людей роблять це для максимізації як негайних податкових знижок (IKZE), так і довгострокового безподаткового зростання (IKE).',
    
    'faq.q3': 'Що відбувається з рахунком, якщо я покину Польщу?',
    'faq.a3': 'Ви можете зберегти рахунки IKE/IKZE навіть після виїзду з Польщі. Рахунки залишаються вашими, і ви можете вивести кошти згідно зі стандартними правилами. Проте зазвичай не можна робити нові внески без польського доходу. Оподаткування може відрізнятися залежно від нової країни проживання.',
    
    'faq.q4': 'Що відбувається з грошима, якщо я помру?',
    'faq.a4': 'Рахунки IKE та IKZE успадковуються. Ваші призначені бенефіціари (або законні спадкоємці) отримають баланс рахунку. Точне оподаткування для бенефіціарів залежить від їхнього відношення до вас та польського закону про спадщину.',
    
    'faq.q5': 'Чи можу я вивести гроші до 60 років?',
    'faq.a5': 'Так, але зі штрафами. Для IKE дострокове виведення оподатковується 19% податком на приріст капіталу плюс можливі штрафи. Для IKZE дострокове виведення оподатковується повною ставкою прибуткового податку (17-32%) плюс штрафи. Краще тримати кошти до пенсійного віку.',
    
    'faq.q6': 'Які провайдери пропонують підтримку англійською?',
    'faq.a6': 'Кілька банків і брокерів пропонують підтримку англійською, включно з деякими міжнародними банками, що працюють у Польщі, та онлайн-брокерами. Перевіряйте безпосередньо у провайдерів поточну мовну підтримку та процедури відкриття рахунку.',
    
    'faq.q7': 'Як отримати податкову знижку IKZE?',
    'faq.a7': 'Вкажіть внески в IKZE в річній польській податковій декларації (PIT-37 для найманих, PIT-36 для самозайнятих). Сума внеску зменшує оподатковуваний дохід, знижуючи податковий рахунок. Ваш провайдер видасть довідку про внески.',
    
    'faq.q8': 'Чи можу я перевести IKE або IKZE до іншого провайдера?',
    'faq.a8': 'Так. Ви можете перевести рахунок IKE або IKZE до іншого провайдера без втрати податкових пільг, якщо переказ виконаний правильно (прямий переказ між провайдерами, а не виведення та повторне внесення). Уточніть процедуру переказу в обох провайдерів.',
    
    'faq.q9': 'У чому різниця між IKE та звичайним брокерським рахунком?',
    'faq.a9': 'На звичайному брокерському рахунку ви платите 19% податок на приріст капіталу (податок Белки) при продажу. В IKE немає податку на приріст капіталу при виведенні після 60 років. Це може призвести до значно вищої дохідності за десятиліття інвестування.',
    
    'faq.q10': 'Чи є комісії?',
    'faq.a10': 'Комісії варіюються за провайдерами. Поширені комісії включають обслуговування рахунку, управління фондами (TFI) або транзакційні комісії (брокерські). Ретельно порівняйте провайдерів та вивчіть тарифи перед відкриттям рахунку.',
    
    'faq.q11': 'Чи можу я внести більше річного ліміту?',
    'faq.a11': 'Ні. Внески понад річний ліміт (23 472 зл для IKE, 9 388,80 зл для IKZE для найманих) не отримають податкові пільги і можуть викликати штрафи. Дотримуйтеся лімітів.',
    
    'faq.q12': 'Чи збільшуються ліміти внесків щороку?',
    'faq.a12': 'Так. Ліміти IKE та IKZE базуються на середній місячній зарплаті у Польщі, яка зазвичай зростає щорічно. Ліміти 2025 року: 23 472 зл (IKE) та 9 388,80 зл (IKZE для найманих).',
    
    'faq.cta.title': 'Залишилися питання?',
    'faq.cta.desc': 'Вивчіть наші детальні гіди або використайте калькулятор для моделювання пенсійних накопичень.',
    'faq.cta.guides': 'Читати гіди',
    'faq.cta.calc': 'Калькулятор',
    
    // Common
    'common.readmore': 'Читати далі',
    'common.getstarted': 'Почати',
    'common.learnmore': 'Дізнатися більше',
  },
};
