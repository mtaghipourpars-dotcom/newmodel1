/* PVPT connected-domain interaction layer.
   Public catalogue facts are sourced; all operational fixtures stay DEMO_SYNTHETIC.
   This browser prototype persists only in this browser, not in an enterprise database. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const DATA_CLASS={PUBLIC_VERIFIED:'مرجع عمومی',INTERNAL_VERIFIED:'داده داخلی تأییدشده',USER_APPROVED_ASSUMPTION:'فرض تأییدشده کاربر',DEMO_SYNTHETIC:'سناریوی ساختگی دمو',UNKNOWN:'نامشخص'};
const KEYS=['home','decisions','projects','portfolio','risk','interventions','resources','memory','sources'];
const LABELS={home:'نمای مدیرعامل',decisions:'فرصت‌های تصمیم',projects:'پروژه، تعهد و تولید',portfolio:'سبد محصولات',risk:'نقشه ارزش و ریسک',interventions:'فرصت‌های مداخله',resources:'منابع و ظرفیت‌ها',memory:'حافظه تصمیم و نتایج',sources:'منشأ و آمادگی داده'};
const SUBS={
home:[['overview','نمای کلان'],['priority','تصمیم‌های ضروری']],
decisions:[['queue','صف تصمیم'],['cases','پرونده‌ها و گزینه‌ها'],['council','شورای مدیران'],['register','ثبت تصمیم']],
projects:[['projects','پروژه‌ها'],['commitments','تعهدات'],['milestones','نقاط عطف'],['chain','زنجیره تعهد'],['bom','BOM و Cell'],['routing','مسیر و فعالیت'],['orders','سفارش و اجرا']],
portfolio:[['families','خانواده‌های محصول'],['catalog','کاتالوگ محصول'],['assignments','ارتباط محصول و پروژه']],
risk:[['map','نقشه ارزش و ریسک'],['issues','ایشوها'],['impact','زنجیره اثر'],['conflicts','تعارض منابع'],['evidence','شواهد و یکپارچگی']],
interventions:[['windows','پنجره‌های مداخله'],['compare','مقایسه گزینه‌ها'],['simulate','آزمایش سناریو']],
resources:[['overview','نمای منابع'],['materials','متریال و قطعات'],['machines','ماشین‌آلات'],['labor','نیروی انسانی و مهارت'],['capacity','ظرفیت و بارگذاری'],['suppliers','تأمین‌کنندگان'],['cash','نقدینگی و محدودیت مالی']],
memory:[['decisions','حافظه تصمیم'],['outcomes','نتایج واقعی'],['lessons','درس‌آموخته‌ها'],['indicators','شاخص‌های مدیریتی'],['trend','روند ارزش در معرض ریسک']],
sources:[['readiness','آمادگی داده'],['provenance','منشأ داده و تأییدها'],['assumptions','فرضیات تأییدشده'],['registry','کاتالوگ منابع'],['access','نقش‌ها و دسترسی'],['config','تنظیمات مدل']]
};
const KEY='pvpt-interactive-workspace-v1';
let db={issues:[],resources:[],projects:[],commitments:[],catalogResources:[],suppliers:[],sources:[],decisions:[],outcomes:[],lessons:[],assumptions:[],events:[],selectedProject:'',selectedProduct:'',selectedScenario:'part',activeFilter:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object')db={...db,...saved,activeFilter:null};}catch(e){}
let catalog={families:[],products:[],assignments:[],projects:[],commitments:[],components:[],orders:[],operations:[],resources:[],suppliers:[],issues:[]};
let currentPage='home',currentView='overview';
const officialUrl='https://mapnagenerator.com/Fa/Products';
const seedProducts=[
 {product_id:'PUB-THERMAL-MGG72-SH2',family_id:'THERMAL_GENERATORS',name:'MGG72-SH2',data_class:'PUBLIC_VERIFIED',source_reference:officialUrl},
 {product_id:'PUB-HYDRO-MGH61-SA32',family_id:'HYDRO_GENERATORS',name:'MGH61-SA32',data_class:'PUBLIC_VERIFIED',source_reference:officialUrl},
 {product_id:'PUB-WIND-MWT2.5-103-G-I',family_id:'WIND_TURBINES',name:'MWT2.5-103-G-I',data_class:'PUBLIC_VERIFIED',source_reference:officialUrl}
];
const seedFamilies=[
 ['THERMAL_GENERATORS','ژنراتورهای حرارتی'],['HYDRO_GENERATORS','ژنراتورهای برق‌آبی'],['WIND_TURBINES','توربین‌های بادی'],['INDUSTRIAL_GENERATORS','ژنراتورهای صنعتی'],['MOTORS','موتورها'],['BUSDuct','باس‌داکت']
].map(([family_id,label_fa],i)=>({family_id,label_fa,display_order:i+1,data_class:'PUBLIC_VERIFIED'}));

/* Canonical CEO Cockpit Executive Scenario Dataset (DEMO_SYNTHETIC — synchronized across Home Page and all 8 operational menus) */
const ceoProjects=[
 {project_id:'P-1405',legacy_id:'PRJ-DEMO-101',project_name:'پروژه P-1405 · ژنراتور نیروگاهی ۳۲۵ مگاوات (MGG72-SH2)',family_id:'THERMAL_GENERATORS',product_id:'PUB-THERMAL-MGG72-SH2',progress:68,status_code:'CRITICAL',status_fa:'بحرانی',var_billion:1200,days_to_pnr:5,customer_at_risk:true,cash_delay_billion:680,margin_at_risk:true,decision_id:'1',scenario_key:'part',issue_summary:'تأخیر ۱۸ روزه تأمین قطعه بحرانی (C-117 / DEMO-COMP-17)',data_class:'DEMO_SYNTHETIC'},
 {project_id:'P-1398',legacy_id:'PRJ-DEMO-102',project_name:'پروژه P-1398 · ژنراتور صنعتی و ایستگاه آزمون مشترک',family_id:'INDUSTRIAL_GENERATORS',product_id:'PUB-IND-GEN-01',progress:55,status_code:'CRITICAL',status_fa:'بحرانی',var_billion:850,days_to_pnr:12,customer_at_risk:true,cash_delay_billion:500,margin_at_risk:true,decision_id:'2',scenario_key:'capacity',issue_summary:'تعارض ظرفیت ایستگاه آزمون مشترک (کسری ۶ ساعت بین دو پروژه)',data_class:'DEMO_SYNTHETIC'},
 {project_id:'P-1412',legacy_id:'PRJ-DEMO-103',project_name:'پروژه P-1412 · توربین بادی ۲.۵ مگاوات (MWT2.5-103-G-I)',family_id:'WIND_TURBINES',product_id:'PUB-WIND-MWT2.5-103-G-I',progress:42,status_code:'HIGH_RISK',status_fa:'پرریسک',var_billion:600,days_to_pnr:28,customer_at_risk:true,cash_delay_billion:0,margin_at_risk:false,decision_id:'',scenario_key:'',issue_summary:'تغییر طراحی ناسل و نیاز به ارزیابی اثر بر BOM، زمان و هزینه',data_class:'DEMO_SYNTHETIC'},
 {project_id:'P-1395',legacy_id:'PRJ-DEMO-104',project_name:'پروژه P-1395 · ژنراتور نیروگاهی سیکل ترکیبی (MGG63-SA2)',family_id:'THERMAL_GENERATORS',product_id:'PUB-THERMAL-MGG63-SA2',progress:75,status_code:'HIGH_RISK',status_fa:'پرریسک',var_billion:400,days_to_pnr:35,customer_at_risk:false,cash_delay_billion:0,margin_at_risk:false,decision_id:'',scenario_key:'',issue_summary:'وصول مرحله‌ای قرارداد مطابق برنامه؛ نیازمند پایش زنجیره تأمین رتور',data_class:'DEMO_SYNTHETIC'},
 {project_id:'P-1401',legacy_id:'PRJ-DEMO-105',project_name:'پروژه P-1401 · بازتوانی و خدمات ژنراتور برق‌آبی (MGH61-SA32)',family_id:'HYDRO_GENERATORS',product_id:'PUB-HYDRO-MGH61-SA32',progress:60,status_code:'ATTENTION',status_fa:'نیازمند توجه',var_billion:230,days_to_pnr:55,customer_at_risk:false,cash_delay_billion:0,margin_at_risk:false,decision_id:'',scenario_key:'',issue_summary:'پایش برنامه تعمیرات و بازتوانی استاتور برق‌آبی',data_class:'DEMO_SYNTHETIC'}
];
const ceoCommitments=[
 {commitment_id:'COM-P1405-DEL',project_id:'P-1405',type:'CUSTOMER_DELIVERY',commitment_type:'تحویل نهایی ژنراتور ۳۲۵ مگاوات به کارفرما',due_date:'1404/02/15 (۵ روز تا نقطه غیرقابل بازگشت)',var_billion:1200,status_code:'CUSTOMER_AT_RISK',status_fa:'در معرض خطر (بحرانی)',data_class:'DEMO_SYNTHETIC'},
 {commitment_id:'COM-P1398-TEST',project_id:'P-1398',type:'CUSTOMER_DELIVERY',commitment_type:'تحویل و گواهی آزمون کارخانه‌ای (FAT) دو مشتری',due_date:'1404/02/22 (۱۲ روز تا نقطه غیرقابل بازگشت)',var_billion:850,status_code:'CUSTOMER_AT_RISK',status_fa:'در معرض خطر (تعارض ظرفیت)',data_class:'DEMO_SYNTHETIC'},
 {commitment_id:'COM-P1412-DEL',project_id:'P-1412',type:'CUSTOMER_DELIVERY',commitment_type:'تحویل مجموعه ناسل و هاب توربین بادی ۲.۵ مگاوات',due_date:'1404/03/10 (۲۸ روز تا نقطه غیرقابل بازگشت)',var_billion:600,status_code:'CUSTOMER_AT_RISK',status_fa:'در معرض خطر (تغییر طراحی)',data_class:'DEMO_SYNTHETIC'},
 {commitment_id:'COM-P1395-MS3',project_id:'P-1395',type:'MILESTONE_PAYMENT',commitment_type:'نقطه عطف مونتاژ رتور و وصول مرحله سوم',due_date:'1404/03/18 (۳۵ روز)',var_billion:400,status_code:'AT_RISK',status_fa:'پایش ویژه (وصول مطابق برنامه)',data_class:'DEMO_SYNTHETIC'},
 {commitment_id:'COM-P1401-SRV',project_id:'P-1401',type:'SERVICE_OVERHAUL',commitment_type:'تحویل بخش بازتوانی‌شده ژنراتور آبی',due_date:'1404/04/08 (۵۵ روز)',var_billion:230,status_code:'ATTENTION',status_fa:'نیازمند توجه',data_class:'DEMO_SYNTHETIC'}
];
const ceoCashStages=[
 {stage_id:'CASH-P1405-M4',project_id:'P-1405',title:'مرحله وصول چهارم (پس از تکمیل مونتاژ و آزمون استاتور P-1405)',amount_billion:680,status_fa:'در معرض تأخیر (وابسته به قطعه DEMO-COMP-17)',delay_risk:'۱۸ روز تأخیر احتمالی در صورت عدم تسریع خرید',data_class:'DEMO_SYNTHETIC'},
 {stage_id:'CASH-P1398-FAT',project_id:'P-1398',title:'مرحله وصول گواهی آزمون نهایی (FAT پروژه P-1398)',amount_billion:500,status_fa:'در معرض تأخیر (وابسته به رفع تعارض ایستگاه آزمون)',delay_risk:'تأخیر در صورت عدم تصویب اضافه‌کاری یا آزمون بیرونی',data_class:'DEMO_SYNTHETIC'},
 {stage_id:'CASH-P1395-M3',project_id:'P-1395',title:'وصول مرحله‌ای قرارداد پروژه P-1395',amount_billion:320,status_fa:'وصول‌شده / مطابق برنامه',delay_risk:'بدون تأخیر (ثبت در آخرین تحولات)',data_class:'DEMO_SYNTHETIC'}
];
const ceoIssues=[
 {id:'ISS-P1405-01',project_id:'P-1405',title:'به‌روزرسانی تعهد تأمین‌کننده پروژه P-1405: تأخیر ۱۸ روزه قطعه بحرانی C-117',type:'MATERIAL',object:'پروژه P-1405 / Cell استاتور / قطعه C-117',severity:'HIGH',var_billion:1200,days_to_pnr:5,time_ago:'۲ ساعت پیش',data_class:'DEMO_SYNTHETIC'},
 {id:'ISS-P1398-02',project_id:'P-1398',title:'گزارش آزمون میانی پروژه P-1398: کسری ۶ ساعت در ایستگاه آزمون مشترک MACH-TEST-01',type:'MACHINE',object:'پروژه P-1398 / ایستگاه آزمون مشترک',severity:'HIGH',var_billion:850,days_to_pnr:12,time_ago:'۴ ساعت پیش',data_class:'DEMO_SYNTHETIC'},
 {id:'ISS-P1412-03',project_id:'P-1412',title:'تغییر طراحی پروژه P-1412: نیاز به ارزیابی اثر بر BOM، زمان و هزینه',type:'METHOD',object:'پروژه P-1412 / BOM مونتاژ هاب و ناسل',severity:'MEDIUM',var_billion:600,days_to_pnr:28,time_ago:'۱ روز پیش',data_class:'DEMO_SYNTHETIC'},
 {id:'ISS-P1401-04',project_id:'P-1401',title:'ریسک تداخل برنامه بازتوانی و خدمات ژنراتور آبی P-1401',type:'MANPOWER',object:'پروژه P-1401 / تیم سیم‌پیچی و خدمات',severity:'MEDIUM',var_billion:230,days_to_pnr:55,time_ago:'۲ روز پیش',data_class:'DEMO_SYNTHETIC'}
];

