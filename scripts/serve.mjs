#!/usr/bin/env node
/* 零依赖本地服务器：npm run serve（或 node scripts/serve.mjs）
   默认 http://127.0.0.1:8791，可用 PORT 环境变量改端口。
   静态文件 + 页面内编辑用的 /api/content（数据存 data/content.json）。 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 8791);
const dataDir = path.join(root, 'data');
const contentFile = path.join(dataDir, 'content.json');
const MAX_BODY = 2 * 1024 * 1024;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.db': 'application/octet-stream'
};

function readContent() {
  try {
    const data = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
    if (data && typeof data === 'object' && data.articles && typeof data.articles === 'object') {
      return { version: 1, updatedAt: data.updatedAt || null, articles: data.articles };
    }
  } catch (e) { /* 文件还没有或坏了，给空内容 */ }
  return { version: 1, updatedAt: null, articles: {} };
}

function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('body 必须是 JSON 对象');
  if (!data.articles || typeof data.articles !== 'object' || Array.isArray(data.articles)) throw new Error('articles 必须是对象');
  const keys = new Set(['h', 'p', 'ul', 'code', 'lang', 'tip', 'links']);
  for (const [id, blocks] of Object.entries(data.articles)) {
    if (!id) throw new Error('文章 id 非法');
    if (!Array.isArray(blocks)) throw new Error(`${id}: 内容块必须是数组`);
    for (const b of blocks) {
      if (!b || typeof b !== 'object' || Array.isArray(b) || !Object.keys(b).length) {
        throw new Error(`${id}: 内容块必须是对象`);
      }
      for (const k of Object.keys(b)) if (!keys.has(k)) throw new Error(`${id}: 未知块字段 ${k}`);
      if (b.links !== undefined) {
        if (!Array.isArray(b.links)) throw new Error(`${id}: links 必须是数组`);
        for (const item of b.links) {
          const u = String((item && item.u) || '');
          if (!/^https?:\/\//i.test(u)) throw new Error(`${id}: 链接只允许 http(s)`);
        }
      }
    }
  }
}

function writeContent(data) {
  fs.mkdirSync(dataDir, { recursive: true });
  if (fs.existsSync(contentFile)) fs.copyFileSync(contentFile, path.join(dataDir, 'content.backup.json'));
  const tmp = path.join(dataDir, `.content-${process.pid}-${Date.now()}.tmp`);
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, contentFile);
}

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body)
  });
  res.end(body);
}

function handleApi(req, res) {
  const urlPath = (req.url || '').split('?')[0].replace(/\/+$/, '');

  if (urlPath === '/api/content' && req.method === 'GET') {
    sendJson(res, 200, readContent());
    return true;
  }
  if (urlPath === '/api/health') {
    sendJson(res, 200, { ok: true, file: contentFile, vocabDb: false });
    return true;
  }
  /* Node 版不带 SQLite 词库：明确告知前端退回静态核心词，避免一条 404 噪音 */
  if (urlPath === '/api/vocab/stats') {
    sendJson(res, 200, { available: false, totalWords: 0, tags: [], reason: 'node-static' });
    return true;
  }
  if (urlPath.startsWith('/api/vocab/')) {
    sendJson(res, 404, { error: 'node-static', hint: '使用 python server/api.py 获得全量词库' });
    return true;
  }
  if (urlPath === '/api/content' && req.method === 'PUT') {
    const chunks = [];
    let size = 0;
    req.on('data', c => {
      size += c.length;
      if (size > MAX_BODY) { req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        validate(data);
        data.version = 1;
        data.updatedAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
        writeContent(data);
        sendJson(res, 200, { ok: true, updatedAt: data.updatedAt });
      } catch (e) {
        sendJson(res, 400, { error: String(e.message || e) });
      }
    });
    return true;
  }
  sendJson(res, 404, { error: 'not found' });
  return true;
}

http.createServer((req, res) => {
  if ((req.url || '').startsWith('/api/')) { handleApi(req, res); return; }

  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(root, urlPath === '/' ? 'index.html' : urlPath);

  if (!file.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    res.writeHead(200, {
      'content-type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-cache'
    });
    res.end(buf);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`英语知识体系 → http://127.0.0.1:${port}`);
  console.log(`内容 API → http://127.0.0.1:${port}/api/content  (${contentFile})`);
});
