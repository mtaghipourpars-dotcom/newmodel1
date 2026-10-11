import { test, expect } from '@playwright/test';

test('desktop executive workbench and decision brief render without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/demo/index.html');
  await expect(page.locator('#homePage .app-home-hero')).toBeVisible();
  await expect(page.locator('#homePage .app-stat')).toHaveCount(4);
  await page.screenshot({path:'test-results/pvpt-home-desktop.png',fullPage:true});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  expect(overflow).toBe(false);
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await page.screenshot({path:'test-results/pvpt-decision-desktop.png',fullPage:true});
});

test('mobile executive workbench and decision brief fit the viewport', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/demo/index.html');
  await expect(page.locator('#homePage .app-home-hero h1')).toBeVisible();
  await expect(page.locator('.nav[data-page="resources"]')).toBeVisible();
  await page.screenshot({path:'test-results/pvpt-home-mobile.png',fullPage:true});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  expect(overflow).toBe(false);
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="2"]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await page.screenshot({path:'test-results/pvpt-decision-mobile.png',fullPage:true});
});
