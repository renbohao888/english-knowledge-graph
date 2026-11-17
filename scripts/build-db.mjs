#!/usr/bin/env node
/* ============================================================
 * 把 Git 里的数据导出成 SQLite，方便查询/统计/接别的系统。
 * 真相仍然是 src/data/*.js —— 数据库只是派生产物（已 gitignore）。
 *
 *   npm run db        → data/knowledge.db
 *   sqlite3 data/knowledge.db "select layer, count(*) from nodes group by layer"
 * ============================================================ */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const ctx = { matchMedia: () => ({ matches: false }) };
vm.createContext(ctx);
ctx.window = ctx;
vm.runInContext(read('src/config.js'), ctx);

const dataDir = path.join(root, 'src/data');
const pick = (re) => fs.readdirSync(dataDir).filter(f => re.test(f)).sort()
  .map(f => 'src/data/' + f);
[
  ...pick(/^nodes.*\.js$/),
  ...pick(/^links.*\.js$/),
  ...pick(/^paths.*\.js$/)
].forEach(f => vm.runInContext(read(f), ctx));

const KB = ctx.KB;
fs.mkdirSync(path.join(root, 'data'), { recursive: true });
const dbPath = path.join(root, 'data', 'knowledge.db');
if (fs.existsSync(dbPath)) fs.rmSync(dbPath);

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE nodes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    layer TEXT NOT NULL,
    domain TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT,
    degree INTEGER
  );
  CREATE TABLE node_tracks (node_id TEXT, track TEXT, PRIMARY KEY (node_id, track));
  CREATE TABLE node_before (node_id TEXT, before_id TEXT, PRIMARY KEY (node_id, before_id));
  CREATE TABLE node_keywords (node_id TEXT, keyword TEXT, PRIMARY KEY (node_id, keyword));
  CREATE TABLE node_children (node_id TEXT, name TEXT, description TEXT, PRIMARY KEY (node_id, name));
  CREATE TABLE links (source TEXT, target TEXT, relation TEXT, PRIMARY KEY (source, target, relation));
  CREATE INDEX idx_nodes_layer ON nodes(layer);
  CREATE INDEX idx_nodes_status ON nodes(status);
  CREATE INDEX idx_links_source ON links(source);
  CREATE INDEX idx_links_target ON links(target);
`);

const deg = Object.create(null);
KB.NODES.forEach(n => { deg[n.id] = 0; });
KB.LINKS.forEach(l => { deg[l.source]++; deg[l.target]++; });

const insNode = db.prepare('INSERT INTO nodes VALUES (?,?,?,?,?,?,?)');
const insTrack = db.prepare('INSERT OR IGNORE INTO node_tracks VALUES (?,?)');
const insBefore = db.prepare('INSERT OR IGNORE INTO node_before VALUES (?,?)');
const insKw = db.prepare('INSERT OR IGNORE INTO node_keywords VALUES (?,?)');
const insChild = db.prepare('INSERT OR IGNORE INTO node_children VALUES (?,?,?)');
const insLink = db.prepare('INSERT OR IGNORE INTO links VALUES (?,?,?)');

db.exec('BEGIN');
for (const n of KB.NODES) {
  insNode.run(n.id, n.name, n.layer, n.domain, n.status, n.description || '', deg[n.id] || 0);
  (n.tracks || []).forEach(t => insTrack.run(n.id, t));
  (n.before || []).forEach(b => insBefore.run(n.id, b));
  (n.keywords || []).forEach(k => insKw.run(n.id, k));
  (n.children || []).forEach(c => insChild.run(n.id, c.name, c.desc || ''));
}
for (const l of KB.LINKS) insLink.run(l.source, l.target, l.relation);
db.exec('COMMIT');

const count = (sql) => db.prepare(sql).get().c;
console.log(`已生成 ${path.relative(root, dbPath)}`);
console.log(`  nodes     ${count('SELECT count(*) c FROM nodes')}`);
console.log(`  links     ${count('SELECT count(*) c FROM links')}`);
console.log(`  children  ${count('SELECT count(*) c FROM node_children')}`);
console.log(`  keywords  ${count('SELECT count(*) c FROM node_keywords')}`);
db.close();
