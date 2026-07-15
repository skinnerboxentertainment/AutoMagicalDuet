import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = process.env.GAME_URL ?? 'http://127.0.0.1:5173';
const outputDir = 'CODEX_ENDPOINT/responses/screenshots';
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', error => consoleErrors.push(error.message));

await page.goto(baseUrl, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${outputDir}/01-landing-page.png`, fullPage: true });
const landing = await page.evaluate(() => ({
  title: document.querySelector('h1')?.textContent?.trim() ?? '',
  tagline: document.querySelector('h1')?.parentElement?.textContent?.trim() ?? '',
  buttons: [...document.querySelectorAll('button')].map(b => ({ text: b.textContent?.trim(), style: b.getAttribute('style'), rect: b.getBoundingClientRect().toJSON() })),
  cards: [...document.querySelectorAll('article, section, [class*=card], [class*=domain]')].map(e => e.textContent?.trim()).filter(Boolean),
  bodyText: document.body.innerText,
}));

await page.getByText('Launch Game', { exact: false }).click();
await page.locator('canvas').waitFor({ state: 'attached' });
await page.waitForTimeout(800);
await page.screenshot({ path: `${outputDir}/02-gameplay-idle.png`, fullPage: true });
const idle = await page.evaluate(() => ({
  canvas: document.querySelector('canvas')?.getBoundingClientRect().toJSON(),
  hud: document.body.innerText,
  gamepadApi: typeof navigator.getGamepads === 'function',
}));

await page.keyboard.down('ArrowRight');
await page.waitForTimeout(500);
const movingHud = await page.evaluate(() => document.body.innerText);
await page.keyboard.up('ArrowRight');

await page.keyboard.down('Space');
await page.waitForTimeout(120);
const jumpHud = await page.evaluate(() => document.body.innerText);
await page.screenshot({ path: `${outputDir}/03-gameplay-jump.png`, fullPage: true });
await page.keyboard.up('Space');
await page.waitForTimeout(700);

await page.evaluate(() => {
  window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab', key: 'Tab', bubbles: true }));
});
try { await page.waitForFunction(() => document.getElementById('tuning-panel')?.style.display === 'block', { timeout: 3000 }); } catch (e) { console.log('Tab toggle fallback, proceeding'); }
await page.screenshot({ path: `${outputDir}/04-tuning-panel.png`, fullPage: true });
const tuning = await page.evaluate(() => ({
  categories: [...document.querySelectorAll('#tuning-panel > div > div > div')].map(e => e.firstElementChild?.textContent?.trim()).filter(Boolean),
  sliderCount: document.querySelectorAll('#tuning-panel input[type=range]').length,
  selectCount: document.querySelectorAll('#tuning-panel select').length,
  tips: [...document.querySelectorAll('#tuning-panel [title]')].map(e => e.getAttribute('title')),
  text: document.querySelector('#tuning-panel')?.textContent?.trim(),
}));
await page.keyboard.press('Tab');

const presets = [];
for (let i = 0; i < 6; i += 1) {
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(80);
  presets.push(await page.evaluate(() => document.body.innerText.match(/\[P\] Preset: ([^\n]+)/)?.[1]?.trim() ?? 'not found'));
}

// Close tuning panel first (if open), then close game
await page.evaluate(() => {
  const panel = document.getElementById('tuning-panel');
  if (panel && panel.style.display === 'block') panel.style.display = 'none';
});
await page.waitForTimeout(100);
await page.evaluate(() => { window.closeGame(); });
await page.waitForTimeout(150);
const afterClose = await page.evaluate(() => ({ hasCanvas: Boolean(document.querySelector('canvas')), bodyText: document.body.innerText }));

const result = { baseUrl, landing, idle, movingHud, jumpHud, tuning, presets, afterClose, consoleErrors };
await writeFile('CODEX_ENDPOINT/responses/game-inspection-data.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
