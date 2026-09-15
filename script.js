/* ============================================================
   САРРА ЖУМА - скрипт страницы.
   Плиты и разлом · перевод RU/KZ · меню · лента · появление ·
   тест «Денежный детектор» · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77056304013";               /* боевой номер клиента */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ ЯЗЫК ----------------
   Разметка русская. Казахский словарь и тексты лежат в assets/lang/kk.js
   и грузятся только по явному выбору KZ (loadKK) - проверка Google Ads видит русский сайт.
   Ключа нет → строка остаётся русской. */
var KZ = {};
/* версия файла языка - та же, что у script.js (?v=), бампается вместе с ассетами */
var KK_SRC = (function(){
  var s = document.currentScript, m = s && s.src ? s.src.match(/[?&]v=([^&#]+)/) : null;
  return "assets/lang/kk.js" + (m ? "?v=" + m[1] : "");
})();
var kkLoading = false, kkWait = [];
function mergeKK(){
  var k = window.SITE_KK;
  KZ = k.dict; WA_TXT.kk = k.wa; TICK.kk = k.tick; Q.kk = k.q; RES.kk = k.res; UI.kk = k.ui; FORM_TXT.kk = k.form;
}
function loadKK(cb){
  if (window.SITE_KK) { if (!WA_TXT.kk) mergeKK(); cb(); return; }
  kkWait.push(cb);
  if (kkLoading) return;
  kkLoading = true;
  var s = document.createElement("script");
  s.src = KK_SRC; s.async = true;
  s.onload = function(){
    kkLoading = false;
    var w = kkWait; kkWait = [];
    if (!window.SITE_KK) return;
    mergeKK();
    w.forEach(function(f){ f(); });
  };
  s.onerror = function(){ kkLoading = false; kkWait = []; };
  document.head.appendChild(s);
}
function setLang(lang){
  if (lang === "kk") loadKK(function(){ applyLang("kk"); });
  else applyLang("ru");
}

/* готовые тексты WhatsApp под каждый блок */
var WA_TXT = {
ru:{
  hero:"Здравствуйте, Сарра! Хочу записаться на диагностику денежных блоков (90 минут, 9 900 ₸).",
  diag:"Здравствуйте, Сарра! Хочу записаться на диагностику. Подскажите ближайшее время и формат (офлайн или онлайн).",
  cena:"Здравствуйте, Сарра! Хочу занять место на диагностику за 9 900 ₸.",
  kont:"Здравствуйте, Сарра! Пишу с сайта. Хочу записаться на диагностику.",
  test:"Здравствуйте, Сарра! Прошёл(а) тест «Денежный детектор»: {lvl}, {score} из 60 баллов. Хочу записаться на диагностику.",
  samoz:"Здравствуйте, Сарра! Узнаю у себя синдром самозванца. Хочу разобрать это на диагностике."
}
};

/* текст заявки из формы */
var FORM_TXT = {
  ru:{head:"Здравствуйте, Сарра! Заявка с сайта.\nИмя: ", tel:"\nТелефон: ", msg:"\nЗапрос: "}
};

var TICK = {
  ru:["Страх успеха","Я не достоин","Деньги достаются тяжело","Большие деньги = большие проблемы","Самосаботаж","Денег всегда не хватает"]
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

function applyLang(lang, noSave){
  var kk = lang === "kk" && !!WA_TXT.kk;          /* словарь ещё не загружен - остаёмся на русском */
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
  if (!noSave) { try { localStorage.setItem("sz-lang", kk ? "kk" : "ru"); } catch(e){} }
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
  applyLang("ru", lang === "kk");                   /* сначала всегда русский: ссылки, лента, тест; выбор kk не затираем */
  if (lang === "kk") setLang("kk");
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
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
]
};

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
]
};

var UI = {
ru:{start:"Начать тест", startP:"Ответьте честно: правильных ответов нет, есть ваши. Результат появится сразу, без почты и регистрации.", tags:["15 вопросов","3 минуты","4 уровня"], q:"Вопрос", of:"из", back:"Назад", score:"Ваш балл", of60:"из 60", again:"Пройти заново", pot:"Потенциал роста", lv:["Глубокие программы","Серьёзные блоки","Несколько блоков","Поток открыт"]}
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
  if (form.website.value) return;                               /* honeypot */
  var bad = !name || phone.replace(/\D/g, "").length < 10;
  form.name.classList.toggle("bad", !name);
  form.phone.classList.toggle("bad", phone.replace(/\D/g, "").length < 10);
  if (err) err.hidden = !bad;
  if (bad) return;
  var ft = FORM_TXT[curLang()] || FORM_TXT.ru;
  var text = ft.head + name + ft.tel + phone + (msg ? ft.msg + msg : "");
  if (window.awReport && window.AW_CONV) awReport(AW_CONV.form);   /* цель: отправка формы */
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  if (ok) ok.hidden = false;
  form.reset();
});