const scenarios={
 part:{id:'DEMO-01',project_id:'P-1405',title:'کمبود قطعه بحرانی (پروژه P-1405)',class:'DEMO_SYNTHETIC',need:'۲ قطعه در پنجره ۳ روزه (۵ روز تا نقطه غیرقابل بازگشت پروژه P-1405)',constraint:'موجودی آزاد ۰؛ زمان عادی تأمین ۸ روز؛ گزینه تسریع ۲ روز و ۱۸۰ میلیون تومان در برابر بودجه فرضی ۲۰۰ میلیون تومان.',options:[{id:'expedite',name:'تأمین تسریع‌شده',time:2,cost:180,cap:'۲ قطعه',ok:true,detail:'از نظر زمان و سقف فرضی هزینه عبور می‌کند؛ تأیید تأمین‌کننده، کیفیت و تاریخ تحویل هنوز لازم است.'},{id:'borrow',name:'انتقال از پروژه دیگر',time:0,cost:0,cap:'۲ قطعه',ok:false,detail:'تعهد پروژه دیگر را ۵ روز جابه‌جا می‌کند؛ بدون تغییر رسمی تعهد، ناشدنی است.'},{id:'substitute',name:'قطعه جایگزین مهندسی',time:6,cost:90,cap:'۲ قطعه',ok:false,detail:'اعتبارسنجی ۶ روزه از پنجره نیاز ۳ روزه بیشتر است.'}]},
 capacity:{id:'DEMO-02',project_id:'P-1398',title:'تعارض ظرفیت ایستگاه آزمون (پروژه P-1398)',class:'DEMO_SYNTHETIC',need:'تقاضا ۲۲ ساعت؛ ظرفیت مشترک ۱۶ ساعت (۱۲ روز تا نقطه غیرقابل بازگشت پروژه P-1398)',constraint:'کسری ظرفیت ۶ ساعت؛ سقف اضافه‌کاری ۸ ساعت و بودجه فرضی ۱۵۰ میلیون تومان.',options:[{id:'overtime',name:'اضافه‌کاری ایستگاه',time:2,cost:90,cap:'۸ ساعت افزوده',ok:true,detail:'ظرفیت افزوده ۸ ساعت کسری ۶ ساعت را می‌پوشاند؛ هزینه ۹۰ در سقف فرضی ۱۵۰ است.'},{id:'external',name:'آزمون بیرونی',time:3,cost:140,cap:'۱۰ ساعت',ok:true,detail:'از نظر ظرفیت، زمان و بودجه فرضی قابل‌بررسی است؛ صلاحیت پیمانکار و رزرو باید تأیید شوند.'},{id:'deferA',name:'تعویق پروژه A',time:5,cost:35,cap:'آزادسازی پنجره',ok:false,detail:'تعهد پروژه A را ۵ روز نقض می‌کند؛ فقط با تغییر رسمی موعد قابل بررسی مجدد است.'}]}
};

function save(){try{const copy={...db};delete copy.activeFilter;localStorage.setItem(KEY,JSON.stringify(copy));}catch(e){}}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fa(v){return v===null||v===undefined||v===''?'—':Number(v).toLocaleString('fa-IR');}
function badge(text,kind='neutral'){return '<span class="app-badge '+kind+'">'+esc(text)+'</span>';}
function card(title,body,tag=''){return '<section class="app-card"><header class="app-card-head"><div><h3>'+title+'</h3></div>'+tag+'</header><div class="app-card-body">'+body+'</div></section>';}
function empty(title,desc,tag='DATA REQUIRED'){return '<div class="app-empty"><div class="app-empty-icon">⌁</div><strong>'+esc(title)+'</strong><p>'+esc(desc)+'</p>'+badge(tag,'warn')+'</div>';}
function table(headers,rows){return '<div class="app-table-wrap"><table class="app-table"><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+(rows.length?rows.map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="'+headers.length+'">'+empty('رکوردی برای نمایش وجود ندارد','پس از ورود داده معتبر یا ایجاد رکورد دمو، اطلاعات در این بخش ظاهر می‌شود.')+'</td></tr>')+'</tbody></table></div>';}
function button(label,action,kind='secondary',attrs=''){return '<button type="button" class="app-btn '+kind+'" data-action="'+action+'" '+attrs+'>'+label+'</button>';}
function input(label,name,placeholder='',type='text',required=true){return '<label class="app-field"><span>'+label+'</span><input name="'+name+'" type="'+type+'" placeholder="'+placeholder+'" '+(required?'required':'')+'></label>';}
function select(label,name,options,required=true){return '<label class="app-field"><span>'+label+'</span><select name="'+name+'" '+(required?'required':'')+'>'+options.map(o=>'<option value="'+esc(o[0])+'">'+esc(o[1])+'</option>').join('')+'</select></label>';}
function form(id,fields,submit='ثبت در محیط محلی دمو'){return '<form class="app-form" data-form="'+id+'">'+fields.join('')+'<div class="app-form-actions"><button class="app-btn primary" type="submit">'+submit+'</button></div></form>';}

function filterBannerHtml(){
 const f=db.activeFilter;
 if(!f||(!f.context&&!f.project&&!f.family&&!f.status&&!f.scenario))return '';
 const tags=[];
 if(f.project)tags.push(badge('پروژه: '+f.project,'blue'));
 if(f.family){const fam=(catalog.families.find(x=>x.family_id===f.family)||{}).label_fa||f.family;tags.push(badge('خانواده محصول: '+fam,'blue'));}
 if(f.status)tags.push(badge('فیلتر وضعیت: '+f.status,'warn'));
 if(f.scenario)tags.push(badge('سناریو: '+(scenarios[f.scenario]?.id||f.scenario),'warn'));
 return '<div class="active-filter-banner"><div><strong>🔗 متصل به انتخاب شما در نمای مدیرعامل:</strong> <span>'+esc(f.context||'نمایش فیلترشده بر اساس انتخاب صفحه اصلی')+'</span> <span style="margin-right:8px">'+tags.join(' ')+'</span></div><div style="display:flex;gap:8px;align-items:center">'+button('نمایش همه رکوردها','clear-filter','secondary')+' '+button('بازگشت به صفحه اصلی ←','back-home','primary')+'</div></div>';
}

function frame(key,view,title,desc,content){
 const subs=SUBS[key]||[];
 return '<section class="app-page"><div class="app-page-title"><div><span class="app-eyebrow">PARS VALUE PROTECTION TOWER / '+esc(key.toUpperCase())+'</span><h1>'+esc(title||LABELS[key])+'</h1><p>'+esc(desc||'نمای عملیاتی متصل به مدل داده مشترک؛ وضعیت منشأ هر رکورد حفظ می‌شود.')+'</p></div><div class="app-page-state">'+badge('LOCAL DEMO','blue')+badge('منبع داخلی متصل نیست','warn')+'</div></div><nav class="app-subnav">'+subs.map(s=>'<button type="button" class="'+(s[0]===view?'active':'')+'" data-view="'+s[0]+'">'+s[1]+'</button>').join('')+'</nav>'+filterBannerHtml()+'<div class="app-page-content">'+content+'</div><footer class="app-page-footer">داده‌های عملیاتی واقعی PARS در این نسخه متصل نیستند. رکوردهای ایجادشده فقط در همین مرورگر ذخیره می‌شوند؛ تصمیم سازمانی یا ثبت ERP انجام نمی‌شود.</footer></section>';
}
function stat(label,value,detail,kind='blue'){return '<div class="app-stat '+kind+'"><span>'+label+'</span><strong>'+value+'</strong><small>'+detail+'</small></div>';}
function metrics(items){return '<div class="app-stats">'+items.join('')+'</div>';}
function provenance(r){return badge(DATA_CLASS[r.data_class]||'نامشخص',r.data_class==='PUBLIC_VERIFIED'?'good':r.data_class==='DEMO_SYNTHETIC'?'warn':'neutral');}

function filterProjectsList(list){
 const f=db.activeFilter;
 if(!f)return list;
 return list.filter(p=>{
   if(f.project && p.project_id!==f.project && p.legacy_id!==f.project)return false;
   if(f.family && p.family_id!==f.family)return false;
   if(f.status==='AT_RISK')return (p.var_billion||0)>=400 || p.status_code==='CRITICAL' || p.status_code==='HIGH_RISK';
   if(f.status==='CUSTOMER_AT_RISK')return Boolean(p.customer_at_risk);
   if(f.status==='CRITICAL')return p.status_code==='CRITICAL';
   if(f.status==='HIGH_RISK')return p.status_code==='HIGH_RISK';
   if(f.status==='ATTENTION')return p.status_code==='ATTENTION';
   if(f.status==='VAR_GT_1000')return (p.var_billion||0)>=1000;
   if(f.status==='VAR_500_1000')return (p.var_billion||0)>=500 && (p.var_billion||0)<1000;
   if(f.status==='VAR_100_500')return (p.var_billion||0)>=100 && (p.var_billion||0)<500;
   return true;
 });
}

function syncHomeKpis(){
 const decCount = 2 + (db.decisions?.length || 0);
 const decEl = $('#kpiDecisionCount');
 if(decEl) decEl.textContent = String(decCount);
 const badgeEl = $('#decisionPanelBadge');
 if(badgeEl) badgeEl.textContent = fa(decCount);
 const notifEl = $('#liveNotifBadge');
 if(notifEl) notifEl.textContent = String(3 + (db.issues?.length || 0));
}

function loadFixture(){return fetch('../data/product-project-fixture.json').then(r=>{if(!r.ok)throw Error('fixture unavailable');return r.json();}).then(d=>{
 catalog.families=d.product_families||seedFamilies;
 catalog.products=d.products||seedProducts;
 const baseAssign=d.project_product_assignments||d.assignments||[];
 const ceoAssign=ceoProjects.map((p,idx)=>({assignment_id:'ASN-CEO-'+(idx+1),project_id:p.project_id,product_id:p.product_id,family_id:p.family_id,data_class:'DEMO_SYNTHETIC'}));
 catalog.assignments=[...ceoAssign,...baseAssign];
 catalog.projects=[...(db.projects||[]),...ceoProjects,...(d.projects||[])];
 catalog.commitments=[...(db.commitments||[]),...ceoCommitments,...(d.commitments||[])];
 catalog.components=[
   {component_id:'CELL-P1405-STATOR (C-117)',project_id:'P-1405',product_id:'PUB-THERMAL-MGG72-SH2',production_order_id:'PO-P1405-01',data_class:'DEMO_SYNTHETIC'},
   {component_id:'CELL-P1398-ROTOR',project_id:'P-1398',product_id:'PUB-IND-GEN-01',production_order_id:'PO-P1398-02',data_class:'DEMO_SYNTHETIC'},
   {component_id:'CELL-P1412-NACELLE',project_id:'P-1412',product_id:'PUB-WIND-MWT2.5-103-G-I',production_order_id:'PO-P1412-03',data_class:'DEMO_SYNTHETIC'},
   ...(d.components||[])
 ];
 catalog.orders=[
   {production_order_id:'PO-P1405-01',component_id:'CELL-P1405-STATOR (C-117)',project_id:'P-1405',status:'BLOCKED_MATERIAL (کمبود قطعه DEMO-COMP-17)',data_class:'DEMO_SYNTHETIC'},
   {production_order_id:'PO-P1398-02',component_id:'CELL-P1398-ROTOR',project_id:'P-1398',status:'TEST_QUEUE_CONFLICT (تعارض ایستگاه آزمون)',data_class:'DEMO_SYNTHETIC'},
   {production_order_id:'PO-P1412-03',component_id:'CELL-P1412-NACELLE',project_id:'P-1412',status:'DESIGN_REVISION (بررسی تغییر طراحی)',data_class:'DEMO_SYNTHETIC'},
   {production_order_id:'PO-P1395-04',component_id:'CELL-P1395-CORE',project_id:'P-1395',status:'RUNNING (در حال اجرا - ۷۵٪)',data_class:'DEMO_SYNTHETIC'},
   ...(d.production_orders||[])
 ];
 catalog.operations=[
   {operation_id:'OP-P1405-30',production_order_id:'PO-P1405-01',project_id:'P-1405',sequence_no:30,machine_resource_id:'MACH-WIND-01 (مونتاژ سیم‌پیچ استاتور)',planned_hours:16,data_class:'DEMO_SYNTHETIC'},
   {operation_id:'OP-P1405-40',production_order_id:'PO-P1405-01',project_id:'P-1405',sequence_no:40,machine_resource_id:'MACH-TEST-01 (آزمون نهایی ژنراتور)',planned_hours:12,data_class:'DEMO_SYNTHETIC'},
   {operation_id:'OP-P1398-20',production_order_id:'PO-P1398-02',project_id:'P-1398',sequence_no:20,machine_resource_id:'MACH-TEST-01 (ایستگاه آزمون مشترک - کسری ۶ ساعت)',planned_hours:22,data_class:'DEMO_SYNTHETIC'},
   ...(d.operations||[])
 ];
 const moneySeeds=[
   {resource_id:'CASH-STAGE-P1405',name:'مرحله وصول P-1405 (در معرض تأخیر)',resource_type:'MONEY',capacity:680,unit:'میلیارد تومان (DEMO)',data_class:'DEMO_SYNTHETIC'},
   {resource_id:'CASH-STAGE-P1398',name:'مرحله وصول P-1398 (در معرض تأخیر)',resource_type:'MONEY',capacity:500,unit:'میلیارد تومان (DEMO)',data_class:'DEMO_SYNTHETIC'},
   {resource_id:'CASH-BUDGET-P1405',name:'سقف بودجه مداخله تأمین تسریع‌شده (P-1405)',resource_type:'MONEY',capacity:200,unit:'میلیون تومان (DEMO)',data_class:'DEMO_SYNTHETIC'},
   {resource_id:'CASH-BUDGET-P1398',name:'سقف بودجه مداخله ایستگاه آزمون (P-1398)',resource_type:'MONEY',capacity:150,unit:'میلیون تومان (DEMO)',data_class:'DEMO_SYNTHETIC'}
 ];
 catalog.resources=[...(db.catalogResources||[]),...(d.resources||[]),...moneySeeds];
 catalog.suppliers=[
   ...(db.suppliers||[]),
   {supplier_id:'SUP-DEMO-01',name:'تأمین‌کننده قطعه بحرانی C-117 (پروژه P-1405 · تأخیر ۱۸ روزه)',part:'DEMO-COMP-17 / C-117',date:'1404/02/10',data_class:'DEMO_SYNTHETIC'},
   {supplier_id:'SUP-DEMO-02',name:'پیمانکار آزمون بیرونی تأییدشده (پروژه P-1398 · ظرفیت ۱۰ ساعت)',part:'FAT-EXTERNAL',date:'1404/02/14',data_class:'DEMO_SYNTHETIC'},
   ...(d.suppliers||[])
 ];
 catalog.issues=[...ceoIssues,...(d.issues||[])];
 syncHomeKpis();
}).catch(()=>{catalog.families=seedFamilies;catalog.products=seedProducts;catalog.projects=ceoProjects;catalog.commitments=ceoCommitments;});}

