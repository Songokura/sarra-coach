/* ============================================================
   САРРА ЖУМА - скрипт страницы.
   Плиты и разлом · перевод RU/KZ · меню · лента · появление ·
   тест «Денежный детектор» · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77000000000";               /* плейсхолдер номера, заменяется одной командой */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет → строка остаётся русской. */
var KZ = {
"m.title":"90 минутта ақша блоктарының диагностикасы - гипно-коуч Сарра Жума",
"m.desc":"Сарра-Айгуль Жума, 13 жылдық тәжірибесі бар гипно-коуч: 90 минутта ақша блоктарының диагностикасы, офлайн немесе онлайн. Нанымдарыңыздың тізімі, серпіліс жоспары және күнделікті техникалар - сол күні. 9 900 ₸, қайтару кепілдігі. 15 сұрақтан тұратын «Ақша детекторы» тесті.",
"m.ogt":"90 минутта ақша блоктарының диагностикасы - Сарра Жума",
"m.ogd":"Гипно-коуч, 13 жыл тәжірибе, 2000+ кәсіпкер. Табысты бір деңгейде ұстап тұрған нанымдарды тауып, серпіліс жоспарын береміз. 9 900 ₸, нәтиже сол күні.",
"a.home":"Сарра Жума, басты бетке","a.role":"гипно-коуч","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"nav.diag":"Диагностика","nav.prog":"Бағдарламалар","nav.about":"Сарра туралы","nav.cena":"Бағасы","nav.test":"Тест","nav.faq":"Сұрақтар","nav.kont":"Байланыс",
"b.call":"Қоңырау шалу","b.wa":"WhatsApp-қа жазылу","b.wa2":"WhatsApp-қа жазу","b.book":"Жазылу · 9 900 ₸","b.test":"3 минуттық тест өту","b.diag":"Диагностикаға жазылу","b.seat":"Орын алу",

"h.kick":"Гипно-коуч · офлайн және онлайн · 13 жыл","h.h1a":"Ақша блоктарының","h.h1b":"диагностикасы",
"h.lead":"Табысты өсіруге арналған ойлауды қайта бағдарламалау: 90 минутта табысыңызды бір деңгейде ұстап тұрған нанымдарды тауып, серпіліс жоспарын құрамыз. Нәтиже - сол күні.",
"h.cap":"гипно-коуч, ойлауды қайта бағдарламалау шебері · 2000+ кәсіпкер",

"s.bl.k":"Таныс па?","s.bl.h":"Тынымсыз жұмыс істейсіз, ал табыс бір орында",
"bl.1":"Табыс жылдар бойы бір деңгейде тұрып қалды","bl.2":"Ай сайын - ақша жетіспеуінен күйзеліс","bl.3":"Үлкен ақша сізді айналып өтетін сияқты",
"bl.4":"Артығына лайықсыз, бірақ бірдеңе кедергі","bl.5":"Клиенттер неге екені белгісіз, бәсекелестерді таңдайды","bl.6":"Бизнес төбесіне тірелді, ал кеңею қорқынышты",
"s.bl.v":"Мәселе не істеп жатқаныңызда емес. <em>Не ойлап жатқаныңызда.</em>",

"s.dg.k":"Диагностика · 90 минут","s.dg.h":"Табысыңызды тежеп тұрғанды тауып, алып тастаймыз",
"s.dg.p":"Жеке жұмыс, офлайн немесе онлайн. Блоктарыңыздың тізімі, оларды жою жоспары және күнделікті техникалар - сол күні.",
"a.talk":"Терезе алдындағы жеке әңгіме: диагностика осылай өтеді",

"s.rz.k":"Қалай өтеді","s.rz.h":"90 минуттағы үш қадам",
"st.1.h":"Жасырын блоктарды анықтаймыз","st.1.p":"Табыстың өсуіне кедергі келтіретін психологиялық және энергетикалық тосқауылдар.",
"st.2.h":"Мінез-құлық үлгілерін талдаймыз","st.2.p":"Қандай әрекеттер мен шешімдер табысыңызға бөгет болады.",
"st.3.h":"Серпіліс жоспарын құрамыз","st.3.p":"Сіздің жағдайыңызға арналған нақты ұсыныстар мен құралдар.",
"a.plan":"Жылы жарықта блокнотқа жоспар жазып жатқан қол",
"s.tk.k":"Не аласыз","tk.1":"Ақша блоктарыңыздың тізімі","tk.2":"Оларды жоюдың қадамдық жоспары","tk.3":"Күнделікті техникалар",
"tk.b":"<b>Жазылғанда бонус:</b> «Ақша сізден қашып жатқанының 30 белгісі» чек-парағы",

"s.pg.k":"Көрінбейтін бағдарламалар","s.pg.h":"Ақшаңызды ұрлайтын бес наным",
"pg.1.h":"Табыстан қорқу","pg.1.p":"Ақшамен бірге көтере алмайтын жауапкершілік келетіндей көрінеді.",
"pg.2.h":"Үлкен ақша = үлкен мәселе","pg.2.p":"Ірі мәмілелерден санасыз түрде қашасыз.",
"pg.3.h":"Мен лайық емеспін","pg.3.p":"Сенімсіздік дәулетті клиенттерді үркітеді.",
"pg.4.h":"Ақша қиын табылады","pg.4.p":"Қарапайымды күрделендіріп, жеңіл ақшаны итересіз.",
"pg.5.h":"Өзін-өзі саботаждау","pg.5.p":"Тиімді жобалардан бас тартып, бағаны төмендетесіз.",

"s.ab.k":"Кім жүргізеді",
"s.ab.p":"Гипно-коуч, ойлауды қайта бағдарламалау шебері. 13 жыл тәжірибе. Өзінің 650 000 $ несиесін жауып, содан бері кәсіпкерлерге үлкен ақшаға жол ашатын ішкі тосқауылдарды алып тастауға көмектеседі.",
"st.a":"кәсіпкер өз ақша блоктарын алып тастады","st.b":"клиент 2 аптада-ақ алғашқы өзгерісті байқайды","st.c":"3 айдағы орташа табыс өсімі","st.d":"Instagram жазылушысы",
"st.r":"Клиент рекорды: табыс 3 млн-нан 9 млн-ға дейін өсті.",

"s.km.k":"Кімге сай келеді","s.km.h":"Мәселе нарықта емес екенін мойындауға дайындар үшін",
"km.y.h":"Диагностика керек, егер сіз:","km.y1":"Жаңа деңгейге шыққысы келетін кәсіпкерсіз","km.y2":"Ауқым қажет сарапшысыз","km.y3":"Жалдамалы қызметкерсіз, мансаптық өсу жоқ",
"km.y4":"Көрінгісі келетін әйелсіз","km.y5":"Көп жұмыс істеп, аз алудан шаршадыңыз",
"km.n.h":"Сай келмейді, егер сіз:","km.n1":"Ойлауыңызбен жұмыс істеуге дайын емессіз","km.n2":"«Бір аптада байып кету» сиқырлы түймесін іздейсіз",

"s.cn.k":"Құны","s.cn.h":"Ақшамен, бизнеспен және мансаппен қарым-қатынас диагностикасы",
"cn.note":"Блоктарыңыздан бір күнде жоғалтатыныңыздан аз.",
"cn.1":"90 минут жеке жұмыс","cn.2":"Офлайн немесе онлайн","cn.3":"Нәтиже сол күні","cn.4":"Кейін 14 күн қолдау",
"cn.5":"100 % кепілдік: өзгерістер жоспары болмаса - ақшаны қайтарамын","cn.6":"Айына 20 диагностикадан артық емес",

"s.ts.k":"Ақша детекторы","s.ts.h":"Қай блоктар табысыңызды ұрлап жатыр?",
"s.ts.p":"15 сұрақ, 3 минут. Соңында - ақша блоктарыңыздың деңгейі және келесі қадам.",
"ts.note":"Тест танысу үшін: нақты көріністі диагностика береді.",

"s.fq.k":"Сұрақтар","s.fq.h":"Алғашқы кездесу алдында не сұрайды",
"q.1":"Жеке мәселелерімді гипно-коучқа айтудан қорқамын. Қалай жеңуге болады?",
"q.1a":"Бұл қалыпты жағдай. Алғашқы кездесуде жай танысып, күткеніңіз бен ыңғайлы қарқынды талқылаймыз. Сөйлеу жеңіл әрі тыныш болатын қауіпсіз кеңістік жасаймын. Бірінші қадам - келу.",
"q.2":"Алғашқы кездесуге қалай дайындалу керек?",
"q.2a":"Ешқалай. Не айтарыңызды ойлап табудың қажеті жоқ: ойларыңызды жүйелеуге көмектесіп, әңгімені бағыттаймын. Ашық болу жеткілікті.",
"q.3":"Құпиялылық сақтала ма?",
"q.3a":"Иә. Талқылағанның бәрі арамызда қалады. Ерекшелік - сіздің немесе басқаның қауіпсіздігіне қатер төнген жағдайлар ғана.",
"q.4":"Жұмыс қанша уақытқа созылады және нәтиже қашан болады?",
"q.4a":"Әркімде әртүрлі: біреу бірнеше кездесуде-ақ өзгерісті сезеді, біреуге көбірек уақыт керек. Клиенттердің басым бөлігі алғашқы апталарда-ақ өзгерісті байқайды. Ең бастысы - өзіңізбен жұмыс істеуге деген ниетіңіз.",
"q.5":"Ал нәтиже болмаса ше?",
"q.5a":"Диагностикадан кейін өзгерістердің нақты жоспары болмаса - ақшаны толық қайтарамын.",

"s.za.k":"Өтінім","s.za.h":"Диагностикаға дейін бір-ақ қадам қалды",
"s.za.p":"Атыңыз бен нөміріңізді қалдырыңыз - WhatsApp-та жауап беріп, уақыт пен форматты таңдаймыз.",
"k.tel":"Телефон",
"f.name":"Атыңыз","f.phone":"Телефон","f.msg":"Нені өзгерткіңіз келеді?","f.send":"WhatsApp-қа жіберу",
"f.err":"Атыңыз бен телефон нөміріңізді көрсетіңіз.",
"f.ok":"Рақмет! WhatsApp ашылды - «Жіберу» түймесін басу ғана қалды. Жақын арада жауап беремін.",
"f.sub":"Гипно-коуч · офлайн және онлайн · 13 жыл тәжірибе",
"f.copy":"© 2026 Сарра-Айгуль Жума · гипно-коуч. Табыс пен бизнестің өсуіне арналған ойлауды қайта бағдарламалау."
};

