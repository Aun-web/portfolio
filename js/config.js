/* ============================================================
   CONFIG — fill in SHEET_ID after setting up Google Sheets
   ============================================================ */
const CONFIG = {
  /* ─── Google Sheets (Published URL) ────────────────────────
     PUBLISHED_ID = ส่วนที่อยู่ระหว่าง /e/ และ /pub ใน URL ที่ได้จาก Publish to web
     GID = ตัวเลขในแต่ละ tab (ดูจาก URL เมื่อคลิก tab นั้น → #gid=XXXXXXXX)
  ────────────────────────────────────────────────────────── */
  PUBLISHED_ID: '2PACX-1vSPqRxlOseMlKT1L6mYSIFccVAGSzbYLwP55UWiDtAm9-XEEd09gCvhZdiS1lQJrT9zmKSuJRsDIn2O',

  // GID ของแต่ละ tab — กรอกหลังจากเปิด Sheet แล้วคลิกแต่ละ tab ดู URL
  GIDS: {
    experience:     '0',          // tab แรก = 0 เสมอ ✅
    skills:         '17333276',
    projects:       '1007710820',
    responsibility: '2051998715',
    contact:        '364182622',
    activities:     '814240410',  // ✅ tab ACTIVITIES
    awards:         '',           // TODO: ใส่ GID ของ tab รางวัล
    training:       '1438405672', // ✅ tab อบรม / Professional Development
  },

  /* ─── ว.PA Google Sites Links ────────────────────────── */
  // ใส่ URL ของแต่ละด้านบน Google Sites หลังจากสร้างหน้าเสร็จแล้ว
  wpaLinks: {
    d1: '',   // ด้านที่ 1 — การจัดการเรียนรู้
    d2: '',   // ด้านที่ 2 — การส่งเสริมและสนับสนุนผู้เรียน
    d3: '',   // ด้านที่ 3 — การพัฒนาตนเองและวิชาชีพ
  },

  /* ─── Defaults ───────────────────────────────────────────── */
  DEFAULT_LANG:  'th',
  DEFAULT_THEME: 'light',

  /* ─── AnyFlip Bookcase ───────────────────────────────────── */
  // ใส่ URL หลัง สร้าง MY BOOKCASE บน AnyFlip เสร็จแล้ว
  anyflipBookcase: 'https://sites.google.com/view/wp-portfolio-bookcase',
  anyflipCategories: [
    { label_th: 'ดูงานวิจัยเพิ่มเติม',     label_en: 'More Research',      url: 'https://sites.google.com/view/wp-portfolio-bookcase/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A7%E0%B8%88%E0%B8%A2', icon: 'file-text'  },
    { label_th: 'ดูแผนการสอนเพิ่มเติม',   label_en: 'More Lesson Plans',  url: 'https://sites.google.com/view/wp-portfolio-bookcase/%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%AD%E0%B8%99', icon: 'book-open'  },
    { label_th: 'ดูรางวัลเพิ่มเติม',       label_en: 'More Awards',        url: 'https://sites.google.com/view/wp-portfolio-bookcase/%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%A5', icon: 'award'      },
    { label_th: 'ดูเกียรติบัตรเพิ่มเติม', label_en: 'More Certificates',  url: 'https://sites.google.com/view/wp-portfolio-bookcase/%E0%B9%80%E0%B8%81%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%9A%E0%B8%95%E0%B8%A3', icon: 'scroll'     },
  ],
};

/* ============================================================
   DEFAULT DATA — used when SHEET_ID is empty
   ============================================================ */
