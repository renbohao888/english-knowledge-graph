/* ============================================================
 * 悬浮提示：节点名 + 层 + 问题域 + 状态；连线显示两端与关系
 * ============================================================ */
window.KB = window.KB || {};

let tipEl = null;
let mx = 0, my = 0;

KB.getTip = function () {
  if (!tipEl) tipEl = document.getElementById('tooltip');
  return tipEl;
};

KB.bindTooltip = function () {
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    const el = KB.getTip();
    el.style.left = mx + 'px';
    el.style.top = my + 'px';
  }, { passive: true });
};

KB.showNodeTip = function (n) {
  const el = KB.getTip();
  const st = KB.effStatus(n);
  const color = KB.STATUS_COLOR[st] || '#9fb3cc';
  el.innerHTML = `
    <div class="tt-name">${KB.esc(n.name)}</div>
    <div class="tt-meta"><span>${KB.esc(n.layer)}</span><span>${KB.esc(n.domain)}</span></div>
    <div class="tt-status" style="--c:${color};color:${color}">${KB.esc(st)}</div>`;
  el.style.left = mx + 'px';
  el.style.top = my + 'px';
  el.classList.add('show');
};

KB.showLinkTip = function (l) {
  const a = KB.byId[KB.idOf(l.source)];
  const b = KB.byId[KB.idOf(l.target)];
  if (!a || !b) return;
  const el = KB.getTip();
  el.innerHTML = `
    <div class="tt-name">${KB.esc(a.name)} → ${KB.esc(b.name)}</div>
    <div class="tt-meta"><span>${KB.esc(l.relation)}</span></div>`;
  el.style.left = mx + 'px';
  el.style.top = my + 'px';
  el.classList.add('show');
};

KB.hideTip = function () {
  const el = KB.getTip();
  if (el) el.classList.remove('show');
};

/* 短暂提示：切换操作模式时告诉用户现在左键是什么 */
KB.showToast = function (text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(KB._toastT);
  KB._toastT = setTimeout(() => el.classList.remove('show'), 1800);
};
