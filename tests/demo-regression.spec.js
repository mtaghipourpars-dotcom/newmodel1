import { test, expect } from '@playwright/test';

test('decision navigation stays free of uncaught browser errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo/index.html');

  for (const key of ['decisions', 'projects', 'portfolio', 'risk', 'interventions', 'resources', 'memory', 'sources', 'home']) {
    await page.locator('.nav[data-page="' + key + '"]').click();
    await expect(page.locator('.nav[data-page="' + key + '"]')).toHaveClass(/active/);
  }
  expect(errors).toEqual([]);
});

test('DEMO-01 rejects borrowing and substitute validation that miss the commitment window', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();

  const modal = page.locator('#modal');
  await modal.getByRole('button', { name: 'ارزیابی امکان‌پذیری' }).nth(1).click();
  await expect(modal).toContainText('تعهد پروژه دیگر را ۵ روز جابه‌جا می‌کند');
  await expect(modal).toContainText('در وضعیت فعلی ناشدنی');

  await modal.getByRole('button', { name: 'ارزیابی امکان‌پذیری' }).nth(2).click();
  await expect(modal).toContainText('۶ روز');
  await expect(modal).toContainText('از پنجره نیاز بیشتر است');
});

test('DEMO-02 external test passes modeled capacity, budget and readiness checks', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="2"]').click();

  const modal = page.locator('#modal');
  await modal.getByRole('button', { name: 'ارزیابی امکان‌پذیری' }).nth(1).click();
  await expect(modal).toContainText('ظرفیت بیرونی ۱۰ ساعت');
  await expect(modal).toContainText('۱۴۰');
  await expect(modal).toContainText('۱۵۰');
  await expect(modal).toContainText('از نظر قیود نمایشی قابل‌بررسی');
});

test('decision brief closes with Escape and can be reopened', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  await expect(page.locator('#modal')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('#modal')).not.toHaveClass(/open/);

  await page.locator('#entityContent [data-detail="2"]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await expect(page.locator('#modal')).toContainText('۲۲ ساعت');
});
