/* ============================================================
 * 3D 图：初始化、样式访问器、相机运动
 * 渲染由 3d-force-graph（底层 Three.js / WebGL）完成。
 * ============================================================ */
window.KB = window.KB || {};

/* ---------- 样式访问器 ---------- */
KB.nodeSize = function (n) {
  const s = n._s == null ? 1 : n._s;                   // 逐帧缓动的缩放，避免选中时"啪"地变大
  const base = (1.2 + Math.min(n._deg || 0, 8) * 0.9) * s;
  const sel = KB.state.selected;
  if (!sel) return base;
  if (n.id === sel) return base * 1.12;
  const nb = KB.neighborMap.get(sel) || [];
  if (nb.some(e => e.id === n.id)) return base * 1.06;
  return base;
};

KB.stepNodeScale = function () {
  const st = KB.state;
  const list = st.subOf ? (KB.subNodes || []) : KB.NODES;
  const nb = (!st.subOf && st.selected)
    ? new Set((KB.neighborMap.get(st.selected) || []).map(e => e.id)) : null;
  for (let i = 0; i < list.length; i++) {
    const n = list[i];
    let target = 1;
    if (st.subOf) {
      if (n._center || n._anchor) target = 1;
      else if (st.subChild === n.id) target = 1.5;
      else if (st.hover === n.id) target = 1.18;
    } else {
      if (st.selected === n.id) target = 1.5;
      else if (st.hover === n.id) target = 1.18;
      else if (nb && nb.has(n.id)) target = 1.12;
    }
    const cur = n._s == null ? 1 : n._s;
    const next = cur + (target - cur) * 0.16;
    n._s = Math.abs(next - target) < 0.002 ? target : next;
  }
};

KB.colorOfNode = function (n) {
  const s = KB.state;
  /* 方向模式：同一种颜色代表同一条路径，亮度代表掌握度（越亮越该补） */
  if (s.track) {
    if (!n.tracks.includes(s.track)) return KB.fade('#8fa3c0', 0.9);
    if (!KB.matches(n) || (s.focus && !KB.inFocusSet(n.id))) {
      return KB.fade(KB.TRACKS[s.track].color, 0.82);
    }
    const t = KB.STATUS_TINT[KB.effStatus(n)];
    return KB.fade(KB.TRACKS[s.track].color, t != null ? t : 0.2);
  }
  const base = KB.STATUS_COLOR[KB.effStatus(n)] || '#9fb3cc';

  /* 学习路线模式：只点亮这条链路上的节点 */
  if (s.path) {
    const inPath = KB._pathSet && KB._pathSet.has(n.id);
    if (!inPath) return KB.fade(base, 0.87);
    if (s.selected === n.id) return base;
    return base;
  }

  if (s.focus) {
    if (!KB.inFocusSet(n.id)) return KB.fade(base, 0.86);
    if (!KB.matches(n)) return KB.fade(base, 0.6);
    return base;
  }

  /* 选中一个节点：它自己全亮，直接相连的"前后置"只是略暗，
     其余几乎隐掉——这样旋转过去时，周围清清楚楚就是它的关系网。 */
  if (s.selected) {
    if (n.id === s.selected) return base;
    const nb = KB.neighborMap.get(s.selected) || [];
    if (nb.some(e => e.id === n.id)) return KB.fade(base, 0.08);
    if (!KB.matches(n)) return KB.fade(base, 0.78);
    return KB.fade(base, 0.62);
  }

  if (!KB.matches(n)) return KB.fade(base, 0.74);
  return base;
};

KB.colorOfLink = function (l) {
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  /* 学习路线模式：只留链路两端都在路线上的连线 */
  if (KB.state.path) {
    const A = KB.byId[s], B = KB.byId[t];
    const inA = A && KB._pathSet && KB._pathSet.has(s);
    const inB = B && KB._pathSet && KB._pathSet.has(t);
    if (!(inA && inB)) return KB.BG;
    return l.learn ? KB.fade('#d9b45a', 0.32) : KB.fade('#5cc8ff', 0.5);
  }
  if (l.learn) return KB.learnVisible(l) ? KB.fade('#d9b45a', 0.3) : KB.BG;
  if (KB.isHotLink(l)) return KB.LINK_HOT;
  const a = KB.byId[s], b = KB.byId[t];
  if (KB.state.track) {
    const inA = a && a.tracks.includes(KB.state.track);
    const inB = b && b.tracks.includes(KB.state.track);
    if (inA && inB) return KB.fade(KB.TRACKS[KB.state.track].color, 0.5);
    /* 不在本方向的连线直接隐掉，避免出现"有线条、线头却没有节点" */
    return KB.BG;
  }
  if (KB.state.focus && !(KB.inFocusSet(s) && KB.inFocusSet(t))) return KB.fade(KB.LINK_BASE, 0.86);
  if (KB.state.selected && !KB.isHotLink(l)) return KB.fade(KB.LINK_BASE, 0.82);
  if (!KB.matches(a) || !KB.matches(b)) return KB.fade(KB.LINK_BASE, 0.8);
  return KB.fade(KB.LINK_BASE, 0.42);
};

