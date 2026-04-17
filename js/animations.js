/* ============================================================
   ANIMATIONS — IntersectionObserver + scroll effects
   ============================================================ */

/* ── Scroll Reveal ────────────────────────────────────── */
let _revealObserver = null;

function observeReveal() {
  if (!_revealObserver) {
    _revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          _revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }

  document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-fade'
  ).forEach(el => {
    if (!el.classList.contains('visible')) _revealObserver.observe(el);
  });
}

/* ── Skill Bars ──────────────────────────────────────── */
function observeSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-fill').forEach(bar => obs.observe(bar));
}

/* ── Parallax (hero background dots) ────────────────── */
function initParallax() {
  const dots = document.querySelector('.hero-dots');
  const wm   = document.querySelector('.hero-watermark');
  if (!dots) return;

  const hero = document.getElementById('hero');
  const heroH = hero ? hero.offsetHeight : window.innerHeight;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > heroH) return;
    dots.style.transform = `translateY(${y * 0.18}px)`;
    if (wm) wm.style.transform = `translateY(calc(-50% + ${y * 0.12}px))`;
  }, { passive: true });
}

/* ── Typewriter ──────────────────────────────────────── */
let _twTimer = null;

function initTypewriter() {
  startTypewriter(getLang());

  document.addEventListener('langchange', e => {
    clearTimeout(_twTimer);
    const el = document.querySelector('.typewriter-text');
    if (el) el.textContent = '';
    startTypewriter(e.detail.lang);
  });
}

function startTypewriter(lang) {
  const el = document.querySelector('.typewriter-text');
  if (!el) return;

  const attr = lang === 'th' ? 'data-th-texts' : 'data-en-texts';
  let texts;
  try { texts = JSON.parse(el.getAttribute(attr)); } catch { texts = ['English Teacher']; }

  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const cur = texts[ti];
    if (deleting) {
      el.textContent = cur.slice(0, --ci);
    } else {
      el.textContent = cur.slice(0, ++ci);
    }

    let delay = deleting ? 55 : 95;
    if (!deleting && ci === cur.length) { delay = 2000; deleting = true; }
    else if (deleting && ci === 0)      { deleting = false; ti = (ti + 1) % texts.length; delay = 350; }

    _twTimer = setTimeout(tick, delay);
  }
  _twTimer = setTimeout(tick, 600);
}

/* ── Navbar scroll state ─────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlight
  const sections = [...document.querySelectorAll('section[id]')];
  const links    = [...document.querySelectorAll('.nav-links a[href^="#"]')];

  const linkObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => linkObs.observe(s));
}

/* ── Hamburger ───────────────────────────────────────── */
function initHamburger() {
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!ham || !links) return;

  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    links.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      links.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    })
  );
}

/* ── Smooth scroll ───────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Activities mosaic parallax ─────────────────────── */
function initActivitiesParallax() {
  const section = document.getElementById('activities');
  const imgs    = section?.querySelectorAll('.act-mosaic-img');
  if (!section || !imgs.length) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
    // progress: 1 (section above viewport) → 0 (top aligned) → -1 (below)
    const progress = rect.top / window.innerHeight;
    imgs.forEach((img, i) => {
      const shift = progress * (16 + i * 5);   // each photo shifts slightly different
      img.style.transform = `scale(1.12) translateY(${shift}px)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── Back to Top ─────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () =>
    btn.classList.toggle('visible', window.scrollY > 500),
    { passive: true }
  );
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
