/* ============================================================
 * 教程编辑器：在详情面板的「教程」标签里直接写 / 改
 * ------------------------------------------------------------
 * 内容按块组织（段落、列表、代码、提示、链接），和 articles.js 同一套格式。
 * 保存走 KB.saveArticleBlocks：服务器优先，失败退回 localStorage。
 * 新增内容类型只需要在这里加一个块类型 + styles.css 里加样式，不用改数据格式。
 * ============================================================ */
window.KB = window.KB || {};

KB.state.editing = null;   // { id, blocks }

const ED_TYPES = [
  { k: 'p', label: '段落', hint: '标题可以留空' },
  { k: 'ul', label: '要点列表', hint: '一行一条' },
  { k: 'code', label: '代码', hint: '等宽字体显示' },
  { k: 'tip', label: '提示', hint: '一句话提醒' },
  { k: 'links', label: '链接', hint: '一行一条：名称 | 地址' }
];

function edBlockType(b) {
  if (b.code != null) return 'code';
  if (Array.isArray(b.ul)) return 'ul';
  if (b.tip != null) return 'tip';
  if (Array.isArray(b.links)) return 'links';
  return 'p';
}

function edCopy(blocks) {
  return (blocks || []).map(b => {
    const t = edBlockType(b);
    if (t === 'p') return Object.assign({}, b.h ? { h: b.h } : {}, b.p ? { p: b.p } : {});
    if (t === 'ul') return { ul: (b.ul || []).slice() };
    if (t === 'code') return Object.assign({ code: b.code || '' }, b.lang ? { lang: b.lang } : {});
    if (t === 'tip') return { tip: b.tip || '' };
    return { links: (b.links || []).map(l => ({ t: l.t || '', u: l.u || '' })) };
  });
}

function edLinksToText(links) {
  return (links || []).map(l => (l.t && l.t !== l.u) ? `${l.t} | ${l.u}` : (l.u || l.t || '')).join('\n');
}

function edBlockHtml(b, i) {
  const t = edBlockType(b);
  const meta = ED_TYPES.find(x => x.k === t) || ED_TYPES[0];
  let fields = '';
  if (t === 'p') {
    fields = `
      <input type="text" data-f="h" value="${KB.esc(b.h || '')}" placeholder="小节标题（可留空）">
      <textarea data-f="p" placeholder="写正文，可以多行">${KB.esc(b.p || '')}</textarea>`;
  } else if (t === 'ul') {
    fields = `<textarea data-f="ul" placeholder="一行一条要点">${KB.esc((b.ul || []).join('\n'))}</textarea>`;
  } else if (t === 'code') {
    fields = `
      <input type="text" data-f="lang" value="${KB.esc(b.lang || '')}" placeholder="语言（可留空，如 java / js / bash）">
      <textarea data-f="code" class="ed-code" placeholder="代码">${KB.esc(b.code || '')}</textarea>`;
  } else if (t === 'tip') {
    fields = `<textarea data-f="tip" placeholder="一句话提醒">${KB.esc(b.tip || '')}</textarea>`;
  } else if (t === 'links') {
    fields = `<textarea data-f="links" placeholder="一行一条：名称 | https://...">${KB.esc(edLinksToText(b.links))}</textarea>`;
  }
  return `<div class="ed-block" data-type="${t}" data-i="${i}">
    <div class="ed-head">
      <b>${meta.label}</b><em>${meta.hint}</em><span class="sp"></span>
      <button class="ed-btn" data-ed-move="-1" title="上移">↑</button>
      <button class="ed-btn" data-ed-move="1" title="下移">↓</button>
      <button class="ed-btn ed-del" data-ed-del title="删除这一块">✕</button>
    </div>
    ${fields}
  </div>`;
}

KB.startEditArticle = function (id) {
  if (!KB.byId[id]) return;
  KB.state.editing = { id, blocks: edCopy(KB.ARTICLES[id]) };
  KB.state.panelTab = 'article';
  KB.renderPanel(id);
};