KB.particleCount = function (l) {
  if (KB.state.path) {
    const s = KB.idOf(l.source), t = KB.idOf(l.target);
    const A = KB.byId[s], B = KB.byId[t];
    if (!(A && B && KB._pathSet && KB._pathSet.has(s) && KB._pathSet.has(t))) return 0;
    return l.learn ? 3 : 1;
  }
  if (l.learn) return KB.learnVisible(l) ? 3 : 0;
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  if (KB.state.track) {
    const a = KB.byId[s], b = KB.byId[t];
    const inA = a && a.tracks.includes(KB.state.track);
    const inB = b && b.tracks.includes(KB.state.track);
    if (!(inA && inB)) return 0;
    return KB.isHotLink(l) ? 4 : 1;
  }
  if (KB.state.focus && !(KB.inFocusSet(s) && KB.inFocusSet(t))) return 0;
  if (KB.state.selected && !KB.isHotLink(l)) return 0;
  if (!KB.matches(KB.byId[s]) || !KB.matches(KB.byId[t])) return 0;
  return KB.isHotLink(l) ? 4 : 1;
};

/* ---------- 3D 布局 ----------
 * plane：13 层钉在水平面上，最扁平，层与层一眼可分
 * helix：每层变成一圈，按层从下往上叠成螺旋塔，侧面看有真实的纵深
 * free ：不钉层高，纯力导向，像星云；层只做很弱的纵向引导
 * 三种布局共用同一套节点/连线，切换只改 fy 和两个自定义力。
 */
KB.LAYOUT_NAMES = { plane: '分层平面', helix: '立体螺旋', free: '自由星云' };
const LAYOUT_KEY = 'kb.layout.v1';

function layerIdx(n) {
  const i = KB.LAYERS.indexOf(n.layer);
  return i < 0 ? 0 : i;
}

function layoutGap(layout) {
  if (layout === 'helix') return 92;   // 螺旋塔矮一点、宽一点，横向才有纵深
  if (layout === 'free') return 108;
  return KB.LAYER_GAP;
}

function layerBaseY(i, layout) {
  return (i - (KB.LAYERS.length - 1) / 2) * layoutGap(layout);
}

/* 每层一圈：半径按层号做纺锤形（两端窄、中间宽），层与层之间错开角度，
   相邻层的节点不会在一条竖直线上，从任何角度看都有层次。 */
function ringTargets() {
  const N = KB.LAYERS.length;
  const groups = new Map(KB.LAYERS.map(l => [l, []]));
  KB.NODES.forEach(n => {
    const arr = groups.get(KB.LAYERS[layerIdx(n)]);
    if (arr) arr.push(n);
  });
  groups.forEach(arr => arr.sort((a, b) =>
    a.domain === b.domain ? (a.id < b.id ? -1 : 1) : (a.domain < b.domain ? -1 : 1)
  ));
  const out = new Map();
  groups.forEach((arr, layer) => {
    const gi = KB.LAYERS.indexOf(layer);
    const t = N > 1 ? gi / (N - 1) : 0;
    const R = 210 + 320 * Math.pow(Math.sin(Math.PI * t), 0.9);
    const rot = gi * 0.62;
    /* 每层不是一圈空心环，而是从中心旋出的螺旋臂：
       半径随序号从内到外展开，角度转 1.2 圈，盘子更"实"，
       钻进模型内部时四周也有节点，不至于一片空。 */
    arr.forEach((n, idx) => {
      const f = arr.length === 1 ? 0.7 : (idx + 0.5) / arr.length;
      const rad = 70 + (R - 70) * Math.pow(f, 0.75);
      const a = rot + f * Math.PI * 2.4;
      out.set(n.id, { x: Math.cos(a) * rad, z: Math.sin(a) * rad });
    });
  });
  return out;
}

KB.applyLayout = function (layout, opts) {
  if (!KB.LAYOUT_NAMES[layout]) layout = 'helix';
  KB.state.layout = layout;
  try { localStorage.setItem(LAYOUT_KEY, layout); } catch (e) { /* 隐私模式 */ }

  const rings = ringTargets();
  /* 模型半径：后面限制"穿行"时镜头别飞太远 */
  let cloudR = 0;
  rings.forEach(p => { cloudR = Math.max(cloudR, Math.hypot(p.x, p.z)); });
  const midY = Math.abs(layerBaseY(0, layout));
  KB._cloudR = Math.max(cloudR, midY) + 120;
  KB.NODES.forEach(n => {
    n._baseY = layerBaseY(layerIdx(n), layout);
    n._ring = rings.get(n.id) || { x: 0, z: 0 };
    n.vx = n.vy = n.vz = 0;
    if (layout === 'free') {
      n.fy = null;
      n.y = n._baseY;
      if (opts && opts.reposition) { n.x = n._ring.x; n.z = n._ring.z; }
    } else {
      n.fy = n._baseY;
      if (layout === 'helix') {
        n.y = n._baseY;
        n.x = n._ring.x;
        n.z = n._ring.z;
      }
    }
  });

  if (KB.graph && KB._graphReady) {
    /* 自由星云需要更大的斥力把节点摊开，才有星云那种体积感 */
    const charge = KB.graph.d3Force('charge');
    if (charge) charge.strength(layout === 'free' ? -1050 : -820).distanceMax(1800);
    KB.graph.d3ReheatSimulation();
    if (!(opts && opts.fit === false)) {
      const target = layout;
      setTimeout(() => { if (KB.state.layout === target) KB.fitView(); }, 900);
    }
  }
};

