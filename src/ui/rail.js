/* ============================================================
 * 左侧栏（方向 / 分层 / 掌握度）、右上工具条、筛选同步
 * ============================================================ */
window.KB = window.KB || {};

KB.buildRailUI = function () {
  const trackGrid = document.getElementById('trackGrid');
  if (trackGrid) {
    trackGrid.innerHTML = KB.TRACK_NAMES.map(name => {
      const c = KB.NODES.filter(n => n.tracks.includes(name)).length;
      return `<button class="track-chip${KB.state.track === name ? ' active' : ''}" data-track="${KB.esc(name)}" style="--tc:${KB.TRACKS[name].color}">
        <i></i><span>${KB.esc(name)}</span><em>${c}</em>
      </button>`;
    }).join('');
  }

  const layerList = document.getElementById('layerList');
  if (layerList) {
    layerList.innerHTML = KB.LAYERS.map(l => {
      const c = KB.NODES.filter(n => n.layer === l).length;
      return `<li><button class="layer-row${KB.state.layer === l ? ' active' : ''}" data-layer="${KB.esc(l)}">
        <span>${KB.esc(l)}</span><span class="count">${c}</span>
      </button></li>`;
    }).join('');
  }

  const statusList = document.getElementById('statusList');
  if (statusList) {
    statusList.innerHTML = KB.STATUS_LIST.map(s => {
      const c = KB.NODES.filter(n => KB.effStatus(n) === s).length;
      return `<button class="status-row${KB.state.status === s ? ' active' : ''}" data-status="${KB.esc(s)}">
        <i class="s-dot" style="--c:${KB.STATUS_COLOR[s]}"></i>
        <span>${KB.esc(s)}</span><em>${c}</em>
      </button>`;
    }).join('');
  }

  const mastered = KB.NODES.filter(n => KB.effStatus(n) === '已掌握').length;
  const pct = Math.round(mastered / Math.max(1, KB.NODES.length) * 100);
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = pct + '%';
  const pt = document.getElementById('progressText');
  if (pt) pt.textContent = `${mastered} / ${KB.NODES.length} 已掌握 · ${pct}%`;

  const sn = document.getElementById('statNodes');
  if (sn) sn.textContent = KB.NODES.length;
  const sl = document.getElementById('statLinks');
  if (sl) sl.textContent = KB.LINKS.length;
};

KB.buildDomainOptions = function () {
  const domains = [...new Set(KB.NODES.map(n => n.domain))];
  const sel = document.getElementById('domainSelect');
  if (sel) {
    sel.innerHTML = `<option value="">全部问题域</option>` +
      domains.map(d => `<option value="${KB.esc(d)}">${KB.esc(d)}</option>`).join('');
    sel.value = KB.state.domain || '';
  }

  const mob = document.getElementById('layerSelectMobile');
  if (mob) {
    mob.innerHTML = `<option value="">全部分层</option>` +
      KB.LAYERS.map(l => `<option value="${KB.esc(l)}">${KB.esc(l)}</option>`).join('');
    mob.value = KB.state.layer || '';
  }

  const mobTrack = document.getElementById('trackSelectMobile');
  if (mobTrack) {
    mobTrack.innerHTML = `<option value="">全部方向</option>` +
      KB.TRACK_NAMES.map(t => `<option value="${KB.esc(t)}">${KB.esc(t)}</option>`).join('');
    mobTrack.value = KB.state.track || '';
  }
};

KB.syncFilterUI = function () {
  document.querySelectorAll('.track-chip').forEach(b => {
    b.classList.toggle('active', b.dataset.track === KB.state.track);
  });
  document.querySelectorAll('.layer-row').forEach(b => {
    b.classList.toggle('active', b.dataset.layer === KB.state.layer);
  });
  document.querySelectorAll('.status-row').forEach(b => {
    b.classList.toggle('active', b.dataset.status === KB.state.status);
  });
  const ds = document.getElementById('domainSelect');
  if (ds) ds.value = KB.state.domain || '';
  const ls = document.getElementById('layoutSelect');
  if (ls) ls.value = KB.state.layout || 'helix';
  const lm = document.getElementById('layerSelectMobile');
  if (lm) lm.value = KB.state.layer || '';
  const tm = document.getElementById('trackSelectMobile');
  if (tm) tm.value = KB.state.track || '';
  KB.updateMatchStat();
  KB.refreshStyles();
};