/* готовые тексты WhatsApp под каждый блок */
var WA_TXT = {
ru:{
  hero:"Здравствуйте, Сарра! Хочу записаться на диагностику денежных блоков (90 минут, 9 900 ₸).",
  diag:"Здравствуйте, Сарра! Хочу записаться на диагностику. Подскажите ближайшее время и формат (офлайн или онлайн).",
  cena:"Здравствуйте, Сарра! Хочу занять место на диагностику за 9 900 ₸.",
  kont:"Здравствуйте, Сарра! Пишу с сайта. Хочу записаться на диагностику.",
  test:"Здравствуйте, Сарра! Прошёл(а) тест «Денежный детектор»: {lvl}, {score} из 60 баллов. Хочу записаться на диагностику."
},
kk:{
  hero:"Сәлеметсіз бе, Сарра! Ақша блоктарының диагностикасына жазылғым келеді (90 минут, 9 900 ₸).",
  diag:"Сәлеметсіз бе, Сарра! Диагностикаға жазылғым келеді. Жақын уақыт пен форматты (офлайн немесе онлайн) айтыңызшы.",
  cena:"Сәлеметсіз бе, Сарра! 9 900 ₸ диагностикаға орын алғым келеді.",
  kont:"Сәлеметсіз бе, Сарра! Сайттан жазып отырмын. Диагностикаға жазылғым келеді.",
  test:"Сәлеметсіз бе, Сарра! «Ақша детекторы» тестін өттім: {lvl}, 60-тан {score} ұпай. Диагностикаға жазылғым келеді."
}};

