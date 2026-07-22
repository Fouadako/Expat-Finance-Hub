/**
 * SSG Prerender Script
 *
 * Generates per-route static HTML files with correct <head> metadata so that
 * social bots, AI crawlers, and any non-JS crawler receive the right title,
 * description, Open Graph tags, canonical URL, and hreflang links — instead
 * of the generic index.html shell.
 *
 * Usage (run after `vite build`):
 *   node scripts/prerender.js
 *
 * The script uses <!-- __SSG_META_START__ --> / <!-- __SSG_META_END__ -->
 * comment markers in index.html to identify the block it should replace.
 *
 * Output: dist/public/<route>/index.html for every route.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist/public');
const SITE_URL = 'https://ike-ikze-poland.com';

// ---------------------------------------------------------------------------
// Route metadata: every route × every language
// Titles and descriptions are extracted directly from i18n.tsx translations.
// ---------------------------------------------------------------------------

/** @type {Array<{routePath:string;lang:'en'|'ru'|'ua';bcp47:string;ogLocale:string;title:string;description:string}>} */
const routes = [
  // ── English ──────────────────────────────────────────────────────────────
  {
    routePath: '/',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE & IKZE Poland 2026: Complete Guide for Expats',
    description:
      'Everything expats need to know about IKE and IKZE retirement accounts in Poland: contribution limits, tax benefits, and how to open as a foreign resident.',
  },
  {
    routePath: '/ike',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE Account Poland 2026: Complete Guide for Expats',
    description:
      'Everything you need to know about IKE (Indywidualne Konto Emerytalne) in Poland: contribution limits, tax benefits, how to open, and eligibility for foreign residents.',
  },
  {
    routePath: '/ikze',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKZE Account Poland 2026: Tax Deduction & Contribution Limits',
    description:
      'Complete guide to IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): PLN 11,304 annual limit (employees), PLN 16,956 (self-employed), PIT tax deduction, 10% withdrawal tax, and eligibility for expats.',
  },
  {
    routePath: '/compare',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE vs IKZE: Complete Comparison Poland 2026',
    description:
      'Side-by-side comparison of IKE and IKZE retirement accounts: contribution limits, tax benefits, withdrawal rules, and which is best for your profile.',
  },
  {
    routePath: '/calculator',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE & IKZE Savings Calculator Poland 2026',
    description:
      'Calculate projected retirement savings, tax benefits, and returns for IKE and IKZE accounts. Compare outcomes and estimate your future balance.',
  },
  {
    routePath: '/expats',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE & IKZE for Expats in Poland 2026: Eligibility & How to Open',
    description:
      'Complete guide for foreign residents: PESEL requirements, residence permit eligibility, English-language providers, and what happens if you leave Poland.',
  },
  {
    routePath: '/faq',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'IKE & IKZE FAQ Poland 2026: Common Questions Answered',
    description:
      'Answers to frequently asked questions about IKE and IKZE: Can foreigners open accounts? What happens if I leave Poland? Can I have both? Early withdrawal penalties?',
  },
  {
    routePath: '/book',
    lang: 'en',
    bcp47: 'en',
    ogLocale: 'en_US',
    title: 'Book a Consultation — IKE & IKZE Educational Sessions',
    description:
      'Book a 60-minute educational session to walk through IKE and IKZE mechanics in Poland — contribution limits, withdrawal rules, tax treatment, and account types.',
  },

  // ── Russian ───────────────────────────────────────────────────────────────
  {
    routePath: '/ru',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'IKE и IKZE Польша 2026: Полный гид для иностранцев',
    description:
      'Все, что иностранцам нужно знать о пенсионных счетах IKE и IKZE в Польше: лимиты взносов, налоговые льготы и как открыть.',
  },
  {
    routePath: '/ru/ike',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'Счет IKE в Польше 2026: Полный гид для иностранцев',
    description:
      'Всё о счете IKE (Indywidualne Konto Emerytalne) в Польше: лимиты взносов, налоговые льготы, как открыть, требования для иностранных резидентов.',
  },
  {
    routePath: '/ru/ikze',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'Счет IKZE в Польше 2026: Налоговый вычет и лимиты взносов',
    description:
      'Полный гид по IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): годовой лимит 11 304 зл (наемные работники), 16 956 зл (самозанятые), вычет PIT, 10% налог при выводе и правила для иностранцев.',
  },
  {
    routePath: '/ru/compare',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'IKE vs IKZE: Полное сравнение Польша 2026',
    description:
      'Сравнение IKE и IKZE по лимитам взносов, налоговым льготам, правилам вывода и выбору счета для вашей ситуации.',
  },
  {
    routePath: '/ru/calculator',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'Калькулятор пенсионных накоплений IKE и IKZE Польша 2026',
    description:
      'Рассчитайте прогнозируемые пенсионные накопления, налоговые льготы и доходность для счетов IKE и IKZE. Сравните результаты и оцените будущий баланс.',
  },
  {
    routePath: '/ru/expats',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'IKE и IKZE для иностранцев в Польше 2026: Право на открытие и как открыть',
    description:
      'Полный гид для иностранных резидентов: требования PESEL, право на открытие с видом на жительство, провайдеры с поддержкой английского языка и что происходит при отъезде.',
  },
  {
    routePath: '/ru/faq',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'Вопросы и ответы по IKE и IKZE Польша 2026: Частые вопросы',
    description:
      'Ответы на частые вопросы об IKE и IKZE: могут ли иностранцы открыть счета? Что происходит при отъезде? Можно ли иметь оба? Штрафы за досрочный вывод?',
  },
  {
    routePath: '/ru/book',
    lang: 'ru',
    bcp47: 'ru',
    ogLocale: 'ru_RU',
    title: 'Book a Consultation — IKE & IKZE Educational Sessions',
    description:
      'Book a 60-minute educational session to walk through IKE and IKZE mechanics in Poland — contribution limits, withdrawal rules, tax treatment, and account types.',
  },

  // ── Ukrainian ─────────────────────────────────────────────────────────────
  {
    routePath: '/ua',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'IKE і IKZE Польща 2026: Повний гід для іноземців',
    description:
      'Все, що іноземцям потрібно знати про пенсійні рахунки IKE і IKZE у Польщі: ліміти внесків, податкові пільги та як відкрити.',
  },
  {
    routePath: '/ua/ike',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'Рахунок IKE в Польщі 2026: Повний гід для іноземців',
    description:
      'Все про рахунок IKE (Indywidualne Konto Emerytalne) в Польщі: ліміти внесків, податкові пільги, як відкрити та вимоги для іноземних резидентів.',
  },
  {
    routePath: '/ua/ikze',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'Рахунок IKZE в Польщі 2026: Податкове вирахування та ліміти внесків',
    description:
      'Повний гід по IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego): річний ліміт 11 304 зл (наймані працівники), 16 956 зл (самозайняті), вирахування PIT, 10% податок при виведенні та правила для іноземців.',
  },
  {
    routePath: '/ua/compare',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'IKE vs IKZE: Повне порівняння Польща 2026',
    description:
      'Порівняння IKE і IKZE за лімітами внесків, податковими пільгами, правилами виведення та вибором рахунку для вашої ситуації.',
  },
  {
    routePath: '/ua/calculator',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'Калькулятор пенсійних накопичень IKE і IKZE Польща 2026',
    description:
      'Розрахуйте прогнозовані пенсійні накопичення, податкові пільги та дохідність для рахунків IKE і IKZE. Порівняйте результати та оцініть майбутній баланс.',
  },
  {
    routePath: '/ua/expats',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'IKE і IKZE для іноземців у Польщі 2026: Право на відкриття та як відкрити',
    description:
      "Повний гід для іноземних резидентів: вимоги PESEL, право на відкриття з дозволом на проживання, провайдери з підтримкою англійської мови та що відбувається при від'їзді.",
  },
  {
    routePath: '/ua/faq',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'Питання та відповіді з IKE і IKZE Польща 2026: Поширені запитання',
    description:
      "Відповіді на поширені запитання про IKE і IKZE: чи можуть іноземці відкрити рахунки? Що відбувається при від'їзді? Чи можна мати обидва? Штрафи за дострокове виведення?",
  },
  {
    routePath: '/ua/book',
    lang: 'ua',
    bcp47: 'uk',
    ogLocale: 'uk_UA',
    title: 'Book a Consultation — IKE & IKZE Educational Sessions',
    description:
      'Book a 60-minute educational session to walk through IKE and IKZE mechanics in Poland — contribution limits, withdrawal rules, tax treatment, and account types.',
  },
];