/* 三个布局力：每个只在自己那一档生效，注册一次即可 */
function forceZ(alpha) {
  if (KB.state.layout !== 'plane') return;
  const k = 0.22 * alpha;
  for (let i = 0; i < KB.NODES.length; i++) KB.NODES[i].vz += (0 - KB.NODES[i].z) * k;
}
function forceRing(alpha) {
  if (KB.state.layout !== 'helix') return;
  const k = 0.45 * alpha;
  for (let i = 0; i < KB.NODES.length; i++) {
    const n = KB.NODES[i];
    if (!n._ring) continue;
    n.vx += (n._ring.x - n.x) * k;
    n.vz += (n._ring.z - n.z) * k;
  }
}
function forceYSoft(alpha) {
  if (KB.state.layout !== 'free') return;
  const k = 0.035 * alpha;
  for (let i = 0; i < KB.NODES.length; i++) {
    const n = KB.NODES[i];
    n.vy += (n._baseY - n.y) * k;
  }
}
forceZ.initialize = forceRing.initialize = forceYSoft.initialize = () => {};

/* ---------- 旋转中心与空闲自转 ---------- */
KB._lastAct = performance.now();

/* 任何拖动/滚轮前把轨道中心拉回模型中心，保持视线方向不变 */
KB.recenterOrbit = function () {
  const g = KB.graph;
  if (!g) return;
  const cam = g.camera();
  const c = g.controls();
  if (!cam || !c) return;
  /* 节点内部 3D 的旋转中心固定在原点，拖动时不再跑偏 */
  const center = KB.state.subOf ? { x: 0, y: 0, z: 0 } : (KB._modelCenter || { x: 0, y: 0, z: 0 });
  const t = c.target;
  const dist = Math.hypot(cam.position.x - center.x, cam.position.y - center.y, cam.position.z - center.z);
  if (dist < 2) return;
  let fx = t.x - cam.position.x, fy = t.y - cam.position.y, fz = t.z - cam.position.z;
  const fl = Math.hypot(fx, fy, fz) || 1;
  fx /= fl; fy /= fl; fz /= fl;
  c.target.set(center.x, center.y, center.z);
  cam.position.set(center.x - fx * dist, center.y - fy * dist, center.z - fz * dist);
  c.update();
};

/* 空闲一会儿后让模型自己慢慢转；用户一动就立刻停下，过几秒再恢复 */
KB.autoOrbitTick = function () {
  const now = performance.now();
  const dt = Math.min(0.05, Math.max(0, (now - (KB._autoLast || now)) / 1000));
  KB._autoLast = now;
  if (!KB.graph || KB.state.mode !== '3d') return;
  /* 节点内部 3D 不自动转：中心固定，用户拖哪里就停在哪里 */
  if (KB.state.subOf) return;
  if (KB._orbiting || KB._flying || KB._wheelEasing) return;
  if (now - (KB._lastAct || 0) < 3200) return;
  const cam = KB.graph.camera();
  const c = KB.graph.controls();
  if (!cam || !c) return;
  const center = KB._modelCenter || { x: 0, y: 0, z: 0 };
  if (Math.hypot(c.target.x - center.x, c.target.y - center.y, c.target.z - center.z) > 6) return;
  const dx = cam.position.x - center.x, dz = cam.position.z - center.z;
  const r = Math.hypot(dx, dz);
  if (r < 60) return;
  const a = 0.05 * dt;                        // 约 3°/秒，和帧率无关
  const ca = Math.cos(a), sa = Math.sin(a);
  cam.position.x = center.x + dx * ca - dz * sa;
  cam.position.z = center.z + dx * sa + dz * ca;
  cam.lookAt(c.target);
  c.update();
};

/* 用户一操作就记时间，自转暂停；拖动前先回中 */
(function bindActivity () {
  const mark = () => { KB._lastAct = performance.now(); };
  window.addEventListener('pointerdown', (e) => {
    if (!e.target.closest || !e.target.closest('#graph canvas')) return;
    mark();
    KB.recenterOrbit();
  }, true);
  window.addEventListener('wheel', (e) => {
    if (!e.target.closest || !e.target.closest('#graph canvas')) return;
    mark();
  }, { capture: true, passive: true });
  window.addEventListener('touchstart', (e) => {
    if (!e.target.closest || !e.target.closest('#graph canvas')) return;
    mark();
  }, { capture: true, passive: true });
})();