var TICK = {
  ru:["Страх успеха","Я не достоин","Деньги достаются тяжело","Большие деньги = большие проблемы","Самосаботаж","Денег всегда не хватает"],
  kk:["Табыстан қорқу","Мен лайық емеспін","Ақша қиын табылады","Үлкен ақша = үлкен мәселе","Өзін-өзі саботаждау","Ақша әрқашан жетпейді"]
};

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function waHref(key, vars){
  var t = WA_TXT[curLang()][key] || WA_TXT[curLang()].hero;
  if (vars) Object.keys(vars).forEach(function(k){ t = t.replace("{" + k + "}", vars[k]); });
  return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
}
function setWaLinks(){
  document.querySelectorAll("[data-wa]").forEach(function(a){
    if (a.dataset.wa === "test") return;
    a.href = waHref(a.dataset.wa);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("sz-lang", kk ? "kk" : "ru"); } catch(e){}
  setWaLinks();
  fillTicker();
  renderQuiz();
  requestAnimationFrame(fitText);
}
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("sz-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  document.querySelectorAll(".h1-a, .h1-b, .price b").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.55) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ---------------- */
function fillTicker(){
  var el = document.getElementById("ticker"); if (!el) return;
  var one = TICK[curLang()].map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty("--tkw", w + "px");
}
var tkTimer;
addEventListener("resize", function(){ clearTimeout(tkTimer); tkTimer = setTimeout(function(){ fillTicker(); fitText(); }, 200); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  var t = document.getElementById(id); if (!t) return;
  e.preventDefault();
  closeMenu();
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH());
  scrollTo({ top: Math.max(0, top), behavior: RED ? "auto" : "smooth" });
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ПЛИТЫ И РАЗЛОМ ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay; для фото-плиты ещё --open (створки).
   Всё остальное делает CSS через calc. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("zayavka");
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw.querySelector(".ph-plate")) {
      pw.style.setProperty("--open", easeOut(clamp((enter - 0.2) / 0.62)).toFixed(3));
    }
  });
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  update();
}
window.plateSync = update;

