/* ============================================================
 * 交互动作：单击 / 双击 / 选中 / 聚焦 / 方向模式 / 替换数据
 * ============================================================ */
window.KB = window.KB || {};

let clickTimer = null;
let clickCandidate = null;
let didInitialFit = false;

/* 屏幕距离：节点中心到鼠标位置的像素距离 */
KB.screenDistance = function (node, ev, cam) {
  if (!node || !node.__threeObj || !ev) return Infinity;
  const v = cam.position.clone().copy(node.__threeObj.position).project(cam);
  if (v.z > 1) return Infinity;
  const x = (v.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
  return Math.hypot(x - ev.clientX, y - ev.clientY);
};

/* 单击 / 双击判定：280ms 内两次点同一节点算双击。
   几个节点在屏幕上重叠时，射线可能先打到前面那个；
   如果命中点离线很远、而另一个节点中心就在指尖下，按指尖下那个算。 */
KB.handleNodeClick = function (node, ev) {
  let target = node;
  const near = KB.nearestNodeToEvent(ev);
  if (near && near.id !== node.id && ev && KB.graph) {
    const cam = KB.graph.camera();
    const d1 = KB.screenDistance(node, ev, cam);
    const d2 = KB.screenDistance(near, ev, cam);
    if (d1 > 10 && d2 < 8) target = near;
  }

  if (clickTimer && clickCandidate === target.id) {
    clearTimeout(clickTimer);
    clickTimer = null; clickCandidate = null;
    KB.toggleFocus(target.id);
    return;
  }
  clickCandidate = target.id;
  clickTimer = setTimeout(() => {
    clickTimer = null; clickCandidate = null;
    KB.selectNode(target.id, true);
  }, 260);
};

/* 点空白处：
   1. 先看看是不是点歪了——16px 内最近的节点也算点中（布局在动时很常见）
   2. 真的点空才取消选中 */
KB.nearestNodeToEvent = function (ev) {
  if (!ev || !KB.graph) return null;
  const cam = KB.graph.camera();
  if (!cam) return null;
  const w = window.innerWidth, h = window.innerHeight;
  const v = cam.position.clone();
  let best = null, bestD = 16;
  for (let i = 0; i < KB.NODES.length; i++) {
    const n = KB.NODES[i];
    if (!n.__threeObj) continue;
    v.copy(n.__threeObj.position).project(cam);
    if (v.z > 1) continue;
    const x = (v.x * 0.5 + 0.5) * w;
    const y = (-v.y * 0.5 + 0.5) * h;
    const d = Math.hypot(x - ev.clientX, y - ev.clientY);
    if (d < bestD) { bestD = d; best = n; }
  }
  return best;
};

KB.handleBackgroundClick = function (ev) {
  if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; clickCandidate = null; }
  const near = KB.nearestNodeToEvent(ev);
  if (near) { KB.selectNode(near.id, true); return; }
  KB.clearSelection();
};

KB.handleNodeHover = function (node) {
  /* 轨道旋转期间不弹提示，否则镜头一动、鼠标下换了个东西就会闪 */
  if (KB._orbiting) { KB.state.hover = null; KB.hideTip(); return; }
  KB.state.hover = node ? node.id : null;
  if (node) KB.showNodeTip(node);
  else if (!KB.state.hoverLink) KB.hideTip();
  KB.setCursor(node ? 'pointer' : 'grab');
};

KB.handleLinkHover = function (link) {
  if (KB._orbiting) { KB.state.hoverLink = null; KB.hideTip(); return; }
  KB.state.hoverLink = link || null;
  if (link && !KB.state.hover) KB.showLinkTip(link);
  if (!link && !KB.state.hover) KB.hideTip();
};

KB.handleEngineStop = function () {
  if (didInitialFit) return;
  didInitialFit = true;
  /* 首次取景直接到位，不做动画：否则头一秒画面在动，点击容易落空 */
  KB.fitNodes(KB.NODES, 0);
};

/* 每个知识点都有自己的地址：#/redis，可以直接分享或刷新回到这一页 */
KB.syncHash = function (id) {
  const n = id ? KB.byId[id] : null;
  const hash = n ? '#/' + id : '#';
  if (location.hash !== hash) {
    try { history.replaceState(null, '', hash); } catch (e) { location.hash = hash; }
  }
  document.title = n ? `${n.name} · 英语知识体系` : '英语知识体系 · 3D 交互图谱';
};