/* ---------- 初始化 ---------- */
KB.initGraph = function () {
  const g = ForceGraph3D({ controlType: 'orbit' })(document.getElementById('graph'));

  g.backgroundColor(KB.BG)
    .showNavInfo(false)
    .nodeRelSize(6.2)
    .nodeResolution(14)
    .nodeOpacity(1)
    .nodeVal(KB.nodeSize)
    .nodeColor(KB.colorOfNode)
    .nodeLabel(() => '')
    .linkColor(KB.colorOfLink)
    .linkOpacity(0.95)
    .linkDirectionalParticles(KB.particleCount)
    .linkDirectionalParticleWidth(l => l.learn ? 1.9 : (KB.isHotLink(l) ? 2.4 : 1.1))
    .linkDirectionalParticleSpeed(l => l.learn ? 0.005 : (KB.isHotLink(l) ? 0.011 : 0.0032))
    .linkDirectionalParticleColor(l => l.learn ? '#e8c777' : (KB.isHotLink(l) ? '#9fe8ff' : 'rgba(120,170,230,.5)'))
    .onNodeClick(KB.handleNodeClick)
    .onNodeHover(KB.handleNodeHover)
    .onLinkHover(KB.handleLinkHover)
    .onBackgroundClick(KB.handleBackgroundClick)
    .onEngineStop(KB.handleEngineStop);

  g.d3Force('charge').strength(-820).distanceMax(1800);
  g.d3Force('link')
    .distance(l => {
      if (l.learn) return 40;
      const free = KB.state.layout === 'free';
      if (KB.sameLayerLink(l)) return free ? 105 : 85;
      return free ? 180 : 150;
    })
    .strength(l => l.learn ? 0 : 0.4);    // 学习路径不参与布局

  /* 三种布局各注册一个力，布局切换只靠 state.layout 决定谁生效 */
  g.d3Force('z', forceZ);
  g.d3Force('ring', forceRing);
  g.d3Force('ysoft', forceYSoft);

  g.d3AlphaDecay(0.026).warmupTicks(70).cooldownTicks(170);

  /* 偏广一点的视角 + 斜方位，透视更强，模型看起来才有立体感 */
  if (g.camera()) { g.camera().fov = 55; g.camera().updateProjectionMatrix(); }
  g.cameraPosition({ x: 860, y: 420, z: 1080 }, { x: 0, y: 0, z: 0 }, 0);

  /* 滚轮分两段：先把镜头推到最近距离，之后继续滚就是"向前穿行"，
     左键拖拽转向、右键拖拽平移。手机双指缩放仍走 OrbitControls。 */
  KB.installWheelControl(g);

  KB.graph = g;

  /* 上次用的布局（默认立体螺旋），先摆好初始坐标再灌数据 */
  let saved = 'helix';
  try { saved = localStorage.getItem(LAYOUT_KEY) || 'free'; } catch (e) { /* 隐私模式 */ }
  KB.applyLayout(saved, { fit: false });
  const ls = document.getElementById('layoutSelect');
  if (ls) ls.value = saved;

  g.graphData({ nodes: KB.NODES, links: KB.graphLinks });
  KB._graphReady = true;
  return g;
};

/* 布局切换入口：右上角「布局」下拉框调用 */
KB.setLayout = function (layout) {
  if (KB.state.subOf) KB.exitSubModel(true);
  KB.applyLayout(layout, { reposition: true });
  const ls = document.getElementById('layoutSelect');
  if (ls) ls.value = layout;
  KB.showToast('布局：' + (KB.LAYOUT_NAMES[layout] || layout));
};

/* 滚轮：先缩放，贴近后转为穿行。
   镜头不是每个滚轮事件瞬移一步，而是维护一个"目标位置"，
   每一帧向它做指数缓动，所以在低滚轮事件频率下也始终是平滑的。
   缩放到"最近视距"（STOP_DIST）之前，滚轮改变镜头与注视点的距离；
   之后继续向前，镜头和注视点一起沿视线前移，像走进模型内部。
   向后滚动时原路退回，退到边界会掉头看向模型中心。
   手机的双指缩放不受影响。 */
