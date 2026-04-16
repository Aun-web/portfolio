/* ============================================================
   THEME — Dark / Light toggle
   Note: initial theme is applied in <head> inline script
         to prevent FOUC.
   ============================================================ */

function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cur  = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wp-theme', next);
  });
}