/* интро: пласт закрыт (--intro 0) и раскалывается за 1.3 с.
   Пропускаем, если пришли по якорю или страница уже прокручена. */
var skipIntro = !!location.hash || scrollY > 80 || RED;
if (skipIntro) {
  root.classList.add("no-intro");
  root.style.setProperty("--intro", "1");
} else {
  root.style.setProperty("--intro", "0");
  var t0 = null, DUR = 1300;
  function introStep(ts){
    if (t0 === null) t0 = ts;
    var p = clamp((ts - t0) / DUR);
    var e = 1 - Math.pow(1 - p, 3);
    root.style.setProperty("--intro", e.toFixed(4));
    if (p < 1) requestAnimationFrame(introStep); else root.classList.add("no-intro");
  }
  requestAnimationFrame(function(){ requestAnimationFrame(introStep); });
}
addEventListener("hashchange", function(){ root.classList.add("no-intro"); root.style.setProperty("--intro", "1"); });

/* ---------------- ПОЯВЛЕНИЕ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- ЛЕНТА ПРОГРАММ: точки ---------------- */
(function(){
  var strip = document.getElementById("progs"), dots = document.getElementById("pdots");
  if (!strip || !dots) return;
  var items = strip.querySelectorAll(".prog");
  dots.innerHTML = Array.prototype.map.call(items, function(){ return "<i></i>"; }).join("");
  var ds = dots.querySelectorAll("i");
  function mark(){
    var x = strip.scrollLeft + 10, idx = 0;
    items.forEach(function(it, i){ if (it.offsetLeft - strip.offsetLeft <= x + it.offsetWidth / 2) idx = i; });
    ds.forEach(function(d, i){ d.classList.toggle("on", i === idx); });
  }
  strip.addEventListener("scroll", mark, {passive:true});
  mark();
})();

/* ---------------- ТЕСТ «ДЕНЕЖНЫЙ ДЕТЕКТОР» ----------------
   15 вопросов, у каждого 4 ответа по 4/3/2/1 балла (порядок ответов
   перемешивается при каждом прохождении). Сумма 15..60 → 4 уровня. */