KB.installWheelControl = function (g) {
  const canvas = g.renderer().domElement;
  const controls = g.controls();
  const cam = g.camera();
  if (!canvas || !controls || !cam) return;

  /* 让 OrbitControls 不再自己处理滚轮（否则会和我们重复放大），
     但保留它的触摸缩放。 */
  if (controls._onMouseWheel) canvas.removeEventListener('wheel', controls._onMouseWheel);

  const STOP_DIST = 150;   // 放大到这里就停住，改为穿行
  const MAX_DIST = 4200;
  const TIME_CONST = 0.16; // 缓动时间常数（秒），越小越跟手
  const want = { pos: cam.position.clone(), target: controls.target.clone() };
  const dir = cam.position.clone();
  const aim = cam.position.clone();
  let flying = false;      // 是否已经在"穿行"阶段
  let easing = false;
  let rafId = 0;
  let lastT = 0;
  let fxTimer = 0;

  const magOf = (deltaY) => Math.min(1.6, Math.max(0.4, Math.abs(deltaY) / 120));
  const stepOf = (r, mag) => Math.min(180, Math.max(26, r * 0.4)) * mag;

  function syncWant() {
    want.pos.copy(cam.position);
    want.target.copy(controls.target);
  }

  function stopEase() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    easing = false;
    KB._wheelEasing = false;
  }

  function easeStep(now) {
    if (!easing) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - lastT) / 1000));
    lastT = now;
    const tc = flying ? 0.24 : 0.14;
    const k = 1 - Math.exp(-dt / tc);
    cam.position.lerp(want.pos, k);
    controls.target.lerp(want.target, k);
    controls.update();
    if (cam.position.distanceTo(want.pos) > 0.4 || controls.target.distanceTo(want.target) > 0.4) {
      rafId = requestAnimationFrame(easeStep);
    } else {
      cam.position.copy(want.pos);
      controls.target.copy(want.target);
      controls.update();
      rafId = 0;
      easing = false;
      KB._wheelEasing = false;
    }
  }

  function runEase() {
    if (easing) return;
    easing = true;
    KB._wheelEasing = true;
    lastT = performance.now();
    rafId = requestAnimationFrame(easeStep);
  }

  /* 飞行期间把 HTML 标签层藏起来：少掉每帧 300 多个 DOM 重排，画面更稳 */
  function markFlight() {
    KB._flying = true;
    document.body.classList.add('flying-view');
    clearTimeout(fxTimer);
    fxTimer = setTimeout(() => {
      KB._flying = false;
      document.body.classList.remove('flying-view');
    }, 280);
  }

  /* 用户手动拖拽时立刻停下缓动，交给 OrbitControls */
  function cancelFly() {
    stopEase();
    flying = false;      // 相机被外部重置（取景/选方向）后，下次滚轮重新从"缩放"开始
    syncWant();
    KB._flying = false;
    document.body.classList.remove('flying-view');
    clearTimeout(fxTimer);
  }
  KB._cancelFly = cancelFly;
  canvas.addEventListener('pointerdown', cancelFly, { passive: true });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!easing) syncWant();   // 缓动结束后从真实镜头状态出发；缓动中则继续累加目标

    const r = want.pos.distanceTo(want.target);
    if (!isFinite(r) || r <= 0) return;
    /* 相机被取景搬远后，之前的"穿行"状态作废，先恢复缩放 */
    if (flying && r > STOP_DIST + 2) flying = false;
    dir.subVectors(want.target, want.pos).normalize();
    const mag = magOf(e.deltaY);

    if (e.deltaY < 0) {
      /* 节点内部 3D：只缩放、不穿行，保证旋转中心始终固定在原点 */
      if (KB.state.subOf) {
        const r2 = Math.max(STOP_DIST, r * Math.exp(-mag * 0.42));
        want.pos.addScaledVector(dir, r - r2);
        want.target.set(0, 0, 0);
      } else if (!flying && r > STOP_DIST + 1) {
        /* 向前：还远就先缩小视距，贴近后改为前移 */
        const r2 = Math.max(STOP_DIST, r * Math.exp(-mag * 0.42));
        want.pos.addScaledVector(dir, r - r2);
      } else {
        KB._subOutHits = 0;
        if (!flying && !KB._flyHinted) {
          KB._flyHinted = true;
          KB.showToast('已进入穿行：滚轮前后移动 · 左键转向 · 右键平移');
        }
        flying = true;
        const step = stepOf(r, mag) * (KB.state.subOf ? 0.72 : 1);
        /* 第一人称直线前进：不自动拐弯，只保留最外圈的软边界 */
        const next = want.pos.clone().addScaledVector(dir, step);
        const limit = (KB._cloudR || 900) + 260;
        if (next.length() <= limit) {
          want.pos.copy(next);
          want.target.addScaledVector(dir, step);
        } else {
          /* 到边界：把视线转回模型中心，让穿行能继续，而不是卡住不动 */
          const inward = want.pos.clone().negate().normalize();
          want.target.copy(want.pos).addScaledVector(inward, Math.max(STOP_DIST, r));
          const now = performance.now();
          if (!KB._edgeNoteAt || now - KB._edgeNoteAt > 2600) {
            KB._edgeNoteAt = now;
            KB.showToast('已到模型边界：自动转向中心，可继续滚轮前进或后退');
          }
        }
      }
    } else {
      /* 向后：穿行阶段就沿原路后退；退到模型边界掉头，之后恢复常规缩放 */
      if (flying && !KB.state.subOf) {
        const step = stepOf(r, mag);
        const next = want.pos.clone().addScaledVector(dir, -step);
        const limit = (KB._cloudR || 900) + 100;
        if (next.length() > limit) {
          flying = false;
          const inward = want.pos.clone().negate().normalize();
          want.target.copy(want.pos).addScaledVector(inward, Math.max(STOP_DIST, r));
        } else {
          want.pos.copy(next);
          want.target.addScaledVector(dir, -step);
        }
      } else {
        let r2 = Math.min(MAX_DIST, r * Math.exp(mag * 0.38));
        if (KB.state.subOf && KB._subEnterDist) {
          const enterD = KB._subEnterDist;
          /* 先收回子模型根视图；已经在根视图还继续缩，才退回这个节点的聚焦视图 */
          if (r > enterD * 1.02) {
            r2 = Math.min(r2, enterD);
          } else if (r2 > enterD * 1.15) {
            KB._subOutHits = (KB._subOutHits || 0) + 1;
            if (KB._subOutHits >= 2) { KB.leaveSubToNode(); return; }
            r2 = enterD;
          }
        }
        want.pos.addScaledVector(dir, -(r2 - r));
      }
    }

    runEase();
    markFlight();
  }, { passive: false });
};

