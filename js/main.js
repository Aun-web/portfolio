/* ============================================================
   MAIN — orchestrate everything
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {

  /* ── UI init (instant, no data needed) ──────────────── */
  initTheme();
  initLang();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initBackToTop();
  initActivitiesParallax();
  observeReveal();   // reveal static elements (hero, about, headers)
  initActivityModal();

  /* ── Footer year ────────────────────────────────────── */
  const fy = document.getElementById('footerYear');
  if (fy) fy.textContent = new Date().getFullYear();

  /* ── Profile photo (if URL provided in config) ──────── */
  // Set DEFAULT_DATA.photoUrl = 'your-photo-url' to show a photo
  if (typeof DEFAULT_DATA !== 'undefined' && DEFAULT_DATA.photoUrl) {
    const img = document.getElementById('profilePhoto');
    const ph  = document.getElementById('photoPlaceholder');
    if (img) {
      img.src = DEFAULT_DATA.photoUrl;
      img.style.display = 'block';
      if (ph) ph.style.display = 'none';
    }
  }

  /* ── Load data ──────────────────────────────────────── */
  let data = null;

  if (CONFIG.PUBLISHED_ID) {
    // Try Google Sheets first
    data = await fetchAllSheets();
  }

  // Fallback helper: ใช้ Sheet data เฉพาะเมื่อมีข้อมูล (ไม่ใช่ array ว่าง)
  const use = (sheetData, fallback) =>
    (sheetData && sheetData.length > 0) ? sheetData : fallback;

  const d = {
    experience:     use(data && data.experience,     DEFAULT_DATA.experience),
    skills:         use(data && data.skills,         DEFAULT_DATA.skills),
    projects:       use(data && data.projects,       DEFAULT_DATA.projects),
    responsibility: use(data && data.responsibility, DEFAULT_DATA.responsibility),
    contact:        use(data && data.contact,        DEFAULT_DATA.contact),
    awards:         use(data && data.awards,         DEFAULT_DATA.awards),
    training:       use(data && data.training,       DEFAULT_DATA.training),
  };

  /* ── Render sections ─────────────────────────────────── */
  renderWpaLinks();
  renderAwards(d.awards);
  renderExperience(d.experience);
  renderSkills(d.skills);
  renderProjects(d.projects);
  renderWebsysGrid(DEFAULT_DATA.websystems);
  renderLineOA(DEFAULT_DATA.lineoa);
  renderTraining(d.training);
  renderActivities(data && data.activities);   // Sheets only — no fallback
  renderResponsibility(d.responsibility);
  renderContact(d.contact);

  // Re-apply language to any newly rendered data-th/data-en elements
  applyLang(getLang());

  // Kick off skill bar animations for any already visible
  observeSkillBars();

  // KPI count-up (fires when strip scrolls into view)
  initKpiCountUp();

  /* ── badge-now extra style ───────────────────────────── */
  injectBadgeNowStyle();
});

/* Add .badge-now style dynamically (small, self-contained) */
function injectBadgeNowStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .badge-now {
      display: inline-block;
      font-size: .68rem; font-weight: 700;
      letter-spacing: .08em; text-transform: uppercase;
      background: var(--accent); color: #fff;
      padding: 2px 8px; border-radius: 99px;
      margin-left: 8px; vertical-align: middle;
    }
    .tl-dot--now {
      background: var(--accent) !important;
      border-color: var(--accent) !important;
      box-shadow: 0 0 0 4px var(--accent-dim) !important;
    }
  `;
  document.head.appendChild(style);
}
