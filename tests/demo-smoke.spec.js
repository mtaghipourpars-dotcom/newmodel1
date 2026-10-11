import { test, expect } from '@playwright/test';

test('home labels the prototype as demo and shows the value-protection story', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/demo/index.html');
  await expect(page).toHaveTitle(/PARS Value Protection Tower/);
  await expect(page.locator('.demo-pill').first()).toContainText('DEMO MODE');
  await expect(page.getByRole('heading', { name: /سامانه حفاظت از ارزش پروژه‌ها و تعهدات/ })).toBeVisible();
  await expect(page.locator('.footer')).toContainText('سناریوی نمایشی');
  expect(pageErrors).toEqual([]);
});

test('operations view traces project to BOM Cell, order, routing and resources', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="projects"]').click();
  const content = page.locator('#entityContent');
  await expect(content).toContainText('BOM Component / Cell');
  await expect(content).toContainText('Production Order');
  await expect(content).toContainText('Routing / Operation');
  await expect(content).toContainText('تمام شناسه‌ها و مقادیر این صفحه ساختگی');
});

test('DEMO-01 calculates the expedite option against the 3-day window and 200m budget', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  const modal = page.locator('#modal');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('۲ عدد قطعه بحرانی');
  await modal.getByRole('button', { name: 'ارزیابی امکان‌پذیری' }).first().click();
  await expect(modal).toContainText('۱۸۰');
  await expect(modal).toContainText('۲۰۰');
  await expect(modal).toContainText('از نظر قیود نمایشی قابل‌بررسی');
  await expect(modal).toContainText('جایگزین برنامه‌ریزی معتبر');
});

test('DEMO-02 calculates a 6-hour capacity deficit and shows the hard-gate result', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="2"]').click();
  const modal = page.locator('#modal');
  await expect(modal).toContainText('۲۲ ساعت');
  await modal.getByRole('button', { name: 'ارزیابی امکان‌پذیری' }).first().click();
  await expect(modal).toContainText('۲۲ − ۱۶ = ۶');
  await expect(modal).toContainText('۹۰');
  await expect(modal).toContainText('۱۵۰');
});

test('decision selection can be followed by a session-only actual outcome and lesson', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  const modal = page.locator('#modal');
  await modal.getByRole('button', { name: 'ثبت انتخاب دمو' }).first().click();
  await expect(modal).toContainText('فقط وضعیت دمو را تغییر می‌دهد');
  await modal.locator('[data-page="memory"]').click();
  const form = page.locator('#actualForm');
  await expect(form).toBeVisible();
  await form.locator('[name="actual"]').fill('تحویل در روز ۳ (نمونه)');
  await form.locator('[name="variance"]').fill('بدون انحراف در سناریوی تمرینی');
  await form.locator('[name="lesson"]').fill('زمان تحویل فروشنده پیش از تصمیم باید تأیید شود');
  await form.getByRole('button', { name: 'ثبت نتیجه نمایشی' }).click();
  await expect(page.locator('#entityContent')).toContainText('زمان تحویل فروشنده پیش از تصمیم باید تأیید شود');
});

test('mobile viewport keeps the demo navigation and key content available', async ({ page }) => {
  await page.goto('/demo/index.html');
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
  await expect(page.locator('.nav[data-page="resources"]')).toBeVisible();
  await page.locator('.nav[data-page="resources"]').click();
  await expect(page.locator('#entityContent')).toContainText('دفتر منابع نمونه');
});