KB.sameLayerLink = function (l) {
  const a = KB.byId[KB.idOf(l.source)], b = KB.byId[KB.idOf(l.target)];
  return !!(a && b && a.layer === b.layer);
};

/* 重新推一遍样式（3D 属性访问器每帧都会重算，这里保证即时生效） */
KB.refreshStyles = function () {
  if (!KB.graph) return;
  if (KB.state.subOf) return;   // 节点内部 3D 有自己的样式访问器
  KB.graph
    .nodeColor(KB.colorOfNode)
    .linkColor(KB.colorOfLink)
    .linkDirectionalParticles(KB.particleCount);
  KB.updateMatchStat();
  if (KB.twoDRefresh) KB.twoDRefresh();
};

/* ---------- 相机 ---------- */
KB.clearHover = function () {
  KB.state.hover = null;
  KB.state.hoverLink = null;
  KB.hideTip();
};

/* 绕节点做轨道旋转：方位角转到正面、抬高一点俯角，同时拉近。
   视觉上就是整个立体模型转过来，把这个模块转到你面前。 */
KB.orbitTo = function (node, ms) {
  if (!KB.graph || !node) return;
  if (KB._cancelFly) KB._cancelFly();
  const cam = KB.graph.camera();
  if (!cam) return;
  KB.clearHover();
  KB._orbitCancel = false;

  const st = KB.graph.cameraPosition();
  const startTarget = st.lookAt || { x: 0, y: 0, z: 0 };
  const r0 = Math.hypot(st.x - node.x, st.y - node.y, st.z - node.z) || 800;
  const a0 = Math.atan2(st.x - node.x, st.z - node.z);
  const e0 = Math.asin(Math.max(-1, Math.min(1, (st.y - node.y) / r0)));

  /* 用"多数邻居"的距离来取景（70 分位），而不是最远的那个：
     不然一两个远房邻居会把镜头拉得很远，中心节点小得看不清。
     少数特别远的靠右侧面板的列表兜底。 */
  const nb = KB.neighborMap.get(node.id) || [];
  const dists = [];
  for (const e of nb) {
    const m = KB.byId[e.id];
    if (m && typeof m.x === 'number') {
      dists.push(Math.hypot(m.x - node.x, m.y - node.y, m.z - node.z));
    }
  }
  dists.sort((a, b) => a - b);
  const reach = dists.length ? dists[Math.floor((dists.length - 1) * 0.7)] : 120;
  const fov = ((cam && cam.fov) || 50) * Math.PI / 180;
  const r1 = Math.max(400, Math.min(1000, reach * 1.9 + 140));
  const a1 = 0.35;     // 3/4 视角，不是正对，保留立体感
  const e1 = 0.30;     // 略微俯视

  let da = a1 - a0;
  while (da > Math.PI) da -= Math.PI * 2;
  while (da < -Math.PI) da += Math.PI * 2;

  const dur = KB.reduceMotion ? 0 : (ms || 1450);
  const labelsEl = document.getElementById('labels');
  const startOrbit = () => {
    KB._orbiting = true;
    if (labelsEl) labelsEl.classList.add('orbiting');
  };
  const endOrbit = () => {
    KB._orbiting = false;
    if (labelsEl) labelsEl.classList.remove('orbiting');
    if (KB.graph) KB.graph.linkDirectionalParticles(KB.particleCount);
  };
  /* 走库自己的 cameraPosition：它会同时同步 controls 的注视点。
     直接改 camera.position 而不动 controls，镜头会指偏。 */
  const place = (a, e, r, k) => {
    const px = node.x + Math.sin(a) * Math.cos(e) * r;
    const py = node.y + Math.sin(e) * r;
    const pz = node.z + Math.cos(a) * Math.cos(e) * r;

    /* 面板打开时，把节点放到"可用区域"的中心而不是整屏中心，
       否则右侧的邻居会被面板挡住 */
    let fx = node.x - px, fy = node.y - py, fz = node.z - pz;
    const fl = Math.hypot(fx, fy, fz) || 1;
    fx /= fl; fy /= fl; fz /= fl;
    const rx = -fz, rz = fx;               // right = cross(forward, up)

    const panelEl = document.getElementById('panel');
    const wide = window.innerWidth > 900;
    const panelOpen = panelEl && panelEl.classList.contains('open') && wide
      && !document.body.classList.contains('panel-collapsed');
    const panelW = panelOpen ? 480 : 0;
    const railW = (wide && !document.body.classList.contains('rail-collapsed')) ? 290 : 0;
    const worldPerPx = (2 * Math.tan(fov / 2) * r) / window.innerHeight;
    const shift = ((panelW - railW) / 2) * worldPerPx;

    /* 前 45% 先把注视点从当前位置摇到节点（节点平滑滑到中间），
       之后注视点钉死在节点上，模型绕着它转 */
    const pan = Math.min(1, k / 0.45);
    const pk = pan < 0.5 ? 2 * pan * pan : 1 - Math.pow(-2 * pan + 2, 2) / 2;
    const tx = startTarget.x + (node.x + rx * shift - startTarget.x) * pk;
    const ty = startTarget.y + (node.y - startTarget.y) * pk;
    const tz = startTarget.z + (node.z + rz * shift - startTarget.z) * pk;

    /* 每帧直接摆相机，不走库的缓动，避免注视点滞后导致节点漂移 */
    const controls = KB.graph.controls && KB.graph.controls();
    if (controls && controls.target) controls.target.set(tx, ty, tz);
    cam.position.set(px, py, pz);
    cam.lookAt(tx, ty, tz);
  };

  if (!dur) { place(a1, e1, r1, 1); return; }

  startOrbit();
  const t0 = performance.now();
  const step = () => {
    if (KB._orbitCancel) { endOrbit(); return; }
    const t = Math.min(1, (performance.now() - t0) / dur);
    /* easeInOutQuint：起步和收尾都更软，不会"弹一下" */
    const k = t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
    place(a0 + da * k, e0 + (e1 - e0) * k, r0 + (r1 - r0) * k, k);
    if (t < 1) requestAnimationFrame(step);
    else endOrbit();
  };
  requestAnimationFrame(step);
};