/* ---------------- ВИДЕО-ОТЗЫВЫ ---------------- */
(function(){
  var strip = document.getElementById("otz");
  var mod = document.getElementById("vmod"), mv = document.getElementById("vmodv"), mx = document.getElementById("vmodx");
  var mc = document.getElementById("vmodc");
  if (!strip) return;

  /* немые петли-превью: src подставляется, когда карточка в кадре */
  var loops = strip.querySelectorAll(".otz-loop");
  function stop(v){
    v.classList.remove("is-live");
    try { v.pause(); } catch(e){}
    if (v.getAttribute("src")) { v.removeAttribute("src"); v.load(); }
  }
  function start(v){
    if (RED) return;                                   /* уважаем prefers-reduced-motion */
    if (!v.getAttribute("src")) v.setAttribute("src", v.dataset.src);
    var pr = v.play();
    if (pr && pr.catch) pr.catch(function(){});
  }
  if (HAS_IO && !RED) {
    var vio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) start(e.target); else stop(e.target); });
    }, {threshold:.55});
    loops.forEach(function(v){
      v.addEventListener("playing", function(){ v.classList.add("is-live"); });
      vio.observe(v);
    });
  }

  /* стрелки и полоса прогресса */
  (function(){
    var prev = document.getElementById("otzprev"), next = document.getElementById("otznext"),
        bar = document.getElementById("otzbar");
    var card = strip.querySelector(".otz-i");
    function step(){
      if (!card) return strip.clientWidth * .8;
      var g = parseFloat(getComputedStyle(strip).columnGap || getComputedStyle(strip).gap) || 14;
      var w = card.getBoundingClientRect().width + g;
      return Math.max(w, Math.floor(strip.clientWidth / w) * w);   /* листаем экранами, не по одной */
    }
    function sync(){
      var slot = strip.querySelector(".otz-slot");           /* стрелки - по центру кадра, не по центру карточки с подписью */
      if (slot && (prev || next)) {
        var y = slot.offsetTop + slot.offsetHeight / 2 + "px";
        if (prev) prev.style.top = y;
        if (next) next.style.top = y;
      }
      var max = strip.scrollWidth - strip.clientWidth;
      if (prev) prev.disabled = strip.scrollLeft <= 2;
      if (next) next.disabled = strip.scrollLeft >= max - 2;
      if (bar) {
        var vis = strip.clientWidth / strip.scrollWidth;
        bar.style.width = (vis * 100) + "%";
        bar.style.transform = "translateX(" + (max > 0 ? (strip.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0) + "%)";
      }
    }
    function go(dir){
      strip.scrollLeft += dir * step();
      sync(); setTimeout(sync, 80); setTimeout(sync, 450);   /* событие scroll ждать нельзя: smooth-скролл ещё летит */
    }
    if (prev) prev.addEventListener("click", function(){ go(-1); });
    if (next) next.addEventListener("click", function(){ go(1); });
    strip.addEventListener("scroll", sync, {passive:true});
    addEventListener("resize", sync);
    sync();
  })();

  /* полный ролик со звуком - по клику, в модалке */
  if (!mod || !mv) return;
  var opener = null;
  function open(src, btn){
    opener = btn || null;
    if (btn && btn.dataset.poster) mv.setAttribute("poster", btn.dataset.poster); else mv.removeAttribute("poster");
    mv.setAttribute("src", src);
    if (mc) {
      var cap = btn && btn.parentNode ? btn.parentNode.querySelector("figcaption") : null;
      mc.innerHTML = cap ? cap.innerHTML : "";
    }
    mod.classList.add("is-open");
    document.body.classList.add("vmod-open");
    loops.forEach(stop);
    var pr = mv.play();
    if (pr && pr.catch) pr.catch(function(){});
    if (mx) mx.focus();
  }
  function close(){
    mod.classList.remove("is-open");
    document.body.classList.remove("vmod-open");
    try { mv.pause(); } catch(e){}
    mv.removeAttribute("src"); mv.load();
    if (opener) { opener.focus(); opener = null; }
  }
  strip.addEventListener("click", function(e){
    var b = e.target.closest(".otz-slot");
    if (b && b.dataset.full) open(b.dataset.full, b);
  });
  if (mx) mx.addEventListener("click", close);
  mod.addEventListener("click", function(e){ if (e.target === mod) close(); });
  addEventListener("keydown", function(e){ if (e.key === "Escape" && mod.classList.contains("is-open")) close(); });
})();

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();


/* ---------------- КОНВЕРСИИ GOOGLE ADS ---------------- */
/* цели объявлены в <head>: awReport / AW_CONV / gtag_report_conversion */
document.addEventListener("click", function(e){
  if (!window.awReport || !window.AW_CONV) return;
  var a = e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";

  /* клик по номеру телефона: отправляем цель и уходим по ссылке через callback */
  if (href.indexOf("tel:") === 0){
    if (a.dataset.awSent) return;                 /* уже отправляли - не зацикливаемся */
    a.dataset.awSent = "1";
    e.preventDefault();
    gtag_report_conversion(href);
    setTimeout(function(){ delete a.dataset.awSent; }, 2000);
    return;
  }

  /* контакт: WhatsApp и Instagram открываются в новой вкладке, редирект не нужен */
  if (href.indexOf("wa.me") > -1 || href.indexOf("instagram.com") > -1){
    awReport(AW_CONV.kont);
  }
}, true);
