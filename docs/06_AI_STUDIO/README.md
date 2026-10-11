# اجرای پروژه PVPT با Google AI Studio — راهنمای اصلی

**وضعیت:** بسته آماده‌سازی توسعه و کنترل کیفیت؛ هنوز به‌معنای ساخته‌شدن Web App نهایی در Google AI Studio یا اتصال پایگاه‌داده نیست.

## هدف
تبدیل رپوزیتوری PVPT به یک Web App کامل، چندصفحه‌ای، فارسی/RTL و تعاملی، با معماری قابل نگهداری، پایگاه‌داده پایدار و کنترل کیفیت قابل تکرار. تصویر `demo/main.png` مرجع بصری الزام‌آور صفحه اصلی است.

## شروع در Google AI Studio
1. وارد [Google AI Studio](https://aistudio.google.com/) شوید و Build mode را باز کنید.
2. از منوی افزودن فایل (+)، گزینه **Import from GitHub** را انتخاب و مخزن `mtaghipourpars-dotcom/newmodel1` را وارد کنید. اگر نسخه واردشده روی شاخه‌ای غیر از `main` است، شاخه کاری تأییدشده را انتخاب کنید.
3. مطمئن شوید فایل `demo/main.png` در فایل‌های پروژه قابل دسترس است. اگر Agent نتوانست خود تصویر را واقعاً باز و تحلیل کند، تصویر را جداگانه به prompt پیوست کنید. صرف وجود لینک GitHub به‌معنی آن نیست که مدل پیکسل‌های تصویر را دیده است.
4. فایل‌های زیر را ابتدا به Agent بدهید/از او بخواهید بخواند: `AGENTS.md`, این README، `MASTER_PROTOCOL.md`, `IMPLEMENTATION_SEQUENCE.md`, `SCREEN_REFERENCE_CONTRACT.md`, `APP_ARCHITECTURE_AND_DATA.md`, `ACCEPTANCE_GATES.md`, `IMPLEMENTATION_LEDGER.md`, و مهارت `pvpt-build-orchestrator/SKILL.md`.
5. فقط Prompt شماره 0 از `PROMPT_PACK.md` را اجرا کنید. در مرحله کشف، اجازه تغییر کد ندهید.
6. بعد از تأیید خروجی کشف، هر بار فقط یک Prompt مرحله بعد را اجرا کنید. به مرحله بعد نروید تا معیار پذیرش مرحله جاری با شواهد واقعی پاس شده باشد.
7. پس از اتصال GitHub، قبل از هر همگام‌سازی، diff شاخه را مرور کنید. از تغییر همزمان یک فایل از AI Studio و IDE خودداری کنید.
8. پس از هر گیت موفق، ledger، تست‌ها، commit و شواهد را ثبت کنید. نسخه‌های مهم را با tag یا release مشخص کنید.

## نکته مهم درباره Agent Skills
Agent Skills یک قالب استاندارد شامل `SKILL.md` و منابع اختیاری است. وجود فایل مهارت در مخزن به‌تنهایی تضمین نمی‌کند Google AI Studio آن را خودکار بارگذاری/اجرا کند. در Build mode، مهارت مرتبط را صریحاً به زمینه prompt وارد کنید و خروجی را با آزمون بسنجید. فرمت استاندارد: [Agent Skills](https://agentskills.io/specification).

## ترتیب کلی اجرا
`DISCOVER → BASELINE UI CAPTURE → ARCHITECTURE → DATA CONTRACT → DOMAIN ENGINES → API/DB → PAGE IMPLEMENTATION → INTEGRATION → SECURITY → REGRESSION → VISUAL AUDIT → RELEASE`

ترتیب جزئی، توقف‌ها و معیارها در `IMPLEMENTATION_SEQUENCE.md` است.

## وضعیت فعلی و واقعیت
مخزن فعلی شامل prototype استاتیک HTML/CSS/JS، مستندات محصول/داده/معماری، داده fixture ساختگی و تست‌های Playwright است. این به‌معنی backend پایدار، دیتابیس PostgreSQL، احراز هویت تولیدی یا اتصال زنده SAP/P6/MES/PLM نیست. موارد مذکور باید در فازهای جداگانه ساخته و آزمایش شوند.

## لینک‌های مرجع داخل مخزن
- [مدل محصول](../01_PRODUCT/PVPT_PRODUCT_MODEL.md)
- [طرح تجربه Demo](../01_PRODUCT/DEMO_EXPERIENCE_BLUEPRINT.md)
- [قرارداد صفحه اول](../02_UI/CEO_HOME_PAGE.md)
- [قرارداد سایدبار/صفحات](../02_UI/PVPT_SIDEBAR_AND_PAGE_CONTRACT.md)
- [معماری MVP](../03_ARCHITECTURE/PVPT_MVP_ARCHITECTURE.md)
- [مدل داده اصلی](../04_DATA/MVP_MASTER_DATA_MODEL.md)
- [مدل داده کانونی](../04_DATA/PVPT_CANONICAL_DATA_MODEL_V0.1.md)
- [مرز داده واقعی](../04_DATA/PARS_REAL_DATA_BOUNDARY.md)
- [مدل Product → Project](../04_DATA/PRODUCT_PROJECT_OBJECT_MODEL.md)
- [تصویر مرجع](../../demo/main.png)
