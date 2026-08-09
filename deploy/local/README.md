# 本地后端 Docker 部署

用于从仓库快照恢复当前数据库和图片，并在不污染本机 Node/npm 环境的前提下运行后端。

前置条件：Docker Desktop 已启动，Git LFS 文件已拉取完整。

```bash
cd deploy/local
docker compose up -d --build
```

首次启动且 Docker 卷为空时，会自动导入 `bootstrap/mysql/00-current.sql` 和 `bootstrap/uploads/`。已有卷不会被覆盖。

校验：

```bash
curl -k https://localhost:3443/api/health
```

管理后台与小程序图片测试入口：`https://localhost:3443`。

小程序默认连接本地入口。一键切换：

```powershell
cd code/云舍村
npm run env:local
npm run env:remote
```

切换命令只修改 `utils/config.js` 中的 `API_MODE`。提交代码前应恢复 `npm run env:local`。

压缩本地上传图片（保留原图，输出到 `deploy/local/optimized-uploads/images`）：

```powershell
node deploy/local/压缩上传图片.js
docker compose -f deploy/local/docker-compose.yml -f deploy/local/docker-compose.optimized.yml up -d backend
```

压缩目录可在确认清单后同步到云端原上传目录。同步前先备份云端 `uploads/images`，只覆盖同名文件，不删除云端多出的文件；图片 URL 和数据库记录无需修改。

Windows 微信开发者工具首次使用本地 HTTPS 时，需要信任 Caddy 的本地开发根证书，然后重启开发者工具：

```powershell
$cert = Join-Path $env:TEMP 'yunshecun-local-caddy-root.crt'
docker compose cp https-proxy:/data/caddy/pki/authorities/local/root.crt $cert
certutil -user -addstore Root $cert
```

该证书仅导入当前 Windows 用户。结束本地 HTTPS 测试后，可在“管理用户证书”中删除名称为 `Caddy Local Authority` 的根证书。

自动测试使用当前本地 Docker 服务和已安装的 Edge：

```powershell
cd code/backend
npm run test:local
npm run test:browser
```

完整快照部署不需要执行 `db:seed`。历史 SQLite 迁移仅能在已备份且目标 MySQL 与上传卷为空时执行：

```bash
docker compose --profile migration run --rm migration
```

停止：

```bash
docker compose down
```

运行时文件、依赖、数据库和上传文件保存在 Docker named volume，不写入本机源码目录。

说明：

- 所有本地 Docker 运行配置统一读取 `deploy/local/.env`。
- 本地 HTTPS 代理使用 Caddy 的容器内部开发证书；首次导入根证书后，微信开发者工具可正常加载 HTTPS 图片。
- 支付证书只读挂载自 `code/证书`。
- `bootstrap/` 只保存当前数据库实际使用的数据和图片，不保存未引用的上传文件。
- Docker 只隔离运行环境，不 mock 业务参数。
