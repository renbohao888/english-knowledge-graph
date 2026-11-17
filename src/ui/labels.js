/* ============================================================
 * 屏幕标签层
 * - 节点名：把 3D 坐标投影成屏幕坐标，用 HTML 渲染（永远正对镜头）
 * - 连线关系：取两端中点，把 relation 写在线上
 * 两者共用一套"防重叠"占位逻辑：先放节点名，再在空隙里放关系。
 * ============================================================ */
window.KB = window.KB || {};

const nodeEls = new Map();
const nodeW = new Map();
const haloEls = new Map();

function rgba(hex, a) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
const edgeEls = [];        // 与 dataLinks 中非 learn 连线一一对应
const boxes = [];          // 本帧已占用的矩形
let dataNodes = null;      // 当前渲染的节点集（总图 / 节点内部共用这套标签）
let dataLinks = null;
let nodeVec = null;
let edgeVec = null;

/* 总览时只留最长的几条，拉近后再逐步放出更多关系文字 */
const EDGE_FAR = 10;
const EDGE_NEAR = 24;
const EDGE_MIN_LEN = 70;

KB.buildLabels = function (nodes, links) {
  dataNodes = nodes || KB.NODES;
  dataLinks = links || KB.graphLinks;
  const layer = document.getElementById('labels');
  layer.innerHTML = '';
  nodeEls.clear();
  nodeW.clear();

  /* 先放光晕，再放文字，光晕在底层 */
  haloEls.clear();
  dataNodes.forEach(n => {
    const halo = document.createElement('div');
    halo.className = 'node-halo';
    const c = n._sub
      ? KB.subColorOf(n._idx, KB._subCount || 1, KB._subGroups || 1)
      : (KB.STATUS_COLOR[n.status] || '#9fb3cc');
    halo.style.background = `radial-gradient(circle, ${rgba(c, 0.55)} 0%, ${rgba(c, 0.18)} 42%, ${rgba(c, 0)} 70%)`;
    const size = 34 + Math.min(n._deg || 0, 8) * 4;
    halo.style.width = size + 'px';
    halo.style.height = size + 'px';
    layer.appendChild(halo);
    haloEls.set(n.id, halo);
  });

  dataNodes.forEach(n => {
    const el = document.createElement('div');
    el.className = 'node-label';
    el.textContent = n.name;
    layer.appendChild(el);
    nodeEls.set(n.id, el);
    nodeW.set(n.id, 0);
  });

  /* 每条架构连线一个标签元素（学习路径不标，避免噪音） */
  edgeEls.length = 0;
  dataLinks.forEach(l => {
    if (l.learn) { edgeEls.push(null); return; }
    const el = document.createElement('div');
    el.className = 'edge-label';
    el.textContent = l.relation || '';
    layer.appendChild(el);
    edgeEls.push(el);
  });

  /* 选中节点的光环 */
  const ring = document.createElement('div');
  ring.id = 'selRing';
  layer.appendChild(ring);

  /* 文本宽度只需量一次 */
  requestAnimationFrame(() => {
    dataNodes.forEach(n => {
      const el = nodeEls.get(n.id);
      if (el) nodeW.set(n.id, el.offsetWidth || n.name.length * 11);
    });
  });
};

function project(node, cam, w, h) {
  if (!nodeVec) nodeVec = KB.graph.camera().position.clone();
  nodeVec.set(node.x || 0, node.y || 0, node.z || 0).project(cam);
  return {
    x: (nodeVec.x * 0.5 + 0.5) * w,
    y: (-nodeVec.y * 0.5 + 0.5) * h,
    z: nodeVec.z
  };
}

function projectPoint(x, y, z, cam, w, h) {
  if (!edgeVec) edgeVec = KB.graph.camera().position.clone();
  edgeVec.set(x, y, z).project(cam);
  return {
    x: (edgeVec.x * 0.5 + 0.5) * w,
    y: (-edgeVec.y * 0.5 + 0.5) * h,
    z: edgeVec.z
  };
}

function overlaps(box) {
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (!(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2)) return true;
  }
  return false;
}

