/* ============================================================
   RENDERER — build DOM from data objects
   ============================================================ */

/* ── Helpers ─────────────────────────────────────────── */
const t = (obj, key) => {
  const lang = getLang();
  return (lang === 'th' ? obj[`${key}_th`] : obj[`${key}_en`]) || obj[`${key}_th`] || '';
};

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

/* ── EXPERIENCE ──────────────────────────────────────── */
function renderExperience(data) {
  const el = document.getElementById('experienceTimeline');
  if (!el || !data || !data.length) return;

  el.innerHTML = data.map((item, i) => {
    const isNow = item.current === 'true';
    const period = t(item, 'period') || `${item.start || ''} – ${item.end || ''}`;
    return `
    <div class="timeline-item reveal-up" style="--delay:${i * 0.08}s">
      <div class="tl-dot ${isNow ? 'tl-dot--now' : ''}"></div>
      <div class="tl-body">
        <p class="tl-period">${escAttr(period)}${isNow ? ` <span class="badge-now" data-th="ปัจจุบัน" data-en="Current">${getLang() === 'th' ? 'ปัจจุบัน' : 'Current'}</span>` : ''}</p>
        <h3 class="tl-title">${escAttr(t(item, 'title'))}</h3>
        <p class="tl-org">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          ${escAttr(t(item, 'org'))}
        </p>
        ${t(item, 'desc') ? `<p class="tl-desc">${escAttr(t(item, 'desc'))}</p>` : ''}
      </div>
    </div>`;
  }).join('');

  observeReveal();
}

/* ── SKILLS ──────────────────────────────────────────── */
function renderSkills(data) {
  const el = document.getElementById('skillsWrapper');
  if (!el || !data || !data.length) return;

  // Group by category
  const cats = {};
  data.forEach(s => {
    const cat = t(s, 'category') || 'General';
    (cats[cat] = cats[cat] || []).push(s);
  });

  let ci = 0;
  el.innerHTML = Object.entries(cats).map(([cat, skills]) => `
    <div class="skill-category reveal-up" style="--delay:${(ci++) * 0.08}s">
      <h3 class="category-title">${escAttr(cat)}</h3>
      ${skills.map(s => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name"
              data-th="${escAttr(s.name_th)}"
              data-en="${escAttr(s.name_en)}">${escAttr(t(s, 'name'))}</span>
            <span class="skill-pct">${s.level}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill" data-level="${s.level}" style="width:0"></div>
          </div>
        </div>`).join('')}
    </div>`).join('');

  observeReveal();
  observeSkillBars();
}

/* ── PROJECTS ────────────────────────────────────────── */
function renderProjects(data) {
  const grid   = document.getElementById('projectsGrid');
  const filter = document.getElementById('projectFilter');
  if (!grid || !data || !data.length) return;

  // Collect unique tags
  const allTags = new Set();
  data.forEach(p => { if (p.tags) p.tags.split(',').forEach(t => allTags.add(t.trim())); });

  // Add tag filter buttons
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = tag;
    btn.textContent = tag;
    filter.appendChild(btn);
  });

  // Bind filter
  filter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    grid.querySelectorAll('.project-card[data-tags]').forEach(card => {
      card.style.display = (f === 'all' || card.dataset.tags.includes(f)) ? '' : 'none';
    });
  });

  grid.innerHTML = data.map((p, i) => {
    const isFeatured = p.featured === 'TRUE';
    const imgHTML = p.image_url
      ? `<img src="${escAttr(driveUrl(p.image_url))}" alt="${escAttr(t(p,'title'))}" loading="lazy">`
      : `<div class="card-img-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6M8 11h8"/></svg></div>`;

    return `
    <div class="project-card reveal-up" data-tags="${escAttr(p.tags || '')}" style="--delay:${(i % 3) * 0.08}s">
      <div class="card-img-wrap">
        ${imgHTML}
        ${isFeatured ? `<span class="badge-featured" data-th="แนะนำ" data-en="Featured">${getLang() === 'th' ? 'แนะนำ' : 'Featured'}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-tags">${(p.tags || '').split(',').filter(Boolean).map(tag => `<span class="tag">${escAttr(tag.trim())}</span>`).join('')}</div>
        <h3 class="card-title"
          data-th="${escAttr(p.title_th)}"
          data-en="${escAttr(p.title_en)}">${escAttr(t(p,'title'))}</h3>
        <p class="card-desc"
          data-th="${escAttr(p.desc_th)}"
          data-en="${escAttr(p.desc_en)}">${escAttr(t(p,'desc'))}</p>
        ${p.link ? `<a href="${escAttr(p.link)}" target="_blank" rel="noopener noreferrer" class="card-link">
          <span data-th="ดูเพิ่มเติม" data-en="View More">${getLang() === 'th' ? 'ดูเพิ่มเติม' : 'View More'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>` : ''}
      </div>
    </div>`;
  }).join('');

  observeReveal();
}

