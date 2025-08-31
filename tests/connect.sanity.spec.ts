import { test, chromium } from '@playwright/test';

test('connect sanity', async () => {
  const browser = await chromium.connect({
    wsEndpoint: process.env.PW_WS_ENDPOINT!,
    timeout: 30_000,
  });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('https://example.com');
  await browser.close();
});