var Q = {
ru:[
 ["Что вы чувствуете, когда просите большую сумму за свои услуги?",["Уверенность - я этого достоин","Лёгкий дискомфорт, но справляюсь","Сильное напряжение и желание снизить цену","Стыд и чувство, что обманываю клиента"]],
 ["Как вы относитесь к очень богатым людям?",["Восхищаюсь и хочу быть таким же","Нейтрально - каждый выбирает свой путь","С подозрением - наверняка нечестно заработали","С неприязнью - деньги портят людей"]],
 ["Когда появляются лишние деньги, вы:",["Инвестируете в развитие бизнеса","Откладываете на крупные цели","Быстро тратите на ненужные вещи","Чувствуете дискомфорт и стремитесь от них избавиться"]],
 ["Какая фраза ближе всего к вашим убеждениям?",["Деньги - энергия изобилия и возможностей","Деньги - полезный инструмент для целей","Деньги нужны, но не стоит думать о них постоянно","Деньги - источник проблем и зла"]],
 ["Когда вы думаете о доходе в 10 раз больше нынешнего:",["Чётко вижу, как этого достичь","Кажется реальным, но пока не знаю как","Сомневаюсь, что справлюсь с такой ответственностью","Считаю это нереальным для таких, как я"]],
 ["Какие фразы о деньгах чаще звучали в вашей семье?",["Деньги можно заработать, если очень захотеть","Главное - честно работать, деньги придут","Денег всегда не хватает, нужно экономить","Богатые - плохие, мы не такие"]],
 ["Как в вашей семье относились к успешным людям?",["Ставили в пример и восхищались","Уважали за достижения","Критиковали и сплетничали","Считали, что они продали душу"]],
 ["Что говорили родители, когда вы просили дорогую вещь?",["Давай подумаем, как это заработать","Подожди, накопим денег","У нас нет денег на такие глупости","Нам это не нужно, мы не богачи"]],
 ["Каким был финансовый уровень вашей семьи?",["Высокий - могли позволить почти всё","Средний - жили комфортно","Ниже среднего - часто экономили","Низкий - считали каждую копейку"]],
 ["Что чувствовали родители по отношению к деньгам?",["Радость и благодарность за возможности","Спокойное отношение, как к инструменту","Тревогу и постоянные переживания","Стыд и вину за желание заработать"]],
 ["Когда дела идут очень хорошо, вы:",["Радуюсь и планирую дальнейший рост","Наслаждаюсь моментом и продолжаю работать","Начинаю тревожиться: долго ли это продлится?","Подсознательно делаю то, что всё портит"]],
 ["Как вы реагируете на возможность заработать большую сумму?",["Сразу приступаю к действиям","Анализирую и составляю план","Долго сомневаюсь и откладываю","Нахожу причины, почему это невозможно"]],
 ["Когда клиент готов заплатить больше, чем вы просили:",["Принимаю с благодарностью","Немного удивляюсь, но соглашаюсь","Чувствую неловкость и хочу снизить цену","Отказываюсь или делаю скидку из вежливости"]],
 ["Ваше отношение к долгам и кредитам:",["Использую как инструмент для роста бизнеса","Беру только на действительно нужное","Стараюсь избегать, боюсь не справиться","Категорически против: лучше бедным, но свободным"]],
 ["Когда вы видите чужой успех:",["Вдохновляюсь и учусь у успешных людей","Радуюсь за них и мотивируюсь","Сравниваю себя и расстраиваюсь","Ищу подвох: наверняка что-то нечисто"]]
],
kk:[
 ["Қызметіңіз үшін үлкен сома сұрағанда не сезесіз?",["Сенімділік - мен бұған лайықпын","Аздап ыңғайсыздық, бірақ жеңемін","Қатты кернеу және бағаны төмендеткім келеді","Ұят және клиентті алдап жатқандай сезім"]],
 ["Өте бай адамдарға қалай қарайсыз?",["Сүйсінемін және сондай болғым келеді","Бейтарап - әркім өз жолын таңдайды","Күдікпен - шамасы, адал таппаған","Жақтырмаймын - ақша адамды бұзады"]],
 ["Артық ақша пайда болғанда сіз:",["Бизнесті дамытуға саласыз","Ірі мақсаттарға жинайсыз","Қажетсіз нәрселерге тез жұмсайсыз","Ыңғайсыздық сезініп, одан құтылуға тырысасыз"]],
 ["Қай сөз сіздің нанымдарыңызға жақын?",["Ақша - молшылық пен мүмкіндіктер энергиясы","Ақша - мақсатқа жетудің пайдалы құралы","Ақша керек, бірақ ол туралы үнемі ойлаудың қажеті жоқ","Ақша - мәселелер мен зұлымдықтың көзі"]],
 ["Қазіргіден 10 есе көп табыс туралы ойлағанда:",["Оған қалай жететінімді анық көремін","Шынайы көрінеді, бірақ әзірге қалай екенін білмеймін","Мұндай жауапкершілікті көтере аламын ба деп күмәнданамын","Мен сияқтылар үшін бұл мүмкін емес деп санаймын"]],
 ["Отбасыңызда ақша туралы қандай сөздер жиі айтылатын?",["Қатты қаласаң, ақша табуға болады","Бастысы - адал еңбек ету, ақша келеді","Ақша әрқашан жетпейді, үнемдеу керек","Байлар жаман адамдар, біз ондай емеспіз"]],
 ["Отбасыңызда табысты адамдарға қалай қарайтын?",["Үлгі етіп, сүйсінетін","Жетістіктері үшін құрметтейтін","Сынап, өсек айтатын","Жанын сатқан деп санайтын"]],
 ["Қымбат зат сұрағанда ата-анаңыз не дейтін?",["Оны қалай табуға болатынын ойланайық","Күте тұр, ақша жинайық","Мұндай бос нәрсеге ақшамыз жоқ","Бізге бұл керек емес, біз бай емеспіз"]],
 ["Отбасыңыздың қаржылық деңгейі қандай болды?",["Жоғары - бәрін дерлік ала алатынбыз","Орташа - жайлы өмір сүрдік","Орташадан төмен - жиі үнемдедік","Төмен - әр тиынды санадық"]],
 ["Ата-анаңыз ақшаға қандай сезіммен қарайтын?",["Мүмкіндіктер үшін қуаныш пен алғыс","Құрал ретінде байсалды қарайтын","Үрей мен үнемі уайым","Табу ниеті үшін ұят пен кінә"]],
 ["Істер өте жақсы жүріп жатқанда сіз:",["Қуанып, әрі қарай өсуді жоспарлаймын","Сәттен ләззат алып, жұмысты жалғастырамын","Ұзаққа бара ма деп алаңдай бастаймын","Санасыз түрде бәрін бүлдіретін әрекет жасаймын"]],
 ["Үлкен сома табу мүмкіндігіне қалай әрекет етесіз?",["Бірден іске кірісемін","Талдап, жоспар құрамын","Ұзақ күмәнданып, кейінге қалдырамын","Неге мүмкін емес екеніне себеп табамын"]],
 ["Клиент сұрағаныңыздан көп төлеуге дайын болғанда:",["Алғыспен қабылдаймын","Аздап таңғаламын, бірақ келісемін","Ыңғайсызданып, бағаны төмендеткім келеді","Бас тартамын немесе сыпайылықтан жеңілдік жасаймын"]],
 ["Қарыз бен несиеге көзқарасыңыз:",["Бизнесті өсіру құралы ретінде пайдаланамын","Тек шынымен қажет нәрсеге аламын","Қашқақтаймын, өтей алмай қаламын деп қорқамын","Мүлдем қарсымын: кедей, бірақ еркін болған жақсы"]],
 ["Басқаның табысын көргенде:",["Шабыттанып, табысты адамдардан үйренемін","Олар үшін қуанып, мотивация аламын","Өзіммен салыстырып, ренжимін","Қулық іздеймін: бірдеңесі таза емес шығар"]]
]};

