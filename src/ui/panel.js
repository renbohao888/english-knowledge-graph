/* ============================================================
 * 详情面板：节点详情 / 方向概览
 * 结构：位置 → 名称 → 标签 → 描述 → 细分知识点 → 前置 / 后置 / 其他关联
 * ============================================================ */
window.KB = window.KB || {};

KB.panelEl = null;

KB.getPanel = function () {
  if (!KB.panelEl) KB.panelEl = document.getElementById('panel');
  return KB.panelEl;
};

function rowFor(oid, relOf) {
  const o = KB.byId[oid];
  if (!o) return '';
  const e = relOf.get(oid);
  const tag = e ? `${e.dir === 'out' ? '→' : '←'} ${KB.esc(e.relation)}` : KB.esc(o.layer);
  const c = KB.STATUS_COLOR[KB.effStatus(o)] || '#9fb3cc';
  return `<li><button data-goto="${KB.esc(oid)}">
    <span class="dot" style="background:${c};color:${c}"></span>
    <span class="nb-name">${KB.esc(o.name)}</span>
    <span class="nb-rel">${tag}</span>
  </button></li>`;
}

function group(title, hint, ids, note, relOf) {
  if (!ids.length && !note) return '';
  return `<div class="p-group">
    <div class="p-group-title"><span>${title}</span><em>${hint}</em><b>${ids.length}</b></div>
    ${ids.length
      ? `<ul class="p-nb">${ids.map(id => rowFor(id, relOf)).join('')}</ul>`
      : `<div class="p-note">${note}</div>`}
  </div>`;
}