/* 沿当前视角推进（备用：需要保持方位时用） */
KB.flyTo = function (node, ms) {
  if (!KB.graph || !node) return;
  if (KB._cancelFly) KB._cancelFly();
  KB.clearHover();
  const dist = 330 + (node._deg || 4) * 10;
  const cam = KB.graph.cameraPosition();
  let ux = (cam.x || 0) - node.x, uy = (cam.y || 0) - node.y, uz = (cam.z || 0) - node.z;
  let len = Math.hypot(ux, uy, uz);
  if (len < 1e-3) { ux = 0; uy = 0; uz = 1; len = 1; }
  ux /= len; uy /= len; uz /= len;
  KB.graph.cameraPosition(
    { x: node.x + ux * dist, y: node.y + uy * dist, z: node.z + uz * dist },
    { x: node.x, y: node.y, z: node.z },
    KB.reduceMotion ? 0 : (ms || 1100)
  );
};

/* 搜索定位：绕 Y 轴偏一点再拉近，像用手把星图拨过去 */
KB.flyToSearch = function (node) {
  if (!KB.graph || !node) return;
  if (KB._cancelFly) KB._cancelFly();
  KB.clearHover();
  const cam = KB.graph.cameraPosition();
  const az = Math.atan2((cam.x || 0) - node.x, (cam.z || 0) - node.z) + 0.55;
  const el = 0.30;
  const dist = 500;
  KB.graph.cameraPosition(
    {
      x: node.x + Math.sin(az) * Math.cos(el) * dist,
      y: node.y + Math.sin(el) * dist,
      z: node.z + Math.cos(az) * Math.cos(el) * dist
    },
    { x: node.x, y: node.y, z: node.z },
    KB.reduceMotion ? 0 : 1300
  );
};

/* 屏幕空间取景：按投影后的包围盒填满画面。
   zoomToFit 按包围球算，节点一多景深会浪费大半个屏幕。 */
/* 面板/左栏占位用"相机视口偏移"处理：旋转中心仍是模型中心，
   不会因为避让面板把轨道中心带到一边。 */
KB.viewOffsetPx = function () {
  const W = window.innerWidth;
  if (W <= 900) return 0;
  const panelEl = document.getElementById('panel');
  const panelOpen = panelEl && panelEl.classList.contains('open')
    && !document.body.classList.contains('panel-collapsed');
  const railOpen = !document.body.classList.contains('rail-collapsed');
  return (panelOpen ? 480 : 0) - (railOpen ? 290 : 0);
};