KB.bindRail = function () {
  /* 左栏收起 / 展开：收起后左边缘留一个把手 */
  const setRailCollapsed = (on) => {
    document.body.classList.toggle('rail-collapsed', on);
    try { localStorage.setItem('kb.rail.collapsed', on ? '1' : ''); } catch (e) { /* 隐私模式 */ }
    if (KB.updateViewOffset) KB.updateViewOffset();
    if (KB.state.mode === '2d' && KB.state.selected) KB.twoDFocus(KB.state.selected);
  };
  const railToggle = document.getElementById('railToggle');
  if (railToggle) railToggle.addEventListener('click', () => setRailCollapsed(true));
  const railReopen = document.getElementById('railReopen');
  if (railReopen) railReopen.addEventListener('click', () => setRailCollapsed(false));
  try {
    if (localStorage.getItem('kb.rail.collapsed') === '1') document.body.classList.add('rail-collapsed');
  } catch (e) { /* 隐私模式 */ }

  /* 分区标题可折叠：14 个方向 + 13 层太长了 */
  document.querySelectorAll('.rail-title').forEach(el => {
    el.addEventListener('click', () => el.parentElement.classList.toggle('collapsed'));
  });

  const trackGrid = document.getElementById('trackGrid');
  if (trackGrid) {
    trackGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-track]');
      if (btn) KB.selectTrack(btn.dataset.track);
    });
  }

  const layerList = document.getElementById('layerList');
  if (layerList) {
    layerList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-layer]');
      if (!btn) return;
      const v = btn.dataset.layer;
      KB.state.layer = (KB.state.layer === v) ? null : v;
      KB.syncFilterUI();
    });
  }

  const statusList = document.getElementById('statusList');
  if (statusList) {
    statusList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-status]');
      if (!btn) return;
      const v = btn.dataset.status;
      KB.state.status = (KB.state.status === v) ? null : v;
      KB.syncFilterUI();
    });
  }

  const layoutSelect = document.getElementById('layoutSelect');
  if (layoutSelect) {
    layoutSelect.value = KB.state.layout || 'free';
    layoutSelect.addEventListener('change', (e) => KB.setLayout(e.target.value));
  }

  const domainSelect = document.getElementById('domainSelect');
  if (domainSelect) {
    domainSelect.addEventListener('change', (e) => {
      KB.state.domain = e.target.value || null;
      KB.syncFilterUI();
    });
  }

  const layerMobile = document.getElementById('layerSelectMobile');
  if (layerMobile) {
    layerMobile.addEventListener('change', (e) => {
      KB.state.layer = e.target.value || null;
      KB.syncFilterUI();
    });
  }

  const trackMobile = document.getElementById('trackSelectMobile');
  if (trackMobile) {
    trackMobile.addEventListener('change', (e) => {
      const v = e.target.value;
      if (!v) { if (KB.state.track) KB.selectTrack(KB.state.track); return; }
      if (v !== KB.state.track) KB.selectTrack(v);
    });
  }

  const labelBtn = document.getElementById('labelBtn');
  if (labelBtn) {
    labelBtn.addEventListener('click', () => {
      KB.state.labels = !KB.state.labels;
      labelBtn.setAttribute('aria-pressed', String(KB.state.labels));
    });
  }

  const relBtn = document.getElementById('relBtn');
  if (relBtn) {
    relBtn.addEventListener('click', () => {
      KB.state.relations = !KB.state.relations;
      relBtn.setAttribute('aria-pressed', String(KB.state.relations));
    });
  }

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const s = KB.state;
      s.layer = null; s.domain = null; s.status = null; s.track = null;
      s.selected = null; s.focus = null; s.editing = null;
      if (KB.clearPath) KB.clearPath();
      if (KB.exitSubModel) KB.exitSubModel(true);
      KB.twoDExit();
      KB.closePanel();
      KB.updateFocusBadge();
      KB.syncFilterUI();
      KB.fitView();
    });
  }

  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => KB.exportProgress());
  }

  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', () => {
      const f = importFile.files && importFile.files[0];
      if (f) KB.importProgressFile(f);
      importFile.value = '';
    });
  }

  const badge = document.getElementById('focusBadge');
  if (badge) {
    badge.addEventListener('click', (e) => {
      if (e.target.closest('[data-clear]')) {
        KB.state.focus = null;
        KB.updateFocusBadge();
        KB.renderPanelIfOpen();
        KB.refreshStyles();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (KB.state.subOf) { KB.exitSubModel(); return; }
      KB.state.focus = null;
      KB.state.selected = null;
      KB.state.editing = null;
      KB.twoDExit();
      KB.closePanel();
      KB.updateFocusBadge();
      KB.refreshStyles();
    }
  });

  let rt = null;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (KB.graph) KB.graph.width(window.innerWidth).height(window.innerHeight);
      if (KB.updateViewOffset) KB.updateViewOffset();
    }, 120);
  });
};
