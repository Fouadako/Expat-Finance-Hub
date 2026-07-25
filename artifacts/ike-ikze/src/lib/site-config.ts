/**
 * Single source of truth for the production site URL.
 * Used by SEO.tsx at runtime. prerender.js has its own copy of this constant
 * (it runs as plain Node ESM and cannot import TS files).
 */
export const SITE_URL = 'https://expatfinance.pl';