/* ── RESPONSIBILITY ──────────────────────────────────── */
function renderResponsibility(data) {
  const el = document.getElementById('responsibilityGrid');
  if (!el || !data || !data.length) return;

  el.innerHTML = data.map((r, i) => `
    <div class="resp-card reveal-up" style="--delay:${(i % 4) * 0.08}s">
      <div class="resp-icon">
        <svg data-icon="${escAttr(r.icon || 'check-circle')}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
      </div>
      <h3 class="resp-title"
        data-th="${escAttr(r.title_th)}"
        data-en="${escAttr(r.title_en)}">${escAttr(t(r,'title'))}</h3>
      <p class="resp-desc"
        data-th="${escAttr(r.desc_th)}"
        data-en="${escAttr(r.desc_en)}">${escAttr(t(r,'desc'))}</p>
    </div>`).join('');

  // Swap SVG placeholders for real Lucide paths
  injectLucide(el);
  observeReveal();
}

/* ── CONTACT ─────────────────────────────────────────── */
function renderContact(data) {
  const el = document.getElementById('contactCards');
  if (!el || !data || !data.length) return;

  el.innerHTML = data.map((c, i) => `
    <div class="contact-card reveal-up" style="--delay:${i * 0.08}s">
      <div class="contact-icon">
        <svg data-icon="${escAttr(c.icon || 'mail')}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
      </div>
      <div class="contact-info">
        <span class="contact-label"
          data-th="${escAttr(c.label_th)}"
          data-en="${escAttr(c.label_en)}">${escAttr(getLang() === 'th' ? c.label_th : c.label_en)}</span>
        <span class="contact-value">${escAttr(c.value)}</span>
      </div>
      <button class="copy-btn" data-copy="${escAttr(c.value)}" title="Copy" aria-label="Copy">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      </button>
    </div>`).join('');

  // Copy button handler
  el.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
        btn.style.color = 'var(--accent)';
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
          btn.style.color = '';
        }, 2000);
      }).catch(() => {});
    });
  });

  injectLucide(el);
  observeReveal();
}

/* ── WEB SYSTEMS renderer ────────────────────────────── */
function renderWebsysGrid(data) {
  const el = document.getElementById('websysGrid');
  if (!el || !data || !data.length) return;
  const lang = getLang();

  el.innerHTML = data.map((sys, i) => `
    <a href="${escAttr(sys.url)}" target="_blank" rel="noopener noreferrer"
       class="websys-card reveal-up"
       style="--delay:${(i % 4) * 0.07}s; --sys-color:${sys.color}; --sys-color-dim:${sys.color_dim}">
      ${sys.image ? `
      <div class="websys-img">
        <img src="${escAttr(sys.image)}" alt="${escAttr(lang === 'th' ? sys.title_th : sys.title_en)}" loading="lazy">
        <div class="websys-img-overlay"></div>
      </div>` : ''}
      <div class="websys-icon">
        <svg data-icon="${escAttr(sys.icon)}" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"></svg>
      </div>
      <h3 class="websys-title"
          data-th="${escAttr(sys.title_th)}"
          data-en="${escAttr(sys.title_en)}">${escAttr(lang === 'th' ? sys.title_th : sys.title_en)}</h3>
      <p class="websys-desc"
         data-th="${escAttr(sys.desc_th)}"
         data-en="${escAttr(sys.desc_en)}">${escAttr(lang === 'th' ? sys.desc_th : sys.desc_en)}</p>
      <div class="websys-footer">
        <span class="websys-tech">${escAttr(sys.tech)}</span>
        <span class="websys-link">
          <span data-th="เปิดระบบ" data-en="Open">${lang === 'th' ? 'เปิดระบบ' : 'Open'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
          </svg>
        </span>
      </div>
    </a>`).join('');

  injectLucide(el);
  observeReveal();
}