function viewHome(view){
 const publicCount=catalog.products.filter(p=>p.data_class==='PUBLIC_VERIFIED'||p.source_status==='PUBLIC_VERIFIED').length;
 if(view==='priority')return metrics([stat('پرونده تصمیم ثبت‌شده',fa(db.decisions.length),'محلی / دمو'),stat('فرصت‌های مداخله واقعی','—','INTERNAL SOURCE REQUIRED','orange'),stat('ارزش مالی در معرض ریسک','—','NOT YET QUANTIFIED','red')])+card('صف تصمیم‌های ضروری',db.decisions.length?table(['پرونده','گزینه','وضعیت','عملیات'],db.decisions.map((d,i)=>[esc(d.title),esc(d.optionName),badge(d.status||'ثبت محلی','warn'),button('مشاهده','open-memory','secondary','data-index="'+i+'"')])):empty('پرونده واقعی در دسترس نیست','برای تجربه تعامل می‌توانید از بخش «فرصت‌های تصمیم» یک سناریوی صریحاً ساختگی را بررسی کنید.','INTERNAL SOURCE REQUIRED'));
 return '<div class="app-home-hero"><div><span class="app-eyebrow">EXECUTIVE CONTROL / DATA-TRUTH FIRST</span><h1>سامانه حفاظت از ارزش پروژه‌ها و تعهدات</h1><p>از انحراف و محدودیت منابع تا گزینه شدنی، تصمیم انسانی و ثبت نتیجه.</p></div><div class="app-home-mark">PVPT<span>MISSION CONTROL</span></div></div><div class="source-ribbon app-source-strip"><strong>مرزبندی داده‌ها · وضعیت فعلی سامانه</strong><span>۶ خانواده محصول</span><span>'+fa(publicCount)+' محصول با مرجع عمومی</span><span class="warn">اتصال داده داخلی: برقرار نیست</span><span class="warn">ارزش مالی: محاسبه نشده</span></div>'+metrics([stat('خانواده محصول',fa(catalog.families.length),'طبقه‌بندی ثابت','blue'),stat('محصولات دارای مرجع عمومی',fa(publicCount),'کاتالوگ محصول','green'),stat('پرونده‌های محلی دمو',fa(db.decisions.length),'تصمیم انسانی لازم','purple'),stat('ارزش در معرض ریسک','—','NOT YET QUANTIFIED','red')])+'<div class="app-two-col">'+card('نقشه ارزش و ریسک',empty('ارزش مالی هنوز قابل محاسبه نیست','به issue، تعهد متأثر، مبنای محاسبه مالی، دوره و منبع تأییدشده نیاز است.','NOT YET QUANTIFIED'),badge('بدون داده مالی','warn'))+card('فرصت‌های مداخله',Object.keys(scenarios).map(k=>'<div class="app-list-row"><div><strong>'+esc(scenarios[k].title)+'</strong><p>'+esc(scenarios[k].need)+'</p>'+badge('DEMO_SYNTHETIC','warn')+'</div>'+button('ارزیابی','go-interventions','primary','data-scenario="'+k+'"')+'</div>').join(''))+'</div>'+card('سبد محصولات', '<div class="app-product-row">'+catalog.products.filter(p=>p.data_class==='PUBLIC_VERIFIED'||p.source_status==='PUBLIC_VERIFIED').map(p=>'<article class="app-product"><span>◈</span><strong>'+esc(p.name||p.model_code)+'</strong><small>'+esc((catalog.families.find(f=>f.family_id===p.family_id)||{}).label_fa||'کاتالوگ محصول')+'</small>'+provenance(p)+'</article>').join('')+'</div>'+button('مشاهده کاتالوگ کامل','go-portfolio','secondary'))+card('زنجیره عملیاتی و یادگیری','<div class="app-flow">'+['Issue / انحراف','تعهد و اثر','قید منابع','امکان‌پذیری','تصمیم انسانی','نتیجه واقعی','درس‌آموخته'].map((s,i)=>'<div class="app-flow-node"><b>0'+(i+1)+'</b><span>'+s+'</span></div>').join('')+'</div><p class="app-muted">نقشه مفهومی معماری است؛ وضعیت هر گام تا ورود داده معتبر، تأییدنشده باقی می‌ماند.</p>');
}

function viewPortfolio(view){
 const f=db.activeFilter;
 const activeFam=f?.family||'';
 if(view==='families')return card('شش خانواده رسمی مدل محصول (متصل به پروژه‌های صفحه اصلی)', '<div class="app-family-grid">'+catalog.families.sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(fam=>{
   const relatedProjs=ceoProjects.filter(p=>p.family_id===fam.family_id);
   return '<button class="app-family" data-action="family-filter" data-family="'+esc(fam.family_id)+'"><span>◈</span><strong>'+esc(fam.label_fa)+'</strong><small>'+esc(fam.family_id)+'</small>'+provenance(fam)+(relatedProjs.length?badge(fa(relatedProjs.length)+' پروژه دمو: '+relatedProjs.map(x=>x.project_id).join('، '),'warn'):badge('بدون ریسک فعال دمو','good'))+'</button>';
 }).join('')+'</div>');
 if(view==='assignments'){
   const list=activeFam?catalog.assignments.filter(a=>a.family_id===activeFam||(catalog.products.find(p=>p.product_id===a.product_id)||{}).family_id===activeFam):catalog.assignments;
   return card('ارتباط محصول و پروژه','<div class="app-filter-row">'+select('فیلتر خانواده','family',[['','همه خانواده‌ها'],...catalog.families.map(fm=>[fm.family_id,fm.label_fa])],false)+'</div>'+ (list.length?table(['شناسه ارتباط','محصول','پروژه','خانواده','منشأ','عملیات'],list.map(a=>{
     const prod=catalog.products.find(p=>p.product_id===a.product_id)||{};
     const famLabel=(catalog.families.find(fm=>fm.family_id===(a.family_id||prod.family_id))||{}).label_fa||(a.family_id||prod.family_id||'—');
     return [esc(a.assignment_id||'—'),esc(prod.name||prod.model_code||a.product_id),esc(a.project_id||'UNKNOWN'),esc(famLabel),provenance(a),a.project_id&&a.project_id.startsWith('P-')?button('مشاهده پروژه','filter-project','secondary','data-project="'+esc(a.project_id)+'"'):'—'];
   })):empty('هیچ ارتباط محصول–پروژه تأییدشده‌ای در دسترس نیست','عضویت محصول در کاتالوگ، وجود پروژه یا تخصیص محصول به پروژه را ثابت نمی‌کند.','INTERNAL SOURCE REQUIRED')));
 }
 const familyOptions=[['','همه خانواده‌ها'],...catalog.families.map(fm=>[fm.family_id,fm.label_fa])];
 const initialProducts=activeFam?catalog.products.filter(p=>p.family_id===activeFam):catalog.products;
 const relatedCeoProjs=activeFam?ceoProjects.filter(p=>p.family_id===activeFam):ceoProjects;
 return card('کاتالوگ محصول و فیلترهای تعاملی','<div class="app-filter-row">'+input('جست‌وجوی مدل یا نام','productSearch','نام یا کد مدل', 'search',false)+select('خانواده محصول','family',familyOptions,false).replace('value="'+esc(activeFam)+'"','value="'+esc(activeFam)+'" selected')+select('منشأ داده','dataClass',[['','همه طبقات'],['PUBLIC_VERIFIED','مرجع عمومی'],['DEMO_SYNTHETIC','دموی ساختگی'],['UNKNOWN','نامشخص']],false)+'</div><div id="product-results">'+productGrid(initialProducts)+'</div><p class="app-muted">مرجع عمومی: <a href="'+officialUrl+'" target="_blank" rel="noopener">کاتالوگ رسمی PARS</a>. مشخصات محصول به‌معنای وجود پروژه، تعهد، ظرفیت یا ارزش مالی نیست.</p>')+card('پروژه‌های سناریوی نمایشی مرتبط با این حوزه محصول',relatedCeoProjs.length?table(['کد پروژه','عنوان پروژه','خانواده محصول','وضعیت','ارزش در معرض خطر (DEMO)','عملیات'],relatedCeoProjs.map(p=>[esc(p.project_id),esc(p.project_name),esc((catalog.families.find(x=>x.family_id===p.family_id)||{}).label_fa||p.family_id),badge(p.status_fa,p.status_code==='CRITICAL'?'bad':'warn'),fa(p.var_billion)+' میلیارد تومان',button('ردیابی پروژه','filter-project','primary','data-project="'+esc(p.project_id)+'"')])):empty('در این خانواده محصول، پروژه پرریسک فعالی در سناریوی دمو ثبت نشده است','وضعیت این حوزه در نمای مدیرعامل «بدون ریسک جدی» است.','DEMO_SYNTHETIC'));
}

function productGrid(products){return products.length?'<div class="app-product-grid">'+products.map(p=>'<article class="app-product"><div class="app-product-symbol">⚙</div><strong>'+esc(p.name||p.model_code||p.product_id)+'</strong><small>'+esc((catalog.families.find(f=>f.family_id===p.family_id)||{}).label_fa||p.family_id||'خانواده نامشخص')+'</small><code>'+esc(p.product_id||'')+'</code>'+provenance(p)+'<a href="'+esc(p.source_reference||p.source_url||officialUrl)+'" target="_blank" rel="noopener">منبع محصول ↗</a><details class="app-product-details"><summary>جزئیات محصول</summary><div><p>شناسه: '+esc(p.product_id)+'</p><p>طبقه داده: '+esc(p.data_class||p.source_status||'UNKNOWN')+'</p><a href="'+esc(p.source_reference||p.source_url||officialUrl)+'" target="_blank" rel="noopener">مشاهده مرجع ↗</a></div></details></article>').join('')+'</div>':empty('محصولی مطابق فیلتر پیدا نشد','فیلترها را تغییر دهید یا داده کاتالوگ را بررسی کنید.');}

