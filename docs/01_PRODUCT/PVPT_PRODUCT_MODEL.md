# PVPT Product Model

## 1. سؤال اصلی مدیرعامل

> کدام پروژه/تعهد در معرض از دست رفتن ارزش است، چرا، تا چه زمانی فرصت مداخله داریم و کدام تصمیم مدیریتی می‌تواند ارزش را حفظ کند؟

## 2. زنجیره اصلی محصول

```text
Product Portfolio
      ↓
Product Object
      ↓
Project Instance
      ↓
Project Status
      ↓
Risk / Deviation
      ↓
Impact on Commitment Chain
      ↓
Impact on Cash / Future Collection
      ↓
Value at Risk
      ↓
Intervention Window
      ↓
Executive Decision Required
      ↓
Execution
      ↓
Outcome
      ↓
Protected Value / Learning
```

## 3. کامپوننت‌های اصلی صفحه اول

1. سبد محصولات / Product Portfolio
2. آخرین وضعیت محصولات
3. پروژه‌ها
4. وضعیت پروژه‌های کلیدی:
   - بحرانی
   - پرریسک
   - نیازمند توجه
   - مطلوب
5. پروژه‌های نیازمند توجه
6. نقشه ارزش و ریسک پروژه
7. ارزش در معرض خطر
8. روند ارزش در معرض خطر
9. آخرین تحولات مهم
10. شاخص‌های کلان:
    - تحویل مشتری
    - حاشیه پروژه‌ها
    - ظرفیت کلیدی
    - نقدینگی
11. آخرین فرصت‌های مؤثر مداخله
12. تصمیم‌های ضروری مدیریت ارشد

## 4. قلب سیستم

`تصمیم‌های ضروری مدیریت ارشد` باید آخرین و مهم‌ترین حلقه صفحه اول باشد.

هر Decision Brief باید حداقل این‌ها را نشان دهد:

- موضوع
- پروژه/محصول مرتبط
- ارزش/تعهد در معرض خطر
- علت
- اثر زنجیره‌ای
- آخرین فرصت مداخله
- گزینه‌های موجود
- پیامد گزینه‌ها
- داده‌های ناقص/متعارض
- تصمیم مورد انتظار از مدیرعامل

PVPT تصمیم را نمی‌گیرد.

## 5. اصل Value at Risk

Value at Risk با Protected Value یکی نیست.

قبل از تصمیم:

- Value at Risk
- Potential Preservation
- Intervention Window

بعد از Outcome:

- Actual Loss
- Avoided Loss
- Preserved Margin
- Preserved Cash / Collection
- Commitment Preserved

هیچ Protected Value نباید قبل از مشاهده Outcome به‌عنوان واقعیت ثبت شود.

## 6. Last Responsible Moment

این مفهوم باید Evidence-based باشد.

اگر شواهد کافی وجود ندارد:

`LRM = UNKNOWN`

سیستم نباید زمان مداخله را بدون پشتوانه عملیاتی اختراع کند.

## 7. Option Boundary

MVP گزینه تولید نمی‌کند.

گزینه‌ها از:

- متخصصان
- برنامه‌ریزی
- تأمین
- مهندسی
- تولید
- مالی
- سیستم‌های تخصصی

وارد می‌شوند و PVPT آن‌ها را:

- مرتبط
- مقایسه
- ردیابی
- توضیح
- و در Decision Memory حفظ

می‌کند.

## 8. معیار موفقیت Demo

Demo باید بتواند یک زنجیره واقعی را از محصول تا تصمیم نشان دهد، بدون اینکه برای پر کردن UI عدد ساختگی وارد کند.