function renderLineOA(lineoa) {
  const el = document.getElementById('lineOAWrap');
  if (!el || !lineoa) return;
  const lang = getLang();

  el.innerHTML = `
  <div class="lineoa-card reveal-up" style="--delay:.08s">
    <div>
      <div class="lineoa-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
        Line Official Account
      </div>
      <h3 class="lineoa-title"
          data-th="${escAttr(lineoa.title_th)}"
          data-en="${escAttr(lineoa.title_en)}">${escAttr(lang === 'th' ? lineoa.title_th : lineoa.title_en)}</h3>
      <p class="lineoa-desc"
         data-th="${escAttr(lineoa.desc_th)}"
         data-en="${escAttr(lineoa.desc_en)}">${escAttr(lang === 'th' ? lineoa.desc_th : lineoa.desc_en)}</p>
      <div class="lineoa-features">
        ${lineoa.features.map(f => `
          <div class="lineoa-feature">
            <svg data-icon="${escAttr(f.icon)}" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round"></svg>
            <span data-th="${escAttr(f.label_th)}"
                  data-en="${escAttr(f.label_en)}">${escAttr(lang === 'th' ? f.label_th : f.label_en)}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="lineoa-side">
      <div class="lineoa-icon-big">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
      </div>
      <p class="lineoa-platform">LINE OA</p>
    </div>
  </div>`;

  injectLucide(el);
  observeReveal();
}

/* ── ACTIVITIES ─────────────────────────────────────── */

/* Convert Google Drive share URL → thumbnail API (more reliable for <img>) */
function driveUrl(url) {
  if (!url) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1280`;
  return url; // already direct or external URL
}

