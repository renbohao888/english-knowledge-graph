/* ============================================================
 * 我的学习进度
 * - 存在浏览器 localStorage，不碰仓库里的数据
 * - 覆盖节点的 status（作者标注仍然保留，可随时取消）
 * - 可导出 / 导入 JSON，换设备或分享给同学
 * ============================================================ */
window.KB = window.KB || {};

(function () {
  const KEY = 'ckg.progress.v1';
  let map = {};

  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (raw && typeof raw === 'object') map = raw;
  } catch (e) { map = {}; }

  KB.progress = map;

  /* 生效状态：我的标记优先，否则用数据里的作者标注 */
  KB.effStatus = function (n) {
    if (!n) return '模糊';
    const s = map[n.id];
    return KB.STATUS_LIST.includes(s) ? s : n.status;
  };

  KB.hasProgress = function (n) {
    return !!n && !!map[n.id];
  };

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) { /* 隐私模式忽略 */ }
  }

  function refreshAll() {
    KB.refreshStyles();
    KB.buildRailUI();
    KB.syncFilterUI();
    KB.updateFocusBadge();
    if (KB.state.selected) KB.renderPanel(KB.state.selected);
  }

  KB.setProgress = function (id, status) {
    if (!KB.byId[id] || !KB.STATUS_LIST.includes(status)) return;
    if (map[id] === status) delete map[id];   // 再点一次 = 取消我的标记
    else map[id] = status;
    persist();
    refreshAll();
  };

  KB.clearProgress = function () {
    map = {};
    KB.progress = map;
    persist();
    refreshAll();
  };

  KB.exportProgress = function () {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: map
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'knowledge-progress.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  };

  KB.importProgressFile = function (file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const p = (data && data.progress) || data || {};
        const clean = {};
        Object.keys(p).forEach(k => {
          if (KB.byId[k] && KB.STATUS_LIST.includes(p[k])) clean[k] = p[k];
        });
        map = clean;
        KB.progress = map;
        persist();
        refreshAll();
        KB.setProgressMsg(`已导入 ${Object.keys(clean).length} 条进度`);
      } catch (e) {
        KB.setProgressMsg('导入失败：不是有效的进度文件');
      }
    };
    reader.readAsText(file);
  };

  KB.setProgressMsg = function (text) {
    const el = document.getElementById('progressMsg');
    if (!el) return;
    el.textContent = text;
    clearTimeout(KB.setProgressMsg._t);
    KB.setProgressMsg._t = setTimeout(() => { el.textContent = ''; }, 4000);
  };
})();
