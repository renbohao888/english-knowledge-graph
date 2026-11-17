/* ============================================================
 * 搜索：节点 / 细分知识点 / 分区 / 学习路线 一起联想
 * - 输入 JS、TS、K8s 这类缩写也能命中
 * - 细分点和分区作为独立结果出现，点击直接进入该节点的内部 3D 并定位
 * - 空输入聚焦时给出几个示例词
 * ============================================================ */
window.KB = window.KB || {};

let srList = [];
let srIndex = 0;
let SR_INDEX = null;

const squash = (s) => String(s || '').toLowerCase().replace(/[\s/\-_.·、，,()（）]+/g, '');
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function hl(text, q) {
  if (!q) return KB.esc(text);
  try {
    const safe = escRe(KB.esc(q));
    return KB.esc(text).replace(new RegExp('(' + safe + ')', 'ig'), '<mark>$1</mark>');
  } catch (e) { return KB.esc(text); }
}

function buildIndex() {
  if (SR_INDEX) return SR_INDEX;
  const idx = [];
  KB.NODES.forEach(n => {
    idx.push({
      kind: 'node', id: n.id, name: n.name, layer: n.layer,
      kw: (n.keywords || []).join(' '), desc: n.description || ''
    });
    const seenGroups = new Set();
    (n.children || []).forEach(ch => {
      if (ch.group) seenGroups.add(ch.group);
      idx.push({
        kind: 'child', id: n.id, parent: n.name, name: ch.name,
        group: ch.group || '', desc: ch.desc || '', layer: n.layer
      });
    });
    seenGroups.forEach(g => {
      idx.push({ kind: 'group', id: n.id, parent: n.name, name: g, group: g, layer: n.layer });
    });
  });
  (KB.PATHS || []).forEach(p => {
    idx.push({ kind: 'path', id: p.id, pathId: p.id, name: p.name, level: p.level || '', layer: '学习路线' });
  });
  SR_INDEX = idx;
  return idx;
}

/* 一条索引项的匹配分；所有查询词都必须出现在它的某个字段里 */
function scoreItem(it, q, qs, tokens) {
  const name = it.name || '';
  const nameL = name.toLowerCase();
  const ns = squash(name);
  const hay = squash([name, it.kw, it.group, it.parent, it.level, it.desc].filter(Boolean).join(' '));
  if (!tokens.every(tk => hay.includes(squash(tk)))) return 0;

  let score = 0;
  if (nameL === q || ns === qs) score = it.kind === 'node' ? 150 : 146;
  else if (nameL.startsWith(q) || (qs && ns.startsWith(qs))) score = 128;
  else if (nameL.includes(q) || (qs && ns.includes(qs))) score = 110;

  if (!score && it.kw) {
    for (const k of it.kw.toLowerCase().split(/\s+/)) {
      if (!k) continue;
      if (k === q || squash(k) === qs) { score = 106; break; }
      if (squash(k).length >= 2 && (k.includes(q) || squash(k).includes(qs))) { score = 84; break; }
    }
  }

  if (!score && it.group && squash(it.group).includes(qs)) score = 86;
  if (!score && it.parent && squash(it.parent).includes(qs)) score = 70;
  if (!score && it.desc && squash(it.desc).includes(qs)) score = 58;
  if (!score && it.level && squash(it.level).includes(qs)) score = 58;
  if (!score) return 0;

  /* 多词查询：名字里同时出现越多，越靠前 */
  if (tokens.length > 1) {
    const inName = tokens.filter(tk => squash(name).includes(squash(tk))).length;
    score += inName * 12;
  }
  /* 同分时细分/分区比整节点更具体 */
  if (it.kind === 'child') score += 4;
  if (it.kind === 'group') score += 3;
  return score;
}

KB.searchNodes = function (query) {
  const raw = String(query || '').trim();
  if (!raw) return [];
  const q = raw.toLowerCase();
  const qs = squash(raw);
  const tokens = q.split(/\s+/).filter(Boolean);

  /* 1–3 个字母的缩写（js/ts/k8s）只给节点和路线结果：
     否则 jstack、JSON、HSTS 这些词里的字母会把列表刷满。 */
  const shortAcronym = tokens.length === 1 && /^[a-z0-9]{1,3}$/i.test(tokens[0]);

  const out = [];
  for (const it of buildIndex()) {
    if (shortAcronym && it.kind !== 'node' && it.kind !== 'path') continue;
    const s = scoreItem(it, q, qs, tokens);
    if (s > 0) out.push(Object.assign({ score: s }, it));
  }

  out.sort((a, b) => (b.score - a.score) ||
    (a.kind === b.kind ? a.name.localeCompare(b.name, 'zh') : a.kind.localeCompare(b.kind)));

  const seen = new Set();
  const picked = [];
  for (const r of out) {
    const key = r.kind + '|' + r.id + '|' + (r.kind === 'child' ? r.name : '');
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(r);
    if (picked.length >= 8) break;
  }
  return picked;
};

const KIND_LABEL = { node: '节点', child: '细分', group: '分区', path: '路线' };

