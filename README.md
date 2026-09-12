# 云舍村小程序

微信小程序 + Node.js/Express 后端。仓库包含可复刻本地运行态的 MySQL 快照、必要上传素材、既有支付证书和统一环境配置。

## 本地恢复

前置条件：Docker Desktop、Git LFS、微信开发者工具。项目使用 Git LFS 管理部分图片，克隆后必须先拉取 LFS 文件。

```powershell
git clone <仓库地址>
cd <仓库目录>
git lfs install
git lfs pull
```

本地后端使用仓库内唯一部署环境文件 `deploy/local/.env`：

```powershell
docker compose -f deploy/local/docker-compose.yml up -d --build
curl.exe -k https://localhost:3443/api/health
```

首次启动空 Docker 卷时，Compose 会自动导入 `deploy/local/bootstrap/mysql/00-current.sql` 和必要上传图片；已有卷不会被覆盖。后端入口为 `https://localhost:3443`，支付证书只读挂载自 `code/证书`。

本地 HTTPS 供微信开发者工具使用时，先把 Caddy 根证书导入当前 Windows 用户证书库，再重启开发者工具：

```powershell
$cert = Join-Path $env:TEMP 'yunshecun-local-caddy-root.crt'
docker compose -f deploy/local/docker-compose.yml cp https-proxy:/data/caddy/pki/authorities/local/root.crt $cert
certutil -user -addstore Root $cert
```

## 小程序接口

小程序默认使用本地后端 `https://localhost:3443/api`。导入 `code/云舍村` 后，在该目录执行：

```powershell
npm install
npm run env:local
```

切换到已有云端后端：

```powershell
npm run env:remote
```

发布或继续本地开发前，按需执行 `npm run env:local` 或 `npm run env:remote`，不要手工修改其它配置。当前远程地址配置在 `code/云舍村/utils/config.js`。

## 云端后端

后端保留旧测试入口 `deploy/cloud-test/`，并提供当前正式入口 `deploy/aliyun-prod/`。正式云端使用 `deploy/aliyun-prod/.env.example` 生成私有环境文件，并通过部署脚本的 `ENV_FILE` 传入；云端环境文件、运行卷和备份不会进入 Git。

正式上线（当前生产分支）使用仓库快照初始化新卷：

```bash
cd deploy/aliyun-prod
cp .env.example .env
# 在 .env 填写正式域名、数据库、JWT、微信和支付参数；保留 DATA_SOURCE=snapshot；默认 BACKEND_PORT=3101 以避开现有 3100 测试 PM2
ENV_FILE=./.env bash ./部署正式环境.sh
```

`snapshot` 会在空 Docker 卷中导入 `deploy/local/bootstrap/mysql/00-current.sql` 和上传文件；已有卷不会自动覆盖。已有云端数据升级前先备份 MySQL/上传卷，再将 `SYNC_CONTENT=1`、`SYNC_UPLOADS=1` 写入私有 `.env` 执行一次同步：内容会按当前代码 upsert，图片会覆盖同名文件、补齐新增文件但不删除云端额外文件。只有从旧 SQLite 迁移时才设置 `DATA_SOURCE=sqlite`，并额外准备 `MIGRATION_BACKUP_DIR`。

云主机已知现状（见历史报告）：Alibaba Cloud Linux 3、Docker 26.1.3、Compose 2.27；3100 已被旧 PM2 测试服务占用，9000/9001/9002 为 Java 生产服务，当前 Nginx 实例为 `/usr/local/nginx/sbin/nginx` 且不由 systemd 托管。正式 Node 先用 3101 隔离验证，不得直接停止旧 PM2/Java 或覆盖 Nginx。报告还记录 Docker Hub 443 出站曾失败，拉取 `node:22`、`mysql:8.4` 前需先解决镜像源/出站网络。

正式域名还需在现有 Nginx 配置中合并 Node 的 `/api/`、`/guardian/`、`/uploads/` 路由并反代到 `127.0.0.1:${BACKEND_PORT}`；不要直接覆盖生产静态站点和 Java 路由。当前报告核实生产 TLS 证书目录为 `/usr/local/nginx/conf/cert/prod/`，支付证书目录为 `/home/project-2026/certs/test/`，均需在云上确认实际文件后使用。微信公众平台登记 request、upload、download、业务域名；小程序发布前在 `code/云舍村` 执行 `npm run env:remote` 并确认 `CLOUD_API_BASE_URL` 为正式 API 地址。部署前先执行 `git lfs install`、`git lfs pull`。

云主机人工配置清单：`.env` 中填写 `PUBLIC_BASE_URL`、`CORS_ORIGIN`、MySQL/JWT/微信支付真实值；`CERTIFICATE_DIR` 指向只允许后端用户读取且包含 `apiclient_cert.pem`、`apiclient_key.pem` 的目录。参考 `deploy/aliyun-prod/nginx-prod.conf` 合并路由，先执行实际 Nginx 二进制的 `-t`，再按现有托管方式 reload（报告显示不是 systemd）。确认阿里云安全组开放 80/443，微信公众平台登记正式 request、upload、download、业务域名后，再用 `VERIFY_BASE_URL=https://正式域名 VERIFY_ADMIN_URL=https://后台域名 bash ./验证正式环境.sh` 验收。

## 相关文档

- [本地 Docker 详细说明](deploy/local/README.md)
- [后端说明](code/backend/README.md)
- [正式云端配置模板](deploy/aliyun-prod/.env.example)
- [文档索引](docs/README.md)
