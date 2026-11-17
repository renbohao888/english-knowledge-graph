/* ============================================================
 * 小工具：DOM、转义、颜色混合
 * ============================================================ */
window.KB = window.KB || {};

KB.$ = (sel) => document.querySelector(sel);
KB.$$ = (sel) => Array.from(document.querySelectorAll(sel));

KB.idOf = (v) => (v && typeof v === 'object') ? v.id : v;

KB.esc = (s) => String(s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

function hexRgb(hex) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* 把颜色向背景混合：t=0 原色，t=1 完全融进背景。
   用不透明色做"淡出"，比逐节点改透明度更稳。 */
KB.fade = function (color, t) {
  const a = hexRgb(color), b = hexRgb(KB.BG);
  const r = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${r[0]},${r[1]},${r[2]})`;
};

/* 场景切换（总图 ⇄ 节点内部）时短暂淡出，避免数据一换画面硬切 */
KB.withSceneFade = function (fn, ms) {
  const b = document.body;
  if (!b) { fn(); return; }
  b.classList.add('scene-fade');
  setTimeout(() => {
    try { fn(); } finally {
      requestAnimationFrame(() => b.classList.remove('scene-fade'));
    }
  }, ms == null ? 150 : ms);
};
