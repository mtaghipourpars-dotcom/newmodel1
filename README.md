# PARS Value Protection Tower (PVPT)

سامانه حفاظت از ارزش پروژه‌ها و تعهدات شرکت مهندسی و ساخت ژنراتور مپنا (پارس).

## هدف

PVPT برای مدیرعامل و مدیریت ارشد طراحی می‌شود تا به‌جای نمایش صرف KPI، زنجیره زیر را قابل مشاهده و قابل مداخله کند:

`سبد محصول → محصول → پروژه → وضعیت پروژه → ریسک → اثر بر تعهدات → اثر بر نقدینگی/وصول → ارزش در معرض خطر → فرصت مداخله → تصمیم ضروری → نتیجه`

### اصل محصول

> PVPT پروژه‌ها را گزارش نمی‌کند؛ ارزش در معرض خطر را پیش از تبدیل شدن به زیان، برای مداخله مدیریت آشکار می‌کند.

### نقش MDCRL

MDCRL محصول مستقل نیست؛ موتور داخلی PVPT برای:

- Decision Context
- Integrity
- Traceability
- Reasoning Reconstruction
- Decision Memory

است.

## وضعیت فعلی

این مخزن در مرحله تبدیل Concept/UI به Demo MVP است.

**قانون داده:** هیچ مقدار پروژه، ارزش مالی، درصد پیشرفت، ریسک یا وضعیت واقعی بدون منبع معتبر PARS وارد Demo نمی‌شود.

اطلاعات واقعی موجود در MVP اولیه از منابع رسمی PARS گرفته می‌شود؛ داده‌های پروژه و تصمیمات واقعی باید از داده/مصاحبه/اسناد داخلی PARS تأمین شوند.

## منابع رسمی

- PARS Products: https://mapnagenerator.com/Fa/Products
- PARS Introduction: https://mapnagenerator.com/Fa/Intro
- MAPNA Group – MAPNA PARS: https://mapnagroup.com/mapnacompanies/mapna-pars/?lang=en

## ساختار

- `docs/01_PRODUCT/PVPT_PRODUCT_MODEL.md` — مدل محصول و زنجیره ارزش
- `docs/02_UI/CEO_HOME_PAGE.md` — معماری صفحه اول مدیرعامل
- `docs/03_ARCHITECTURE/PVPT_MVP_ARCHITECTURE.md` — معماری MVP
- `docs/04_DATA/PARS_REAL_DATA_BOUNDARY.md` — مرز داده واقعی و داده‌های ممنوع
- `demo/index.html` — نمونه اولیه UI، بدون جعل داده پروژه