KB.selectNode = function (id, fly) {
  const n = KB.byId[id];
  if (!n) return;
  if (KB.state.subOf) KB.exitSubModel(true);
  /* 选中后节点会移动位置，悬停提示必须立刻收掉，否则会"黏"在原地 */
  KB.clearHover();
  /* 切走之前把编辑器里没保存的输入收回内存，切回来还能接着写 */
  if (KB.state.editing && KB.editorSync) KB.editorSync();
  if (KB.state.focus && !KB.inFocusSet(id)) KB.state.focus = null;
  KB.state.selected = id;
  /* 点击节点：摊平成 2D 关系图（前置/后续/关联环绕） */
  KB.twoDFocus(id);
  KB.renderPanel(id);
  KB.updateFocusBadge();
  KB.refreshStyles();
  KB.syncHash(id);
};

KB.clearSelection = function () {
  KB.state.selected = null;
  KB.state.focus = null;
  KB.state.editing = null;
  document.body.classList.remove('panel-collapsed');
  KB.closePanel();
  KB.updateFocusBadge();
  KB.twoDExit();
  KB.refreshStyles();
  KB.syncHash(null);
};

KB.toggleFocus = function (id) {
  KB.state.focus = (KB.state.focus === id) ? null : id;
  KB.state.selected = id;
  const n = KB.byId[id];
  if (n) KB.orbitTo(n, 900);
  KB.renderPanel(id);
  KB.updateFocusBadge();
  KB.refreshStyles();
};

/* 方向模式：让一条学习路径成为主视角 */
KB.selectTrack = function (name) {
  if (!KB.TRACKS[name]) return;
  if (KB.state.subOf) KB.exitSubModel(true);
  KB.state.track = (KB.state.track === name) ? null : name;

  if (KB.state.track) {
    if (KB.clearPath) KB.clearPath();
    KB.state.layer = null;
    KB.state.domain = null;
    KB.state.status = null;
    KB.state.selected = null;
    KB.state.focus = null;
    KB.twoDExit();
    KB.closePanel();
    KB.updateFocusBadge();
    KB.syncFilterUI();
    const ids = KB.NODES.filter(n => n.tracks.includes(KB.state.track)).map(n => n.id);
    KB.renderTrackPanel(KB.state.track);
    KB.fitSubset(ids);
  } else {
    KB.closePanel();
    KB.syncFilterUI();
    KB.fitView();
  }
};

KB.updateMatchStat = function () {
  const total = KB.NODES.length;
  const hit = KB.NODES.filter(KB.matches).length;
  const el = document.getElementById('matchStat');
  if (el) el.innerHTML = `匹配 <b>${hit}</b> / ${total}`;
};

KB.updateFocusBadge = function () {
  const el = document.getElementById('focusBadge');
  if (!el) return;
  if (!KB.state.focus) { el.classList.remove('show'); el.innerHTML = ''; return; }
  const n = KB.byId[KB.state.focus];
  el.innerHTML = `<span>聚焦「${KB.esc(n ? n.name : '')}」的直接邻域</span><button data-clear>退出</button>`;
  el.classList.add('show');
};

/* ------------------------------------------------------------
 * 替换整套数据（把 {nodes, links} 换掉，筛选重置）
 * 浏览器控制台可用：KB.updateGraphData({nodes:[...], links:[...]})
 * ------------------------------------------------------------ */
KB.updateGraphData = function (newData) {
  if (!newData || !Array.isArray(newData.nodes) || !Array.isArray(newData.links)) return;

  KB.NODES.length = 0;
  KB.LINKS.length = 0;
  newData.nodes.forEach(n => KB.NODES.push({ ...n }));
  newData.links.forEach(l => KB.LINKS.push({ ...l }));

  const s = KB.state;
  s.selected = null; s.focus = null;
  s.layer = null; s.domain = null; s.status = null; s.track = null;

  KB.twoDExit();
  KB.closePanel();
  KB.updateFocusBadge();
  KB.buildIndex();
  KB.prepareLinks();
  KB.buildRailUI();
  KB.buildDomainOptions();
  KB.buildLabels();
  KB.graph.graphData({ nodes: KB.NODES, links: KB.graphLinks });
  KB.refreshStyles();
  didInitialFit = false;
};