const DEFAULT_DATA = {

  photoUrl: 'images/profile.jpg',

  experience: [
    {
      period_th: '2562 – 2563',
      period_en: '2019 – 2020',
      title_th:  'ครูอัตราจ้าง',
      title_en:  'Contract English Teacher',
      org_th:    'โรงเรียนค้างใจ อ.วังชิ้น จ.แพร่',
      org_en:    'Khangjai School, Wang Chin, Phrae',
      desc_th:   'สอนภาษาอังกฤษระดับประถมศึกษา พัฒนาสื่อการสอนและกิจกรรมเสริมทักษะสำหรับนักเรียน',
      desc_en:   'Taught primary-level English, developed teaching materials and skill-enhancement activities for students.',
    },
    {
      period_th: 'พ.ย. 2563',
      period_en: 'Nov 2020',
      title_th:  'พนักงานราชการ (ครูผู้สอน)',
      title_en:  'Government Employee Teacher',
      org_th:    'โรงเรียนวัดท่านา อ.บางกระทุ่ม จ.พิษณุโลก',
      org_en:    'Wat Tha Na School, Bang Krathum, Phitsanulok',
      desc_th:   '',
      desc_en:   '',
    },
    {
      period_th: 'ธ.ค. 2563',
      period_en: 'Dec 2020',
      title_th:  'พนักงานราชการ (ครูผู้สอน)',
      title_en:  'Government Employee Teacher',
      org_th:    'โรงเรียนบ้านนาหลวง–สำนักงานสลากกินแบ่งสงเคราะห์ 387 อ.ลอง จ.แพร่',
      org_en:    'Ban Na Luang School (Lottery Fund 387), Long, Phrae',
      desc_th:   '',
      desc_en:   '',
    },
    {
      period_th: '2564 – 2567',
      period_en: '2021 – 2024',
      title_th:  'ครูผู้สอนภาษาอังกฤษ',
      title_en:  'Primary English Teacher',
      org_th:    'โรงเรียนบ้านสามขา อ.บึงสามัคคี จ.กำแพงเพชร',
      org_en:    'Ban Sam Kha School, Bueng Samakkhi, Kamphaeng Phet',
      desc_th:   'จัดการเรียนการสอนภาษาอังกฤษ ป.4–ป.6 วางแผนหลักสูตร ประเมินผลนักเรียน และดูแลกิจกรรมพัฒนาผู้เรียน',
      desc_en:   'Delivered English instruction for Grades 4–6, planned curriculum, assessed students, and oversaw student development activities.',
    },
    {
      period_th: '2568 – ปัจจุบัน',
      period_en: '2025 – Present',
      title_th:  'ครูผู้สอนภาษาอังกฤษ',
      title_en:  'Primary English Teacher',
      org_th:    'โรงเรียนชุมชนบ้านแม่หละป่าป๋วย อ.วังชิ้น จ.แพร่',
      org_en:    'Chumchon Ban Mae La Pa Puai School, Wang Chin, Phrae',
      desc_th:   'สอนภาษาอังกฤษระดับประถมศึกษา พัฒนาสื่อและนวัตกรรมการสอน ส่งเสริมทักษะการสื่อสารของนักเรียน',
      desc_en:   'Teaching primary English, developing instructional innovations, and fostering student communication skills.',
      current:   'true',
    },
  ],

  skills: [
    // category: การสอน
    { category_th: 'การสอน', category_en: 'Teaching',    name_th: 'การสอนภาษาอังกฤษ',         name_en: 'English Language Teaching',   level: 95 },
    { category_th: 'การสอน', category_en: 'Teaching',    name_th: 'วางแผนการสอน',              name_en: 'Lesson Planning',              level: 92 },
    { category_th: 'การสอน', category_en: 'Teaching',    name_th: 'การบริหารจัดการห้องเรียน',  name_en: 'Classroom Management',         level: 90 },
    { category_th: 'การสอน', category_en: 'Teaching',    name_th: 'การประเมินผลนักเรียน',       name_en: 'Student Assessment',           level: 88 },
    // category: ทักษะภาษา
    { category_th: 'ทักษะภาษา', category_en: 'Language', name_th: 'ภาษาอังกฤษ (สื่อสาร)',       name_en: 'English (Communication)',      level: 90 },
    { category_th: 'ทักษะภาษา', category_en: 'Language', name_th: 'Phonics & เสียงภาษา',        name_en: 'Phonics & Pronunciation',      level: 88 },
    { category_th: 'ทักษะภาษา', category_en: 'Language', name_th: 'ภาษาไทย (ภาษาแม่)',          name_en: 'Thai Language (Native)',       level: 100 },
    // category: เทคโนโลยี
    { category_th: 'เทคโนโลยี', category_en: 'Technology', name_th: 'Google Workspace',         name_en: 'Google Workspace',             level: 82 },
    { category_th: 'เทคโนโลยี', category_en: 'Technology', name_th: 'สื่อดิจิทัลการสอน',        name_en: 'Digital Teaching Media',       level: 78 },
  ],

  projects: [
    {
      title_th:   'สื่อการสอน Phonics ระดับประถม',
      title_en:   'Primary Phonics Teaching Kit',
      desc_th:    'ชุดสื่อการสอน Phonics สำหรับนักเรียน ป.4–ป.6 ประกอบด้วยบัตรคำ เกม และแผนการสอนครบชุด',
      desc_en:    'A complete phonics teaching kit for Grades 4–6, including word cards, games, and full lesson plans.',
      tags:       'สื่อการสอน,Phonics',
      image_url:  '',
      link:       '',
      featured:   'TRUE',
    },
    {
      title_th:   'กิจกรรม English Camp',
      title_en:   'English Camp Activity',
      desc_th:    'ออกแบบและดำเนินกิจกรรมค่ายภาษาอังกฤษเพื่อพัฒนาทักษะการสื่อสารของนักเรียนในเชิงปฏิบัติ',
      desc_en:    'Designed and facilitated an English camp to develop students\' practical communication skills.',
      tags:       'กิจกรรม,Communication',
      image_url:  '',
      link:       '',
      featured:   'FALSE',
    },
    {
      title_th:   'เกมภาษาอังกฤษในห้องเรียน',
      title_en:   'Classroom English Games',
      desc_th:    'พัฒนาชุดเกมภาษาอังกฤษที่เสริมทักษะคำศัพท์และไวยากรณ์สำหรับใช้ในชั้นเรียน',
      desc_en:    'Developed a set of English games reinforcing vocabulary and grammar skills for in-class use.',
      tags:       'สื่อการสอน,Games',
      image_url:  '',
      link:       '',
      featured:   'FALSE',
    },
  ],

  responsibility: [
    { icon: 'book-open',     title_th: 'สอนภาษาอังกฤษ ป.4–ป.6',        title_en: 'Teach English Grades 4–6',       desc_th: 'จัดการเรียนการสอนภาษาอังกฤษอย่างมีประสิทธิภาพ',         desc_en: 'Deliver effective English instruction for primary students.' },
    { icon: 'clipboard-list',title_th: 'วางแผนการจัดการเรียนรู้',         title_en: 'Lesson Planning',                 desc_th: 'ออกแบบหน่วยการเรียนรู้และแผนการสอนรายปี',                desc_en: 'Design annual units and individual lesson plans.' },
    { icon: 'bar-chart-2',   title_th: 'ประเมินผลการเรียนรู้',            title_en: 'Student Assessment',              desc_th: 'วัดและประเมินผลนักเรียนด้วยเครื่องมือที่หลากหลาย',       desc_en: 'Assess students using varied evaluation tools.' },
    { icon: 'users',         title_th: 'กิจกรรมพัฒนาผู้เรียน',           title_en: 'Student Development',             desc_th: 'ดูแลและส่งเสริมกิจกรรมนอกห้องเรียนของนักเรียน',          desc_en: 'Oversee extracurricular and development activities.' },
    { icon: 'shield-check',  title_th: 'งานประกันคุณภาพการศึกษา',        title_en: 'Quality Assurance',               desc_th: 'จัดทำเอกสารและรายงานการประกันคุณภาพภายในโรงเรียน',       desc_en: 'Prepare internal quality assurance documents and reports.' },
    { icon: 'heart-handshake',title_th:'ครูที่ปรึกษา',                   title_en: 'Homeroom Advisor',                desc_th: 'ดูแลนักเรียนในฐานะครูที่ปรึกษาประจำชั้น',               desc_en: 'Support students as their designated homeroom advisor.' },
  ],

  training: [
    {
      title_th: 'การพัฒนาทักษะภาษาอังกฤษสำหรับครู (CEFR)',
      title_en: 'English Skills Development for Teachers (CEFR)',
      org_th:   'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
      org_en:   'Office of Basic Education Commission (OBEC)',
      hours:    '30',
      year:     '2567',
    },
    {
      title_th: 'การจัดการเรียนรู้เชิงรุก (Active Learning)',
      title_en: 'Active Learning Instructional Design',
      org_th:   'สำนักงานเขตพื้นที่การศึกษาประถมศึกษาแพร่ เขต 2',
      org_en:   'Phrae Primary Educational Service Area Office 2',
      hours:    '20',
      year:     '2566',
    },
    {
      title_th: 'การวิจัยในชั้นเรียนเพื่อพัฒนาผู้เรียน',
      title_en: 'Classroom Action Research for Student Development',
      org_th:   'สถาบันพัฒนาครู คณาจารย์ และบุคลากรทางการศึกษา (สคบศ.)',
      org_en:   'National Institute for Development of Teachers',
      hours:    '12',
      year:     '2566',
    },
  ],

  awards: [
    {
      year: '2568',
      title_th: 'ผ่านการสอบวัดทักษะภาษาอังกฤษ CEFR ระดับ B2 (EF SET)',
      title_en: 'CEFR B2 English Proficiency — EF Standard English Test',
      org_th: 'EF Education First (ส่วนตัว)',
      org_en: 'EF Education First (Self-Assessment)',
      level: 'cert',
      emoji: '📜',
    },
    {
      year: '2567',
      title_th: 'รางวัลเชิดชูเกียรติเนื่องในงานวันครู ประจำปี 2567',
      title_en: 'Teacher Appreciation Honor Award 2024',
      org_th: 'กลุ่มโรงเรียนอำเภอบึงสามัคคี จ.กำแพงเพชร',
      org_en: 'School Cluster, Bueng Samakkhi District, Kamphaeng Phet',
      level: 'area',
      emoji: '⭐',
    },
    {
      year: '2566',
      title_th: 'รางวัลชนะเลิศเหรียญทอง อันดับ 3 KPPE Awards ปีการศึกษา 2566',
      title_en: 'KPPE Awards — Gold Medal (3rd Place) 2023',
      org_th: 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร',
      org_en: 'Kamphaeng Phet Primary Educational Service Area',
      level: 'area',
      emoji: '🏅',
    },
  ],

  contact: [
    { type: 'email', icon: 'mail',           label_th: 'อีเมล',     label_en: 'Email',    value: 'your.email@example.com' },
    { type: 'phone', icon: 'phone',          label_th: 'โทรศัพท์',  label_en: 'Phone',    value: '08X-XXX-XXXX' },
    { type: 'line',  icon: 'message-circle', label_th: 'ไลน์ไอดี',  label_en: 'LINE ID',  value: '@yourlineid' },
    { type: 'facebook', icon: 'facebook',    label_th: 'Facebook',  label_en: 'Facebook', value: 'facebook.com/yourpage' },
  ],

  /* ── Web Systems ──────────────────────────────────────────── */
  websystems: [
    {
      icon: 'shopping-cart', color: '#10B981', color_dim: 'rgba(16,185,129,.13)',
      image: 'images/sys-store.jpg',
      title_th: 'ระบบสหกรณ์ร้านค้า', title_en: 'Cooperative Store System',
      desc_th: 'ระบบจัดการสหกรณ์ร้านค้าโรงเรียน ครอบคลุมสต็อก การขาย และบัญชี',
      desc_en: 'School cooperative store management covering inventory, sales, and accounting.',
      url: 'https://script.google.com/macros/s/AKfycbwcR0DtDYyXde4FoCGdJGroVScvP4e1bjHvraxyPCPdUFJcodncNYkXSjPCJGossudt/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'wallet', color: '#2563EB', color_dim: 'rgba(37,99,235,.13)',
      image: 'images/sys-finance.jpg',
      title_th: 'ระบบการเงิน', title_en: 'Financial System',
      desc_th: 'บริหารการเงินโรงเรียน รายรับ–รายจ่าย และรายงานทางการเงิน',
      desc_en: 'School financial management with income, expenses, and reports.',
      url: 'https://script.google.com/macros/s/AKfycbz2RI2BWrTcoSm1YCK1lnKPwlwSB-btRIV4Vd7hvJe94fDBxwZZLhYvYpO8wHOciCkugA/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'activity', color: '#F43F5E', color_dim: 'rgba(244,63,94,.13)',
      image: 'images/sys-health.jpg',
      title_th: 'ระบบห้องพยาบาล', title_en: 'School Infirmary System',
      desc_th: 'บันทึกประวัติสุขภาพนักเรียน การรักษา และยาประจำห้องพยาบาล',
      desc_en: 'Student health records, treatment logs, and infirmary medicine management.',
      url: 'https://script.google.com/macros/s/AKfycbyuK9PxFOYavfURG1P0M8eZKs7tqcF0EUA5g10vDdeRDBWrpEm0mzZmhiSUCuaGPuMd/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'layout-dashboard', color: '#8B5CF6', color_dim: 'rgba(139,92,246,.13)',
      image: 'images/sys-portal.jpg',
      title_th: 'ระบบ Main Portal', title_en: 'Main Portal System',
      desc_th: 'ศูนย์กลางเชื่อมต่อทุกระบบในโรงเรียน เข้าถึงได้ง่ายในที่เดียว',
      desc_en: 'Central hub connecting all school systems in one convenient portal.',
      url: 'https://script.google.com/macros/s/AKfycbwTVpX25ucDsYCNCfcd5lc-QPHa-glqyCuB9mVurzFYVxhCFEOM-sjX-yWkzIQqFMvcgQ/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'calendar-days', color: '#F59E0B', color_dim: 'rgba(245,158,11,.13)',
      image: 'images/sys-calendar.jpg',
      title_th: 'ระบบปฏิทินโรงเรียน', title_en: 'School Calendar System',
      desc_th: 'ปฏิทินกิจกรรม วันสำคัญ และกำหนดการตลอดปีการศึกษา',
      desc_en: 'School events, important dates, and schedules throughout the academic year.',
      url: 'https://script.google.com/macros/s/AKfycbzeqzYVtuo9coWZuu7nSpFWygK-GiclIWSXktf7k9j4zz6j2vca4dOutk8iI-vIW2cS/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'book-marked', color: '#14B8A6', color_dim: 'rgba(20,184,166,.13)',
      image: 'images/sys-grade.jpg',
      title_th: 'ระบบ ปพ.5 และ ปพ.6', title_en: 'Academic Record System',
      desc_th: 'บันทึกผลการเรียน ปพ.5 สมุดรายงานผล และ ปพ.6 แบบรายงานผู้เรียน',
      desc_en: 'Grade book management for academic records (Por Por 5 & 6).',
      url: 'https://script.google.com/macros/s/AKfycbzwSgiQu4_J1ggGZ_CC7LnxkG5kV8NU7j2Q8znVH35OAuhxOzVybT1A2JdZRKi4YXUQ8g/exec',
      tech: 'Google Apps Script',
    },
    {
      icon: 'credit-card', color: '#6366F1', color_dim: 'rgba(99,102,241,.13)',
      image: 'images/sys-idcard.jpg',
      title_th: 'ระบบลงทะเบียนบัตรนักเรียน', title_en: 'Student ID Registration',
      desc_th: 'ลงทะเบียนและจัดการข้อมูลบัตรประจำตัวนักเรียนทั้งโรงเรียน',
      desc_en: 'School-wide student ID card registration and data management.',
      url: 'https://script.google.com/macros/s/AKfycbynMVuU4kJipvr55AbF8wsLu6ynmFePaIdjuiMhmR3ttg-aXZFDJBvi6ECKrcrklpdNGQ/exec',
      tech: 'Google Apps Script',
    },
  ],

  /* ── Line OA ──────────────────────────────────────────────── */
  lineoa: {
    title_th: 'ระบบ Line OA โรงเรียน',
    title_en: 'School Line Official Account',
    desc_th: 'ระบบสื่อสารครบวงจรระหว่างครูและผู้ปกครองผ่าน Line Official Account ของโรงเรียน ครอบคลุมทุกความต้องการด้านการสื่อสารในชีวิตประจำวัน',
    desc_en: 'A complete teacher-parent communication system via the school\'s Line OA, covering all daily communication needs.',
    features: [
      { icon: 'check-square',  label_th: 'เช็คชื่อนักเรียน',   label_en: 'Attendance Check'     },
      { icon: 'megaphone',     label_th: 'ครูประกาศ–แจ้งข่าว', label_en: 'Teacher Announcements' },
      { icon: 'bar-chart-2',   label_th: 'ดูเกรดนักเรียน',     label_en: 'Grade Viewing'         },
      { icon: 'book-open',     label_th: 'ติดตามการบ้าน',       label_en: 'Homework Tracking'     },
      { icon: 'calendar-days', label_th: 'ตรวจสอบวันหยุด',     label_en: 'Holiday Calendar'      },
    ],
  },
};
