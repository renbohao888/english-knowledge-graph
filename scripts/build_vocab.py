#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 ECDICT 构建英语词汇库。

    python3 scripts/build_vocab.py path/to/ecdict.csv

产物（都不入库，除 vocab-core.json 外可重新生成）：
    data/ecdict.db            全量 SQLite（77 万词条），服务端查询用
    src/data/vocab-core.json  核心词库（考试词 / 牛津核心 / 高频词），静态兜底
    src/data/vocab-meta.json  词库统计与标签说明

ECDICT 项目：https://github.com/skywind3000/ECDICT （MIT License）
字段：word, phonetic, definition, translation, pos, collins, oxford,
      tag, bnc, frq, exchange, detail, audio
tag 取值：zk 中考 / gk 高考 / cet4 四级 / cet6 六级 / ky 考研 /
          toefl 托福 / ielts 雅思 / gre GRE
"""
import csv
import json
import os
import sqlite3
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
DB_PATH = os.path.join(ROOT, "data", "ecdict.db")
CORE_PATH = os.path.join(ROOT, "src", "data", "vocab-core.json")
META_PATH = os.path.join(ROOT, "src", "data", "vocab-meta.json")

FIELDS = ["word", "phonetic", "definition", "translation", "pos", "collins",
          "oxford", "tag", "bnc", "frq", "exchange", "detail", "audio"]
TAGS = ["zk", "gk", "cet4", "cet6", "ky", "toefl", "ielts", "gre"]
TAG_LABELS = {
    "zk": "中考", "gk": "高考", "cet4": "四级", "cet6": "六级",
    "ky": "考研", "toefl": "托福", "ielts": "雅思", "gre": "GRE",
}


def as_int(v):
    try:
        return int(str(v).strip() or 0)
    except ValueError:
        return 0


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    if len(sys.argv) < 2:
        print("用法: python3 scripts/build_vocab.py path/to/ecdict.csv")
        return 2
    csv_path = os.path.abspath(sys.argv[1])
    if not os.path.isfile(csv_path):
        print("找不到 CSV:", csv_path)
        return 2

    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("""
        CREATE TABLE words (
            id INTEGER PRIMARY KEY,
            word TEXT NOT NULL,
            lword TEXT NOT NULL,
            phonetic TEXT,
            definition TEXT,
            translation TEXT,
            pos TEXT,
            collins INTEGER,
            oxford INTEGER,
            tag TEXT,
            bnc INTEGER,
            frq INTEGER,
            exchange TEXT,
            detail TEXT,
            audio TEXT
        )
    """)
    conn.execute("CREATE INDEX idx_words_lword ON words(lword)")
    conn.execute("CREATE INDEX idx_words_bnc ON words(bnc)")
    conn.execute("CREATE INDEX idx_words_frq ON words(frq)")

    stats = {t: 0 for t in TAGS}
    total = 0
    batch = []
    core = []
    with open(csv_path, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            word = (row.get("word") or "").strip()
            if not word or len(word) > 120:
                continue
            tag = (row.get("tag") or "").strip().lower()
            collins = as_int(row.get("collins"))
            oxford = as_int(row.get("oxford"))
            bnc = as_int(row.get("bnc"))
            frq = as_int(row.get("frq"))
            total += 1
            batch.append((
                word, word.lower(), row.get("phonetic") or "",
                row.get("definition") or "", row.get("translation") or "",
                row.get("pos") or "", collins, oxford, tag, bnc, frq,
                row.get("exchange") or "", row.get("detail") or "",
                row.get("audio") or "",
            ))
            tag_set = set(tag.split()) if tag else set()
            for t in TAGS:
                if t in tag_set:
                    stats[t] += 1

            core_hit = bool(tag_set & set(TAGS)) or oxford == 1 or collins >= 4 \
                or (0 < bnc <= 10000) or (0 < frq <= 10000)
            if core_hit:
                core.append({
                    "w": word,
                    "p": row.get("phonetic") or "",
                    "t": row.get("translation") or "",
                    "pos": row.get("pos") or "",
                    "tag": tag,
                    "o": oxford,
                    "c": collins,
                    "bnc": bnc,
                    "frq": frq,
                    "x": row.get("exchange") or "",
                })
            if len(batch) >= 5000:
                conn.executemany("INSERT INTO words (word,lword,phonetic,definition,"
                                 "translation,pos,collins,oxford,tag,bnc,frq,exchange,"
                                 "detail,audio) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", batch)
                batch.clear()

    if batch:
        conn.executemany("INSERT INTO words (word,lword,phonetic,definition,"
                         "translation,pos,collins,oxford,tag,bnc,frq,exchange,"
                         "detail,audio) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", batch)
    conn.commit()
    conn.execute("ANALYZE")
    conn.commit()
    conn.close()

    core.sort(key=lambda e: (e["w"].lower()))
    with open(CORE_PATH, "w", encoding="utf-8") as f:
        json.dump(core, f, ensure_ascii=False, separators=(",", ":"))

    meta = {
        "source": "ECDICT",
        "sourceUrl": "https://github.com/skywind3000/ECDICT",
        "license": "MIT",
        "totalWords": total,
        "coreWords": len(core),
        "tags": [{"key": k, "label": TAG_LABELS[k], "count": stats[k]} for k in TAGS],
        "builtAt": __import__("time").strftime("%Y-%m-%dT%H:%M:%SZ", __import__("time").gmtime()),
    }
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

    print(f"全量词条: {total}")
    print(f"核心词条: {len(core)}  ({os.path.getsize(CORE_PATH) / 1024 / 1024:.1f} MB)")
    print(f"SQLite: {DB_PATH}  ({os.path.getsize(DB_PATH) / 1024 / 1024:.1f} MB)")
    print("考试标签:", ", ".join(f"{TAG_LABELS[k]} {stats[k]}" for k in TAGS))
    return 0


if __name__ == "__main__":
    sys.exit(main())