// ---------------------------------------------------------------------------
// Structured data (JSON-LD) — per language FAQ content
// ---------------------------------------------------------------------------

/**
 * FAQ content keyed by language code ('en' | 'ru' | 'ua').
 * Kept in sync with src/lib/i18n.tsx translations.
 */
const faqsByLang = {
  en: [
    { q: 'Can foreigners open IKE and IKZE accounts?', a: 'Yes! Any individual aged 16 or older with a PESEL number can open IKE and IKZE accounts, including foreign residents with valid residence permits. Polish citizenship is not required. Those aged 16–17 may only contribute to IKE in years when they earn employment income (umowa o pracę).' },
    { q: 'Can I have both IKE and IKZE?', a: 'Yes. You can open and contribute to both IKE and IKZE accounts simultaneously. Many people do this to maximize both immediate tax deductions (IKZE) and long-term tax-free growth (IKE).' },
    { q: 'What happens to my account if I leave Poland?', a: 'You can keep your IKE/IKZE accounts even after leaving Poland. The accounts remain yours, and you can withdraw funds according to standard rules. However, you generally cannot make new contributions without Polish income. Tax treatment may vary depending on your new country of residence.' },
    { q: 'What happens to the money if I die?', a: "Both accounts are inheritable, but with different tax treatment. For IKE: beneficiaries receive funds completely tax-free — exempt from both Belka and inheritance/gift tax — and can withdraw or transfer to their own IKE or PPE. For IKZE: beneficiaries pay a flat 10% tax on withdrawal. IKZE funds can be transferred to the beneficiary's own IKZE (with 10% tax on eventual withdrawal), but cannot be moved to IKE or PPE." },
    { q: 'Can I withdraw money before the qualifying age?', a: 'Yes. For IKE: early withdrawal is always possible. Full early withdrawal triggers 19% Belka tax on gains only — your contributed principal is never touched. Since 2009, partial withdrawal of your own contributions is also allowed. Important: once you make the first full IKE withdrawal or receive the first installment, you cannot open a new IKE. For IKZE: no partial withdrawal is allowed — only full liquidation (zwrot). The entire amount (contributions + gains) is added to your taxable income at progressive PIT scale rates.' },
    { q: 'Do popular brokers like Interactive Brokers, DEGIRO, or Revolut offer IKE/IKZE?', a: 'No. IKE and IKZE are Polish-specific tax wrappers and are only available through Polish-licensed financial institutions. IBKR, DEGIRO, Revolut, Trading 212, and eToro do not offer these accounts. Polish brokers such as XTB, DM BOŚ, and mBank eMakler are among those that do.' },
    { q: 'What happens if I accidentally open two IKE accounts?', a: 'Holding two IKE accounts simultaneously triggers a 75% punitive flat-rate tax on income from all your IKE accounts under Article 30(1)(7a) of the Polish PIT Act — the highest flat rate in the Polish tax system. If you open a new IKE, ensure you close your previous one first.' },
    { q: 'I am on ryczałt tax. Does IKZE still make sense?', a: 'On ryczałt, your IKZE contributions reduce your revenue at your lump-sum tax rate (e.g. 12% or 8.5% for IT), not at a marginal income tax rate. The benefit is real but smaller than for skala or liniowy taxpayers. For ryczałt users, IKE — which requires no specific tax form to benefit from — may be worth exploring first. This depends on your individual situation; consider discussing it with a tax professional.' },
    { q: 'How do I claim the IKZE tax deduction?', a: 'Report your IKZE contributions in your annual Polish tax return (PIT-37 for employees, PIT-36 for self-employed). The contribution amount reduces your taxable income, lowering your tax bill. Your provider will give you a statement of contributions.' },
    { q: 'Can I transfer my IKE or IKZE to a different provider?', a: 'Yes, but with an important difference. IKE can be transferred to a different IKE provider or to a PPE. IKZE can only be transferred to another IKZE — not to IKE or PPE. Both types of transfer are tax-free. Always do a direct provider-to-provider transfer, not a withdrawal and redeposit.' },
    { q: 'Are there any fees?', a: 'Fees vary by provider. Common fees include account maintenance fees, fund management fees (TFI), or transaction fees (brokerage). Compare providers carefully and read fee schedules before opening an account.' },
    { q: 'Do contribution limits increase each year?', a: 'Yes. IKE and IKZE limits are based on the average monthly salary in Poland, which typically increases annually. The 2026 limits are PLN 28,260 (IKE) and PLN 11,304 (IKZE for employees) or PLN 16,956 (IKZE for self-employed/JDG).' },
  ],
  ru: [
    { q: 'Могут ли иностранцы открыть счета IKE и IKZE?', a: 'Да! Любое лицо от 16 лет с номером PESEL может открыть счета IKE и IKZE, включая иностранных резидентов с действующим видом на жительство. Польское гражданство не требуется. Лица 16–17 лет могут вносить взносы в IKE только в годы получения дохода по трудовому договору (umowa o pracę).' },
    { q: 'Можно ли иметь одновременно IKE и IKZE?', a: 'Да. Вы можете открывать и пополнять оба счета — IKE и IKZE — одновременно. Многие делают это, чтобы получить и немедленный налоговый вычет (IKZE), и долгосрочный безналоговый рост (IKE).' },
    { q: 'Что происходит со счетом при отъезде из Польши?', a: 'Вы можете сохранить счета IKE/IKZE даже после отъезда. Счета остаются вашими, и вы можете выводить средства по стандартным правилам. Однако, как правило, новые взносы невозможны без польского дохода. Налоговый режим может различаться в зависимости от новой страны проживания.' },
    { q: 'Что происходит с деньгами в случае смерти?', a: 'Оба счета наследуемы, но с разным налогообложением. Для IKE: бенефициары получают средства полностью без налогов — освобождены как от налога Белки, так и от налога на наследство и дарение — и могут вывести или перевести на собственный IKE или PPE. Для IKZE: бенефициары платят фиксированный налог 10% при выводе. Средства IKZE можно перевести на IKZE бенефициара (с 10% налогом при последующем выводе), но не на IKE или PPE.' },
    { q: 'Можно ли вывести деньги до достижения пенсионного возраста?', a: 'Да. Для IKE: досрочный вывод всегда возможен. Полный досрочный вывод активирует 19% налог Белки только на прибыль — основной капитал не затрагивается никогда. С 2009 года разрешён частичный вывод собственных взносов. Важно: после первого полного вывода IKE или первой рассрочки открыть новый IKE невозможно. Для IKZE: частичный вывод невозможен — только полная ликвидация (zwrot). Вся сумма (взносы + доход) добавляется к налогооблагаемому доходу по прогрессивной шкале PIT.' },
    { q: 'Предлагают ли популярные брокеры, такие как Interactive Brokers, DEGIRO или Revolut, IKE/IKZE?', a: 'Нет. IKE и IKZE — это специфичные для Польши налоговые оболочки, доступные только через лицензированные польские финансовые учреждения. IBKR, DEGIRO, Revolut, Trading 212 и eToro не предлагают эти счета. Среди польских брокеров, предлагающих их, — XTB, DM BOŚ и mBank eMakler.' },
    { q: 'Что произойдет, если я случайно открою два счета IKE?', a: 'Одновременное владение двумя счетами IKE активирует карательный налог 75% фиксированной ставки на доход со всех ваших счетов IKE согласно статье 30(1)(7a) польского закона о PIT — самая высокая фиксированная ставка в польской налоговой системе. Если вы открываете новый IKE, убедитесь, что сначала закрыли предыдущий.' },
    { q: 'Я на налоге рычалт. Имеет ли смысл IKZE?', a: 'При рычалт ваши взносы в IKZE уменьшают вашу выручку по вашей паушальной налоговой ставке (например, 12% или 8,5% для IT), а не по предельной ставке подоходного налога. Выгода реальна, но меньше, чем для налогоплательщиков скала или линёвы. Для пользователей рычалт может быть целесообразно сначала изучить IKE, который не требует специальной налоговой формы для получения льгот. Это зависит от вашей индивидуальной ситуации; рассмотрите возможность обсуждения с налоговым специалистом.' },
    { q: 'Как получить налоговый вычет IKZE?', a: 'Укажите взносы в IKZE в ежегодной польской налоговой декларации (PIT-37 для наемных, PIT-36 для самозанятых). Сумма взносов уменьшает налогооблагаемый доход, снижая налоговый счет. Провайдер выдаст вам справку о взносах.' },
    { q: 'Можно ли перевести IKE или IKZE к другому провайдеру?', a: 'Да, но с важным отличием. IKE можно перевести к другому провайдеру IKE или в PPE. IKZE можно перевести только в другой IKZE — не в IKE и не в PPE. Оба типа переводов освобождены от налогов. Всегда делайте прямой перевод между провайдерами, не снятие и повторный депозит.' },
    { q: 'Есть ли комиссии?', a: 'Комиссии зависят от провайдера. Распространенные: за обслуживание счета, за управление фондом (TFI) или транзакционные (брокерские). Тщательно сравнивайте провайдеров и изучайте тарифы перед открытием счета.' },
    { q: 'Увеличиваются ли лимиты взносов каждый год?', a: 'Да. Лимиты IKE и IKZE основаны на средней месячной зарплате в Польше, которая обычно растет ежегодно. Лимиты 2026 года составляют 28 260 зл (IKE) и 11 304 зл (IKZE для наемных работников) или 16 956 зл (IKZE для самозанятых/JDG).' },
  ],
  ua: [
    { q: 'Чи можуть іноземці відкрити рахунки IKE і IKZE?', a: 'Так! Будь-яка особа від 16 років з номером PESEL може відкрити рахунки IKE і IKZE, включаючи іноземних резидентів з дійсним дозволом на проживання. Польське громадянство не потрібне. Особи 16–17 років можуть робити внески в IKE лише в роки отримання доходу за трудовим договором (umowa o pracę).' },
    { q: 'Чи можна мати одночасно IKE і IKZE?', a: 'Так. Ви можете відкривати і поповнювати обидва рахунки — IKE і IKZE — одночасно. Багато хто робить це, щоб отримати і негайне податкове вирахування (IKZE), і довгострокове безподаткове зростання (IKE).' },
    { q: "Що відбувається з рахунком при від'їзді з Польщі?", a: "Ви можете зберегти рахунки IKE/IKZE навіть після від'їзду. Рахунки залишаються вашими, і ви можете виводити кошти за стандартними правилами. Однак, як правило, нові внески неможливі без польського доходу. Податковий режим може відрізнятися залежно від нової країни проживання." },
    { q: 'Що відбувається з грошима у разі смерті?', a: 'Обидва рахунки успадковуються, але з різним оподаткуванням. Для IKE: бенефіціари отримують кошти повністю без податків — звільнені як від податку Белки, так і від податку на спадщину та дарування — і можуть вивести або перевести на власний IKE чи PPE. Для IKZE: бенефіціари сплачують фіксований 10% податок при виведенні. Кошти IKZE можна перевести на IKZE бенефіціара (з 10% податком при наступному виведенні), але не на IKE або PPE.' },
    { q: 'Чи можна вивести кошти до досягнення пенсійного віку?', a: 'Так. Для IKE: дострокове виведення завжди можливе. Повне дострокове виведення активує 19% податок Белки тільки на прибуток — основний капітал ніколи не зачіпається. З 2009 року також дозволено часткове виведення власних внесків. Важливо: після першого повного виведення IKE або першого платежу при розстрочці відкрити новий IKE неможливо. Для IKZE: часткове виведення неможливе — тільки повна ліквідація (zwrot). Вся сума (внески + дохід) додається до оподатковуваного доходу за прогресивною шкалою PIT.' },
    { q: 'Чи пропонують популярні брокери, такі як Interactive Brokers, DEGIRO або Revolut, IKE/IKZE?', a: 'Ні. IKE і IKZE — це специфічні для Польщі податкові обгортки, доступні лише через ліцензовані польські фінансові установи. IBKR, DEGIRO, Revolut, Trading 212 та eToro не пропонують ці рахунки. Серед польських брокерів, що їх пропонують, — XTB, DM BOŚ та mBank eMakler.' },
    { q: 'Що станеться, якщо я випадково відкрию два рахунки IKE?', a: 'Одночасне володіння двома рахунками IKE активує каральний податок 75% фіксованої ставки на дохід з усіх ваших рахунків IKE згідно зі статтею 30(1)(7a) польського закону про PIT — найвища фіксована ставка в польській податковій системі. Якщо ви відкриваєте новий IKE, переконайтеся, що спочатку закрили попередній.' },
    { q: 'Я на податку ричалт. Чи має сенс IKZE?', a: 'При ричалт ваші внески в IKZE зменшують вашу виручку за вашою паушальною податковою ставкою (наприклад, 12% або 8,5% для IT), а не за граничною ставкою прибуткового податку. Вигода реальна, але менша, ніж для платників податку скала або лінійни. Для користувачів ричалт може бути доцільно спочатку вивчити IKE, який не вимагає спеціальної податкової форми для отримання пільг. Це залежить від вашої індивідуальної ситуації; розгляньте можливість обговорення з податковим фахівцем.' },
    { q: 'Як отримати податкове вирахування IKZE?', a: 'Зазначте внески в IKZE у щорічній польській податковій декларації (PIT-37 для найманих, PIT-36 для самозайнятих). Сума внесків зменшує оподатковуваний дохід, знижуючи ваш податковий рахунок. Провайдер надасть вам довідку про внески.' },
    { q: 'Чи можна перевести IKE або IKZE до іншого провайдера?', a: 'Так, але з важливою відмінністю. IKE можна перевести до іншого провайдера IKE або до PPE. IKZE можна перевести лише до іншого IKZE — не до IKE і не до PPE. Обидва типи переказів звільнені від податків. Завжди робіть прямий переказ між провайдерами, а не зняття і повторний депозит.' },
    { q: 'Чи є комісії?', a: 'Комісії залежать від провайдера. Поширені: за обслуговування рахунку, за управління фондом (TFI) або транзакційні (брокерські). Ретельно порівнюйте провайдерів і вивчайте тарифи перед відкриттям рахунку.' },
    { q: 'Чи збільшуються ліміти внесків щороку?', a: 'Так. Ліміти IKE і IKZE базуються на середній місячній зарплаті в Польщі, яка зазвичай зростає щорічно. Ліміти 2026 року становлять 28 260 зл (IKE) і 11 304 зл (IKZE для найм працівників) або 16 956 зл (IKZE для самозайнятих/JDG).' },
  ],
};

