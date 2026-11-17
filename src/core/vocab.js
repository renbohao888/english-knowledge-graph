/* ============================================================
 * 词汇库：数据检索 + 生词本 + 发音 + 词形拆解
 * ------------------------------------------------------------
 * 两种数据源：
 *   1) 服务端 data/ecdict.db（77 万词条，server/api.py 提供）
 *   2) 静态 src/data/vocab-core.json（1.8 万核心词，GitHub Pages 兜底）
 * 生词本只存本机 localStorage，可导出 / 导入。
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  const NOTE_KEY = 'ekg.vocab.notebook.v1';
  const ACCENT_KEY = 'ekg.vocab.accent.v1';

  const state = {
    initialized: false,
    server: false,
    stats: null,
    core: null,
    coreByLower: null,
    coreLoading: null,
    accent: localStorage.getItem(ACCENT_KEY) || 'en-US',
    notebook: readNotebook()
  };

  function readNotebook() {
    try {
      const v = JSON.parse(localStorage.getItem(NOTE_KEY) || '[]');
      return Array.isArray(v) ? v.filter(x => x && x.w) : [];
    } catch (e) { return []; }
  }

  function writeNotebook() {
    try { localStorage.setItem(NOTE_KEY, JSON.stringify(state.notebook)); } catch (e) { /* 隐私模式 */ }
    document.dispatchEvent(new CustomEvent('kb-notebook'));
  }

  async function getJSON(url, ms) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms || 4000);
    try {
      const r = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
      if (!r.ok) return null;
      return await r.json();
    } catch (e) {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  function tagLabels(tag) {
    const labels = { zk: '中考', gk: '高考', cet4: '四级', cet6: '六级', ky: '考研', toefl: '托福', ielts: '雅思', gre: 'GRE' };
    return String(tag || '').split(/\s+/).filter(t => labels[t]).map(t => labels[t]);
  }

  function parseExchange(ex) {
    const labels = { p: '过去式', d: '过去分词', i: '现在分词', 3: '第三人称单数', r: '比较级', t: '最高级', s: '复数', 0: '原型', 1: '原型变体' };
    return String(ex || '').split('/').filter(x => x.includes(':')).map(x => {
      const i = x.indexOf(':');
      const k = x.slice(0, i), v = x.slice(i + 1);
      return labels[k] && v ? { type: labels[k], value: v } : null;
    }).filter(Boolean);
  }

  function clean(s) {
    return String(s || '').replace(/\\n/g, '\n').trim();
  }

  function normalizeEntry(e) {
    return {
      word: e.w || e.word,
      phonetic: e.p || e.phonetic || '',
      translation: clean(e.t || e.translation),
      pos: e.pos || '',
      tag: e.tag || '',
      tagLabels: e.tagLabels || tagLabels(e.tag),
      collins: e.c || e.collins || 0,
      oxford: !!e.o || !!e.oxford,
      bnc: e.bnc || 0,
      frq: e.frq || 0,
      exchange: e.exchange || parseExchange(e.x || ''),
      definition: clean(e.definition),
      detail: clean(e.detail)
    };
  }

  const STATIC_HOST = location.protocol === 'file:' || /\.github\.io$/i.test(location.hostname);

  async function init() {
    if (state.initialized) return state;
    state.initialized = true;
    if (STATIC_HOST) { state.server = false; state.stats = null; return state; }
    const stats = await getJSON('api/vocab/stats', 2500);
    if (stats && stats.available) {
      state.server = true;
      state.stats = stats;
    } else {
      state.server = false;
      state.stats = null;
    }
    return state;
  }

  async function loadCore() {
    if (state.core) return state.core;
    if (!state.coreLoading) {
      state.coreLoading = getJSON('src/data/vocab-core.json', 20000).then(list => {
        if (Array.isArray(list)) {
          state.core = list;
          state.coreByLower = new Map();
          list.forEach(e => {
            const k = String(e.w || '').toLowerCase();
            if (k && !state.coreByLower.has(k)) state.coreByLower.set(k, e);
          });
        }
        return state.core;
      });
    }
    return state.coreLoading;
  }

  function staticSearch(q, tag, limit) {
    const ql = String(q || '').toLowerCase();
    if (!ql) return [];
    const out = [];
    for (const e of state.core || []) {
      const w = String(e.w || '').toLowerCase();
      const hit = w === ql ? 0 : (w.startsWith(ql) ? 1 : (w.includes(ql) ? 2 : -1));
      if (hit < 0) continue;
      if (tag && !String(e.tag || '').split(/\s+/).includes(tag)) continue;
      out.push({ hit, e });
    }
    out.sort((a, b) => (a.hit - b.hit) ||
      ((a.e.bnc || 999999) - (b.e.bnc || 999999)) ||
      ((a.e.frq || 999999) - (b.e.frq || 999999)) ||
      String(a.e.w).localeCompare(String(b.e.w)));
    return out.slice(0, limit).map(x => normalizeEntry(x.e));
  }

  KB.vocab = {
    init,
    get state() { return state; },
    get server() { return state.server; },
    get stats() { return state.stats; },

    tagLabels,
    normalizeEntry,

    async search(q, tag, limit) {
      limit = limit || 40;
      await init();
      if (state.server) {
        const url = 'api/vocab/search?q=' + encodeURIComponent(q) +
          '&limit=' + limit + (tag ? '&tag=' + encodeURIComponent(tag) : '');
        const r = await getJSON(url, 4000);
        if (r && Array.isArray(r.words)) return r.words.map(normalizeEntry);
        /* 服务端出错时退回静态词库 */
      }
      await loadCore();
      if (!state.core) return { error: 'core-missing' };
      return staticSearch(q, tag, limit);
    },

    async word(w) {
      await init();
      if (state.server) {
        const r = await getJSON('api/vocab/word?w=' + encodeURIComponent(w), 4000);
        if (r && r.word) return normalizeEntry(r);
      }
      await loadCore();
      const e = state.coreByLower && state.coreByLower.get(String(w || '').toLowerCase());
      return e ? normalizeEntry(e) : null;
    },

    async random(tag) {
      await init();
      if (state.server) {
        const r = await getJSON('api/vocab/random' + (tag ? '?tag=' + encodeURIComponent(tag) : ''), 4000);
        if (r && r.word) return normalizeEntry(r);
      }
      await loadCore();
      const list = (state.core || []).filter(e => !tag || String(e.tag || '').split(/\s+/).includes(tag));
      if (!list.length) return null;
      return normalizeEntry(list[Math.floor(Math.random() * list.length)]);
    },

    coreCount() { return state.core ? state.core.length : 18363; },

    /* ---------- 生词本 ---------- */
    notebook() { return state.notebook.slice(); },
    notebookCount() { return state.notebook.length; },
    inNotebook(w) {
      const k = String(w || '').toLowerCase();
      return state.notebook.some(x => String(x.w).toLowerCase() === k);
    },
    toggleNotebook(entry) {
      const k = String(entry.word || '').toLowerCase();
      const i = state.notebook.findIndex(x => String(x.w).toLowerCase() === k);
      if (i >= 0) state.notebook.splice(i, 1);
      else state.notebook.unshift({
        w: entry.word, p: entry.phonetic || '', t: entry.translation || '',
        tag: entry.tag || '', addedAt: Date.now()
      });
      writeNotebook();
      return i < 0;
    },
    removeNotebook(w) {
      const k = String(w || '').toLowerCase();
      state.notebook = state.notebook.filter(x => String(x.w).toLowerCase() !== k);
      writeNotebook();
    },
    exportNotebook() {
      return JSON.stringify({ version: 1, words: state.notebook }, null, 2);
    },
    importNotebook(text) {
      const data = JSON.parse(text);
      const words = Array.isArray(data) ? data : (data && data.words);
      if (!Array.isArray(words)) throw new Error('格式不对');
      const seen = new Set(state.notebook.map(x => String(x.w).toLowerCase()));
      words.forEach(x => {
        if (!x || !x.w) return;
        const k = String(x.w).toLowerCase();
        if (seen.has(k)) return;
        seen.add(k);
        state.notebook.push({ w: x.w, p: x.p || '', t: x.t || x.translation || '', tag: x.tag || '' });
      });
      writeNotebook();
      return words.length;
    },

    /* ---------- 发音 ---------- */
    get accent() { return state.accent; },
    setAccent(a) {
      state.accent = a === 'en-GB' ? 'en-GB' : 'en-US';
      try { localStorage.setItem(ACCENT_KEY, state.accent); } catch (e) { /* ignore */ }
    },
    speak(text) {
      try {
        const u = new SpeechSynthesisUtterance(String(text || ''));
        u.lang = state.accent;
        u.rate = 0.9;
        const voices = window.speechSynthesis.getVoices() || [];
        const exact = voices.find(v => v.lang.replace('_', '-') === state.accent);
        const any = voices.find(v => /^en/i.test(v.lang));
        if (exact || any) u.voice = exact || any;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) { /* 不支持语音合成时静默 */ }
    },

    /* ---------- 词形拆解（启发式） ---------- */
    breakdown(word) {
      const AF = KB.AFFIXES || {};
      let rest = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
      if (rest.length < 5) return [];
      const parts = [];
      const pre = (AF.prefixes || []).slice().sort((a, b) => b.p.length - a.p.length);
      /* 只拆构词后缀；-s/-ed/-ing 这类屈折变化不参与，否则 analysis 会被拆成 analysi + s */
      const suf = (AF.suffixes || [])
        .filter(a => a.node !== 'inflection' && a.p.length >= 2)
        .sort((a, b) => b.p.length - a.p.length);
      const roots = (AF.roots || []).slice().sort((a, b) => b.p.length - a.p.length);

      for (const a of pre) {
        const base = a.p.replace(/-$/, '');
        if (rest.startsWith(base) && rest.length - base.length >= 4) {
          parts.push({ part: a.p, mean: a.m, node: a.node, type: '前缀' });
          rest = rest.slice(base.length);
          break;
        }
      }
      for (const b of suf) {
        if (rest.endsWith(b.p) && rest.length - b.p.length >= 3) {
          parts.push({ part: '-' + b.p, mean: b.m, node: b.node, type: '后缀' });
          rest = rest.slice(0, rest.length - b.p.length);
          break;
        }
      }
      const root = roots.find(r => rest.includes(r.p) && rest.length >= r.p.length);
      if (root) {
        const i = rest.indexOf(root.p);
        const stem = rest.slice(0, i) + rest.slice(i + root.p.length);
        parts.push({ part: root.p, mean: root.m, node: root.node, type: '词根' });
        if (stem) parts.push({ part: stem, mean: '词干/连接成分', node: null, type: '词干' });
      } else if (rest) {
        parts.push({ part: rest, mean: '词干', node: null, type: '词干' });
      }
      return parts.length >= 2 ? parts : [];
    }
  };

  /* 版本号用于日志排查 */
  KB.vocab.VERSION = '20261117';
})();
