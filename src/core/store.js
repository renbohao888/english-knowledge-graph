/* ============================================================
 * 数据索引与派生状态
 * - buildIndex: 节点索引、邻居、连接度、按层固定的 y
 * - prepareLinks: 连线流向 + 学习路径连线
 * - matches / inFocusSet / isHotLink / learnVisible
 * ============================================================ */
window.KB = window.KB || {};

KB.layerY = {};
KB.LAYERS.forEach((l, i) => {
  KB.layerY[l] = ((KB.LAYERS.length - 1) / 2 - i) * KB.LAYER_GAP;
});

KB.buildIndex = function () {
  KB.byId = Object.create(null);
  KB.neighborMap = new Map();
  const deg = Object.create(null);

  KB.NODES.forEach(n => {
    KB.byId[n.id] = n;
    deg[n.id] = 0;
    KB.neighborMap.set(n.id, []);
    n.fy = KB.layerY[n.layer] != null ? KB.layerY[n.layer] : 0;
    if (n.y == null) n.y = n.fy;
    if (!Array.isArray(n.tracks)) n.tracks = [];
    if (!Array.isArray(n.before)) n.before = [];
    if (!Array.isArray(n.children)) n.children = [];
    if (!Array.isArray(n.keywords)) n.keywords = [];
  });

  /* 节点内部的详细拆解（details-*.js）覆盖简略的 children */
  if (KB.DETAILS) {
    Object.keys(KB.DETAILS).forEach(id => {
      const n = KB.byId[id];
      const d = KB.DETAILS[id];
      if (!n || !d || !Array.isArray(d.groups)) return;
      const items = [];
      d.groups.forEach(g => (g.items || []).forEach(it => {
        if (!it || !it.name) return;
        items.push({ name: it.name, desc: it.desc || '', group: g.name });
      }));
      /* 保留原 nodes*.js 里没有被详细拆解覆盖到的子条目，
         避免"注解 Annotation"这类老路径搜不到 */
      const squash = (x) => String(x || '').toLowerCase().replace(/[\s/\-_.·、，,()（）]+/g, '');
      (n.children || []).forEach(ch => {
        const cs = squash(ch.name);
        if (!cs) return;
        const covered = items.some(it => {
          const is = squash(it.name);
          return is === cs || is.includes(cs) || cs.includes(is);
        });
        if (!covered) items.push({ name: ch.name, desc: ch.desc || '', group: '核心要点' });
      });
      if (items.length) n.children = items;
    });
  }

  KB.LINKS.forEach(l => {
    const s = KB.idOf(l.source), t = KB.idOf(l.target);
    if (KB.byId[s] == null || KB.byId[t] == null) return;  // 写错的 id 直接跳过
    deg[s]++; deg[t]++;
    KB.neighborMap.get(s).push({ id: t, relation: l.relation, dir: 'out' });
    KB.neighborMap.get(t).push({ id: s, relation: l.relation, dir: 'in' });
  });

  KB.NODES.forEach(n => { n._deg = deg[n.id] || 0; });
};

/* ------------------------------------------------------------
 * 连线流向：粒子从"前置"流向"后置"，暗示知识该往哪走。
 * 没有前置关系的连线，按层从下往上流（地基 → 上层）。
 * 视觉上的线不分方向，所以直接交换 source/target；
 * 面板里的关系箭头在 buildIndex 时已经算好，不受影响。
 * before 里"还没画成连线"的关系，补成学习路径连线（默认隐藏）。
 * ------------------------------------------------------------ */
KB.prepareLinks = function () {
  const prereq = new Set();
  KB.NODES.forEach(n => n.before.forEach(p => {
    if (KB.byId[p]) prereq.add(p + '|' + n.id);
  }));

  KB.LINKS.forEach(l => {
    const s = KB.idOf(l.source), t = KB.idOf(l.target);
    const a = KB.byId[s], b = KB.byId[t];
    if (!a || !b) return;
    let forward;
    if (prereq.has(t + '|' + s)) forward = false;
    else if (prereq.has(s + '|' + t)) forward = true;
    else forward = KB.LAYERS.indexOf(a.layer) < KB.LAYERS.indexOf(b.layer);
    if (!forward) { const tmp = l.source; l.source = l.target; l.target = tmp; }
  });

  const exist = new Set();
  KB.LINKS.forEach(l => exist.add([KB.idOf(l.source), KB.idOf(l.target)].sort().join('|')));

  const learn = [];
  KB.NODES.forEach(n => n.before.forEach(p => {
    if (!KB.byId[p]) return;
    const key = [p, n.id].sort().join('|');
    if (exist.has(key)) return;
    exist.add(key);
    learn.push({ source: p, target: n.id, relation: '学习路径', learn: true });
  }));

  KB.graphLinks = KB.LINKS.concat(learn);
};

/* 当前筛选条件是否命中（方向 + 层 + 问题域 + 状态） */
KB.matches = function (n) {
  if (!n) return false;
  const s = KB.state;
  if (s.track && !(n.tracks || []).includes(s.track)) return false;
  if (s.layer && n.layer !== s.layer) return false;
  if (s.domain && n.domain !== s.domain) return false;
  if (s.status && KB.effStatus(n) !== s.status) return false;
  return true;
};

KB.inFocusSet = function (id) {
  const f = KB.state.focus;
  if (!f) return true;
  if (id === f) return true;
  const nb = KB.neighborMap.get(f) || [];
  return nb.some(e => e.id === id);
};

KB.isHotLink = function (l) {
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  const a = KB.state.selected || KB.state.hover;
  if (a && (s === a || t === a)) return true;
  if (KB.state.focus && (s === KB.state.focus || t === KB.state.focus)) return true;
  return false;
};

/* 学习路径连线：平时藏着，选中/悬停节点或处在同一方向里才出现 */
KB.learnVisible = function (l) {
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  const a = KB.state.selected || KB.state.hover;
  if (a && (s === a || t === a)) return true;
  if (KB.state.focus && (s === KB.state.focus || t === KB.state.focus)) return true;
  if (KB.state.track) {
    const A = KB.byId[s], B = KB.byId[t];
    return !!(A && B && A.tracks.includes(KB.state.track) && B.tracks.includes(KB.state.track));
  }
  return false;
};

/* 节点 id → 显示名（面板、提示里用） */
KB.nameOf = function (id) {
  const n = KB.byId[id];
  return n ? n.name : id;
};
