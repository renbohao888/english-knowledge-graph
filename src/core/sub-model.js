/* ============================================================
 * 节点内部 3D：点进一个知识点，看它自己的细分结构
 * - 中心是这个节点本身；children 按 group 分成若干分区
 * - 每个分区一个方向、一种颜色，分区末端有区块名
 * - 子节点按顺序编号，本身就是这个节点内部的学习顺序
 * - 数据来自 details-*.js（KB.DETAILS），没有详细数据的节点用原有 children
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  const PALETTE = ['#5cc8ff', '#f5c453', '#3ddc84', '#ff6470', '#b483ff', '#59d0c8', '#ff9f68', '#8fa4ff'];

  function esc(s) { return KB.esc(s == null ? '' : s); }
  function colorOfGroup(gi) { return PALETTE[gi % PALETTE.length]; }

  /* 球面上的等距方向，用来给每个分区指定朝向 */
  function fibDirs(n) {
    const pts = [];
    if (n <= 0) return pts;
    const off = 2 / n;
    const inc = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = i * off - 1 + off / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * inc;
      pts.push({ x: Math.cos(phi) * r, y: y * 1.15, z: Math.sin(phi) * r });
    }
    return pts;
  }

  /* 把 children 整理成分区：优先用 child.group；没有就按数量切成 ≤3 块 */
  function collectGroups(kids) {
    const named = kids.some(k => k.group);
    const groups = [];
    if (named) {
      kids.forEach(k => {
        const name = k.group || '其他';
        let g = groups.find(x => x.name === name);
        if (!g) { g = { name, items: [] }; groups.push(g); }
        g.items.push(k);
      });
    } else {
      const G = kids.length > 2 ? Math.min(3, Math.ceil(kids.length / 3)) : 1;
      const per = Math.ceil(kids.length / G);
      for (let i = 0; i < G; i++) {
        const items = kids.slice(i * per, (i + 1) * per);
        if (items.length) groups.push({ name: '', items });
      }
    }
    let step = 0;
    groups.forEach(g => g.items.forEach(k => { k._step = ++step; }));
    return groups;
  }

  KB.subColorOf = function (gi) { return colorOfGroup(gi); };

  /* ---------- 样式访问器 ---------- */
  KB.subNodeColor = function (n) {
    if (n._center) return '#dff3ff';
    if (n._anchor) return KB.BG;
    if (KB.state.subChild === n.id) return '#ffffff';
    return colorOfGroup(n._group || 0);
  };

  KB.subNodeVal = function (n) {
    const s = n._s == null ? 1 : n._s;
    if (n._center) return 14;
    if (n._anchor) return 0.05;
    return (4.5 + (n._group || 0) * 0.35) * s;
  };

  KB.subLinkColor = function () { return 'rgba(120,170,230,.4)'; };

  KB.subNodeHover = function (node) {
    if (!node || node._anchor) { KB.state.hover = null; KB.hideTip(); KB.setCursor('grab'); return; }
    KB.state.hover = node.id;
    KB.showNodeTip(node);
    KB.setCursor('pointer');
  };

  KB.subNodeClick = function (node) {
    if (!node || node._center || node._anchor) return;
    KB.state.subChild = node.id;
    if (KB.graph) KB.graph.nodeColor(KB.subNodeColor);
    KB.renderSubChild(node);
  };

  /* ---------- 进入 / 退出 ---------- */
  KB.enterSubModel = function (id) {
    const parent = KB.byId[id];
    if (!parent || !KB.graph) return;
    const kids = (parent.children || []).map(k => ({ name: k.name, desc: k.desc || '', group: k.group || '' }));
    if (!kids.length) { KB.showToast('这个节点还没有细分知识点'); return; }
    if (KB.state.mode === '2d') KB.twoDExit({ animate: false });
    KB.clearHover();

    const groups = collectGroups(kids);
    const dirs = fibDirs(groups.length);
    const R = groups.length <= 2 ? 250 : 320;
    const nodes = [];
    const links = [];
    const byId = Object.create(null);

    const center = {
      id: '__center', name: parent.name, layer: parent.layer, domain: parent.domain,
      status: parent.status, tracks: parent.tracks || [], description: parent.description,
      children: [], before: [], _center: true,
      x: 0, y: 0, z: 0, fx: 0, fy: 0, fz: 0
    };
    nodes.push(center); byId[center.id] = center;
    KB._subCount = kids.length;
    KB._subGroups = groups.length;

    let step = 0;
    groups.forEach((g, gi) => {
      const d = dirs[gi] || { x: 0, y: 1, z: 0 };
      let t1 = { x: -d.z, y: 0, z: d.x };
      const l1 = Math.hypot(t1.x, t1.z) || 1;
      t1 = { x: t1.x / l1, y: 0, z: t1.z / l1 };
      const t2 = {
        x: d.y * t1.z - d.z * t1.y,
        y: d.z * t1.x - d.x * t1.z,
        z: d.x * t1.y - d.y * t1.x
      };

      g.items.forEach((k, i) => {
        step++;
        /* 每个分区内部用黄金角螺旋铺开，条数多也不会挤成一条线 */
        const a = i * 2.399963;
        const rr = 40 + Math.sqrt(i) * 30;
        const depth = (i % 3) * 16;
        const node = {
          id: '__c' + step, name: k.name, desc: k.desc, description: k.desc,
          layer: parent.layer, domain: parent.domain, status: '待补充', tracks: parent.tracks || [],
          children: [], before: [],
          _sub: true, _group: gi, _idx: step - 1, _step: step, group: g.name,
          x: d.x * (R + depth) + (t1.x * Math.cos(a) + t2.x * Math.sin(a)) * rr,
          y: d.y * (R + depth) + (t1.y * Math.cos(a) + t2.y * Math.sin(a)) * rr,
          z: d.z * (R + depth) + (t1.z * Math.cos(a) + t2.z * Math.sin(a)) * rr
        };
        node.fx = node.x; node.fy = node.y; node.fz = node.z;
        nodes.push(node); byId[node.id] = node;
        links.push({ source: center.id, target: node.id, relation: '细分' });
      });

      if (g.name) {
        const anchor = {
          id: '__g' + gi, name: g.name, layer: parent.layer, domain: parent.domain,
          status: '待补充', tracks: [], children: [], before: [],
          _anchor: true, _group: gi,
          x: d.x * (R + 130), y: d.y * (R + 130), z: d.z * (R + 130)
        };
        anchor.fx = anchor.x; anchor.fy = anchor.y; anchor.fz = anchor.z;
        nodes.push(anchor); byId[anchor.id] = anchor;
      }
    });

    KB._subSaved = { nodes: KB.NODES, links: KB.graphLinks };
    KB.state.subOf = id;
    KB.state.subChild = null;
    KB.state.selected = null;
    KB.state.focus = null;
    KB.state.path = null;
    KB.state.pathView = null;
    KB._pathSet = null;
    KB._pathIdx = null;
    KB.state.track = null;
    KB.subById = byId;
    KB.subNodes = nodes;
    KB.subLinks = links;
    KB._subGroupsData = groups;
    KB.closePanel();

    const g = KB.graph;
    g.nodeColor(KB.subNodeColor)
      .nodeVal(KB.subNodeVal)
      .linkColor(KB.subLinkColor)
      .linkDirectionalParticles(0)
      .onNodeClick(KB.subNodeClick)
      .onNodeHover(KB.subNodeHover)
      .onBackgroundClick(() => {});

    KB.withSceneFade(() => {
      g.graphData({ nodes, links });
      KB.renderSubPanel(id);
      KB.updateViewOffset();

      /* 相机取景：target 固定在原点（旋转中心不跑），
         面板占位交给视口偏移处理。 */
      let maxR = 0;
      nodes.forEach(n => { maxR = Math.max(maxR, Math.hypot(n.x, n.y, n.z)); });
      const c0 = g.camera();
      const fov = ((c0 && c0.fov) || 55) * Math.PI / 180;
      const halfH = Math.tan(fov / 2);
      const W = window.innerWidth, H = window.innerHeight;
      const wide = W > 900;
      const panelW = (wide && !document.body.classList.contains('panel-collapsed')) ? 480 : 0;
      const railW = (wide && !document.body.classList.contains('rail-collapsed')) ? 290 : 0;
      const freeW = Math.max(320, W - panelW - railW);
      const distW = maxR / (halfH * (freeW / H));
      const dist = Math.max(520, Math.max(distW, maxR / halfH) * 1.16);
      KB._subEnterDist = dist;
      KB._subOutHits = 0;

      g.cameraPosition({ x: 0, y: dist * 0.14, z: dist }, { x: 0, y: 0, z: 0 }, KB.reduceMotion ? 0 : 700);

      KB.buildLabels(nodes, links);
    });
    KB.showToast('滚轮在模型上缩放 / 推进 · 拖动旋转 · 面板可单独滚动');
  };

  KB.exitSubModel = function (silent, opts) {
    if (!KB.state.subOf) return;
    const g = KB.graph;
    KB.state.subOf = null;
    KB.state.subChild = null;
    KB.subById = null;
    KB.subNodes = null;
    KB.subLinks = null;
    KB._subGroupsData = null;

    const restore = () => {
      if (g) {
        g.nodeColor(KB.colorOfNode)
          .nodeVal(KB.nodeSize)
          .linkColor(KB.colorOfLink)
          .linkDirectionalParticles(KB.particleCount)
          .onNodeClick(KB.handleNodeClick)
          .onNodeHover(KB.handleNodeHover)
          .onBackgroundClick(KB.handleBackgroundClick);
        g.graphData({ nodes: KB.NODES, links: KB.graphLinks });
      }
      KB.buildLabels();
      KB.refreshStyles();
      if (!(opts && opts.fit === false)) KB.fitView();
      if (!silent) KB.closePanel();
    };

    if (opts && opts.noFade) restore();
    else KB.withSceneFade(restore);
  };

  /* 从子模型缩出：落在"这个知识点"在总图里的聚焦视图，而不是全局初始画面 */
  KB.leaveSubToNode = function () {
    const pid = KB.state.subOf;
    if (!pid) return;
    const n = KB.byId[pid];
    KB._subOutHits = 0;
    KB.exitSubModel(true, { fit: false, noFade: true });
    if (!n) return;
    KB.state.selected = null;
    KB.state.focus = pid;
    KB.updateFocusBadge();
    KB.refreshStyles();
    const ids = [pid].concat((KB.neighborMap.get(pid) || []).map(e => e.id));
    KB.fitSubset(ids);
    KB.showToast('已回到「' + n.name + '」');
  };

  /* ---------- 面板 ---------- */
  KB.renderSubPanel = function (id) {
    const p = KB.byId[id];
    if (!p) return;
    const groups = KB._subGroupsData || collectGroups((p.children || []).map(k => ({ ...k })));
    const panel = KB.getPanel();
    const total = groups.reduce((s, g) => s + g.items.length, 0);

    const sections = groups.map((g, gi) => {
      const items = g.items.map(k => `
        <button class="child sub-item" data-sub-go="${k._step - 1}">
          <b><i class="sc-dot" style="--c:${colorOfGroup(gi)}"></i><em class="sub-step">${k._step}</em>${esc(k.name)}</b>
          <span>${esc(k.desc || '')}</span>
        </button>`).join('');
      return `<div class="sub-group">
        <div class="sub-group-title"><i style="--c:${colorOfGroup(gi)}"></i>${esc(g.name || '细分知识点')}<em>${g.items.length}</em></div>
        ${items}
      </div>`;
    }).join('');

    panel.innerHTML = `
      <div class="p-tools"><button class="panel-close" data-close aria-label="关闭详情">✕</button></div>
      <div class="p-scroll">
        <button class="p-back" data-exit-sub>← 返回总图</button>
        <div class="p-layer">
          <span class="p-stack"><i class="on"></i><i class="on"></i></span>
          <span>节点内部</span>
          <span class="p-depth">${total} 个细分点 · ${groups.length} 个分区</span>
        </div>
        <h2 class="p-title">${esc(p.name)}</h2>
        <p class="p-desc">${esc(p.description)}</p>
        <p class="sub-hint">中心是它自己，周围按分区摆放细分知识点，编号就是建议学习顺序。拖动旋转、滚轮推进，点一个子节点看说明。</p>
        ${sections}
      </div>`;
    panel.classList.add('open');
    const sc = panel.querySelector('.p-scroll');
    if (sc) sc.scrollTop = 0;
  };

  KB.renderSubChild = function (node) {
    const parent = KB.byId[KB.state.subOf];
    if (!parent) return;
    const panel = KB.getPanel();
    panel.innerHTML = `
      <div class="p-tools"><button class="panel-close" data-close aria-label="关闭详情">✕</button></div>
      <div class="p-scroll">
        <button class="p-back" data-exit-sub>← 返回总图</button>
        <button class="p-back" data-sub-back>← ${esc(parent.name)} · 内部结构</button>
        <div class="p-layer">
          <span class="p-stack"><i class="on"></i><i class="on"></i></span>
          <span>第 ${node._step} 步</span>
          <span class="p-depth">${esc(node.group || '')}</span>
        </div>
        <h2 class="p-title">${esc(node.name)}</h2>
        <p class="p-desc">${esc(node.desc || '这个细分知识点暂时只有名字。')}</p>
        <p class="sub-hint">属于「${esc(parent.name)}」。在左侧 3D 模型里它是被点亮的那个球，编号 ${node._step} 是它在这个节点内部的学习顺序。</p>
      </div>`;
    document.body.classList.remove('panel-collapsed');
    panel.classList.add('open');
  };
})();
