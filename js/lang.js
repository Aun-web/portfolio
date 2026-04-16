/* ============================================================
   LANGUAGE — TH / EN switcher
   ============================================================ */

let _lang = localStorage.getItem('wp-lang') || CONFIG.DEFAULT_LANG || 'th';

function getLang() { return _lang; }

/* Apply language to all [data-th] / [data-en] elements */
function applyLang(lang) {
  _lang = lang;
  localStorage.setItem('wp-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'th' ? 'th' : 'en');

  document.querySelectorAll('[data-th]').forEach(el => {
    const val = lang === 'th' ? el.getAttribute('data-th') : el.getAttribute('data-en');
    if (val !== null) el.textContent = val;
  });

  // Update toggle active state
  const thEl = document.querySelector('.lang-th');
  const enEl = document.querySelector('.lang-en');
  if (thEl) thEl.classList.toggle('active', lang === 'th');
  if (enEl) enEl.classList.toggle('active', lang === 'en');

  // Dispatch event so typewriter / other modules can react
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initLang() {
  applyLang(_lang);   // apply on load

  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => applyLang(_lang === 'th' ? 'en' : 'th'));
}
