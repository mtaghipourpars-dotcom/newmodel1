# CEO Home Page — PVPT

## هدف

مدیرعامل در کمتر از چند دقیقه باید بفهمد:

1. کدام ارزش در معرض خطر است؟
2. این خطر به کدام پروژه/تعهد مربوط است؟
3. زنجیره اثر چیست؟
4. چه چیزی نیازمند توجه است؟
5. فرصت مداخله تا چه زمانی باقی است؟
6. کدام تصمیم از مدیریت ارشد لازم است؟

## Information Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│ PVPT — Executive Value Protection                            │
│ وضعیت ارزش و تعهدات پارس                                    │
├──────────────────────────────────────────────────────────────┤
│ PRODUCT PORTFOLIO                                            │
│ [Generator] [Wind] [Motor] [Busduct] ...                    │
├──────────────────────────────────────────────────────────────┤
│ KEY PROJECTS                                                 │
│ Critical | High Risk | Attention | Healthy                  │
├───────────────────────────────┬──────────────────────────────┤
│ Projects Needing Attention    │ Value / Risk Map             │
│                               │                              │
├───────────────────────────────┴──────────────────────────────┤
│ VALUE AT RISK                                                │
│ Current Exposure + Trend                                     │
├──────────────────────────────────────────────────────────────┤
│ MACRO EXECUTIVE INDICATORS                                   │
│ Delivery | Margin | Capacity | Liquidity                     │
├──────────────────────────────────────────────────────────────┤
│ LATEST MATERIAL DEVELOPMENTS                                 │
├──────────────────────────────────────────────────────────────┤
│ LAST EFFECTIVE INTERVENTION OPPORTUNITIES                    │
├──────────────────────────────────────────────────────────────┤
│ 🔴 EXECUTIVE DECISIONS REQUIRED                              │
│ Decision Brief 1 | Decision Brief 2 | ...                    │
└──────────────────────────────────────────────────────────────┘
```

## UI Rules

### وضعیت پروژه

رنگ فقط وضعیت را منتقل کند؛ رنگ جایگزین عدد/شواهد نشود.

### Value at Risk

واحد نمایشی: میلیارد تومان، فقط وقتی مقدار معتبر در دسترس است.

در غیر این صورت:

`NOT YET QUANTIFIED`

### Trend

نمودار روند فقط با نقاط زمانی معتبر نمایش داده شود.

اگر تاریخچه کافی نیست:

`INSUFFICIENT HISTORY`

### Macro Indicators

هر شاخص باید:

- وضعیت
- مقدار/بازه معتبر
- زمان به‌روزرسانی
- منبع
- Confidence / Integrity

داشته باشد.

### Executive Decision

این بخش باید در مرکز تجربه مدیرعامل باشد؛ نه یک منوی فرعی.

## Product Portfolio

اطلاعات واقعی اولیه از کاتالوگ رسمی PARS:

- Thermal Generators
- Industrial Generators
- Hydro Generators
- Wind Generators
- Wind Turbines
- Induction Motors
- Permanent Magnet Motors
- Busduct

در Demo اولیه، تصاویر و مشخصات محصول می‌توانند از کاتالوگ رسمی PARS نمایش داده شوند؛ اما Project/Financial status نباید از خود کاتالوگ استنتاج شود.