function viewProjects(view){
 const f=db.activeFilter;
 const demoNotice='<div class="app-notice warn">تمام نمونه‌های پروژه/تعهد/BOM/فعالیت که در ادامه با پیشوند DEMO یا کدهای P-1405 الی P-1401 نمایش داده می‌شوند ساختگی‌اند (DEMO_SYNTHETIC)؛ پروژه واقعی PARS در این نسخه دریافت نشده است.</div>'+badge('INTERNAL SOURCE REQUIRED','warn');
 const filteredProjs=filterProjectsList(catalog.projects);
 if(view==='projects'){
   return demoNotice+card('زنجیره ردیابی عملیاتی', '<div class="app-flow">'+['Project / Commitment','BOM Component / Cell','Production Order','Routing / Operation','Machine / Material / Manpower'].map((x,i)=>'<div class="app-flow-node"><b>0'+(i+1)+'</b><span>'+x+'</span></div>').join('')+'</div><p class="app-muted">تمام شناسه‌ها و مقادیر این صفحه ساختگی هستند مگر آنکه منبع داخلی معتبر صراحتاً تأیید شده باشد.</p>')+card('فهرست پروژه‌های متصل به نمای مدیرعامل',filteredProjs.length?table(['شناسه','نام پروژه','پیشرفت','وضعیت','ارزش در معرض خطر (DEMO)','مهلت تا نقطه غیرقابل بازگشت','منشأ','عملیات'],filteredProjs.map(p=>[
     '<b>'+esc(p.project_id)+'</b>',
     esc(p.project_name||p.name),
     p.progress!==undefined?fa(p.progress)+'٪':'—',
     p.status_fa?badge(p.status_fa,p.status_code==='CRITICAL'?'bad':p.status_code==='HIGH_RISK'?'warn':'neutral'):badge(p.status||'DEMO','warn'),
     p.var_billion?fa(p.var_billion)+' میلیارد تومان':'—',
     p.days_to_pnr?fa(p.days_to_pnr)+' روز':'—',
     provenance(p),
     button('زنجیره تعهد','project-chain','secondary','data-id="'+esc(p.project_id)+'"')+' '+(p.decision_id?button('پرونده تصمیم','legacy-detail','primary','data-detail="'+esc(p.decision_id)+'"'):'')
   ])):empty('پروژه واقعی بارگذاری نشده است','پروژه‌ها باید از شناسه داخلی معتبر و منبع مورد تأیید مالک داده بیایند.','INTERNAL SOURCE REQUIRED'))+card('ساخت پروژه تمرینی',form('project',[input('شناسه دمو','id','DEMO-PROJ-01'),input('نام پروژه','name','نام سناریوی تمرینی'),select('خانواده محصول','family',catalog.families.map(fm=>[fm.family_id,fm.label_fa])),select('وضعیت','status',[['PLANNED','برنامه‌ریزی‌شده'],['RUNNING','در حال اجرا'],['BLOCKED','متوقف / مسدود']])],'افزودن پروژه ساختگی'));
 }
 if(view==='commitments'){
   let comms=catalog.commitments;
   if(f?.project)comms=comms.filter(c=>c.project_id===f.project);
   else if(f?.status==='CUSTOMER_AT_RISK')comms=comms.filter(c=>c.status_code==='CUSTOMER_AT_RISK'||c.project_id==='P-1405'||c.project_id==='P-1398'||c.project_id==='P-1412');
   return demoNotice+metrics([
     stat('تعهدات تحویل مشتری در معرض خطر','۳ پروژه','P-1405 · P-1398 · P-1412 (DEMO)','red'),
     stat('ارزش تعهدات مشتری در معرض خطر','۲,۶۵۰ میلیارد','جمع P-1405، P-1398 و P-1412','orange'),
     stat('نزدیک‌ترین موعد بحرانی','۵ روز','پروژه P-1405 (کمبود قطعه)','purple')
   ])+card('تعهدات مشتری و سررسیدها (متصل به کارت «تعهدات مشتری در معرض خطر»)',comms.length?table(['شناسه تعهد','پروژه','شرح تعهد','موعد / پنجره','ارزش در معرض خطر','وضعیت','منشأ','عملیات'],comms.map(c=>[
     esc(c.commitment_id),
     '<b>'+esc(c.project_id)+'</b>',
     esc(c.commitment_type||c.type||c.label),
     esc(c.due_date||c.due_day||'—'),
     c.var_billion?fa(c.var_billion)+' میلیارد تومان':'—',
     badge(c.status_fa||'DEMO',c.status_code==='CUSTOMER_AT_RISK'?'bad':'warn'),
     provenance(c),
     button('مشاهده پروژه','filter-project','secondary','data-project="'+esc(c.project_id)+'"')
   ])):empty('موعد تعهد واقعی در دسترس نیست','تاریخ تعهد بدون قرارداد/برنامه معتبر و تاریخ مبنا وارد محاسبه ریسک نمی‌شود.','INTERNAL SOURCE REQUIRED'))+card('ثبت تعهد تمرینی',form('commitment',[input('شناسه تعهد','id','DEMO-COM-01'),input('شناسه پروژه','project','P-1405'),input('شرح تعهد','name','تعهد تمرینی'),input('موعد روز نسبی در سناریو','due','30','number')],'ثبت تعهد ساختگی'));
 }
 if(view==='milestones')return card('نقاط عطف تحویل (پروژه‌های P-1405 تا P-1401)',table(['پروژه','نقطه عطف','برنامه (PLAN)','پیش‌بینی فعلی (FORECAST)','انحراف','منشأ'],[
   ['P-1405','تکمیل مونتاژ استاتور و شروع آزمون نهایی','روز ۱۵','روز ۳۳ (در صورت عدم مداخله)','۱۸ روز تأخیر تأمین‌کننده',badge('DEMO_SYNTHETIC','warn')],
   ['P-1398','آزمون کارخانه‌ای (FAT) در ایستگاه مشترک','روز ۱۲','نیازمند ۶ ساعت ظرفیت افزوده','تعارض ظرفیت مشترک',badge('DEMO_SYNTHETIC','warn')],
   ['P-1412','تأیید بازنگری طراحی و BOM ناسل','روز ۲۸','در حال ارزیابی مهندسی','تغییر طراحی',badge('DEMO_SYNTHETIC','warn')],
   ['P-1395','وصول مرحله سوم قرارداد','روز ۱۰','انجام‌شده مطابق برنامه','۰ روز',badge('DEMO_SYNTHETIC','good')]
 ])+empty('خط مبنا و پیش‌بینی واقعی سیستم Primavera P6 متصل نیست','Baseline، Forecast و Actual باید جداگانه با تاریخ و منشأ داده ثبت شوند.','INTERNAL SOURCE REQUIRED'));
 if(view==='chain'){
   const projId=f?.project||db.selectedProject||'P-1405';
   const proj=ceoProjects.find(p=>p.project_id===projId)||ceoProjects[0];
   return card('زنجیره تعهد و ردیابی پروژه '+esc(proj.project_id), '<div class="app-flow vertical">'+[
     'پروژه: '+proj.project_name,
     'تعهد متأثر: '+(ceoCommitments.find(c=>c.project_id===proj.project_id)?.commitment_type||'تعهد تحویل مشتری'),
     'انحراف / ریسک: '+proj.issue_summary,
     'ارزش در معرض خطر (DEMO): '+fa(proj.var_billion)+' میلیارد تومان · '+fa(proj.days_to_pnr)+' روز تا نقطه غیرقابل بازگشت',
     'سفارش تولید و Cell: '+(catalog.orders.find(o=>o.project_id===proj.project_id)?.production_order_id||'PO-DEMO'),
     'تصمیم مدیریتی مرتبط: '+(proj.decision_id?'پرونده تصمیم فعال شماره '+proj.decision_id:'پایش مستمر')
   ].map((x,i)=>'<div class="app-flow-node"><b>0'+(i+1)+'</b><span>'+esc(x)+'</span></div>').join('')+'</div><p class="app-muted">این زنجیره مدل مرجع است. پیوندها فقط در صورت وجود شناسه و مدرک معتبر به‌عنوان واقعی نمایش داده می‌شوند.</p>');
 }
 if(view==='bom'){
   const comps=f?.project?catalog.components.filter(c=>c.project_id===f.project):catalog.components;
   return demoNotice+card('BOM و Cell (ردیابی قطعات بحرانی پروژه‌ها)',comps.length?table(['Cell / Component','پروژه','محصول','سفارش تولید','منشأ'],comps.map(c=>[esc(c.component_id),esc(c.project_id),esc(c.product_id),esc(c.production_order_id||'—'),provenance(c)])):empty('BOM تأییدشده متصل نیست','Cell یک BOM Component است؛ هر Cell در مدل تولید به سفارش تولید متناظر ردیابی می‌شود.','INTERNAL SOURCE REQUIRED'));
 }
 if(view==='routing'){
   const ops=f?.project?catalog.operations.filter(o=>o.project_id===f.project):catalog.operations;
   return demoNotice+card('Routing / Operations (مسیر عملیات و ایستگاه‌های کاری)',ops.length?table(['عملیات','سفارش','پروژه','توالی','ماشین / مرکز کاری','زمان استاندارد (ساعت)','منشأ'],ops.map(o=>[esc(o.operation_id),esc(o.production_order_id),esc(o.project_id||'—'),esc(o.sequence_no),esc(o.machine_resource_id||'—'),esc(o.planned_hours||o.standard_hours||'—'),provenance(o)])):empty('Routing معتبر دریافت نشده است','ترتیب عملیات، مدت، وابستگی و نیاز منابع باید از منبع تولید تأیید شود.','INTERNAL SOURCE REQUIRED'));
 }
 const ords=f?.project?catalog.orders.filter(o=>o.project_id===f.project):catalog.orders;
 return demoNotice+card('سفارش‌های تولید و واقعیات اجرا',ords.length?table(['سفارش','Cell','پروژه','وضعیت','منشأ'],ords.map(o=>[esc(o.production_order_id),esc(o.component_id),esc(o.project_id),esc(o.status),provenance(o)])):empty('سفارش تولید واقعی متصل نیست','وضعیت سفارش، PCNF/CNF/TECO و مصرف واقعی باید از SAP/منبع معتبر خوانده شود.','INTERNAL SOURCE REQUIRED'))+card('ثبت یادداشت اجرای تمرینی',form('execution',[input('شناسه سفارش دمو','order','PO-P1405-01'),select('وضعیت اجرا','status',[['PCNF','تأیید جزئی'],['CNF','تأیید کامل'],['TECO','بسته فنی']]),input('شرح و مدرک','note','توضیح اجرای تمرینی')],'ثبت یادداشت محلی'));
}

