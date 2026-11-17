/* ============================================================
 * 教程内容：页面内编辑的内容从这里读写
 * ------------------------------------------------------------
 * 优先级：服务器 data/content.json  >  浏览器 localStorage  >  仓库里的 articles.js
 * 服务器内容对所有人可见；服务器不可用时退化为"只存本机"，可导出 JSON。
 * 内容块的格式与 src/data/articles.js 完全一致，这里不新增格式。
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  const LS_KEY = 'kb.articles.v1';
  const API = 'api/content';

  /* 纯静态托管（GitHub Pages、file://）没有内容 API，直接走本机存储，
     免得多打一条必然 404 的请求。 */
  const STATIC_HOST = location.protocol === 'file:' || /\.github\.io$/i.test(location.hostname);

  /* 仓库里自带的教程，用于"恢复原版" */
  const BUNDLED = Object.assign({}, KB.ARTICLES);
  KB.BUNDLED_ARTICLES = BUNDLED;

  KB.userArticles = {};          // 服务器 / 本机保存的覆盖内容
  KB.contentSource = 'bundled';  // 'server' | 'local' | 'bundled'

  function readLocal() {
    try {
      const v = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
    } catch (e) { return {}; }
  }

  function writeLocal(obj) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch (e) { /* 隐私模式 */ }
  }

  /* 把 id→块数组 合并进 KB.ARTICLES；空数组视为删除该教程 */
  function apply(articles) {
    Object.keys(articles || {}).forEach(id => {
      const blocks = articles[id];
      if (Array.isArray(blocks) && blocks.length) KB.ARTICLES[id] = blocks;
      else delete KB.ARTICLES[id];
    });
  }

  function rerender() {
    const panel = KB.getPanel();
    if (KB.state.selected && panel && panel.classList.contains('open')) {
      KB.renderPanel(KB.state.selected);
    }
  }

  KB.fetchTimeout = function (url, opts, ms) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms || 3000);
    return fetch(url, Object.assign({ signal: ctrl.signal }, opts || {}))
      .finally(() => clearTimeout(timer));
  };

  /* 启动时拉取：服务器内容，失败则用本机缓存 */
  KB.loadUserContent = async function () {
    let server = null;
    try {
      if (!STATIC_HOST) {
        const r = await KB.fetchTimeout(API, { cache: 'no-store' }, 3000);
        if (r.ok) {
          const j = await r.json();
          if (j && j.articles && typeof j.articles === 'object') server = j.articles;
        }
      }
    } catch (e) { /* 没有 API（纯静态部署）就走本机 */ }

    if (server) {
      KB.contentSource = 'server';
      KB.userArticles = server;
      writeLocal(server);            // 缓存一份，离线也能看到
      apply(server);
    } else {
      const local = readLocal();
      if (Object.keys(local).length) {
        KB.contentSource = 'local';
        KB.userArticles = local;
        apply(local);
      }
    }
    rerender();
    return KB.contentSource;
  };

  /* 保存一篇教程：先落本机，再推服务器 */
  KB.saveArticleBlocks = async function (id, blocks) {
    if (!Array.isArray(blocks) || !blocks.length) return false;

    KB.userArticles[id] = blocks;
    apply({ [id]: blocks });
    writeLocal(KB.userArticles);

    const payload = JSON.stringify({ version: 1, articles: KB.userArticles });
    if (STATIC_HOST) {
      KB.contentSource = 'local';
      KB.showToast('已保存在本机浏览器（静态托管没有内容服务器）');
      return false;
    }
    try {
      const r = await KB.fetchTimeout(API, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: payload
      }, 8000);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      KB.contentSource = 'server';
      KB.showToast('已保存，所有人可见');
      return true;
    } catch (e) {
      KB.contentSource = 'local';
      KB.showToast('服务器不可用，已保存在本机浏览器');
      return false;
    }
  };

  /* 恢复成仓库里的原版（删掉用户补充；原版也没有则变回"待补"） */
  KB.resetUserArticle = async function (id) {
    delete KB.userArticles[id];
    delete KB.ARTICLES[id];
    if (BUNDLED[id]) KB.ARTICLES[id] = BUNDLED[id];
    writeLocal(KB.userArticles);
    try {
      await KB.fetchTimeout(API, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ version: 1, articles: KB.userArticles })
      }, 8000);
      KB.showToast('已恢复原版');
    } catch (e) {
      KB.showToast('已在本机恢复，服务器不可用');
    }
    rerender();
  };

  KB.hasUserArticle = function (id) {
    return Object.prototype.hasOwnProperty.call(KB.userArticles, id);
  };

  /* 本机模式下把补充内容存成文件，方便发给维护者或放进 data/content.json */
  KB.downloadUserContent = function () {
    const data = JSON.stringify({ version: 1, articles: KB.userArticles }, null, 2);
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'knowledge-content.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
})();