KB.renderEditor = function () {
  const ed = KB.state.editing;
  if (!ed) return '';
  const node = KB.byId[ed.id];
  const hint = KB.contentSource === 'server'
    ? '保存后写进服务器的 data/content.json，其他人刷新即可看到。'
    : '当前服务器不可用，保存的内容只在本机浏览器；可以下载 JSON 交给维护者合并。';
  const canReset = KB.BUNDLED_ARTICLES[ed.id] && KB.hasUserArticle(ed.id);
  return `<div class="ed-wrap" data-id="${KB.esc(ed.id)}">
    <div class="ed-bar">正在补充 <b>${KB.esc(node ? node.name : ed.id)}</b> 的教程</div>
    <div class="ed-add-row">
      ${ED_TYPES.map(t => `<button class="ed-add" data-ed-add="${t.k}">+ ${t.label}</button>`).join('')}
    </div>
    <div class="ed-list">
      ${ed.blocks.length ? ed.blocks.map(edBlockHtml).join('') : `<div class="ed-empty">还没有内容，点上面的按钮加一块。</div>`}
    </div>
    <p class="ed-hint">${hint}</p>
    <div class="ed-actions">
      <button class="ed-save" data-ed-save>保存教程</button>
      <button class="ed-cancel" data-ed-cancel>取消</button>
      ${canReset ? `<button class="ed-reset" data-ed-reset>恢复原版</button>` : ''}
    </div>
    ${KB.contentSource !== 'server' ? `<button class="ed-download" data-ed-download>下载 content.json</button>` : ''}
  </div>`;
};

/* 把面板里正在编辑的输入框内容收回内存。任何会重绘面板的操作前都要先调它。 */
KB.editorSync = function () {
  const ed = KB.state.editing;
  if (!ed) return;
  const panel = KB.getPanel();
  const wrap = panel && panel.querySelector('.ed-wrap');
  if (!wrap || wrap.dataset.id !== ed.id) return;

  const out = [];
  wrap.querySelectorAll('.ed-block').forEach(el => {
    const t = el.dataset.type;
    const val = f => {
      const input = el.querySelector(`[data-f="${f}"]`);
      return input ? input.value : '';
    };

    if (t === 'p') {
      const h = val('h').trim();
      const p = val('p').trim();
      if (h || p) out.push(Object.assign({}, h ? { h } : {}, p ? { p } : {}));
    } else if (t === 'ul') {
      const items = val('ul').split('\n').map(s => s.trim()).filter(Boolean);
      if (items.length) out.push({ ul: items });
    } else if (t === 'code') {
      const code = val('code').replace(/\s+$/, '');
      if (code.trim()) {
        const lang = val('lang').trim();
        out.push(Object.assign({ code }, lang ? { lang } : {}));
      }
    } else if (t === 'tip') {
      const tip = val('tip').trim();
      if (tip) out.push({ tip });
    } else if (t === 'links') {
      const links = val('links').split('\n').map(s => s.trim()).filter(Boolean).map(line => {
        const cut = line.indexOf('|');
        if (cut > -1) return { t: line.slice(0, cut).trim(), u: line.slice(cut + 1).trim() };
        return { t: line, u: line };
      }).filter(l => /^https?:\/\//i.test(l.u));
      if (links.length) out.push({ links });
    }
  });
  ed.blocks = out;
};

KB.editorAdd = function (type) {
  KB.editorSync();
  const ed = KB.state.editing;
  if (!ed) return;
  const blank = type === 'ul' ? { ul: [] }
    : type === 'code' ? { code: '' }
    : type === 'tip' ? { tip: '' }
    : type === 'links' ? { links: [] }
    : { p: '' };
  ed.blocks.push(blank);
  KB.renderPanel(ed.id);
  const panel = KB.getPanel();
  const last = panel.querySelector('.ed-block:last-child');
  if (last) {
    const first = last.querySelector('input, textarea');
    if (first) first.focus();
  }
};

KB.editorMove = function (i, dir) {
  KB.editorSync();
  const ed = KB.state.editing;
  if (!ed) return;
  const j = i + dir;
  if (j < 0 || j >= ed.blocks.length) return;
  const arr = ed.blocks;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  KB.renderPanel(ed.id);
};

KB.editorRemove = function (i) {
  KB.editorSync();
  const ed = KB.state.editing;
  if (!ed) return;
  ed.blocks.splice(i, 1);
  KB.renderPanel(ed.id);
};

KB.saveEditing = async function () {
  KB.editorSync();
  const ed = KB.state.editing;
  if (!ed) return;
  const blocks = ed.blocks.filter(b => Object.keys(b).length);
  if (!blocks.length) {
    KB.showToast('还没有内容可保存');
    return;
  }
  KB.state.editing = null;
  KB.renderPanel(ed.id);
  await KB.saveArticleBlocks(ed.id, blocks);
  KB.renderPanel(ed.id);
};

KB.cancelEditing = function () {
  const id = KB.state.editing && KB.state.editing.id;
  KB.state.editing = null;
  if (id) KB.renderPanel(id);
};