function viewRisk(view){
 const f=db.activeFilter;
 const allIssues=[...db.issues,...ceoIssues];
 const filteredIssues=f?.project?allIssues.filter(x=>x.project_id===f.project||String(x.object||'').includes(f.project)):allIssues;
 if(view==='issues')return card('فهرست ایشوها و انحراف‌های ثبت‌شده (متصل به آخرین تحولات مهم)',filteredIssues.length?table(['پروژه','عنوان ایشو / تحول','نوع قید','موضوع متأثر','شدت','ارزش در معرض خطر','منشأ','عملیات'],filteredIssues.map((x,i)=>[
   '<b>'+esc(x.project_id||'LOCAL')+'</b>',
   esc(x.title),
   esc(x.type),
   esc(x.object),
   badge(x.severity,x.severity==='HIGH'?'bad':'warn'),
   x.var_billion?fa(x.var_billion)+' میلیارد تومان':'—',
   badge('DEMO_SYNTHETIC','warn'),
   x.project_id?button('ردیابی پروژه','filter-project','secondary','data-project="'+esc(x.project_id)+'"'):button('جزئیات','issue-detail','secondary','data-index="'+i+'"')
 ])):empty('ایشوی عملیاتی تأییدشده موجود نیست','برای تمرین فرم زیر یک ایشوی ساختگی ایجاد کنید؛ آن را به‌عنوان واقعیت PARS تلقی نکنید.','INTERNAL SOURCE REQUIRED'))+card('ثبت ایشوی تمرینی',form('issue',[input('عنوان ایشو','title','مثلاً تأخیر قطعه بحرانی'),select('نوع','type',[['MATERIAL','کمبود مواد'],['MACHINE','افت ظرفیت ماشین'],['MANPOWER','کمبود مهارت/نیرو'],['DEPENDENCY','وابستگی'],['CASH','نقدینگی'],['MULTI_CONSTRAINT','چند قید هم‌زمان']]),select('شدت','severity',[['HIGH','زیاد'],['MEDIUM','متوسط'],['LOW','کم']]),input('موضوع متأثر','object','P-1405 / تعهد / Cell'),input('شرح و شواهد','description','منبع، تاریخ و مدرک', 'text')],'ثبت ایشوی دمو'));
 if(view==='impact')return card('زنجیره اثر و حاشیه سود پروژه‌ها (متصل به شاخص کلان «وضعیت حاشیه پروژه‌ها»)',table(['پروژه','منشأ انحراف','اثر بر آزمون/تولید','اثر بر تعهد مشتری','اثر بر وصول و حاشیه سود','وضعیت (DEMO)'],[
   ['P-1405','تأخیر ۱۸ روزه تأمین قطعه C-117','توقف مونتاژ استاتور و تأخیر آزمون نهایی','ریسک نقض موعد تحویل ۳۲۵ مگاوات','تأخیر وصول ۶۸۰ میلیارد + هزینه تسریع ۱۸۰ م.ت (کاهش حاشیه)',badge('در معرض کاهش حاشیه','bad')],
   ['P-1398','کسری ۶ ساعت ایستگاه آزمون مشترک','تراکم صف آزمون کارخانه‌ای (FAT)','تأثیر هم‌زمان بر تحویل دو مشتری','تأخیر وصول ۵۰۰ میلیارد + هزینه اضافه‌کاری/آزمون بیرونی (کاهش حاشیه)',badge('در معرض کاهش حاشیه','bad')],
   ['P-1412','تغییر طراحی مجموعه ناسل','بازنگری BOM و عملیات مونتاژ','ریسک جابه‌جایی موعد تحویل ۲۸ روزه','نیازمند برآورد هزینه تغییر مهندسی',badge('در دست ارزیابی','warn')]
 ])+'<div class="app-flow vertical" style="margin-top:12px">'+['Issue / انحراف اولیه','Activity / Routing / Cell','نیاز و محدودیت منابع','نقطه عطف و تعهد متأثر','اثر زمانی و عملیاتی','اثر مالی با مدرک معتبر'].map((x,i)=>'<div class="app-flow-node"><b>0'+(i+1)+'</b><span>'+x+'</span></div>').join('')+'</div>'+empty('مقدار اثر مالی واقعی (ERP) محاسبه نشده است','ارقام فوق سناریوی نمایشی (DEMO_SYNTHETIC) هستند؛ بدون amount، currency، period، method، provenance و approval، مقدار واقعی مالی NULL می‌ماند.','NOT YET QUANTIFIED'));
 if(view==='conflicts')return card('تعارض منابع مشترک (ایستگاه آزمون و قطعات بحرانی)',Object.keys(scenarios).map(k=>'<div class="app-list-row"><div><strong>'+esc(scenarios[k].title)+'</strong><p>'+esc(scenarios[k].constraint)+'</p>'+badge('DEMO_SYNTHETIC','warn')+'</div>'+button('بررسی قید و گزینه‌ها','go-interventions','primary','data-scenario="'+k+'"')+'</div>').join('')+empty('تعارض واقعی متصل نیست','تعارض فقط با بارگذاری زمان‌مند تقاضا و ظرفیت مشترک قابل تأیید است.','INTERNAL SOURCE REQUIRED'));
 if(view==='evidence')return card('یکپارچگی و کیفیت شواهد',table(['کنترل','قاعده','وضعیت فعلی'],[['منشأ هر رکورد','طبقه داده، مرجع، زمان و مالک',badge('بخشی در fixture','warn')],['شناسه‌های داخلی','تطبیق با منبع معتبر',badge('متصل نیست','bad')],['ارقام مالی','واحد، دوره، روش، تأیید',badge('NOT YET QUANTIFIED','warn')],['روند زمانی','چند snapshot معتبر',badge('INSUFFICIENT HISTORY','warn')],['پروژه و تعهد','مرجع داخلی و تأیید مالک',badge('INTERNAL SOURCE REQUIRED','warn')]]));

 const riskProjs=filterProjectsList(ceoProjects);
 return metrics([
   stat('ارزش کل در معرض خطر (DEMO)','۳,۲۵۰ میلیارد','۴ پروژه اصلی در معرض خطر (P-1405، P-1398، P-1412، P-1395)','red'),
   stat('ارزش مالی واقعی (ERP)','—','NOT YET QUANTIFIED (نیازمند اتصال مالی)','orange'),
   stat('بحرانی‌ترین پنجره مداخله','۵ روز','پروژه P-1405 (۱,۲۰۰ میلیارد تومان)','purple')
 ])+card('جدول تفصیلی پروژه‌ها و تعهدات در معرض خطر (متصل به کارت «ارزش در معرض خطر» و «نقشه ریسک»)',table(['پروژه','خانواده محصول','وضعیت ریسک','ارزش در معرض خطر (میلیارد تومان)','زمان تا نقطه غیرقابل بازگشت','علت اصلی و تعهد متأثر','اقدام مدیریتی'],riskProjs.map(p=>[
   '<b>'+esc(p.project_id)+'</b>',
   esc((catalog.families.find(x=>x.family_id===p.family_id)||{}).label_fa||p.family_id),
   badge(p.status_fa,p.status_code==='CRITICAL'?'bad':p.status_code==='HIGH_RISK'?'warn':'neutral'),
   '<b>'+fa(p.var_billion)+'</b>',
   '<span style="color:'+(p.days_to_pnr<=12?'#c41224':'#173653')+';font-weight:800">'+fa(p.days_to_pnr)+' روز</span>',
   esc(p.issue_summary),
   (p.decision_id?button('پرونده تصمیم','legacy-detail','primary','data-detail="'+esc(p.decision_id)+'"')+' ':'')+button('زنجیره پروژه','filter-project','secondary','data-project="'+esc(p.project_id)+'"')
 ])))+card('ماتریس طبقه‌بندی ارزش و ریسک', '<div class="app-risk-map"><div class="app-risk-axis"><span>اثر عملیاتی / مالی ↑</span><span>فوریت →</span></div><div class="app-risk-grid"><div><strong>مداخله فوری (بحرانی · ۴ پروژه در کل سناریو)</strong><p>P-1405 (۱,۲۰۰ میلیارد · ۵ روز) و P-1398 (۸۵۰ میلیارد · ۱۲ روز)</p></div><div><strong>پایش ویژه (پرریسک · ۳ پروژه)</strong><p>P-1412 (۶۰۰ میلیارد · ۲۸ روز) و P-1395 (۴۰۰ میلیارد · ۳۵ روز)</p></div><div><strong>نیازمند توجه (۵ پروژه)</strong><p>P-1401 (۲۳۰ میلیارد · ۵۵ روز) و سایر پروژه‌های تعمیراتی</p></div><div><strong>وضعیت قابل قبول (مطلوب · ۸ پروژه)</strong><p>پروژه‌های فاقد انحراف بحرانی در افق فعلی</p></div></div></div>'+empty('نقاط ریسک واقعی ERP رسم نشده‌اند','ارقام جدول فوق مربوط به سناریوی نمایشی (DEMO_SYNTHETIC) نمای مدیرعامل است.','INTERNAL SOURCE REQUIRED'));
}

function viewInterventions(view){
 const activeScen=db.activeFilter?.scenario||db.selectedScenario||'part';
 if(view==='compare')return card('مقایسه گزینه‌ها و پیامدها','<div class="app-filter-row">'+select('سناریو','scenario',Object.keys(scenarios).map(k=>[k,scenarios[k].id+' · '+scenarios[k].title])).replace('<option value="'+activeScen+'">','<option value="'+activeScen+'" selected>')+'</div><div id="option-compare">'+scenarioOptions(activeScen)+'</div>');
 if(view==='simulate')return card('شبیه‌سازی سناریوی زمان‌مند','<div class="app-notice warn">ورودی‌ها در محدوده سناریوی ساختگی باقی می‌مانند. این ابزار زمان/هزینه فرضی را بررسی می‌کند و برنامه‌ریزی ERP یا تخصیص واقعی منابع نیست.</div>'+form('simulation',[select('سناریو','scenario',Object.keys(scenarios).map(k=>[k,scenarios[k].id+' · '+scenarios[k].title])),input('پنجره زمانی (روز)','window','3','number'),input('بودجه فرضی (میلیون تومان)','budget','200','number'),input('ظرفیت افزوده (ساعت یا واحد)','capacity','8','number')],'اجرای آزمون قید')+'<div id="simulation-result"></div>');
 return card('پنجره‌های مداخله فعال (متصل به کارت «مهلت‌های مداخله نزدیک»)',Object.keys(scenarios).map(k=>'<article class="app-intervention" style="'+(db.activeFilter?.scenario===k?'border:2px solid #2878cf;background:#f4f9fd':'')+'"><div><span class="app-eyebrow">'+scenarios[k].id+' · پروژه '+esc(scenarios[k].project_id)+' · DEMO SYNTHETIC</span><h3>'+esc(scenarios[k].title)+'</h3><p><b>نیاز و مهلت:</b> '+esc(scenarios[k].need)+'</p><p><b>قید سخت:</b> '+esc(scenarios[k].constraint)+'</p></div><div style="display:flex;gap:8px;flex-wrap:wrap">'+button('مقایسه گزینه‌ها','go-compare','primary','data-scenario="'+k+'"')+' '+button('بازکردن Decision Brief','legacy-detail','secondary','data-detail="'+(k==='part'?'1':'2')+'"')+'</div></article>').join('')+empty('پنجره مداخله واقعی قابل محاسبه نیست','مهلت تصمیم، lead time معتبر، تاریخ snapshot و اثر بر تعهدات باید از منابع داخلی بیاید.','INTERNAL SOURCE REQUIRED'));
}
function scenarioOptions(key){const s=scenarios[key]||scenarios.part;return '<div class="app-notice warn">'+s.id+' · تمام مقادیر این سناریو ساختگی‌اند. '+esc(s.constraint)+'</div>'+table(['گزینه','زمان (روز)','هزینه فرضی (میلیون تومان)','قید سخت','نتیجه ارزیابی','اقدام'],s.options.map(o=>{const ok=o.ok;return [esc(o.name),fa(o.time),fa(o.cost),esc(o.cap),badge(ok?'از نظر قیود نمونه قابل‌بررسی':'ناشدنی در وضعیت فعلی',ok?'good':'bad'),button('ارزیابی','evaluate-option','secondary','data-scenario="'+key+'" data-option="'+o.id+'"')]}))+'<div id="option-evaluation" class="app-evaluation">'+empty('گزینه‌ای ارزیابی نشده است','ارزیابی را اجرا کنید تا منطق زمان، هزینه و نقض تعهدات نمایش داده شود.','EVALUATION PENDING')+'</div>';}