/**
 * Build JSON-LD <script> blocks for a given route.
 * Returns a string of one or more <script type="application/ld+json"> tags,
 * or an empty string if no structured data applies to this route.
 *
 * Each schema type gets its own <script> tag (do not merge into one block).
 */
function buildStructuredDataScripts(route) {
  const { routePath, lang } = route;
  const scripts = [];

  // ── Home pages: WebSite schema + Organization schema ─────────────────────
  if (routePath === '/' || routePath === '/ru' || routePath === '/ua') {
    scripts.push(
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        'name': 'IKE & IKZE Poland Guide',
        'url': SITE_URL,
        'description': 'Complete guide to IKE and IKZE retirement accounts in Poland for expats and foreign residents',
        'inLanguage': ['en', 'ru', 'uk'],
      }),
    );
    scripts.push(
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        'name': 'IKE & IKZE Poland Guide',
        'url': SITE_URL,
        'description': 'Independent financial guide for foreigners on IKE and IKZE retirement accounts in Poland',
      }),
    );
  }

  // ── FAQ pages: FAQPage schema with all Q&As ───────────────────────────────
  if (routePath === '/faq' || routePath === '/ru/faq' || routePath === '/ua/faq') {
    const faqs = faqsByLang[lang] || faqsByLang.en;
    scripts.push(
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a,
          },
        })),
      }),
    );
  }

  if (scripts.length === 0) return '';

  return scripts
    .map((json) => `\n    <script type="application/ld+json">${json}</script>`)
    .join('');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Escape text for safe use inside an HTML attribute value (double-quoted).
 */
function escAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Given the route path (e.g. "/ike" or "/ru/ike"), return canonical URLs for
 * all three language variants.
 */
function buildHreflangs(routePath) {
  // Strip /ru or /ua prefix to get the English base path
  const enPath = routePath.replace(/^\/(ru|ua)(\/|$)/, '/').replace(/\/$/, '') || '/';

  const enUrl = `${SITE_URL}${enPath === '/' ? '' : enPath}` || SITE_URL;
  const ruBase = enPath === '/' ? '/ru' : `/ru${enPath}`;
  const uaBase = enPath === '/' ? '/ua' : `/ua${enPath}`;

  return {
    enUrl: `${SITE_URL}${enPath === '/' ? '/' : enPath}`,
    ruUrl: `${SITE_URL}${ruBase}`,
    uaUrl: `${SITE_URL}${uaBase}`,
  };
}

/**
 * Build the SSG metadata block (the content between the marker comments).
 */
function buildMetaBlock(route) {
  const { bcp47, ogLocale, title, description, routePath } = route;
  const { enUrl, ruUrl, uaUrl } = buildHreflangs(routePath);

  const canonicalUrl = routePath.startsWith('/ru')
    ? ruUrl
    : routePath.startsWith('/ua')
      ? uaUrl
      : enUrl;

  const ogImage = `${SITE_URL}/social-preview.svg`;
  const safeTitle = escAttr(title);
  const safeDesc = escAttr(description);

  const structuredDataScripts = buildStructuredDataScripts(route);

  return `
    <title>${title}</title>
    <meta name="description" content="${safeDesc}" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${escAttr(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="IKE &amp; IKZE Poland Guide" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta property="og:image" content="${escAttr(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${escAttr(ogImage)}" />

    <!-- Canonical + hreflang -->
    <link rel="canonical" href="${escAttr(canonicalUrl)}" />
    <link rel="alternate" hreflang="en" href="${escAttr(enUrl)}" />
    <link rel="alternate" hreflang="ru" href="${escAttr(ruUrl)}" />
    <link rel="alternate" hreflang="uk" href="${escAttr(uaUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escAttr(enUrl)}" />${structuredDataScripts}
    `.trimEnd();
}

