import { test, expect } from '@playwright/test';

test('executive home clearly separates public catalogue facts from unavailable internal and financial data', async ({ page }) => {
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/demo/index.html');
  await expect(page).toHaveTitle(/PARS Value Protection Tower/);
  await expect(page.locator('.demo-pill').first()).toContainText('DEMO MODE');
  await expect(page.locator('#homePage .app-home-hero h1')).toContainText('سامانه حفاظت از ارزش پروژه‌ها و تعهدات');
  await expect(page.locator('#homePage .source-ribbon')).toContainText('اتصال داده داخلی: برقرار نیست');
  await expect(page.locator('#homePage .source-ribbon')).toContainText('ارزش مالی: محاسبه نشده');
  await expect(page.locator('#homePage .app-stat').nth(0)).toContainText('۶');
  await expect(page.locator('#homePage .app-stat').nth(1)).toContainText('۳');
  await expect(page.locator('#homePage .footer')).toContainText('سناریوی نمایشی');
  expect(errors).toEqual([]);
});

test('portfolio supports six-family navigation, catalogue search and product detail', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="portfolio"]').click();
  await page.locator('[data-view="families"]').click();
  await expect(page.locator('#entityContent .app-family')).toHaveCount(6);
  await page.locator('[data-view="catalog"]').click();
  await page.locator('[name="productSearch"]').fill('MGH61-SA32');
  await expect(page.locator('#product-results .app-product')).toHaveCount(1);
  await expect(page.locator('#product-results')).toContainText('MGH61-SA32');
  await page.locator('#product-results .app-product-details summary').click();
  await expect(page.locator('#product-results .app-product-details').first()).toContainText('MGH61-SA32');
  await expect(page.locator('#product-results .app-product-details').first()).toContainText('PUBLIC_VERIFIED');
});

test('projects view exposes the complete project-to-cell-to-order-to-routing trace and truth boundary', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="projects"]').click();
  const content=page.locator('#entityContent');
  await expect(content).toContainText('BOM Component / Cell');
  await expect(content).toContainText('Production Order');
  await expect(content).toContainText('Routing / Operation');
  await expect(content).toContainText('تمام شناسه‌ها و مقادیر این صفحه ساختگی هستند');
  await page.locator('[data-view="commitments"]').click();
  await expect(content).toContainText('INTERNAL SOURCE REQUIRED');
});

test('DEMO-01 calculates the expedite option against the 3-day window and 200m budget', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  const modal=page.locator('#modal');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('۲ عدد قطعه بحرانی');
  await modal.getByRole('button',{name:'ارزیابی امکان‌پذیری'}).first().click();
  await expect(modal).toContainText('۱۸۰');
  await expect(modal).toContainText('۲۰۰');
  await expect(modal).toContainText('از نظر قیود نمایشی قابل‌بررسی');
  await expect(modal).toContainText('جایگزین برنامه‌ریزی معتبر');
});

test('DEMO-02 calculates a 6-hour capacity deficit and checks the hard gates', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="2"]').click();
  const modal=page.locator('#modal');
  await expect(modal).toContainText('۲۲ ساعت');
  await modal.getByRole('button',{name:'ارزیابی امکان‌پذیری'}).first().click();
  await expect(modal).toContainText('۲۲ − ۱۶ = ۶');
  await expect(modal).toContainText('۹۰');
  await expect(modal).toContainText('۱۵۰');
});

test('infeasible options are blocked and feasible options can be selected only as demo', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="decisions"]').click();
  await page.locator('#entityContent [data-detail="1"]').click();
  const modal=page.locator('#modal');
  await expect(modal.locator('[data-select="part"][data-option="borrow"]')).toBeDisabled();
  await expect(modal.locator('[data-select="part"][data-option="substitute"]')).toBeDisabled();
  await expect(modal.locator('[data-select="part"][data-option="expedite"]')).toBeEnabled();
  await modal.locator('[data-select="part"][data-option="expedite"]').click();
  await expect(modal).toContainText('ثبت انتخاب نمایشی');
  await expect(modal).toContainText('مدیر مسئول');
});