function viewResources(view){
 const res=catalog.resources||[];
 const byType=(t)=>res.filter(r=>r.resource_type===t);
 if(view==='materials')return card('متریال و قطعات بحرانی (شامل C-117 در پروژه P-1405)',byType('MATERIAL').length?table(['قطعه','موجودی آزاد','رزرو','در راه','زمان تأمین','منشأ'],byType('MATERIAL').map(r=>[esc(r.name),esc(r.free_stock??'—'),esc(r.reserved_stock??'—'),esc(r.in_transit_qty??'—'),esc(r.lead_time_days??'—'),provenance(r)])):empty('موجودی واقعی و رزرو متصل نیست','موجودی باید از ledger موجودی، رزرو، رسید و مصرف تطبیق داده شود.','INTERNAL SOURCE REQUIRED'))+card('ثبت ظرفیت/موجودی تمرینی',form('resource',[input('نام منبع','name','قطعه بحرانی دمو'),select('نوع منبع','type',[['MATERIAL','متریال'],['MACHINE','ماشین'],['MANPOWER','مهارت/نیرو'],['METHOD','روش/صلاحیت'],['MONEY','نقدینگی']]),input('مقدار قابل‌دسترس دمو','capacity','0','number'),input('واحد','unit','عدد / ساعت / میلیون تومان')],'ثبت منبع محلی'));
 if(view==='machines'||view==='labor')return card(view==='machines'?'ماشین‌آلات و مراکز کاری':'نیروی انسانی و مهارت',((view==='machines'?byType('MACHINE').concat(byType('WORKCENTER'),byType('TEST_STATION')):byType('MANPOWER').concat(byType('SKILL'))).length?table(['منبع','نوع','ظرفیت','واحد','منشأ'],(view==='machines'?byType('MACHINE').concat(byType('WORKCENTER'),byType('TEST_STATION')):byType('MANPOWER').concat(byType('SKILL'))).map(r=>[esc(r.name),esc(r.resource_type||r.type),fa(r.capacity),esc(r.unit),provenance(r)])):empty(view==='machines'?'ظرفیت و تقویم ماشین واقعی متصل نیست':'ماتریس مهارت و ظرفیت نیروی انسانی متصل نیست','ظرفیت مؤثر باید تقویم، توقف، شیفت، مهارت و تعهدات هم‌زمان را در نظر بگیرد.','INTERNAL SOURCE REQUIRED'))+card('افزودن رکورد منبع تمرینی',form('resource',[input('نام منبع','name',view==='machines'?'ایستگاه آزمون دمو':'تیم مهارتی دمو'),select('نوع منبع','type',view==='machines'?[['MACHINE','ماشین'],['WORKCENTER','مرکز کاری'],['TEST_STATION','ایستگاه آزمون']]:[['MANPOWER','نیروی انسانی'],['SKILL','مهارت / صلاحیت']]),input('ظرفیت در هر روز','capacity','8','number'),input('واحد ظرفیت','unit','ساعت / نفر-ساعت')],'ثبت منبع محلی')));
 if(view==='capacity')return metrics([
   stat('محدودیت ظرفیت کلیدی','۱ گلوگاه فعال','ایستگاه آزمون مشترک MACH-TEST-01 (پروژه P-1398)','orange'),
   stat('تقاضای پنجره مشترک','۲۲ ساعت','پروژه A (۱۲ ساعت) + پروژه B (۱۰ ساعت)','red'),
   stat('ظرفیت عادی در دسترس','۱۶ ساعت','کسری ۶ ساعت در پنجره فعلی','blue')
 ])+card('ظرفیت و بارگذاری زمان‌مند (متصل به شاخص کلان «ظرفیت کلیدی» و پروژه P-1398)',scenarioOptions('capacity')+empty('بارگذاری واقعی مشترک ERP موجود نیست','برای اثبات تعارض واقعی باید demand و available capacity به بازه زمانی یکسان وصل شوند.','INTERNAL SOURCE REQUIRED'));
 if(view==='suppliers')return card('تأمین‌کنندگان و تعهدات تأمین (متصل به پروژه P-1405 و تحولات تأمین)',catalog.suppliers.length?table(['تأمین‌کننده / شرح','شناسه','قطعه / موضوع','موعد ثبت‌شده','منشأ'],catalog.suppliers.map(s=>[esc(s.name),esc(s.supplier_id||s.supplier_code),esc(s.part||'C-117'),esc(s.date||'—'),provenance(s)])):empty('تأمین‌کننده و تاریخ وعده واقعی متصل نیست','تأخیر فقط در قیاس با تاریخ مبنا و وعده معتبر قابل محاسبه است.','INTERNAL SOURCE REQUIRED'))+card('ثبت تعهد تأمین تمرینی',form('supplier',[input('تأمین‌کننده','name','DEMO-SUPPLIER-01'),input('قطعه / Cell','part','DEMO-CELL-01'),input('تاریخ وعده','date','1405/08/01')],'ثبت تعهد دمو'));
 if(view==='cash')return metrics([
   stat('مراحل وصول در معرض تأخیر','۲ مرحله','پروژه‌های P-1405 و P-1398 (DEMO)','orange'),
   stat('جمع نقدینگی در معرض تأخیر','≈ ۱,۱۸۰ میلیارد','۶۸۰ میلیارد (P-1405) + ۵۰۰ میلیارد (P-1398)','red'),
   stat('وصول مطابق برنامه','۱ مرحله','پروژه P-1395 (۳۲۰ میلیارد تومان)','green')
 ])+card('مراحل وصول و نقدینگی در معرض تأخیر (متصل به کارت «نقدینگی در معرض تأخیر» و شاخص کلان «وضعیت نقدینگی»)',table(['شناسه مرحله','پروژه','شرح مرحله وصول','مبلغ (میلیارد تومان)','وضعیت','علت / ریسک تأخیر','منشأ','عملیات'],ceoCashStages.map(c=>[
   esc(c.stage_id),
   '<b>'+esc(c.project_id)+'</b>',
   esc(c.title),
   '<b>'+fa(c.amount_billion)+'</b>',
   badge(c.status_fa,c.project_id==='P-1395'?'good':'warn'),
   esc(c.delay_risk),
   badge('DEMO_SYNTHETIC','warn'),
   button('ردیابی پروژه','filter-project','secondary','data-project="'+esc(c.project_id)+'"')
 ])))+card('منابع مالی و سقف بودجه‌های مداخله دمو',byType('MONEY').length?table(['منبع','مقدار نمایشی','واحد','منشأ'],byType('MONEY').map(r=>[esc(r.name),fa(r.capacity??r.available??'—'),esc(r.unit),provenance(r)])):empty('موجودی نقد و رویدادهای مالی متصل نیست','نقدینگی منبع سخت است؛ amount، currency، period، منبع و مجوز لازم است.','INTERNAL SOURCE REQUIRED'));
 return metrics([stat('ماشین / Work Center','۱ گلوگاه دمو','ایستگاه آزمون مشترک (P-1398)','blue'),stat('مهارت / نیروی انسانی','۱ تیم دمو','سیم‌پیچی و مونتاژ استاتور','purple'),stat('متریال آزاد بحرانی','۰ از ۲ عدد','قطعه C-117 در پروژه P-1405','orange'),stat('نقدینگی در معرض تأخیر','≈ ۱,۱۸۰ میلیارد','۲ مرحله وصول دمو (INTERNAL SOURCE REQUIRED)','red')])+card('منابع مدل پایه',table(['نوع منبع','قاعده کنترل','داده فعلی'],[['Machine','تقویم و ظرفیت خالص زمان‌مند',badge('ایستگاه آزمون در سناریوی دمو','warn')],['Manpower / Skill','صلاحیت و ظرفیت در بازه',badge('تیم مونتاژ در سناریوی دمو','warn')],['Material','موجودی آزاد + رسید − رزرو − مصرف',badge('قطعه C-117 در سناریوی دمو','warn')],['Method','تأیید مهندسی / کیفیت',badge('داده داخلی لازم','warn')],['Money / Cash','جریان نقد و سقف مجاز',badge('۲ مرحله وصول در سناریوی دمو','warn')]]))+card('منابع ثبت‌شده محلی',db.resources.length?table(['منبع','نوع','ظرفیت ثبت‌شده','واحد','منشأ'],db.resources.map(r=>[esc(r.name),esc(r.type),fa(r.capacity),esc(r.unit),badge('DEMO_SYNTHETIC','warn')])):empty('منبع محلی ثبت نشده است','از فرم زیر یک منبع تمرینی اضافه کنید.','NO LOCAL RESOURCE'))+card('ثبت منبع برای سناریوی تمرینی',form('resource',[input('نام منبع','name','منبع تمرینی'),select('نوع منبع','type',[['MATERIAL','متریال'],['MACHINE','ماشین'],['MANPOWER','نیروی انسانی'],['METHOD','روش/صلاحیت'],['MONEY','نقدینگی']]),input('ظرفیت / مقدار','capacity','8','number'),input('واحد','unit','ساعت')],'ثبت منبع محلی'));
}

function viewMemory(view){
 if(view==='outcomes')return card('نتایج واقعی و مشاهده‌شده',db.outcomes.length?table(['پرونده','نتیجه مشاهده‌شده','انحراف','منبع','زمان ثبت'],db.outcomes.map(o=>[esc(o.title),esc(o.actual),esc(o.variance),badge(o.data_class==='INTERNAL_VERIFIED'?'داخلی تأییدشده':'DEMO_SYNTHETIC',o.data_class==='INTERNAL_VERIFIED'?'good':'warn'),esc(o.createdAt)])):empty('نتیجه واقعی ثبت نشده است','ثبت نتیجه دمو مجاز است اما تا ارائه مدرک واقعی، outcome واقعی یا ارزش حفاظت‌شده محسوب نمی‌شود.','OUTCOME REQUIRED'))+card('ثبت نتیجه مشاهده‌شده',form('outcome',[select('تصمیم مرتبط','decision',[['','بدون پیوند تصمیم'],...db.decisions.map((d,i)=>[String(i),d.title+' — '+d.optionName])],false),input('عنوان نتیجه','title','نتیجه تصمیم'),input('مقدار/توضیح مشاهده‌شده','actual','شرح نتیجه واقعی یا دمو'),input('انحراف از انتظار','variance','تفاوت با پیش‌بینی'),input('منبع و مدرک','source','شناسه مدرک / منبع')],'ثبت نتیجه'));
 if(view==='lessons')return card('درس‌آموخته‌ها و قواعد پیشنهادی',db.lessons.length?table(['درس','دامنه','وضعیت','عملیات'],db.lessons.map((l,i)=>[esc(l.text),esc(l.scope),badge(l.status,l.status==='APPROVED'?'good':'warn'),button('تغییر وضعیت','lesson-status','secondary','data-index="'+i+'"')])):empty('درس‌آموخته ثبت نشده است','درس باید به تصمیم و نتیجه مرتبط باشد. قاعده پیشنهادی بدون بازبینی صریح، قانون الزام‌آور نمی‌شود.','NO LESSON YET'))+card('ثبت درس‌آموخته',form('lesson',[input('درس / فرضیه قابل آزمون','text','چه چیزی آموخته شد؟'),input('دامنه کاربرد','scope','کدام محصول / نوع مسئله؟'),select('وضعیت اولیه','status',[['PROPOSED','پیشنهادی'],['REVIEWED','بازبینی‌شده'],['APPROVED','تأییدشده'],['RETIRED','بازنشسته']])],'ثبت درس'));
 if(view==='indicators')return metrics([stat('تصمیم‌های ثبت‌شده',fa(db.decisions.length),'سابقه محلی','purple'),stat('نتایج ثبت‌شده',fa(db.outcomes.length),'واقعی بودن نیازمند مدرک','blue'),stat('درس‌آموخته‌ها',fa(db.lessons.length),'تأیید جداگانه لازم است','green'),stat('ارزش حفاظت‌شده','—','NOT YET VERIFIED','orange')])+card('خلاصه شاخص‌های کلان نمای مدیرعامل (DEMO_SYNTHETIC)',table(['شاخص کلان صفحه اصلی','مقدار نمایشی','پروژه‌های مرتبط','صفحه تخصصی مرتبط','عملیات'],[
   ['وضعیت نقدینگی','۲ مرحله در معرض تأخیر (≈ ۱,۱۸۰ میلیارد تومان)','P-1405، P-1398','منابع و ظرفیت ← نقدینگی',button('مشاهده نقدینگی','nav-direct','secondary','data-target-page="resources" data-target-view="cash"')],
   ['ظرفیت کلیدی','۱ محدودیت گلوگاهی (کسری ۶ ساعت ایستگاه آزمون)','P-1398','منابع و ظرفیت ← ظرفیت و بارگذاری',button('مشاهده ظرفیت','nav-direct','secondary','data-target-page="resources" data-target-view="capacity"')],
   ['وضعیت حاشیه پروژه‌ها','۲ پروژه در معرض کاهش حاشیه سود','P-1405، P-1398','نقشه ریسک ← زنجیره اثر',button('مشاهده اثر حاشیه','nav-direct','secondary','data-target-page="risk" data-target-view="impact"')],
   ['وضعیت تحویل مشتری','۳ تعهد تحویل در معرض خطر','P-1405، P-1398، P-1412','پروژه‌ها ← تعهدات',button('مشاهده تعهدات','nav-direct','secondary','data-target-page="projects" data-target-view="commitments"')]
 ]))+card('تفکیک شاخص‌ها و مرزبندی حقیقت داده',table(['مفهوم','معنا','وضعیت فعلی'],[['PLAN','خط مبنای مصوب','INTERNAL SOURCE REQUIRED'],['ACTUAL','واقعیت ثبت‌شده با مدرک','INTERNAL SOURCE REQUIRED'],['Value at Risk','ارزش بالقوه در معرض ریسک؛ نه زیان تحقق‌یافته','NOT YET QUANTIFIED'],['Realized Loss','زیان تحقق‌یافته مستند','NOT YET QUANTIFIED'],['Protected Value','اثر حفاظتی اثبات‌شده','NOT YET VERIFIED']].map(r=>[r[0],r[1],badge(r[2],'warn')])));
 if(view==='trend')return card('روند ارزش در معرض ریسک',empty('INSUFFICIENT HISTORY','نمودار روند فقط پس از وجود snapshotهای تاریخ‌دار معتبر و روش محاسبه ثابت نمایش داده می‌شود.','INSUFFICIENT HISTORY'));
 return card('حافظه تصمیم و بازسازی استدلال',db.decisions.length?table(['زمان','پرونده','گزینه','امکان‌پذیری','تصمیم‌گیر','دلیل','وضعیت'],db.decisions.map((d)=>[esc(d.createdAt||'نشست فعلی'),esc(d.title),esc(d.optionName),badge(d.feasibility||'ثبت دمو','warn'),esc(d.owner||'تعیین نشده'),esc(d.rationale||'ثبت نشده'),badge(d.status||'LOCAL DEMO','neutral')])):empty('حافظه تصمیم خالی است','ابتدا گزینه را ارزیابی و سپس تصمیم انسانی را ثبت کنید. استدلال، نتیجه ارزیابی و وضعیت اجرا باید حفظ شوند.','NO DECISION YET'))+card('ثبت تصمیم انسانی (دمو)',form('decision',[select('پرونده / سناریو','scenario',Object.keys(scenarios).map(k=>[k,scenarios[k].id+' · '+scenarios[k].title])),select('گزینه','option',Object.keys(scenarios).flatMap(k=>scenarios[k].options.map(o=>[k+'|'+o.id,scenarios[k].id+' · '+o.name]))),input('تصمیم‌گیر مسئول','owner','نقش/سمت مسئول'),input('دلیل و ریسک پذیرفته‌شده','rationale','مبنای انتخاب، شواهد و ریسک باقی‌مانده'),select('وضعیت ثبت','status',[['DECIDED','تصمیم ثبت شد'],['PENDING','نیازمند بررسی'],['REJECTED','رد شد']])],'ثبت تصمیم محلی'));
}