const START_MARKER = '<!-- __SSG_META_START__ -->';
const END_MARKER = '<!-- __SSG_META_END__ -->';

/**
 * Inject route-specific metadata into the template HTML.
 * Replaces the block between SSG marker comments and updates <html lang>.
 */
function patchHtml(template, route) {
  const startIdx = template.indexOf(START_MARKER);
  const endIdx = template.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `SSG marker comments not found in dist/public/index.html.\n` +
        `Ensure index.html contains <!-- __SSG_META_START__ --> and <!-- __SSG_META_END__ -->.`,
    );
  }

  const metaBlock = buildMetaBlock(route);

  const patched =
    template.slice(0, startIdx) +
    START_MARKER +
    metaBlock +
    '\n    ' +
    END_MARKER +
    template.slice(endIdx + END_MARKER.length);

  // Update <html lang="..."> for this language
  return patched.replace(/<html lang="[^"]*"/, `<html lang="${route.bcp47}"`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const templatePath = join(distDir, 'index.html');
let template;
try {
  template = readFileSync(templatePath, 'utf-8');
} catch (err) {
  console.error(
    `\n✗  Could not read ${templatePath}\n` +
      `   Run "pnpm --filter @workspace/ike-ikze run build:vite" first.\n`,
  );
  process.exit(1);
}

let written = 0;

for (const route of routes) {
  const { routePath } = route;

  const patchedHtml = patchHtml(template, route);

  // "/" → dist/public/index.html  (overwrite with correct home metadata)
  // "/ike" → dist/public/ike/index.html
  // "/ru/ike" → dist/public/ru/ike/index.html
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');
  const filePath = join(distDir, ...segments, 'index.html');

  mkdirSync(join(filePath, '..'), { recursive: true });
  writeFileSync(filePath, patchedHtml, 'utf-8');
  written++;

  const relPath = filePath.replace(distDir, '').replace(/\\/g, '/');
  console.log(`  ✓  ${routePath.padEnd(18)} → dist/public${relPath}`);
}

console.log(`\n✓  Prerender complete — ${written} HTML files written.\n`);
