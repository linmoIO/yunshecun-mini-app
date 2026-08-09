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

后端同时保留 `deploy/local` 和 `deploy/cloud-test` 两套 Docker Compose 入口。云端部署使用 `deploy/cloud-test/.env.example` 生成私有环境文件，并通过部署脚本的 `ENV_FILE` 传入；云端环境文件、运行卷和备份不会进入 Git。

## 相关文档

- [本地 Docker 详细说明](deploy/local/README.md)
- [后端说明](code/backend/README.md)
- [云端测试环境配置模板](deploy/cloud-test/.env.example)
- [文档索引](docs/README.md)