function viewSources(view){
 if(view==='provenance')return card('دفتر منشأ داده',table(['منبع','دامنه','طبقه','محدودیت','اقدام'],[[ '<a href="'+officialUrl+'" target="_blank" rel="noopener">کاتالوگ رسمی PARS</a>','نام مدل‌های محصول',badge('PUBLIC_VERIFIED','good'),'اثبات‌کننده پروژه/تعهد/مالی نیست','مرجع محصول'],['product-project-fixture.json','ساختار خانواده‌ها و مدل‌های نمونه',badge('DEMO / PUBLIC MIX','warn'),'تخصیص‌ها و روابط پروژه دمو هستند','مشاهده فایل'],['منابع داخلی SAP / P6 / MES','پروژه، تعهد، ظرفیت، واقعیات',badge('NOT CONNECTED','bad'),'به مالک و اتصال داخلی نیاز دارد','اتصال لازم'],['مالی و خزانه','نقدینگی، حاشیه، exposure',badge('NOT CONNECTED','bad'),'ارقام فعلاً NULL هستند','اتصال لازم'],...db.sources.map(src=>[esc(src.name),esc(src.url||'—'),provenance(src),esc(src.owner||'منبع محلی'),badge('LOCAL DEMO','warn')])]))+card('ثبت مرجع داده محلی',form('source',[input('نام منبع','name','نام سیستم / سند'),input('URL یا شناسه مرجع','url','https://…'),select('طبقه','class',[['PUBLIC_VERIFIED','مرجع عمومی'],['INTERNAL_VERIFIED','داده داخلی تأییدشده'],['USER_APPROVED_ASSUMPTION','فرض تأییدشده'],['DEMO_SYNTHETIC','دموی ساختگی'],['UNKNOWN','نامشخص']]),input('مالک و زمان اعتبار','owner','مالک داده / تاریخ')],'ثبت مرجع محلی'));
 if(view==='assumptions')return card('فرضیات و تأییدها',db.assumptions.length?table(['فرض','دامنه','تأییدکننده','وضعیت'],db.assumptions.map(a=>[esc(a.text),esc(a.scope),esc(a.owner),badge(a.status,'warn')])):empty('فرض تأییدشده‌ای ثبت نشده است','فرض‌های سناریو فقط در محیط دمو هستند. برای ارتقا به فرض تأییدشده، مالک و دامنه تأیید باید ثبت شوند.','NO APPROVED ASSUMPTIONS'))+card('ثبت فرضیه قابل تأیید',form('assumption',[input('شرح فرض','text','فرضیه صریح'),input('دامنه و محدودیت','scope','دامنه کاربرد'),input('مالک تأیید','owner','نقش/سمت'),select('وضعیت','status',[['PROPOSED','پیشنهادی'],['USER_APPROVED_ASSUMPTION','تأییدشده توسط کاربر']])],'ثبت فرض محلی'));
 if(view==='registry')return card('کاتالوگ منابع داده',table(['سیستم','مالکیت داده','داده مورد انتظار','وضعیت اتصال'],[['SAP PP / PM / MM','تراکنش و سفارش تولید','سفارش، BOM، موجودی، ظرفیت','NOT CONNECTED'],['SAP FI/CO / خزانه','واقعی مالی و نقدینگی','هزینه، پرداخت، جریان نقد','NOT CONNECTED'],['Primavera P6','برنامه و خط مبنا','فعالیت، وابستگی، موعد','NOT CONNECTED'],['MES / SCADA','واقعیات اجرا','توقف، تولید، وضعیت ماشین','NOT CONNECTED'],['تدارکات / تأمین‌کننده','تعهد تأمین','سفارش، موعد، رسید','NOT CONNECTED'],['قرارداد / CRM','تعهد مشتری','موعد قراردادی و تغییرات','NOT CONNECTED']].map(r=>[r[0],r[1],r[2],badge(r[3],'warn')])));
 if(view==='access')return card('نقش‌ها و مسئولیت‌های دسترسی',table(['نقش','مجاز به مشاهده','ثبت / تأیید','مرز اختیار'],[['کارشناس / مالک داده','موضوع و شواهد حوزه خود','ثبت issue و منبع','تأیید داده در حیطه مجاز'],['مدیر پروژه / مسئول تعهد','پروژه و تعهدات مرتبط','پیشنهاد گزینه و اقدام','تغییر تعهد فقط با مجوز'],['مالک منبع / برنامه‌ریزی','ظرفیت و تعارض منابع','تأیید ظرفیت و امکان‌پذیری','تخصیص منابع طبق اختیار'],['شورای مدیران','گزینه‌های شدنی و اثر','تصمیم و پذیرش ریسک','مسئولیت نهایی انسانی'],['مدیر سامانه','پیکربندی و دسترسی','تنظیم مدل / نقش','بدون تأیید خودکار تصمیم']]));
 if(view==='config')return card('پیکربندی قواعد مدل',table(['قاعده','رفتار','وضعیت'],[['Hard gates','Dependency → Material → Machine → Manpower/Skill → Method → Cash','فعال در سناریوهای محدود دمو'],['Feasibility','FEASIBLE / PARTIALLY_FEASIBLE / NOT_FEASIBLE / UNKNOWN','نمونه؛ تأیید عملیاتی لازم'],['Policy','LEXICOGRAPHIC / WEIGHTED / RULESET / HYBRID','قابل تعریف در معماری؛ موتور زمان‌بندی متصل نیست'],['Data provenance','PUBLIC / INTERNAL / ASSUMPTION / DEMO / UNKNOWN','نمایش برچسب‌ها فعال'],['No feasible option','Resource crisis → escalate constraint change','قاعده تصمیم انسانی']]));
 return card('آمادگی داده و موانع اتصال · اطلاعات داخلی موردنیاز',metrics([stat('کاتالوگ عمومی','موجود','نام مدل‌های محصول','green'),stat('پروژه و تعهد واقعی','—','INTERNAL SOURCE REQUIRED','orange'),stat('ظرفیت و موجودی واقعی','—','INTERNAL SOURCE REQUIRED','orange'),stat('داده مالی معتبر','—','NOT YET QUANTIFIED','red')])+table(['دامنه','حداقل داده لازم','وضعیت'],[['پروژه','شناسه داخلی، محصول، مالک، منبع','داده لازم'],['تعهد','نوع، موعد مصوب، تغییر رسمی، منبع','داده لازم'],['منابع','ظرفیت زمان‌مند، تقویم، رزرو و outage','داده لازم'],['مالی','مبلغ، ارز، دوره، روش، منبع و تأیید','داده لازم'],['نتیجه','مشاهده واقعی، تاریخ، مدرک و پیوند تصمیم','داده لازم'],['اتصال منابع داخلی','SAP / P6 / MES / Finance','NOT CONNECTED']].map(r=>[r[0],r[1],badge(r[2],'warn')])));
}

function contentFor(key,view){switch(key){case'home':return viewHome(view);case'portfolio':return viewPortfolio(view);case'projects':return viewProjects(view);case'risk':return viewRisk(view);case'interventions':return viewInterventions(view);case'resources':return viewResources(view);case'memory':return viewMemory(view);case'sources':return viewSources(view);case'decisions':return viewDecisions(view);default:return viewHome('overview');}}

function viewDecisions(view){
 if(view==='council')return card('شورای مدیران و تعهدات تصمیم', '<div class="app-notice">شورا فقط بین گزینه‌های feasible و دارای شواهد کافی انتخاب می‌کند. اگر هیچ گزینه‌ای شدنی نباشد، بحران منابع و تغییر قید باید escalated شود.</div>'+empty('پرونده واقعی آماده شورا وجود ندارد','سناریوهای DEMO فقط برای تمرین‌اند؛ تصمیم در آن‌ها مجوز تخصیص واقعی نیست.','INTERNAL SOURCE REQUIRED'));
 if(view==='register')return card('دفتر ثبت تصمیم',db.decisions.length?table(['پرونده','گزینه','مسئول','دلیل','وضعیت','اقدام'],db.decisions.map((d,i)=>[esc(d.title),esc(d.optionName),esc(d.owner),esc(d.rationale),badge(d.status,'warn'),button('حذف محلی','delete-decision','danger','data-index="'+i+'"')])):empty('تصمیمی ثبت نشده است','پرونده تصمیم فقط پس از ارزیابی امکان‌پذیری و تأیید انسانی ثبت می‌شود.'));
 if(view==='cases')return card('پرونده‌ها و گزینه‌های تصمیم (P-1405 و P-1398)','<div class="app-two-col">'+Object.keys(scenarios).map(k=>'<article class="app-case"><span class="app-eyebrow">'+scenarios[k].id+' · پروژه '+esc(scenarios[k].project_id)+' · DEMO SYNTHETIC</span><h3>'+esc(scenarios[k].title)+'</h3><p>'+esc(scenarios[k].need)+'</p><p>'+esc(scenarios[k].constraint)+'</p><div style="display:flex;gap:8px;flex-wrap:wrap">'+button('بازکردن پرونده و مقایسه','go-compare','primary','data-scenario="'+k+'"')+' '+button('ردیابی پروژه '+esc(scenarios[k].project_id),'filter-project','secondary','data-project="'+esc(scenarios[k].project_id)+'"')+'</div></article>').join('')+'</div>');
 return card('صف تصمیم ضروری (متصل به کارت «تصمیم‌های ضروری مدیریت» و «لیست تصمیم‌های ضروری»)', '<div class="app-notice warn">پرونده‌های زیر سناریوهای ساختگی‌اند (DEMO_SYNTHETIC) و به کارت‌های تصمیم صفحه اصلی متصل هستند.</div><div class="app-two-col">'+Object.keys(scenarios).map(k=>'<article class="app-case"><span class="app-eyebrow">'+scenarios[k].id+' · پروژه '+esc(scenarios[k].project_id)+' · DEMO</span><h3>'+esc(scenarios[k].title)+'</h3><p>'+esc(scenarios[k].need)+'</p><div style="display:flex;gap:8px;flex-wrap:wrap">'+button('ارزیابی گزینه‌ها','go-compare','primary','data-scenario="'+k+'"')+' '+button('بازکردن Decision Brief','legacy-detail','secondary','data-detail="'+(k==='part'?'1':'2')+'"')+' '+button('مشاهده پروژه '+esc(scenarios[k].project_id),'filter-project','secondary','data-project="'+esc(scenarios[k].project_id)+'"')+'</div></article>').join('')+'</div>'+empty('صف تصمیم‌های واقعی ERP دریافت نشده است','تصمیم مدیریتی واقعی فقط پس از شناسایی انحراف، بررسی گزینه‌های feasible و تعیین اختیار تصمیم ایجاد می‌شود.','INTERNAL SOURCE REQUIRED'));
}

function render(key,view){
 const container=$('#entityContent');if(!container)return;
 const safeView=(SUBS[key]||[]).some(s=>s[0]===view)?view:(SUBS[key]||[['overview']])[0][0];
 const title=(SUBS[key]||[]).find(s=>s[0]===safeView)?.[1]||LABELS[key];
 container.innerHTML=frame(key,safeView,title,'صفحه متصل به مدل داده مشترک · برچسب منشأ و محدودیت شواهد در تمام رکوردها حفظ می‌شود.',contentFor(key,safeView));
 container.dataset.appPage=key;container.dataset.appView=safeView;
 delete container.dataset.page;delete container.dataset.view;
 const page=$('#entityPage');if(page){page.classList.add('show');$('#homePage')?.classList.add('hide');}
 const t=$('#entityTitle');if(t)t.textContent=LABELS[key];
 const d=$('#entityDesc');if(d)d.textContent=db.activeFilter?.context||'صفحه متصل به مدل داده مشترک · برچسب منشأ و محدودیت شواهد در تمام رکوردها حفظ می‌شود.';
 const pt=$('#entityPanelTitle');if(pt)pt.textContent=title;
}

function appOpenPage(key,view,preserveFilter=false){
 if(!KEYS.includes(key))key='home';
 if(!preserveFilter)db.activeFilter=null;
 currentPage=key;currentView=view||(key==='home'?'overview':(SUBS[key]||[])[0]?.[0]);
 $$('.nav').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
 if(key==='home'){
   const hp=$('#homePage'),ep=$('#entityPage');
   if(hp){hp.classList.remove('hide');}
   if(ep)ep.classList.remove('show');
   syncHomeKpis();
   return;
 }
 render(key,currentView);
}

function navigateFromHome(opts={}){
 const page=opts.page||'home';
 const view=opts.view||'';
 if(opts.scenario)db.selectedScenario=opts.scenario;
 if(opts.project)db.selectedProject=opts.project;
 db.activeFilter=(opts.project||opts.family||opts.status||opts.scenario||opts.context)?{
   project:opts.project||'',
   family:opts.family||'',
   status:opts.status||'',
   scenario:opts.scenario||'',
   context:opts.context||''
 }:null;
 appOpenPage(page,view,true);
}

function rerender(){const c=$('#entityContent');if(c&&c.dataset.appPage)render(c.dataset.appPage,c.dataset.appView);else appOpenPage('home','overview');}
function go(key,view,preserveFilter=false){appOpenPage(key,view,preserveFilter);}
function notify(title,detail){const el=document.createElement('div');el.className='app-toast';el.innerHTML='<strong>'+esc(title)+'</strong><span>'+esc(detail)+'</span>';document.body.appendChild(el);setTimeout(()=>el.remove(),2800);}