KB.renderPanel = function (id) {
  const n = KB.byId[id];
  const panel = KB.getPanel();
  if (!n) { KB.closePanel(); return; }

  const li = Math.max(0, KB.LAYERS.indexOf(n.layer));
  const relOf = new Map((KB.neighborMap.get(id) || []).map(e => [e.id, e]));

  /* 前置：显式 before 优先；没写的话退化成"更低层的邻居" */
  let preIds = n.before.filter(x => KB.byId[x]);
  if (!preIds.length && !Array.isArray(n.before)) {
    preIds = (KB.neighborMap.get(id) || [])
      .filter(e => KB.LAYERS.indexOf(KB.byId[e.id].layer) > li)
      .map(e => e.id);
  }
  const preSet = new Set(preIds);

  /* 后置：谁把我写进了它的 before */
  const afterIds = KB.NODES.filter(x => x.before.includes(id)).map(x => x.id);
  const afterSet = new Set(afterIds);

  /* 其余直接连线：只讲架构关系 */
  const related = (KB.neighborMap.get(id) || [])
    .filter(e => !preSet.has(e.id) && !afterSet.has(e.id))
    .map(e => e.id);

  const hitChild = KB.state.highlightChild || null;
  /* 细分知识点按分区展示（details-*.js 里带 group 的条目） */
  function groupChildren(list) {
    const out = [];
    list.forEach(ch => {
      const name = ch.group || '';
      let g = out.find(x => x.name === name);
      if (!g) { g = { name, items: [] }; out.push(g); }
      g.items.push(ch);
    });
    return out;
  }
  const childGroups = groupChildren(n.children || []);
  const colorForGroup = (gi) => (KB.subColorOf ? KB.subColorOf(gi) : '#5cc8ff');
  const children = childGroups.map((g, gi) => {
    const head = g.name
      ? `<div class="sub-group-title"><i style="--c:${colorForGroup(gi)}"></i>${KB.esc(g.name)}<em>${g.items.length}</em></div>`
      : '';
    const items = g.items.map(ch => {
      const hit = hitChild && ch.name === hitChild;
      return `<div class="child${hit ? ' is-hit' : ''}">
        <b>${KB.esc(ch.name)}</b>
        <span>${KB.esc(ch.desc || '')}</span>
      </div>`;
    }).join('');
    return head + items;
  }).join('');

  const st = KB.effStatus(n);
  const color = KB.STATUS_COLOR[st] || '#9fb3cc';
  const article = (KB.ARTICLES || {})[id];
  const tab = KB.state.panelTab || 'overview';
  const editing = KB.state.editing && KB.state.editing.id === id;

  const overview = `
    <p class="p-desc">${KB.esc(n.description)}</p>
    <p class="p-layerdef">${KB.esc(KB.LAYER_INFO[n.layer] || '')}</p>
    ${children ? `<div class="p-group">
      <div class="p-group-title"><span>细分知识点</span><em>可以继续拆下去</em><b>${n.children.length}</b></div>
      <div class="p-children">${children}</div>
    </div>` : ''}
    ${group('前置知识', '先懂这些', preIds, '这张图里的地基，没有更低层的前置节点。', relOf)}
    ${group('学完之后', '这些以它为前置', afterIds, '', relOf)}
    ${group('其他关联', '架构上的直接相连', related, '', relOf)}
    <button class="p-focus" data-focus>${KB.state.focus === id ? '退出邻域聚焦' : '聚焦这个邻域'}</button>
  `;

  const articleHtml = editing
    ? KB.renderEditor()
    : article
      ? renderArticle(article) + `<button class="a-edit" data-edit-article>✏️ 编辑这篇教程</button>`
      : `<div class="a-empty">这篇教程还在写。你可以直接在这里补上：是什么、为什么重要、核心概念、示例、常见坑。保存后其他人刷新就能看到。</div>
         <button class="a-edit primary" data-edit-article>✍ 写这篇教程</button>`;

  panel.innerHTML = `
    <div class="p-tools">
      <button class="panel-close" data-close aria-label="关闭详情">✕</button>
    </div>
    <div class="p-scroll">
      ${KB.state.track ? `<button class="p-back" data-backtrack>← ${KB.esc(KB.state.track)} 方向</button>` : ''}
      <div class="p-layer">
        <span class="p-stack">${KB.LAYERS.map((l, i) => `<i class="${i === li ? 'on' : ''}"></i>`).join('')}</span>
        <span>${KB.esc(n.layer)}</span>
        <span class="p-depth">第 ${li + 1} 层 / ${KB.LAYERS.length}</span>
      </div>
      <h2 class="p-title">${KB.esc(n.name)}</h2>
      <div class="p-chips">
        <span class="chip chip-status" style="--c:${color}">${KB.esc(st)}</span>
        <span class="chip">${KB.esc(n.domain)}</span>
        ${n.tracks.length ? `<span class="chip">${KB.esc(n.tracks.join(' / '))}</span>` : ''}
        <span class="chip chip-dim">${n._deg} 条连线</span>
      </div>
      ${n.children && n.children.length ? `<button class="p-sub-enter" data-enter-sub>🧬 进入内部 3D · ${n.children.length} 个细分区</button>` : ''}
      <div class="p-progress">
        <span>我的进度</span>
        ${KB.STATUS_LIST.map(s => `<button class="p-prog${st === s ? ' active' : ''}" data-progress="${KB.esc(s)}" style="--c:${KB.STATUS_COLOR[s]}">${KB.esc(s)}</button>`).join('')}
        ${KB.hasProgress(n) ? `<em>作者标注 ${KB.esc(n.status)}</em>` : ''}
      </div>
      <div class="p-tabs">
        <button class="p-tab${tab === 'overview' ? ' active' : ''}" data-tab="overview">概览</button>
        <button class="p-tab${tab === 'article' ? ' active' : ''}" data-tab="article">教程${editing ? ' · 编辑中' : article ? '' : ' · 待补'}</button>
      </div>
      <div class="p-tab-body">${tab === 'article' ? articleHtml : overview}</div>
    </div>
  `;
  panel.classList.add('open');
  if (KB.updateViewOffset) KB.updateViewOffset();
  const sc = panel.querySelector('.p-scroll');
  if (sc) sc.scrollTop = 0;

  if (hitChild && tab !== 'article') {
    const el = panel.querySelector('.child.is-hit');
    if (el) el.scrollIntoView({ block: 'center' });
  }
};