function renderActivities(data) {
  const grid       = document.getElementById('activitiesGrid');
  const yearFilter = document.getElementById('actYearFilter');
  const section    = document.getElementById('activities');

  // Hide section if no Sheet data
  if (!grid || !data || !data.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';

  const lang = getLang();

  // Pre-process: split photos string → array, convert Drive URLs
  data.forEach(a => {
    a._photos = (a.photos || '')
      .split(',')
      .map(s => driveUrl(s.trim()))
      .filter(Boolean);
    a._cover = driveUrl(a.cover_url) || a._photos[0] || '';
  });

  // Unique years, descending
  const years = [...new Set(data.map(a => a.year).filter(Boolean))]
    .sort((a, b) => b - a);

  // Year filter buttons
  let activeYear = years[0] || 'all';
  const allBtn = years.length > 1
    ? `<button class="filter-btn" data-year="all" data-th="ทั้งหมด" data-en="All">${lang === 'th' ? 'ทั้งหมด' : 'All'}</button>`
    : '';
  yearFilter.innerHTML = allBtn + years.map((y, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-year="${escAttr(y)}">${escAttr(y)}</button>`
  ).join('');

  function renderCards(year) {
    const filtered = year === 'all' ? data : data.filter(a => a.year === year);
    grid.innerHTML = filtered.map((act, i) => {
      const name  = lang === 'th' ? act.name_th : act.name_en;
      const count = act._photos.length;
      const globalIdx = data.indexOf(act);
      return `
      <div class="act-card reveal-up" style="--delay:${(i % 4) * 0.07}s" data-act="${globalIdx}">
        ${act._cover
          ? `<img class="act-card-img" src="${escAttr(act._cover)}" alt="${escAttr(name)}" loading="lazy">`
          : `<div class="act-card-img-placeholder">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
             </div>`}
        <div class="act-card-body">
          <h3 class="act-card-title"
              data-th="${escAttr(act.name_th)}"
              data-en="${escAttr(act.name_en)}">${escAttr(name)}</h3>
          <div class="act-card-meta">
            <span>${escAttr(act.year || '')}</span>
            <span class="act-photo-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              ${count} รูป
            </span>
          </div>
        </div>
      </div>`;
    }).join('');

    observeReveal();

    grid.querySelectorAll('.act-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.act);
        openActivityModal(data[idx]);
      });
    });
  }

  renderCards(activeYear);

  yearFilter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    yearFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeYear = btn.dataset.year;
    renderCards(activeYear);
  });
}

/* ── Activity Modal ──────────────────────────────────── */
let _mPhotos = [], _mIdx = 0;

function openActivityModal(act) {
  const modal = document.getElementById('activityModal');
  if (!modal) return;
  _mPhotos = act._photos;
  _mIdx    = 0;
  modal.querySelector('.act-modal-title').textContent =
    getLang() === 'th' ? act.name_th : act.name_en;
  _buildThumbs(modal);
  _showPhoto(modal);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function _closeModal() {
  const modal = document.getElementById('activityModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function _showPhoto(modal) {
  const img     = modal.querySelector('.act-modal-main-img');
  const counter = modal.querySelector('.act-modal-counter');
  const prev    = modal.querySelector('.act-modal-prev');
  const next    = modal.querySelector('.act-modal-next');
  img.style.opacity = '0';
  setTimeout(() => { img.src = _mPhotos[_mIdx]; img.style.opacity = '1'; }, 160);
  counter.textContent = `${_mIdx + 1} / ${_mPhotos.length}`;
  prev.disabled = (_mIdx === 0);
  next.disabled = (_mIdx === _mPhotos.length - 1);
  modal.querySelectorAll('.act-modal-thumb')
    .forEach((t, i) => t.classList.toggle('active', i === _mIdx));
}

function _buildThumbs(modal) {
  const strip = modal.querySelector('.act-modal-thumbs');
  strip.innerHTML = _mPhotos.map((url, i) =>
    `<img class="act-modal-thumb ${i === 0 ? 'active' : ''}"
          src="${escAttr(url)}" alt="Photo ${i + 1}"
          loading="lazy" data-idx="${i}">`
  ).join('');
  strip.querySelectorAll('.act-modal-thumb').forEach(t =>
    t.addEventListener('click', () => { _mIdx = parseInt(t.dataset.idx); _showPhoto(modal); })
  );
}

function initActivityModal() {
  const modal = document.getElementById('activityModal');
  if (!modal) return;
  modal.querySelector('.act-modal-backdrop').addEventListener('click', _closeModal);
  modal.querySelector('.act-modal-close').addEventListener('click', _closeModal);
  modal.querySelector('.act-modal-prev').addEventListener('click', () => {
    if (_mIdx > 0) { _mIdx--; _showPhoto(modal); }
  });
  modal.querySelector('.act-modal-next').addEventListener('click', () => {
    if (_mIdx < _mPhotos.length - 1) { _mIdx++; _showPhoto(modal); }
  });
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')      _closeModal();
    if (e.key === 'ArrowLeft'  && _mIdx > 0)                        { _mIdx--; _showPhoto(modal); }
    if (e.key === 'ArrowRight' && _mIdx < _mPhotos.length - 1)      { _mIdx++; _showPhoto(modal); }
  });
}

/* ── Lucide icon injector (simple path lookup) ──────── */
const LUCIDE_PATHS = {
  /* existing */
  'book-open':       '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  'clipboard-list':  '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  'bar-chart-2':     '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
  'users':           '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  'shield-check':    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'heart-handshake': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>',
  'mail':            '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'phone':           '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'message-circle':  '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  'facebook':        '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  'check-circle':    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  /* web systems icons */
  'shopping-cart':   '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  'wallet':          '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  'activity':        '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'layout-dashboard':'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  'calendar-days':   '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  'book-marked':     '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><polyline points="10 2 10 10 13 7 16 10 16 2"/>',
  'credit-card':     '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  'megaphone':       '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  'check-square':    '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
};

function injectLucide(root) {
  (root || document).querySelectorAll('svg[data-icon]').forEach(svg => {
    const name = svg.getAttribute('data-icon');
    const paths = LUCIDE_PATHS[name] || LUCIDE_PATHS['check-circle'];
    svg.innerHTML = paths;
  });
}

/* ── badge-now styling helper ─────────────────────────── */
/* (injected inline via renderer; styled in components.css) */