function submitForm(f){
 const fd=new FormData(f),v=Object.fromEntries(fd.entries()),type=f.dataset.form,stamp=new Date().toISOString();
 if(type==='issue'){db.issues.unshift({...v,id:'LOCAL-ISSUE-'+Date.now(),data_class:'DEMO_SYNTHETIC',createdAt:stamp});db.events.unshift({type:'issue',title:v.title,createdAt:stamp});}
 else if(type==='resource'){const r={...v,id:'LOCAL-RES-'+Date.now(),resource_type:v.type,capacity:Number(v.capacity)||0,data_class:'DEMO_SYNTHETIC',createdAt:stamp};db.resources.unshift(r);db.catalogResources.unshift(r);catalog.resources.unshift(r);}
 else if(type==='decision'){
   const [sid,oid]=String(v.option).split('|');const scenario=scenarios[sid]||scenarios[v.scenario];const opt=(scenarios[sid]||scenarios[v.scenario]).options.find(o=>o.id===(oid||v.option));
   if(!opt){notify('ثبت نشد','گزینه انتخاب‌شده معتبر نیست.');return;}
   if(!opt.ok){notify('گزینه ناشدنی','ابتدا قید نقض‌شده باید اصلاح و دوباره ارزیابی شود.');return;}
   db.decisions.unshift({title:scenario.title,scenario:sid||v.scenario,optionId:opt.id,optionName:opt.name,owner:v.owner,rationale:v.rationale,status:v.status||'DECIDED',feasibility:'FEASIBLE · DEMO ONLY',data_class:'DEMO_SYNTHETIC',createdAt:stamp});
 }
 else if(type==='outcome'){db.outcomes.unshift({...v,data_class:'DEMO_SYNTHETIC',createdAt:stamp});}
 else if(type==='lesson'){db.lessons.unshift({...v,data_class:'DEMO_SYNTHETIC',createdAt:stamp});}
 else if(type==='assumption'){db.assumptions.unshift({...v,data_class:v.status==='USER_APPROVED_ASSUMPTION'?'USER_APPROVED_ASSUMPTION':'DEMO_SYNTHETIC',createdAt:stamp});}
 else if(type==='source'){const src={...v,id:'LOCAL-SOURCE-'+Date.now(),data_class:v.class,createdAt:stamp};db.sources.unshift(src);db.events.unshift({type:'source',title:v.name,source:v.url,class:v.class,owner:v.owner,createdAt:stamp});}
 else if(type==='project'){const p={project_id:v.id,project_name:v.name,family_id:v.family,data_class:'DEMO_SYNTHETIC',status:v.status};catalog.projects.unshift(p);db.projects.unshift(p);db.events.unshift({type:'project',title:v.name,createdAt:stamp});}
 else if(type==='commitment'){const c={commitment_id:v.id,project_id:v.project,type:'INTERNAL',label:v.name,due_day:Number(v.due)||null,data_class:'DEMO_SYNTHETIC'};catalog.commitments.unshift(c);db.commitments.unshift(c);}
 else if(type==='execution'){db.events.unshift({type:'execution',title:v.order+' · '+v.status,note:v.note,data_class:'DEMO_SYNTHETIC',createdAt:stamp});}
 else if(type==='supplier'){const sup={supplier_id:'LOCAL-'+Date.now(),name:v.name,part:v.part,date:v.date,data_class:'DEMO_SYNTHETIC'};catalog.suppliers.unshift(sup);db.suppliers.unshift(sup);}
 else if(type==='simulation'){
   const s=scenarios[v.scenario]||scenarios.part;const window=Number(v.window),budget=Number(v.budget),cap=Number(v.capacity);
   const opts=s.options.map(o=>({name:o.name,time:o.time,cost:o.cost,feasible:o.ok&&o.time<=window&&o.cost<=budget&&(v.scenario!=='capacity'||o.id!=='overtime'||cap>=6)}));
   const result=$('#simulation-result');if(result)result.innerHTML=card('نتیجه آزمون قیود',table(['گزینه','زمان','هزینه','نتیجه'],opts.map(o=>[esc(o.name),fa(o.time)+' روز',fa(o.cost)+' میلیون تومان',badge(o.feasible?'از نظر قیود ورودی قابل‌بررسی':'ناشدنی',''+(o.feasible?'good':'bad'))]))+'<p class="app-muted">آزمون فقط بر اساس ورودی‌های دموست؛ تأیید مالک منابع و تعهدات واقعی همچنان لازم است.</p>');notify('آزمون تمام شد','نتیجه محاسبه در صفحه نمایش داده شد.');return;}
 save();syncHomeKpis();rerender();notify('ثبت شد','رکورد در ذخیره‌سازی محلی همین مرورگر نگهداری شد.');
}

document.addEventListener('click',function(e){
 const chosen=e.target.closest('[data-select]');if(!chosen)return;
 const sid=chosen.dataset.select,opt=(scenarios[sid]||{}).options?.find(o=>o.id===chosen.dataset.option);
 if(!opt||!opt.ok)return;
 db.decisions.unshift({title:scenarios[sid].title,scenario:sid,optionId:opt.id,optionName:opt.name,owner:'مدیر مسئول (دمو)',rationale:'ثبت انتخاب از Decision Brief؛ تأیید مالک منبع و پیش‌شرط‌های عملیاتی هنوز لازم است.',status:'SELECTED DEMO',feasibility:'FEASIBLE · DEMO ONLY',data_class:'DEMO_SYNTHETIC',createdAt:new Date().toISOString()});
 save();syncHomeKpis();
},true);

document.addEventListener('click',function(e){
 const view=e.target.closest('[data-view]');if(view){e.preventDefault();e.stopImmediatePropagation();const key=view.closest('#homePage')?'home':($('#entityContent')?.dataset.appPage||'home');go(key,view.dataset.view,true);return;}
 const action=e.target.closest('[data-action]');if(!action)return;
 e.preventDefault();e.stopImmediatePropagation();const a=action.dataset.action;
 if(a==='clear-filter'){db.activeFilter=null;rerender();return;}
 if(a==='back-home'){db.activeFilter=null;go('home','overview');return;}
 if(a==='filter-project'){const pid=action.dataset.project;navigateFromHome({page:'projects',view:'projects',project:pid,context:'ردیابی یکپارچه پروژه '+pid});return;}
 if(a==='nav-direct'){navigateFromHome({page:action.dataset.targetPage,view:action.dataset.targetView,context:'مشاهده جزئیات شاخص کلان از صفحه دانش و تجربه'});return;}
 if(a==='go-interventions'){db.selectedScenario=action.dataset.scenario||'part';go('interventions','windows',true);return;}
 if(a==='go-compare'){db.selectedScenario=action.dataset.scenario||'part';go('interventions','compare',true);return;}
 if(a==='go-portfolio'){go('portfolio','catalog');return;}
 if(a==='family-filter'){navigateFromHome({page:'portfolio',view:'catalog',family:action.dataset.family,context:'فیلتر خانواده محصول: '+action.dataset.family});setTimeout(()=>{const f=$('[name=family]');if(f){f.value=action.dataset.family;f.dispatchEvent(new Event('change'));}},0);return;}
 if(a==='evaluate-option'){const s=scenarios[action.dataset.scenario],o=s?.options.find(x=>x.id===action.dataset.option);if(!s||!o)return;const result=$('#option-evaluation');if(result)result.innerHTML='<div class="app-evaluation-result '+(o.ok?'good':'bad')+'"><h4>'+esc(o.name)+' · '+(o.ok?'از نظر قیود نمونه قابل‌بررسی':'ناشدنی در وضعیت فعلی')+'</h4><p>'+esc(o.detail)+'</p><p>زمان: '+fa(o.time)+' روز · هزینه فرضی: '+fa(o.cost)+' میلیون تومان</p><p class="app-muted">این نتیجه فقط DEMO_SYNTHETIC است؛ پیش‌شرط‌های تأیید نشده، FEASIBLE عملیاتی محسوب نمی‌شوند.</p>'+(!o.ok?'<strong>اقدام بعدی: اصلاح قید/تعهد و ارزیابی مجدد؛ در نبود گزینه شدنی، ارجاع بحران منابع به شورای مدیران.</strong>':'<strong>پیش‌شرط‌ها: تأیید مالک منبع، کیفیت/صلاحیت و تعهدات متأثر.</strong>')+'</div>';return;}
 if(a==='product-detail'){const cardEl=action.closest('.app-product');const code=cardEl?.querySelector('code')?.textContent;const label=cardEl?.querySelector('strong')?.textContent;const p=catalog.products.find(x=>x.product_id===action.dataset.id)||catalog.products.find(x=>x.product_id===code)||catalog.products.find(x=>(x.name||x.model_code)===label);openInfo('جزئیات محصول',p?'<p><b>'+esc(p.name||p.model_code)+'</b></p><p>شناسه: '+esc(p.product_id)+'</p><p>خانواده: '+esc((catalog.families.find(f=>f.family_id===p.family_id)||{}).label_fa||'نامشخص')+'</p><p>طبقه داده: '+esc(p.data_class||p.source_status||'UNKNOWN')+'</p><p><a target="_blank" rel="noopener" href="'+esc(p.source_reference||p.source_url||officialUrl)+'">مرجع محصول</a></p>':'<p>شناسه محصول در کاتالوگ بارگذاری‌شده پیدا نشد.</p>');return;}
 if(a==='project-chain'){if(action.dataset.id)db.selectedProject=action.dataset.id;go('projects','chain',true);return;}
 if(a==='issue-detail'){const x=db.issues[Number(action.dataset.index)];if(x)openInfo('جزئیات ایشو',Object.entries(x).map(([k,v])=>'<p><b>'+esc(k)+'</b>: '+esc(v)+'</p>').join(''));return;}
 if(a==='open-memory'){go('memory','decisions');return;}
 if(a==='delete-decision'){db.decisions.splice(Number(action.dataset.index),1);save();syncHomeKpis();rerender();notify('حذف شد','رکورد محلی حذف شد.');return;}
 if(a==='lesson-status'){const l=db.lessons[Number(action.dataset.index)];if(l){const order=['PROPOSED','REVIEWED','APPROVED','RETIRED'];l.status=order[(order.indexOf(l.status)+1)%order.length];save();rerender();}return;}
});
document.addEventListener('submit',function(e){const f=e.target.closest('form[data-form]');if(!f)return;e.preventDefault();e.stopImmediatePropagation();submitForm(f);},true);
function handleWorkbenchChange(e){
 if(e.target.matches('[name=productSearch],[name=family],[name=dataClass]')){const root=$('#product-results');if(!root)return;let ps=catalog.products.slice();const search=($('[name=productSearch]')?.value||'').toLowerCase();const fam=$('[name=family]')?.value||'';const cls=$('[name=dataClass]')?.value||'';ps=ps.filter(p=>(!search||String(p.name||p.model_code||'').toLowerCase().includes(search)||String(p.product_id).toLowerCase().includes(search))&&(!fam||p.family_id===fam)&&(!cls||(p.data_class||p.source_status)===cls));root.innerHTML=productGrid(ps);}
 if(e.target.matches('[name=scenario]')&&$('#option-compare')){$('#option-compare').innerHTML=scenarioOptions(e.target.value);db.selectedScenario=e.target.value;save();}
}
document.addEventListener('change',handleWorkbenchChange,true);
document.addEventListener('input',handleWorkbenchChange,true);
function openInfo(title,body){const modal=$('#modal');if(!modal)return;$('#modalTitle').textContent=title;$('#modalBody').innerHTML='<div class="app-info-modal">'+body+'</div>';modal.classList.add('open');}
window.openPage=appOpenPage;
window.PVPT={render,go,db,navigateFromHome,getCatalog:()=>catalog,openProductDetail:(id)=>{const cardEl=$('[data-action="product-detail"][data-id="'+id+'"]')?.closest('.app-product');const code=cardEl?.querySelector('code')?.textContent;const label=cardEl?.querySelector('strong')?.textContent;const p=catalog.products.find(x=>x.product_id===id)||catalog.products.find(x=>x.product_id===code)||catalog.products.find(x=>(x.name||x.model_code)===label);openInfo('جزئیات محصول',p?'<p><b>'+esc(p.name||p.model_code)+'</b></p><p>شناسه: '+esc(p.product_id)+'</p><p>خانواده: '+esc((catalog.families.find(f=>f.family_id===p.family_id)||{}).label_fa||'نامشخص')+'</p><p>طبقه داده: '+esc(p.data_class||p.source_status||'UNKNOWN')+'</p><p><a target="_blank" rel="noopener" href="'+esc(p.source_reference||p.source_url||officialUrl)+'">مرجع محصول</a></p>':'<p>شناسه محصول در کاتالوگ بارگذاری‌شده پیدا نشد.</p>');}};
loadFixture().then(()=>appOpenPage(currentPage,currentView));
})();