KB.tickLabels = function (cam) {
  const st = KB.state;
  const w = window.innerWidth, h = window.innerHeight;
  boxes.length = 0;

  /* 选中节点的光环 */
  const ring = document.getElementById('selRing');
  if (ring) {
    const selNode = st.selected ? KB.byId[st.selected] : null;
    if (selNode && selNode.__threeObj) {
      if (!nodeVec) nodeVec = cam.position.clone();
      nodeVec.copy(selNode.__threeObj.position).project(cam);
      if (nodeVec.z < 1) {
        ring.style.transform = `translate(${((nodeVec.x * 0.5 + 0.5) * w).toFixed(1)}px,${((-nodeVec.y * 0.5 + 0.5) * h).toFixed(1)}px) translate(-50%,-50%)`;
        ring.classList.add('on');
      } else {
        ring.classList.remove('on');
      }
    } else {
      ring.classList.remove('on');
    }
  }

  /* ---------- 节点名 ---------- */
  if (st.labels) {
    const items = [];
    const nodes = dataNodes || KB.NODES;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const el = nodeEls.get(n.id);
      if (!el) continue;
      const obj = n.__threeObj;
      if (!obj) { el.style.opacity = '0'; continue; }

      const p = project(obj.position, cam, w, h);
      const halo = haloEls.get(n.id);
      if (p.z > 1 || p.x < -0.06 * w || p.x > 1.06 * w || p.y < -0.06 * h || p.y > 1.06 * h) {
        el.style.opacity = '0';
        if (halo) halo.style.opacity = '0';
        continue;
      }

      let prio = 1, op = 0.68, hOp = 0.45, hScale = 1;
      if (st.subOf) {
        /* 节点内部模式：子知识点都亮着；分区名（锚点）中等亮度且优先显示 */
        if (n._anchor) { prio = 3; op = 0.8; hOp = 0; }
        else if (st.hover === n.id) { prio = 4; op = 1; hOp = 1; hScale = 1.15; }
        else { prio = 1; op = 0.9; hOp = 0.4; }
      } else if (st.selected === n.id || st.hover === n.id) { prio = 4; op = 1; hOp = 1; hScale = st.selected === n.id ? 1.7 : 1.25; }
      else if (st.focus && KB.inFocusSet(n.id)) { prio = 2; op = 0.9; hOp = 0.85; }
      else if (st.focus) { prio = 0; op = 0.1; hOp = 0.08; }
      else if (st.selected) {
        const nb = KB.neighborMap.get(st.selected) || [];
        if (nb.some(e => e.id === n.id)) { prio = 3; op = 0.95; hOp = 0.8; hScale = 1.15; }
        else { prio = 0; op = 0.32; hOp = 0.12; }
      }
      else if (st.path) {
        if (KB._pathSet && KB._pathSet.has(n.id)) { prio = 2.5; op = 0.96; hOp = 0.7; }
        else { prio = 0; op = 0.08; hOp = 0.03; }
      }
      else if (st.track && !n.tracks.includes(st.track)) { prio = 0; op = 0.14; hOp = 0.04; }
      else if (!KB.matches(n)) { prio = 0; op = 0.16; hOp = 0.08; }

      if (halo) {
        halo.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${hScale})`;
        if (!KB._orbiting) halo.style.opacity = String(hOp);
      }

      /* 选中的点更大，名字抬高一点，别压在球和光环上 */
      const yOff = (st.selected === n.id) ? -40 : -13;
      items.push({ n, el, x: p.x, y: p.y + yOff, prio, op, hot: st.selected === n.id || st.hover === n.id });
    }

    if (KB._orbiting) {
      /* 轨道动画期间只移动，不重排：省掉排序和包围盒检测，避免掉帧 */
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        it.el.style.transform = `translate3d(${it.x.toFixed(1)}px,${it.y.toFixed(1)}px,0) translate(-50%,-50%)`;
        it.el.classList.toggle('is-hot', it.hot);
      }
    } else {
      items.sort((a, b) => (b.prio - a.prio) || ((b.n._deg || 0) - (a.n._deg || 0)) ||
        (a.n.id < b.n.id ? -1 : 1));

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        it.el.style.transform = `translate3d(${it.x.toFixed(1)}px,${it.y.toFixed(1)}px,0) translate(-50%,-50%)`;
        it.el.classList.toggle('is-hot', it.hot);

        /* 学习路线模式：节点名前面带上它在路线里的步骤序号 */
        const stepNo = st.path && KB._pathIdx ? KB._pathIdx.get(it.n.id)
          : ((st.subOf && it.n._step) ? it.n._step : 0);
        const text = stepNo ? stepNo + '. ' + it.n.name : it.n.name;
        if (it.el.textContent !== text) {
          it.el.textContent = text;
          nodeW.set(it.n.id, it.el.offsetWidth || text.length * 11);
        }

        const halfW = ((nodeW.get(it.n.id) || it.n.name.length * 11) / 2) + 8;
        const box = { x1: it.x - halfW, x2: it.x + halfW, y1: it.y - 11, y2: it.y + 11 };
        if (overlaps(box)) { it.el.style.opacity = '0'; continue; }
        boxes.push(box);
        it.el.style.opacity = String(it.op);
      }
    }
  } else {
    nodeEls.forEach(el => { el.style.opacity = '0'; });
  }

  /* ---------- 连线关系 ---------- */
  if (KB._orbiting) return;   // 轨道动画期间由 CSS 隐藏，跳过整段计算
  const showEdges = st.relations;
  const cands = [];
  const links = dataLinks || KB.graphLinks;
  const byId = st.subOf ? (KB.subById || Object.create(null)) : KB.byId;
  for (let i = 0; i < links.length; i++) {
    const el = edgeEls[i];
    if (!el) continue;
    if (!showEdges || st.subOf) { el.style.opacity = '0'; continue; }

    const l = links[i];
    const a = byId[KB.idOf(l.source)], b = byId[KB.idOf(l.target)];
    if (!a || !b) { el.style.opacity = '0'; continue; }
    /* 路线模式下关系文字会让链路太乱，全部收起 */
    if (st.path) { el.style.opacity = '0'; continue; }
    /* 方向模式下，只给两端都在这个方向的连线写关系文字 */
    if (st.track && !(a.tracks.includes(st.track) && b.tracks.includes(st.track))) {
      el.style.opacity = '0';
      continue;
    }

    const mx = ((a.x || 0) + (b.x || 0)) / 2;
    const my = ((a.y || 0) + (b.y || 0)) / 2;
    const mz = ((a.z || 0) + (b.z || 0)) / 2;
    const p = projectPoint(mx, my, mz, cam, w, h);
    if (p.z > 1 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) { el.style.opacity = '0'; continue; }

    /* 屏幕上的两点距离，太短就没地方写字 */
    const pa = project(a, cam, w, h);
    const pb = project(b, cam, w, h);
    const len = Math.hypot(pa.x - pb.x, pa.y - pb.y);
    if (len < EDGE_MIN_LEN) { el.style.opacity = '0'; continue; }

    /* 选中某个节点时，近距离的连线文字会互相压字、糊住中心，
       关系已经列在右侧面板里，这里全部收起来。 */
    if (st.selected) { el.style.opacity = '0'; continue; }
    const hot = KB.isHotLink(l);
    cands.push({ el, x: p.x, y: p.y, len, hot, rel: l.relation || '' });
  }

  cands.sort((a, b) => (Number(b.hot) - Number(a.hot)) || (b.len - a.len));

  const camPos = KB.graph.cameraPosition();
  const camDist = Math.hypot(camPos.x || 0, camPos.y || 0, camPos.z || 0);
  const limit = camDist < 950 ? EDGE_NEAR : EDGE_FAR;

  let shown = 0;
  for (let i = 0; i < cands.length; i++) {
    const c = cands[i];
    if (shown >= limit && !c.hot) { c.el.style.opacity = '0'; continue; }

    c.el.style.transform = `translate3d(${c.x.toFixed(1)}px,${c.y.toFixed(1)}px,0) translate(-50%,-50%)`;
    c.el.classList.toggle('is-hot', c.hot);

    const halfW = Math.min(c.rel.length * 5.2, 90) + 6;
    const box = { x1: c.x - halfW, x2: c.x + halfW, y1: c.y - 8, y2: c.y + 8 };
    if (overlaps(box)) { c.el.style.opacity = '0'; continue; }
    boxes.push(box);
    c.el.style.opacity = c.hot ? '1' : '0.62';
    shown++;
  }
};

/* 层刻度已移除：它是跟着 3D 投影动的，文字会缩放漂移。
   分层图例固定在左侧栏里，不再跟着模型转。 */
