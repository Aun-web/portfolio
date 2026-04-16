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
    skills:         '17333276',           // ← วาง GID ของ tab SKILLS
    projects:       '1007710820',           // ← วาง GID ของ tab PROJECTS
    responsibility: '2051998715',           // ← วาง GID ของ tab RESPONSIBILITY
    contact:        '364182622',           // ← วาง GID ของ tab CONTACT
  },

  /* ─── Defaults ───────────────────────────────────────────── */
  DEFAULT_LANG:  'th',
  DEFAULT_THEME: 'light',
};

/* ============================================================
   DEFAULT DATA — used when SHEET_ID is empty
   ============================================================ */
const DEFAULT_DATA = {

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

  contact: [
    { type: 'email', icon: 'mail',           label_th: 'อีเมล',     label_en: 'Email',    value: 'your.email@example.com' },
    { type: 'phone', icon: 'phone',          label_th: 'โทรศัพท์',  label_en: 'Phone',    value: '08X-XXX-XXXX' },
    { type: 'line',  icon: 'message-circle', label_th: 'ไลน์ไอดี',  label_en: 'LINE ID',  value: '@yourlineid' },
    { type: 'facebook', icon: 'facebook',    label_th: 'Facebook',  label_en: 'Facebook', value: 'facebook.com/yourpage' },
  ],
};
