/* ============================================================
   PA 2569 PAGE — tabs, deep links (#kpi-N / #domain-N), print
   Uses shared modules: theme.js, lang.js, animations.js
   ============================================================ */

/* ตัวชี้วัด → ด้าน (๑–๘ ด้าน ๑, ๙–๑๒ ด้าน ๒, ๑๓–๑๕ ด้าน ๓) */
function domainOfKpi(n) {
  if (n <= 8)  return 1;
  if (n <= 12) return 2;
  return 3;
}

/* Which domain (if any) a hash like "#kpi-12" / "#domain-2" belongs to */
function domainFromHash(hash) {
  let m = /^#kpi-(\d{1,2})$/.exec(hash);
  if (m) {
    const n = parseInt(m[1], 10);
    return n >= 1 && n <= 15 ? domainOfKpi(n) : null;
  }
  m = /^#domain-([123])$/.exec(hash);
  return m ? parseInt(m[1], 10) : null;
}

/* ── Domain tabs ─────────────────────────────────────── */
let _tabs = [];
let _panels = [];

function activateDomain(d, { focus = false } = {}) {
  _tabs.forEach(tab => {
    const on = tab.dataset.domain === String(d);
    tab.setAttribute('aria-selected', on);
    tab.tabIndex = on ? 0 : -1;
    if (on && focus) tab.focus();
  });
  _panels.forEach(p => { p.hidden = p.id !== `domain-${d}`; });
}

function initTabs() {
  const list = document.querySelector('.pa-tabs');
  if (!list) return;
  _tabs   = [...list.querySelectorAll('[role="tab"]')];
  _panels = [...document.querySelectorAll('.pa-domain[role="tabpanel"]')];

  // Tabs only exist with JS — without it every domain stays visible
  list.hidden = false;
  document.body.classList.add('pa-tabs-on');

  _tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateDomain(tab.dataset.domain));
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % _tabs.length;
      if (e.key === 'ArrowLeft')  next = (i - 1 + _tabs.length) % _tabs.length;
      if (e.key === 'Home')       next = 0;
      if (e.key === 'End')        next = _tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      activateDomain(_tabs[next].dataset.domain, { focus: true });
    });
  });

  activateDomain(domainFromHash(location.hash) || 1);
}

/* Scroll to an element below the fixed navbar (+ sticky domain tabs) */
function scrollToEl(el, behavior = 'smooth') {
  const nav  = document.getElementById('navbar');
  const tabs = document.querySelector('.pa-tabs');
  let offset = (nav ? nav.offsetHeight : 68) + 12;
  if (tabs && !tabs.hidden && el !== tabs) offset += tabs.offsetHeight;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
}

/* ── Deep links (QR code → #kpi-N) ───────────────────── */
function initDeepLinks() {
  // Capture phase + stopPropagation: we open the tab and scroll ourselves
  // (animations.js smooth-scroll doesn't know about the sticky tab bar).
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#kpi-"], a[href^="#domain-"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (!domainFromHash(hash)) return;
    e.preventDefault();
    e.stopPropagation();
    history.replaceState(null, '', hash);
    openHash(hash, 'smooth');
  }, true);

  window.addEventListener('hashchange', () => openHash(location.hash, 'smooth'));

  // Initial load with a hash: wait for layout (fonts) then jump
  if (domainFromHash(location.hash)) {
    const go = () => openHash(location.hash, 'auto');
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    else window.addEventListener('load', go);
  }
}

function openHash(hash, behavior) {
  const d = domainFromHash(hash);
  if (!d) return;
  activateDomain(d);
  const target = document.querySelector(hash);
  if (!target) return;
  scrollToEl(target, behavior);
  if (hash.startsWith('#kpi-')) flashCard(target);
}

function flashCard(card) {
  card.classList.remove('is-flash');
  void card.offsetWidth; // restart animation
  card.classList.add('is-flash');
}

/* ── Evidence placeholders (href="#" until Drive links are added) ── */
function initEvidencePlaceholders() {
  document.querySelectorAll('a[data-evidence]').forEach(a => {
    if (a.getAttribute('href') === '#') {
      a.classList.add('is-placeholder');
      a.setAttribute('aria-disabled', 'true');
    } else {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
  // Capture + stopPropagation: animations.js smooth-scroll would otherwise
  // run querySelector('#') on these links (invalid selector)
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-evidence][href="#"]');
    if (!a) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);
}

/* ── Print ───────────────────────────────────────────── */
function initPrint() {
  const btn = document.getElementById('printBtn');
  if (btn) btn.addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initTabs();
  initDeepLinks();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initBackToTop();
  initEvidencePlaceholders();
  initPrint();
  observeReveal();
});
