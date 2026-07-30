# 云端测试环境部署

本文件是当前唯一部署指引。部署者只需先读 `AGENTS.md` 和本文件。

## 目标

将已本地验证的 Node 22、MySQL、Docker 后端部署到阿里云测试环境，迁移既有 SQLite 和上传文件。保留旧 PM2、SQLite、上传目录和迁移备份。

本地已通过：Docker 构建、健康检查、管理后台、图片、数据库迁移校验、6 个 API 测试和 Edge Playwright 测试。

## 预检

- 当前源：`/home/project-2026/test/app/prisma/dev.db` 与 `/home/project-2026/test/app/uploads`。
- 确认旧 PM2 占用端口、Nginx 反代端口、Docker 可用，且新 MySQL 卷和上传卷为空。
- 不读取或输出 `.env`、密钥、证书内容；不执行 seed，不删卷，不改 Nginx、DNS、防火墙或证书。

## 隔离部署

在新发布目录创建私有 `deploy/cloud-test/.env`，仅在服务器内继承真实业务配置。设置新的 MySQL/JWT 密钥、唯一 `MIGRATION_BACKUP_DIR`，并设 `BACKEND_PORT=3101`。

```bash
cd deploy/cloud-test
SOURCE_SQLITE_PATH=/home/project-2026/test/app/prisma/dev.db \
SOURCE_UPLOAD_DIR=/home/project-2026/test/app/uploads \
MIGRATION_BACKUP_DIR=/新的且不存在的备份目录 \
bash ./备份迁移源.sh

ENV_FILE=./.env bash ./部署测试环境.sh
curl -fsS http://127.0.0.1:3101/api/health
curl -fsS http://127.0.0.1:3101/
```

核对迁移报告的逐表数量和哈希，以及上传文件清单。此阶段不得停止旧 PM2 或验证测试域名。

## 切换与回滚

隔离验证通过后，必须单独获得授权，才可停止旧 PM2、将 `BACKEND_PORT` 改为 `3100`、重建后端，并以测试域名验证健康检查、后台和图片。测试证书不在范围内；仅验证时可使用 `CURL_INSECURE=1`。

失败时停止新后端并恢复旧 PM2，不删除 MySQL 卷、SQLite、上传文件或迁移备份。

执行文件：`deploy/cloud-test/docker-compose.yml`、`.env.example`、`备份迁移源.sh`、`部署测试环境.sh`、`验证测试环境.sh`。
