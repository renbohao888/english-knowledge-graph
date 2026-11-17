/* ============================================================
 * 启动：加载 3d-force-graph → 装配 → 渲染循环
 * ============================================================ */
window.KB = window.KB || {};

const CDNS = [
  'https://unpkg.com/3d-force-graph@1.80.2/dist/3d-force-graph.min.js',
  'https://registry.npmmirror.com/3d-force-graph/1.80.2/files/dist/3d-force-graph.min.js',
  'https://cdn.jsdelivr.net/npm/3d-force-graph@1.80.2/dist/3d-force-graph.min.js'
];

function loadScript(src, timeout) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    let done = false;
    const timer = setTimeout(() => { if (!done) { done = true; reject(new Error('timeout')); } }, timeout || 12000);
    s.src = src;
    s.async = true;
    s.onload = () => { if (!done) { done = true; clearTimeout(timer); resolve(); } };
    s.onerror = () => { if (!done) { done = true; clearTimeout(timer); reject(new Error('load error')); } };
    document.head.appendChild(s);
  });
}

async function loadLib() {
  for (const url of CDNS) {
    if (window.ForceGraph3D) return true;
    try { await loadScript(url); } catch (e) { /* 换下一个源 */ }
  }
  return !!window.ForceGraph3D;
}

function showBootError() {
  const boot = document.getElementById('boot');
  if (!boot) return;
  boot.classList.add('boot-error');
  boot.querySelector('.boot-card').innerHTML = `
    <p>3D 引擎加载失败</p>
    <small>页面需要联网从 CDN 取 3d-force-graph。网络恢复后刷新即可；
    也可以把库下载到本地，改 main.js 里的 CDNS 指向本地文件。</small>
    ${CDNS.map(u => `<code>${KB.esc(u)}</code>`).join('')}
  `;
}

function frame() {
  requestAnimationFrame(frame);
  if (!KB.graph) return;
  if (KB.stepNodeScale) KB.stepNodeScale();  // 节点缩放的逐帧缓动
  if (KB.autoOrbitTick) KB.autoOrbitTick();  // 空闲时缓慢自转
  if (KB.state.mode !== '3d') return;   // 2D 关系图时不更新 3D 标签
  if (KB._flying) return;               // 滚轮穿行时标签层隐藏，省掉逐帧重排
  const cam = KB.graph.camera();
  if (!cam) return;
  KB.tickLabels(cam);
}

KB.boot = function () {
  if (KB.booted) return;
  KB.booted = true;

  KB.buildIndex();
  KB.prepareLinks();

  /* 拉取页面内补充过的教程（拿到后会自己重绘面板） */
  if (KB.loadUserContent) KB.loadUserContent();

  KB.buildRailUI();
  KB.buildDomainOptions();
  KB.bindTooltip();
  KB.bindPanel();
  KB.bindSearch();
  KB.bindRail();
  if (KB.bindPaths) KB.bindPaths();
  if (KB.bindVocab) KB.bindVocab();

  KB.initGraph();
  KB.buildLabels();
  KB.twoDInit();
  KB.updateMatchStat();

  requestAnimationFrame(frame);

  /* 用户一拖鼠标就放弃当前的轨道动画，别跟手动操作打架 */
  const canvas = document.querySelector('#graph canvas');
  if (canvas) {
    canvas.addEventListener('pointerdown', () => { KB._orbitCancel = true; }, { passive: true });

    /* 右键：屏蔽浏览器菜单；单击（没有拖动）切换左键的旋转/平移 */
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    let rdown = null;
    canvas.addEventListener('pointerdown', (e) => {
      if (e.button === 2) rdown = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointerup', (e) => {
      if (e.button !== 2 || !rdown) return;
      const moved = Math.hypot(e.clientX - rdown.x, e.clientY - rdown.y);
      rdown = null;
      if (moved < 5) KB.toggleLeftMode();
    });
  }

  /* 直接打开 #/redis 这样的地址，自动进入那个知识点的详情页 */
  const fromHash = () => {
    const m = location.hash.match(/^#\/(.+)$/);
    if (m && KB.byId[m[1]]) return m[1];
    return null;
  };
  const initial = fromHash();
  if (initial) setTimeout(() => KB.selectNode(initial, true), 1600);
  window.addEventListener('hashchange', () => {
    const id = fromHash();
    if (id) { if (KB.state.selected !== id) KB.selectNode(id, true); }
    else if (KB.state.selected) KB.clearSelection();
  });

  /* 调试 / 二次开发入口 */
  window.__graph = KB.graph;
  window.__app = KB;
  window.updateGraphData = KB.updateGraphData;

  const boot = document.getElementById('boot');
  if (boot) {
    boot.classList.add('hide');
    setTimeout(() => { if (boot.parentNode) boot.remove(); }, 600);
  }
};

(async function start() {
  const ok = await loadLib();
  if (!ok) { showBootError(); return; }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', KB.boot, { once: true });
  } else {
    KB.boot();
  }
})();