var RES = {
ru:[
 {min:52, lvl:"Уровень 1 из 4", h:"Поток открыт", p:"Денежных блоков почти нет: установки здоровые, вы готовы к большим суммам. Следующий шаг - стратегия и масштаб, а не работа с блоками.",
  bh:"Ваши сильные стороны", b:["Спокойное отношение к деньгам и богатству","Нет вины за желание зарабатывать","Принимаете большие суммы без дискомфорта"], pot:"Рост в 2-3 раза за счёт стратегии и масштабирования", cta:"Обсудить масштабирование"},
 {min:40, lvl:"Уровень 2 из 4", h:"Несколько блоков тормозят рост", p:"Вы на верном пути, но 2-3 установки держат доход: скорее всего, он в 3-5 раз ниже возможного. Такие блоки снимаются за 1-2 сессии.",
  bh:"Что мешает", b:["Дискомфорт при работе с большими суммами","Остатки семейных установок о деньгах","Самосаботаж в моменты успеха"], pot:"Рост дохода в 3-5 раз за 6 месяцев", cta:"Записаться на диагностику"},
 {min:28, lvl:"Уровень 3 из 4", h:"Серьёзные блоки крадут доход", p:"Несколько глубоких установок ограничивают доход: подсознание саботирует финансовый рост, и это заметно в решениях каждый день.",
  bh:"Что мешает", b:["Семейные программы дефицита","Страх больших денег и ответственности","Вина за желание разбогатеть","Саботаж выгодных проектов"], pot:"Рост дохода в 5-8 раз за год при работе с блоками", cta:"Записаться на диагностику"},
 {min:15, lvl:"Уровень 4 из 4", h:"Глубокие программы бедности", p:"Подсознание настроено отталкивать деньги: даже когда доход растёт, находится способ его слить. Здесь нужна глубокая работа, а не советы.",
  bh:"Что мешает", b:["Родовые сценарии бедности","Детский опыт, связанный с деньгами","Убеждение «деньги = зло»","Саботаж при появлении денег"], pot:"Рост в 10 и более раз при глубокой работе с подсознанием", cta:"Записаться на диагностику"}
],
kk:[
 {min:52, lvl:"4 деңгейдің 1-і", h:"Ағын ашық", p:"Ақша блоктары жоқтың қасы: нанымдарыңыз сау, үлкен сомаларға дайынсыз. Келесі қадам - блоктармен жұмыс емес, стратегия мен ауқым.",
  bh:"Күшті жақтарыңыз", b:["Ақша мен байлыққа байсалды көзқарас","Табыс табу ниеті үшін кінә жоқ","Үлкен сомаларды ыңғайсыздықсыз қабылдайсыз"], pot:"Стратегия мен ауқым есебінен 2-3 есе өсу", cta:"Ауқымды кеңейтуді талқылау"},
 {min:40, lvl:"4 деңгейдің 2-сі", h:"Бірнеше блок өсуді тежейді", p:"Дұрыс жолдасыз, бірақ 2-3 наным табысты ұстап тұр: шамасы, ол мүмкіндігіңізден 3-5 есе төмен. Мұндай блоктар 1-2 сессияда алынады.",
  bh:"Не кедергі", b:["Үлкен сомалармен жұмыста ыңғайсыздық","Ақша туралы отбасылық нанымдардың қалдығы","Табыс сәттеріндегі өзін-өзі саботаждау"], pot:"6 айда табыстың 3-5 есе өсуі", cta:"Диагностикаға жазылу"},
 {min:28, lvl:"4 деңгейдің 3-і", h:"Елеулі блоктар табысты ұрлайды", p:"Бірнеше терең наным табысты шектейді: сана қаржылық өсуді саботаждайды, бұл күнделікті шешімдерден байқалады.",
  bh:"Не кедергі", b:["Отбасылық тапшылық бағдарламалары","Үлкен ақша мен жауапкершіліктен қорқу","Байығысы келгені үшін кінә","Тиімді жобаларды саботаждау"], pot:"Блоктармен жұмыс істегенде бір жылда 5-8 есе өсу", cta:"Диагностикаға жазылу"},
 {min:15, lvl:"4 деңгейдің 4-і", h:"Кедейліктің терең бағдарламалары", p:"Сана ақшаны итеруге бапталған: табыс өссе де, оны жоғалтудың жолы табылады. Мұнда кеңес емес, терең жұмыс керек.",
  bh:"Не кедергі", b:["Кедейліктің рулық сценарийлері","Ақшаға қатысты балалық тәжірибе","«Ақша = зұлымдық» нанымы","Ақша пайда болғанда саботаж"], pot:"Санамен терең жұмыс істегенде 10 және одан да көп есе өсу", cta:"Диагностикаға жазылу"}
]};