KB.updateViewOffset = function (extraPx) {
  if (!KB.graph) return;
  const cam = KB.graph.camera();
  if (!cam) return;
  const W = window.innerWidth, H = window.innerHeight;
  const off = Math.round(KB.viewOffsetPx() / 2 + (extraPx || 0));
  if (Math.abs(off) >= 1) cam.setViewOffset(W, H, off, 0, W, H);
  else cam.clearViewOffset();
  cam.updateProjectionMatrix();
};

KB.fitNodes = function (nodes, ms) {
  if (!KB.graph) return;
  if (KB._cancelFly) KB._cancelFly();
  const ns = (nodes || []).filter(n => n && n.__threeObj);
  if (!ns.length) return;
  const cam = KB.graph.camera();
  if (!cam) return;
  KB.clearHover();

  let cx = 0, cy = 0, cz = 0;
  ns.forEach(n => { cx += n.x; cy += n.y; cz += n.z; });
  cx /= ns.length; cy /= ns.length; cz /= ns.length;
  if (ns.length === KB.NODES.length) KB._modelCenter = { x: cx, y: cy, z: cz };

  const cur = KB.graph.cameraPosition();
  let ux = cur.x - cx, uy = cur.y - cy, uz = cur.z - cz;
  let dist = Math.hypot(ux, uy, uz) || 600;
  ux /= dist; uy /= dist; uz /= dist;

  /* 取景区域：让开左侧栏与右侧详情面板，只把节点铺满可见区。
     位置偏移交给视口偏移，target 始终是模型中心，拖动旋转不会跑偏。 */
  const W = window.innerWidth, H = window.innerHeight;
  const panelEl = document.getElementById('panel');
  const wide = W > 900;
  const panelOpen = wide && panelEl && panelEl.classList.contains('open')
    && !document.body.classList.contains('panel-collapsed');
  const railOpen = wide && !document.body.classList.contains('rail-collapsed');
  const padPx = 36;
  const freeXMin = -1 + 2 * ((railOpen ? 290 : 0) + padPx) / W;
  const freeXMax = 1 - 2 * ((panelOpen ? 480 : 0) + padPx) / W;
  const freeYSpan = 1.8;

  const v = cam.position.clone();
  const setCam = (extraOff) => {
    cam.position.set(cx + ux * dist, cy + uy * dist, cz + uz * dist);
    cam.lookAt(cx, cy, cz);
    KB.updateViewOffset(extraOff);
    cam.updateMatrixWorld(true);
  };

  let extraOff = 0;
  for (let i = 0; i < 14; i++) {
    setCam(extraOff);
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, behind = 0;
    for (let j = 0; j < ns.length; j++) {
      v.copy(ns[j].__threeObj.position).project(cam);
      if (!isFinite(v.x) || !isFinite(v.y) || v.z > 1) { behind++; continue; }
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
    }
    if (behind) { dist *= 1.6; continue; }
    const spanX = Math.max(1e-6, maxX - minX);
    const spanY = Math.max(1e-6, maxY - minY);
    const freeSpanX = Math.max(0.2, freeXMax - freeXMin);
    const need = Math.max(spanX / freeSpanX, spanY / freeYSpan);
    if (need > 0.98) { dist = Math.max(120, dist * Math.min(3, need * 1.03)); continue; }

    const dxPx = ((minX + maxX) / 2 - (freeXMin + freeXMax) / 2) * (W / 2);
    if (Math.abs(dxPx) > 2) { extraOff += dxPx; continue; }
    break;
  }

  KB.updateViewOffset(extraOff);
  KB.graph.cameraPosition(
    { x: cx + ux * dist, y: cy + uy * dist, z: cz + uz * dist },
    { x: cx, y: cy, z: cz },
    KB.reduceMotion ? 0 : (ms == null ? 800 : ms)
  );
};

KB.fitView = function () {
  KB.fitNodes(KB.NODES, 800);
};

/* 方向模式：只框住这一串节点 */
KB.fitSubset = function (ids) {
  KB.fitNodes(ids.map(id => KB.byId[id]).filter(Boolean), 1000);
};

KB.setCursor = function (c) {
  const el = document.querySelector('#graph canvas');
  if (el) el.style.cursor = c;
};

/* 右键单击：左键在"旋转 / 平移"之间切换 */
KB.toggleLeftMode = function () {
  const controls = KB.graph && KB.graph.controls && KB.graph.controls();
  if (!controls || !controls.mouseButtons) return;
  const toPan = controls.mouseButtons.LEFT !== 2;
  controls.mouseButtons.LEFT = toPan ? 2 : 0;   // 2 = PAN, 0 = ROTATE
  KB.state.leftMode = toPan ? 'pan' : 'rotate';
  KB.setCursor(toPan ? 'move' : 'grab');
  KB.showToast(toPan ? '左键拖拽 = 平移（右键再点一下切回旋转）' : '左键拖拽 = 旋转（右键点一下切换平移）');
};
