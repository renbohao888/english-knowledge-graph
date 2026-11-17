/* ============================================================
 * 词汇库界面：查词 / 词条详情 / 生词本 / 复习卡片
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  let tab = 'search';
  let tag = '';
  let current = null;
  let results = [];
  let seq = 0;
  let review = null;
  let meta = null;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => KB.esc(s == null ? '' : s);

  function openOverlay() {
    const el = $('vocabOverlay');
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    KB.state.vocabOpen = true;
    setTimeout(() => { const inp = $('vocabInput'); if (inp) inp.focus(); }, 60);
  }

  function closeOverlay() {
    const el = $('vocabOverlay');
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    KB.state.vocabOpen = false;
    if (/^#\/word\//.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
  }

  function setTab(next) {
    tab = next;
    document.querySelectorAll('#vocabTabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    $('vocabSearchRow').style.display = tab === 'search' ? '' : 'none';
    $('vocabChips').style.display = tab === 'search' ? '' : 'none';
    if (tab === 'notebook') { renderNotebook(); }
    else { renderResults(); }
  }

  async function ensureMeta() {
    if (meta) return meta;
    if (KB.vocab.stats && KB.vocab.stats.tags) {
      meta = { tags: KB.vocab.stats.tags, totalWords: KB.vocab.stats.totalWords, coreWords: 0 };
    } else {
      try {
        const r = await fetch('src/data/vocab-meta.json');
        if (r.ok) meta = await r.json();
      } catch (e) { /* 静态文件打开时可能失败 */ }
    }
    return meta;
  }

  function renderChips() {
    const box = $('vocabChips');
    const tags = (meta && meta.tags) || [];
    box.innerHTML = `<button class="vchip${tag === '' ? ' on' : ''}" data-tag="">全部</button>` +
      tags.map(t => `<button class="vchip${tag === t.key ? ' on' : ''}" data-tag="${esc(t.key)}">${esc(t.label)}<em>${t.count || ''}</em></button>`).join('');
  }

  function chipTag(labels) {
    return (labels || []).map(l => `<span class="vtag">${esc(l)}</span>`).join('');
  }

  function wordRow(e, i) {
    const active = current && current.word.toLowerCase() === e.word.toLowerCase();
    return `<button class="vrow${active ? ' on' : ''}" data-w="${esc(e.word)}" data-i="${i}">
      <span class="vw"><b>${esc(e.word)}</b>
        <span class="vphon">${e.phonetic ? '/' + esc(e.phonetic) + '/' : ''}</span>
        ${e.oxford ? '<span class="vox">Oxford</span>' : ''}
      </span>
      <span class="vt">${esc(String(e.translation || '').split('\n')[0]).slice(0, 60)}</span>
      <span class="vchips">${chipTag(e.tagLabels)}</span>
    </button>`;
  }

  async function doSearch(q) {
    const box = $('vocabList');
    const my = ++seq;
    box.innerHTML = '<div class="vempty">查询中…</div>';
    const r = await KB.vocab.search(q, tag, 40);
    if (my !== seq) return;
    if (r && r.error === 'core-missing') {
      box.innerHTML = '<div class="vempty">静态核心词库没有加载成功。<br>请用本地服务器打开（<code>python3 server/api.py</code>），或运行完整服务端以查询 77 万词条。</div>';
      return;
    }
    results = Array.isArray(r) ? r : [];
    renderResults();
  }

  function renderResults() {
    const box = $('vocabList');
    const q = $('vocabInput').value.trim();
    if (!q) {
      box.innerHTML = `<div class="vempty vintro">
        <b>查一个词</b><br>
        支持前缀搜索，例如 <code>pre</code>、<code>trans</code>；点词条看音标、释义、词形、词族拆解与公开词典链接。<br>
        ${KB.vocab.server ? '当前：全量词库（ECDICT 77 万词条）' : '当前：静态核心词库（1.8 万高频/考试词）'}
      </div>`;
      return;
    }
    if (!results.length) {
      box.innerHTML = `<div class="vempty">没有找到「${esc(q)}」。<br>试试前缀，或切到完整服务端词库。</div>`;
      return;
    }
    box.innerHTML = results.map(wordRow).join('');
  }

  function exchangeLine(e) {
    if (!e || !e.length) return '';
    return `<div class="vx">${e.map(x => `<span><em>${esc(x.type)}</em>${esc(x.value)}</span>`).join('')}</div>`;
  }

  function breakdownHtml(word) {
    const parts = KB.vocab.breakdown(word);
    if (!parts.length) return '';
    const chips = parts.map(p => {
      const node = p.node && KB.byId[p.node]
        ? ` data-node="${esc(p.node)}" title="查看「${esc(KB.byId[p.node].name)}」"`
        : '';
      return `<span class="vpart${p.node ? ' link' : ''}"${node}>
        <b>${esc(p.part)}</b><em>${esc(p.type)}</em>${esc(p.mean)}
      </span>`;
    }).join('<span class="vplus">+</span>');
    return `<div class="vsec"><h4>词形拆解 <em>辅助理解，最终以词典为准</em></h4><div class="vparts">${chips}</div></div>`;
  }

  function writeDetail(e) {
    const box = $('vocabDetail');
    if (!e) {
      box.innerHTML = '<div class="vempty">在左侧选择一个词</div>';
      return;
    }
    current = e;
    const inNb = KB.vocab.inNotebook(e.word);
    const trans = String(e.translation || '').split('\n').filter(Boolean)
      .map(x => `<p>${esc(x)}</p>`).join('');
    const def = e.definition ? `<div class="vsec"><h4>英文释义</h4><p class="vdef">${esc(e.definition)}</p></div>` : '';
    const w = encodeURIComponent(e.word);
    box.innerHTML = `
      <div class="vhead">
        <div>
          <h2>${esc(e.word)}
            <button class="vspeak" data-speak="${esc(e.word)}" title="朗读">🔊</button>
          </h2>
          <div class="vphon2">${e.phonetic ? '/' + esc(e.phonetic) + '/' : '（无音标）'}
            <button class="vmini${KB.vocab.accent === 'en-US' ? ' on' : ''}" data-accent="en-US">美</button>
            <button class="vmini${KB.vocab.accent === 'en-GB' ? ' on' : ''}" data-accent="en-GB">英</button>
          </div>
        </div>
        <div class="vbadges">
          ${e.oxford ? '<span class="vbadge ox">Oxford 3000/5000</span>' : ''}
          ${e.collins ? `<span class="vbadge">柯林斯 ${'★'.repeat(Math.min(5, e.collins))}</span>` : ''}
          ${e.bnc ? `<span class="vbadge">BNC #${e.bnc}</span>` : ''}
          ${e.frq ? `<span class="vbadge">COCA #${e.frq}</span>` : ''}
          ${chipTag(e.tagLabels)}
        </div>
      </div>
      <div class="vsec"><h4>释义</h4>${trans || '<p class="vdim">暂无中文释义</p>'}</div>
      ${def}
      ${e.exchange && e.exchange.length ? `<div class="vsec"><h4>词形变化</h4>${exchangeLine(e.exchange)}</div>` : ''}
      ${breakdownHtml(e.word)}
      <div class="vsec"><h4>公开词典与词库</h4>
        <div class="vlinks">
          <a href="https://dictionary.cambridge.org/dictionary/english/${w}" target="_blank" rel="noopener">Cambridge</a>
          <a href="https://www.merriam-webster.com/dictionary/${w}" target="_blank" rel="noopener">Merriam-Webster</a>
          <a href="https://www.oxfordlearnersdictionaries.com/definition/english/${w}" target="_blank" rel="noopener">Oxford Learner's</a>
          <a href="https://dict.youdao.com/result?word=${w}&lang=en" target="_blank" rel="noopener">有道词典</a>
          <a href="https://github.com/skywind3000/ECDICT" target="_blank" rel="noopener">ECDICT（本库数据源）</a>
        </div>
      </div>
      <div class="vactions">
        <button class="vbtn ${inNb ? 'on' : ''}" data-nb="${esc(e.word)}">${inNb ? '✓ 已在生词本' : '＋ 加入生词本'}</button>
        <button class="vbtn ghost" data-random="1">随机一词</button>
      </div>`;
  }

  async function selectWord(w, pushHash) {
    const box = $('vocabDetail');
    current = null;
    box.innerHTML = '<div class="vempty">加载中…</div>';
    const e = await KB.vocab.word(w);
    if (!e) { box.innerHTML = `<div class="vempty">词条「${esc(w)}」不在当前词库中</div>`; return; }
    writeDetail(e);
    renderResults();
    if (pushHash) history.replaceState(null, '', '#/word/' + encodeURIComponent(e.word));
    $('vocabDetail').scrollTop = 0;
  }

  function renderNotebook() {
    const words = KB.vocab.notebook();
    $('nbCount').textContent = String(words.length);
    const box = $('vocabList');
    if (!words.length) {
      box.innerHTML = `<div class="vempty vintro"><b>生词本还是空的</b><br>查词时点「加入生词本」，词条会存在本机浏览器，可导出备份。</div>`;
      return;
    }
    box.innerHTML = `<div class="nbtools">
        <button class="vbtn" data-review="1">开始卡片复习</button>
        <button class="vbtn ghost" data-nbexport="1">导出</button>
        <button class="vbtn ghost" data-nbimport="1">导入</button>
        <input type="file" id="nbFile" accept="application/json,.json" hidden>
      </div>` +
      words.map((x, i) => `<button class="vrow" data-nbw="${esc(x.w)}" data-i="${i}">
        <span class="vw"><b>${esc(x.w)}</b><span class="vphon">${x.p ? '/' + esc(x.p) + '/' : ''}</span></span>
        <span class="vt">${esc(String(x.t || '').split('\n')[0]).slice(0, 60)}</span>
      </button>`).join('');
  }

  function startReview() {
    const words = KB.vocab.notebook();
    if (!words.length) return;
    review = { list: words.slice().sort(() => Math.random() - 0.5), i: 0, reveal: false };
    renderReview();
  }

  function renderReview() {
    const box = $('vocabDetail');
    if (!review) return;
    if (review.i >= review.list.length) {
      box.innerHTML = `<div class="vempty vintro"><b>复习完成</b><br>共 ${review.list.length} 个词。再来一轮？<br><button class="vbtn" data-review="1">再来一轮</button></div>`;
      return;
    }
    const x = review.list[review.i];
    box.innerHTML = `<div class="vreview">
      <div class="vrcount">${review.i + 1} / ${review.list.length}</div>
      <div class="vrword">${esc(x.w)}</div>
      <div class="vrphon">${x.p ? '/' + esc(x.p) + '/' : ''}
        <button class="vspeak" data-speak="${esc(x.w)}">🔊</button></div>
      <div class="vrtrans ${review.reveal ? 'show' : ''}">${esc(String(x.t || '').replace(/\n/g, '；'))}</div>
      <div class="vactions">
        ${review.reveal
          ? `<button class="vbtn" data-next="1">下一个</button>`
          : `<button class="vbtn" data-reveal="1">显示释义</button>`}
        <button class="vbtn ghost" data-review-end="1">结束</button>
      </div>
    </div>`;
  }

  function bind() {
    const el = $('vocabOverlay');
    if (!el || el.dataset.bound) return;
    el.dataset.bound = '1';

    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { closeOverlay(); return; }
      const tabBtn = e.target.closest('#vocabTabs button');
      if (tabBtn) { setTab(tabBtn.dataset.tab); return; }
      const chip = e.target.closest('.vchip');
      if (chip) {
        tag = chip.dataset.tag || '';
        renderChips();
        const q = $('vocabInput').value.trim();
        if (q) doSearch(q);
        return;
      }
      const row = e.target.closest('.vrow');
      if (row && row.dataset.w) { selectWord(row.dataset.w, true); return; }
      if (row && row.dataset.nbw) { selectWord(row.dataset.nbw, false); return; }
      const speak = e.target.closest('[data-speak]');
      if (speak) { KB.vocab.speak(speak.dataset.speak); return; }
      const acc = e.target.closest('[data-accent]');
      if (acc) { KB.vocab.setAccent(acc.dataset.accent); if (current) writeDetail(current); return; }
      const nb = e.target.closest('[data-nb]');
      if (nb && current) {
        KB.vocab.toggleNotebook(current);
        writeDetail(current);
        renderNotebookIfOpen();
        return;
      }
      if (e.target.closest('[data-random]')) { randomWord(); return; }
      const node = e.target.closest('[data-node]');
      if (node && KB.byId[node.dataset.node]) {
        closeOverlay();
        KB.selectNode(node.dataset.node, false);
        return;
      }
      if (e.target.closest('[data-review]')) { startReview(); return; }
      if (e.target.closest('[data-reveal]')) { review.reveal = true; renderReview(); return; }
      if (e.target.closest('[data-next]')) { review.i++; review.reveal = false; renderReview(); return; }
      if (e.target.closest('[data-review-end]')) { review = null; renderNotebook(); return; }
      if (e.target.closest('[data-nbexport]')) {
        const blob = new Blob([KB.vocab.exportNotebook()], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'vocab-notebook.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        return;
      }
      if (e.target.closest('[data-nbimport]')) {
        const f = $('nbFile');
        if (f) f.click();
        return;
      }
    });

    el.addEventListener('change', (e) => {
      if (e.target.id !== 'nbFile' || !e.target.files[0]) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const n = KB.vocab.importNotebook(String(reader.result || ''));
          KB.showToast('已导入 ' + n + ' 条生词');
          renderNotebook();
        } catch (err) {
          KB.showToast('导入失败：' + err.message);
        }
      };
      reader.readAsText(file, 'utf-8');
    });

    const input = $('vocabInput');
    let timer = null;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = input.value.trim();
        if (q) doSearch(q); else { results = []; renderResults(); }
      }, 240);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) { doSearch(q); if (results[0]) selectWord(results[0].word, true); }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && KB.state.vocabOpen) { e.stopPropagation(); closeOverlay(); }
    });

    document.addEventListener('kb-notebook', () => {
      $('nbCount').textContent = String(KB.vocab.notebookCount());
      if (tab === 'notebook') renderNotebook();
    });

    window.addEventListener('hashchange', () => {
      const m = location.hash.match(/^#\/word\/(.+)$/);
      if (m) {
        const w = decodeURIComponent(m[1]);
        openOverlay();
        selectWord(w, false);
      }
    });
  }

  function renderNotebookIfOpen() {
    if (tab === 'notebook') renderNotebook();
    $('nbCount').textContent = String(KB.vocab.notebookCount());
  }

  async function randomWord() {
    const e = await KB.vocab.random(tag);
    if (!e) { KB.showToast('随机取词失败，请检查词库'); return; }
    writeDetail(e);
  }

  KB.openVocab = async function (word) {
    bind();
    openOverlay();
    setTab('search');
    await KB.vocab.init();
    await ensureMeta();
    const st = $('vocabStats');
    if (st) {
      st.textContent = KB.vocab.server
        ? 'ECDICT · ' + ((meta && meta.totalWords) || 770611).toLocaleString() + ' 词条 · MIT'
        : '静态核心词库 · ' + ((meta && meta.coreWords) || 18363).toLocaleString() + ' 词 · 完整词库需本地服务';
    }
    renderChips();
    $('nbCount').textContent = String(KB.vocab.notebookCount());
    renderResults();
    if (word) {
      $('vocabInput').value = word;
      await doSearch(word);
      selectWord(word, true);
    } else {
      setTimeout(() => $('vocabInput').focus(), 80);
    }
  };

  KB.bindVocab = function () {
    bind();
    const btn = $('vocabBtn');
    if (btn) btn.addEventListener('click', () => KB.openVocab(''));
    /* 直接打开 #/word/xxx */
    const m = location.hash.match(/^#\/word\/(.+)$/);
    if (m) setTimeout(() => KB.openVocab(decodeURIComponent(m[1])), 900);
  };
})();