var UI = {
ru:{start:"Начать тест", startP:"Ответьте честно: правильных ответов нет, есть ваши. Результат появится сразу, без почты и регистрации.", tags:["15 вопросов","3 минуты","4 уровня"], q:"Вопрос", of:"из", back:"Назад", score:"Ваш балл", of60:"из 60", again:"Пройти заново", pot:"Потенциал роста", lv:["Глубокие программы","Серьёзные блоки","Несколько блоков","Поток открыт"]},
kk:{start:"Тестті бастау", startP:"Шын жауап беріңіз: дұрыс жауап жоқ, сіздің жауабыңыз бар. Нәтиже бірден шығады, пошта мен тіркеусіз.", tags:["15 сұрақ","3 минут","4 деңгей"], q:"Сұрақ", of:"/", back:"Артқа", score:"Сіздің ұпайыңыз", of60:"60-тан", again:"Қайта өту", pot:"Өсу әлеуеті", lv:["Терең бағдарламалар","Елеулі блоктар","Бірнеше блок","Ағын ашық"]}
};

var quiz = { step:-1, order:[], ans:[], score:0 };
var qview = document.getElementById("qview"), qbar = document.getElementById("qbar");
var svgArr = '<svg aria-hidden="true"><use href="#ic-arr"/></svg>';
var svgWa  = '<svg aria-hidden="true"><use href="#ic-wa"/></svg>';
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
function shuffle(n){
  var a = []; for (var i = 0; i < n; i++) a.push(i);
  for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; }
  return a;
}
function show(html, cb){
  if (!qview) return;
  var cur = qview.querySelector(".q-screen");
  var go = function(){
    qview.innerHTML = '<div class="q-screen">' + html + '</div>';
    var s = qview.firstChild;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ s.classList.add("in"); }); });
    if (cb) cb(s);
  };
  if (cur && !RED) { cur.classList.add("out"); setTimeout(go, 200); } else go();
}
function renderQuiz(){
  if (!qview) return;
  var L = curLang(), ui = UI[L];
  if (quiz.step < 0) {
    if (qbar) qbar.style.width = "0";
    show('<div class="q-start"><ul>' + ui.tags.map(function(t){ return "<li>" + t + "</li>"; }).join("") + '</ul><p>' + ui.startP + '</p>' +
         '<button class="btn btn-p" type="button" data-q="start"><span>' + ui.start + '</span>' + svgArr + '</button></div>');
  } else if (quiz.step < 15) {
    var q = Q[L][quiz.step], ord = quiz.order[quiz.step];
    if (qbar) qbar.style.width = (quiz.step / 15 * 100) + "%";
    show('<div class="q-meta"><span>' + ui.q + " " + (quiz.step + 1) + " " + ui.of + ' 15</span>' +
         (quiz.step > 0 ? '<button class="q-back" type="button" data-q="back">' + svgArr + ui.back + '</button>' : "") + '</div>' +
         '<h3 class="q-q">' + esc(q[0]) + '</h3><div class="q-ans">' +
         ord.map(function(i){ return '<button type="button" data-q="ans" data-pts="' + (4 - i) + '">' + esc(q[1][i]) + '</button>'; }).join("") + '</div>');
  } else {
    if (qbar) qbar.style.width = "100%";
    var s = quiz.score, r = RES[L].filter(function(x){ return s >= x.min; })[0], lvlIdx = RES[L].indexOf(r);
    var pos = (s - 15) / 45 * 100;
    show('<div class="q-res"><span class="lvl">' + r.lvl + '</span><h3>' + r.h + '</h3>' +
         '<div class="score"><b>' + s + '</b><span>' + ui.of60 + '</span></div>' +
         '<div class="meter-l"><span>' + ui.lv[0] + '</span><span>' + ui.lv[3] + '</span></div>' +
         '<div class="meter">' + [0,1,2,3].map(function(i){ return '<i class="' + (i < 4 - lvlIdx ? "lit" : "") + '"></i>'; }).join("") + '<em style="left:0"></em></div>' +
         '<p>' + r.p + '</p><div class="blk"><h4>' + r.bh + '</h4><ul>' + r.b.map(function(b){ return "<li>" + b + "</li>"; }).join("") + '</ul></div>' +
         '<span class="pot"><b>' + ui.pot + ':</b> ' + r.pot + '</span>' +
         '<div class="cta"><a class="btn btn-p" data-wa="test" target="_blank" rel="noopener" href="' + waHref("test", {lvl:r.h, score:String(s)}) + '">' + svgWa + '<span>' + r.cta + '</span></a></div>' +
         '<button class="q-again" type="button" data-q="again">' + ui.again + '</button></div>', function(scr){
           var em = scr.querySelector(".meter em");
           setTimeout(function(){ if (em) em.style.left = "calc(" + pos.toFixed(1) + "% - 1px)"; }, 120);
         });
  }
}
if (qview) qview.addEventListener("click", function(e){
  var b = e.target.closest("[data-q]"); if (!b) return;
  var act = b.dataset.q;
  if (act === "start") {
    quiz.step = 0; quiz.ans = []; quiz.score = 0;
    quiz.order = []; for (var i = 0; i < 15; i++) quiz.order.push(shuffle(4));
    renderQuiz();
  } else if (act === "ans") {
    if (qview.querySelector(".pick")) return;
    b.classList.add("pick");
    quiz.ans[quiz.step] = +b.dataset.pts;
    setTimeout(function(){
      quiz.step++;
      if (quiz.step >= 15) quiz.score = quiz.ans.reduce(function(a, x){ return a + x; }, 0);
      renderQuiz();
    }, RED ? 0 : 260);
  } else if (act === "back") {
    quiz.step = Math.max(0, quiz.step - 1); renderQuiz();
  } else if (act === "again") {
    quiz.step = -1; renderQuiz();
    var top = document.getElementById("test");
    if (top) scrollTo({ top: top.getBoundingClientRect().top + scrollY - HH(), behavior: RED ? "auto" : "smooth" });
  }
});

/* ---------------- ФОРМА → WhatsApp ---------------- */
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  var err = document.getElementById("ferr"), ok = document.getElementById("fok");
  if (form.site.value) return;                                  /* honeypot */
  var bad = !name || phone.replace(/\D/g, "").length < 10;
  form.name.classList.toggle("bad", !name);
  form.phone.classList.toggle("bad", phone.replace(/\D/g, "").length < 10);
  if (err) err.hidden = !bad;
  if (bad) return;
  var kk = curLang() === "kk";
  var text = (kk ? "Сәлеметсіз бе, Сарра! Сайттан өтінім.\nАтым: " : "Здравствуйте, Сарра! Заявка с сайта.\nИмя: ") + name +
             (kk ? "\nТелефон: " : "\nТелефон: ") + phone +
             (msg ? (kk ? "\nСұрағым: " : "\nЗапрос: ") + msg : "");
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  if (ok) ok.hidden = false;
  form.reset();
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
