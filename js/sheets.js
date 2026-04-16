/* ============================================================
   GOOGLE SHEETS — fetch published CSV (no API key needed)
   URL format:
   https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv&sheet={NAME}
   ============================================================ */

/* Minimal but correct CSV parser (handles quoted fields + embedded commas) */
function parseCSV(raw) {
  const rows = [];
  let row = [], cell = '', inQ = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '"') {
      if (inQ && raw[i + 1] === '"') { cell += '"'; i++; }   // escaped quote
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) {
      row.push(cell.trim()); cell = '';
    } else if ((ch === '\n' || ch === '\r') && !inQ) {
      if (ch === '\r' && raw[i + 1] === '\n') i++;            // CRLF
      row.push(cell.trim()); cell = '';
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) { row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); }

  if (rows.length === 0) return [];

  // First row = headers; normalise to lowercase_underscore keys
  const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (r[i] || '').trim(); });
    return obj;
  });
}

/* ดึงข้อมูล 1 tab โดยใช้ Published URL + GID */
async function fetchSheet(key) {
  const gid = CONFIG.GIDS[key];
  if (!CONFIG.PUBLISHED_ID || gid === '') return null;   // ยังไม่ได้กรอก GID

  const url =
    `https://docs.google.com/spreadsheets/d/e/${CONFIG.PUBLISHED_ID}` +
    `/pub?output=csv&single=true&gid=${gid}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseCSV(await res.text());
  } catch (err) {
    console.warn(`[Sheets] Could not load key="${key}" gid=${gid}:`, err.message);
    return null;
  }
}

async function fetchAllSheets() {
  const keys    = Object.keys(CONFIG.GIDS);
  const results = await Promise.all(keys.map(k => fetchSheet(k)));
  const data    = {};
  keys.forEach((k, i) => { data[k] = results[i]; });
  return data;
}
