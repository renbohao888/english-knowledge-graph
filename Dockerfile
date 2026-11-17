# 英语知识体系 · 3D 交互图谱
# 单容器交付：python 标准库同时托管静态页面、教程 API 与词汇库 API。
# 没有第三方依赖，构建只需要 COPY，离线也能 build。
FROM python:3.12-slim-bookworm

WORKDIR /app
COPY server ./server
COPY index.html ./
COPY src ./src

ENV CKG_STATIC_DIR=/app \
    CKG_DATA_DIR=/data \
    CKG_API_HOST=0.0.0.0 \
    CKG_API_PORT=80 \
    PYTHONUNBUFFERED=1

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1/api/health')" || exit 1

CMD ["python3", "server/api.py"]
