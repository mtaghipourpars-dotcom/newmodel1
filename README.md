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

## Google AI Studio Web App implementation

The repository now includes a gated implementation playbook, prompt pack, checkpoint ledger and portable Agent Skills:
- [Google AI Studio workflow](docs/06_AI_STUDIO/README.md)
- [Master development protocol](docs/06_AI_STUDIO/MASTER_PROTOCOL.md)
- [Step-by-step prompts](docs/06_AI_STUDIO/PROMPT_PACK.md)
- [Implementation sequence and gates](docs/06_AI_STUDIO/IMPLEMENTATION_SEQUENCE.md)
- [Reference UI fidelity contract](docs/06_AI_STUDIO/SCREEN_REFERENCE_CONTRACT.md)
- [Architecture and data contract](docs/06_AI_STUDIO/APP_ARCHITECTURE_AND_DATA.md)
- [Implementation ledger](docs/06_AI_STUDIO/IMPLEMENTATION_LEDGER.md)
- [Agent Skills](.agents/skills/)

The current repository is still a browser-interactive prototype. The AI Studio Web App, PostgreSQL persistence, production security and live source integrations are future implementation gates, not completed capabilities. The image `demo/main.png` is the required visual baseline and must be inspected and compared at the same viewport before claiming fidelity.