test('intervention comparison returns explicit feasible and infeasible explanations', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="interventions"]').click();
  await page.locator('[data-view="compare"]').click();
  await page.locator('[data-action="evaluate-option"][data-option="borrow"]').click();
  await expect(page.locator('#option-evaluation')).toContainText('ناشدنی در وضعیت فعلی');
  await page.locator('[name="scenario"]').selectOption('capacity');
  await page.locator('[data-action="evaluate-option"][data-option="overtime"]').click();
  await expect(page.locator('#option-evaluation')).toContainText('کسری ۶ ساعت');
});

test('issue capture and decision memory persist in local browser storage', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="risk"]').click();
  await page.locator('[data-view="issues"]').click();
  const issue=page.locator('form[data-form="issue"]');
  await issue.locator('[name="title"]').fill('DEMO regression issue');
  await issue.locator('[name="type"]').selectOption('MATERIAL');
  await issue.locator('[name="severity"]').selectOption('HIGH');
  await issue.locator('[name="object"]').fill('DEMO-CELL-01');
  await issue.locator('[name="description"]').fill('Synthetic test only');
  await issue.getByRole('button',{name:'ثبت ایشوی دمو'}).click();
  await expect(page.locator('#entityContent')).toContainText('DEMO regression issue');
  await page.reload();
  await page.locator('.nav[data-page="risk"]').click();
  await page.locator('[data-view="issues"]').click();
  await expect(page.locator('#entityContent')).toContainText('DEMO regression issue');
});

test('decision, observed outcome and lesson loop is interactive and explicitly labelled', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="memory"]').click();
  const decision=page.locator('form[data-form="decision"]');
  await decision.locator('[name="option"]').selectOption('part|expedite');
  await decision.locator('[name="owner"]').fill('مدیر دمو');
  await decision.locator('[name="rationale"]').fill('گزینه نمونه با قیدهای زمانی و بودجه دمو سازگار است؛ تأیید واقعی لازم است.');
  await decision.locator('[name="status"]').selectOption('DECIDED');
  await decision.getByRole('button',{name:'ثبت تصمیم محلی'}).click();
  await expect(page.locator('#entityContent')).toContainText('تأمین تسریع‌شده');
  await page.locator('[data-view="outcomes"]').click();
  const outcome=page.locator('form[data-form="outcome"]');
  await outcome.locator('[name="title"]').fill('Outcome DEMO');
  await outcome.locator('[name="actual"]').fill('نتیجه مشاهده‌شده در تست');
  await outcome.locator('[name="variance"]').fill('انحراف تمرینی');
  await outcome.locator('[name="source"]').fill('TEST-ONLY');
  await outcome.getByRole('button',{name:'ثبت نتیجه'}).click();
  await expect(page.locator('#entityContent')).toContainText('نتیجه مشاهده‌شده در تست');
  await page.locator('[data-view="lessons"]').click();
  const lesson=page.locator('form[data-form="lesson"]');
  await lesson.locator('[name="text"]').fill('تأیید زمان تأمین باید پیش از تصمیم ثبت شود');
  await lesson.locator('[name="scope"]').fill('سناریوهای کمبود قطعه');
  await lesson.locator('[name="status"]').selectOption('PROPOSED');
  await lesson.getByRole('button',{name:'ثبت درس'}).click();
  await expect(page.locator('#entityContent')).toContainText('تأیید زمان تأمین باید پیش از تصمیم ثبت شود');
});

test('resource, cash and source-readiness pages make missing real data explicit', async ({ page }) => {
  await page.goto('/demo/index.html');
  await page.locator('.nav[data-page="resources"]').click();
  await expect(page.locator('#entityContent')).toContainText('منابع مدل پایه');
  await page.locator('[data-view="cash"]').click();
  await expect(page.locator('#entityContent')).toContainText('INTERNAL SOURCE REQUIRED');
  await expect(page.locator('#entityContent')).toContainText('نقدینگی');
  await page.locator('.nav[data-page="sources"]').click();
  await expect(page.locator('#entityContent')).toContainText('اطلاعات داخلی موردنیاز');
  await expect(page.locator('#entityContent')).toContainText('NOT CONNECTED');
});

test('all primary navigation destinations work without uncaught browser errors', async ({ page }) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/demo/index.html');
  for(const key of ['decisions','projects','portfolio','risk','interventions','resources','memory','sources','home']){
    await page.locator('.nav[data-page="'+key+'"]').click();
    await expect(page.locator('.nav[data-page="'+key+'"]')).toHaveClass(/active/);
  }
  expect(errors).toEqual([]);
});