/* 教程正文：一个块里可以同时有标题、段落、列表、代码，按出现顺序拼接 */
function renderArticle(blocks) {
  return (blocks || []).map(b => {
    let out = '';
    if (b.h) out += `<h3 class="a-h">${KB.esc(b.h)}</h3>`;
    if (b.p) out += `<p class="a-p">${KB.esc(b.p)}</p>`;
    if (b.ul) out += `<ul class="a-ul">${b.ul.map(x => `<li>${KB.esc(x)}</li>`).join('')}</ul>`;
    if (b.code) out += `<pre class="a-pre"><code>${KB.esc(b.code)}</code></pre>`;
    if (b.tip) out += `<div class="a-tip">${KB.esc(b.tip)}</div>`;
    if (b.links) out += `<div class="a-links">${b.links.map(l => `<a href="${KB.esc(l.u)}" target="_blank" rel="noopener">${KB.esc(l.t)}</a>`).join('')}</div>`;
    return out;
  }).join('');
}

/* 方向概览面板 */
KB.renderTrackPanel = function (name) {
  const info = KB.TRACKS[name];
  const panel = KB.getPanel();
  if (!info) return;

  const nodes = KB.NODES.filter(n => n.tracks.includes(name));
  const counts = KB.STATUS_LIST.map(s => ({ s, c: nodes.filter(n => KB.effStatus(n) === s).length }));
  const pct = Math.round((counts[0].c / Math.max(1, nodes.length)) * 100);
  const layerHas = new Set(nodes.map(n => n.layer));
  const groups = KB.LAYERS
    .map(l => ({ l, arr: nodes.filter(n => n.layer === l) }))
    .filter(g => g.arr.length);

  panel.innerHTML = `
    <div class="p-tools">
      <button class="panel-close" data-close aria-label="关闭详情">✕</button>
    </div>
    <div class="p-scroll">
      <div class="p-layer">
        <span class="p-stack">${KB.LAYERS.map(l => `<i class="${layerHas.has(l) ? 'on' : ''}"></i>`).join('')}</span>
        <span>学习方向</span>
        <span class="p-depth">${nodes.length} 个知识点</span>
      </div>
      <h2 class="p-title">${KB.esc(name)}</h2>
      <p class="p-desc">${KB.esc(info.desc)}</p>
      <div class="track-stats">
        ${counts.map(x => `<div class="ts-row"><i style="background:${KB.STATUS_COLOR[x.s]}"></i><span>${x.s}</span><b>${x.c}</b></div>`).join('')}
      </div>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <p class="progress-text">${pct}% 已掌握 · 同色是同一方向，越亮越需要补</p>
      ${groups.map(g => `
        <div class="p-group">
          <div class="p-group-title"><span>${KB.esc(g.l)}</span><b style="margin-left:auto">${g.arr.length}</b></div>
          <ul class="p-nb">${g.arr.map(n => {
            const s2 = KB.effStatus(n);
            const c = KB.STATUS_COLOR[s2] || '#9fb3cc';
            return `<li><button data-goto="${KB.esc(n.id)}">
              <span class="dot" style="background:${c};color:${c}"></span>
              <span class="nb-name">${KB.esc(n.name)}</span>
              <span class="nb-rel">${KB.esc(s2)}</span>
            </button></li>`;
          }).join('')}</ul>
        </div>`).join('')}
      <button class="p-focus" data-clear-track>退出方向模式</button>
    </div>
  `;
  panel.classList.add('open');
  if (KB.updateViewOffset) KB.updateViewOffset();
};

KB.closePanel = function () {
  const panel = KB.getPanel();
  if (panel) panel.classList.remove('open');
  document.body.classList.remove('panel-collapsed');
  if (KB.updateViewOffset) KB.updateViewOffset();
};

/* 收起 / 展开详情面板：收起后右边缘留一个"详情"把手 */
KB.togglePanelCollapse = function (force) {
  const on = typeof force === 'boolean'
    ? force
    : !document.body.classList.contains('panel-collapsed');
  document.body.classList.toggle('panel-collapsed', on);
  if (KB.updateViewOffset) KB.updateViewOffset();
  /* 2D 关系图跟着重新摊开 / 收拢，别把节点留在面板底下 */
  if (KB.state.mode === '2d' && KB.state.selected) KB.twoDFocus(KB.state.selected);
};

KB.renderPanelIfOpen = function () {
  if (KB.state.selected && KB.getPanel().classList.contains('open')) KB.renderPanel(KB.state.selected);
};

