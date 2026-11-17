/* ============================================================
 * 学习路线：按目标给出完整学习顺序
 * - 列表：每条路线的步数、已完成数
 * - 详情：按阶段分组的步骤，节点步骤可跳转，任务步骤可勾选
 * - 图上高亮：把整条链路的节点点亮，其余压暗，节点名前带步骤序号
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  const LS = 'kb.pathDone.v1';

  function doneMap() {
    try {
      const v = JSON.parse(localStorage.getItem(LS) || '{}');
      return (v && typeof v === 'object') ? v : {};
    } catch (e) { return {}; }
  }
  function saveDone(m) {
    try { localStorage.setItem(LS, JSON.stringify(m)); } catch (e) { /* 隐私模式 */ }
  }

  KB.pathDone = function (pathId, idx) {
    const arr = doneMap()[pathId] || [];
    return arr.includes(idx);
  };

  KB.togglePathDone = function (pathId, idx) {
    const m = doneMap();
    const arr = new Set(m[pathId] || []);
    if (arr.has(idx)) arr.delete(idx); else arr.add(idx);
    m[pathId] = [...arr];
    saveDone(m);
  };

  KB.pathProgress = function (path) {
    let done = 0;
    path.steps.forEach((s, i) => {
      if (s.node && KB.byId[s.node]) {
        if (KB.effStatus(KB.byId[s.node]) === '已掌握') done++;
      } else if (KB.pathDone(path.id, i)) done++;
    });
    return { done, total: path.steps.length };
  };

  function pathById(id) {
    return (KB.PATHS || []).find(p => p.id === id) || null;
  }

  /* ---------- 面板：路线列表 ---------- */
  KB.renderPathsPanel = function () {
    const panel = KB.getPanel();
    KB.state.pathView = null;
    const cards = (KB.PATHS || []).map(p => {
      const { done, total } = KB.pathProgress(p);
      const pct = Math.round((done / Math.max(1, total)) * 100);
      return `<button class="path-card" data-path-open="${KB.esc(p.id)}">
        <span class="pc-top"><b>${KB.esc(p.name)}</b><em>${total} 步</em></span>
        <span class="pc-level">${KB.esc(p.level)}</span>
        <span class="pc-bar"><i style="width:${pct}%"></i></span>
        <span class="pc-meta">已完成 ${done} / ${total}</span>
      </button>`;
    }).join('');

    panel.innerHTML = `
      <div class="p-tools"><button class="panel-close" data-close aria-label="关闭详情">✕</button></div>
      <div class="p-scroll">
        <div class="p-layer">
          <span class="p-stack"><i class="on"></i></span>
          <span>学习路线</span>
          <span class="p-depth">${(KB.PATHS || []).length} 条</span>
        </div>
        <h2 class="p-title">学习路线</h2>
        <p class="p-desc">选一条路线，从第一步走到最后一步。每个有节点的步骤都能跳到图里去看它和谁相连；纯动手任务可以自己打勾。</p>
        <div class="path-list">${cards}</div>
      </div>`;
    panel.classList.add('open');
    const sc = panel.querySelector('.p-scroll');
    if (sc) sc.scrollTop = 0;
  };

  /* ---------- 面板：单条路线 ---------- */
  KB.renderPathDetail = function (id) {
    const path = pathById(id);
    if (!path) { KB.renderPathsPanel(); return; }
    KB.state.pathView = id;
    const panel = KB.getPanel();
    const { done, total } = KB.pathProgress(path);
    const pct = Math.round((done / Math.max(1, total)) * 100);
    const highlighted = KB.state.path === id;

    let lastPhase = null;
    let num = 0;
    const rows = path.steps.map((s, i) => {
      const hasNode = s.node && KB.byId[s.node];
      if (hasNode) num++;
      const isDone = hasNode
        ? KB.effStatus(KB.byId[s.node]) === '已掌握'
        : KB.pathDone(id, i);
      let head = '';
      if (s.phase && s.phase !== lastPhase) {
        lastPhase = s.phase;
        head = `<div class="pp-title">${KB.esc(s.phase)}</div>`;
      }
      const label = hasNode ? KB.byId[s.node].name : s.title;
      const stateTxt = isDone ? '已完成' : (hasNode ? KB.effStatus(KB.byId[s.node]) : '待完成');
      const inner = `
        <span class="ps-num${isDone ? ' on' : ''}">${hasNode ? num : '·'}</span>
        <span class="ps-body"><b>${KB.esc(label)}</b><span>${KB.esc(s.note || '')}</span></span>
        <span class="ps-state${isDone ? ' on' : ''}">${KB.esc(stateTxt)}</span>`;
      if (hasNode) {
        return head + `<button class="path-step" data-path-go="${KB.esc(s.node)}">${inner}</button>`;
      }
      return head + `<div class="path-step task${isDone ? ' done' : ''}">
        ${inner}
        <button class="ps-check" data-path-done="${i}" title="${isDone ? '取消完成' : '标记完成'}">${isDone ? '✓' : '○'}</button>
      </div>`;
    }).join('');

    panel.innerHTML = `
      <div class="p-tools"><button class="panel-close" data-close aria-label="关闭详情">✕</button></div>
      <div class="p-scroll">
        <button class="p-back" data-path-back>← 全部路线</button>
        <div class="p-layer">
          <span class="p-stack"><i class="on"></i></span>
          <span>学习路线</span>
          <span class="p-depth">${total} 步</span>
        </div>
        <h2 class="p-title">${KB.esc(path.name)}</h2>
        <p class="p-desc">${KB.esc(path.desc)}</p>
        <div class="path-progress"><i style="width:${pct}%"></i></div>
        <p class="progress-text">${done} / ${total} 已完成 · ${KB.esc(path.level)}</p>
        <div class="ed-actions">
          <button class="ed-save" data-path-highlight>${highlighted ? '取消图上高亮' : '在图中高亮这条链路'}</button>
          <button class="ed-cancel" data-path-exit>退出路线</button>
        </div>
        <div class="path-phases">${rows}</div>
      </div>`;
    panel.classList.add('open');
    const sc = panel.querySelector('.p-scroll');
    if (sc) sc.scrollTop = 0;
  };

  /* ---------- 图上高亮 ---------- */
  KB.setPathHighlight = function (id, on) {
    if (!on || !id) {
      KB.state.path = null;
      KB._pathSet = null;
      KB._pathIdx = null;
      KB.refreshStyles();
      return;
    }
    const path = pathById(id);
    if (!path) return;
    /* 路线和方向模式互斥 */
    if (KB.state.track) {
      KB.state.track = null;
      KB.syncFilterUI();
    }
    KB.state.path = id;
    KB._pathSet = new Set();
    KB._pathIdx = new Map();
    let n = 0;
    path.steps.forEach(s => {
      if (s.node && KB.byId[s.node]) {
        n++;
        KB._pathSet.add(s.node);
        if (!KB._pathIdx.has(s.node)) KB._pathIdx.set(s.node, n);
      }
    });
    KB.refreshStyles();
    KB.fitSubset([...KB._pathSet]);
    KB.showToast('已高亮「' + path.name + '」学习链路');
  };

  KB.clearPath = function () {
    KB.state.path = null;
    KB._pathSet = null;
    KB._pathIdx = null;
  };

  KB.bindPaths = function () {
    const btn = document.getElementById('pathBtn');
    if (btn) btn.addEventListener('click', () => KB.renderPathsPanel());
  };
})();
