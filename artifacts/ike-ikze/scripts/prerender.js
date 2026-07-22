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
    <link rel="alternate" hreflang="x-default" href="${escAttr(enUrl)}" />
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
