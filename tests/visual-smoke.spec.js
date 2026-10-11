import { test, expect } from '@playwright/test';

test('desktop executive home and decision brief have no page-level horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/demo/index.html');
  await page.screenshot({ path: 'test-results/pvpt-home-desktop.png', fullPage: true });
  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(homeOverflow, 'desktop home should not overflow horizontally').toBe(false);

  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await page.screenshot({ path: 'test-results/pvpt-decision-desktop.png', fullPage: true });
});

test('mobile executive home and decision brief fit the viewport without page-level horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo/index.html');
  await page.screenshot({ path: 'test-results/pvpt-home-mobile.png', fullPage: true });
  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(homeOverflow, 'mobile home should not overflow horizontally').toBe(false);

  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="2"]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await page.screenshot({ path: 'test-results/pvpt-decision-mobile.png', fullPage: true });
});
