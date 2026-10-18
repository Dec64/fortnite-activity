/* Screenshots of the Fortnite Family page preview at phone and desktop width.
   Usage: python3 -m http.server 8765 (repository root), then
   node tools/ui-preview/shoot.cjs [outDir] [shot names...]
   Needs Playwright (npm i -g playwright) and a Chromium it can launch. */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.PREVIEW_URL || 'http://localhost:8765/tools/ui-preview/';
const out = process.argv[2] || 'preview-shots';
const only = process.argv.slice(3);

const page$ = page => page.locator('household-fortnite-page-card');
const tap = (page, selector) => page.evaluate(sel => {
  const el = document.querySelector('household-fortnite-page-card').shadowRoot.querySelector(sel);
  if (!el) throw new Error('No element for ' + sel);
  el.click();
}, selector);
const settle = page => page.waitForTimeout(700);

const SHOTS = {
  session: async page => { await tap(page, '[data-section="session"]'); },
  'game-sheet': async page => { await tap(page, '[data-section="session"]'); await settle(page); await tap(page, '[data-match="1"]'); },
  'game-sheet-ranked': async page => { await tap(page, '[data-section="session"]'); await settle(page); await tap(page, '[data-match="0"]'); },
  stats: async page => { await tap(page, '[data-section="stats"]'); },
  'stats-week': async page => { await tap(page, '[data-section="stats"]'); await settle(page); await tap(page, '[data-stat-window="week"]'); },
  ranked: async page => { await tap(page, '[data-section="stats"]'); await settle(page); await page.evaluate(() => { const r = document.querySelector('household-fortnite-page-card').shadowRoot.querySelector('#ranked, [data-stats-page="ranked"], [data-rail-dot="stats-pages"][data-page="1"]'); r?.click(); r?.scrollIntoView(); }); },
  sprites: async page => { await tap(page, '[data-section="sprites"]'); },
  'sprite-sheet': async page => { await tap(page, '[data-section="sprites"]'); await settle(page); await tap(page, '[data-family]'); },
  locker: async page => { await tap(page, '[data-section="locker"]'); },
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const [device, viewport] of [['phone', { width: 390, height: 844 }], ['desktop', { width: 1280, height: 900 }]]) {
    for (const [name, run] of Object.entries(SHOTS)) {
      if (only.length && !only.includes(name)) continue;
      const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE);
      await page$(page).waitFor();
      await page.waitForFunction(() => document.querySelector('household-fortnite-page-card')?.shadowRoot?.querySelector('.tabs, nav'));
      await settle(page);
      try { await run(page); } catch (e) { errors.push(e.message); }
      await settle(page);
      // An open sheet scrolls inside the dialog: unpin it so the whole sheet is captured
      const sheet = await page.evaluate(() => { const d = document.querySelector('household-fortnite-page-card').shadowRoot.querySelector('dialog[open]'); if (!d) return false; d.style.cssText = 'position:absolute;inset:0 0 auto;max-height:none;height:auto;overflow:visible;animation:none'; return true; });
      if (sheet) await settle(page);
      if (sheet) await page$(page).locator('dialog[open]').screenshot({ path: path.join(out, device + '-' + name + '.png') });
      else await page.screenshot({ path: path.join(out, device + '-' + name + '.png'), fullPage: true });
      if (errors.length) console.log(device, name, 'errors:', errors.join(' | '));
      await context.close();
    }
  }
  await browser.close();
})();