function renderSearchResults() {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  const q = input.value.trim();
  if (!q) { box.classList.remove('show'); srList = []; return; }

  const isWord = /^[a-zA-Z][a-zA-Z'’-]{1,30}$/.test(q);
  const vocabRow = isWord
    ? `<button class="sr-item sr-vocab" data-vocab="${KB.esc(q)}" role="option">
         <span class="sr-kind sr-kind-vocab">词汇</span>
         <span class="sr-main"><span class="sr-name">在词汇库中查询「${KB.esc(q)}」</span>
           <span class="sr-sub">音标 · 释义 · 词形 · 词根拆解 · 公开词典链接</span></span>
         <span class="sr-layer">词汇库</span>
       </button>`
    : '';

  box.innerHTML = srList.length
    ? vocabRow + srList.map((r, i) => {
        const isNode = r.kind === 'node';
        const dot = isNode
          ? `<span class="sr-dot" style="background:${KB.STATUS_COLOR[KB.effStatus(KB.byId[r.id])] || '#9fb3cc'}"></span>`
          : `<span class="sr-kind sr-kind-${r.kind}">${KIND_LABEL[r.kind]}</span>`;
        const parent = (r.kind === 'child' || r.kind === 'group') ? `<em class="sr-parent">${KB.esc(r.parent)} › </em>` : '';
        const group = (r.kind === 'child' && r.group) ? `<em class="sr-group">${KB.esc(r.group)}</em>` : '';
        const sub = (r.kind === 'child' && r.desc) ? `<span class="sr-sub">${KB.esc(r.desc).slice(0, 46)}</span>` : '';
        return `<button class="sr-item${i === srIndex ? ' active' : ''}" data-i="${i}" role="option">
          ${dot}
          <span class="sr-main">
            <span class="sr-name">${parent}${hl(r.name, q)}${group}</span>
            ${sub}
          </span>
          <span class="sr-layer">${isNode ? KB.esc(r.layer) : (r.kind === 'path' ? '路线' : KIND_LABEL[r.kind])}</span>
        </button>`;
      }).join('')
    : `<div class="sr-empty">没有匹配「${KB.esc(q)}」的节点或细分点${isWord ? '，可点上方用词汇库查询' : ''}</div>`;

  box.classList.add('show');
  const act = box.querySelector('.sr-item.active');
  if (act) act.scrollIntoView({ block: 'nearest' });
}

function renderExamples() {
  const box = document.getElementById('searchResults');
  const ex = ['JS', 'TS', 'K8s', '注解', '主从延迟', '泛型'];
  box.innerHTML = `
    <div class="sr-examples">
      <span>试试：</span>
      ${ex.map(x => `<button class="sr-ex" data-ex="${KB.esc(x)}">${KB.esc(x)}</button>`).join('')}
    </div>`;
  box.classList.add('show');
}

/* 选中一条结果 */
KB.chooseSearch = function (r) {
  if (typeof r === 'string') r = { kind: 'node', id: r };
  if (!r || !r.id) return;
  document.getElementById('searchResults').classList.remove('show');
  document.getElementById('searchInput').blur();

  if (r.kind === 'path') { KB.renderPathDetail(r.pathId || r.id); return; }

  const n = KB.byId[r.id];
  if (!n) return;
  /* 当前筛选把它藏了，就先清空，免得"飞过去却看不见" */
  if (!KB.matches(n)) {
    const s = KB.state;
    s.layer = null; s.domain = null; s.status = null; s.track = null;
    KB.syncFilterUI();
  }

  if (r.kind === 'node') {
    KB.state.highlightChild = null;
    KB.selectNode(r.id, false);
    KB.orbitTo(n, 1250);
    return;
  }

  /* 细分点 / 分区：直接进入节点内部 3D，并定位到命中的位置 */
  KB.state.highlightChild = r.kind === 'child' ? (r.name || null) : null;
  KB.enterSubModel(r.id);
  if (r.kind === 'child' && r.name) {
    const sub = (KB.subNodes || []).find(x => x._sub && x.name === r.name);
    if (sub) {
      KB.state.subChild = sub.id;
      if (KB.graph) KB.graph.nodeColor(KB.subNodeColor);
      KB.renderSubChild(sub);
    }
  } else if (r.kind === 'group' && r.name) {
    const titles = [...document.querySelectorAll('#panel .sub-group-title')];
    const t = titles.find(el => el.textContent.trim().startsWith(r.name));
    if (t) t.scrollIntoView({ block: 'start' });
  }
  KB.showToast('已进入「' + n.name + '」内部 · ' + (r.name || ''));
};

KB.bindSearch = function () {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    srList = KB.searchNodes(input.value);
    srIndex = 0;
    renderSearchResults();
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) {
      srList = KB.searchNodes(input.value);
      srIndex = 0;
      renderSearchResults();
    } else {
      renderExamples();
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => box.classList.remove('show'), 140);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (srList.length) { srIndex = Math.min(srIndex + 1, srList.length - 1); renderSearchResults(); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (srList.length) { srIndex = Math.max(srIndex - 1, 0); renderSearchResults(); }
    } else if (e.key === 'Enter') {
      if (srList[srIndex]) {
        e.preventDefault();
        KB.chooseSearch(srList[srIndex]);
      }
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      box.classList.remove('show');
      input.blur();
    }
  });

  box.addEventListener('mousedown', (e) => {
    const ex = e.target.closest('[data-ex]');
    if (ex) {
      e.preventDefault();
      input.value = ex.dataset.ex;
      srList = KB.searchNodes(input.value);
      srIndex = 0;
      renderSearchResults();
      input.focus();
      return;
    }
    const v = e.target.closest('[data-vocab]');
    if (v) {
      e.preventDefault();
      box.classList.remove('show');
      KB.openVocab(v.dataset.vocab);
      return;
    }
    const b = e.target.closest('[data-i]');
    if (b) {
      e.preventDefault();
      const r = srList[Number(b.dataset.i)];
      if (r) KB.chooseSearch(r);
    }
  });

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });
};
