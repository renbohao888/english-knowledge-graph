# 参与贡献

这个项目的数据就是 Git 里的 JS 字面量，改完跑一次校验就能提 PR。不需要后端，不需要数据库。

## 目录与改哪里

| 想做什么 | 改哪个文件 |
|---|---|
| 加一个语音 / 拼写知识点 | `src/data/nodes-sound.js` |
| 加一个构词 / 词汇知识点 | `src/data/nodes-words.js` |
| 加一个词法 / 时态 / 从句知识点 | `src/data/nodes-grammar.js` |
| 加一个篇章 / 听说 / 读写 / 翻译知识点 | `src/data/nodes-skills.js` |
| 加一个考试 / 方法 / 文化知识点 | `src/data/nodes-exam.js` |
| 加一条关系 | `src/data/links.js` 或 `links-more.js` |
| 加一条学习路线 | `src/data/paths.js` 或 `paths-more.js` |
| 写一篇教程 | `src/data/articles.js` |
| 调整词形拆解规则 | `src/data/affixes.js` |
| 调整层 / 方向 / 颜色 | `src/config.js` |

词汇库的 `src/data/vocab-core.json` 是脚本生成的，**不要手改**；要改词库内容或筛选规则，改 `scripts/build_vocab.py`。

## 加一个知识点

在对应的 `nodes-*.js` 里加一项：

```js
{ id: 'ellipsis', name: '省略', layer: '词性与句子', domain: '语法', status: '待补充',
  tracks: ['语法'],
  before: ['sentence-patterns'],
  keywords: ['ellipsis', '省略', '口语省略'],
  children: [
    { group: '形式', name: '主语省略', desc: 'Got it. / Hope so. 口语里常见。' },
    { group: '形式', name: '并列句省略', desc: 'I like tea and (I like) coffee.' }
  ],
  description: '省略让语言经济；听力里省略多，写作里过度省略会造成歧义。' }
```

字段说明：

- `id`：唯一，小写 kebab-case，连线用它引用
- `name`：显示名，尽量短
- `layer`：必须是 `config.js` 里 `LAYERS` 的一项
- `domain`：问题域，自由文本，但请复用已有值
- `status`：`已掌握` / `待补充` / `模糊`，是作者标注，用户可以在页面上覆盖
- `tracks`：至少一个，必须在 `TRACKS` 里
- `before`：学习前置的 id 数组，不能成环
- `keywords`：搜索别名，放英文名、缩写、常见写法
- `children`：细分知识点，`{ group, name, desc }`；`group` 相同的会归为一个分区
- `description`：一句话说明，尽量 80 字以内

## 加一条关系

```js
{ source: 'ellipsis', target: 'cohesion', relation: '属于衔接手段' },
```

- 端点必须存在
- 同一对节点只能有一条连线
- `relation` 用「动词 + 名词」的短句，会显示在 3D 连线中间
- 如果关系是「先学 A 再学 B」，优先写进 B 的 `before`，系统会自动补一条学习路径连线

## 加一条学习路线

```js
{
  id: 'writing',
  name: '写作体系',
  level: '能写句子 → 能写清楚的文章',
  desc: '一句话说明这条路线解决什么问题。',
  steps: [
    { phase: '一、句子', node: 'sentence-writing', title: '句子写作', note: '先消灭碎句与连写句。' },
    { phase: '一、句子', task: true, title: '写 20 个句子', note: '每个语法点写 5 句，找人批改。' }
  ]
}
```

- `phase` 相同的步骤会归到同一个阶段标题
- 有 `node` 的步骤会跳到图里对应节点
- 纯动手任务用 `task: true`，不写 `node`

## 写一篇教程

```js
articles: {
  ellipsis: [
    { h: '是什么', p: '……' },
    { h: '核心概念', ul: ['……', '……'] },
    { tip: '一句话提醒。' },
    { links: [{ t: '外部资料', u: 'https://example.com' }] }
  ]
}
```

块类型：`h` 小标题、`p` 段落、`ul` 要点、`code` + `lang` 代码/例句、`tip` 提示、`links` 外部链接。

也可以直接在页面里写：打开任意节点的「教程」标签 → **写这篇教程**，保存后进 `data/content.json`，不用改代码。

## 提交前校验

```bash
node scripts/validate.mjs
```

它会检查：

- id 唯一、字段完整
- layer / status / track 合法
- 连线端点存在、没有重复边与自环
- `before` 指向存在、没有环
- 学习路线引用的节点存在
- 每个节点至少 2 条连线（提示级）

校验通过后再提 PR。PR 里请说明：

1. 加了什么（节点 / 关系 / 路线 / 教程）
2. 为什么这样分层、这样排前置
3. 是否跑过 `node scripts/validate.mjs`

## 内容写作约定

- 用中文解释，术语保留英文原词
- 例句优先用真实、常见、可验证的表达
- 不确定的规则不要写成绝对结论，用「通常」「多数情况」
- 不复制教材或网站原文；参考后用自己的话重写，并在 `links` 里给出处