KB.bindPanel = function () {
  const reopen = document.getElementById('panelReopen');
  if (reopen) reopen.addEventListener('click', () => KB.togglePanelCollapse(false));
  const edge = document.getElementById('panelEdgeToggle');
  if (edge) edge.addEventListener('click', () => KB.togglePanelCollapse(true));

  KB.getPanel().addEventListener('click', (e) => {
    /* 任何会重绘面板的点击之前，先把编辑器里正在输入的内容收回状态 */
    if (KB.state.editing && KB.editorSync) KB.editorSync();

    if (e.target.closest('[data-collapse]')) { KB.togglePanelCollapse(true); return; }
    /* 学习路线 */
    const po = e.target.closest('[data-path-open]');
    if (po) { KB.renderPathDetail(po.dataset.pathOpen); return; }
    if (e.target.closest('[data-path-back]')) { KB.renderPathsPanel(); return; }
    const pd = e.target.closest('[data-path-done]');
    if (pd) { KB.togglePathDone(KB.state.pathView, Number(pd.dataset.pathDone)); KB.renderPathDetail(KB.state.pathView); return; }
    const pg = e.target.closest('[data-path-go]');
    if (pg) { KB.selectNode(pg.dataset.pathGo, true); return; }
    if (e.target.closest('[data-path-highlight]')) {
      const id = KB.state.pathView;
      KB.setPathHighlight(id, KB.state.path !== id);
      KB.renderPathDetail(id);
      return;
    }
    if (e.target.closest('[data-path-exit]')) { KB.setPathHighlight(null, false); KB.closePanel(); return; }

    /* 节点内部 3D */
    if (e.target.closest('[data-enter-sub]')) { KB.enterSubModel(KB.state.selected); return; }
    if (e.target.closest('[data-exit-sub]')) { KB.exitSubModel(); return; }
    if (e.target.closest('[data-sub-back]')) { KB.renderSubPanel(KB.state.subOf); return; }
    const sg = e.target.closest('[data-sub-go]');
    if (sg) {
      const i = Number(sg.dataset.subGo);
      const node = (KB.subNodes || []).find(x => x._idx === i);
      if (node) {
        KB.state.subChild = node.id;
        if (KB.graph) KB.graph.nodeColor(KB.subNodeColor);
        KB.renderSubChild(node);
      }
      return;
    }

    const go = e.target.closest('[data-goto]');
    if (go) { KB.selectNode(go.dataset.goto, true); return; }
    const pr = e.target.closest('[data-progress]');
    if (pr) { KB.setProgress(KB.state.selected, pr.dataset.progress); return; }
    const tb = e.target.closest('[data-tab]');
    if (tb) { KB.state.panelTab = tb.dataset.tab; KB.renderPanel(KB.state.selected); return; }
    /* 编辑器的按钮在下面统一处理 */
    if (e.target.closest('[data-focus]')) { KB.toggleFocus(KB.state.selected); return; }
    if (e.target.closest('[data-backtrack]')) { if (KB.state.track) KB.renderTrackPanel(KB.state.track); return; }
    if (e.target.closest('[data-clear-track]')) { KB.selectTrack(KB.state.track); return; }
    if (e.target.closest('[data-edit-article]')) { KB.startEditArticle(KB.state.selected); return; }
    const edAdd = e.target.closest('[data-ed-add]');
    if (edAdd) { KB.editorAdd(edAdd.dataset.edAdd); return; }
    const edDel = e.target.closest('[data-ed-del]');
    if (edDel) { KB.editorRemove(Number(edDel.closest('.ed-block').dataset.i)); return; }
    const edMove = e.target.closest('[data-ed-move]');
    if (edMove) { KB.editorMove(Number(edMove.closest('.ed-block').dataset.i), Number(edMove.dataset.edMove)); return; }
    if (e.target.closest('[data-ed-save]')) { KB.saveEditing(); return; }
    if (e.target.closest('[data-ed-cancel]')) { KB.cancelEditing(); return; }
    if (e.target.closest('[data-ed-reset]')) {
      const id = KB.state.editing && KB.state.editing.id;
      KB.state.editing = null;
      if (id) KB.resetUserArticle(id);
      return;
    }
    if (e.target.closest('[data-ed-download]')) { KB.downloadUserContent(); return; }
    if (e.target.closest('[data-close]')) {
      if (KB.state.subOf) { KB.exitSubModel(); return; }
      KB.state.editing = null;
      KB.clearSelection();
    }
  });
};
